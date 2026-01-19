import { isWeb } from "@/services/helper";
import React, { useEffect, useMemo } from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { parseWktMultiPolygon } from "./GoogleMapView.native";

type LatLng = [number, number];
type Polygon = LatLng[];
type MultiPolygon = Polygon[];

const fallbackPolygon: Polygon = [
  [35.704, 51.335],
  [35.703, 51.345],
  [35.696, 51.343],
  [35.697, 51.334],
];

const toLatLng = (lngLat: number[]): LatLng => [lngLat[1], lngLat[0]];

const parseWktPolygons = (wkt?: string): MultiPolygon => {
  if (!wkt) return [fallbackPolygon];
  const normalized = wkt.replace(/^SRID=\d+;?/i, "").trim();
  const match = normalized.match(
    /^(MULTIPOLYGON|POLYGON)\s*\(\s*([\s\S]*)\s*\)$/i
  );

  if (!match) return [fallbackPolygon];

  const type = match[1].toUpperCase();
  const body = match[2];
  const polygons: MultiPolygon = [];

  const parseRing = (ringText: string): Polygon => {
    const points = ringText
      .split(",")
      .map((pair) => pair.trim().split(/\\s+/).map(Number))
      .filter((coords) => coords.length >= 2 && !coords.some(Number.isNaN))
      .map(toLatLng);
    return points;
  };

  if (type === "POLYGON") {
    const rings = body.replace(/^\\(|\\)$/g, "").split("),(");
    const outer = parseRing(rings[0] ?? "");
    if (outer.length) polygons.push(outer);
  }

  if (type === "MULTIPOLYGON") {
    const polygonTexts = body.replace(/^\\(\\(|\\)\\)$/g, "").split(")),((");
    polygonTexts.forEach((polygonText) => {
      const rings = polygonText.split(")), ((");

      const outer = parseRing(rings[0] ?? "");
      if (outer.length) polygons.push(outer);
    });
  }

  return polygons.length ? polygons : [fallbackPolygon];
};

const html = (polygons: MultiPolygon) => `<!DOCTYPE html>
<html lang="fa">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <link rel="stylesheet" href="https://static.neshan.org/sdk/leaflet/v1.9.4/neshan-sdk/v1.0.8/index.css"/>
  <script src="https://static.neshan.org/sdk/leaflet/v1.9.4/neshan-sdk/v1.0.8/index.js"></script>
  <style>html,body,#map{height:100%;width:100%;margin:0}</style>
</head>
<body>
  <div id="map"></div>
<script>
  const polygons = ${JSON.stringify(polygons)};

  const initialPoint = polygons[0]?.[0] ?? [35.699756, 51.338076];
  const map = new L.Map("map", {
    key: "web.0aae3f9bf3ed481db86d2adf916535e9",
    maptype: "neshan",
    center: initialPoint,
    zoom: 100,
  });

  const polygonLayers = polygons.map((polygonPoints) =>
    L.polygon(polygonPoints, {
      color: "#0ea5e9",
      weight: 2,
      fillColor: "#38bdf8",
      fillOpacity: 0.2,
    }).addTo(map)
  );

  if (polygonLayers.length > 0) {
    const bounds = polygonLayers.reduce(
      (acc, layer) => acc.extend(layer.getBounds()),
      polygonLayers[0].getBounds()
    );
    map.fitBounds(bounds);
  }

  let marker = L.marker(initialPoint).addTo(map);

  function isPointInPolygon(point, vs) {
    const x = point[0], y = point[1];
    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      const xi = vs[i][0], yi = vs[i][1];
      const xj = vs[j][0], yj = vs[j][1];
      const intersect = ((yi > y) !== (yj > y)) &&
        (x < (xj - xi) * (y - yi) / (yj - yi + 0.0) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }

  function sendMessage(payload) {
    if (window.ReactNativeWebView?.postMessage) {
      window.ReactNativeWebView.postMessage(JSON.stringify(payload));
      return;
    }
    if (window.parent?.postMessage) {
      window.parent.postMessage(payload, "*");
    }
  }

  const isPointInsideAnyPolygon = (point) =>
    polygons.some((polygonPoints) => isPointInPolygon(point, polygonPoints));

  map.on("click", (e) => {
    const next = [e.latlng.lat, e.latlng.lng];
    if (!isPointInsideAnyPolygon(next)) {
      sendMessage({ type: "MAP_ALERT", message: "نقطه انتخابی خارج از محدوده است." });
      return;
    }
    marker.setLatLng(next);
    sendMessage({ type: "MAP_CLICK", lat: next[0], lng: next[1] });
  });

  setTimeout(() => document.querySelectorAll(".leaflet-control-attribution")
    .forEach(el => el.style.display = "none"), 0);
</script>
</body>
</html>`;

type NeshanMapProps = {
  boundariesWkt?: string | null;
  onLocationSelected?: (value: any) => void;
};

export default function NeshanMap({
  boundariesWkt,
  onLocationSelected,
}: NeshanMapProps) {
  const polygons = useMemo(() => {
    if (boundariesWkt?.length > 0)
      return parseWktMultiPolygon(boundariesWkt ?? undefined);
    else return [];
  }, [boundariesWkt]);
  const source = useMemo(() => ({ html: html(polygons) }), [polygons]);
  const Iframe = "iframe" as React.ElementType;

  const handleMessage = (event: any) => {
    try {
      const data = isWeb ? event.data : JSON.parse(event.nativeEvent.data);
      if (data?.type === "MAP_ALERT") {
        Alert.alert(
          "هشدار",
          data.message ?? "نقطه انتخابی خارج از محدوده است."
        );
      } else if (data?.type === "MAP_CLICK") {
        onLocationSelected?.(data);
      }
    } catch {
      Alert.alert("هشدار", "نقطه انتخابی خارج از محدوده است.");
    }
  };

  useEffect(() => {
    if (Platform.OS !== "web") return;
    const handler = (event: MessageEvent) => {
      const data = event.data;
      handleMessage(event);
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <View style={styles.container}>
      {Platform.OS === "web" ? (
        <Iframe
          srcDoc={source.html}
          style={styles.map}
          sandbox="allow-scripts allow-same-origin"
        />
      ) : (
        <WebView
          originWhitelist={["*"]}
          onMessage={handleMessage}
          source={source}
          style={styles.map}
          nestedScrollEnabled
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%" },
  map: { border: "none", width: "100%", height: "100%" },
});

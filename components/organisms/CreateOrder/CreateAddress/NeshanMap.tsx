import { ThemedText } from "@/components";
import { isWeb } from "@/services/helper";
import * as Location from "expo-location";
import React, { useEffect, useMemo, useState } from "react";
import { Alert, Platform, Pressable, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

type LatLng = [number, number];
type Polygon = LatLng[];
type MultiPolygon = Polygon[];

const parseWktMultiPolygon = (wkt) => {
  // Remove SRID if exists
  wkt = wkt.replace(/^SRID=\d+;/, "").trim();

  if (!wkt.startsWith("MULTIPOLYGON")) {
    throw new Error("Not a MULTIPOLYGON WKT");
  }

  // Remove the MULTIPOLYGON ( prefix and trailing ))
  const inner = wkt
    .replace("MULTIPOLYGON", "")
    .trim()
    .replace(/^\(\(\(/, "")
    .replace(/\)\)\)$/, "");

  // Split polygons
  const polygonsRaw = inner.split(")), ((");

  const polygons = polygonsRaw.map((polyStr) => {
    // Split points
    const points = polyStr.split(",").map((point) => {
      const [lng, lat] = point.trim().split(" ").map(Number);
      return [lat, lng];
    });
    return points;
  });

  return polygons;
};

const html = (
  polygons: MultiPolygon,
  showLocation?: boolean,
  currentLocation?: LatLng | null
) =>
  `<!DOCTYPE html>
<html lang="fa">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <link rel="stylesheet" href="https://static.neshan.org/sdk/leaflet/v1.9.4/neshan-sdk/v1.0.8/index.css"/>
  <script src="https://static.neshan.org/sdk/leaflet/v1.9.4/neshan-sdk/v1.0.8/index.js"></script>
  <style>
  html,body,#map{height:100%;width:100%;margin:0}
  .current-location-btn{
    position:absolute;
    bottom:20px;
    right:20px;
    z-index:1000;
    background:#fff;
    border:1px solid #e2e8f0;
    border-radius:999px;
    width:44px;
    height:44px;
    display:flex;
    align-items:center;
    justify-content:center;
    box-shadow:0 4px 12px rgba(15,23,42,0.15);
    cursor:pointer;
  }
  .current-location-btn:active{transform:scale(0.98)}
</style>
</head>
<body>
  <div id="map"></div>
  <button id="current-location" class="current-location-btn" title="موقعیت فعلی">
    ⦿
  </button>
<script>
  const polygons = ${JSON.stringify(polygons)};
  const currentLocation = ${JSON.stringify(currentLocation)};

  const initialPoint = polygons[0]?.[0] ?? [35.699756, 51.338076];
  const map = new L.Map("map", {
    key: "web.0aae3f9bf3ed481db86d2adf916535e9",
    maptype: "neshan",
    center: initialPoint,
    zoom: 14,
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
  let currentLocationMarker = null;

  function upsertCurrentLocation(lat, lng) {
    if (!currentLocationMarker) {
      currentLocationMarker = L.circleMarker([lat, lng], {
        radius: 6,
        color: "#2563eb",
        fillColor: "#3b82f6",
        fillOpacity: 0.9,
        weight: 2,
      }).addTo(map);
      return;
    }
    currentLocationMarker.setLatLng([lat, lng]);
  }

  if (currentLocation && currentLocation.length === 2) {
    upsertCurrentLocation(currentLocation[0], currentLocation[1]);
    map.setView([currentLocation[0], currentLocation[1]], 14);
  }

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
  const [currentLocation, setCurrentLocation] = useState<LatLng | null>(null);

  useEffect(() => {
    requestNativeCurrentLocation();
  }, []);

  const polygons = useMemo(() => {
    if (boundariesWkt?.length > 0)
      return parseWktMultiPolygon(boundariesWkt ?? undefined);
    else return [];
  }, [boundariesWkt]);

  const source = useMemo(
    () => ({ html: html(polygons, isWeb, currentLocation) }),
    [currentLocation, polygons]
  );
  const Iframe = "iframe" as React.ElementType;

  const requestNativeCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      const position = await Location.getCurrentPositionAsync({});
      setCurrentLocation([position.coords.latitude, position.coords.longitude]);
    } catch (error) {
      Alert.alert("هشدار", "دسترسی به موقعیت مکانی امکان‌پذیر نیست.");
    }
  };

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
          sandbox="allow-scripts allow-same-origin allow-geolocation"
        />
      ) : (
        <WebView
          originWhitelist={["*"]}
          onMessage={handleMessage}
          source={source}
          style={styles.map}
          nestedScrollEnabled
          geolocationEnabled
        />
      )}
      {Platform.OS !== "web" && currentLocation && (
        <Pressable
          style={styles.currentLocationButton}
          onPress={requestNativeCurrentLocation}
        >
          <ThemedText style={styles.currentLocationText}>⦿</ThemedText>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%" },
  map: { border: "none", width: "100%", height: "100%" },
  currentLocationButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#0f172a",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    zIndex: 1,
  },
  currentLocationText: {
    color: "#2563eb",
    fontSize: 18,
  },
});

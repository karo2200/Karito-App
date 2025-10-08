// GoogleMapView.web.tsx
import { maxWidth } from "@/constants/Dimension";
import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";

// GoogleMapView.web.tsx  (only the HTML part shown)
const html = `<!DOCTYPE html>
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
  const map = new L.Map("map", {
    key: "web.0aae3f9bf3ed481db86d2adf916535e9",
    maptype: "neshan",
    poi: false, traffic: false,
    center: [35.699756, 51.338076],
    zoom: 14, geolocate: true
  });

  let marker = null;
  function upsertMarker(lat, lng) {
    if (!marker) {
      marker = L.marker([lat, lng]).addTo(map);
    } else {
      marker.setLatLng([lat, lng]);
    }
  }

  // Geolocation -> use the SAME marker
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(pos){
      const lat = pos.coords.latitude, lng = pos.coords.longitude;
      upsertMarker(lat, lng);
      map.setView([lat, lng], 15);
    });
  }

  // Click -> move the SAME marker (or create if none yet)
  map.on("click", function(e){
    const { lat, lng } = e.latlng;
    upsertMarker(lat, lng);
    if (window.parent) {
      window.parent.postMessage({ type: "MAP_CLICK", lat, lng }, "*");
    }
  });

  // optional: hide attribution
  setTimeout(()=>document.querySelectorAll(".leaflet-control-attribution")
    .forEach(el=>el.style.display="none"),0);
</script>
</body>
</html>`;

export default function GoogleMapView({
  onLocationSelected,
}: {
  onLocationSelected?: (pos: { lat: number; lng: number }) => void;
}) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const data = event.data;
      if (data && typeof data === "object" && data.type === "MAP_CLICK") {
        onLocationSelected?.({ lat: data.lat, lng: data.lng });
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [onLocationSelected]);

  return (
    <View style={styles.container}>
      <iframe
        ref={iframeRef}
        srcDoc={html}
        style={styles.map}
        sandbox="allow-scripts allow-same-origin allow-geolocation"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: maxWidth * 0.9 },

  map: { border: "none", width: "100%", height: "100%" },
});

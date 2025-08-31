import { StyleSheet } from "react-native";

import { ThemedView } from "@/components";
// import { WebView } from "react-native-webview";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const html = `<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <title>Map</title>

    <link rel="stylesheet" href="https://static.neshan.org/sdk/leaflet/v1.9.4/neshan-sdk/v1.0.8/index.css"/>
    <script src="https://static.neshan.org/sdk/leaflet/v1.9.4/neshan-sdk/v1.0.8/index.js"></script>

    <style>
        body {
            height: 100vh;
            width: 100vw;
            margin: 0;
        }

        #map {
            height: 100%;
            width: 100%;
        }
    </style>
</head>
<body>
<div id="map"></div>
<script>
    const neshanMap = new L.Map("map", {
        key: "web.0aae3f9bf3ed481db86d2adf916535e9",
        maptype: "neshan",
        poi: false,
        traffic: false,
        center: [35.699756, 51.338076],
        zoom: 14,
        geolocate:true,
    })
    document.querySelectorAll(".leaflet-control-attribution").forEach(el => el.style.display = "none");
    neshanMap.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          neshanMap.removeLayer(layer);
        }
      });

  // گرفتن موقعیت کاربر و اضافه کردن به نقشه
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (pos) {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      // مارکر کاربر
      L.marker([lat, lng], { icon: userIcon }).addTo(neshanMap);

      // مرکز نقشه روی موقعیت کاربر
      neshanMap.setView([lat, lng], 15);
    });
  }
  // add marker to map
  
  let marker = null;

  // هندل کلیک روی نقشه
  neshanMap.on("click", function(e) {
    const { lat, lng } = e.latlng;

    if (marker) {
      marker.setLatLng([lat, lng]); // جابجا کردن مارکر قبلی
    } else {
      marker = L.marker([lat, lng]).addTo(neshanMap); // اولین بار مارکر ساخته میشه
    }

    // ارسال مختصات به React Native WebView (در صورت نیاز)
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ lat, lng }));
    }
  });

</script>
</body>
</html>`;

export default function MapViewS({
  onLocationSelected,
}: {
  onLocationSelected?: (event: any) => void;
}) {
  return (
    <ThemedView style={styles.mapContainer}>
      {/* <WebView
        originWhitelist={["*"]}
        source={{ html }}
        javaScriptEnabled
        onMessage={(event) => {
          onLocationSelected?.(event?.nativeEvent?.data);
        }}
      /> */}
      <MapView provider={PROVIDER_GOOGLE} style={{ flex: 1 }} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginVertical: 16,
    marginTop: 0,
    height: 320,
  },
});

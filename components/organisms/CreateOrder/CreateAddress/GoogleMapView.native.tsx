import * as Location from "expo-location";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Alert, Platform, StyleSheet } from "react-native";

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
      return { latitude: lat, longitude: lng };
    });
    return points;
  });

  return polygons;
};

const GoogleMapView = forwardRef(
  (
    {
      onLocationSelected,
      latLng,
      wkt,
    }: {
      onLocationSelected: ({ lat, lng }: { lat: number; lng: number }) => void;
      latLng?: any;
      wkt?: any;
    },
    ref
  ) => {
    const delta = { latitudeDelta: 0.015, longitudeDelta: 0.015 };

    const [coordinate, setCoordinate] = useState({
      latitude: latLng?.lat ?? 35.7219,
      longitude: latLng?.lng ?? 51.3347,
      ...delta,
    });

    const [polygons, setPolygons] = useState([]);

    useEffect(() => {
      Location.requestForegroundPermissionsAsync();
    }, []);

    useImperativeHandle(ref, () => ({
      changeLocation: ({ latitude, longitude }) => {
        setCoordinate({ latitude, longitude, ...delta });
      },
    }));

    // 🟪 تبدیل همه‌ی شهرها به polygon
    useEffect(() => {
      if (!wkt || wkt?.length < 10) return;

      const polygons = parseWktMultiPolygon(wkt);
      setPolygons(polygons);
    }, [wkt]);

    // 🟥 چک داخل polygon بودن
    const isPointInPolygon = (point, polygon) => {
      let x = point.longitude,
        y = point.latitude;
      let inside = false;

      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].longitude,
          yi = polygon[i].latitude;
        const xj = polygon[j].longitude,
          yj = polygon[j].latitude;

        const intersect =
          yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

        if (intersect) inside = !inside;
      }

      return inside;
    };

    if (Platform.OS === "web") {
      return <Text>Map is not supported on web</Text>;
    }

    const MapModule = require("react-native-maps");
    const MapView = MapModule.default;
    const { Marker, Polygon, PROVIDER_GOOGLE } = MapModule;

    return (
      <MapView
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        region={coordinate}
        zoomEnabled={true}
        zoomControlEnabled={true} // چون خودمون دکمه ساختیم
        showsUserLocation
        onPress={(e) => {
          const { latitude, longitude } = e.nativeEvent.coordinate;
          const point = { latitude, longitude };

          // بررسی داخل کدام پلیگان بودن
          const matchedPolygon = polygons.find((poly) =>
            isPointInPolygon(point, poly)
          );

          if (!matchedPolygon) {
            Alert.alert(
              "خارج از محدوده",
              "لطفا داخل محدوده‌های آبی  کلیک کنید"
            );
            return;
          }

          // انتخاب معتبر
          setCoordinate({ latitude, longitude, ...delta });
          onLocationSelected?.({
            lat: latitude,
            lng: longitude,
          });
        }}
      >
        {polygons.map((coords, index) => (
          <Polygon
            key={index}
            coordinates={coords}
            strokeWidth={2}
            strokeColor="rgba(0,0,0,0.5)"
            fillColor="rgba(0,150,255,0.2)"
          />
        ))}

        <Marker coordinate={coordinate} />
      </MapView>
    );
  }
);

export default GoogleMapView;

const styles = StyleSheet.create({
  container: { width: "100%", height: "100%" },
});

import * as Location from "expo-location";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Alert, Platform, StyleSheet } from "react-native";

const GoogleMapView = forwardRef(
  (
    {
      onLocationSelected,
      latLng,
      cities, // 👈 کل لیست city_getAll
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

    // 🟦 تبدیل boundary → مختصات
    const parseWKTPolygon = (polygonString) => {
      const cleaned = polygonString?.replace("POLYGON((", "").replace("))", "");

      return cleaned?.split(",").map((pair) => {
        const [lng, lat] = pair?.trim()?.split(" ");
        return {
          latitude: Number(lat),
          longitude: Number(lng),
        };
      });
    };

    // 🟪 تبدیل همه‌ی شهرها به polygon
    useEffect(() => {
      if (!cities || cities?.length === 0) return;

      const result = cities.map((c) => ({
        id: c.id,
        name: c.name,
        coords: parseWKTPolygon(c.boundary),
      }));

      setPolygons(result);
    }, [cities]);

    // 🟥 چک داخل polygon بودن
    const isPointInPolygon = (point, polygon) => {
      let inside = false;
      if (!polygon) return;

      for (let i = 0, j = polygon?.length - 1; i < polygon?.length; j = i++) {
        const xi = polygon[i].latitude;
        const yi = polygon[i].longitude;
        const xj = polygon[j].latitude;
        const yj = polygon[j].longitude;

        const intersect =
          yi > point.longitude !== yj > point.longitude &&
          point.latitude <
            ((xj - xi) * (point.longitude - yi)) / (yj - yi) + xi;

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
            isPointInPolygon(point, poly.coords)
          );

          if (!matchedPolygon) {
            Alert.alert(
              "خارج از محدوده",
              "لطفاً داخل یکی از محدوده‌ها کلیک کنید"
            );
            return;
          }

          // انتخاب معتبر
          setCoordinate({ latitude, longitude, ...delta });
          onLocationSelected?.({
            lat: latitude,
            lng: longitude,
            cityId: matchedPolygon.id,
          });
        }}
      >
        {polygons.map((poly) => (
          <>
            {poly?.id && poly?.coords && (
              <Polygon
                key={poly.id}
                coordinates={poly.coords}
                strokeColor="rgba(0,0,255,0.9)"
                fillColor="rgba(0,0,255,0.2)"
                strokeWidth={2}
              />
            )}
          </>
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

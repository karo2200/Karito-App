import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Platform, StyleSheet } from "react-native";

import { ThemedText, ThemedView } from "@/components";
import * as Location from "expo-location";

const GoogleMapView = forwardRef(
  (
    {
      onLocationSelected,
      latLng,
    }: {
      onLocationSelected: (value: any) => void;
      latLng?: any;
    },
    ref
  ) => {
    const delta = { latitudeDelta: 0.015, longitudeDelta: 0.015 };
    const [initialRegion, setInitRegion] = useState({
      latitude: latLng?.lat ?? 35.7219,
      longitude: latLng?.lng ?? 51.3347,
      ...delta,
    });
    const [coordinate, setCoordinate] = useState({
      latitude: latLng?.lat ?? 35.7219,
      longitude: latLng?.lng ?? 51.3347,
      ...delta,
    });

    const requestLocation = async () => {
      await Location.requestForegroundPermissionsAsync();
    };
    useEffect(() => {
      requestLocation();
    }, []);

    useImperativeHandle(ref, () => ({
      changeLocation: ({ latitude, longitude }) => {
        setCoordinate({ latitude, longitude, ...delta });
        setInitRegion({ latitude, longitude, ...delta });
      },
    }));

    // ✅ Web branch (no crash)
    if (Platform.OS === "web") {
      return (
        <ThemedView style={styles.container}>
          <ThemedText>Map is not supported on web</ThemedText>
        </ThemedView>
      );
    }

    // ✅ Mobile branch (require inside branch so it's never touched on web)
    const MapModule = require("react-native-maps");
    const MapView = MapModule.default;
    const { Marker, PROVIDER_GOOGLE } = MapModule;

    return (
      <MapView
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        region={coordinate}
        showsUserLocation
        userLocationCalloutEnabled
        zoomEnabled
        zoomControlEnabled
        onPress={(e) => {
          const { latitude, longitude } = e.nativeEvent.coordinate;
          setCoordinate({ latitude, longitude, ...delta });
          onLocationSelected?.({ lat: latitude, lng: longitude });
        }}
      >
        <Marker coordinate={coordinate} />
      </MapView>
    );
  }
);

export default GoogleMapView;

const styles = StyleSheet.create({
  container: { width: "100%", height: "100%" },
});

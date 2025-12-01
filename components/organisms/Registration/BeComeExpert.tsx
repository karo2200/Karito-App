import React from "react";

import ThemedButton from "@/components/atoms/ThemedButton";
import ThemedText from "@/components/atoms/ThemedText";
import { StyleSheet, View } from "react-native";
import useExpertHook from "./hooks/Expert.hook";
import CityStep from "./Views/CityStep";
import ExitExpertSheet from "./Views/ExitExpertSheet";
import InfoStep from "./Views/InfoStep";
import NationalCodeStep from "./Views/NationalCodeStep";

const BeComeExpert = () => {
  const {
    page,
    setPage,
    exitVisible,
    setExitVisible,
    isLoggedIn,
    router,
    canGoNext,
    onLoginWithoutVerify,
  } = useExpertHook();

  const onPrevPress = () => {
    if (page === 1) {
      if (isLoggedIn) {
        router.back();
      } else {
        setExitVisible(true);
      }
    } else {
      setPage(page - 1);
    }
  };

  const renderPage = () => {
    switch (page) {
      case 1:
        return (
          <NationalCodeStep
            onNextPress={() => {
              setPage(2);
            }}
            onPrevPress={onPrevPress}
          />
        );
      case 2:
        return (
          <CityStep
            onNextPress={() => {
              setPage(3);
            }}
            onPrevPress={onPrevPress}
          />
        );

      case 3:
        return <InfoStep onPrevPress={onPrevPress} />;

      default:
        return <ThemedText>no page</ThemedText>;
    }
  };

  return (
    <View style={styles.container}>
      {renderPage()}
      {!isLoggedIn && canGoNext && (
        <ThemedButton
          title="Next"
          onPress={() => onLoginWithoutVerify()}
          style={styles.btn}
          fontType="bold"
        />
      )}
      <ExitExpertSheet
        visible={exitVisible}
        onClose={() => {
          setExitVisible(false);
        }}
      />
    </View>
  );
};

export default BeComeExpert;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    bottom: 40,
    position: "absolute",
  },
});

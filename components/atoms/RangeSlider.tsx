import { Colors } from "@/constants/Colors";
import { maxWidth } from "@/constants/Dimension";
import { formatPrice } from "@/services/ParseData";
import { toPersianNumber } from "@/services/helper";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { useEffect } from "react";
import { useController } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "..";

const RangeSlider = React.forwardRef(
  (
    {
      min = 0,
      max = 100,
      step = 1,
      setToValue,
      setFromValue,
      name,
      defaultValue,
    }: {
      min: number;
      max: number;
      step: number;
      setToValue?: any;
      setFromValue?: any;
      name: string;
      defaultValue?: any;
    },
    ref
  ) => {
    const { field } = useController({ name });
    const [nonCollidingMultiSliderValue, setNonCollidingMultiSliderValue] =
      React.useState([min, max]);

    useEffect(() => {
      setNonCollidingMultiSliderValue([
        defaultValue?.from ?? min,
        defaultValue?.to ?? max,
      ]);
    }, [defaultValue]);

    const nonCollidingMultiSliderValuesChange = (values) => {
      setNonCollidingMultiSliderValue(values);
      setToValue?.(values[1]);
      setFromValue?.(values[0]);
      field.onChange({ to: values[1], from: values[0] });
    };

    return (
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <ThemedText style={styles.label}>
            {`${toPersianNumber(formatPrice(nonCollidingMultiSliderValue[0]))}`}
          </ThemedText>
          <ThemedText style={styles.label}>
            {`${toPersianNumber(formatPrice(nonCollidingMultiSliderValue[1]))}`}
          </ThemedText>
        </View>
        <MultiSlider
          values={[
            nonCollidingMultiSliderValue[0],
            nonCollidingMultiSliderValue[1],
          ]}
          sliderLength={maxWidth * 0.61}
          onValuesChange={nonCollidingMultiSliderValuesChange}
          min={min}
          max={max}
          step={step}
          allowOverlap={false}
          snapped
          minMarkerOverlapDistance={10}
          trackStyle={styles.track}
          selectedStyle={styles.select}
          markerStyle={styles.marker}
          pressedMarkerStyle={styles.pressedMarker}
        />
      </View>
    );
  }
);

export default RangeSlider;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  label: {
    fontSize: 12,
    color: Colors.gray["600"],
    marginHorizontal: 10,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  marker: {
    width: 14,
    height: 14,
    borderRadius: 4,
    borderWidth: 3,
    borderColor: Colors.karito["600"],
    backgroundColor: Colors.karito["50"],
    marginTop: 4,
  },
  pressedMarker: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 3,
    borderColor: Colors.karito["600"],
    backgroundColor: Colors.karito["50"],
    marginTop: 4,
  },
  track: {
    backgroundColor: Colors.gray["200"],
    height: 6,
    borderRadius: 20,
  },
  select: {
    backgroundColor: Colors.karito["600"],
  },
});

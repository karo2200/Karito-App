import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type StarRatingProps = {
  maxStars?: number;
  size?: number;
  color?: string;
  onChange?: (rating: number) => void;
  initialRating?: number;
};

export default function StarRating({
  maxStars = 5,
  size = 28,
  color = "#FFD700",
  onChange,
  initialRating = 0,
}: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);

  const handlePress = (value: number) => {
    let newRating = value;
    if (rating === value - 0.5) {
      newRating = value;
    } else if (rating === value) {
      newRating = value - 0.5;
    } else {
      newRating = value - 0.5;
    }
    setRating(newRating);
    onChange?.(newRating);
  };

  const renderStar = (index: number) => {
    const starValue = index + 1;
    if (rating >= starValue) {
      return "star"; // پر
    } else if (rating >= starValue - 0.5) {
      return "star-half"; // نیمه
    } else {
      return "star-outline"; // خالی
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: maxStars }).map((_, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => handlePress(i + 1)}
          activeOpacity={0.7}
        >
          <Ionicons name={renderStar(i)} size={size} color={color} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 24,
  },
});

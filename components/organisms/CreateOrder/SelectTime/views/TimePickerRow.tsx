import { ThemedText } from "@/components";
import { Colors } from "@/constants/Colors";
import { toPersianNumber } from "@/services/helper";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Keyboard, StyleSheet, TouchableOpacity, View } from "react-native";
import { CodeField, Cursor } from "react-native-confirmation-code-field";

const MINUTES = ["00", "15", "30", "45"];

export default function TimePickerRow() {
  const { watch, setValue } = useFormContext();
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("00");
  const [open, setOpen] = useState(false);

  const date = watch("date");

  const todayStr = new Date().toISOString().slice(0, 10);
  const now = new Date();
  const nowHour = now.getHours();
  const nowMinute = now.getMinutes();

  const isToday = date === todayStr;

  const onChangeHour = (text: string) => {
    const numeric = text.replace(/[^0-9]/g, "");
    const hourVal = Number(numeric);

    if (numeric.length > 2) return;

    if (numeric.length === 2 && isToday && hourVal < nowHour + 4) {
      const h = Number(numeric);
      const m = Number(minute);

      if (h < nowHour + 4) {
        if (nowHour < 20) setHour(`${nowHour + 4}`);
      } else setHour(numeric);
    } else {
      if (hourVal > 23) setHour("23");
      else setHour(numeric);
    }
  };

  useEffect(() => {
    if (hour.length == 2 && minute.length == 2) {
      // مقدار انتخاب شده

      const [year, month, day] = date
        ? date?.split("-")?.map(Number)
        : [0, 0, 0];
      const dateTime = new Date(
        year,
        month - 1,
        day,
        Number(hour),
        Number(minute)
      );
      setValue("dateTime", dateTime);
    }
  }, [hour, minute]);

  const onSelectMinute = (m: string) => {
    if (isToday && hour !== "") {
      const h = Number(hour);
      const min = Number(m);
      if (h < nowHour || (h === nowHour && min < nowMinute)) {
        return; // reject
      }
    }
    setMinute(m);
    setOpen(false);
  };

  useEffect(() => {
    if (hour.length === 2) {
      Keyboard.dismiss();
    }
  }, [hour]);

  return (
    <View style={styles.container}>
      {/* Hour Input */}
      <View style={styles.hourBox}>
        <ThemedText fontType="light" style={styles.label}>
          ساعت
        </ThemedText>

        <View style={styles.codeWrapper}>
          <CodeField
            value={hour}
            onChangeText={onChangeHour}
            // rootStyle={styles.codeFieldRoot}
            cellCount={2}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <ThemedText key={index} hasNumber style={styles.codeCell}>
                {symbol || (isFocused && <Cursor />)}
              </ThemedText>
            )}
          />
        </View>
      </View>

      {/* Colon */}
      <View style={styles.colonWrapper}>
        <ThemedText style={styles.colon}>:</ThemedText>
      </View>

      {/* Minute Dropdown */}
      <View style={styles.minuteWrapper}>
        <TouchableOpacity style={styles.hourBox} onPress={() => setOpen(!open)}>
          <ThemedText fontType="light" style={styles.label}>
            دقیقه
          </ThemedText>

          <ThemedText style={styles.minuteText}>
            {toPersianNumber(minute)}
          </ThemedText>
        </TouchableOpacity>

        {open && (
          <View style={styles.dropdown}>
            {MINUTES.map((m) => (
              <TouchableOpacity
                key={m}
                style={styles.option}
                onPress={() => {
                  onSelectMinute(m);
                  setOpen(false);
                }}
              >
                <ThemedText fontType="light" style={styles.label}>
                  دقیقه
                </ThemedText>

                <ThemedText style={styles.minuteText}>
                  {toPersianNumber(m)}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
  },

  label: {
    fontSize: 12,
    color: Colors.gray["600"],
  },

  hourBox: {
    alignItems: "center",
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.gray["200"],
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 12,
  },

  codeWrapper: {
    flex: 1,
    alignItems: "center",
  },

  codeCell: {
    borderBottomWidth: 1,
    borderColor: Colors.gray["600"],
    color: Colors.gray["600"],
    marginHorizontal: 2,
    paddingHorizontal: 3,
    width: 30,
    fontSize: 14,
    textAlignVertical: "center",
    textAlign: "center",
    justifyContent: "center",
    borderRadius: 4,
    marginLeft: 4,
  },

  colonWrapper: {
    width: 16,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },

  colon: {
    fontSize: 24,
    color: Colors.gray["600"],
  },

  minuteWrapper: {
    flex: 1,
  },

  minuteText: {
    fontSize: 16,
    alignSelf: "center",
    textAlign: "center",
    flex: 1,
    alignItems: "center",
    color: Colors.gray["600"],
  },

  dropdown: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    overflow: "hidden",
  },

  option: {
    padding: 10,
    flexDirection: "row",
  },
});

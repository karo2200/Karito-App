import { EmptyIncomSvg } from "@/assets";
import { CustomFlatList, ThemedText, ThemedView } from "@/components";
import { Colors } from "@/constants/Colors";
import { commonStyles } from "@/constants/CommonStyles";
import { Calendar } from "iconsax-react-native";

export default function ExpertIncome() {
  const infoArray = [
    { title: "درآمد ماه", value: "۱٫2۰۰٫۵۰۰ ریال" },
    { title: "درآمد هفته", value: "۱۲٫۲۰۰٫۵۰۰ ریال" },
    { title: "درآمد امروز", value: "۴٫۹۰۰٫۰۰۰ ریال" },
  ];

  return (
    <ThemedView style={commonStyles.flex1}>
      <ThemedView
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 8,
          marginBottom: 12,
          alignSelf: "center",
          width: "100%",
        }}
      >
        <ThemedText type="defaultSemiBold" fontType="bold">
          ۱٫2۰۰٫۵۰۰ ریال
        </ThemedText>
        <ThemedText style={{ color: Colors.darkGray }} fontType="bold">
          درآمد تسویه نشده
        </ThemedText>
      </ThemedView>
      <ThemedView
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        {infoArray.map((item, index) => (
          <ThemedView
            key={item.title}
            style={{
              width: "32%",
              borderColor: Colors.lightGray,
              borderWidth: 1,
              borderRadius: 16,
              paddingVertical: 12,
              paddingHorizontal: 8,
              marginRight: index != 2 ? "2%" : 0,
            }}
          >
            <ThemedText style={{ color: Colors.link25 }}>
              {item.title}
            </ThemedText>
            <ThemedText style={{ color: Colors.black }} fontType="bold">
              {item.value}
            </ThemedText>
          </ThemedView>
        ))}
      </ThemedView>
      <ThemedView style={{ width: "100%", marginTop: 12 }}>
        <ThemedView
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            paddingVertical: 8,
            marginBottom: 12,
          }}
        >
          <Calendar size={24} color={Colors.hint500} />
          <ThemedText style={{ color: Colors.black }} fontType="bold">
            لیست تراکنشها
          </ThemedText>
        </ThemedView>

        <CustomFlatList
          data={[1, 2, 3]}
          style={{ width: "100%" }}
          ListEmptyComponent={() => (
            <ThemedView
              style={{
                width: "100%",
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 75,
              }}
            >
              <EmptyIncomSvg />
              <ThemedText
                fontType="bold"
                style={{
                  color: Colors.black500,
                  textAlign: "center",
                  marginTop: 32,
                }}
              >
                در تاریخ انتخابی تراکنشی برای شما ثبت نشده است!
              </ThemedText>
            </ThemedView>
          )}
          renderItem={({ item, index }) => {
            return (
              <ThemedView
                style={{
                  padding: 8,
                  borderWidth: 1,
                  borderColor: Colors.lightGray,
                  borderRadius: 16,
                  width: "100%",
                }}
              >
                <ThemedView
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    marginBottom: 8,
                  }}
                >
                  <ThemedText style={{ color: Colors.infoDark, fontSize: 12 }}>
                    1404/08/02 - 13:11
                  </ThemedText>
                  <ThemedText style={{ color: Colors.successDark }}>
                    ۴٫۹۰۰٫۰۰۰+ ریال
                  </ThemedText>
                </ThemedView>
                <ThemedText style={{ color: Colors.link25, lineHeight: 32 }}>
                  اسم مشتری
                </ThemedText>
              </ThemedView>
            );
          }}
        />
      </ThemedView>
    </ThemedView>
  );
}

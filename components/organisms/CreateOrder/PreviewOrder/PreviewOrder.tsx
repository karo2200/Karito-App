import { Divider, ThemedText, ThemedView } from "@/components";
import { Colors } from "@/constants/Colors";
import { formatPrice } from "@/services/ParseData";
import { toPersianNumber } from "@/services/helper";
import createOrderStore from "@/stores/createOrder";
import { useRoute } from "@react-navigation/native";
import { TableDocument } from "iconsax-react-native";
import moment from "jalali-moment";
import { useFormContext } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import QuestionDivider from "../Views/QuestionDivider";

export default function PreviewOrder(props: any) {
  const item = useRoute().params;
  const { getValues } = useFormContext();
  const values = getValues();
  const requestDate = values?.requestDate;
  const serviceType = values?.serviceType;

  const { address } = createOrderStore();

  const basePrice = useRoute().params?.price;

  const data = [
    {
      label: "هزینه برآورد شده",
      value: `${toPersianNumber(formatPrice(props?.totalPrice ?? 0))}  `,
      extra: "تومان",
    },
    {
      label: "زمان",
      value: moment(new Date(requestDate))
        .locale("fa")
        .format("jYYYY/jMM/jDD dddd [ساعت] HH:mm"),
    },
    { label: "خدمات درخواستی", value: serviceType?.name },
    {
      label: "آدرس",
      value: address,
    },
  ];

  return (
    <View style={styles.flex1}>
      <ThemedView
        style={{
          borderWidth: 1,
          borderColor: Colors.gray["200"],
          paddingTop: 27,
          paddingHorizontal: 16,
          overflow: "hidden",
          borderTopRightRadius: 8,
          borderTopLeftRadius: 8,
          borderBottomWidth: 0,
        }}
      >
        <View style={{ width: "100%", overflow: "hidden" }}>
          <View
            style={{
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <View
              style={{
                backgroundColor: Colors.hint100,
                borderRadius: 16,
                width: 64,
                height: 64,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <TableDocument
                color={Colors.hint["600"]}
                size={33}
                variant="Bold"
              />
            </View>
            <ThemedText
              fontType="bold"
              style={{ fontSize: 14, color: Colors.black }}
            >
              مشخصات سفارش
            </ThemedText>
            <ThemedText
              fontType="bold"
              style={{ fontSize: 12, color: Colors.gray500 }}
            >{`درخواست سرویس «${item?.subService}»`}</ThemedText>
          </View>
          {data?.map((item, index) => (
            <ThemedView
              key={`${item?.value}_${index}_1`}
              style={{
                width: "100%",
                overflow: "hidden",
              }}
            >
              <ThemedView style={styles.rowContainer}>
                <ThemedText
                  style={{
                    color: Colors.gray["950"],
                    fontSize: 14,
                    textAlign: "right",
                  }}
                  fontType="semiBold"
                >
                  {toPersianNumber(item?.value)}
                  {item?.extra && (
                    <ThemedText
                      style={{ color: Colors.gray["950"], fontSize: 10 }}
                      fontType="regular"
                    >
                      {item?.extra}
                    </ThemedText>
                  )}
                </ThemedText>
                <ThemedText
                  fontType="regular"
                  style={{ color: Colors.gray500, fontSize: 12 }}
                >
                  {item?.label}
                </ThemedText>
              </ThemedView>
              {index != data?.length - 1 && (
                <QuestionDivider marginTop={0} marginBottom={0} />
              )}
            </ThemedView>
          ))}
          <Divider height={24} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              bottom: -10,
              right: -10,
              zIndex: 2,
              position: "absolute",
              flexDirection: "row",
            }}
          >
            {Array.from({ length: 60 }).map((item, index) => {
              return (
                <ThemedView
                  key={`${index}`}
                  style={{
                    width: 17,
                    height: 17,
                    borderRadius: 17 / 2,
                    marginHorizontal: 5,
                    borderColor: Colors.gray["200"],
                    borderWidth: 1,
                  }}
                />
              );
            })}
          </View>
          <View
            style={{
              width: "200%",
              height: 1,
              bottom: 0,
              right: -20,
              backgroundColor: Colors.gray["200"],
              position: "absolute",
              zIndex: 1,
            }}
          />
        </View>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    width: "100%",
  },

  flex1: { flex: 1, width: "100%" },

  value2: {
    color: Colors.gray800,
    textAlign: "left",
    marginRight: 20,
    flexShrink: 1,
  },
});

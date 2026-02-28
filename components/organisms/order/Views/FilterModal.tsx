import FilterGroupCheckBox from "@/components/atoms/FilterGroupCheckBox";
import RangeSlider from "@/components/atoms/RangeSlider";
import ThemedButton from "@/components/atoms/ThemedButton";
import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import { maxWidth } from "@/constants/Dimension";
import { FontType } from "@/constants/Fonts";
import {
  ServiceRequestDtoFilterInput,
  ServiceRequestStatus,
  useCountMyRequestsQuery,
} from "@/generated/graphql";
import { toPersianNumber } from "@/services/helper";
import useOrderFilterModalStore from "@/stores/orderFilterModalStore";
import {
  Calendar2,
  Category,
  Money,
  MoreSquare,
  SearchNormal,
} from "iconsax-react-native";
import * as React from "react";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useGetServiceTypesQuery } from "../../subService/hooks";

type FilterOption = {
  label: string;
  checked: boolean;
  value: string;
};

const initialStatuses: FilterOption[] = [
  {
    label: "سفارش ثبت شده",
    checked: false,
    value: ServiceRequestStatus.Pending,
  },
  {
    label: "سفارش تایید شده",
    checked: true,
    value: `${ServiceRequestStatus.AcceptedBySpecialist},${ServiceRequestStatus.SpecialistArrivedToLocation}`,
  },
  {
    label: "سفارش لغو شده",
    checked: false,
    value: `${ServiceRequestStatus.CancelledByCustomer},${ServiceRequestStatus.CancelledBySpecialist}`,
  },
  {
    label: "سفارش انجام شده",
    checked: false,
    value: ServiceRequestStatus.Paid,
  },
  {
    label: "در انتظار پرداخت سفارش",
    checked: false,
    value: ServiceRequestStatus.PendingPayment,
  },
];

export default function OrderFilterModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const [searchValue, setSearchValue] = React.useState("");

  const {
    appliedFilter,
    unAppliedFilter,
    clearUnAppliedFilter,
    setUnAppliedFilter,
    setAppliedFilter,
    clear,
  } = useOrderFilterModalStore();

  const methods = useForm({ mode: "onChange" });
  const { watch, setValue } = methods;

  const { data } = useGetServiceTypesQuery({});

  const filters = useMemo(() => {
    const baseFilters = [
      { title: "فیلتر تاریخ", Icon: Calendar2, name: "date", type: "date" },
      {
        title: "وضعیت سفارش",
        Icon: MoreSquare,
        name: "requestStatus",
        type: "checkbox",
        data: initialStatuses,
      },
      { title: "فیلتر قیمت", Icon: Money, name: "price", type: "price" },
    ];

    if (data?.pages?.length) {
      return [
        {
          title: "دسته بندی سفارشات",
          Icon: Category,
          name: "subService",
          type: "checkbox",
          data: data.pages.map((item) => ({
            label: item?.name,
            value: item?.id,
          })),
        },
        ...baseFilters,
      ];
    }

    return baseFilters;
  }, [data]);

  const requestWhere: ServiceRequestDtoFilterInput = useMemo(() => {
    const watchR = watch();
    const subService = watchR?.subService;
    const requestStatus = watchR?.requestStatus;

    const filter: any[] = [];

    if (subService?.length > 0) {
      filter.push({
        serviceType: { id: { in: subService.map((i: any) => i.value) } },
      });
    }

    if (Array.isArray(requestStatus) && requestStatus.length > 0) {
      filter.push({
        status: {
          in: requestStatus.flatMap((item: any) =>
            item.value.split(",").map((v: string) => v.trim())
          ),
        },
      });
    }

    if (watchR?.price?.from && watchR?.price?.to) {
      filter.push({
        and: [
          { finalPrice: { lte: watchR.price.to } },
          { finalPrice: { gte: watchR.price.from } },
        ],
      });
    }

    return filter.length > 0 ? { and: filter } : {};
  }, [watch()]);

  const { data: myRequest } = useCountMyRequestsQuery({
    where: requestWhere,
  });

  const totalCount =
    myRequest?.serviceRequest_getMyRequests?.result?.totalCount ?? 0;

  const onApplyFilter = () => {
    setAppliedFilter(requestWhere);
    setUnAppliedFilter(watch());
    onClose();
  };

  const handleClose = () => {
    clear();
    clearUnAppliedFilter();
    onClose();
  };

  React.useEffect(() => {
    setValue("subService", unAppliedFilter?.subService);
    setValue("price", unAppliedFilter?.price);
    setValue("requestStatus", unAppliedFilter?.requestStatus);
  }, [appliedFilter]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <Pressable style={styles.modalBackdrop} onPress={onClose} />

        <FormProvider {...methods}>
          <View style={styles.filterPanel}>
            {/* Header */}
            <View style={styles.filterHeader}>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <ThemedText style={styles.closeText} fontType="bold">
                  ✕
                </ThemedText>
              </TouchableOpacity>

              <ThemedText fontType="bold" style={styles.filterTitle}>
                فیلتر سفارش‌ها
              </ThemedText>
            </View>

            {/* Search */}
            <View style={styles.filterSearchContainer}>
              <TextInput
                value={searchValue}
                onChangeText={setSearchValue}
                placeholder="جست و جو در سفارش‌ها"
                placeholderTextColor={Colors.gray["400"]}
                style={styles.filterSearchInput}
                textAlign="right"
              />
              <SearchNormal color={Colors.gray["500"]} size={17} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {filters.map((item, index) => (
                <View style={styles.sectionCard} key={`${item.title}_${index}`}>
                  <View style={styles.sectionHeader}>
                    <ThemedText style={styles.sectionTitle}>
                      {item.title}
                    </ThemedText>
                    {item.Icon && (
                      <item.Icon color={Colors.karito["600"]} size={20} />
                    )}
                  </View>

                  <View style={styles.dividerContainer}>
                    {Array.from({ length: 60 }).map((_, i) => (
                      <View style={styles.dividerDot} key={i.toString()} />
                    ))}
                  </View>

                  {item.type === "checkbox" ? (
                    <View style={styles.fullWidth}>
                      <FilterGroupCheckBox
                        name={item.name}
                        data={item?.data ?? []}
                      />
                    </View>
                  ) : item.type === "date" ? (
                    <View style={styles.dateRow}>
                      <View style={styles.dateBox}>
                        <Calendar2
                          variant="Bold"
                          size={16}
                          color={Colors.gray["500"]}
                        />
                        <ThemedText hasNumber style={styles.dateText}>
                          ۱۴۰۴ / ۱۱ / ۳۰
                        </ThemedText>
                      </View>

                      <ThemedText style={styles.dateDivider}>تا</ThemedText>

                      <View style={styles.dateBox}>
                        <Calendar2
                          variant="Bold"
                          size={16}
                          color={Colors.gray["500"]}
                        />
                        <ThemedText hasNumber style={styles.dateText}>
                          ۱۴۰۴ / ۱۱ / ۳۲
                        </ThemedText>
                      </View>
                    </View>
                  ) : (
                    <RangeSlider
                      min={10000}
                      max={10000000}
                      step={10000}
                      name="price"
                      defaultValue={unAppliedFilter?.price}
                    />
                  )}
                </View>
              ))}
            </ScrollView>

            {/* Footer */}
            <View style={styles.footerButtons}>
              <ThemedButton
                title="پاک کردن"
                fontType="medium"
                onPress={handleClose}
                style={styles.clearButton}
                textStyle={styles.clearButtonText}
              />
              <ThemedButton
                title={toPersianNumber(`مشاهده ${totalCount} سفارش`)}
                fontType="medium"
                onPress={onApplyFilter}
                style={styles.submitButton}
              />
            </View>
          </View>
        </FormProvider>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(30, 41, 59, 0.35)",
    flexDirection: "row",
  },
  modalBackdrop: { flex: 1 },
  filterPanel: {
    width: "88%",
    maxWidth: Platform.OS === "web" ? 560 : maxWidth,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 20,
  },
  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  closeButton: {
    height: 20,
    width: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.gray[500],
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: {
    color: Colors.gray[500],
    lineHeight: 18,
    fontSize: 12,
  },
  filterTitle: { fontSize: 14 },
  filterSearchContainer: {
    borderWidth: 1,
    borderColor: Colors.gray[200],
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  filterSearchInput: {
    flex: 1,
    color: Colors.gray[600],
    fontSize: 14,
    fontFamily: FontType.YekanBakhRegular,
  },
  sectionCard: {
    borderWidth: 1,
    borderColor: Colors.gray[100],
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  sectionTitle: {
    fontSize: 14,
    textAlign: "right",
    marginHorizontal: 6,
  },
  dividerContainer: {
    flexDirection: "row",
    overflow: "hidden",
    marginVertical: 10,
  },
  dividerDot: {
    backgroundColor: Colors.gray["200"],
    width: 3,
    height: 1,
    marginLeft: 3,
  },
  fullWidth: { width: "100%" },
  dateRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  dateBox: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.gray[200],
    borderRadius: 4,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 7,
  },
  dateText: {
    color: Colors.gray[600],
    fontSize: 12,
  },
  dateDivider: {
    color: Colors.gray[600],
    marginHorizontal: 6,
  },
  footerButtons: {
    flexDirection: "row-reverse",
    gap: 12,
    marginTop: 8,
  },
  clearButton: {
    flex: 1,
    backgroundColor: Colors.gray[500],
  },
  clearButtonText: {
    color: Colors.white,
  },
  submitButton: { flex: 2 },
});

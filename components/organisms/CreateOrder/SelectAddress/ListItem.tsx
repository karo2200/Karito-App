import { Divider, ThemedView } from "@/components";
import CustomRadioButton from "@/components/atoms/CustomRadioButton";
import { Colors } from "@/constants/Colors";
import { queryKeys } from "@/constants/queryKeys";
import {
  useAddress_DeleteMutation,
  useAddress_SetPrimaryMutation,
} from "@/generated/graphql";
import createOrderStore from "@/stores/createOrder";
import { useQueryClient } from "@tanstack/react-query";
import { Edit, Trash } from "iconsax-react-native";
import { memo } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const AddressListItem = ({
  item,
  index,
  length,
  onChange,
  field,
  router,
  onClose,
}: {
  item: any;
  index: number;
  length: number;
  onChange?: any;
  field?: any;
  router?: any;
  onClose: () => void;
}) => {
  const {
    addressId,
    setAddressId,
    setCustomerCity,
    setCustomerCityId,
    setAddress,
  } = createOrderStore();

  const isChecked = (field?.value ?? addressId) === item?.id;

  const { mutate, isPending } = useAddress_DeleteMutation();
  const { mutate: primaryMutate, isPending: primaryPending } =
    useAddress_SetPrimaryMutation();
  const queryClient = useQueryClient();

  const onRemoveAddress = () => {
    const id = item?.id;
    mutate(
      { input: { addressId: item?.id } },
      {
        onSuccess: (data) => {
          if (data?.address_delete?.status?.code === 1) {
            if (addressId === id) {
              setAddressId("");
              setCustomerCity("");
              setCustomerCityId("");
              setAddress("");
            }
            queryClient.invalidateQueries({
              queryKey: [queryKeys.address_getMyAddresses],
              exact: false,
            });
          }
        },
      }
    );
  };

  const onEditPress = () => {
    onClose?.();
    router.push(`/CreateAddress?id=${item?.id}`);
  };

  const onItemClick = () => {
    field?.onChange(item.id);
    onChange?.(item);
    primaryMutate({ input: { addressId: item?.id } });
  };

  return (
    <ThemedView key={`${index}_${item?.id}`}>
      <ThemedView style={styles.groupView}>
        <TouchableOpacity onPress={() => onRemoveAddress?.()}>
          <View
            style={{
              width: 24,
              marginRight: 4,
              backgroundColor: Colors.background,
            }}
          >
            {isPending ? (
              <ActivityIndicator color={Colors.hint500} />
            ) : (
              <Trash size={24} color={Colors.darkError} />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onEditPress?.()}>
          <Edit size={24} color={Colors.gray500} style={styles.editIcon} />
        </TouchableOpacity>
        <CustomRadioButton
          checked={isChecked}
          label={item?.text}
          onPress={onItemClick}
        />
      </ThemedView>
      {index != (length > 1 ? length - 1 : 0) && <Divider height={24} />}
    </ThemedView>
  );
};

export default memo(AddressListItem);

const styles = StyleSheet.create({
  editIcon: { backgroundColor: Colors.background },

  groupView: {
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 3,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },

  label: { marginBottom: 16 },
});

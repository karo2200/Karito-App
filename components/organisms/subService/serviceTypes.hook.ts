import { useRoute } from "@react-navigation/native";
import { useGetServiceTypesQuery } from "./hooks";

export default function useServiceTypesHook() {
  const param = useRoute().params;

  const { data, isPending, fetchNextPage, hasNextPage } =
    useGetServiceTypesQuery({
      where: { serviceSubCategoryId: { eq: param?.id } },
    });
  console.log(
    JSON.stringify({ data, where: { serviceSubCategoryId: { eq: param?.id } } })
  );
  const onLoadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  return {
    items: data?.pages,
    isPending,

    item: param,

    onLoadMore,
  };
}

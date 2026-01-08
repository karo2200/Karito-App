import { useGetServiceTypesQuery } from "./hooks";

export default function useServiceTypesHook(props) {
  const param = props;

  const { data, isPending, fetchNextPage, hasNextPage } =
    useGetServiceTypesQuery({
      where: { serviceSubCategory: { id: { eq: param?.id } } },
    });

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

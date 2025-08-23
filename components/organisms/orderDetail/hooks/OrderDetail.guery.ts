import { queryKeys } from "@/constants/queryKeys";
import { ServiceRequest_GetByIdDocument } from "@/generated/graphql";
import { fetcher } from "@/graphql/fetcher";
import { useQuery } from "@tanstack/react-query";

export function useGetServiceById(variables: { id: number }) {
  return useQuery([queryKeys.serviceRequest_getById, variables], () =>
    fetcher(ServiceRequest_GetByIdDocument, variables)
  );
}

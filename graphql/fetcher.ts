import authCacheStore from "@/stores/authCacheStore";
import graphQLClient from "./index";

let count = 0;

type QueryType = {
  res: any;
  args: any;
};

async function graphqlFetcher<T extends QueryType>(
  GQL: string,
  args?: T["args"]
) {
  return await graphQLClient.request(GQL, args);
}

export function fetcher(query: string, variables?: any) {
  count = count += 1;
  return async (): Promise<any> => {
    const accessToken = authCacheStore?.getState()?.accessToken;
    if (accessToken) {
      graphQLClient.setHeader("authorization", "Bearer " + accessToken);
    }

    return await graphqlFetcher(query, variables);
  };
}

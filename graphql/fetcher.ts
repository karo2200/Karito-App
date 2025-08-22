import { Auth_RefreshTokenDocument } from "@/generated/graphql";
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

async function refreshAccessToken() {
  const { accessToken, refreshToken } = authCacheStore.getState() ?? {};

  if (!accessToken || !refreshToken) {
    throw new Error("No tokens available for refresh");
  }

  try {
    const data = await graphqlFetcher(Auth_RefreshTokenDocument, {
      accessToken,
      refreshToken,
    });

    const newAccessToken = data?.auth_refreshToken?.result?.accessToken;
    const newRefreshToken = data?.auth_refreshToken?.result?.refreshToken;

    authCacheStore.setState({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });

    return newAccessToken;
  } catch (err) {
    console.error("Failed to refresh token:", err);
    throw err;
  }
}

export function fetcher<TData, TVariables>(query: string, variables?: any) {
  count = count += 1;
  return async (): Promise<any> => {
    const accessToken = authCacheStore?.getState()?.accessToken;
    const refreshToken = authCacheStore?.getState()?.refreshToken;

    if (accessToken) {
      graphQLClient.setHeader("authorization", "Bearer " + accessToken);
    }
    try {
      return await graphqlFetcher(query, variables);
    } catch (err: any) {
      if (err.response?.status === 401) {
        const newToken = await refreshAccessToken();
        graphQLClient.setHeader("authorization", "Bearer " + newToken);

        return await graphqlFetcher(query, variables);
      }
      throw err;
    }
  };
}

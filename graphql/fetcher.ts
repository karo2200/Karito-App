import { Auth_RefreshTokenDocument } from "@/generated/graphql";
import authCacheStore from "@/stores/authCacheStore";
import { jwtDecode, JwtPayload } from "jwt-decode";
import graphQLClient from "./index";

let count = 0;

type QueryType = {
  res: any;
  args: any;
};

export async function graphqlFetcher<T extends QueryType>(
  GQL: string,
  args?: T["args"]
) {
  return await graphQLClient.request(GQL, args);
}

async function refreshAccessToken() {
  const { accessToken, refreshToken } = authCacheStore.getState();

  if (!accessToken || !refreshToken) {
    throw new Error("No tokens available for refresh");
  }

  try {
    const data = await graphqlFetcher(Auth_RefreshTokenDocument, {
      input: { accessToken, refreshToken },
    });
    const result = data?.auth_refreshToken?.result;

    const newAccessToken = result?.accessToken;
    const newRefreshToken = result?.refreshToken;

    if (newAccessToken && newRefreshToken)
      authCacheStore.setState({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });

    return newAccessToken;
  } catch (err) {
    throw err;
  }
}

export function fetcher<TData, TVariables>(query: string, variables?: any) {
  count = count += 1;
  return async (): Promise<any> => {
    const accessToken = authCacheStore?.getState()?.accessToken;
    console.log("token=>", accessToken);

    if (
      !query.includes("auth_requestOtp") &&
      !query.includes("auth_verifyOtp") &&
      !query.includes("neighborhood_getAll") &&
      (!accessToken || isTokenExpired(accessToken))
    ) {
      const newToken = await refreshAccessToken();

      graphQLClient.setHeader("authorization", "Bearer " + newToken);
      return await graphqlFetcher(query, variables);
    } else {
      graphQLClient.setHeader("authorization", "Bearer " + accessToken);
      return await graphqlFetcher(query, variables);
    }
  };
}

function isTokenExpired(token?: string): boolean {
  if (!token) return true;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return true;

    const now = new Date().getTime();

    return decoded.exp < now / 1000;
  } catch (err) {
    return true;
  }
}

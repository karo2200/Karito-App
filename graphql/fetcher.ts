import { Auth_RefreshTokenDocument } from "@/generated/graphql";
import authCacheStore from "@/stores/authCacheStore";
import { jwtDecode, JwtPayload } from "jwt-decode";
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
      input: { accessToken, refreshToken },
    });

    const newAccessToken = data?.auth_refreshToken?.result?.accessToken;
    const newRefreshToken = data?.auth_refreshToken?.result?.refreshToken;

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

    if (
      !query.includes("auth_requestOtp") &&
      !query.includes("auth_verifyOtp") &&
      (!accessToken || isTokenExpired(accessToken))
    ) {
      const newToken = await refreshAccessToken();

      graphQLClient.setHeader("authorization", "Bearer " + newToken);
    } else {
      graphQLClient.setHeader("authorization", "Bearer " + accessToken);
    }

    return await graphqlFetcher(query, variables);
  };
}

function isTokenExpired(token?: string): boolean {
  if (!token) return true;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return true;

    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch (err) {
    return true;
  }
}

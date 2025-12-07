import { GraphQLClient } from "graphql-request";

export const API_URL = "https://api.karito.net/graphql";

export const graphQLClient = new GraphQLClient(API_URL);

export default graphQLClient;

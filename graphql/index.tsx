import { GraphQLClient } from "graphql-request";

export const API_URL = "http://193.151.152.161:8081/graphql";

export const graphQLClient = new GraphQLClient(API_URL);

export default graphQLClient;

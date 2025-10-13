import { gql } from "graphql-request";

export const reciveRequestSub = gql`
  subscription onServiceRequestStatusChanged($userId: UUID!) {
    onServiceRequestStatusChanged(userId: $userId) {
      newStatus
    }
  }
`;

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import * as React from "react";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
  mutationCache: new MutationCache({
    onError: async (error: any, variables) => {},
    onSuccess: async (data: any) => {},
  }),
  queryCache: new QueryCache({
    onError: (error) => console.log(JSON.stringify({ error })),
  }),
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

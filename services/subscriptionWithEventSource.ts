import EventSource from "react-native-sse";

type MyCustomEvents =
  | "open"
  | "onmessage"
  | "next"
  | "message"
  | "error"
  | "close";

export const useSubscriptionWithEventSource = ({
  variables,
  query,
  callback,
}: {
  variables?: any;
  query?: any;
  callback?: any;
}) => {
  const url = "https://dev-api8081.karito.net/graphql";

  if (!query || !url) {
    throw new Error("Query or URL is undefined");
  }

  const notification = { variables, query };

  const source = new EventSource<MyCustomEvents>(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    },
    method: "POST",
    body: JSON.stringify(notification),
  });

  source.addEventListener("open", (e) => {
    console.log("OPEN", { e });
  });

  source.addEventListener("onmessage", (e) => {
    console.log("NEXT", { e });
    callback?.(e);
  });

  source.addEventListener("next", (e) => {
    console.log("NN", { e });
    callback?.(e);
  });

  source.addEventListener("message", (e) => {
    console.log("MESSAGE", { e });
    callback?.(e);
  });

  source.addEventListener("error", (e) => {
    console.log("ERROR", { e });
  });

  source.addEventListener("close", (e) => {
    console.log("CLOSE EVENT", { e });
  });

  return () => {
    source.removeAllEventListeners();
    source.close();
  };
};

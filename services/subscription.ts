export function subscribe(
  query: string,
  variables: any,
  callback: (message: any) => void
) {
  let unsubscribe;

  function connect() {
    if (!callback) callback = () => {};
    const url = "wss://dev-api8081.karito.net/graphql";

    if (!url) {
      throw new Error("The URL is undefined");
    }

    const webSocket = new WebSocket(url);

    unsubscribe = () => webSocket.close();

    webSocket.onopen = () => {
      // webSocket.send('{"type":"connection_init","payload":{}}');

      const message = {
        id: "1",
        type: "start",
        payload: {
          variables,
          query,
        },
      };

      webSocket.send(JSON.stringify(message));
    };

    webSocket.onmessage = callback;

    webSocket.onclose = function () {
      setTimeout(function () {
        console.log("reconnecting...");
        connect();
      }, 1000);
    };

    webSocket.onerror = (err) => {
      console.log({ err }, url);
      webSocket.close();
    };
  }

  async function persistConnect() {
    let tries = 0,
      connected = false;
    while (!connected && tries < 5) {
      try {
        connect();
        connected = true;
      } catch {
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
      tries++;
    }
  }
  persistConnect();

  return () => {
    if (typeof unsubscribe === "function") unsubscribe?.();
  };
}

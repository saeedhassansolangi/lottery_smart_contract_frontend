import "../styles/globals.css";

//
import { MoralisProvider } from "react-moralis";

// for only the Notification
import { NotificationProvider } from "@web3uikit/core";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      initializeOnMount={false}
      appId="qNsBl9hpuunDTrIICzHy6Qga97eagKHjJW6pkAkA"
      serverUrl="https://z6ravx6zj7v2.usemoralis.com:2053/server"
    >
      <NotificationProvider>
        <Component {...pageProps} />
      </NotificationProvider>
    </MoralisProvider>
  );
}

export default MyApp;

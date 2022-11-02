import React from "react";
import "./assets/styles/App.css";
import { Provider } from "react-redux";
import "antd/dist/antd.min.css";
import { Button, Result } from "antd";
import useNetwork from "hooks/useNetwork";
import store from "redux/store";
import Routers from "router";

function App() {
  const { isOnline: isNetwork } = useNetwork();
  if (!isNetwork)
    return (
      <>
        <Result
          status="404"
          title="No Internet Connection"
          subTitle="Check your Internet Connection or your network."
          extra={
            <Button href="/" type="primary">
              Try Again
            </Button>
          }
        />
      </>
    );
  else {
    return (
      <Provider store={store}>
        <Routers />
      </Provider>
    );
  }
}

export default App;

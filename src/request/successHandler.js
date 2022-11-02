import { notification } from "antd";

import codeMessage from "./codeMessage";

const successHandler = (response) => {
  if (!response.data.success) {
    response = {
      ...response,
      status: 404,
      url: null,
      data: {
        success: false,
        result: null,
      },
    };
  }
  const { data } = response;
  if (data.success === false) {
   
    const message = data && data.message;
    const errorText = message || codeMessage[response.status];
    const { status } = response;
    notification.config({
      duration: 20,
    });
    notification.error({
      message: `Request error ${status}`,
      description: errorText,
    });
  } else {
    const message = data && data.message;
    const successText = message || codeMessage[response.status];
    
    notification.config({
      duration: 20,
    });
    notification.success({
      message: `Request success`,
      description: successText,
    });
  }
  localStorage.setItem("userInfo",JSON.stringify(data));
  
  return data;
};

export default successHandler;

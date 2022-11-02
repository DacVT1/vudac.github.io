import "../assets/styles/AddMember.css";
import { Button, Form, Input,message} from "antd";
import React from "react";
import axios from "axios";
import { API_BASE_URL } from "config/serverApiConfig";
import {getHeader} from "utils/function"
// const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const AddMember = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    axios
      .post(API_BASE_URL + `user`,values,getHeader())
      .then(() => {
        setTimeout(() => {
          message.success("Add success!");
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          message.error("Add fail: " + error + "!");
        }, 1000);
      });

    let dataUser = localStorage.getItem("dataUser");

    if (dataUser) {
      dataUser = JSON.parse(dataUser);
      dataUser = [
        ...dataUser,
        {
          id: dataUser.length + 1,
          ...values,
          address: { city: values.address },
        },
      ];
    } else {
      dataUser = [{ id: 1, ...values, address: { city: values.address } }];
    }
    localStorage.setItem("dataUser", JSON.stringify(dataUser));
    window.location.href = "/";
  };
  return (
    <div>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        // initialValues={{
        //   residence: ["zhejiang", "hangzhou", "xihu"],
        //   prefix: "86",
        // }}
        scrollToFirstError
        style={{color:"black"}}
      >
        <Form.Item
          style={{
            width: "70%",
          }}
        >
          <h1 style={{ color: "red", fontStyle: "bold" }}>
            Create member information
          </h1>
        </Form.Item>
        <Form.Item
          name="ten_nhan_vien"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input name",
            },
          ]}
          style={{
            width: "70%",
          }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
          style={{
            width: "70%",
          }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="mat_khau"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
          style={{
            width: "70%",
          }}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["mat_khau"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("mat_khau") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
          style={{
            width: "70%",
          }}
        >
          <Input.Password />
        </Form.Item> */}

        <Form.Item
          name="ten_tai_khoan"
          label="Username"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your username!",
              whitespace: true,
            },
          ]}
          style={{
            width: "70%",
          }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="so_dien_thoai"
          label="Phone Number"
          maxLength={10}
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
          onChange={(e) => {
            const telNo = e.target.value;
            const re = /^[0-9\b]+$/;
            if (telNo === "" || re.test(telNo)) {
              this.setState({ telNo: e.target.value });
            }
          }}
          style={{
            width: "70%",
          }}
        >
          <Input
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        {/* <Form.Item
          label="Date of birth"
          name="ngay_sinh"
          rules={[
            {
              required: true,
              message: "Please input Date of birth!",
            },
          ]}
          style={{
            width: "70%",
          }}
        >
          <DatePicker />
        </Form.Item> */}
        {/* <Form.Item
          name="website"
          label="Website"
          rules={[
            {
              required: true,
              message: "Please input website!",
            },
          ]}
          style={{
            width: "70%",
          }}
        >
          <AutoComplete
            options={websiteOptions}
            onChange={onWebsiteChange}
            placeholder="website"
          >
            <Input />
          </AutoComplete>
        </Form.Item> */}

        <Form.Item
          name="dia_chi"
          label="Address"
          rules={[
            {
              message: "Please input Address",
            },
          ]}
          style={{
            width: "70%",
          }}
        >
          <Input.TextArea showCount maxLength={100} />
        </Form.Item>

        {/* <Form.Item
          name="gioi_tinh"
          label="Gender"
          rules={[
            {
              required: true,
              message: "Please select gender!",
            },
          ]}
          style={{
            width: "70%",
          }}
        >
          <Select
            placeholder="select your gender"
            maxLength={50}
            style={{
              width: "200px",
            }}
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item> */}

        {/* <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
          style={{
            width: "70%",
          }}
        >
          <Checkbox>
            I have read the <a href="/#">agreement</a>
          </Checkbox>
        </Form.Item> */}
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddMember;

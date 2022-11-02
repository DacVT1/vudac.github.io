import { Form, Input, Button, Modal, message } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React from "react";
import "antd/dist/antd.min.css";
import axios from "axios";
import "../assets/styles/FormLogin.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "redux/auth/selectors";
import { login } from "redux/auth/actions";
import { API_BASE_URL } from "config/serverApiConfig";
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
const FormLogin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleUpdateMember = (values) => {
    axios
      .post(API_BASE_URL + `user/regUser`, {
        ten_tai_khoan: values.ten_tai_khoan.trim(),
        ten_nhan_vien: values.ten_nhan_vien.trim(),
        email: values.email.trim(),
        mat_khau: values.mat_khau.trim(),
        trang_thai: "active",
        don_vi: values.don_vi.trim(),
      })
      .then(() => {
        setTimeout(() => {
          message.success("Create success!");
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          message.error("Create fail:" + error + "!");
        }, 1000);
      });

    window.location.href = "/";
  };
  const { loading: isLoading } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    
    dispatch(login(values));
  };
  return (
    <header className="Login-header">
      <h3 className="title_form">Login</h3>
      <Form name="normal_login" className="login-form" onFinish={onFinish}>
        <Form.Item
          name="ten_tai_khoan"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="mat_khau"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={isLoading}
          >
            Log in
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="text"
            className="login-form-button"
            style={{ color: "white", background: "green" }}
            onClick={showModal}
          >
            or Register
          </Button>
          <Modal
            title="Đăng ký tài khoản"
            footer={null}
            width={700}
            open={isModalOpen}
            onCancel={handleCancel}
          >
            <Form
              name="basic"
              onFinish={handleUpdateMember}
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 19 }}
              autoComplete="off"
              form={form}
              style={{ width: "100%" }}
            >
              <Form.Item
                label="Name"
                name="ten_tai_khoan"
                rules={[
                  {
                    required: true,
                    message: "Please input Name",
                  },
                ]}
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
                  width: "100%",
                }}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="xac_nhan_mat_khau"
                label="Confirm Password"
                dependencies={["mat_khau"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your confirm password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("mat_khau") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
                style={{
                  width: "100%",
                }}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="User-Name"
                name="ten_nhan_vien"
                rules={[
                  {
                    required: true,
                    message: "Please input User Name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
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
                  width: "100%",
                }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Unit"
                name="don_vi"
                rules={[
                  {
                    required: true,
                    message: "Please input Unit",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
                <Button
                  style={{ margin: "0 8px" }}
                  onClick={() => {
                    form.resetFields();
                  }}
                >
                  Clear
                </Button>
              </Form.Item>
            </Form>
          </Modal>
          <Link to={"/forgotPassword"}>Forgot Password</Link>
        </Form.Item>
      </Form>
    </header>
  );
};

export default FormLogin;

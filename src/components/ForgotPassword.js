import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import React,{ useState }  from "react";
import "antd/dist/antd.min.css";
import "assets/styles/ForgotPassword.css";
import { useSelector } from "react-redux";
import { selectAuth } from "redux/auth/selectors";

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'trinhthihuongnamdinh@gmail.com',
//     pass: 'trongdac.'
//   }
// });
const FormLogin = () => {
    const [email, setEmail] = useState('');
  const { loading: isLoading } = useSelector(selectAuth);
  
  const onFinish = async (values) => {
    // var mailOptions = {
    //   from: 'trinhthihuongnamdinh@gmail.com',
    //   to: values.email,
    //   subject: 'Sending Email using Node.js',
    //   text: 'That was easy!'
    // };
    // 
    // 
    // transporter.sendMail(mailOptions, function(error, info){
    //   if (error) {
    //     
    //   } else {
    //     
    //   }
    // });
    // 
  };
  return (
    <header className="Login-header">
      <h3 className="title_form">Reset your password</h3>
      <h6 className="describe_form">We'll email you instructions to reset the password.</h6>
      <Form name="normal_login" className="login-form" onFinish={onFinish}>
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
            width: "100%"
          }}
        >
          <Input 
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your account email"
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
        <Link to={"/"}>Return to login</Link>
      </Form>
    </header>
  );
};

export default FormLogin;

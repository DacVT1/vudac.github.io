import React from "react";
import { useSelector } from "react-redux";
// import axios from "axios";
import { selectAuth } from "redux/auth/selectors";
import AddMember from "components/AddMember";
import MenuHeader from "components/MenuHeader";
import About from "components/About";
import ForgotPassword from "components/ForgotPassword";
import Home from "components/Home";
import Register from "components/Register";
import FormLogin from "components/FormLogin";
import "antd/dist/antd.min.css";
import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import MyAccount from "components/MyAccount";
import ListPosts from "components/ListPosts";
import EditPost from "components/EditPost";


const { Header, Content, Footer } = Layout;
export default function Routers() {
 

  const { isLoggedIn } = useSelector(selectAuth);

  useEffect(() => {
    
  }, [isLoggedIn]);
  if (isLoggedIn === false) {
    
    return( 
      <Routes>
      <Route exact path="/" element={<FormLogin /> }></Route>
      <Route exact path="/forgotPassword" element={<ForgotPassword />}></Route>
    </Routes>
   
    );
  } else
    return (
      <div className="App">
        <Layout className="layout" style={{ minHeight: "100vh" }}>
          <Header>
            <MenuHeader />
            
          </Header>
          <Content
            style={{
              padding: "0 50px",
            }}
          >
            <div className="site-layout-content">
              <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="/about" element={<About />}></Route>
                <Route exact path="/register" element={<Register />}></Route>
                <Route exact path="/addmember" element={<AddMember />}></Route>
                <Route exact path="/myaccount" element={<MyAccount />}></Route>
                <Route exact path="/listposts" element={<ListPosts />}></Route>
                <Route exact path="/editpost/:idpost" element={<EditPost />}></Route>
              </Routes>
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            DacVT1 Design ©2022 Created by DacVT1@fsoft.com.vn
          </Footer>
        </Layout>
      </div>
    );
}

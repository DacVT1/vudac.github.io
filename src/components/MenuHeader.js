import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "redux/auth/actions";
import uniqueId from "utils/uinqueId";
import HeaderContent from "components/HeaderContent";
function MenuHeader() {
  const dispatch = useDispatch();
  const items = [
    { label: <Link to="/">Home</Link>, key: "/home" },
    { label: <Link to="/about">About</Link>, key: "/about" },
    {
      label: <Link to="/addmember">Add Member</Link>,
      key: "/addmember",
    },
    {
      label:'Log Out',
      key:uniqueId(), 
      onClick:() => dispatch(logout())
    },
    {
      label: <Link to="/myaccount">My Account</Link>,
      key: "/myaccount",
    },
    {
      label: <Link to="/listposts">List Post</Link>,
      key: "/listposts",
    },
  ];
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["/home"]}
      items={items}
    >
      <HeaderContent />
    </Menu>
  );
}
export default MenuHeader;

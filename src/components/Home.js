import {
  Table,
  Space,
  Button,
  Modal,
  message,
  Form,
  Input,
  Select
} from "antd";
import "../assets/styles/Home.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import "antd/dist/antd.min.css";
import { API_BASE_URL } from "config/serverApiConfig";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {setCookie} from "auth/cookie"

const { Option } = Select;
const getHeader = () => {
  const token = localStorage.getItem("auth-token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};
function Home() {
  
  const { Search } = Input;
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idMember, setIdMember] = useState("");
  const [formUpdate] = Form.useForm();
  const [isModalVisibleUpdate, setIsModalVisibleUpdate] = useState(false);
  const [users, setUser] = useState([]);
  const [usersearch, setUserSearch] = useState([]);
   //get all user
   useEffect(() => {
    axios
      .get(API_BASE_URL + `users`)
      .then((res) => {
        console.log('res',typeof(res.data.data))
        setUser(res.data.data);
        setCookie('users',res.data.data)
        setUserSearch([])
      })
      .catch((errr) => {
        setUser([]);
        setCookie('users',[])
        setUserSearch([])
      });
  }, []);
  const onSearch = (valueSearch) => {
    setUserSearch([])
    console.log('valueSearch',valueSearch)
    let userss=users.filter((value)=>{
        return value.ten_nhan_vien.toLowerCase().indexOf(valueSearch.toLowerCase())>0
    })
    setUserSearch(userss)
    
  }
  const showModal = (id) => {
    setIdMember(id);
    setIsModalOpen(true);
  };
 
  const handleUpdateMember = (values) => {
    
    //update user
    axios
    .put(API_BASE_URL + `user/${idMember}`,values,getHeader())
    .then(() => {
      setTimeout(() => {
        message.success("update success!");
      }, 1000);
    })
    .catch((error) => {
      setTimeout(() => {
        message.error("update fail: " + error + "!");
      }, 1000);
    });
    formUpdate.resetFields();
      setIsModalVisibleUpdate(false);
    window.location.href = "/";
  };
  const handleOkUpdate = () => {
    setIsModalVisibleUpdate(false);
  };
  const cancelUpdate = () => {
    setIsModalVisibleUpdate(false);
  };
  // show data for member update
  const handleToggleUpdate = (info) => {
    
    setIdMember(info.nhan_vien_id);
    setIsModalVisibleUpdate(true);
    formUpdate.setFieldsValue({
      ten_nhan_vien: info.ten_nhan_vien,
      ten_tai_khoan: info.ten_tai_khoan,
      email: info.email,
      gioi_tinh:info.gioi_tinh,
      dia_chi: info.dia_chi,
      trang_thai: info.trang_thai,
      so_dien_thoai: info.so_dien_thoai,
      don_vi: info.don_vi,
    });
  };
  //thực hiện đồng ý xóa
  const handleOk = () => {
    
    //delete user
    axios
      .delete(API_BASE_URL + `user/${idMember.trim()}`, getHeader())
      .then(() => {
        setTimeout(() => {
          message.success("Delete success!");
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          message.error("Delete fail: " + error + "!");
        }, 1000);
      });
    setIsModalOpen(false);
    setIdMember(-1);
    window.location.href = "/";
  };

  const handleCancel = () => {
    setIdMember(-1);
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "Name",
      name: "ten_nhan_vien",
      dataIndex: "ten_nhan_vien",
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.ten_nhan_vien.length - b.ten_nhan_vien.length,
      key: "ten_nhan_vien",
      render: (text, { id }) => <Link to={"/member/:" + id}>{text}</Link>,
    },
    {
      title: "Email",
      name: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Username",
      name: "ten_tai_khoan",
      dataIndex: "ten_tai_khoan",
      key: "ten_tai_khoan",
    },
    {
      title: "Address",
      name: "dia_chi",
      dataIndex: "dia_chi",
      key: "dia_chi",
    },
    {
      title: "Phone",
      name: "so_dien_thoai",
      dataIndex: "so_dien_thoai",
      key: "so_dien_thoai",
    },
    {
      title: "Action",
      key: "action",
      fixed: 'right',
    width: 100,
      render: (_, re) => (
        <Space size="middle">
          <Button
            onClick={() => {
              
              handleToggleUpdate(re);
            }}
            type="text"
            style={{ color: "blue" }}
            icon={<EditOutlined />}
          >
          </Button>
          {/* modal update member */}
          <Modal
            title="Edit member information"
            open={isModalVisibleUpdate}
            onOk={handleOkUpdate}
            onCancel={cancelUpdate}
            footer={null}
            style={{ width: "70%" }}
          >
            <Form
              name="basic"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 19 }}
              onFinish={handleUpdateMember}
              autoComplete="off"
              form={formUpdate}
            >
              <Form.Item label="Name" name="ten_nhan_vien">
                <Input />
              </Form.Item>

              <Form.Item
                label="Username"
                name="ten_tai_khoan"
                rules={[
                  {
                    required: true,
                    message: "Please input name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              {/* <Form.Item label="Id" name="id" hidden>
                <Input disabled={true} />
              </Form.Item> */}
              <Form.Item label="Status" name="trang_thai">
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
                onChange={ (e) => {
                  const telNo = e.target.value;
                  const re = /^[0-9\b]+$/;
                  if (telNo === '' || re.test(telNo)) {
                    this.setState({ telNo: e.target.value });
                  }
                }}
              >
                <Input />
              </Form.Item>

              <Form.Item name="gioi_tinh" label="Gender">
                <Select
                  placeholder="select your gender"
                  maxLength={50}
                  style={{
                    width: "200px",
                  }}
                >
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="dia_chi"
                label="Address"
                rules={[
                  {
                    message: "Please input Address",
                  },
                ]}
              >
                <Input.TextArea showCount maxLength={100} />
              </Form.Item>
              <Form.Item label="Unit" name="don_vi">
                <Input />
              </Form.Item>
              {/* <Form.Item
                name="website"
                label="Website"
                rules={[
                  {
                    required: true,
                    message: "Please input website!",
                  },
                ]}
              >
                <AutoComplete
                  options={websiteOptions}
                  onChange={onWebsiteChange}
                  placeholder="website"
                >
                  <Input />
                </AutoComplete>
              </Form.Item> */}

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Modal>
          <Button type="text" danger onClick={() => showModal(re.nhan_vien_id)}>
            <DeleteOutlined />
          </Button>
          <Modal
            title="Thông báo"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Bạn có đồng ý xóa không?</p>
          </Modal>
        </Space>
      ),
    },
  ];
  return (
    <div style={{whiteSpace:"nowrap"}}>
      <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200,paddingBottom:20 }} />
      <Table dataSource={usersearch.length>0?usersearch:users} columns={columns} rowKey={"id"} style={{whiteSpace:"nowrap"}}/>
    </div>
  );
}
export default Home;

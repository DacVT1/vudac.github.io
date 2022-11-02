import React from "react";
import axios from "axios";
import { Image, Row, Col,
  Button,
  Modal,
  Form,
  Input,
  message,
  Select} from "antd";
import { API_BASE_URL } from "config/serverApiConfig";
import { useState, useEffect } from "react";
import { UsergroupDeleteOutlined,EditOutlined,ApartmentOutlined,WomanOutlined,MailOutlined,InsertRowBelowOutlined,PaperClipOutlined,TagOutlined } from "@ant-design/icons";
const { Option } = Select;
function MyAccount() {
  const getHeader = () => {
    const token = localStorage.getItem("auth-token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  };
  const [idMember, setIdMember] = useState("");
  const [isModalVisibleUpdate, setIsModalVisibleUpdate] = useState(false);
  const [visible, setVisible] = useState(false);
  const [formUpdate] = Form.useForm();
  const result = JSON.parse(localStorage.getItem("userInfo"));
  
  const [user, setUser] = useState([]);
  // const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get(API_BASE_URL + `user/${result.data.nhan_vien_id}`)
      .then((res) => {
        
        setUser({
          ...res.data.data,
          anh_dai_dien:
            "https://exam-dev-api.web5days.com:5001/" +
            res.data.data.anh_dai_dien,
        });
      })
      .catch((errr) => {
        setUser([]);
      });
  });
  const cancelUpdate = () => {
    setIsModalVisibleUpdate(false);
  };
  const handleOkUpdate = () => {
    setIsModalVisibleUpdate(false);
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
    window.location.href = "/myaccount";
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
  // useEffect(() => {
  
  //     axios
  //     .get(API_BASE_URL + `user-categories/${result.data.nhan_vien_id}`)
  //     .then((res) => {
  //       
  //       setCategories(res);
  //     })
  //     .catch((errr) => {
  //       setCategories([]);
  //       
  //     });
  // });

  return (
    <div>
      <h1>Hồ sơ thành viên</h1>
      <Row >
        <Col style={{ textAlign: "center", margin: 0 }} span={12}>
          <Image
            preview={{ visible: false }}
            width={200}
            src={user.anh_dai_dien}
            onClick={() => setVisible(true)}
          />
          <div style={{ display: "none" }}>
            <Image.PreviewGroup
              preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
            >
              <Image src={user.anh_dai_dien} />
            </Image.PreviewGroup>
          </div>

          <h5 className="card-title">
            {user.ten_nhan_vien
              ? user.ten_nhan_vien.toUpperCase()
              : user.ten_nhan_vien}
          </h5>
          <p className="card-text">
            {user.dia_chi ? user.dia_chi.toUpperCase() : user.dia_chi}
            <br />
            <span className="phone">
              {user.so_dien_thoai ? user.so_dien_thoai : ""}
            </span>
          </p>
        </Col>
        <Col span={12}>
          <div id="London" class="tabcontent">
            <h4><ApartmentOutlined />CHỨC VỤ: </h4>{user.chuc_vu ? user.chuc_vu : ""}
          </div>
          <div id="London" class="tabcontent">
            <h4><MailOutlined />Gmail: </h4>{user.email ? user.email : ""}
          </div>
         
          <div id="London" class="tabcontent">
            <h4><WomanOutlined />GIỚI TÍNH: </h4>{user.gioi_tinh ? (user.gioi_tinh===1?'Nam':'Nữ') : ""}
          </div>
          <div id="London" class="tabcontent">
            <h4><UsergroupDeleteOutlined />NHÓM TÀI KHOẢN: </h4>{user.nhom_nhan_vien_id? (user.nhom_nhan_vien_id==='1'?'Quản lý':'Học sinh') : ""}
          </div>
          <div id="London" class="tabcontent">
            <h4><PaperClipOutlined />GIỚI THIỆU: </h4>{user.gioi_thieu? user.gioi_thieu: ""}
          </div>
          <div id="London" class="tabcontent">
            <h4><TagOutlined />ĐƠN VỊ: </h4>{user.don_vi? user.don_vi: ""}
          </div>
          <div id="London" class="tabcontent">
            <h4><InsertRowBelowOutlined />NGÀY SINH: </h4>{user.ngay_sinh? user.ngay_sinh: ""}
          </div>
          
          <Button
            onClick={() => {
              handleToggleUpdate(user);
            }}
            type="text"
            style={{ width: "100%",background: "#ff4d4f",color:"white",'borderRadius':'16px' }}
            icon={<EditOutlined />}
          >Cập nhật thành viên
          </Button>
          <Modal
            title="Cập nhật thành viên"
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
          
        </Col>
      </Row>
    </div>
  );
}

export default MyAccount;

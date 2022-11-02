// import { useParams } from 'react-router-dom';
import { Image, Row, Col, Form, Select, Input, Switch } from "antd";
import React from "react";
import "antd/dist/antd.min.css";
import { useState, useEffect } from "react";

// import { API_BASE_URL } from "config/serverApiConfig";
// import axios from "axios";

import { IMAGES_URL } from "config/serverApiConfig";
import { getCookie } from "auth/cookie";
const { TextArea } = Input;
function EditPost() {
  // const { idpost } = useParams();
  const [postEdit, setPostEdit] = useState([]);
  const [visible, setVisible] = useState(false);
  // const [formUpdate] = Form.useForm();
  //get post edit

  useEffect(() => {
    if (!getCookie("editPost")) {
      setPostEdit({});
    } else {
      setPostEdit(getCookie("editPost"));
    }
  }, []);

  return (
    <div>
      <h1>Thông tin bài viết</h1>
      <Row>
        <Col style={{ margin: 0 }} span={6}>
          <Image
            preview={{ visible: false }}
            width={200}
            src={IMAGES_URL + postEdit.anh_dai_dien}
            onClick={() => 
              
              setVisible(true)}
          />
          <div style={{ display: "none" }}>
            <Image.PreviewGroup
              preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
            >
              <Image src={IMAGES_URL + postEdit.anh_dai_dien} />
            </Image.PreviewGroup>
          </div>
        </Col>
        <Col span={18}>
          <Form
            name="basic"
            //  initialValues={{tieu_de:postEdit.tieu_de}}
            // form={formUpdate}
          >
            <Row style={{ paddingBottom: "0px" }}>
              <Col span={2}>
                <p style={{ fontWeight: "bold" }}>*Tiêu đề</p>
              </Col>
              <Col span={22}>
                <Form.Item style={{ paddingBottom: "0px" }}>
                  <Input
                    placeholder="Tiêu đề"
                    rules={[
                      {
                        required: true,
                        message: "Hãy nhập tiêu đề!",
                      },
                    ]}
                    value={postEdit.tieu_de}
                    style={{ paddingBottom: "0px" }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row style={{ paddingBottom: "10px" }}>
              <Col span={2}>
                <p style={{ fontWeight: "bold" }}>*Mô tả</p>
              </Col>
              <Col span={22}>
                <TextArea
                  name="mo_ta"
                  rows={3}
                  placeholder="Mô tả"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập mô tả!",
                    },
                  ]}
                  value={postEdit.mo_ta}
                />
              </Col>
            </Row>
            <Row style={{ paddingBottom: "10px" }}>
              <Col span={2}>
                <p style={{ fontWeight: "bold" }}>Nội dung</p>
              </Col>
              <Col span={22}>
                <TextArea
                 onClick={()=>console.log(typeof(postEdit.tin_noi_bat))}
                  name="noi_dung"
                  rows={9}
                  placeholder="Nội dung"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập nội dung!",
                    },
                  ]}
                 value={postEdit.noi_dung}
                />
              </Col>
            </Row>
            <Row>
              <Col style={{ margin: 0 }} span={6}>
                <Form.Item label="*Danh mục" name="danh_muc">
                  <Select defaultValue={
                    postEdit.danh_muc===1?'Khóa học tại CTT':
                    (postEdit.danh_muc===2?'Góc tiếng anh':
                    (postEdit.danh_muc===3?'Góc giải trí':(
                      postEdit.danh_muc===4?'Góc học tập':"Góc hỏi đáp"
                    )))
                  }>
                    <Select.Option value="Khóa học tại CTT">
                      Khóa học tại CTT
                    </Select.Option>
                    <Select.Option value="Góc tiếng anh">
                      Góc tiếng anh
                    </Select.Option>
                    <Select.Option value="Góc giải trí">
                      Góc giải trí
                    </Select.Option>
                    <Select.Option value="Góc học tập">
                      Góc học tập
                    </Select.Option>
                    <Select.Option value="Góc hỏi đáp">
                      Góc hỏi đáp
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col style={{ margin: 0 }} span={6}>
                <Form.Item
                  label="*Trạng thái"
                  name="trang_thai"
                  style={{ paddingLeft: 20 }}
                >
                  <Select defaultValue={postEdit.trang_thai==='active'?"Đang hoạt động":"Bị khóa"}>
                    <Select.Option value="active">
                      Đang hoạt động
                    </Select.Option>
                    <Select.Option value="inactive">Bị Khóa</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col style={{ margin: 0, paddingLeft: 20 }} span={6}>
                <Form.Item
                  label="Là tin nổi bật"
                  name="tin_noi_bat"
                  valuePropName="checked"
                  style={{ paddingLeft: 20 }}
                >
                  <Switch
                 
                    checkedChildren="Có"
                    unCheckedChildren="Không"
                    defaultChecked={true}
                  />
                </Form.Item>
              </Col>
              <Col style={{ margin: 0, paddingLeft: 20 }} span={6}>
                <Form.Item
                  label="Là tin mới"
                  name="tin_moi"
                  style={{ paddingLeft: 20 }}
                >
                  <Switch
                    checkedChildren="Có"
                    unCheckedChildren="Không"
                    defaultChecked={postEdit.tin_moi>0}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
export default EditPost;

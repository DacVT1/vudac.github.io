import React from "react";
import axios from "axios";
import "antd/dist/antd.min.css";
import {
  Table,
  Space,
  Button,
  Input,
  Image,
  Switch,
  message,
  Modal,
} from "antd";
import { DeleteOutlined, EditOutlined, LockOutlined } from "@ant-design/icons";
import {
  API_BASE_URL,
  IMAGES_URL,
  IMAGES_NOT_DEFIND,
} from "config/serverApiConfig";
import { useState, useEffect } from "react";
import { getNameCategories } from "utils/function";
import { getHeader } from "utils/function";
import {setCookie} from "auth/cookie"

function ListPost() {
  const { Search } = Input;
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("");
  const [post, setPost] = useState([]);
  const [postsearch, setPostSearch] = useState([]);
  // let [selected, setSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //get all post
  useEffect(() => {
    axios
      .get(API_BASE_URL + `posts`)
      .then((res) => {
        setPosts(res.data.data);
      })
      .catch((errr) => {
        setPosts([]);
      });
  }, []);
  //search
  const onSearch = (valueSearch) => {
    setPostSearch([]);
    console.log("posts", posts);
    let postss = posts.filter((value) => {
      return value.tieu_de.toLowerCase().indexOf(valueSearch.toLowerCase()) > 0;
    });
    setPostSearch(postss);
  };
  const showModal = (re) => {
    setStatus(re.trang_thai);
    setPost(re);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setStatus(-1);
    setPost(-1);
    setIsModalOpen(false);
  };

  const handleOk = () => {
    //delete post
    if (status === "active") {
      axios
        .put(
          API_BASE_URL + `post/${post.tin_tuc_id}`,
          { ...post, trang_thai: "inactive" },
          getHeader()
        )
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
    } else {
      axios
        .delete(API_BASE_URL + `post/${post.tin_tuc_id}`, getHeader())
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
    }

    setIsModalOpen(false);
    setPost(-1);
    window.location.href = "/listposts";
  };
  const columns = [
    {
      title: "Ảnh bài viết",
      name: "anh_dai_dien",
      dataIndex: "anh_dai_dien",
      key: "anh_dai_dien",
      render: (_, { anh_dai_dien }) => {
        return (
          <Image
            src={
              anh_dai_dien === ""
                ? IMAGES_NOT_DEFIND
                : IMAGES_URL + anh_dai_dien
            }
            style={{ display: "block", width: "100%", objectFit: "cover" }}
          />
        );
      },
    },
    {
      title: "Tiêu đề",
      name: "tieu_de",
      dataIndex: "tieu_de",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.tieu_de.length - b.tieu_de.length,
      key: "tieu_de",
    },

    {
      title: "Nhóm bài viết",
      name: "nhom_bai_viet",
      dataIndex: "nhom_bai_viet",
      sorter: (a, b) => a.tieu_de.length - b.tieu_de.length,
      key: "nhom_bai_viet",
      render: (_, { nhom_tin_tuc_id }) => {
        return getNameCategories(nhom_tin_tuc_id);
      },
    },
    {
      title: "Tin nổi bật",
      name: "tin_noi_bat",
      dataIndex: "tin_noi_bat",
      sorter: (a, b) => a.tieu_de.length - b.tieu_de.length,
      key: "tin_noi_bat",
      render: (_, { tin_noi_bat }) => {
        return (
          <div>
            {/* <Switch onChange={tin_noi_bat?setSelected(true):setSelected(false)}></Switch> <p>{selected ? 'Có' : 'Không'}</p> */}
            <Switch
              checkedChildren="Có"
              unCheckedChildren="Không"
              defaultChecked={tin_noi_bat}
              onClick={() => {
                setTimeout(() => {
                  message.success("Đổi trạng thái thành công.");
                }, 1000);
              }}
            />
          </div>
        );
      },
    },
    {
      title: "Tin mới",
      name: "tin_moi",
      dataIndex: "tin_moi",
      sorter: (a, b) => a.tieu_de.length - b.tieu_de.length,
      key: "tin_moi",
      render: (_, { tin_moi }) => {
        return (
          <div>
            <Switch
              checkedChildren="Có"
              unCheckedChildren="Không"
              defaultChecked={tin_moi}
              onClick={() => {
                setTimeout(() => {
                  message.success("Đổi trạng thái thành công.");
                }, 1000);
              }}
            />
          </div>
        );
      },
    },

    {
      title: "Trạng thái",
      sorter: (a, b) => a.tieu_de.length - b.tieu_de.length,
      name: "trang_thai",
      dataIndex: "trang_thai",
      key: "trang_thai",
      render: (_, { trang_thai }) => {
        return (
          <div>
            {trang_thai === "active" ? (
              <span
                style={{
                  backgroundColor: "rgb(135, 208, 104)",
                  color: "white",
                }}
              >
                Đang hoạt động
              </span>
            ) : (
              <span
                style={{
                  backgroundColor: "#fff1f0",
                  borderColor: "green",
                  color: "#cf1322",
                }}
              >
                Bị khóa
              </span>
            )}
          </div>
        );
      },
    },
    {
      title: "Ngày tạo",
      name: "ngay_tao",
      dataIndex: "ngay_tao",
      sorter: (a, b) => a.tieu_de.length - b.tieu_de.length,
      key: "ngay_tao",
      render: (_, { ngay_tao }) => {
        return <div>{ngay_tao}</div>;
      },
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (_, re) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setCookie("editPost",re)
            }}
            type="text"
            style={{ color: "blue" }}
            icon={<EditOutlined />}
            href={`/editpost/` + re.tin_tuc_id}
          ></Button>

          <Button
            type="text"
            icon={
              re.trang_thai === "active" ? <LockOutlined /> : <DeleteOutlined />
            }
            danger
            onClick={() => {
              showModal(re);
            }}
          ></Button>
          <Modal
            title="Thông báo"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            Bạn có đồng ý {status === "active" ? "KHÓA" : "XÓA"} không?
          </Modal>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div style={{ whiteSpace: "nowrap" }}>
        <Search
          placeholder="input search text"
          allowClear
          style={{ width: 200, paddingBottom: 10 }}
          onSearch={onSearch}
        />
        <Table
          dataSource={postsearch.length > 0 ? postsearch : posts}
          columns={columns}
          rowKey={"id"}
          style={{ whiteSpace: "nowrap" }}
        />
      </div>
    </div>
  );
}

export default ListPost;

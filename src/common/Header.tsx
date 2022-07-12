import { Menu } from "antd";
import { HomeOutlined, FileAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate()

  const items = [
    {
      label: "Home",
      key: "home",
      icon: <HomeOutlined />,
      onClick: () => navigate("/")
    },
    {
      label: "Add New Post",
      key: "post",
      icon: <FileAddOutlined />,
      onClick: () => navigate("/post")
    },
  ];

  return (
    <div className="headerContainer">
      <span>Redux Toolkit Demo</span>
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["home"]}
        items={items}
        theme="dark"
      />
    </div>
  );
};

export default Header;

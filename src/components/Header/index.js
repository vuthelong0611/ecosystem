import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { message, Layout } from "antd";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
const { Header, Footer, Sider, Content } = Layout;
function Header1() {
  return (
    <Header
      style={{
        position: "fixed",
        width: "100%",zIndex: 2,
        height: "88px",
        background: "white",
        boxShadow: "1px,2px,2px,2px",
        top:'0'
      }}
    >
      <div className={cx('head')}>
        <Link to='/'>cart</Link>
        <div>a</div>

      </div>
    </Header>
  );
}

export default Header1;

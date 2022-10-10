import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { message, Layout } from "antd";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../components/Context";

const cx = classNames.bind(styles);
const { Header, Footer, Sider, Content } = Layout;
function Header1() {
  const { user, setUser } = useGlobalContext();
  const logOut = () => {
    localStorage.removeItem("user");
    window.location.reload(true);

    console.log(user);
  };
  return (
    <Header
      style={{
        position: "fixed",
        width: "100%",
        zIndex: 2,
        height: "88px",
        background: "white",
        boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px",
      }}
    >
      <div className={cx("head")}>
        <Link to="/" className={cx('link-home')}>
          <img
            className={cx("img-icon")}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRg35YAs8vvMD9O-v9heloOtzIcUfSfAXrkQ&usqp=CAU"
            alt=""
          /><h2>
            ECOSYSTEM
          </h2>
        </Link>
        
        <div className={cx("cart")}>
          <Link to="/cart"><div>Cart</div></Link>
          <Link to="/manage"><div>Manage</div></Link>

          {user.length !== 0 && (
            <div className={cx("btn-logout")} onClick={logOut}>
              Logout
            </div>
          )}
        </div>
      </div>
    </Header>
  );
}

export default Header1;

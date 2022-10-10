import { Link, Navigate } from "react-router-dom";
import { useGlobalContext } from "../../components/Context";
import { useEffect } from "react";
import styles from "./Cart.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
function Cart() {
  const { user, setUser, cart, setCart, increase, decrease, bill,alert } =
    useGlobalContext();
  



  return (
    <div style={{ marginTop: "100px", marginLeft: "50px" }}>
      <h1>Food Cart</h1>
      {alert && <p>success</p>}
      {cart.map((item) => {
        return (
          <div key={item.id} className={cx("container")}>
            <img src={item.avatar} alt="" className={cx("img")}></img>
            <h3> {item.name}</h3>
           <div className={cx('count')}>
           <button
              onClick={() => {
                increase(item);
              }}
              className={cx('btn1')}
            >
              {" "}
              +
            </button>
            <div>{item.count}</div>

            <button
              onClick={() => {
                decrease(item);
              }}
              className={cx('btn1')}

            >
              {" "}
              -
            </button>
           </div>
            <div>{item.total}</div>
          </div>
        );
      })}
  {cart.length !== 0 &&  <Link className={cx('btn')}  to='/pay'>Order Now</Link>}

    </div>
  );
}

export default Cart;

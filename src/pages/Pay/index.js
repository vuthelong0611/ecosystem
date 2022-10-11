import { Link, Navigate } from "react-router-dom";
import { useGlobalContext } from "../../components/Context";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Pay.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Pay() {
  const { user, setUser, cart, setCart, increase, decrease, bill, removeCart } =
    useGlobalContext();
  const [jobs, setJobs] = useState([]);
  const [jobs1, setJobs1] = useState([]);
  const [jobs2, setJobs2] = useState([]);

  const [code, setCode] = useState("");
  const [code1, setCode1] = useState("");

  const fetchJobs = async () => {
    try {
      const reponse = await axios.get(
        `https://provinces.open-api.vn/api/p/?depth=2`
      );

      setJobs(reponse.data);
      console.log(reponse);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);
  const fetchJobs1 = async (event) => {
    setCode(event);
    try {
      const reponse = await axios.get(
        `https://provinces.open-api.vn/api/p/${event}?depth=2`
      );

      setJobs1(reponse.data.districts);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchJobs2 = async (event) => {
    setCode1(event);
    try {
      const reponse = await axios.get(
        `https://provinces.open-api.vn/api/d/${event}?depth=2`
      );
      setJobs2(reponse.data.wards);
    } catch (error) {
      console.error(error);
    }
  };
  if (user.length === 0) {
    return <Navigate to="/login" replace />;
  } else if (cart.length === 0) {
    return <Navigate to="/" replace />;
  } else {
    return (
      <div style={{ marginTop: "100px" }}>
        {cart.map((item) => {
          return (
            <div key={item.id} className={cx("container")}>
              <img src={item.avatar} alt="" className={cx("img")}></img>
              <h3> {item.name}</h3>
              <div className={cx("count")}>
                <div>{item.count}</div>
              </div>
              <div>{item.total}</div>
            </div>
          );
        })}
        {bill !== 0 && <h2 className={cx("fee")}> Total fee: {bill}</h2>}
        <form className={cx("form")}>
          <select
            name="1"
            onChange={(event) => {
              fetchJobs1(event.target.value);
            }}
            className={cx("select")}
          >
            {jobs.map((item, index) => {
              return (
                <option key={index} value={item.code}>
                  {item.name}
                </option>
              );
            })}
          </select>
          {code !== "" && (
            <select
              name="2"
              onChange={(event) => {
                fetchJobs2(event.target.value);
              }}
              className={cx("select")}
            >
              {jobs1 !== [] &&
                jobs1.map((item, index) => {
                  return (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
          )}
          {code1 !== "" && (
            <select name="3" className={cx("select")}>
              {jobs2 !== [] &&
                jobs2.map((item, index) => {
                  return (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
          )}
        </form>
        <button className={cx("dathang")}>
          <Link to="/success" onClick={removeCart}>
            Dat Hang
          </Link>
        </button>
      </div>
    );
  }
}

export default Pay;

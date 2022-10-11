import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Row, Col } from "antd";
import styles from "./ListFood.module.scss";
import classNames from "classnames/bind";
import { message, Layout, Button } from "antd";
import { useGlobalContext } from "../../components/Context";
import axios from "axios";

const cx = classNames.bind(styles);
function ListFood() {
  const [width, setWidth] = useState(window.innerWidth);
  const [span, setSpan] = useState(0);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    if (width > 740 && width < 1023) {
      setSpan(10);
    } else if (width <= 740) {
      setSpan(15);
    } else {
      setSpan(6);
    }
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, [width]);
  console.log(width);
  console.log(span);
  const isMobile = width <= 768;
  const [jobs, setJobs] = useState([]);
  const [number, setNumber] = useState(1);
  const { orderNow, cart, alert } = useGlobalContext();
  console.log(number);
  const fetchJobs = async () => {
    try {
      const reponse = await axios.get(
        `https://633dafa5f2b0e623dc798346.mockapi.io/api/foods?categoriID=${
          param.name
        }&page=1&limit=${number * 20}`
      );
      setJobs(reponse.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, [number]);

  const param = useParams();
  return (
    <div className={cx("container")}>
      <h1>List Food</h1>
      {alert && <p className={cx("p")}>success</p>}
      <div className="container-fluid">
        <Row gutter={[16, 16]}>
          {jobs.map((item, index) => {
            return (
              <Col md={{ span: span }} key={index}>
                <div className={cx("content")}>
                  <Link to={`/detail${item.name}`} item={item}>
                    {" "}
                    <img className={cx("img")} src={item.avatar} alt=""></img>
                  </Link>
                  
                  <h3>{item.name}</h3>
                <div className={cx('container-price')}>  
                <div className={cx("price")}>
                    <h4>Price:</h4>
                    {` ${item.price}`}
                  </div>

                  <div className={cx("price")}>
                    <h4>Grade:</h4> {` ${item.grade}`}
                  </div>
                  <div>{item.description}</div>
                </div>
                </div>
                <div className={cx("button")}>
                    <button
                      className={cx("btn")}
                      onClick={() => {
                        orderNow(item);
                      }}
                    >
                      Add to Cart
                    </button>
                    <Link
                      className={cx("btn1")}
                      onClick={() => {
                        orderNow(item);
                      }}
                      to="/pay"
                    >
                      Order Now
                    </Link>
                  </div>
              </Col>
            );
          })}
        </Row>
      </div>
      <button
        onClick={() => setNumber((prev) => prev + 1)}
        className={cx("more")}
      >
        More
      </button>
    </div>
  );
}

export default ListFood;

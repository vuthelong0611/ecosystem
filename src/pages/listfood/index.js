import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Row, Col } from "antd";
import styles from "./ListFood.module.scss";
import classNames from "classnames/bind";
import { message, Layout, Button } from "antd";

const cx = classNames.bind(styles);
function ListFood({ a }) {
  const [jobs, setJobs] = useState([]);
  const [number, setNumber] = useState(1);

  console.log(number);
  const fetchJobs = async () => {
    try {
      const reponse = await fetch(
        `https://633dafa5f2b0e623dc798346.mockapi.io/api/foods?categoriID=${
          param.name
        }&page=1&limit=${number * 20}`
      );
      const newJobs = await reponse.json();
      setJobs(newJobs);
      console.log(newJobs);
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
      <div className="container-fluid">
        <Row gutter={[16, 16]}>
          {jobs.map((item, index) => {
            return (
              <Col md={{ span: 6 }} key={index}>
                <div className={cx("content")}>
                  <img className={cx("img")} src={item.avatar} alt=""></img>
                  <h3>{item.name}</h3>
                  {}
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
      <button onClick={() => setNumber((prev) => prev + 1)}></button>
    </div>
  );
}

export default ListFood;

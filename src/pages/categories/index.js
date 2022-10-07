import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Row, Col } from "antd";
import styles from "./Categories.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Categories() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const reponse = await fetch(
        "https://633dafa5f2b0e623dc798346.mockapi.io/api/categories"
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
  }, []);
  return (
    <div className={cx("container")}>
      <h2>Home</h2>
      <div id="about" className="block aboutBlock">
        <div className="container-fluid">
          <Row gutter={[16, 16]}>
            {jobs.map((item, index) => {
              return (
                <Col md={{ span: 6 }} key={index}>
                  <div className={cx('content')}>
                   
                    <Link to={`/listfood${item.id}`} a={item.id}>
                      {" "}
                      <img
                        className={cx("img")}
                        src={item.avatar}
                        alt=""
                      />{" "}
                    </Link>
                    <Link to={`/listfood${item.id}`} a={item.id}>
                      {" "}
                    <h3 className="icon">{item.name}</h3>
                    </Link>
                    <p>{item.price}</p>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Categories;

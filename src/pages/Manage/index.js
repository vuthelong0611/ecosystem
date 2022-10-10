import styles from "./Manage.module.scss";
import classNames from "classnames/bind";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Row, Col } from "antd";
import axios from "axios";
import { useGlobalContext } from "../../components/Context";

const cx = classNames.bind(styles);

function Manage() {
  const [jobs, setJobs] = useState([]);
  const [number, setNumber] = useState(1);
  const { orderNow, cart, alert } = useGlobalContext;
  const fetchJobs = async () => {
    try {
      const reponse = await axios.get(
        `https://633dafa5f2b0e623dc798346.mockapi.io/api/foods?page=${number}&limit=20`
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
    <table className={cx("container")}>
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Price</th>
        <th>Grade</th>
        <th>Contact</th>
      </tr>
      {jobs.map((item, index) => {
        return (
          <tr className={cx("content")} key={index}>
            <td>
              <Link to={`/detail${item.name}`} item={item}>
                {" "}
                <img className={cx("img")} src={item.avatar} alt=""></img>
              </Link>
            </td>
            <td>{item.name}</td>
            <td>{` ${item.price}`}</td>

            <td>{` ${item.grade}`}</td>
            <td>{item.description}</td>
          </tr>

          // </Col>
        );
      })}
<div className={cx('button')}>

<button
        onClick={() => setNumber((prev) => prev - 1)}
        className={cx("more")}
      >
        Prev
      </button>
      <button
        onClick={() => setNumber((prev) => prev + 1)}
        className={cx("more")}
      >
        Next
      </button>
</div>
    </table>
  );
}

export default Manage;

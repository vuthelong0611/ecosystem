import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Detail.module.scss";
import classNames from "classnames/bind";
import { useGlobalContext } from "../../components/Context";
import axios from "axios";

const cx = classNames.bind(styles);
function DetailFood() {
  const {orderNow} = useGlobalContext()
  const [jobs, setJobs] = useState([]);
  const fetchJobs = async () => {
    try {
      const reponse = await axios.get(
        `https://633dafa5f2b0e623dc798346.mockapi.io/api/foods?name=${param.name}`
      );
      setJobs(reponse.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);
  const param = useParams();
  console.log(param);
  let a;
  return (
    <div style={{ marginTop: "100px", marginLeft: "60px" }}>
      {jobs.map((item) => {
        a = [...item.comments];
        console.log(a);
        return (
          <div className={cx("container")} key={item.id}>
            <div>
              <div>
                <img className={cx("img")} src={item.avatar} alt="" />
              </div>
              <h2>{item.name}</h2>
            </div>
            <article className={cx('art')}>
              <div>Grade: {item.grade}</div>
              <div>Price: {item.price}</div>
              <div>Decription: {item.description2}</div>
            </article>
            <div className={cx('button')}>
                  <button className={cx('btn')} onClick={() =>{orderNow(item)}}>Add to Cart</button>
             <Link className={cx('btn1')} onClick={() =>{orderNow(item)}} to='/pay'>Order Now</Link>    
                  </div>
          </div>
        );
      })}
     <div className={cx('container1')}>
     Comment:
      {a &&
        a.map((item, index) => {
          return (
            <div key={index} className={cx('comment')}>
               <div>Author: {item.author}</div>
               <div>Detail: {item.detail}</div>
            </div>
          );
        })}
     </div>
     
    </div>
  );
}

export default DetailFood;

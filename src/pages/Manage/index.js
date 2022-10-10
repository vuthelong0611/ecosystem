import styles from "./Manage.module.scss";
import classNames from "classnames/bind";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Row, Col, Layout } from "antd";
import axios from "axios";
import { useGlobalContext } from "../../components/Context";

const cx = classNames.bind(styles);

function Manage() {
  const [jobs, setJobs] = useState([]);
  const [number, setNumber] = useState(1);
  const { orderNow, cart, alert, hey, setHey, user } = useGlobalContext();
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState("");
  const [description, setDecription] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [address, setAddress] = useState("");

  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAvatar(file);
    console.log(file);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const item = [
      ...hey,
      {
        name: name,
        avatar: avatar.preview,
        des: description,
        res: restaurant,
        address: address,
      },
    ];
    console.log(item);
    setHey(item);
    setName("");
    setDecription("");
    setRestaurant("");
    setAddress("");
    setAvatar();
    localStorage.setItem("cart1", JSON.stringify(hey));
  };
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

  return (
    <section className={cx("all")}>
      <table className={cx("container")}>
        <tbody>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Grade</th>
            <th>Description</th>
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
        </tbody>
      </table>
      <div className={cx("button")}>
        <button
          onClick={() =>
            setNumber((prev) => {
              if (number > 1) {
                return prev - 1;
              }else{
                return prev
              }
            })
          }
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
      <form className={cx("form")} onSubmit={(e) => handleSubmit(e)}>
        <input type="file" onChange={handlePreviewAvatar} required />
        {avatar && (
          <img src={avatar.preview} alt="" className={cx("img_file")}></img>
        )}
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          className={cx("input")}
          required
          placeholder="name"
        />
        <input
          type="text"
          onChange={(e) => {
            setDecription(e.target.value);
          }}
          value={description}
          className={cx("input")}
          required
          placeholder="description"
        />
        <input
          type="text"
          onChange={(e) => {
            setRestaurant(e.target.value);
          }}
          value={restaurant}
          className={cx("input")}
          required
          placeholder="restaurant"
        />
        <input
          type="text"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          value={address}
          className={cx("input")}
          required
          placeholder="address"
        />
        <input type="submit" className={cx("btn-submit")} />
      </form>
    </section>
  );
}

export default Manage;

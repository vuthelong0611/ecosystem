import styles from "./Manage.module.scss";
import classNames from "classnames/bind";
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
const namesort = 'name'
const pricesort = 'price'
const gradesort = 'grade'
  const inputRef = useRef(null);

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
    console.log(avatar);
    setHey(item);
    setName("");
    setDecription("");
    setRestaurant("");
    setAddress("");
    setAvatar();
    inputRef.current.value = null;
    localStorage.setItem("cart1", JSON.stringify(item));
  };
  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar);
    };
  }, [avatar]);
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
  const fetchJobs1 = async () => {
    try {
      const reponse = await axios.get(
        `https://633dafa5f2b0e623dc798346.mockapi.io/api/foods?name=${search}&sortBy=${sort}&order=${order}&page=${number}&limit=20`
      );
      console.log(search);
      setJobs(reponse.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(search);
    console.log(number);

    fetchJobs1();
  };
  const handleSort = (e,b) => {
    e.preventDefault();
    setOrder(e.target.value);
    setSort(b);
  };
  useEffect(
    () => {
      fetchJobs1();
      console.log(order)
    },
    [number] 
  );
  useEffect(
    () => {
      fetchJobs1();
      console.log(order)
    },
    [order] 
  );
  return (
    <div className={cx("all")}>
      <div className={cx('control')}>
      <form onSubmit={handleSearch}>
        <input
          value={search}
          type="text"
          placeholder="search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
     <form>
     name sort <select
          name="3"
          className={cx("select")}
          onChange={(e) => handleSort(e,namesort)}
        >
          <option value="desc">desc</option>
          <option value="asc">asc</option>
        </select>
      </form>
      <form>
     grade sort <select
          name="3"
          className={cx("select")}
          onChange={(e) => handleSort(e,gradesort)}
        >
          <option value="desc">desc</option>
          <option value="asc">asc</option>
        </select>
      </form>
      <form>
     price sort <select
          name="3"
          className={cx("select")}
          onChange={(e) => handleSort(e,pricesort)}
        >
          <option value="desc">desc</option>
          <option value="asc">asc</option>
        </select>
      </form>
      </div>
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
              } else {
                return prev;
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
        <input
          type="file"
          onChange={handlePreviewAvatar}
          required
          accept=".jpg"
          ref={inputRef}
        />
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
    </div>
  );
}

export default Manage;

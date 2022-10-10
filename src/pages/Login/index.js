import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import { useHisor } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";
import { useGlobalContext } from "../../components/Context";
import axios from "axios";

const cx = classNames.bind(styles);
function Login() {
  const { user, setUser } = useGlobalContext();
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState({});
  const [message, setMessage] = useState("a");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
  );
  const onSubmit1 = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://633dafa5f2b0e623dc798346.mockapi.io/api/users?email=${email}&password=${password}`
      );
      
      if (response !== null) {
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.reload(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const validate = (e) => {
    setEmail(e.target.value);
    if (!validEmail.test(email)) {
      setEmailErr(true);
    } else {
      setEmailErr(false);
    }
  };
  console.log(user.length);
  if (user.length !== 0) {
    return <Navigate to="/pay" replace />;
  } else {
    return (
      <form className={cx("container")} onSubmit={onSubmit1}>
        <div className={cx("input")}>
          <div className={cx("p")}>Email</div>
          <input
            type="email"
            {...register("email")}
            placeholder="email"
            onChange={validate}
            value={email}
            required
          />
        </div>
        <div className={cx("input")}>
          <div className={cx("p")}>Password</div>
          <input
            type="password"
            {...register("password")}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <input className={cx("submit")} type="submit" />
        {emailErr && <p>Your email is invalid</p>}
      </form>
    );
  }
}

export default Login;

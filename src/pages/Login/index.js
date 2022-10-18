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
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [emailErr, setEmailErr] = useState(false);
  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
  );
  const onSubmit1 = async (data) => {
    try {
      const response = await axios.get(
        `https://633dafa5f2b0e623dc798346.mockapi.io/api/users?email=${data.email}&password=${data.password}`
      );

      if (response !== null) {
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.reload(true);
        console.log(response);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const validate = (e) => {
    if (!validEmail.test(e.target.value)) {
      setEmailErr(true);
    } else {
      setEmailErr(false);
    }
  };
  if (user.length !== 0) {
    return <Navigate to="/pay" replace />;
  } else {
    return (
      <form
        className={cx("container")}
        onSubmit={handleSubmit((data) => onSubmit1(data))}
      >
        <div className={cx("input")}>
          <div className={cx("p")}>Email</div>
          <input
            type="email"
            {...register("email")}
            placeholder="email"
            onChange={validate}
            required
          />
        </div>
        <div className={cx("input")}>
          <div className={cx("p")}>Password</div>
          <input
            type="password"
            {...register("password")}
            placeholder="password"
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

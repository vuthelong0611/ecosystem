import styles from "./Success.module.scss";
import classNames from "classnames/bind";
import { useEffect } from "react";

const cx = classNames.bind(styles);

function Success() {
 
  return <h1 style={{ marginTop: "110px" }}> Success </h1>;
}

export default Success;

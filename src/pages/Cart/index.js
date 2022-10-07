import { Navigate } from "react-router-dom";

function Cart() {
  const user = true;
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>hello</>;
}

export default Cart;

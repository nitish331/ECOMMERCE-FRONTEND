import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getOrderDetail,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import Loader from "../layouts/Loader/Loader";
import MetaData from "../layouts/MetaData";
import SideBar from "./SideBar";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_REQUEST_RESET } from "../../constants/orderConstants";
import "./ProcessOrder.css";

const ProcessOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { order, error, loading } = useSelector((state) => state.orderDetail);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const [status, setStatus] = useState("");

  const { id } = useParams();

  const processOrder = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("order Updated succesfully");
      dispatch({ type: UPDATE_ORDER_REQUEST_RESET });
    }

    dispatch(getOrderDetail(id));
  }, [dispatch, alert, error, id, isUpdated, updateError]);

  return (
    <>
      <MetaData title={"Process Order"} />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmShippingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{order && order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order &&
                          order.shippingInfo &&
                          order.shippingInfo.phoneNumber}
                      </span>
                    </div>
                    <div>
                      <p>Address</p>
                      <span>
                        {order &&
                          order.shippingInfo &&
                          `${order.shippingInfo.address},${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.pinCode},${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order &&
                          order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "Paid"
                          : "Not Paid"}
                      </p>
                    </div>
                    <div>
                      <p>Amount</p>
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>
                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                          <span>
                            {item.quantity}×${item.price}=
                            <b>${item.quantity * item.price}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: order.orderStatus === "delivered" ? "none" : "block",
                }}
              >
                <form className="updateOrderForm" onSubmit={processOrder}>
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value={""}>Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value={"shipped"}>Shipped</option>
                      )}
                      {order.orderStatus === "shipped" && (
                        <option value={"delivered"}>Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProcessOrder;

import React, { useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { useNavigate } from "react-router-dom";
import { Backdrop } from "@material-ui/core";
import DashBoardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCart from "@material-ui/icons/ShoppingCart";

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { cartItems } = useSelector((state) => state.cart);

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCart
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "LogOut", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashBoardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigator("/admin/dashboard");
  }

  function orders() {
    navigator("/orders");
  }

  function account() {
    navigator("/account");
  }

  function cart() {
    navigator("/cart");
  }

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Succesfully");
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            alt="avatar"
            src={
              user.avatar.url
                ? user.avatar.url
                : "https://www.pngall.com/wp-content/uploads/5/Profile.png"
            }
            className={"speedDialIcon"}
          />
        }
      >
        {options.map((items) => (
          <SpeedDialAction
            key={items.name}
            icon={items.icon}
            tooltipTitle={items.name}
            onClick={items.func}
            tooltipOpen={window.innerWidth < 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;

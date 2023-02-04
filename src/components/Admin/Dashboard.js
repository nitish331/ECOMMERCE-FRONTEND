import React, { useEffect } from "react";
import SideBar from "./SideBar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getAdminProducts } from "../../actions/productActions.js";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userActions.js";
Chart.register(CategoryScale);

const Dashboard = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getAdminProducts());

    dispatch(getAllOrders());

    dispatch(getAllUsers());
  }, [dispatch]);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197,72,40)"],
        data: [0, 4000],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out Of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#001684", "#640084"],
        hoverBackgroundColor: ["#465000", "#350141"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };
  return (
    <div className="dashboard">
      <SideBar />

      <div className="dashboardContainer">
        <Typography component={"h1"}>Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> $200
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to={"/admin/products"}>
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to={"/admin/orders"}>
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to={"/admin/users"}>
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

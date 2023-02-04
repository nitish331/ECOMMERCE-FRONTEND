import React from "react";
import "./SideBar.css";
import { TreeItem, TreeView } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAlt from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sidebar">
      <Link to={"/"}>
        <img
          src="https://th.bing.com/th/id/OIP.RdFVon4pj5jideoLKjE1DQHaHa?pid=ImgDet&rs=1"
          alt="ECOMMERCE"
        />
      </Link>
      <Link to={"/admin/dashboard"}>
        <DashboardIcon /> Dashboard
      </Link>
      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to={"/admin/products"}>
              <TreeItem
                nodeId="2"
                label="All"
                icon={<PostAddIcon />}
              ></TreeItem>
            </Link>
            <Link to={"/admin/product"}>
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />}></TreeItem>
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to={"/admin/orders"}>
        <p>
          <ListAlt /> Orders
        </p>
      </Link>
      <Link to={"/admin/users"}>
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to={"/admin/reviews"}>
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default SideBar;

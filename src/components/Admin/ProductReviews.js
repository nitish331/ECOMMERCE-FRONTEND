import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productReviews.css";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import {
  clearErrors,
  getAllReviews,
  deleteReview,
} from "../../actions/productActions";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigator = useNavigate();

  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.review
  );
  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (id) => {
    dispatch(deleteReview(id, productId));
  };

  const productReviewSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review deleted Successfully");
      navigator("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, isDeleted, deleteError, productId]);

  const column = [
    { field: "id", headerName: "Review Id", minWidth: 200, flex: 0.5 },
    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },
    { field: "comment", headerName: "Comment", minWidth: 350, flex: 1 },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.3,
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <>
      <MetaData title={"All Reviews -- Admin"} />

      <div className="dashboard">
        <SideBar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">All Reviews</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={column}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductReviews;

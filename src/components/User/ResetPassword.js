import React, { useEffect, useState } from "react";
import "./ResetPassword.css";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../layouts/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadUser,
  resetPassword,
} from "../../actions/userActions";
import { useAlert } from "react-alert";
import MetaData from "../layouts/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigator = useNavigate();
  const { token } = useParams();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myform = new FormData();

    myform.set("password", password);
    myform.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(token, myform));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Updated Succesfully");

      navigator("/login");
    }
  }, [alert, error, dispatch, navigator, success]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Change Password"} />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>
              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpenIcon />
                  <input
                    type={"password"}
                    placeholder="New Password"
                    value={password}
                    name="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="signUpPassword">
                  <LockIcon />
                  <input
                    type={"password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    name="password"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type={"submit"}
                  value="Reset"
                  className="resetPasswordBtn"
                  disabled={loading ? true : false}
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResetPassword;

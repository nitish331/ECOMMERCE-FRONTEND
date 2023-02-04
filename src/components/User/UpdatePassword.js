import React, { useEffect, useState } from "react";
import "./UpdatePassword.css";
import { useNavigate } from "react-router-dom";
import Loader from "../layouts/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadUser,
  updatePassword,
} from "../../actions/userActions";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../layouts/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigator = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myform = new FormData();

    myform.set("oldPassword", oldPassword);
    myform.set("newPassword", newPassword);
    myform.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myform));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Succesfully");

      navigator("/account");

      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [alert, error, dispatch, navigator, isUpdated]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Change Password"} />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>
              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="signUpPassword">
                  <VpnKeyIcon />
                  <input
                    type={"password"}
                    placeholder="Old Password"
                    value={oldPassword}
                    name="password"
                    required
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type={"password"}
                    placeholder="New Password"
                    value={newPassword}
                    name="password"
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
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
                  value="Change"
                  className="updatePasswordBtn"
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

export default UpdatePassword;

import React, { useEffect, useState } from "react";
import "./UpdateProfile.css";
import { useNavigate } from "react-router-dom";
import Loader from "../layouts/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadUser,
  updateProfile,
} from "../../actions/userActions";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../layouts/MetaData";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigator = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(
    "https://th.bing.com/th/id/OIP.GHGGLYe7gDfZUzF_tElxiQHaHa?pid=ImgDet&rs=1"
  );

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myform = new FormData();

    myform.set("name", name);
    myform.set("email", email);
    myform.set("avatar", avatar);
    dispatch(updateProfile(myform));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState == 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Succesfully");
      dispatch(loadUser());

      navigator("/account");

      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [alert, error, dispatch, navigator, isUpdated, user]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Update Profile"} />
          <div className="UpdateProfileContainer">
            <div className="UpdateProfileBox">
              <h2 className="UpdateProfileHeading">Update Profile</h2>
              <form
                className="UpdateProfileForm"
                encType="Multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="UpdateProfileName">
                  <FaceIcon />
                  <input
                    type={"text"}
                    name="name"
                    placeholder="Name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="UpdateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type={"email"}
                    placeholder="Email"
                    name="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type={"file"}
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type={"submit"}
                  value="Update"
                  className="UpdateProfileBtn"
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

export default UpdateProfile;

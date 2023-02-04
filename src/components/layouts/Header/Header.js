import React from "react";
import { ReactNavbar } from "overlay-navbar";
import { MdAccountCircle } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";

const Header = () => {
  return (
    <ReactNavbar
      burgerColor="#eb4034"
      logo={
        "https://th.bing.com/th/id/OIP.RdFVon4pj5jideoLKjE1DQHaHa?pid=ImgDet&rs=1"
      }
      logoWidth="20vmax"
      navColor1="white"
      logoHoverSize="10px"
      logoHoverColor="#eb4034"
      link1Text="Home"
      link2Text="Products"
      link3Text="Contact"
      link4Text="About"
      link1Url="/"
      link2Url="/products"
      link3Url="/contact"
      link4Url="/about"
      link1Size="1.6vmax"
      link1Color="rgba(35,35,35,0.8)"
      profileIconColor="rgba(35,35,35,0.8)"
      searchIconColor="rgba(35,35,35,0.8)"
      cartIconColor="rgba(35,35,35,0.8)"
      nav1justifyContent="flex-end"
      nav2justifyContent="flex-end"
      nav3justifyContent="flex-start"
      nav4justifyContent="flex-start"
      link1ColorHover="#eb4034"
      link1Margin="2vmax"
      profileIcon={true}
      cartIcon={true}
      ProfileIconElement={MdAccountCircle}
      CartIconElement={MdAddShoppingCart}
      SearchIconElement={MdSearch}
      searchIcon={true}
      profileIconColorHover="#eb4034"
      searchIconColorHover="#eb4034"
      cartIconColorHover="#eb4034"
      cartIconMargin="1vmax"
      profileIconUrl="/login"
    />
  );
};

export default Header;

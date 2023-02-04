import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
  const visitYoutube = () => {
    window.location =
      "https://www.youtube.com/channel/UCW1ehWd7Br3EdqY8rzQxxig";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://th.bing.com/th/id/OIP.udGjDfjhW7LoBakbZAVLqAHaKL?pid=ImgDet&rs=1"
              alt="Founder"
            />
            <Typography>Nitish Kathuria</Typography>
            <Button onClick={visitYoutube} color="primary">
              Visit Youtube
            </Button>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.youtube.com/channel/UCW1ehWd7Br3EdqY8rzQxxig"
              target="blank"
            >
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

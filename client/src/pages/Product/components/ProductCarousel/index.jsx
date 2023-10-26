import { Box } from "@mui/material";
import React, { Component } from "react";
import Slider from "react-slick";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
    };
    return (
      <Box
        sx={{
          "& .slick-arrow.slick-next": { display: "none !important" },
          "& .slick-arrow.slick-prev": { display: "none !important" },
        }}
      >
        <Slider {...settings}>
          <Box
            sx={{ width: "100%", height: "400px" }}
            component="img"
            src="https://as1.ftcdn.net/v2/jpg/01/94/82/86/1000_F_194828624_llDpKzFNYmi6cfHVF8GOOoAe5KTJlc9N.jpg"
            alt=""
          />
          <Box
            sx={{ width: "100%", height: "400px" }}
            component="img"
            src="https://as1.ftcdn.net/v2/jpg/03/02/28/50/1000_F_302285002_Oe4eiCoe3AUpdxcdinpcisKXkUvqlIW0.jpg"
            alt=""
          />
          <Box
            sx={{ width: "100%", height: "400px" }}
            component="img"
            src="https://as2.ftcdn.net/v2/jpg/02/57/19/97/1000_F_257199717_Xy7L8AG3k25iyrgCLZzKiNhlHmSmAtzY.jpg"
            alt=""
          />
          <Box
            sx={{ width: "100%", height: "400px" }}
            component="img"
            src="https://as2.ftcdn.net/v2/jpg/01/71/16/81/1000_F_171168121_ex4mFFcZf5WFqcDNiwk0Gm8UJfm5xRsS.jpg"
            alt=""
          />
        </Slider>
      </Box>
    );
  }
}

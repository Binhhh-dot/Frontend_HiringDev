import React, { useEffect } from "react";
import { Button } from "reactstrap";

const ScrolltoTop = () => {
  useEffect(() => {
    const scrollFunction = () => {
      const mybutton = document.getElementById("back-to-top");
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    };

    window.onscroll = scrollFunction;

    return () => {
      // Cleanup the event listener when the component is unmounted
      window.onscroll = null;
    };
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <Button id="back-to-top" className="p-0" onClick={scrollTop}>
      <i className="mdi mdi-arrow-up"></i>
    </Button>
  );
};


export default ScrolltoTop;

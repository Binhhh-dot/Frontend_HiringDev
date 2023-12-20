import React from "react";
import Section from "../Services/Section";
import ServicePage from "../Services/ServicePage";

const Services = () => {
  document.title = "Services | WeHire ";
  return (
    <React.Fragment>
      <Section />
      <ServicePage />
    </React.Fragment>
  );
};

export default Services;

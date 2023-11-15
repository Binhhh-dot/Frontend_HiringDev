import React, { useEffect } from "react";
import { Container } from "reactstrap";
//import JobFilters from "../CandidateList/JobFilters";
import HiringRequestDetails from "./HiringRequestDetails";
import Section from "./Section";
import { useNavigate } from "react-router-dom";

//import Pagination from "../JobList2/Pagination";

const HiringRequestListInCompanyPartnerDetail = () => {
  document.title = "Hiring Request List In Company Partner Detail";
  const navigate = useNavigate();
  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === null) {
      navigate("/signin");
    } else if (role === 'manager') {
      navigate("/error404");
    }
  });
  return (
    <React.Fragment>
      <Section />
      {/* <JobFilters /> */}
      <HiringRequestDetails />
      {/* <Pagination /> */}

    </React.Fragment>
  );
};

export default HiringRequestListInCompanyPartnerDetail;

import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
//import JobFilters from "../CandidateList/JobFilters";
import HiringRequestDetails from "./HiringRequestDetails";
import Section from "./Section";
import { useNavigate, useLocation } from "react-router-dom";
import userAuthorization from "../../../utils/userAuthorization";

//import Pagination from "../JobList2/Pagination";

const HiringRequestListInCompanyPartnerDetail = () => {
  document.title = "Hiring Request List In Company Partner Detail";
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoad, setIdLoad] = useState(false);
  useEffect(() => {
    const localStorageRole = localStorage.getItem('role');
    if (!localStorageRole) {
      navigate("/signin");
    } else {
      if (!userAuthorization(localStorageRole, location.pathname)) {
        navigate("/error404");
      } else {
        setIdLoad(true)
      }
    }
  }, []);
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

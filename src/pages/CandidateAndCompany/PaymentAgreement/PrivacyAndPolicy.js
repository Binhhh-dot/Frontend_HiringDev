import React, { useEffect, useState } from "react";
import Section from "./Section";
import PrivacyAndPolicyPage from "./PrivacyAndPolicyPage";
import { useNavigate, useLocation } from "react-router-dom";
import userAuthorization from "../../../utils/userAuthorization";

const PaymenAgreement = () => {
  document.title =
    "Privacy & Policy | Jobcy - Job Listing Template | Themesdesign";
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
      <PrivacyAndPolicyPage />
    </React.Fragment>
  );
};
export default PaymenAgreement;

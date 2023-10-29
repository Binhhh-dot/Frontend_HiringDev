import React from "react";
import Section from "./Section";
import PrivacyAndPolicyPage from "./PrivacyAndPolicyPage";
const PaymenAgreement = () => {
  document.title =
    "Privacy & Policy | Jobcy - Job Listing Template | Themesdesign";
  return (
    <React.Fragment>
      <Section />
      <PrivacyAndPolicyPage />
    </React.Fragment>
  );
};
export default PaymenAgreement;

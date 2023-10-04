import React from "react";
import { Container } from "reactstrap";
//import JobFilters from "../CandidateList/JobFilters";
import CandidateGridDetails from "./CandidateGridDetails";
import Section from "./Section";
//import Pagination from "../JobList2/Pagination";

const HiringRequestListInCompanyPartnerDetail = () => {
  document.title = "Hiring Request List In Company Partner Detail";
  return (
    <React.Fragment>
      <Section />
      <section className="section">
        <Container>
          {/* <JobFilters /> */}
          <CandidateGridDetails />
          {/* <Pagination /> */}
        </Container>
      </section>
    </React.Fragment>
  );
};

export default HiringRequestListInCompanyPartnerDetail;

import React from "react";
import { Container, Row } from "reactstrap";
import JobVacancy2 from "./HiringRequestListInCompanyPartnerDetail";
import Section from "./Section";
import Pagination from "../JobList2/Pagination";
import HiringRequestListInCompanyPartner from "./HiringRequestListInCompanyPartnerDetail";
import HiringRequestListInCompanyPartnerDetail from "./HiringRequestListInCompanyPartnerDetail";

const HiringRequestListInCompanyPartner = () => {
  document.title = "Job Grid2 | Jobcy - Job Listing Template | Themesdesign";
  return (
    <React.Fragment>
      <Section />
      <section className="section">
        <Container>
          <Row>
            <HiringRequestListInCompanyPartnerDetail />
          </Row>
          <Pagination />
        </Container>
      </section>
    </React.Fragment>
  );
};

export default HiringRequestListInCompanyPartner;

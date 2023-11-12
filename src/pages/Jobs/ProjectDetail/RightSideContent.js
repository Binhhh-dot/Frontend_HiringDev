import React, { useEffect, useState } from "react";
import { Modal, ModalBody, Input, Label, Card, CardBody } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import companyServices from "../../../services/company.services";
import hiringrequestService from "../../../services/hiringrequest.service";

//Import Images
import jobImages2 from "../../../assets/images/featured-job/img-02.png";

const RightSideContent = () => {
  //Apply Now Model
  const [modal, setModal] = useState(false);
  const openModal = () => setModal(!modal);
  // const { company } = useLocation();
  const { state } = useLocation();
  ///////////////////////////////////////////////////////////
  const [companyInfoInManager, setCompanyInfoInManager] = useState(null);
  const [hiringRequestDetailOverview, setHiringRequestDetailOverview] =
    useState(null);
  //////////////////////////////////////////////////////////
  const fetchGetCompanyByCompanyId = async () => {
    let response;
    try {
      response = await companyServices.getCompanyByCompanyId(state.company);
      setCompanyInfoInManager(response.data.data);
      console.log("COMPANY COMPANY COMPANY");
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching company detail:", error);
    }
  };

  /////////////////////////////////////////////////////////////
  const fetchGetHiringDetailOverview = async () => {
    let response;
    try {
      response = await hiringrequestService.getHiringRequestDetailInManager(
        state?.jobId
      );
      setHiringRequestDetailOverview(response.data.data);
      console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ");
      console.log(response.data.data);
      return response;
    } catch (error) {
      console.error("Error fetching hiring request detail overview:", error);
    }
  };
  ////////////////////////////////////////////////////////////
  useEffect(() => {
    fetchGetCompanyByCompanyId();
    fetchGetHiringDetailOverview();
  }, []);
  ////////////////////////////////////////////////////////////

  if (!companyInfoInManager || !hiringRequestDetailOverview) {
    return null;
  }

  return (
    <React.Fragment>
      <div className="side-bar ms-lg-4">
        <Card className="company-profile ">
          <CardBody className="p-4">
            <div className="text-center">
              <div>
                <img
                  style={{ width: "100px", height: "100px" }}
                  src={companyInfoInManager.companyImage}
                  alt=""
                  className="img-fluid rounded-3 avt-company-hiring-detail"
                />
              </div>

              <div className="mt-4">
                <h6 className="fs-17 mb-1">
                  {/* {companyInfoInManager.companyName}  */} 2222
                </h6>
              </div>
            </div>
            <ul className="list-unstyled mt-4">
              <li>
                <div className="d-flex">
                  <i className="uil uil-phone-volume text-primary fs-4"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Phone</h6>
                    <p className="text-muted fs-14 mb-0">
                      {companyInfoInManager.phoneNumber}
                    </p>
                  </div>
                </div>
              </li>
              <li className="mt-3">
                <div className="d-flex">
                  <i className="uil uil-envelope text-primary fs-4"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Email</h6>
                    <p className="text-muted fs-14 mb-0">
                      {companyInfoInManager.companyEmail}
                    </p>
                  </div>
                </div>
              </li>
              {/* <li className="mt-3">
                <div className="d-flex">
                  <i className="uil uil-globe text-primary fs-4"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Website</h6>
                    <p className="text-muted fs-14 text-break mb-0">
                      www.Jobcytechnology.pvt.ltd.com
                    </p>
                  </div>
                </div>
              </li> */}
              <li className="mt-3">
                <div className="d-flex">
                  <i className="uil uil-map-marker text-primary fs-4"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Location</h6>
                    <p className="text-muted fs-14 mb-0">
                      {companyInfoInManager.country}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
            {/* <div className="mt-4">
              <Link
                to="/companydetails"
                className="btn btn-primary btn-hover w-100 rounded"
              >
                <i className="mdi mdi-eye"></i> View Profile
              </Link>
            </div> */}
          </CardBody>
        </Card>

        <Card className="job-overview mt-4">
          <CardBody className="p-4">
            <h4>Job Overview</h4>
            <ul className="list-unstyled mt-4 mb-0">
              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-user icon bg-primary-subtle text-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Job Title</h6>
                    <p className="text-muted mb-0">
                      {hiringRequestDetailOverview.jobTitle}
                    </p>
                  </div>
                </div>
              </li>
              {/* <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-star-half-alt icon bg-primary-subtle text-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Experience</h6>
                    <p className="text-muted mb-0"> 0-3 Years</p>
                  </div>
                </div>
              </li> */}
              {/* <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-location-point icon bg-primary-subtle text-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Location</h6>
                    <p className="text-muted mb-0"> New york</p>
                  </div>
                </div>
              </li> */}

              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-usd-circle icon bg-primary-subtle text-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Offered Salary</h6>
                    <p className="text-muted mb-0">
                      {hiringRequestDetailOverview.salaryPerDev} $
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-clock icon bg-primary-subtle text-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Schedule Type</h6>
                    <p className="text-muted mb-0">
                      {hiringRequestDetailOverview.scheduleTypeName}
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-briefcase-alt icon bg-primary-subtle text-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Employment Type</h6>
                    <p className="text-muted mb-0">
                      {hiringRequestDetailOverview.employmentTypeName}
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-history icon bg-primary-subtle text-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Date Posted</h6>
                    <p className="text-muted mb-0">
                      {hiringRequestDetailOverview.postedTime}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
            {/* <div className="mt-3">
              <Link
                to="#applyNow"
                onClick={openModal}
                className="btn btn-primary btn-hover w-100 mt-2"
              >
                Apply Now <i className="uil uil-arrow-right"></i>
              </Link>
              <Link
                to="/bookmarkjobs"
                className="btn btn-soft-warning btn-hover w-100 mt-2"
              >
                <i className="uil uil-bookmark"></i> Add Bookmark
              </Link>
            </div> */}
          </CardBody>
        </Card>

        {/* <div className="mt-4">
          <h6 className="fs-16 mb-3">Job location</h6>
          <iframe
            title="maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1628067715234!5m2!1sen!2sin"
            style={{ width: `100%`, height: `250` }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div> */}

      </div>
    </React.Fragment>
  );
};

export default RightSideContent;

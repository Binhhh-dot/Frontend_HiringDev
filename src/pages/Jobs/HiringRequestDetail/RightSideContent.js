import React, { useState } from "react";
import { Modal, ModalBody, Input, Label, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

//Import Images
import jobImages2 from "../../../assets/images/featured-job/img-02.png";

const RightSideContent = () => {
  //Apply Now Model
  const [modal, setModal] = useState(false);
  const openModal = () => setModal(!modal);

  return (
    <React.Fragment>
      <div className="side-bar ms-lg-4">
        <Card className="company-profile mt-4">
          <CardBody className="p-4">
            <div className="text-center">
              <img src={jobImages2} alt="" className="img-fluid rounded-3" />

              <div className="mt-4">
                <h6 className="fs-17 mb-1">Cancel Hiring Request?</h6>
              </div>
            </div>
            <ul className="list-unstyled mt-4">
              <div class="input-group">
                <textarea
                  class="form-control"
                  aria-label="With textarea"
                  placeholder="Show problems"
                ></textarea>
              </div>
            </ul>
            <div className="mt-4">
              <Link
                to="/companydetails"
                className="btn btn-primary btn-hover w-100 rounded"
                style={{ fontSize: "16px", fontWeight: "600" }}
              >
                Cancel Request
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default RightSideContent;

import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  Modal,
  ModalBody,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  NavLink,
  Nav,
  TabPane,
  TabContent,
  Container,
} from "reactstrap";

import { Link, Navigate, useLocation } from "react-router-dom";
import contractServices from "../../services/contract.services";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RingLoader } from "react-spinners";

const ContractDetailDescription = () => {
  const { state } = useLocation();
  const [contractDetail, setContractDetail] = useState({});
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  //---------------------------------------------------------------------------------------
  const fetchContractDetailById = async () => {
    let response;
    setLoading(true);
    try {
      response = await contractServices.getContractById(state.contractId);
      console.log(response.data.data);
      setContractDetail(response.data.data);

      if (response.data.data.statusString == "Pending") {
        setConfirmVisible(true);
      } else {
        setConfirmVisible(false);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching contract detail", error);
      setLoading(false);
    }
  };
  //---------------------------------------------------------------------------------------
  const fetchconfirmContract = async () => {
    let response;
    setLoading(true);
    try {
      response = await contractServices.confirmContract(state.contractId);
      console.log(response.data.data);
      console.log("Confirm OK");
      fetchContractDetailById();
      setLoading(false);
      toast.success("Confirm contract successfully!");
    } catch (error) {
      console.error("Error fetching confirm contract detail", error);
      setLoading(false);
      toast.error("Confirm contract failed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  //---------------------------------------------------------------------------------------

  // const conFirmContract = () => {
  //   fetchconfirmContract();
  // };

  //---------------------------------------------------------------------------------------
  useEffect(() => {
    fetchContractDetailById();
  }, []);
  //---------------------------------------------------------------------------------------
  return (
    <React.Fragment>
      <Card
        className="job-detail "
        style={{
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <CardBody className="p-3 ">
          {loading && (
            <div className="overlay" style={{ zIndex: "2000" }}>
              <div className="spinner"></div>
            </div>
          )}
          <div>
            <Container style={{ backgroundColor: "white" }}>
              <Row
                className="justify-content-center p-5 mb-4"
                style={{ border: "1px solid #b3adad" }}
              >
                <div id="pdf-content" className="">
                  <h1 className="text-center mb-4 ">
                    LABOR SUBLEASING AGREEMENT
                  </h1>
                  <p>
                    Based on the needs and capacities of the parties involved,
                    this Labor Subleasing Agreement (hereinafter referred to as
                    the "Agreement") is made on [date] between the following
                    parties:
                  </p>
                  <h5>A. LABOR SUBLESSOR</h5>
                  <p>Company: WeHire</p>
                  <p>Phone: 0899315570</p>
                  <p>Legal Representative: Le Quoc Binh</p>
                  <p>Position: CEO</p>
                  {/* <p>Developer name: {preContractInfo.developerName.replace(",", "")}</p> */}
                  <p>Developer phone: {contractDetail.developerPhoneNumber}</p>
                  <p>
                    (Hereinafter referred to as the "<strong>Sublessor</strong>
                    ")
                  </p>
                  <h5>B. LABOR SUBLESSEE</h5>
                  <div className="d-flex flex-column gap-3 mb-3">
                    <div class="row">
                      <div class="col-md-12 d-flex align-items-center">
                        <div className="mb-0">
                          Company: {contractDetail.companyPartnerName}
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 d-flex align-items-center">
                        <div className="mb-0">
                          Phone: {contractDetail.companyPartPhoneNumber}
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 d-flex align-items-center">
                        <div className="mb-0">
                          Legal Representative:
                          {contractDetail.legalRepresentation}
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 d-flex align-items-center">
                        <div className="mb-0">
                          Position: {contractDetail.legalRepresentationPosition}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p>
                    (Hereinafter referred to as the "<strong>Sublessee</strong>
                    ")
                  </p>
                  <p>
                    Hereinafter, the <strong>Sublessor</strong> and{" "}
                    <strong>Sublessee</strong> shall be individually referred to
                    as the "<strong>Party</strong>" and collectively as the "
                    <strong>Parties</strong>."
                  </p>
                  <h5>WHEREAS:</h5>
                  <p>
                    The <strong>Sublessee</strong> is a company established and
                    operating legally under the laws of Vietnam and has the need
                    to sublease a certain number of laborers from the{" "}
                    <strong>Sublessor</strong> in industries and professions
                    allowed for subleasing under Vietnamese law.
                  </p>
                  <p>
                    The <strong>Sublessor</strong> agrees to sublease, and the{" "}
                    <strong>Sublessee</strong> agrees to lease, the laborers of
                    the <strong>Sublessor</strong> for temporary work for a
                    period of [duration] of the <strong>Sublessee</strong>.
                  </p>
                  <p>
                    THEREFORE, the <strong>Parties</strong> hereby agree to
                    enter into this Agreement with the following terms and
                    conditions:
                  </p>
                  <h5>SECTION 1. LABOR SUBLEASING SERVICES</h5>
                  <p>
                    1.1. The <strong>Sublessor</strong> agrees to provide
                    laborers ("Laborers") from the <strong>Sublessor</strong> to
                    work temporarily for the <strong>Sublessee</strong>,
                    specifically as follows:
                  </p>
                  <div className="d-flex flex-column gap-3">
                    <div class="row">
                      <div class="col-md-12 d-flex align-items-center">
                        <div className="mb-0">
                          (a) Number of Laborers provided: 1
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-12 d-flex align-items-center">
                        <div className="mb-0">
                          (b) Workplace of the Laborers:{" "}
                          {contractDetail.employmentType}
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-12 d-flex align-items-center">
                        <div className="mb-0">
                          (c) Job position utilizing the Laborers:{" "}
                          {contractDetail.developerJobPositon}
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-12 d-flex align-items-center">
                        <div className="mb-0">
                          (d) Years of experience in the field of{" "}
                          {contractDetail.yearOfExperience} years
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-12 d-flex align-items-center">
                        <div className="mb-0">
                          (e) Start date of the Laborers:{" "}
                          {contractDetail.fromDate}
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-12 d-flex align-items-center">
                        <div className="mb-0">
                          (f) End date of the Laborers: {contractDetail.toDate}
                        </div>
                      </div>
                    </div>

                    <p>
                      1.2. The term of Agreement caculated from start date of
                      the laborers to end date of the laborers
                    </p>
                  </div>
                  <p>1.3. Working hours of the Laborers:</p>
                  <p>
                    (a) The Laborers will work from 8:00 AM to 5:00 PM, from
                    Monday to Friday, with a lunch break from 12:00 PM to 1:00
                    PM every day.
                  </p>
                </div>
                <div className="" id="pdf-content2">
                  <p>
                    (b) The <strong>Sublessee</strong> may adjust the working
                    hours based on the work requirements of the{" "}
                    <strong>Sublessee</strong> at different times by providing
                    advance notice to the Laborers.
                  </p>
                  <p>
                    (c) Overtime: The <strong>Sublessee</strong> may negotiate
                    overtime with the Laborers depending on the{" "}
                    <strong>Sublessee</strong>'s needs at different times, and
                    the <strong>Sublessee</strong> will pay overtime wages to
                    the Laborers in accordance with the current labor laws.
                  </p>
                  <h5>SECTION 2. PAYMENT METHOD</h5>
                  <h6>2.1 Payment Terms:</h6>
                  <p>
                    (a) During the term of the Agreement, the{" "}
                    <strong>Sublessee</strong> will pay the service fee to the{" "}
                    <strong>Sublessor</strong>, which is based on the actual
                    working days the Laborers work for the{" "}
                    <strong>Sublessee</strong>.
                  </p>
                  <p>
                    (b) On the [specific date] of each month, the{" "}
                    <strong>Sublessee</strong> will send a payroll statement
                    (including actual incurred expenses) and the working hours
                    of the Laborers (including the number of hours worked) to
                    the <strong>Sublessor</strong> as the basis for service fee
                    payment. The <strong>Sublessee</strong> will make the
                    service fee payment to the <strong>Sublessor</strong> no
                    later than the 10th day of the following month into the{" "}
                    <strong>Sublessor's</strong> account with the details below
                    after receiving the value-added tax invoice from the{" "}
                    <strong>Sublessor</strong>:
                  </p>
                  <p>Account Holder: ...</p>
                  <p>Account Number: ...</p>
                  <p>Bank: ...</p>
                  <p>Address: ...</p>
                  <p>
                    (c) Bank charges incurred from transferring the service fee
                    payment will be borne by [<strong>Sublessor</strong>/
                    <strong>Sublessee</strong>].
                  </p>

                  <h5>
                    SECTION 3. RIGHTS AND OBLIGATIONS OF THE SUBLESSOR AND
                    SUBLESSEE REGARDING THE LABORERS
                  </h5>
                  <p>
                    3.1. Rights and obligations of the{" "}
                    <strong>Sublessor</strong> regarding the Laborers:
                  </p>
                  <p>
                    (a) Ensure that the Laborers have qualifications suitable
                    for the requirements of the <strong>Sublessee</strong> and
                    the content of the signed labor contract with the Laborers;
                  </p>
                  <p>
                    (b) Inform the Laborers of the content of this Agreement so
                    that they understand the working conditions and rights of
                    the Laborers;
                  </p>
                  <p>
                    (c) Ensure that the wages paid to the Laborers by the{" "}
                    <strong>Sublessor</strong> are not lower than the wages of
                    the <strong>Sublessee</strong>'s employees with the same
                    qualifications, performing the same work, or work of equal
                    value;
                  </p>
                  <p>
                    (d) Handle labor discipline for Laborers who violate labor
                    discipline when the labor subleasing arrangement returns the
                    Laborers to the <strong>Sublessor</strong> due to a
                    violation of labor discipline.
                  </p>
                  <p>
                    (e) Fulfill the obligations of the employer under labor
                    laws, including but not limited to salary payments, holiday
                    pay, annual leave pay, cessation pay, termination
                    allowances, and job loss benefits (if any) as stipulated by
                    the Labor Code during the time the Laborers work for the
                    Sublessee.
                  </p>
                  <p>
                    3.2. Rights and obligations of the{" "}
                    <strong>Sublessee</strong> regarding the Laborers:
                  </p>
                  <p>
                    (a) Inform and instruct the subleased Laborers about the
                    labor regulations and other rules of the{" "}
                    <strong>Sublessee</strong>;
                  </p>
                  <p>
                    (b) Not discriminate against the working conditions of
                    subleased Laborers compared to the{" "}
                    <strong>Sublessee</strong>'s own employees;
                  </p>
                  <p>
                    (c) Agree with the subleased Laborers on night shifts and
                    overtime as regulated by the Labor Code;
                  </p>
                  <p>
                    (d) Agree with the subleased Laborers and the{" "}
                    <strong>Sublessor</strong> to formally recruit the subleased
                    Laborers to work for the <strong>Sublessee</strong> in cases
                    where the labor contract of the subleased Laborers with the{" "}
                    <strong>Sublessor</strong> has not been terminated;
                  </p>
                  <p>
                    (e) Provide evidence of the subleased Laborers' violation of
                    labor discipline to the <strong>Sublessor</strong> for
                    review and handling of labor discipline;
                  </p>
                  <p>
                    (f) Commit to using the Laborers strictly in accordance with
                    the agreement in this Agreement and not transferring the
                    Laborers to other labor users.
                  </p>
                  <h5>SECTION 4. RIGHTS AND OBLIGATIONS OF THE LABORERS</h5>
                  <p>
                    4.1. Perform the work as stipulated in the labor contract
                    signed with the <strong>Sublessor</strong>;
                  </p>
                </div>

                <div className="" id="pdf-content3">
                  <p>
                    4.2. Adhere to labor discipline, labor regulations, and
                    comply with the legal management, operation, and supervision
                    of the <strong>Sublessee</strong>;
                  </p>
                  <p>
                    4.3. Receive wages not lower than the wages of the{" "}
                    <strong>Sublessee</strong>'s employees with the same
                    qualifications, performing the same work, or work of equal
                    value;
                  </p>
                  <p>
                    4.4. File complaints with the <strong>Sublessor</strong> in
                    case the <strong>Sublessee</strong> violates the provisions
                    of the labor subleasing agreement;
                  </p>
                  <p>
                    4.5. Regarding the working hours of the Employee, they are
                    required to work a full 8 hours per day. If the Employee
                    completes a total of 168 hours within the month, the salary
                    will be calculated as the basic salary multiplied by 168
                    hours.
                  </p>
                  <p>
                    If the working hours of the Employee are below or above 168
                    hours, the salary will be calculated based on the actual
                    hours worked divided by 168 hours, and then multiplied by
                    the basic salary.
                  </p>
                  <h5>
                    SECTION 5. RIGHTS AND OBLIGATIONS OF THE SUBLESSOR TOWARDS
                    THE SUBLESSEE
                  </h5>

                  <p>
                    5.1. Entitled to receive payment for the services as
                    specified in the Agreement.
                  </p>
                  <p>
                    5.2. Responsible for providing Laborers with qualifications,
                    experience, and seniority suitable for the requirements of
                    the <strong>Sublessee</strong>, ensuring that all Laborers
                    from the <strong>Sublessor</strong> comply with the labor
                    regulations and policies of the Sublessee throughout the
                    performance of the work.
                  </p>
                  <p>
                    5.3. Accept evidence provided by the{" "}
                    <strong>Sublessee</strong> regarding any violations of labor
                    regulations by the Laborers, serving as a legal basis for
                    the <strong>Sublessor</strong> to review and handle
                    disciplinary actions against the Laborers.
                  </p>

                  <p>
                    5.4. Compensate the <strong>Sublessee</strong> for any
                    damages arising in the event that the{" "}
                    <strong>Sublessor</strong> and/or the Laborers of the{" "}
                    <strong>Sublessor</strong> violate the terms of the
                    Agreement.
                  </p>
                  <p>
                    5.5. The Lessor shall not be liable for any damages arising
                    from the actions of the leased personnel unless there is
                    willful or gross negligence on the part of the Lessor.
                  </p>
                  <h5>
                    SECTION 6. RIGHTS AND OBLIGATIONS OF THE SUBLESSEE TOWARDS
                    THE SUBLESSOR
                  </h5>

                  <p>
                    6.1. Make full and timely payment of the service fees to the{" "}
                    <strong>Sublessor</strong> as stipulated in this Agreement.
                  </p>
                  <p>
                    6.2. Payments for the lease of the Employee by the Lessee to
                    the Lessor must meet the payment deadlines. In case of late
                    payment, the Lessor has the right to file a complaint with
                    the relevant authorities, and the Lessee must compensate an
                    amount equivalent to 10% of the payment for the lease of the
                    Employee for that month.
                  </p>
                  <p>
                    6.3. Provide the Lessor with evidence of any violations of
                    the Employee's labor regulations (if any) as a basis for the
                    Lessor to apply appropriate labor discipline to the
                    violating Employee.
                  </p>
                  <p>
                    6.4. The Lessee is obligated to provide complete and
                    accurate data and information related to payments and
                    transactions (including payroll and working days of the
                    Employee).
                  </p>
                  <h5>
                    SECTION 7. EFFECTIVENESS AND TERMINATION OF THE AGREEMENT
                  </h5>

                  <p>
                    7.1. This Agreement shall take effect from the date it is
                    signed by the <strong>Parties</strong>.
                  </p>
                  <p>
                    7.2. This Agreement may be terminated in the following
                    cases:
                  </p>
                  <p>(a) Expiration of the Agreement;</p>
                  <p>
                    (b) By mutual written agreement between the{" "}
                    <strong>Parties</strong>;
                  </p>
                  <p>
                    (c) One of the <strong>Parties</strong> violates the
                    obligations, commitments, assurances stipulated in this
                    Agreement and fails to remedy them within a reasonable
                    period after written notice from the other{" "}
                    <strong>Party</strong>. In this case, the non-breaching{" "}
                    <strong>Party</strong> has the right to unilaterally
                    terminate this Agreement by providing written notice at
                    least 10 days in advance to the breaching{" "}
                    <strong>Party</strong>;
                  </p>
                  <p>
                    (d) If either party unilaterally terminates the contract
                    before its expiration, the terminating party shall
                    compensate an amount equivalent to 50% of the payment for
                    the lease of the Employee for that month.
                  </p>
                  <p>
                    7.3. In the event of contract termination as stipulated in
                    Article 7.2(c) of this Contract, the violating party shall,
                    within 15 days from the date of contract termination, pay
                    the non-violating party an amount equivalent to 20% of the
                    payment for the lease of the Employee for that month and
                    compensate for any damages incurred to the non-violating
                    party in accordance with relevant legal regulations.
                  </p>
                </div>
                <div className="" id="pdf-content4">
                  <h5>SECTION 8. APPLICABLE LAW AND DISPUTE RESOLUTION</h5>
                  <p>
                    8.1. This Contract shall be governed and interpreted by the
                    laws of Vietnam, and the Parties agree to submit [to the
                    competent court of Vietnam] to resolve disputes arising from
                    the Contract.
                  </p>
                  <p>
                    8.2. The Parties will make efforts to settle disputes
                    through mediation. In the event that disputes cannot be
                    resolved through mediation, they will be brought to the
                    Court… for resolution in accordance with legal regulations.
                  </p>
                  <h5>SECTION 9. OTHER TERMS</h5>
                  <p>
                    9.1. Neither party shall transfer this Contract without the
                    prior written consent of the other party. This Contract is
                    binding and enforceable, and is effective for the rights of
                    each party and the transferee, respectively.
                  </p>
                  <p>
                    9.2. Any adjustments, amendments, or supplements to this
                    Contract will only be effective with the written consent of
                    the Parties.
                  </p>
                  <h5>SECTION 10. COPY</h5>
                  <p>
                    10.1. This contract is made in 02 (two) copies of equal
                    value, and each party holds 01 (one) original copy for
                    implementation.
                  </p>
                  <div class="d-flex justify-content-between">
                    <div class="col">
                      <h5>LABOR SUBLESSOR</h5>
                      <h5>(Signature, Seal)</h5>
                    </div>
                    <div class="col">
                      <h5>LABOR SUBLESSEE</h5>
                      <h5>(Signature, Seal)</h5>
                    </div>
                  </div>
                </div>

                {confirmVisible && (
                  <div
                    className="d-flex justify-content-end gap-2 "
                    style={{ marginTop: "150px" }}
                  >
                    <div className="text-end">
                      <div
                        className="btn btn-primary"
                        onClick={() => fetchconfirmContract()}
                      >
                        Comfirm
                      </div>
                    </div>
                  </div>
                )}
              </Row>
            </Container>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
export default ContractDetailDescription;

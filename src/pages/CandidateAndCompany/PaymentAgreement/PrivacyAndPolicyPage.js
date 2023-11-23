import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import contractServices from "../../../services/contract.services";
import { useLocation } from "react-router-dom";

const PrivacyAndPolicyPage = () => {
  const location = useLocation();
  const [preContractInfo, setPreContractInfo] = useState(null);
  const fetchPreContract = async () => {
    let response;
    const developerIdState = location.state?.developerId;
    const requestIdState = location.state?.requestId;

    try {
      response = await contractServices.getPreContract(
        developerIdState,
        requestIdState
      );
      setPreContractInfo(response.data.data)
      console.log(response);
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    }
  };

  useEffect(() => {
    fetchPreContract();
  }, []);
  return (
    <React.Fragment>
      <section className="section" style={{ backgroundColor: "rgb(248 255 246 / 62%)" }}>
        <Container style={{ backgroundColor: "white" }}>
          <Row className="justify-content-center p-5" style={{ border: "1px solid #b3adad" }}>
            <h1 className="text-center mb-4 mt-3">LABOR SUBLEASING AGREEMENT</h1>
            <p>Based on the needs and capacities of the parties involved, this Labor Subleasing Agreement (hereinafter referred to as the "Agreement") is made on [date] between the following parties:</p>
            <h5>A. LABOR SUBLESSOR</h5>
            <p>Company: WeHire</p>
            <p>Phone: 0899315570</p>
            <p>Legal Representative: Le Quoc Binh</p>
            <p>Position: CEO</p>
            <p>(Hereinafter referred to as the "<strong>Sublessor</strong>")</p>
            <h5>B. LABOR SUBLESSEE</h5>
            <div className="d-flex flex-column gap-3 mb-3">
              <div className="d-flex align-items-center ">
                <div className="mb-0">
                  COMPANY:
                </div>
                <input
                  type="text"
                  style={{ marginLeft: "20px" }}
                  placeholder="Company name"
                />
              </div>
              <div className="d-flex align-items-center ">
                <div className="mb-0">
                  Phone:
                </div>
                <input
                  type="text"
                  style={{ marginLeft: "20px" }}
                  placeholder="Company phone number"
                />
              </div>
              <div className="d-flex align-items-center ">
                <div className="mb-0">
                  Legal Representative:
                </div>
                <input
                  type="text"
                  style={{ marginLeft: "20px" }}
                  placeholder="Legal representative name"
                />
              </div>
              <div className="d-flex align-items-center ">
                <div className="mb-0">
                  Position:
                </div>
                <input
                  type="text"
                  style={{ marginLeft: "20px" }}
                  placeholder="Position name"
                />
              </div>
            </div>
            <p>(Hereinafter referred to as the "<strong>Sublessee</strong>")</p>
            <p>Hereinafter, the <strong>Sublessor</strong> and <strong>Sublessee</strong> shall be individually referred to as the "<strong>Party</strong>" and collectively as the "<strong>Parties</strong>."</p>
            <h5>WHEREAS:</h5>
            <p>The <strong>Sublessee</strong> is a company established and operating legally under the
              laws of Vietnam and has the need to sublease a certain number of laborers
              from the <strong>Sublessor</strong> in industries and professions allowed for subleasing under Vietnamese law.</p>
            <p>The <strong>Sublessor</strong> agrees to sublease, and the <strong>Sublessee</strong> agrees to lease, the laborers of the <strong>Sublessor</strong> for temporary work for a period of [duration] of the <strong>Sublessee</strong>.</p>
            <p>THEREFORE, the <strong>Parties</strong> hereby agree to enter into this Agreement with the following terms and conditions:</p>
            <h5>SECTION 1. LABOR SUBLEASING SERVICES</h5>
            <h6>1.1. The <strong>Sublessor</strong> agrees to provide laborers ("Laborers") from the <strong>Sublessor</strong> to work temporarily for the <strong>Sublessee</strong>, specifically as follows:</h6>
            <div className="d-flex flex-column gap-3 mb-3">

              <div className="d-flex align-items-center ">
                <div className="mb-0">
                  (a) Number of Laborers provided:
                </div>
                <input
                  type="text"
                  style={{ marginLeft: "20px" }}
                  placeholder="Number of Laborers provided"
                />
              </div>
              <div className="d-flex align-items-center ">
                <div className="mb-0">
                  (b) Workplace of the Laborers:

                </div>
                <input
                  type="text"
                  style={{ marginLeft: "20px" }}
                  placeholder="Number of Laborers provided"
                />
              </div>
              <div className="d-flex align-items-center ">
                <div className="mb-0">
                  (c) Job position utilizing the Laborers:

                </div>
                <input
                  type="text"
                  style={{ marginLeft: "20px" }}
                  placeholder="Number of Laborers provided"
                />
              </div>
              <div className="d-flex align-items-center ">
                <div className="mb-0">
                  (d) Specific job responsibilities of the Laborers:

                </div>
                <input
                  type="text"
                  style={{ marginLeft: "20px" }}
                  placeholder="Number of Laborers provided"
                />
              </div>
              <div className="d-flex align-items-center ">
                <div className="mb-0">
                  (e) Years of experience in the field of ...;

                </div>
                <input
                  type="text"
                  style={{ marginLeft: "20px" }}
                  placeholder="Number of Laborers provided"
                />
              </div>
              <div className="d-flex align-items-center ">
                <div className="mb-0">
                  (f) Start date of the Laborers:

                </div>
                <input
                  type="text"
                  style={{ marginLeft: "20px" }}
                  placeholder="Number of Laborers provided"
                />
              </div>
              <div className="d-flex align-items-center ">
                <div className="mb-0">
                  1.2. The term of the Agreement is
                </div>
                <input
                  type="text"
                  style={{ marginLeft: "20px" }}
                  placeholder="Number of Laborers provided"
                />
                <div className="mb-0 ms-2">
                  months
                </div>
              </div>
              <div className="d-flex align-items-center ">
                <div className="mb-0">
                  calculated from
                </div>
                <input
                  type="date"
                  style={{ marginLeft: "20px" }}
                  placeholder="Start date"
                />
                <div className="mb-0 ms-2">
                  to
                </div>
                <input
                  type="date"
                  style={{ marginLeft: "20px" }}
                  placeholder="End date"
                />
              </div>
            </div>
            <p>1.3. Working hours of the Laborers:</p>
            <p>(a) The Laborers will work from 8:00 AM to 5:00 PM, from Monday to Friday, with a lunch break from 12:00 PM to 1:00 PM every day.</p>
            <p>(b) The <strong>Sublessee</strong> may adjust the working hours based on the work requirements of the <strong>Sublessee</strong> at different times by providing advance notice to the Laborers.</p>
            <p>(c) Overtime: The <strong>Sublessee</strong> may negotiate overtime with the Laborers depending on the <strong>Sublessee</strong>'s needs at different times, and the <strong>Sublessee</strong> will pay overtime wages to the Laborers in accordance with the current labor laws.</p>
            <h5>SECTION 2. PAYMENT METHOD</h5>

            <h6>2.1 Payment Terms:</h6>
            <p>(a) During the term of the Agreement, the <strong>Sublessee</strong> will pay the service fee to the <strong>Sublessor</strong>, which is based on the actual working days the Laborers work for the <strong>Sublessee</strong>.</p>
            <p>(b) On the [specific date] of each month, the <strong>Sublessee</strong> will send a payroll statement (including actual incurred expenses) and the working hours of the Laborers (including the number of hours worked) to the <strong>Sublessor</strong> as the basis for service fee payment. The <strong>Sublessee</strong> will make the service fee payment to the <strong>Sublessor</strong> no later than the 10th day of the following month into the <strong>Sublessor's</strong> account with the details below after receiving the value-added tax invoice from the <strong>Sublessor</strong>:</p>
            <p>Account Holder: ...</p>
            <p>Account Number: ...</p>
            <p>Bank: ...</p>
            <p>Address: ...</p>
            <p>(c) Bank charges incurred from transferring the service fee payment will be borne by [<strong>Sublessor</strong>/<strong>Sublessee</strong>].</p>

            <h5>SECTION 3. RIGHTS AND OBLIGATIONS OF THE SUBLESSOR AND SUBLESSEE REGARDING THE LABORERS</h5>
            <p>3.1. Rights and obligations of the <strong>Sublessor</strong> regarding the Laborers:</p>
            <p>(a) Ensure that the Laborers have qualifications suitable for the requirements of the <strong>Sublessee</strong> and the content of the signed labor contract with the Laborers;</p>
            <p>(b) Inform the Laborers of the content of this Agreement so that they understand the working conditions and rights of the Laborers;</p>
            <p>(c) Ensure that the wages paid to the Laborers by the <strong>Sublessor</strong> are not lower than the wages of the <strong>Sublessee</strong>'s employees with the same qualifications, performing the same work, or work of equal value;</p>
            <p>(d) Handle labor discipline for Laborers who violate labor discipline when the labor subleasing arrangement returns the Laborers to the <strong>Sublessor</strong> due to a violation of labor discipline.</p>
            <p>(e) Fulfill the obligations of the employer under labor laws, including but not limited to salary payments, holiday pay, annual leave pay, cessation pay, termination allowances, and job loss benefits (if any) as stipulated by the Labor Code during the time the Laborers work for the Sublessee.</p>
            <p>3.2. Rights and obligations of the <strong>Sublessee</strong> regarding the Laborers:</p>
            <p>(a) Inform and instruct the subleased Laborers about the labor regulations and other rules of the <strong>Sublessee</strong>;</p>
            <p>(b) Not discriminate against the working conditions of subleased Laborers compared to the <strong>Sublessee</strong>'s own employees;</p>
            <p>(c) Agree with the subleased Laborers on night shifts and overtime as regulated by the Labor Code;</p>
            <p>(d) Agree with the subleased Laborers and the <strong>Sublessor</strong> to formally recruit the subleased Laborers to work for the <strong>Sublessee</strong> in cases where the labor contract of the subleased Laborers with the <strong>Sublessor</strong> has not been terminated;</p>
            <p>(e) Provide evidence of the subleased Laborers' violation of labor discipline to the <strong>Sublessor</strong> for review and handling of labor discipline;</p>
            <p>(f) Commit to using the Laborers strictly in accordance with the agreement in this Agreement and not transferring the Laborers to other labor users.</p>

            <h5>SECTION 4. RIGHTS AND OBLIGATIONS OF THE LABORERS</h5>
            <p>4.1. Perform the work as stipulated in the labor contract signed with the <strong>Sublessor</strong>;</p>
            <p>4.2. Adhere to labor discipline, labor regulations, and comply with the legal management, operation, and supervision of the <strong>Sublessee</strong>;</p>
            <p>4.3. Receive wages not lower than the wages of the <strong>Sublessee</strong>'s employees with the same qualifications, performing the same work, or work of equal value;</p>
            <p>4.4. File complaints with the <strong>Sublessor</strong> in case the <strong>Sublessee</strong> violates the provisions of the labor subleasing agreement;</p>
            <h5>SECTION 5. RIGHTS AND OBLIGATIONS OF THE SUBLESSOR TOWARDS THE SUBLESSEE</h5>

            <p>5.1. Entitled to receive payment for the services as specified in the Agreement.</p>
            <p>5.2. Responsible for providing Laborers with qualifications, experience, and seniority suitable for the requirements of the <strong>Sublessee</strong>, ensuring that all Laborers from the <strong>Sublessor</strong> comply with the labor regulations and policies of the Sublessee throughout the performance of the work.</p>
            <p>5.3. Accept evidence provided by the <strong>Sublessee</strong> regarding any violations of labor regulations by the Laborers, serving as a legal basis for the <strong>Sublessor</strong> to review and handle disciplinary actions against the Laborers.</p>
            <p>5.4. Compensate the <strong>Sublessee</strong> for any damages arising in the event that the <strong>Sublessor</strong> and/or the Laborers of the <strong>Sublessor</strong> violate the terms of the Agreement.</p>
            <h5>SECTION 6. RIGHTS AND OBLIGATIONS OF THE SUBLESSEE TOWARDS THE SUBLESSOR</h5>


            <p>6.1. Make full and timely payment of the service fees to the <strong>Sublessor</strong> as stipulated in this Agreement.</p>
            <p>6.2. Provide the Sublessor with evidence of any violations of labor regulations by the Laborers (if any), serving as a basis for the <strong>Sublessor</strong> to apply appropriate labor discipline to the violating Laborers.</p>

            <h5>SECTION 7. EFFECTIVENESS AND TERMINATION OF THE AGREEMENT</h5>


            <p>7.1. This Agreement shall take effect from the date it is signed by the <strong>Parties</strong>.</p>
            <p>7.2. This Agreement may be terminated in the following cases:</p>
            <p>(a) Expiration of the Agreement;</p>
            <p>(b) By mutual written agreement between the <strong>Parties</strong>;</p>
            <p>(c) One of the <strong>Parties</strong> violates the obligations, commitments, assurances stipulated in this Agreement and fails to remedy them within a reasonable period after written notice from the other <strong>Party</strong>. In this case, the non-breaching <strong>Party</strong> has the right to unilaterally terminate this Agreement by providing written notice at least 10 days in advance to the breaching <strong>Party</strong>;</p>


            <div class="d-flex justify-content-between">
              <div class="col">
                <h5>LABOR SUBLESSOR</h5>
                <h5>(Signature, Seal)</h5>
              </div>
              <div class="col">
                <h5>LABOR SUBLESSOR</h5>
                <h5>(Signature, Seal)</h5>
              </div>
            </div>
            <div className="d-flex gap-2">

              <div className="text-end">
                <Link to="#" className="btn btn-primary">
                  <i className="uil uil-print"></i> Print
                </Link>
              </div>
              <div className="text-end">
                <Link to="#" className="btn btn-primary">
                  <i className="uil uil-print"></i> Preview
                </Link>
              </div>
            </div>
          </Row>
        </Container>
      </section>
    </React.Fragment >
  );
};

export default PrivacyAndPolicyPage;

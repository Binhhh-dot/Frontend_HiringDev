import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const PrivacyAndPolicyPage = () => {
  const privacyandpolicyPage = [
    {
      id: 1,
      policyTitle: "Use for Jobcy",
      policyRules: [
        {
          id: 1,
          policyInnerRule:
            " At Jobcy, accessible at Website.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Jobcy and how we use If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us through email at <b className=`text-danger`>Jobcytechnologypvt.ltd.com"
        },
        {
          id: 2,
          policyInnerRule:
            " If you have additional questions or require more information about our Privacy Policy."
        },
        {
          id: 3,
          policyInnerRule:
            " This privacy policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Jobcy. This policy is not applicable to any information collected offline or via channels other than this website."
        },
        {
          id: 4,
          policyInnerRule:
            " Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity to our website with regards to the information that they shared and/or collect in Jobcy. This policy is not applicable to any information collected offline or via channels other than this website."
        }
      ]
    },
    {
      id: 2,
      policyTitle: "We use your information to :",
      policyRules: [
        {
          id: 1,
          policyInnerRule: "  Digital Marketing Solutions for Tomorrow"
        },
        {
          id: 2,
          policyInnerRule: " Our Talented & Experienced Marketing Agency"
        },
        {
          id: 3,
          policyInnerRule:
            " It is said that song composers of the past used texts."
        },
        {
          id: 4,
          policyInnerRule: " Create your own skin to match your brand"
        }
      ]
    },
    {
      id: 3,
      policyTitle: "Privacy and copyright protection",
      policyRules: [
        {
          id: 1,
          policyInnerRule:
            '  There is now an <b className=text-danger>"abundance</b> of readable dummy texts. These are usually used when a text is required purely to fill a space. These alternatives to the classic Lorem Ipsum texts are often amusing and tell short, funny or nonsensical stories.'
        },
        {
          id: 2,
          policyInnerRule:
            " It seems that only fragments of the original text remain in the Lorem Ipsum texts used today. One may speculate that over the course of time certain letters were added or deleted at various positions within the text."
        }
      ]
    }
  ];
  return (
    <React.Fragment>
      <section className="section">
        <Container>
          <Row className="justify-content-center">
            <h1 className="text-center mb-4">COMMISSION AGREEMENT</h1>

            <p>This Commission Agreement is entered into on <b>[Effective Date]</b> , by and between: WeHire and Company Partner.</p>
            <p>By executing this document, both parties affirmatively state that it has carefully read and understood the terms and conditions set forth herein and agree to be bound by the said terms and conditions.</p>
            <h5>PARTIES</h5>
            <p>This commission agreement is between:</p>
            <b>WeHire</b>
            <b>[Company Partner Name]</b>
            <p>Include any other additional third parties that the contract may affect as well.</p>
            <h5>DEFINITIONS AND INTERPRETATIONS</h5>
            <p>In this Agreement, unless the context otherwise requires, the following words and expressions shall have the following meanings:</p>
            <p><b>Confidential Information-</b> This means, without limitation, all Customer and Recipient Data, information, software, data, manuals, concepts relating to marketing methods, products, developments, business and financial affairs trade secrets, and other information of value to a party and not generally known and any additional information clearly designated by a Party as “confidential information” or that is evidently confidential by its nature or the nature of its disclosure, and includes the terms of this Agreement</p>
            <h5>SERVICES</h5>
            <ol>The following services shall be provided by the party as agreed:
              <li className="ms-5">
                The Company Partner agrees to engage the WeHire Company to provide employees for their business needs.
              </li>
              <li className="ms-5">
                The WeHire Company shall provide qualified employees to the [Company Partner] based on their specified requirements.
              </li>
            </ol>
            <h5>COMMISSION</h5>
            <ul>The commission is based on the number of employees provided. The commission structure is as follows:

              <li className="ms-5">
                <b>
                  Salary per developer (month): 1000$
                </b>

              </li>
              <li className="ms-5">
                <b>

                  Number of developers: 2
                </b>

              </li>
              <li className="ms-5">
                <b>
                  Commission Rate: 13%

                </b>
              </li>
            </ul>
            <b>Total Commission = (Salary per developer) x (Number of developers) x (Commission Rate)
            </b>
            <p>Payment of commissions shall be made within 7 days of the [Company Partner]'s receipt of an invoice from the WeHire Company</p>
            <h5>TERMS AND CONDITIONS</h5>
            <p>The terms of this contract are detailed as follows:</p>
            <h6>Terms
            </h6>
            <p>This Agreement shall commence on the <b>Effective Date </b>and shall remain in effect until terminated by either party with <b>7 days</b> written notice.</p>
            <p>The Agreement may be extended upon the provision of written consent from both Parties.</p>
            <h6>Confidentiality
            </h6>
            <p>Both Parties shall maintain the confidentiality of all information shared during the course of this Agreement and shall not disclose it to any third party except where required by law.</p>

            <h6>Termination
            </h6>
            <ul>This Agreement may be terminated:
              <li className="ms-4" style={{ listStyle: "none" }}>
                Immediately, in the event that one of the Parties breaches this Agreement.

              </li>
              <li className="ms-4" style={{ listStyle: "none" }}>
                At any given time by providing written notice to the other party with the notice period specified in Term
              </li>
            </ul>
            <p>
              Upon termination of this Agreement, the WeHire Company shall provide a final invoice, and the Company Partner shall make any outstanding commission payments…

            </p>
            <h6>Representations and Warranties</h6>
            <p>
              Both Parties represent and warrant that they have the authority to enter into this Agreement and that their performance under this Agreement will not violate any third-party rights or any other agreement.
            </p>
            <h6>Entire Agreement</h6>
            <p>
              This Agreement contains the entire agreement between the Parties and supersedes all prior agreements, understandings, or conditions.

            </p>
            <p>IN WITNESS WHEREOF, the Parties have executed this Commission Agreement as of the Effective Date.</p>

            <div class="d-flex justify-content-between">
              <div class="col">
                <p>Part A: WeHire Company</p>
                <p>Date:</p>
                <p>Signature</p>
              </div>
              <div class="col-1" style={{ borderLeft: "1px solid #000", height: "100%", width: "20px" }}></div>
              <div class="col">
                <p>Part B: Company Partner Name</p>
                <p>Date:</p>
                <p>Signature</p>
              </div>
            </div>

            {privacyandpolicyPage.map((privacyandpolicyDetails, key) => (
              <Col lg={12} key={key}>
                <h5 className="mb-4">{privacyandpolicyDetails.policyTitle}</h5>
                <ul className="about-list list-unstyled text-muted mb-4 pb-2">
                  {privacyandpolicyDetails.policyRules.map(
                    (privacyandpolicyInner, key) => (
                      <li key={key}>{privacyandpolicyInner.policyInnerRule}</li>
                    )
                  )}
                </ul>
              </Col>
            ))}
            <div className="text-end">
              <Link to="#" className="btn btn-primary">
                <i className="uil uil-print"></i> Print
              </Link>
            </div>
          </Row>
        </Container>
      </section>
    </React.Fragment >
  );
};

export default PrivacyAndPolicyPage;

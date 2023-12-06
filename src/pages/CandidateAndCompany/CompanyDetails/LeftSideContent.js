import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col } from "reactstrap";

//Import images
import featureImage from "../../../assets/images/featured-job/img-01.png";
import companyServices from "../../../services/company.services";
import axios from "axios";

const LeftSideContent = () => {

  const [activeTab, setActiveTab] = useState("1");
  const [companyId, setCompanyId] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [userImage3, setUserImage3] = useState(null);
  const [userImageState, setUserState] = useState(null);
  const [dateState, setDateState] = useState(null);
  const [firstNameState, setFirstnameState] = useState(null);
  const [lastNameState, setLastnameState] = useState(null);
  const [phoneState, setPhonenameState] = useState(null);
  const [companyCreated, setCompanyCreated] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [loadingUpdateAccount, setLoadingUpdateAccount] = useState(false);

  const [firstNameError, setFirstNameError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [phoneNumberError, setPhoneNumberError] = useState(null);
  const [dayOfBirthError, setDayOfBirthError] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [companyIdFromLocalStorage, setCompanyIdFromLocalStorage] = useState(null);

  const [companyDetail, setCompanyDetail] = useState([]);
  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };


  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const fetchCompanyDetail = async () => {
    let companyId = localStorage.getItem("companyId");
    setCompanyId(companyId);
    setCompanyIdFromLocalStorage(companyId);
    const userId = localStorage.getItem("userId");
    if (companyId) {
      setCompanyCreated(true);
      try {
        // Make API request
        const response = await companyServices.getCompanyByCompanyId(
          companyId
        );
        console.log(response.data.data)
        setCompanyDetail(response.data.data)
        // Handle the response (you can show a success message or redirect to another page)

        // const file = fileDev.target.files[0];

        // setUserImage(fileDev);
      } catch (error) {
        // Handle errors (show an error message or log the error)
        console.error("Error creating company:", error);
        console.log(error.response.data);
      }
    } else {
      // setUserImage(userImage2);
    }

    axios
      .get(
        "https://restcountries.com/v3.1/all?fields=name&fbclid=IwAR2NFDKzrPsdQyN2Wfc6KNsyrDkMBakGFkvYe-urrPH33yawZDSIbIoxjX4"
      )
      .then((response) => {
        const data = response.data;
        const formattedCountries = data.map((country) => ({
          value: country.name.common,
          label: country.name.common,
        }));
        setCountries(formattedCountries);
        if (companyDetail) {
          const selected = formattedCountries.find(
            (country) => country.value === companyDetail.data.data.country
          );
          if (selected) {
            const company = {
              value: selected.value,
              label: selected.label,
            };
            setSelectedCountry(company);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  };

  useEffect(() => {
    fetchCompanyDetail();
  }, []);
  return (
    <React.Fragment>
      <Col lg={4}>
        <Card className="side-bar">
          <CardBody className="p-4">
            <div className="candidate-profile text-center">

              <div className="text-center">
                <div className=" profile-user">
                  <img
                    src={companyDetail.companyImage || featureImage} // Giá trị mặc định là "userImage2"
                    className="rounded-circle img-thumbnail profile-img"
                    id="profile-img-2"
                    alt=""
                  />
                </div>
              </div>

              <h6 className="fs-18 mb-1 mt-4">{companyDetail.companyName}</h6>
              <p className="text-muted mb-4">{companyDetail.companyEmail}</p>
              <ul className="candidate-detail-social-menu list-inline mb-0">
                <li className="list-inline-item">
                  <Link to="#" className="social-link">
                    <i className="uil uil-twitter-alt"></i>
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="#" className="social-link">
                    <i className="uil uil-whatsapp"></i>
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="#" className="social-link">
                    <i className="uil uil-phone-alt"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </CardBody>

          <CardBody className="candidate-profile-overview border-top p-4">
            <h6 className="fs-17 fw-semibold mb-3">Profile Overview</h6>
            <ul className="list-unstyled mb-0">
              <li>
                <div className="d-flex">
                  <label className="text-dark">Phone number</label>
                  <div>
                    <p className="text-muted mb-0">{companyDetail.phoneNumber}</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <label className="text-dark">Address</label>
                  <div>
                    <p className="text-muted mb-0">{companyDetail.address}</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <label className="text-dark">Location</label>
                  <div>
                    <p className="text-muted mb-0">{companyDetail.country}</p>
                  </div>
                </div>
              </li>
            </ul>

            {companyIdFromLocalStorage == null ? (
              <div
                className="btn btn-soft-primary fw-bold w-100"
              // onClick={handleUpdateCompany}
              >
                Create
              </div>
            ) : (
              <div
                className="btn btn-soft-blue fw-bold w-100"
              // onClick={handleUpdateCompany}
              >
                Update
              </div>
            )}
          </CardBody>
          <CardBody className="p-4 border-top">
            <div className="ur-detail-wrap">
              <div className="ur-detail-wrap-header">
                <h6 className="fs-17 fw-semibold mb-3">Working Days</h6>
              </div>
              <div className="ur-detail-wrap-body">
                <ul className="working-days">
                  <li>
                    Monday<span>9AM - 5PM</span>
                  </li>
                  <li>
                    Tuesday<span>9AM - 5PM</span>
                  </li>
                  <li>
                    Wednesday<span>9AM - 5PM</span>
                  </li>
                  <li>
                    Thursday<span>9AM - 5PM</span>
                  </li>
                  <li>
                    Friday<span>9AM - 5PM</span>
                  </li>
                  <li>
                    Saturday<span>9AM - 5PM</span>
                  </li>
                  <li>
                    Sunday<span className="text-danger">Close</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardBody>
          <CardBody className="p-4 border-top">
            <h6 className="fs-17 fw-semibold mb-4">Company Location</h6>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1628067715234!5m2!1sen!2sin"
              title="title"
              style={{ width: `100%`, height: `250` }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default LeftSideContent;

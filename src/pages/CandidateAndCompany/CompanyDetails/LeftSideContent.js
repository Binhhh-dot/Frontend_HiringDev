import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row, Input, Modal, ModalBody, Form, FormGroup, Label } from "reactstrap"; // Assuming you are using reactstrap for modal components

import { RingLoader, HashLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Import images
import featureImage from "../../../assets/images/featured-job/img-01.png";
import companyServices from "../../../services/company.services";
import axios from "axios";
import userSerrvices from "../../../services/user.serrvices";
import Select from "react-select";
import { Editor } from "@tinymce/tinymce-react";

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
  const descriptionRef = useRef(null);

  const [companyIdFromLocalStorage, setCompanyIdFromLocalStorage] = useState(null);

  const [companyDetail, setCompanyDetail] = useState([]);
  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };


  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [modal2, setModal2] = useState(false);
  const [loadingCreateCompany, setLoadingCreateCompany] = useState(false);
  const [companyNameFormCreateCompany, setCompanyNameFormCreateCompany] =
    useState(null);
  const [emailFormCreateCompany, setEmailFormCreateCompany] = useState(null);
  const [
    companyPhoneNumberFormCreateCompany,
    setCompanyPhoneNumberFormCreateCompany,
  ] = useState(null);
  const [addressFormCreateCompany, setAddressFormCreateCompany] =
    useState(null);
  const [companyNameError, setCompanyNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [phoneNumberError, setPhoneNumberError] = useState(null);
  const [countryError, setCountryError] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [jobDescriptionError, setJobDescriptionError] = useState(null);
  const [avatar2, setAvatar2] = useState();
  const [value, setValue] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCompanyNameChange = (event) => {
    const newValue = event.target.value;
    setCompanyNameFormCreateCompany(newValue);
  };

  const handleEmailChange = (event) => {
    const newValue = event.target.value;
    setEmailFormCreateCompany(newValue);
  };

  const handleCompanyPhoneNumberChange = (event) => {
    const newValue = event.target.value;
    setCompanyPhoneNumberFormCreateCompany(newValue);
  };
  const handleAddressChange = (event) => {
    const newValue = event.target.value;
    setAddressFormCreateCompany(newValue);
  };

  const handleChooseAvatar2 = () => {
    const inputElement = document.getElementById("profile-img-file-input-2");
    inputElement.click();
  };
  const handlePreviewAvatar2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      setAvatar2(file);
    }
  };


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
      } catch (error) {
        // Handle errors (show an error message or log the error)
        console.error("Error creating company:", error);
        console.log(error.response.data);
      }
    } else {
      // setUserImage(userImage2);
    }

  };

  const fetchSelect = async () => {
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
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }

  const handleCreateCompany = async () => {
    openModal2();
  }

  const handleUpdateCompany = async () => {
    setIsModalOpen(!isModalOpen);

  }

  const fetchDetailCompanyupdate = async () => {
    try {
      // Make API request
      const response = await companyServices.getCompanyByCompanyId(
        companyId
      );
      console.log(response.data.data)
      setCompanyNameFormCreateCompany(response.data.data.companyName)
      setEmailFormCreateCompany(response.data.data.companyEmail)
      setCompanyPhoneNumberFormCreateCompany(response.data.data.phoneNumber)
      setAddressFormCreateCompany(response.data.data.address)

      const editor = window.tinymce.get("description"); // Giả sử 'description' là id của Editor
      if (editor) {
        if (response.data.data.aboutCompany) {
          editor.setContent(response.data.data.aboutCompany);
        }
      }

      const fileDev = response.data.data.companyImage;
      // const file = fileDev.target.files[0];

      setUserImage(fileDev);

      axios
        .get(
          "https://restcountries.com/v3.1/all?fields=name&fbclid=IwAR2NFDKzrPsdQyN2Wfc6KNsyrDkMBakGFkvYe-urrPH33yawZDSIbIoxjX4"
        )
        .then((response2) => {
          const data = response2.data;
          const formattedCountries = data.map((country) => ({
            value: country.name.common,
            label: country.name.common,
          }));
          const selected = formattedCountries.find(
            (country) => country.value === response.data.data.country
          );
          if (selected) {
            const company = {
              value: selected.value,
              label: selected.label,
            };
            setSelectedCountry(company);
          }

        })
        .catch((error) => {
          console.error("Error fetching data", error);
        });

    } catch (error) {
      // Handle errors (show an error message or log the error)
      console.error("Error creating company:", error);
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    if (isModalOpen) {
      const timeout = setTimeout(() => {
        if (descriptionRef.current) {
          fetchDetailCompanyupdate();
        }
      }, 800); // Đợi 100ms để chắc chắn rằng phần tử đã được render
      openModal2();
      return () => clearTimeout(timeout);
    }
  }, [isModalOpen]);

  useEffect(() => {
    fetchCompanyDetail();
    fetchSelect();
  }, []);

  useEffect(() => {
    fetchCompanyDetail();
  }, [isUpdate]);

  const openModal2 = () => {
    setModal2(!modal2);
  };

  const createCompany = async () => {
    setLoadingCreateCompany(true)
    let check = true;
    const formData = new FormData();
    const userId = localStorage.getItem("userId");
    formData.append("companyName", companyNameFormCreateCompany);
    formData.append("companyEmail", emailFormCreateCompany);
    formData.append("phoneNumber", companyPhoneNumberFormCreateCompany);
    formData.append("address", addressFormCreateCompany);
    let selectedCountryValue;
    if (selectedCountry) {
      selectedCountryValue = selectedCountry.value;
    }
    console.log(selectedCountryValue)
    formData.append("country", selectedCountryValue);
    formData.append("userId", userId);
    // formData.append("aboutCompany", value);
    formData.append("file", avatar2);

    if (companyNameFormCreateCompany == "" || !companyNameFormCreateCompany) {
      setCompanyNameError("Please enter the company name!")
      check = false;
    } else {
      setCompanyNameError(null);
    }
    if (emailFormCreateCompany == "" || !emailFormCreateCompany) {
      setEmailError("Please enter email!")
      check = false;

    } else {
      setEmailError(null);
    }
    if (companyPhoneNumberFormCreateCompany == "" || !companyPhoneNumberFormCreateCompany) {
      setPhoneNumberError("Please enter company phone number!")
      check = false;

    } else {
      setPhoneNumberError(null);
    }
    if (addressFormCreateCompany == "" || !addressFormCreateCompany) {
      setAddressError("Please enter country!")
      check = false;

    } else {
      setAddressError(null);
    }
    if (selectedCountry == "" || !selectedCountry) {
      setCountryError("Please enter address!")
      check = false;

    } else {
      setCountryError(null);
    }

    // if (!value) {
    //   setJobDescriptionError("Enter company description");
    //   check = false;
    // } else {
    //   setJobDescriptionError(null);
    // }

    if (check) {
      if (!avatar2) {
        toast.error("You forgot to enter the company's image!")
        setLoadingCreateCompany(false)
      } else {
        try {
          const response = await companyServices.createCompany(formData);
          console.log('API Response:', response.data);
          if (response.data.code == "201") {
            const responseUser = await userSerrvices.getUserById(userId);
            if (responseUser.data.code == "200") {
              const userData = responseUser.data;
              localStorage.setItem('companyId', userData.data.companyId);
            }
          }
          setIsUpdate(!isUpdate);
          toast.success("Create company information sucessfully")
          setLoadingCreateCompany(false)
          setModal2(false)
        } catch (error) {
          setLoadingCreateCompany(false)
          // Handle errors (show an error message or log the error)
          console.error('Error creating company:', error);
          console.log(error.response.data);
          toast.error(error.response.data.message);
        }
      }
    } else {
      setLoadingCreateCompany(false)
    }

  };

  const updateCompany = async () => {
    setLoadingCreateCompany(true)
    let check = true;
    const formData = new FormData();
    const userId = localStorage.getItem("userId");
    formData.append("companyName", companyNameFormCreateCompany);
    formData.append("companyEmail", emailFormCreateCompany);
    formData.append("phoneNumber", companyPhoneNumberFormCreateCompany);
    formData.append("address", addressFormCreateCompany);
    let selectedCountryValue;
    if (selectedCountry) {
      selectedCountryValue = selectedCountry.value;
    }
    console.log(selectedCountryValue)
    formData.append("country", selectedCountryValue);
    formData.append("companyId", companyIdFromLocalStorage);
    formData.append("aboutCompany", value);
    formData.append("file", avatar2 || null);

    if (companyNameFormCreateCompany == "" || !companyNameFormCreateCompany) {
      setCompanyNameError("Please enter the company name!")
      check = false;
    } else {
      setCompanyNameError(null);
    }
    if (emailFormCreateCompany == "" || !emailFormCreateCompany) {
      setEmailError("Please enter email!")
      check = false;

    } else {
      setEmailError(null);
    }
    if (companyPhoneNumberFormCreateCompany == "" || !companyPhoneNumberFormCreateCompany) {
      setPhoneNumberError("Please enter company phone number!")
      check = false;

    } else {
      setPhoneNumberError(null);
    }
    if (addressFormCreateCompany == "" || !addressFormCreateCompany) {
      setAddressError("Please enter country!")
      check = false;

    } else {
      setAddressError(null);
    }
    if (selectedCountry == "" || !selectedCountry) {
      setCountryError("Please enter address!")
      check = false;

    } else {
      setCountryError(null);
    }

    if (!value) {
      setJobDescriptionError("Enter company description");
      check = false;
    } else {
      setJobDescriptionError(null);
    }

    if (check) {

      try {
        const response = await companyServices.updateCompany(companyIdFromLocalStorage, formData);
        console.log('API Response:', response.data);
        if (response.data.code == "201") {
          const responseUser = await userSerrvices.getUserById(userId);
          if (responseUser.data.code == "200") {
            const userData = responseUser.data;
            localStorage.setItem('companyId', userData.data.companyId);
          }
        }
        setIsUpdate(!isUpdate);
        toast.success("Update company information sucessfully")
        setLoadingCreateCompany(false)
        setModal2(false)
      } catch (error) {
        setLoadingCreateCompany(false)
        // Handle errors (show an error message or log the error)
        console.error('Error creating company:', error);
        console.log(error.response.data);
        toast.error(error.response.data.message);
      }

    } else {
      setLoadingCreateCompany(false)
    }
  };

  return (
    <React.Fragment>
      <Row>
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
                  onClick={handleCreateCompany}
                >
                  Create
                </div>
              ) : (
                <div
                  className="btn btn-soft-blue fw-bold w-100"
                  onClick={handleUpdateCompany}
                >
                  Update
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
        <Col lg={8}>
          <Card className="ms-lg-4 mt-4 mt-lg-0">
            <CardBody className="p-4">
              <div className="mb-5">
                <h6 className="fs-17 fw-semibold mb-4">About Company</h6>
                <div className="mt-4">
                  <p
                    className=""
                    dangerouslySetInnerHTML={{
                      __html: companyDetail.aboutCompany,
                    }}
                  />
                </div>
              </div>

            </CardBody>
            <Modal
              isOpen={modal2}
              toggle={openModal2}
              role="dialog"
              centered
            >
              <ModalBody className="">
                <div className="position-absolute end-0 top-0 p-3">
                  <button
                    type="button"
                    className="btn-close"
                    onClick={openModal2}
                  ></button>
                </div>
                <div className="auth-content">
                  <div className="w-100">
                    <div className="text-center ">
                      <h5>Create Company information</h5>
                      <p className="text-muted">
                      </p>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <Form className="auth-form" style={{ padding: "0px 25px 25px 25px" }} >
                <div style={{ textAlign: "center" }}>
                  <div className="mb-4 profile-user">
                    {avatar2 ? (
                      <img
                        src={avatar2.preview}
                        className="rounded-circle img-thumbnail profile-img"
                        id="profile-img"
                        alt=""
                      />
                    ) : (
                      <img
                        src={userImage} // Giá trị mặc định là "userImage2"
                        className="rounded-circle img-thumbnail profile-img"
                        id="profile-img-2"
                        alt=""
                      />
                    )}
                    <div className="p-0 rounded-circle profile-photo-edit">
                      <label className="profile-photo-edit avatar-xs">
                        <i
                          className="uil uil-edit"
                          onClick={handleChooseAvatar2}
                        ></i>
                      </label>
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        id="profile-img-file-input-2"
                        onChange={handlePreviewAvatar2}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                </div>
                <FormGroup className="mb-3">
                  <Label
                    htmlFor="emailInput"
                    className="form-label"
                  >
                    Company Name
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="companyNameInputFormCreate"
                    placeholder="Enter your company name"
                    value={companyNameFormCreateCompany}
                    onChange={handleCompanyNameChange}
                  />
                  {companyNameError && (
                    <p className="mt-2" style={{ color: "#ff4200" }} >
                      {companyNameError}
                    </p>
                  )}
                </FormGroup>
                <FormGroup className="mb-3">
                  <Label
                    htmlFor="emailInput"
                    className="form-label"
                  >
                    Email
                  </Label>
                  <Input
                    type="email"
                    className="form-control"
                    id="emailInputFormCreate"
                    placeholder="Enter your email company"
                    value={emailFormCreateCompany}
                    onChange={handleEmailChange}
                  />
                  {emailError && (
                    <p className="mt-2" style={{ color: "#ff4200" }} >
                      {emailError}
                    </p>
                  )}
                </FormGroup>
                <FormGroup className="mb-3">
                  <Label
                    htmlFor="emailInput"
                    className="form-label"
                  >
                    Company Phone Number
                  </Label>
                  <Input
                    type="email"
                    className="form-control"
                    id="companyPhoneNumberInputFormCreate"
                    placeholder="Enter your company phone number"
                    value={companyPhoneNumberFormCreateCompany}
                    onChange={handleCompanyPhoneNumberChange}
                  />
                  {phoneNumberError && (
                    <p className="mt-2" style={{ color: "#ff4200" }} >
                      {phoneNumberError}
                    </p>
                  )}
                </FormGroup>
                <FormGroup className="mb-3">
                  <Label
                    htmlFor="emailInput"
                    className="form-label"
                  >
                    Country
                  </Label>
                  <Select
                    className="Select Select--level-highest "
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        backgroundColor:
                          "rgba(255, 255, 255, 0.1)",
                        border: "1px solid #ede8e8",
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        color: "black",
                      }),
                      placeholder: (provided) => ({
                        ...provided,
                        color: "#ADB5BD",
                      }),
                      menu: (provided) => ({
                        ...provided,
                        backgroundColor: "white",
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        color: "black",
                      }),
                      menuList: (provided) => ({
                        ...provided,
                        height: "150px", // Đặt chiều cao 150px cho menu list
                      }),
                    }}
                    options={countries}
                    onChange={(selectedOption) => {
                      setSelectedCountry(selectedOption);
                    }}
                    value={selectedCountry}
                  />
                  {countryError && (
                    <p className="mt-2" style={{ color: "#ff4200" }} >
                      {countryError}
                    </p>
                  )}
                </FormGroup>
                <FormGroup className="mb-3">
                  <label
                    htmlFor="passwordInput"
                    className="form-label"
                  >
                    Address
                  </label>
                  <Input
                    className="form-control"
                    id="addressInputFormCreate"
                    placeholder="Enter your address"
                    value={addressFormCreateCompany}
                    onChange={handleAddressChange}
                  />
                  {addressError && (
                    <p className="mt-2" style={{ color: "#ff4200" }} >
                      {addressError}
                    </p>
                  )}
                </FormGroup>
                {companyIdFromLocalStorage == null ? (
                  <>
                  </>
                ) : (

                  <FormGroup className="mb-3">
                    <Label
                      htmlFor="emailInput"
                      className="form-label"
                    >
                      Company Description
                    </Label>
                    <Editor
                      class="fix-height"
                      id="description"
                      ref={descriptionRef}
                      apiKey="axy85kauuja11vgbfrm96qlmduhgfg6egrjpbjil00dfqpwf"
                      onEditorChange={(newValue) => {
                        setValue(newValue);
                      }}
                      init={{
                        plugins:
                          "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                        //   plugins:
                        //     "a11ychecker advcode advlist advtable anchor autolink autoresize autosave casechange charmap checklist code codesample directionality  emoticons export  formatpainter fullscreen importcss  insertdatetime link linkchecker lists media mediaembed mentions  nonbreaking pagebreak pageembed permanentpen powerpaste preview quickbars save searchreplace table  template tinydrive tinymcespellchecker  visualblocks visualchars wordcount",
                        //
                      }}
                    />
                    {jobDescriptionError && (
                      <p className=" mt-2" style={{ color: "#ff4200" }}>
                        {jobDescriptionError}
                      </p>
                    )}
                  </FormGroup>

                )}


                {companyIdFromLocalStorage == null ? (
                  <div className="text-center">
                    <div
                      className="btn btn-primary w-100"
                      onClick={() => createCompany()}
                      disabled={loadingCreateCompany}
                    >
                      {loadingCreateCompany ? (
                        <HashLoader size={20} color={"white"} loading={true} />
                      ) : (
                        "Create company information"
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div
                      className="btn btn-primary w-100"
                      onClick={() => updateCompany()}
                      disabled={loadingCreateCompany}
                    >
                      {loadingCreateCompany ? (
                        <HashLoader size={20} color={"white"} loading={true} />
                      ) : (
                        "Update company information"
                      )}
                    </div>
                  </div>
                )}


              </Form>
            </Modal>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default LeftSideContent;

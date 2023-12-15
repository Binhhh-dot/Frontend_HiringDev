import React, { useState, useEffect, useRef } from "react";
import {
  Input,
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Button,
  Label,
  Col,
  Row,
} from "reactstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";
import companyServices from "../../../services/company.services";
import img0 from "../../../assets/images/user/img-00.jpg";
import axios from "axios";
import { HashLoader } from "react-spinners";

const UpdateCompanyPopup = (
  { isModalOpen, closeModal, companyId },
  ...props
) => {
  //------------------------------------------------------------------------------------------------
  const [avatar, setAvatar] = useState();
  const [userImage, setUserImage] = useState(null);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loadingUpdateCompany, setLoadingUpdateCompany] = useState(false);
  //------------------------------------------------------------------------------------------------
  let companyDetail = null;
  useEffect(() => {
    const fetchCompanyDetail = async () => {
      if (companyId) {
        try {
          const response = await companyServices.getCompanyByCompanyId(
            companyId
          );

          console.log(response);
          companyDetail = response;

          document.getElementById("company-name").value =
            response.data.data.companyName;
          document.getElementById("email-address").value =
            response.data.data.companyEmail;
          document.getElementById("address").value = response.data.data.address;
          document.getElementById("number").value =
            response.data.data.phoneNumber;

          const fileDev = response.data.data.companyImage;
          setUserImage(fileDev);
        } catch (error) {
          console.error("Error fetching company detail:", error);
          console.log(error.response.data);
        }
      } else {
        setUserImage(img0);
      }

      //--------------------------------------------------------------------------
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
          console.error("Error fetching country data", error);
        });
    };
    fetchCompanyDetail();
  }, [isModalOpen]);

  //------------------------------------------------------------------------------------------------
  const handleUpdateCompany = async () => {
    setLoadingUpdateCompany(true);
    const companyName = document.getElementById("company-name").value;
    const companyEmail = document.getElementById("email-address").value;
    const phoneNumber = document.getElementById("number").value;
    const address = document.getElementById("address").value;
    const country = selectedCountry ? selectedCountry.value : "";
    const fileInput = document.getElementById("profile-img-file-input");
    const file = fileInput.files[0];

    if (companyId != "null") {
      const formData = new FormData();
      formData.append("CompanyId", companyId);
      formData.append("CompanyName", companyName);
      formData.append("CompanyEmail", companyEmail);
      formData.append("phoneNumber", phoneNumber);
      formData.append("address", address);
      formData.append("country", country);
      formData.append("file", file || null);
      try {
        const response = await companyServices.updateCompany(
          companyId,
          formData
        );

        console.log(response);
        toast.success("Update company sucessfully");
        setLoadingUpdateCompany(false);
        closeModal();
      } catch (error) {
        console.error("Error creating company:", error);
        toast.error("Update company fail");

        setLoadingUpdateCompany(false);
      }
    }
  };
  //------------------------------------------------------------------------------------------------
  useEffect(() => {
    return () => avatar && URL.revokeObjectURL(avatar.preview);
  }, [avatar]);

  const handleChooseAvatar = () => {
    const inputElement = document.getElementById("profile-img-file-input");
    inputElement.click();
  };

  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      setAvatar(file);
    } else {
      setAvatar(null);
    }
  };
  //------------------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------------------
  return (
    <React.Fragment>
      <div>
        <Modal isOpen={isModalOpen} toggle={closeModal} size={"lg"}>
          <div className="mt-2 d-flex justify-content-end ">
            <Button
              close
              className="close-button"
              onClick={closeModal}
              style={{ marginRight: "10px" }}
            ></Button>
          </div>
          <ModalBody>
            <div>
              <Form>
                <div>
                  <h5 className="fs-17 fw-semibold mb-3 mb-0">My Company</h5>
                  <div className="text-center">
                    <div className="mb-4 profile-user">
                      {avatar ? (
                        <img
                          src={avatar.preview}
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
                            onClick={handleChooseAvatar}
                          ></i>
                        </label>
                        <input
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          id="profile-img-file-input"
                          onChange={handlePreviewAvatar}
                          style={{ display: "none" }}
                        />
                      </div>
                    </div>
                  </div>
                  <Row>
                    <Col lg={12}>
                      <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">
                          Company Name
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="company-name"
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <Label class="text-muted">Country</Label>
                        <div style={{ paddingBottom: "10px" }}>
                          <Select
                            options={countries}
                            value={selectedCountry}
                            onChange={(selectedOption) =>
                              setSelectedCountry(selectedOption)
                            }
                          />
                        </div>
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <Label htmlFor="email" className="form-label">
                          Address
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="address"
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <Label htmlFor="email" className="form-label">
                          Email
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="email-address"
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <Label htmlFor="email" className="form-label">
                          Company Phone Number
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="number"
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="mt-4 text-end">
                  <div
                    className="btn btn-soft-blue fw-bold"
                    onClick={handleUpdateCompany}
                    disabled={loadingUpdateCompany}
                  >
                    {loadingUpdateCompany ? (
                      <HashLoader size={20} color={"white"} loading={true} />
                    ) : (
                      "Update"
                    )}
                  </div>
                </div>
              </Form>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default UpdateCompanyPopup;

import React, { useState, useEffect } from "react";
import { Input, Modal, ModalBody, Form, FormGroup, Label } from "reactstrap"; // Assuming you are using reactstrap for modal components
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Section from "../CreateProject/Section";
import Select from "react-select";
import axios from "axios";
import { RingLoader, HashLoader } from "react-spinners";
import skillService from "../../../services/skill.service";
import typeService from "../../../services/type.service";
import levelService from "../../../services/level.service";
import hiringRequestService from "../../../services/hiringrequest.service";
import scheduleTypeService from "../../../services/scheduleType";
import employmentTypeServices from "../../../services/employmentType.services";
import { Editor } from "@tinymce/tinymce-react";
import companyServices from "../../../services/company.services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import projectTypeServices from "../../../services/projectType.services";
import backgroundImage from "../../../assets/images/logo/Frame 1.png";
import projectServices from "../../../services/project.services";

const CreateProject = () => {
  document.title = "Job List | WeHire - Job Listing Template | Themesdesign";
  const notify = () => {
    toast.info(" Wow so easy!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  let hiringRequestSaved;
  const location = useLocation();
  const [options, setOptions] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [options3, setOptions3] = useState([]);
  const [options4, setOptions4] = useState([]);
  const [options5, setOptions5] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptions2, setSelectedOptions2] = useState([]);
  const [selectedOptions3, setSelectedOptions3] = useState([]);
  const [selectedOptions4, setSelectedOptions4] = useState([]);
  const [selectedOptions5, setSelectedOptions5] = useState([]);
  const [companyId, setCompanyId] = useState(null);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [jobTitleError, setJobTitleError] = useState(null);
  const [numberDevError, setNumberDevError] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [levelError, setLevelError] = useState(null);
  const [skillError, setSkillError] = useState(null);
  const [scheduleTypeError, setScheduleTypeError] = useState(null);
  const [employmentTypeError, setEmploymentTypeError] = useState(null);
  const [budgetError, setBudgetError] = useState(null);
  const [durationError, setDurationError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [text, setText] = useState("");
  const [value, setValue] = useState("");
  const [avatar2, setAvatar2] = useState();
  const [avatar, setAvatar] = useState();
  const [userImage3, setUserImage3] = useState(null);
  const [companyNameFormCreateCompany, setCompanyNameFormCreateCompany] =
    useState(null);
  const [emailFormCreateCompany, setEmailFormCreateCompany] = useState(null);
  const [
    companyPhoneNumberFormCreateCompany,
    setCompanyPhoneNumberFormCreateCompany,
  ] = useState(null);
  const [addressFormCreateCompany, setAddressFormCreateCompany] =
    useState(null);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [minDateEndDay, setMinDateEndDay] = useState("");
  const today = new Date();
  const today2 = new Date();
  today.setDate(today.getDate() + 10);
  today2.setDate(today2.getDate() + 40);
  const tomorrow = today.toISOString().split("T")[0];
  const _30DayLater = today2.toISOString().split("T")[0];

  const [projectNameError, setProjectNameError] = useState(null);
  const [startDateError, setStartDateError] = useState(null);
  const [endDateError, setEndDateError] = useState(null);
  const [projectTypeError, setProjectTypeError] = useState(null);
  const [jobDescriptionError, setJobDescriptionError] = useState(null);

  useState(() => {
    // setMinDateEndDay(_30DayLater);
    // Thiết lập giá trị minDate thành ngày kế tiếp
  }, []);

  const openModal = () => {
    setModal(!modal);
  };
  const openModal2 = () => {
    setModal2(!modal2);
  };

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

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };
  const handleChange2 = (selected) => {
    console.log(selected);
    setSelectedOptions2(selected);
  };
  const handleChange3 = (selected) => {
    setSelectedOptions3(selected);
  };
  const handleChange4 = (selected) => {
    setSelectedOptions4(selected);
  };
  const handleChange5 = (selected) => {
    setSelectedOptions5(selected);
  };
  const navigate = useNavigate();
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === null) {
      navigate("/signin");
    } else if (role === "manager") {
      navigate("/error404");
    }
  });

  const createCompany = async () => {
    const formData = new FormData();
    const userId = localStorage.getItem("userId");
    formData.append("companyName", companyNameFormCreateCompany);
    formData.append("companyEmail", emailFormCreateCompany);
    formData.append("phoneNumber", companyPhoneNumberFormCreateCompany);
    formData.append("address", addressFormCreateCompany);
    formData.append("country", selectedCountry);
    formData.append("userId", userId);
    formData.append("file", avatar2);

    try {
      // Make API request
      const response = await companyServices.createCompany(formData);

      // Handle the response (you can show a success message or redirect to another page)
      console.log("API Response:", response.data);
      const responseUser = await axios.get(
        `https://wehireapi.azurewebsites.net/api/User/${userId}`
      );
      const userData = responseUser.data;
      localStorage.setItem("companyId", userData.data.companyId);
      console.log("thanh cong roi yeahh");
    } catch (error) {
      // Handle errors (show an error message or log the error)
      console.error("Error creating company:", error);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    console.log(minDate);
    console.log(minDateEndDay);
    fetch(
      "https://restcountries.com/v3.1/all?fields=name&fbclid=IwAR2NFDKzrPsdQyN2Wfc6KNsyrDkMBakGFkvYe-urrPH33yawZDSIbIoxjX4"
    )
      .then((response) => response.json())
      .then((data) => {
        const formattedCountries = data.map((country) => ({
          value: country.name.common,
          label: country.name.common,
        }));
        setCountries(formattedCountries);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy userId từ localStorage
        const userId = localStorage.getItem("userId");
        if (!userId) {
          openModal();
        }
        const responseUser = await axios.get(
          `https://wehireapi.azurewebsites.net/api/User/${userId}`
        );
        const userData = responseUser.data;

        // Lưu companyId vào state và localStorage
        setCompanyId(userData.data.companyId);

        localStorage.setItem("companyId", userData.data.companyId);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }

      try {
        // Lấy userId từ localStorage
        const userId = localStorage.getItem("userId");
        const companyId = localStorage.getItem("companyId");
        if (userId && companyId == "null") {
          openModal2();
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }

      try {
        const requestIdParam = location.state.requestId;
        console.log(requestIdParam);
        const response =
          await hiringRequestService.getHiringRequestDetailInCompany(
            requestIdParam
          );
        console.log(response);
        hiringRequestSaved = response.data.data;
        document.getElementById("job-title").value =
          hiringRequestSaved.jobTitle;
        document.getElementById("number-dev").value =
          hiringRequestSaved.numberOfDev;
        document.getElementById("budget").value =
          hiringRequestSaved.salaryPerDev;
        console.log(hiringRequestSaved.salaryPerDev);
        localStorage.setItem("requestId", hiringRequestSaved.requestId);
        const formattedDuration = hiringRequestSaved.duration.split("T")[0];
        const editor = window.tinymce.get("description"); // Giả sử 'description' là id của Editor
        if (editor) {
          editor.setContent(hiringRequestSaved.jobDescription);
        }

        // Đặt giá trị cho input duration
        document.getElementById("duration").value = formattedDuration;
      } catch (error) {
        console.error("Error:", error);
      }

      try {
        const response2 = await projectTypeServices.getAllType();
        const activeTypes = response2.data.data.filter(
          (type) => type.statusString === "Active"
        );
        if (hiringRequestSaved) {
          const requiredTypeName = hiringRequestSaved.typeRequireName;
          const foundType = activeTypes.find(
            (type) => type.projectTypeName === requiredTypeName
          );
          if (foundType) {
            const newType = {
              value: foundType.projectTypeId.toString(),
              label: foundType.projectTypeName,
            };
            setSelectedOptions2(newType);
          }
        }
        let formattedTypes = activeTypes.map((type) => ({
          value: type.projectTypeId.toString(),
          label: type.projectTypeName,
        }));
        setOptions2(formattedTypes);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };
    fetchData();
  }, []);

  const handlePostJob = async () => {
    // Kiểm tra xem có userID trong localStorage không
    const userId = localStorage.getItem("userId");
    if (!userId) {
      openModal(); // Nếu không có, mở modal signup
    } else {
      const companyIdErr = localStorage.getItem("companyId");
      if (companyIdErr == "null") {
        openModal2();
      } else {
        setLoading(true);
        let check = true;
        if (!document.getElementById("project-name").value) {
          setProjectNameError("Enter project name");
          check = false;
        } else {
          setProjectNameError(null);
        }
        if (!document.getElementById("start-date").value) {
          setStartDateError("Enter start date of project");
          check = false;
        } else {
          setStartDateError(null);
        }
        if (!document.getElementById("end-date").value) {
          setEndDateError("Enter end date of project");
          check = false;
        } else {
          setEndDateError(null);
        }
        if (!selectedOptions2.value) {
          setProjectTypeError("Select project type");
          check = false;
        } else {
          setProjectTypeError(null);
        }
        if (!value) {
          setJobDescriptionError("Enter job description");
          check = false;
        } else {
          setJobDescriptionError(null);
        }
        if (check) {
          try {
            const projectName = document.getElementById("project-name").value;
            const projectDescription = value;
            const startDate = document.getElementById("start-date").value;
            const endDate = document.getElementById("end-date").value;
            const projectTypeRequireId = selectedOptions2.value;
            const formData = new FormData();
            formData.append("companyId", companyIdErr);
            formData.append("projectName", projectName);
            formData.append("projectTypeId", projectTypeRequireId);
            formData.append("startDate", startDate);
            formData.append("endDate", endDate);
            formData.append("description", projectDescription);
            const response = await projectServices.createProject(formData);
            // }
            setLoading(false);
            setErrorMessage(null);
            navigate("/projectlist");
            toast.success("Create project successfully!");
          } catch (error) {
            console.log(value);
            console.error("Error posting job:", error);
            setLoading(false);
            setSuccessMessage(null);
            toast.error("Create project fail!");
            // Handle error, show error message, etc.
          }
        } else {
          setLoading(false);
          setSuccessMessage(null);
          toast.error("Create project fail!");
        }
      }
    }
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

  const setMinDateEndDayByJs = () => {
    if (document.getElementById("start-date").value) {
      const startDateValue = document.getElementById("start-date").value;
      const startDate = new Date(startDateValue);
      startDate.setDate(startDate.getDate() + 1); // Thêm 30 ngày vào ngày bắt đầu

      const minDay = startDate.toISOString().slice(0, 10); // Chuyển đổi về chuỗi ngày tháng (YYYY-MM-DD)

      console.log(minDay);
      setMinDateEndDay(minDay);
    } else {
      setMinDateEndDay(_30DayLater);
    }
  };

  const setMinDateByJs = () => {
    if (document.getElementById("end-date").value) {
      const endDateValue = document.getElementById("end-date").value;
      const endDate = new Date(endDateValue);
      endDate.setDate(endDate.getDate() - 1); // Thêm 30 ngày vào ngày bắt đầu

      const minDay = endDate.toISOString().slice(0, 10); // Chuyển đổi về chuỗi ngày tháng (YYYY-MM-DD)

      setMaxDate(minDay);
    } else {
      setMaxDate(null);
    }
  };

  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      setAvatar(file);
    }
  };
  return (
    <React.Fragment>
      {loading && (
        <div className="overlay" style={{ zIndex: "2000" }}>
          <div className="spinner"></div>
        </div>
      )}
      <Section />
      <section class="section">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-10">
              <div class="rounded shadow bg-white p-4">
                <div class="custom-form">
                  <div id="message3"></div>
                  <form
                    method="post"
                    action="php/contact.php"
                    name="contact-form"
                    id="contact-form3"
                  >
                    <h4 class="text-dark mb-3">Post a New Project :</h4>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group app-label mt-2">
                          <label class="text-muted">Project Name</label>
                          <input
                            id="project-name"
                            type="text"
                            class="form-control resume"
                            placeholder=""
                            maxLength="100"
                            required
                          ></input>
                          {projectNameError && (
                            <p className="text-danger mt-2">
                              {projectNameError}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group app-label mt-2">
                          <label class="text-muted">Project type</label>
                          <div className="form-button">
                            <Select
                              options={options2}
                              value={selectedOptions2}
                              onChange={handleChange2}
                              className="Select Select--level-highest"
                              style={{ maxHeight: "2000px", overflowY: "auto" }}
                            />
                          </div>

                          {projectTypeError && (
                            <p className="text-danger mt-2">
                              {projectTypeError}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group app-label mt-2">
                          <label class="text-muted">Start Date</label>
                          <input
                            id="start-date"
                            type="date"
                            class="form-control resume"
                            placeholder=""
                            min={minDate}
                            max={maxDate}
                            onChange={setMinDateEndDayByJs}
                            required
                          ></input>
                          {startDateError && (
                            <p className="text-danger mt-2">{startDateError}</p>
                          )}
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="form-group app-label mt-2">
                          <label class="text-muted">End date</label>
                          <input
                            id="end-date"
                            type="date"
                            class="form-control resume"
                            min={minDateEndDay}
                            onChange={setMinDateByJs}
                            placeholder=""
                            required
                          ></input>
                          {endDateError && (
                            <p className="text-danger mt-2">{endDateError}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group app-label mt-2">
                          <label class="text-muted">Job Description</label>
                          <Editor
                            class="fix-height"
                            id="description"
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
                            <p className="text-danger mt-2">
                              {jobDescriptionError}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-lg-12 mt-2 d-flex justify-content-end gap-2">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handlePostJob}
                          disabled={loading}
                        >
                          {loading ? (
                            <RingLoader color="#fff" loading={true} size={20} />
                          ) : (
                            "Create project"
                          )}
                        </button>
                      </div>
                      {successMessage && (
                        <div className="alert alert-success mt-2" role="alert">
                          {successMessage}
                        </div>
                      )}

                      {/* Hiển thị thông báo lỗi */}
                      {errorMessage && (
                        <div className="alert alert-danger mt-2" role="alert">
                          {errorMessage}
                        </div>
                      )}

                      {/* Modal for create company */}
                      <Modal
                        isOpen={modal2}
                        toggle={openModal2}
                        role="dialog"
                        centered
                      >
                        <ModalBody className="p-5">
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
                                <p className="text-muted">
                                  Create Company Account and get access to all
                                  the features of WeHire
                                </p>
                              </div>
                              <Form action="#" className="auth-form">
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
                                        src={userImage3} // Giá trị mặc định là "userImage2"
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
                                        color: "red",
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
                                </FormGroup>
                                <div className="text-center">
                                  <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    onClick={createCompany}
                                  >
                                    Create
                                  </button>
                                </div>
                              </Form>
                            </div>
                          </div>
                        </ModalBody>
                      </Modal>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default CreateProject;

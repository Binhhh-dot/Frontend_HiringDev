  import React, { useState, useEffect } from "react";
  import {
    Col,
    Container,
    Row,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Input,
    Modal,
    ModalBody,
    Form,
    FormGroup,
    Label
  } from "reactstrap"; // Assuming you are using reactstrap for modal components
  import { Link } from "react-router-dom";
  import Section from "../CreateHiringRequest/Section";
  import Select from "react-select";
  import axios from "axios";
  import { RingLoader } from "react-spinners";

  const CreateHiringRequest = () => {
    document.title = "Job List | Jobcy - Job Listing Template | Themesdesign";
    const [options, setOptions] = useState([]);
    const [options2, setOptions2] = useState([]);
    const [options3, setOptions3] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedOptions2, setSelectedOptions2] = useState([]);
    const [selectedOptions3, setSelectedOptions3] = useState([]);
    const [companyId, setCompanyId] = useState(null);
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [jobTitleError, setJobTitleError] = useState(null);
    const [numberDevError, setNumberDevError] = useState(null);
const [typeError, setTypeError] = useState(null);
const [levelError, setLevelError] = useState(null);
const [skillError, setSkillError] = useState(null);
const [budgetError, setBudgetError] = useState(null);
const [durationError, setDurationError] = useState(null);
const [descriptionError, setDescriptionError] = useState(null);
const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

    const openModal = () => {
      setModal(!modal);
    };
    const openModal2 = () => {
      setModal2(!modal2);
    };

    const handleChange = (selected) => {
      setSelectedOptions(selected);
    };
    const handleChange2 = (selected) => {
      setSelectedOptions2(selected);
    };
    const handleChange3 = (selected) => {
      setSelectedOptions3(selected);
    };
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("https://wehireapi.azurewebsites.net/api/Skill");
          const activeSkills = response.data.data.filter(skill => skill.statusString === "Active");
          const formattedSkills = activeSkills.map(skill => ({
            value: skill.skillId.toString(),
            label: skill.skillName
          }));
          setOptions(formattedSkills);
        } catch (error) {
          console.error("Error fetching skills:", error);
        }

        try {
          const response2 = await axios.get("https://wehireapi.azurewebsites.net/api/Type");
          const activeTypes = response2.data.data.filter(type => type.statusString === "Active");
          const formattedTypes = activeTypes.map(type => ({
            value: type.typeId.toString(),
            label: type.typeName
          }));
          setOptions2(formattedTypes);
        } catch (error) {
          console.error("Error fetching types:", error);
        }

        try {
          const response3 = await axios.get("https://wehireapi.azurewebsites.net/api/Level");
          const activeLevels = response3.data.data.filter(level => level.statusString === "Active");
          const formattedLevels = activeLevels.map(level => ({
            value: level.levelId.toString(),
            label: level.levelName
          }));
          setOptions3(formattedLevels);
        } catch (error) {
          console.error("Error fetching levels:", error);
        }
        try {
          // Lấy userId từ localStorage
          const userId = localStorage.getItem('userId');
          if (!userId) {
            openModal();
          }
          const responseUser = await axios.get(`https://wehireapi.azurewebsites.net/api/User/${userId}`);
          const userData = responseUser.data;
          
          // Lưu companyId vào state và localStorage
          setCompanyId(userData.data.companyId);
          
          localStorage.setItem('companyId', userData.data.companyId);
      
        } catch (error) {
          console.error("Error fetching user data:", error);
          const companyIdErr = localStorage.getItem('companyId');
          if (!companyIdErr) {
            openModal2();
          }
        }
        
      };
      fetchData();
      
    }, []);

    const handlePostJob = async () => {
      setLoading(true);
      // Kiểm tra xem có userID trong localStorage không
      const userId = localStorage.getItem('userId');
      if (!userId) {
        openModal(); // Nếu không có, mở modal signup
      } else {
        const companyIdErr = localStorage.getItem('companyId');
          if (!companyIdErr) {
            openModal2();
          }
        if (!document.getElementById("job-title").value) {
          setJobTitleError("Please enter a job title.");
          
        } else {
          setJobTitleError(null);
        }
        if (!document.getElementById("number-dev").value || parseInt(document.getElementById("number-dev").value,10)<=0) {
          setNumberDevError("Please enter a valid number of developers (greater than 0).");
          
        } else {
          setNumberDevError(null);
        }
      
        // Kiểm tra lỗi cho Type of developer
        if (!selectedOptions2.value) {
          setTypeError("Please select the type of developer.");
          
        } else {
          setTypeError(null);
        }
      
        // Kiểm tra lỗi cho Level requirement
        if (!selectedOptions3.value) {
          setLevelError("Please select the level requirement.");
          
        } else {
          setLevelError(null);
        }
      
        // Kiểm tra lỗi cho Skill requirement
        if (selectedOptions.length === 0) {
          setSkillError("Please select at least one skill.");
          
        } else {
          setSkillError(null);
        }
      
        // Kiểm tra lỗi cho Budget
        if (!document.getElementById("budget").value || parseInt(document.getElementById("budget").value,10)<=0) {
          setBudgetError("Please enter the budget(greater than 0).");
          
        } else {
          setBudgetError(null);
        }
      
        // Kiểm tra lỗi cho Duration
        if (!document.getElementById("duration").value) {
          setDurationError("Please enter the duration.");
          
        }else{
          const currentDate = new Date();
    const selectedDate = new Date(document.getElementById("duration").value);
    if (selectedDate <= currentDate) {
      setDurationError("Please enter a date greater than the current date.");
    } else {
      setDurationError(null);
    }
        } 
        // Kiểm tra lỗi cho Job Description
        if (!document.getElementById("description").value) {
          setDescriptionError("Please enter the job description.");
          
        } else {
          setDescriptionError(null);
        }
      
        // Nếu có, thực hiện logic để đăng job
        // Đây có thể là nơi gửi yêu cầu đăng job lên server
        console.log("Posting job...");
        try {
          const response = await axios.post(
            "https://wehireapi.azurewebsites.net/api/HiringRequest",
            {
              jobTitle: document.getElementById("job-title").value, // replace with the actual job title from your input
              jobDescription: document.getElementById("description").value, // get job description from the textarea
              numberOfDev: parseInt(document.getElementById("number-dev").value, 10), // parse as integer
              salaryPerDev: parseFloat(document.getElementById("budget").value), // parse as float
              duration: document.getElementById("duration").value, // get duration from the date input
              companyId: companyId,
              typeRequireId: selectedOptions2.value, // replace with actual value from the type dropdown
              levelRequireId: selectedOptions3.value, // replace with actual value from the level dropdown
              skills: selectedOptions.map((skill) => skill.value), // replace with actual values from the multi-select
              isSaved: false,
            }
          );
          setLoading(false);
      setSuccessMessage("Đăng công việc thành công");
      setErrorMessage(null);
          console.log("Job posted successfully:", response.data);
        } catch (error) {
          console.error("Error posting job:");
          setLoading(false);
      setSuccessMessage(null);
      setErrorMessage("Lỗi khi đăng công việc");

          // Handle error, show error message, etc.
        }
      }
    };


    return (
      <React.Fragment>
        <Section />
        <section class="section">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-10">
                <div class="rounded shadow bg-white p-4">
                  <div class="custom-form">
                    <div id="message3"></div>
                    <form method="post" action="php/contact.php" name="contact-form" id="contact-form3">
                      <h4 class="text-dark mb-3">Post a New Job :</h4>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group app-label mt-2">
                            <label class="text-muted">Job Title</label>
                            <input id="job-title" type="text" class="form-control resume" placeholder="" required></input>
                            {jobTitleError && <p className="text-danger mt-2">{jobTitleError}</p>}
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group app-label mt-2">
                            <label class="text-muted">Number of developer</label>
                            <input id="number-dev" type="number" class="form-control resume" placeholder="2"></input>
                            {numberDevError && <p className="text-danger mt-2">{numberDevError}</p>}
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group app-label mt-2">
                            <label class="text-muted">Type of developer</label>
                            <div className="form-button">
                              <Select
                                options={options2}
                                value={selectedOptions2}
                                onChange={handleChange2}
                              />
                            </div>
                            {typeError && <p className="text-danger mt-2">{typeError}</p>}
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group app-label mt-2">
                            <label class="text-muted">Level requirement</label>
                            <div className="form-button">
                              <Select
                                options={options3}
                                value={selectedOptions3}
                                onChange={handleChange3}
                              />
                            </div>
                            {levelError && <p className="text-danger mt-2">{levelError}</p>}
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group app-label mt-2">
                            <label class="text-muted">Skill requirement</label>
                            <div className="form-button">
                              <Select
                                isMulti
                                options={options}
                                value={selectedOptions}
                                onChange={handleChange}
                              />
                            </div>
                            {skillError && <p className="text-danger mt-2">{skillError}</p>}
                          </div>
                        </div>
                      </div>



                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group app-label mt-2">
                            <label class="text-muted">Budget</label>
                            <input id="budget" type="number" class="form-control resume" placeholder="300$"></input>
                            {budgetError && <p className="text-danger mt-2">{budgetError}</p>}
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group app-label mt-2">
                            <label class="text-muted">Duration</label>
                            <input id="duration" type="date" class="form-control resume" placeholder=""></input>
                            {durationError && <p className="text-danger mt-2">{durationError}</p>}
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group app-label mt-2">
                            <label class="text-muted">Job Description</label>
                            <textarea id="description" rows="6" class="form-control resume" placeholder=""></textarea>
                            {descriptionError && <p className="text-danger mt-2">{descriptionError}</p>}
                          </div>
                        </div>
                      </div>
                      <div class="row">
                      <div class="col-lg-12 mt-2">
    <button type="button" className="btn btn-primary" onClick={handlePostJob} disabled={loading}>
    {loading ? (
            <RingLoader color="#fff" loading={true} size={20} />
          ) : (
            "Post a hiring request"
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

  {/* Modal for Sign Up */}
  <Modal
                      isOpen={modal}
                      toggle={openModal}
                      role="dialog"
                      centered
                    >
                      <ModalBody className="p-5">
                        <div className="position-absolute end-0 top-0 p-3">
                          <button
                            type="button"
                            className="btn-close"
                            onClick={openModal}
                          ></button>
                        </div>
                        <div className="auth-content">
                          <div className="w-100">
                            <div className="text-center mb-4">
                              <h5>Sign Up</h5>
                              <p className="text-muted">
                                Sign Up and get access to all the features of
                                Jobcy
                              </p>
                            </div>
                            <Form action="#" className="auth-form" onSubmit={handleSignIn}>
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
                                  id="emailInput"
                                  placeholder="Enter your email"
                                />
                              </FormGroup>
                              <FormGroup className="mb-3">
                                <label
                                  htmlFor="passwordInput"
                                  className="form-label"
                                >
                                  Password
                                </label>
                                <Input
                                  type="password"
                                  className="form-control"
                                  id="passwordInput"
                                  placeholder="Password"
                                />
                              </FormGroup>
                              <div className="text-center">
                                <button
                                  type="submit"
                                  className="btn btn-primary w-100"
                                >
                                  Sign In
                                </button>
                              </div>
                            </Form>
                            <div className="mt-3 text-center">
                              <p className="mb-0">
                              Don't have an account ?{" "}
                                <Link
                                  to="/signup"
                                  className="form-text text-primary text-decoration-underline"
                                >
                                  {" "}
                                  Sign-up{" "}
                                </Link>
                              </p>
                            </div>
                          </div>
                        </div>
                      </ModalBody>
                    </Modal>
                    
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
                            <div className="text-center mb-4">
                              <h5>Sign Up</h5>
                              <p className="text-muted">
                                Sign Up and get access to all the features of
                                Jobcy
                              </p>
                            </div>
                            <Form action="#" className="auth-form">
                              <FormGroup className="mb-3">
                                <Label
                                  htmlFor="emailInput"
                                  className="form-label"
                                >
                                  Company Name
                                </Label>
                                <Input
                                  type="email"
                                  className="form-control"
                                  id="companyNameInput"
                                  placeholder="Enter your company name"
                                />
                              </FormGroup>
                              <FormGroup className="mb-3">
                                <label
                                  htmlFor="passwordInput"
                                  className="form-label"
                                >
                                  Password
                                </label>
                                <Input
                                  type="password"
                                  className="form-control"
                                  id="s"
                                  placeholder="Password"
                                />
                              </FormGroup>
                              <div className="text-center">
                                <button
                                  type="submit"
                                  className="btn btn-primary w-100"
                                >
                                  Sign In
                                </button>
                              </div>
                            </Form>
                            <div className="mt-3 text-center">
                              <p className="mb-0">
                              Don't have an account ?{" "}
                                <Link
                                  to="/signup"
                                  className="form-text text-primary text-decoration-underline"
                                >
                                  {" "}
                                  Sign-up{" "}
                                </Link>
                              </p>
                            </div>
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

  export default CreateHiringRequest;

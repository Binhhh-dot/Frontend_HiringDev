import React, { useState, useEffect } from "react";
import {
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
import skillService from "../../../services/skill.service";
import typeService from "../../../services/type.service";
import levelService from "../../../services/level.service";
import hiringRequestService from "../../../services/hiringrequest.service";
import scheduleTypeService from "../../../services/scheduleType";
import employmentTypeServices from "../../../services/employmentType.services";
import { Editor } from '@tinymce/tinymce-react';

const CreateHiringRequest = () => {
  document.title = "Job List | Jobcy - Job Listing Template | Themesdesign";
  let hiringRequestSaved;
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
  const [errorMessage, setErrorMessage] = useState(null);
  const [text, setText] = useState('');
  const [value, setValue] = useState('');

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
    console.log(selected)
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

  useEffect(() => {
    const fetchData = async () => {
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

      }



      try {
        // Lấy userId từ localStorage
        const userId = localStorage.getItem('userId');
        const companyId = localStorage.getItem('companyId');
        if (userId && !companyId) {
          openModal2();
        }
      } catch (error) {
        console.error("Error fetching user data:", error);

      }

      try {
        const companyId = localStorage.getItem('companyId');
        const response = await hiringRequestService.getHiringRequestSaved(companyId);
        hiringRequestSaved = response.data.data[0];
        document.getElementById("job-title").value = hiringRequestSaved.jobTitle;
        document.getElementById("number-dev").value = hiringRequestSaved.numberOfDev;
        document.getElementById("budget").value = hiringRequestSaved.salaryPerDev;
        localStorage.setItem('requestId', hiringRequestSaved.requestId);
        const formattedDuration = hiringRequestSaved.duration.split("T")[0];
        const editor = window.tinymce.get('description'); // Giả sử 'description' là id của Editor
        if (editor) {
          editor.setContent(hiringRequestSaved.jobDescription);
        }

        // Đặt giá trị cho input duration
        document.getElementById("duration").value = formattedDuration;
        console.log(hiringRequestSaved)


      } catch (error) {
        console.error("Error:", error);
      }
      try {
        const response = await skillService.getAllSkill();
        const activeSkills = response.data.data.filter(skill => skill.statusString === "Active");

        if (hiringRequestSaved) {
          const requiredSkillNames = hiringRequestSaved.skillRequireStrings;

          const foundSkills = activeSkills.filter(skill =>
            requiredSkillNames.includes(skill.skillName)
          );

          // Assuming setSelectedOptions is designed to handle an array
          setSelectedOptions(foundSkills.map(foundSkill => ({
            value: foundSkill.skillId.toString(),
            label: foundSkill.skillName
          })));
        }

        const formattedSkills = activeSkills.map(skill => ({
          value: skill.skillId.toString(),
          label: skill.skillName
        }));
        setOptions(formattedSkills);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }

      try {
        const response2 = await typeService.getAllType();
        const activeTypes = response2.data.data.filter(type => type.statusString === "Active");
        if (hiringRequestSaved) {
          const requiredTypeName = hiringRequestSaved.typeRequireName;
          const foundType = activeTypes.find(type => type.typeName === requiredTypeName);
          if (foundType) {
            const newType = {
              value: foundType.typeId.toString(),
              label: foundType.typeName
            };
            setSelectedOptions2(newType);
          }
        }
        let formattedTypes = activeTypes.map(type => ({
          value: type.typeId.toString(),
          label: type.typeName
        }));
        setOptions2(formattedTypes);
      } catch (error) {
        console.error("Error fetching types:", error);
      }

      try {
        const response3 = await levelService.getAllLevel();
        const activeLevels = response3.data.data.filter(level => level.statusString === "Active");
        if (hiringRequestSaved) {

          const requiredLevelName = hiringRequestSaved.levelRequireName;
          const foundLevel = activeLevels.find(level => level.levelName === requiredLevelName);
          if (foundLevel) {
            const newLevel = {
              value: foundLevel.levelId.toString(),
              label: foundLevel.levelName
            };
            setSelectedOptions3(newLevel);
          }
        }
        const formattedLevels = activeLevels.map(level => ({
          value: level.levelId.toString(),
          label: level.levelName
        }));
        setOptions3(formattedLevels);
      } catch (error) {
        console.error("Error fetching levels:", error);
      }

      try {
        const response4 = await scheduleTypeService.getAllScheduleType();
        const activeScheduleType = response4.data.data.filter(scheduleType => scheduleType.statusString === "Active");
        if (hiringRequestSaved) {

          const requiredScheduleTypeName = hiringRequestSaved.scheduleTypeName;
          const foundScheduleType = activeScheduleType.find(scheduleType => scheduleType.scheduleTypeName === requiredScheduleTypeName);
          if (foundScheduleType) {
            const newScheduleTypeNam = {
              value: foundScheduleType.scheduleTypeId.toString(),
              label: foundScheduleType.scheduleTypeName
            };
            setSelectedOptions4(newScheduleTypeNam);
          }
        }
        const formattedScheduleType = activeScheduleType.map(scheduleType => ({
          value: scheduleType.scheduleTypeId.toString(),
          label: scheduleType.scheduleTypeName
        }));
        setOptions4(formattedScheduleType);
      } catch (error) {
        console.error("Error fetching schedule type:", error);
      }

      try {
        const response5 = await employmentTypeServices.getAllEmploymentType();
        const activeEmploymentType = response5.data.data.filter(employmentType => employmentType.statusString === "Active");
        if (hiringRequestSaved) {
          const requirEdemploymentType = hiringRequestSaved.employmentTypeName;
          const foundEmploymentType = activeEmploymentType.find(employmentType => employmentType.employmentTypeName === requirEdemploymentType);
          if (foundEmploymentType) {
            const newEmploymentType = {
              value: foundEmploymentType.employmentTypeId.toString(),
              label: foundEmploymentType.employmentTypeName
            };
            setSelectedOptions5(newEmploymentType);
          }
        }
        const formattedEmploymentType = activeEmploymentType.map(employmentType => ({
          value: employmentType.employmentTypeId.toString(),
          label: employmentType.employmentTypeName
        }));
        setOptions5(formattedEmploymentType);
      } catch (error) {
        console.error("Error fetching employment typeName:", error);
      }

    };
    fetchData();

  }, []);

  const handlePostJob = async () => {
    // Kiểm tra xem có userID trong localStorage không
    const userId = localStorage.getItem('userId');
    if (!userId) {
      openModal(); // Nếu không có, mở modal signup
    } else {
      const companyIdErr = localStorage.getItem('companyId');
      if (!companyIdErr) {
        openModal2();
      } else {
        setLoading(true);
        let check = true;
        if (!document.getElementById("job-title").value) {
          setJobTitleError("Please enter a job title.");
          check = false;
        } else {
          setJobTitleError(null);
        }
        if (!document.getElementById("number-dev").value || parseInt(document.getElementById("number-dev").value, 10) <= 0) {
          setNumberDevError("Please enter a valid number of developers (greater than 0).");
          check = false;
        } else {
          setNumberDevError(null);
        }

        // Kiểm tra lỗi cho Type of developer
        if (!selectedOptions2.value) {
          setTypeError("Please select the type of developer.");
          check = false;
        } else {
          setTypeError(null);
        }

        // Kiểm tra lỗi cho Level requirement
        if (!selectedOptions3.value) {
          setLevelError("Please select the level requirement.");
          check = false;
        } else {
          setLevelError(null);
        }

        if (!selectedOptions4.value) {
          setScheduleTypeError("Please select the schedule type requirement.");
          check = false;
        } else {
          setScheduleTypeError(null);
        } if (!selectedOptions5.value) {
          setEmploymentTypeError("Please select the employment type requirement.");
          check = false;
        } else {
          setEmploymentTypeError(null);
        }

        // Kiểm tra lỗi cho Skill requirement
        if (selectedOptions.length === 0) {
          setSkillError("Please select at least one skill.");
          check = false;
        } else {
          setSkillError(null);
        }

        // Kiểm tra lỗi cho Budget
        if (!document.getElementById("budget").value || parseInt(document.getElementById("budget").value, 10) <= 0) {
          setBudgetError("Please enter the budget(greater than 0).");
          check = false;
        } else {
          setBudgetError(null);
        }

        // Kiểm tra lỗi cho Duration
        if (!document.getElementById("duration").value) {
          check = false;
          setDurationError("Please enter the duration.");
        } else {
          const currentDate = new Date();
          const selectedDate = new Date(document.getElementById("duration").value);
          const sevenDaysLater = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000); // Thêm 7 ngày

          if (selectedDate < sevenDaysLater) {
            setDurationError("Please enter a date that is at least 7 days greater than the current date.");
            check = false;
          } else {
            setDurationError(null);
          }
        }
        // Kiểm tra lỗi cho Job Description

        if (value == "") {
          setDescriptionError("Please enter the job description.");
          check = false;
        } else {
          setDescriptionError(null);
        }
        // Nếu có, thực hiện logic để đăng job
        // Đây có thể là nơi gửi yêu cầu đăng job lên server
        console.log("Posting job...");
        if (check) {
          try {
            const jobTitle = document.getElementById("job-title").value; // replace with the actual job title from your input
            const jobDescription = value; // get job description from the textarea
            const numberOfDev = parseInt(document.getElementById("number-dev").value, 10); // parse as integer
            const salaryPerDev = parseFloat(document.getElementById("budget").value); // parse as float
            const duration = document.getElementById("duration").value; // get duration from the date input
            const typeRequireId = selectedOptions2.value; // replace with actual value from the type dropdown
            const levelRequireId = selectedOptions3.value; // replace with actual value from the level dropdown
            const scheduleTypeId = selectedOptions4.value;
            const employmentTypeId = selectedOptions5.value;
            const skillIds = selectedOptions.map((skill) => skill.value); // replace with actual values from the multi-select
            const isSaved = false;
            const requestId = localStorage.getItem('requestId');
            if (requestId) {
              const targetedDev = 0;
              const response = await hiringRequestService.updateHiringRequest(
                requestId, jobTitle, jobDescription, numberOfDev, salaryPerDev, targetedDev, duration, typeRequireId, levelRequireId, skillIds, isSaved, scheduleTypeId, employmentTypeId
              );
              console.log("Job saved posted successfully:", response);
            } else {
              const response = await hiringRequestService.createHiringRequest(
                jobTitle, jobDescription, numberOfDev, salaryPerDev, duration, typeRequireId, levelRequireId, skillIds, isSaved, companyId, scheduleTypeId, employmentTypeId
              );
              console.log("Job posted successfully:", response);
            }
            setLoading(false);
            setSuccessMessage("Đăng công việc thành công");
            setErrorMessage(null);
          } catch (error) {
            console.log(value);
            console.error("Error posting job:", error);
            setLoading(false);
            setSuccessMessage(null);
            setErrorMessage("Lỗi khi đăng công việc");

            // Handle error, show error message, etc.
          }
        } else {
          setLoading(false);
          setSuccessMessage(null);
          setErrorMessage("Lỗi khi đăng công việc");
        }
      }
    }
  };

  const handleSavePostJob = async () => {
    // Kiểm tra xem có userID trong localStorage không
    const userId = localStorage.getItem('userId');
    if (!userId) {
      openModal(); // Nếu không có, mở modal signup
    } else {
      const companyIdErr = localStorage.getItem('companyId');
      if (!companyIdErr) {
        openModal2();
      } else {

        console.log("Save job...");
        setLoading(true);
        try {
          const jobTitleInput = document.getElementById("job-title");
          const jobTitle = jobTitleInput.value.trim() !== "" ? jobTitleInput.value : null; // replace with the actual job title from your input
          const jobDescription = value.trim() !== "" ? value : null; // get job description from the textarea
          const numberDevInput = document.getElementById("number-dev");
          const numberOfDev = numberDevInput.value !== "" ? parseInt(numberDevInput.value, 10) : null;
          const budgetInput = document.getElementById("budget");
          const salaryPerDev = budgetInput.value !== "" ? parseFloat(budgetInput.value) : null;
          const durationInput = document.getElementById("duration");
          const duration = durationInput.value.trim() !== "" ? durationInput.value : null; // get duration from the date input
          const typeRequireId = selectedOptions2.value ? selectedOptions2.value : null; // replace with actual value from the type dropdown
          const levelRequireId = selectedOptions3.value ? selectedOptions3.value : null; // replace with actual value from the level dropdown
          const scheduleTypeId = selectedOptions4.value ? selectedOptions4.value : null;
          const employmentTypeId = selectedOptions5.value ? selectedOptions5.value : null;
          const skillIds = selectedOptions.map((skill) => skill.value); // replace with actual values from the multi-select
          const isSaved = true;
          const requestId = localStorage.getItem('requestId');
          console.log(requestId)
          if (requestId) {
            const targetedDev = 0;
            const response = await hiringRequestService.updateHiringRequest(
              requestId, jobTitle, jobDescription, numberOfDev, salaryPerDev, targetedDev, duration, typeRequireId, levelRequireId, skillIds, isSaved, scheduleTypeId, employmentTypeId
            );
            console.log("Save posted successfully:", response);
          } else {
            const response = await hiringRequestService.createHiringRequest(
              jobTitle, jobDescription, numberOfDev, salaryPerDev, duration, typeRequireId, levelRequireId, skillIds, isSaved, companyId, scheduleTypeId, employmentTypeId
            );
            console.log("Update posted successfully:", response);
          }
          setLoading(false);
          setSuccessMessage("Save công việc thành công");
          setErrorMessage(null);
        } catch (error) {
          console.error("Error posting job:", error);
          setLoading(false);
          setSuccessMessage(null);
          setErrorMessage("Lỗi khi đăng công việc");

          // Handle error, show error message, etc.
        }
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
                              className="Select Select--level-highest "
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
                              className="Select Select--level-high"
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
                              className="Select Select--level-high"
                            />
                          </div>
                          {skillError && <p className="text-danger mt-2">{skillError}</p>}
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group app-label mt-2">
                          <label class="text-muted">Schedule type requirement</label>
                          <div className="form-button">
                            <Select
                              options={options4}
                              value={selectedOptions4}
                              onChange={handleChange4}
                              className="Select Select--level"
                            />
                          </div>
                          {scheduleTypeError && <p className="text-danger mt-2">{scheduleTypeError}</p>}
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="form-group app-label mt-2">
                          <label class="text-muted">Employment type requirement</label>
                          <div className="form-button">
                            <Select
                              options={options5}
                              value={selectedOptions5}
                              onChange={handleChange5}
                              className="Select Select--level"
                            />
                          </div>
                          {employmentTypeError && <p className="text-danger mt-2">{employmentTypeError}</p>}
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
                          <Editor
                            class="fix-height"
                            id="description"
                            apiKey="axy85kauuja11vgbfrm96qlmduhgfg6egrjpbjil00dfqpwf"
                            onEditorChange={(newValue) => { setValue(newValue) }}
                            init={{
                              plugins: 'a11ychecker advcode advlist advtable anchor autolink autoresize autosave casechange charmap checklist code codesample directionality  emoticons export  formatpainter fullscreen importcss  insertdatetime link linkchecker lists media mediaembed mentions  nonbreaking pagebreak pageembed permanentpen powerpaste preview quickbars save searchreplace table  template tinydrive tinymcespellchecker  visualblocks visualchars wordcount',
                            }}
                          />
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
                      <div class="col-lg-12 mt-2">
                        <button type="button" className="btn btn-primary" onClick={handleSavePostJob} disabled={loading}>
                          {loading ? (
                            <RingLoader color="#fff" loading={true} size={20} />
                          ) : (
                            "Save"
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
                              <Form action="#" className="auth-form" >
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

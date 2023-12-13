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
import img0 from "../../../assets/images/user/img-00.jpg";
import Select from "react-select";
import developerServices from "../../../services/developer.services";
import employmentTypeServices from "../../../services/employmentType.services";
import skillService from "../../../services/skill.service";
import genderServices from "../../../services/gender.services";
import typeServices from "../../../services/type.service";
import levelServices from "../../../services/level.service";
//import { asString } from "html2canvas/dist/types/css/types/color";
import { toast } from "react-toastify";
import projectServices from "../../../services/project.services";

const UpdateDeveloperAccountPopup = (
  { isOpen, closeModal, developerId },
  ...props
) => {
  const [avatar2, setAvatar2] = useState();
  const [userImage3, setUserImage3] = useState(null);

  const [firstNameForUpdateAccount, setFirstNameForUpdateAccount] =
    useState(null);
  const [lastNameForUpdateAccount, setLastNameForUpdateAccount] =
    useState(null);
  const [emailForUpdateAccount, setEmailForUpdateAccount] = useState(null);
  const [phoneNumberForUpdateAccount, setPhoneNumberForUpdateAccount] =
    useState(null);
  const [passwordForUpdateAccount, setPasswordForUpdateAccount] =
    useState(null);
  const [dateOfBirthForUpdateAccount, setDateOfBirthForUpdateAccount] =
    useState(null);
  const [
    yearOfExperienceForUpdateAccount,
    setYearOfExperienceForUpdateAccount,
  ] = useState(null);
  const [averageSalaryForUpdateAccount, setAverageSalaryForUpdateAccount] =
    useState(null);
  const [codeNameForUpdateAccount, setCodeNameForUpdateAccount] =
    useState(null);
  const [summaryForUpdateAccount, setSummaryForUpdateAccount] = useState(null);

  const handleChangeFirstName = (event) => {
    const newValue = event.target.value;
    setFirstNameForUpdateAccount(newValue);
  };

  const handleChangeLastName = (event) => {
    const newValue = event.target.value;
    setLastNameForUpdateAccount(newValue);
  };

  const handleChangeEmail = (event) => {
    const newValue = event.target.value;
    setEmailForUpdateAccount(newValue);
  };

  const handleChangePhoneNumber = (event) => {
    const newValue = event.target.value;
    setPhoneNumberForUpdateAccount(newValue);
  };

  const handleChangePassword = (event) => {
    const newValue = event.target.value;
    setPasswordForUpdateAccount(newValue);
  };

  const handleChangeDateOfBirth = (event) => {
    const newValue = event.target.value;
    setDateOfBirthForUpdateAccount(newValue);
  };

  const handleChangeYearOfExperience = (event) => {
    const newValue = event.target.value;
    setYearOfExperienceForUpdateAccount(newValue);
  };

  const handleChangeAverageSalary = (event) => {
    const newValue = event.target.value;
    setAverageSalaryForUpdateAccount(newValue);
  };

  const handleChangeCodeName = (event) => {
    const newValue = event.target.value;
    setCodeNameForUpdateAccount(newValue);
  };

  const handleChangeSummary = (event) => {
    const newValue = event.target.value;
    setSummaryForUpdateAccount(newValue);
  };

  //---------------------------------------------------------------------------------------------------

  const [options, setOptions] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [options7, setOptions7] = useState([]);
  const [options3, setOptions3] = useState([]);
  const [options6, setOptions6] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptions2, setSelectedOptions2] = useState([]);
  const [selectedOptions7, setSelectedOptions7] = useState([]);
  const [selectedOptions3, setSelectedOptions3] = useState([]);
  const [selectedOptions6, setSelectedOptions6] = useState([]);

  const [firstNameError, setFirstNameError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [genderError, setGenderError] = useState(null);
  const [dateOfBirthError, setDateOfBirthError] = useState(null);
  const [phoneNumberError, setPhoneNumberError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [codeNameError, setCodeNameError] = useState(null);
  const [summaryError, setSummaryError] = useState(null);
  const [avarageSalaryError, setAvarageSalaryError] = useState(null);
  const [yearOfExperienceError, setYearOfExperienceError] = useState(null);

  const [typeError, setTypeError] = useState(null);
  const [levelError, setLevelError] = useState(null);
  const [skillError, setSkillError] = useState(null);
  const [employmentTypeError, setEmploymentTypeError] = useState(null);

  const [userImageState, setUserState] = useState(null);

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };
  const handleChange2 = (selected) => {
    setSelectedOptions2(selected);
  };
  const handleChange7 = (selected) => {
    setSelectedOptions7(selected);
    console.log(selected);
  };
  const handleChange3 = (selected) => {
    setSelectedOptions3(selected);
  };
  const handleChange6 = (selected) => {
    setSelectedOptions6(selected);
  };

  //------------------------------------------------------------------------------------------------
  const handleOKUpdate = async () => {
    let check = true;
    if (!document.getElementById("first-name").value) {
      setFirstNameError("Please enter a first-name.");
      check = false;
    } else {
      setFirstNameError(null);
    }

    if (!document.getElementById("last-name").value) {
      setLastNameError("Please enter a last-name.");
      check = false;
    } else {
      setLastNameError(null);
    }

    if (!document.getElementById("email").value) {
      setEmailError("Please enter an email");
      check = false;
    } else {
      setEmailError(null);
    }

    if (selectedOptions2.length === 0) {
      setTypeError("Please select at least one type");
      check = false;
    } else {
      setTypeError(null);
    }

    if (!selectedOptions3.value) {
      setLevelError("Please select the level ");
      check = false;
    } else {
      setLevelError(null);
    }

    if (!selectedOptions6.value) {
      setEmploymentTypeError("Please select the employment type ");
      check = false;
    } else {
      setEmploymentTypeError(null);
    }

    if (!selectedOptions7.value) {
      setGenderError("Please select the gender");
      check = false;
    } else {
      setGenderError(null);
    }

    // Kiểm tra lỗi cho Skill requirement
    if (selectedOptions.length === 0) {
      setSkillError("Please select at least one skill");
      check = false;
    } else {
      setSkillError(null);
    }

    if (
      !document.getElementById("avarage-salary").value ||
      parseInt(document.getElementById("avarage-salary").value, 10) <= 0
    ) {
      setAvarageSalaryError("Please enter the avarage salary(greater than 0)");
      check = false;
    } else {
      setAvarageSalaryError(null);
    }

    if (
      !document.getElementById("year-of-experience").value ||
      parseInt(document.getElementById("year-of-experience").value, 10) <= 0
    ) {
      setYearOfExperienceError(
        "Please enter the year of experience(greater than 0)"
      );
      check = false;
    } else {
      setYearOfExperienceError(null);
    }

    if (!document.getElementById("phone-number").value) {
      setPhoneNumberError("Please enter a phone number");
      check = false;
    } else {
      setPhoneNumberError(null);
    }

    // Kiểm tra lỗi cho Duration
    if (!document.getElementById("date-of-birth").value) {
      check = false;
      setDateOfBirthError("Please enter the date of birth");
    } else {
      setDateOfBirthError(null);
    }

    if (!document.getElementById("password").value) {
      check = false;
      setPasswordError("Please enter the password");
    } else {
      setPasswordError(null);
    }

    if (!document.getElementById("code-name").value) {
      check = false;
      setCodeNameError("Please enter the code name");
    } else {
      setCodeNameError(null);
    }

    if (!document.getElementById("summary").value) {
      check = false;
      setSummaryError("Please enter the summary");
    } else {
      setSummaryError(null);
    }

    const fileInput = document.getElementById("profile-img-file-input-2");
    const file = fileInput.files[0];

    console.log("file");
    console.log(file);

    let checkImageChange = false;
    if (file) {
      checkImageChange = true;
    } else {
      if (userImageState != userImageState) {
        checkImageChange = true;
      }
    }

    const FirstName = document.getElementById("first-name").value;
    const LastName = document.getElementById("last-name").value;
    const Email = document.getElementById("email").value;
    const PhoneNumber = document.getElementById("phone-number").value;
    const Password = document.getElementById("password").value;
    const DateOfBirth = document.getElementById("date-of-birth").value;
    const YearOfExperience =
      document.getElementById("year-of-experience").value;
    const AverageSalary = document.getElementById("avarage-salary").value;
    const CodeName = document.getElementById("code-name").value;
    const Summary = document.getElementById("summary").value;
    const GenderId = selectedOptions7.value;
    const LevelId = selectedOptions3.value;
    const EmploymentTypeId = selectedOptions6.value;
    const Types = selectedOptions2.map((type) => type.value);
    const Skills = selectedOptions.map((skill) => skill.value);

    if (check) {
      try {
        const formData = new FormData();
        formData.append("DeveloperId", developerId);
        formData.append("FirstName", FirstName);
        formData.append("LastName", LastName);
        formData.append("Email", Email);
        formData.append("PhoneNumber", PhoneNumber);
        formData.append("Password", Password);
        formData.append("DateOfBirth", DateOfBirth);
        formData.append("YearOfExperience", YearOfExperience);
        formData.append("AverageSalary", AverageSalary);
        formData.append("CodeName", CodeName);
        formData.append("Summary", Summary);
        formData.append("GenderId", GenderId);
        formData.append("LevelId", LevelId);
        formData.append("EmploymentTypeId", EmploymentTypeId);

        Types.forEach((type) => {
          formData.append(`Types[]`, type);
        });

        Skills.forEach((skill) => {
          formData.append(`Skills[]`, skill);
        });
        // formData.append("Types", typeTest);
        // formData.append("Skills", skillTest);
        formData.append("File", file || null);
        const response = await developerServices.updateDeveloperByAdmin(
          developerId,
          formData
        );
        console.log(response);
        toast.success("Update developer account successfully");
        closeModal();
      } catch (error) {
        console.error("Error fetching update developer account:", error);
        toast.error("Update developer account fail");
      }
    }
  };
  //------------------------------------------------------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response7 = await genderServices.getAllGender();
        const genderList = response7.data.data;
        const options7 = genderList.map((gender) => ({
          value: gender.genderId.toString(), // src là giá trị
          label: gender.genderName, // devFulName là nhãn
        }));
        // console.log(options7);
        setOptions7(options7);
      } catch (error) {
        console.error("Error fetching gender:", error);
      }

      try {
        const response = await skillService.getAllSkill();
        const activeSkills = response.data.data.filter(
          (skill) => skill.statusString === "Active"
        );
        const formattedSkills = activeSkills.map((skill) => ({
          value: skill.skillId.toString(),
          label: skill.skillName,
        }));
        console.log(formattedSkills);
        setOptions(formattedSkills);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }

      try {
        const response2 = await typeServices.getAllType();
        const activeTypes = response2.data.data.filter(
          (type) => type.statusString === "Active"
        );
        const formattedTypes = activeTypes.map((type) => ({
          value: type.typeId.toString(),
          label: type.typeName,
        }));
        // console.log(formattedTypes);
        setOptions2(formattedTypes);
      } catch (error) {
        console.error("Error fetching types:", error);
      }

      try {
        const response3 = await levelServices.getAllLevel();
        const activeLevels = response3.data.data.filter(
          (level) => level.statusString === "Active"
        );

        const formattedLevels = activeLevels.map((level) => ({
          value: level.levelId.toString(),
          label: level.levelName,
        }));
        // console.log(formattedLevels);
        setOptions3(formattedLevels);
      } catch (error) {
        console.error("Error fetching levels:", error);
      }

      try {
        const response6 = await employmentTypeServices.getAllEmploymentType();
        const activeEmploymentType = response6.data.data.filter(
          (employmentType) => employmentType.statusString === "Active"
        );
        const formattedEmploymentType = activeEmploymentType.map(
          (employmentType) => ({
            value: employmentType.employmentTypeId.toString(),
            label: employmentType.employmentTypeName,
          })
        );
        // console.log(formattedEmploymentType);
        setOptions6(formattedEmploymentType);
      } catch (error) {
        console.error("Error fetching employment typeName:", error);
      }
    };

    fetchData();
  }, []);

  //------------------------------------------------------------------------------------------------
  useEffect(() => {
    const fetchDeveloperDetail = async () => {
      if (developerId) {
        try {
          const response = await developerServices.getDeveloperByDevId(
            developerId
          );
          console.log(response.data.data);

          setFirstNameForUpdateAccount(response.data.data.firstName);
          setLastNameForUpdateAccount(response.data.data.lastName);
          setEmailForUpdateAccount(response.data.data.email);
          let formattedDate;
          if (response.data.data.dateOfBirth) {
            const dateOfBirthtemp = response.data.data.dateOfBirth;
            const parsedDate = new Date(dateOfBirthtemp);
            parsedDate.setDate(parsedDate.getDate() + 1);
            formattedDate = parsedDate.toISOString().split("T")[0];
            setDateOfBirthForUpdateAccount(formattedDate);
            console.log(formattedDate);
          }
          setPhoneNumberForUpdateAccount(response.data.data.phoneNumber);
          setPasswordForUpdateAccount(response.data.data.password);
          setCodeNameForUpdateAccount(response.data.data.codeName);
          setAverageSalaryForUpdateAccount(response.data.data.averageSalary);
          setYearOfExperienceForUpdateAccount(
            response.data.data.yearOfExperience
          );
          setSummaryForUpdateAccount(response.data.data.summary);
          const requireGender = response.data.data.genderName;
          const foundGender = options7.find(
            (gender) => gender.label == requireGender
          );
          if (foundGender) {
            const newGender = {
              value: foundGender.value,
              label: foundGender.label,
            };
            setSelectedOptions7(newGender);
            console.log(newGender);
          }

          //---------------------------------------------------------------------
          const requireLevel = response.data.data.level;
          const foundLevel = options3.find(
            (level) => level.label == requireLevel.levelName
          );
          if (foundLevel) {
            const newLevel = {
              value: foundLevel.value,
              label: foundLevel.label,
            };
            setSelectedOptions3(newLevel);
          }

          //-----------------------------------------------------------------------
          const requireEmploymentType = response.data.data.employmentTypeName;
          const foundEmploymentType = options6.find(
            (employmentType) => employmentType.label == requireEmploymentType
          );

          if (foundEmploymentType) {
            const newemploymentType = {
              value: foundEmploymentType.value,
              label: foundEmploymentType.label,
            };
            setSelectedOptions6(newemploymentType);
          }
          //-----------------------------------------------------------------------
          const requireTypes = response.data.data.types;
          const foundTypes = options2.filter((types) =>
            requireTypes.some(
              (typeRequire) => types.label == typeRequire.typeName
            )
          );

          console.log(foundTypes);
          setSelectedOptions2(
            foundTypes.map((foundType) => ({
              value: foundType.value,
              label: foundType.label,
            }))
          );

          //-----------------------------------------------------------------------
          const requireSkills = response.data.data.skills;
          const foundSkills = options.filter((skills) =>
            requireSkills.some(
              (skillRequire) => skills.label == skillRequire.skillName
            )
          );
          console.log(foundSkills);
          setSelectedOptions(
            foundSkills.map((foundSkill) => ({
              value: foundSkill.value,
              label: foundSkill.label,
            }))
          );
          //-----------------------------------------------------------------------
          if (response.data.data.userImage) {
            setUserImage3(response.data.data.userImage);
          } else {
            setUserImage3(img0);
          }
          //-----------------------------------------------------------------------
        } catch (error) {
          console.error("Error fetching developer detail:", error);
        }
      }
    };
    fetchDeveloperDetail();
  }, [isOpen]);

  //-------------------------------------------------------------------------------------------------
  useEffect(() => {
    return () => avatar2 && URL.revokeObjectURL(avatar2.preview);
  }, [avatar2]);

  const handleChooseAvatar2 = () => {
    const inputElement = document.getElementById("profile-img-file-input-2");
    inputElement.click();
  };

  const handlePreviewAvatar2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      setAvatar2(file);
    } else {
      setAvatar2(null);
    }
  };
  //-------------------------------------------------------------------------------------------------

  return (
    <React.Fragment>
      <div>
        <Modal isOpen={isOpen} toggle={closeModal} size={"lg"}>
          <div className="mt-2 d-flex justify-content-end ">
            <Button
              close
              className="close-button"
              onClick={closeModal}
              style={{ marginRight: "10px" }}
            ></Button>
          </div>
          <ModalBody>
            <div className="rounded">
              <div className="row justify-content-center">
                <div className="rounded  bg-white">
                  <div className="custom-form">
                    <div id="message3"></div>
                    <form
                      method="post"
                      action="php/contact.php"
                      name="contact-form"
                      id="contact-form3"
                    >
                      <h4 class="text-dark mb-1">Update account developer</h4>
                      <div className="d-flex justify-content-center">
                        <div className="profile-user">
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
                              accept=".jpg, .jpeg, .png"
                              style={{ display: "none" }}
                            />
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group app-label mt-2">
                            <label class="text-muted">First name:</label>
                            <input
                              id="first-name"
                              type="text"
                              class="form-control resume"
                              required
                              value={firstNameForUpdateAccount}
                              onChange={handleChangeFirstName}
                            ></input>
                            {firstNameError && (
                              <p className="text-danger mt-2">
                                {firstNameError}
                              </p>
                            )}
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group app-label mt-2">
                            <label class="text-muted">Last name:</label>
                            <input
                              id="last-name"
                              type="text"
                              class="form-control resume"
                              required
                              value={lastNameForUpdateAccount}
                              onChange={handleChangeLastName}
                            ></input>
                            {lastNameError && (
                              <p className="text-danger mt-2">
                                {lastNameError}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group app-label mt-2">
                            <label class="text-muted">Email</label>
                            <input
                              id="email"
                              type="email"
                              class="form-control resume"
                              placeholder="abc@gmail.com"
                              required
                              value={emailForUpdateAccount}
                              onChange={handleChangeEmail}
                            ></input>
                            {emailError && (
                              <p className="text-danger mt-2">{emailError}</p>
                            )}
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div className="form-group app-label mt-2">
                            <label className="text-muted">Gender</label>
                            <div className="form-button">
                              <Select
                                options={options7}
                                value={selectedOptions7}
                                onChange={handleChange7}
                                style={{ width: "100%" }}
                              />
                            </div>
                            {genderError && (
                              <p className="text-danger mt-2">{genderError}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group app-label mt-2">
                            <label class="text-muted">Date of birth</label>
                            <input
                              id="date-of-birth"
                              type="date"
                              class="custom-date resume"
                              value={dateOfBirthForUpdateAccount}
                              onChange={handleChangeDateOfBirth}
                            ></input>
                            {dateOfBirthError && (
                              <p className="text-danger mt-2">
                                {dateOfBirthError}
                              </p>
                            )}
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group app-label mt-2">
                            <label class="text-muted">Phone Number</label>
                            <input
                              id="phone-number"
                              type="number"
                              class="form-control resume"
                              placeholder="+8426265656"
                              value={phoneNumberForUpdateAccount}
                              onChange={handleChangePhoneNumber}
                            ></input>
                            {phoneNumberError && (
                              <p className="text-danger mt-2">
                                {phoneNumberError}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group app-label mt-2">
                            <label class="text-muted">Password</label>
                            <input
                              id="password"
                              type="text"
                              class="form-control resume"
                              value={passwordForUpdateAccount}
                              onChange={handleChangePassword}
                            ></input>
                            {passwordError && (
                              <p className="text-danger mt-2">
                                {passwordError}
                              </p>
                            )}
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group app-label mt-2">
                            <label class="text-muted">Code Name</label>
                            <input
                              id="code-name"
                              type="text"
                              class="form-control resume"
                              placeholder="PRN211"
                              value={codeNameForUpdateAccount}
                              onChange={handleChangeCodeName}
                            ></input>
                            {codeNameError && (
                              <p className="text-danger mt-2">
                                {codeNameError}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group app-label mt-2">
                            <label class="text-muted">Avarage Salary</label>
                            <input
                              id="avarage-salary"
                              type="number"
                              class="form-control resume"
                              value={averageSalaryForUpdateAccount}
                              onChange={handleChangeAverageSalary}
                            ></input>
                            {avarageSalaryError && (
                              <p className="text-danger mt-2">
                                {avarageSalaryError}
                              </p>
                            )}
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group app-label mt-2">
                            <label class="text-muted">Year of Experience</label>
                            <input
                              id="year-of-experience"
                              type="number"
                              class="form-control resume"
                              value={yearOfExperienceForUpdateAccount}
                              onChange={handleChangeYearOfExperience}
                            ></input>
                            {yearOfExperienceError && (
                              <p className="text-danger mt-2">
                                {yearOfExperienceError}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group app-label mt-2">
                            <label className="text-muted">
                              Type requirement
                            </label>
                            <div className="form-button">
                              <Select
                                isMulti
                                options={options2}
                                value={selectedOptions2}
                                onChange={handleChange2}
                                style={{ width: "100%" }}
                              />
                            </div>
                            {typeError && (
                              <p className="text-danger mt-2">{typeError}</p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div class="form-group app-label mt-2">
                            <label class="text-muted">Level requirement</label>
                            <div class="form-button">
                              <div className="form-button">
                                <Select
                                  options={options3}
                                  value={selectedOptions3}
                                  onChange={handleChange3}
                                  style={{ width: "100%" }}
                                />
                              </div>
                              {levelError && (
                                <p className="text-danger mt-2">{levelError}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group app-label mt-2">
                            <label className="text-muted">
                              Skill requirement
                            </label>
                            <div className="form-button">
                              <Select
                                isMulti
                                options={options}
                                value={selectedOptions}
                                onChange={handleChange}
                                style={{ width: "100%" }}
                              />
                            </div>
                            {skillError && (
                              <p className="text-danger mt-2">{skillError}</p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div class="form-group app-label mt-2">
                            <label class="text-muted">Employment Type</label>
                            <div class="form-button">
                              <div className="form-button">
                                <Select
                                  options={options6}
                                  value={selectedOptions6}
                                  onChange={handleChange6}
                                  style={{ width: "100%" }}
                                />
                              </div>
                            </div>
                            {employmentTypeError && (
                              <p className="text-danger mt-2">
                                {employmentTypeError}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div class="col-md-6">
                          <div class="form-group app-label mt-2">
                            <label class="text-muted">Summary</label>
                            <input
                              id="summary"
                              type="text"
                              class="form-control resume"
                              value={summaryForUpdateAccount}
                              onChange={handleChangeSummary}
                            ></input>
                            {summaryError && (
                              <p className="text-danger mt-2">{summaryError}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-12 mt-2 d-flex justify-content-end">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleOKUpdate}
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default UpdateDeveloperAccountPopup;

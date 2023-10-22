import React, { useState, useEffect } from "react";
import Section from "../CreateDeveloperAccount/Section";
import Select from "react-select";
import axios from "axios";
import scheduleTypeService from "../../../services/scheduleType";
import employmentTypeServices from "../../../services/employmentType.services";
import developerServices from "../../../services/developer.services";

const CreateDeveloperAccount = () => {
    document.title = "Create Developer Account";

    // Khai báo danh sách tùy chọn



    // const imageUrl = "https://firebasestorage.googleapis.com/v0/b/capstone-project-wehire.appspot.com/o/cv%2Ffront-end-engineer-.png?alt=media&token=ce6da673-0bcd-415b-84cf-edb5fb4c7fc2";


    const [options, setOptions] = useState([]);
    const [options2, setOptions2] = useState([]);
    const [options7, setOptions7] = useState([]);
    const [options3, setOptions3] = useState([]);
    const [options4, setOptions4] = useState([]);
    const [options5, setOptions5] = useState([]);
    const [options6, setOptions6] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedOptions2, setSelectedOptions2] = useState([]);
    const [selectedOptions7, setSelectedOptions7] = useState([]);
    const [selectedOptions3, setSelectedOptions3] = useState([]);
    const [selectedOptions4, setSelectedOptions4] = useState([]);
    const [selectedOptions5, setSelectedOptions5] = useState([]);
    const [selectedOptions6, setSelectedOptions6] = useState([]);
    const [imageUrl, setImageUrl] = useState("");


    const handleChange = (selected) => {
        setSelectedOptions(selected);
    };
    const handleChange2 = (selected) => {
        setSelectedOptions2(selected);
    };
    const handleChange7 = (selected) => {
        setSelectedOptions7(selected);
    };
    const handleChange3 = (selected) => {
        setSelectedOptions3(selected);
    };
    const handleChange5 = (selected) => {
        setSelectedOptions5(selected);
    };
    const handleChange6 = (selected) => {
        setSelectedOptions6(selected);
    };

    const handleChange4 = (selected) => {
        setSelectedOptions4(selected);
        setImageUrl(selected.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response4 = await axios.get("https://wehireapi.azurewebsites.net/api/Cv");
                const cvList = response4.data.data;
                const options4 = cvList.map(cv => ({
                    value: cv.src, // src là giá trị
                    label: cv.cvCode, // devFulName là nhãn
                    id: cv.cvId
                }));
                console.log(options4)
                setOptions4(options4);
                if (options4.length > 0) {
                    setSelectedOptions4(options4[0]);
                    setImageUrl(options4[0].value);
                }
            } catch (error) {
                console.error("Error fetching levels:", error);
            }

            try {
                const response7 = await axios.get("https://wehireapi.azurewebsites.net/api/Gender");
                const genderList = response7.data.data;
                const options7 = genderList.map(gender => ({
                    value: gender.genderId, // src là giá trị
                    label: gender.genderName, // devFulName là nhãn
                }));
                console.log(options7);
                setOptions7(options7);
            } catch (error) {
                console.error("Error fetching gender:", error);
            }

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
                console.log(formattedTypes)
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
                const response5 = await scheduleTypeService.getAllScheduleType();
                const activeScheduleType = response5.data.data.filter(scheduleType => scheduleType.statusString === "Active");
                const formattedScheduleType = activeScheduleType.map(scheduleType => ({
                    value: scheduleType.scheduleTypeId.toString(),
                    label: scheduleType.scheduleTypeName
                }));
                setOptions5(formattedScheduleType);
            } catch (error) {
                console.error("Error fetching schedule type:", error);
            }

            try {
                const response6 = await employmentTypeServices.getAllEmploymentType();
                const activeEmploymentType = response6.data.data.filter(employmentType => employmentType.statusString === "Active");
                const formattedEmploymentType = activeEmploymentType.map(employmentType => ({
                    value: employmentType.employmentTypeId.toString(),
                    label: employmentType.employmentTypeName
                }));
                setOptions6(formattedEmploymentType);
            } catch (error) {
                console.error("Error fetching employment typeName:", error);
            }


        };
        fetchData();

    }, []);

    const [firstNameError, setFirstNameError] = useState([]);
    const [lastNameError, setLastNameError] = useState([]);
    const [emailError, setEmailError] = useState([]);
    const [typeError, setTypeError] = useState([]);
    const [levelError, setLevelError] = useState([]);
    const [scheduleTypeError, setScheduleTypeError] = useState([]);
    const [employmentTypeError, setEmploymentTypeError] = useState([]);
    const [genderError, setGenderError] = useState([]);
    const [skillError, setSkillError] = useState([]);
    const [avarageSalaryError, setAvarageSalaryError] = useState([]);
    const [yearOfExperienceError, setYearOfExperienceError] = useState([]);
    const [phoneNumberError, setPhoneNumberError] = useState([]);
    const [dateOfBirthError, setDateOfBirthError] = useState([]);


    const handleCreateDev = async () => {
        // Kiểm tra xem có userID trong localStorage không    
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

        // Kiểm tra lỗi cho Level requirement
        if (!selectedOptions3.value) {
            setLevelError("Please select the level ");
            check = false;
        } else {
            setLevelError(null);
        }

        if (!selectedOptions6.value) {
            setScheduleTypeError("Please select the schedule type ");
            check = false;
        } else {
            setScheduleTypeError(null);
        }

        if (!selectedOptions5.value) {
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

        if (!document.getElementById("avarage-salary").value || parseInt(document.getElementById("avarage-salary").value, 10) <= 0) {
            setAvarageSalaryError("Please enter the avarage salary(greater than 0)");
            check = false;
        } else {
            setAvarageSalaryError(null);
        }

        if (!document.getElementById("year-of-experience").value || parseInt(document.getElementById("year-of-experience").value, 10) <= 0) {
            setYearOfExperienceError("Please enter the year of experience(greater than 0)");
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
            //     const currentDate = new Date();
            //     const selectedDate = new Date(document.getElementById("duration").value);
            //     const sevenDaysLater = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000); // Thêm 7 ngày

            //     if (selectedDate < sevenDaysLater) {
            //         setDurationError("Please enter a date that is at least 7 days greater than the current date.");
            //         check = false;
            //     } else {
            setDateOfBirthError(null);
            // }
        }
        if (check) {
            try {
                const firstName = document.getElementById("first-name").value;
                const lastName = document.getElementById("last-name").value;
                const email = document.getElementById("email").value;
                const avarageSalary = document.getElementById("avarage-salary").value;
                const yearOfExperience = document.getElementById("year-of-experience").value;
                const phoneNumber = document.getElementById("phone-number").value;
                const dateOfBirth = document.getElementById("date-of-birth").value; // replace with actual value from the type dropdown
                const levelRequireId = selectedOptions3.value; // replace with actual value from the level dropdown
                const scheduleTypeId = selectedOptions6.value;
                const employmentTypeId = selectedOptions5.value;
                const genderId = selectedOptions7.value;
                const cvId = selectedOptions4.id;
                const skillIds = selectedOptions.map((skill) => skill.value);
                const typeRequireId = selectedOptions2.map((type) => type.value);
                const response = await developerServices.CreateDeveloperAccount(
                    firstName, lastName, email, phoneNumber, genderId, dateOfBirth, yearOfExperience, avarageSalary, cvId, scheduleTypeId, employmentTypeId, levelRequireId, typeRequireId, skillIds
                );
                console.log(response)
            } catch (error) {
                console.error("Error create dev:", error);

            }
        }
    };
    return (
        <React.Fragment>
            <Section />
            <section className="section" style={{ paddingTop: "0px" }}>
                <div className=" ">
                    <div className="row justify-content-center  w-100 ">
                        <div className="col-lg-6 ps-5" > {/* Thay đổi kích thước cột cho form */}
                            <div className="rounded shadow bg-white p-4">
                                <div className="custom-form">
                                    <div id="message3"></div>
                                    <form
                                        method="post"
                                        action="php/contact.php"
                                        name="contact-form"
                                        id="contact-form3"
                                    >
                                        <h4 class="text-dark mb-3">Create new account developer</h4>
                                        <div class="row">
                                            <div className="form-group app-label mt-2">
                                                <label className="text-muted">Choose CV:</label>
                                                <div className="form-button">
                                                    <Select
                                                        options={options4}
                                                        value={selectedOptions4}
                                                        onChange={handleChange4}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">First name:</label>
                                                    <input id="first-name" type="text" class="form-control resume" placeholder=""></input>
                                                    {firstNameError && <p className="text-danger mt-2">{firstNameError}</p>}
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Last name:</label>
                                                    <input id="last-name" type="text" class="form-control resume" placeholder=""></input>
                                                    {lastNameError && <p className="text-danger mt-2">{lastNameError}</p>}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Email</label>
                                                    <input id="email" type="email" class="form-control resume" placeholder="abc@gmail.com"></input>
                                                    {emailError && <p className="text-danger mt-2">{emailError}</p>}
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
                                                        />
                                                    </div>
                                                    {genderError && <p className="text-danger mt-2">{genderError}</p>}

                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Date of birth</label>
                                                    <input id="date-of-birth" type="date" class="custom-date resume"></input>
                                                    {dateOfBirthError && <p className="text-danger mt-2">{dateOfBirthError}</p>}

                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Phone Number</label>
                                                    <input id="phone-number" type="number" class="form-control resume" placeholder="+8426265656"></input>
                                                    {phoneNumberError && <p className="text-danger mt-2">{phoneNumberError}</p>}

                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Avarage Salary</label>
                                                    <input id="avarage-salary" type="number" class="form-control resume"></input>
                                                    {avarageSalaryError && <p className="text-danger mt-2">{avarageSalaryError}</p>}

                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Year of Experience</label>
                                                    <input id="year-of-experience" type="number" class="form-control resume" placeholder="2"></input>
                                                    {yearOfExperienceError && <p className="text-danger mt-2">{yearOfExperienceError}</p>}

                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">

                                                <div className="form-group app-label mt-2">
                                                    <label className="text-muted">Schedule Type</label>
                                                    <div className="form-button">
                                                        <Select
                                                            options={options5}
                                                            value={selectedOptions5}
                                                            onChange={handleChange5}
                                                        />
                                                    </div>
                                                    {scheduleTypeError && <p className="text-danger mt-2">{scheduleTypeError}</p>}

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
                                                            />
                                                        </div>
                                                        {levelError && <p className="text-danger mt-2">{levelError}</p>}

                                                    </div>
                                                </div>
                                            </div>
                                        </div><div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group app-label mt-2">

                                                    <label className="text-muted">Skill requirement</label>
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
                                            <div className="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Employment Type</label>
                                                    <div class="form-button">
                                                        <div className="form-button">
                                                            <Select
                                                                options={options6}
                                                                value={selectedOptions6}
                                                                onChange={handleChange6}
                                                            />
                                                        </div>
                                                    </div>
                                                    {employmentTypeError && <p className="text-danger mt-2">{employmentTypeError}</p>}

                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div className="form-group app-label mt-2">
                                                <label className="text-muted">Type requirement</label>
                                                <div className="form-button">
                                                    <Select
                                                        isMulti
                                                        options={options2}
                                                        value={selectedOptions2}
                                                        onChange={handleChange2}
                                                    />
                                                </div>
                                                {typeError && <p className="text-danger mt-2">{typeError}</p>}

                                            </div>


                                        </div>
                                        <div class="col-lg-12 mt-2 d-flex justify-content-end">
                                            <button type="button" className="btn btn-primary btn-hover" onClick={handleCreateDev} >
                                                Create
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="form-group app-label mt-2 col-lg-6">
                            <div className="form-button">
                                <img className="img-fluid" src={imageUrl} alt="Avatar" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default CreateDeveloperAccount;
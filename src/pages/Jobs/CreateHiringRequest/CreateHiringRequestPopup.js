import React, { useState, useEffect, useRef } from "react";
import { Input, Modal, ModalBody, Form, FormGroup, Button, Label } from "reactstrap"; // Assuming you are using reactstrap for modal components
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Section from "../CreateHiringRequest/Section";
import Select from "react-select";
import axios from "axios";
import { RingLoader, HashLoader } from "react-spinners";
import skillService from "../../../services/skill.service";
import typeService from "../../../services/type.service";
import levelService from "../../../services/level.service";
import hiringRequestService from "../../../services/hiringrequest.service";
import employmentTypeServices from "../../../services/employmentType.services";
import { Editor } from "@tinymce/tinymce-react";
import companyServices from "../../../services/company.services";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userSerrvices from "../../../services/user.serrvices";

const CreateHiringRequestPopup = (
    { isModalOpen, closeModal, requestId, maxDate },
    ...props
) => {

    let hiringRequestSaved;
    const location = useLocation();
    const [options, setOptions] = useState([]);
    const [options2, setOptions2] = useState([]);
    const [options3, setOptions3] = useState([]);
    const [options4, setOptions4] = useState([]);
    const [options5, setOptions5] = useState([]);
    const [options6, setOptions6] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedOptions2, setSelectedOptions2] = useState([]);
    const [selectedOptions3, setSelectedOptions3] = useState([]);
    const [selectedOptions4, setSelectedOptions4] = useState([]);
    const [selectedOptions5, setSelectedOptions5] = useState([]);
    const [selectedOptions6, setSelectedOptions6] = useState([]);
    const [companyId, setCompanyId] = useState(null);
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [jobTitleError, setJobTitleError] = useState(null);
    const [numberDevError, setNumberDevError] = useState(null);
    const [typeError, setTypeError] = useState(null);
    const [levelError, setLevelError] = useState(null);
    const [skillError, setSkillError] = useState(null);
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
    const [userImage3, setUserImage3] = useState(null);
    const [companyNameFormCreateCompany, setCompanyNameFormCreateCompany] = useState(null);
    const [emailFormCreateCompany, setEmailFormCreateCompany] = useState(null);
    const [companyPhoneNumberFormCreateCompany, setCompanyPhoneNumberFormCreateCompany] = useState(null);
    const [addressFormCreateCompany, setAddressFormCreateCompany] = useState(null);
    const [minDateDuration, setMinDateDuration] = useState('');
    const [maxDateDuration, setMaxDateDuration] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const today = new Date();
    const descriptionRef = useRef(null);


    today.setDate(today.getDate() + 4);
    useState(() => {
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        setMinDateDuration(formattedDate)
        const today2 = new Date();
        const year2 = today2.getFullYear();
        const month2 = String(today2.getMonth() + 1).padStart(2, '0');
        const day2 = String(today2.getDate()).padStart(2, '0');
        const formattedDate2 = `${year2}-${month2}-${day2}`;

        setSelectedDate(formattedDate2)


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
    const handleChange6 = (selected) => {
        setSelectedOptions6(selected);
    };
    const navigate = useNavigate();

    const fetchData = async () => {
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
            if (requestId) {
                const response =
                    await hiringRequestService.getHiringRequestDetailInCompany(
                        requestId
                    );
                console.log(response)
                hiringRequestSaved = response.data.data;
                document.getElementById("job-title").value =
                    hiringRequestSaved.jobTitle;
                document.getElementById("number-dev").value =
                    hiringRequestSaved.numberOfDev;
                document.getElementById("budget").value =
                    hiringRequestSaved.salaryPerDev;
                console.log(hiringRequestSaved.salaryPerDev)
                localStorage.setItem("requestId", hiringRequestSaved.requestId);
                var parts = hiringRequestSaved.duration.split('-');
                if (parts.length === 3) {
                    var day = parts[1];
                    var month = parts[0];
                    var year = parts[2];
                    // Format the date as "yyyy-dd-mm"
                    var formattedDuration = year + '-' + day + '-' + month;
                } else {
                    console.error("Invalid date format");
                }
                const editor = window.tinymce.get("description"); // Giả sử 'description' là id của Editor
                if (editor) {
                    editor.setContent(hiringRequestSaved.jobDescription);
                }
                // Đặt giá trị cho input duration
                document.getElementById("duration").value = formattedDuration;
            } else {
                setJobTitleError(null);
                setNumberDevError(null);
                setTypeError(null);
                setLevelError(null);
                setEmploymentTypeError(null);
                setSkillError(null);
                setBudgetError(null);
                setDurationError(null);
                setDescriptionError(null);
                setSelectedOptions([]);
                setSelectedOptions2([]);
                setSelectedOptions3([]);
                setSelectedOptions4([]);
                setSelectedOptions5([]);
                setSelectedOptions6([]);
            }


        } catch (error) {
            console.error("Error:", error);
        }
        try {
            const response = await skillService.getAllSkill();
            const activeSkills = response.data.data.filter(
                (skill) => skill.statusString === "Active"
            );

            if (hiringRequestSaved) {
                const requiredSkillNames = hiringRequestSaved.skillRequireStrings;

                const foundSkills = activeSkills.filter((skill) =>
                    requiredSkillNames.includes(skill.skillName)
                );

                // Assuming setSelectedOptions is designed to handle an array
                setSelectedOptions(
                    foundSkills.map((foundSkill) => ({
                        value: foundSkill.skillId.toString(),
                        label: foundSkill.skillName,
                    }))
                );
            }

            const formattedSkills = activeSkills.map((skill) => ({
                value: skill.skillId.toString(),
                label: skill.skillName,
            }));
            setOptions(formattedSkills);
        } catch (error) {
            console.error("Error fetching skills:", error);
        }

        try {
            const response2 = await typeService.getAllType();
            const activeTypes = response2.data.data.filter(
                (type) => type.statusString === "Active"
            );
            if (hiringRequestSaved) {
                const requiredTypeName = hiringRequestSaved.typeRequireName;
                const foundType = activeTypes.find(
                    (type) => type.typeName === requiredTypeName
                );
                if (foundType) {
                    const newType = {
                        value: foundType.typeId.toString(),
                        label: foundType.typeName,
                    };
                    setSelectedOptions2(newType);
                }
            }
            let formattedTypes = activeTypes.map((type) => ({
                value: type.typeId.toString(),
                label: type.typeName,
            }));
            setOptions2(formattedTypes);
        } catch (error) {
            console.error("Error fetching types:", error);
        }

        try {
            const response3 = await levelService.getAllLevel();
            const activeLevels = response3.data.data.filter(
                (level) => level.statusString === "Active"
            );
            if (hiringRequestSaved) {
                const requiredLevelName = hiringRequestSaved.levelRequireName;
                const foundLevel = activeLevels.find(
                    (level) => level.levelName === requiredLevelName
                );
                if (foundLevel) {
                    const newLevel = {
                        value: foundLevel.levelId.toString(),
                        label: foundLevel.levelName,
                    };
                    setSelectedOptions3(newLevel);
                }
            }
            const formattedLevels = activeLevels.map((level) => ({
                value: level.levelId.toString(),
                label: level.levelName,
            }));
            setOptions3(formattedLevels);
        } catch (error) {
            console.error("Error fetching levels:", error);
        }
        try {
            const response5 = await employmentTypeServices.getAllEmploymentType();
            const activeEmploymentType = response5.data.data.filter(
                (employmentType) => employmentType.statusString === "Active"
            );
            if (hiringRequestSaved) {
                const requirEdemploymentType = hiringRequestSaved.employmentTypeName;
                const foundEmploymentType = activeEmploymentType.find(
                    (employmentType) =>
                        employmentType.employmentTypeName === requirEdemploymentType
                );
                if (foundEmploymentType) {
                    const newEmploymentType = {
                        value: foundEmploymentType.employmentTypeId.toString(),
                        label: foundEmploymentType.employmentTypeName,
                    };
                    setSelectedOptions5(newEmploymentType);
                }
            }
            const formattedEmploymentType = activeEmploymentType.map(
                (employmentType) => ({
                    value: employmentType.employmentTypeId.toString(),
                    label: employmentType.employmentTypeName,
                })
            );
            setOptions5(formattedEmploymentType);
        } catch (error) {
            console.error("Error fetching employment typeName:", error);
        }

    };

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
                if (!document.getElementById("job-title").value) {
                    setJobTitleError("Please enter a job title.");
                    check = false;
                } else {
                    setJobTitleError(null);
                }
                if (
                    !document.getElementById("number-dev").value ||
                    parseInt(document.getElementById("number-dev").value, 10) <= 0
                ) {
                    setNumberDevError(
                        "Please enter a valid number of developers (greater than 0)."
                    );
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


                if (!selectedOptions5.value) {
                    setEmploymentTypeError(
                        "Please select the employment type requirement."
                    );
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
                if (
                    !document.getElementById("budget").value ||
                    parseInt(document.getElementById("budget").value, 10) <= 0
                ) {
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
                    setDurationError(null);
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
                        const numberOfDev = parseInt(
                            document.getElementById("number-dev").value,
                            10
                        ); // parse as integer
                        const salaryPerDev = parseFloat(
                            document.getElementById("budget").value
                        ); // parse as float
                        const duration = document.getElementById("duration").value; // get duration from the date input
                        const typeRequireId = selectedOptions2.value; // replace with actual value from the type dropdown
                        const levelRequireId = selectedOptions3.value; // replace with actual value from the level dropdown
                        const employmentTypeId = selectedOptions5.value;
                        const skillIds = selectedOptions.map((skill) => skill.value); // replace with actual values from the multi-select
                        const isSaved = false;
                        const queryParams = new URLSearchParams(location.search);
                        const projectId = queryParams.get("Id");
                        if (requestId) {
                            const response = await hiringRequestService.updateHiringRequest(
                                requestId,
                                jobTitle,
                                jobDescription,
                                numberOfDev,
                                salaryPerDev,
                                duration,
                                typeRequireId,
                                levelRequireId,
                                skillIds,
                                isSaved,
                                levelRequireId,
                            );
                            console.log(response);
                        } else {
                            const response = await hiringRequestService.createHiringRequest(
                                companyIdErr,
                                projectId,
                                jobTitle,
                                jobDescription,
                                numberOfDev,
                                salaryPerDev,
                                duration,
                                typeRequireId,
                                levelRequireId,
                                skillIds,
                                isSaved,
                                employmentTypeId
                            );
                        }
                        setLoading(false);
                        localStorage.removeItem("requestId");
                        setErrorMessage(null);
                        toast.success('Create hiring request successfully!');
                        closeModal();
                    } catch (error) {
                        console.log(value);
                        setLoading(false);
                        setSuccessMessage(null);
                        toast.error('Create hiring request fail!');

                        // Handle error, show error message, etc.
                    }
                } else {
                    setLoading(false);
                    setSuccessMessage(null);
                }
            }
        }
    };

    const handleSavePostJob = async () => {
        // Kiểm tra xem có userID trong localStorage không
        const userId = localStorage.getItem("userId");
        const companyIdErr = localStorage.getItem("companyId");
        const checkVali = true;
        if (!userId) {
            openModal(); // Nếu không có, mở modal signup
        } else {
            const companyIdErr = localStorage.getItem("companyId");
            if (companyIdErr == "null") {
                openModal2();
            } else {
                if (!document.getElementById("job-title").value) {
                    setJobTitleError("Please enter a job title.");
                    setNumberDevError(null);
                    setTypeError(null);
                    setLevelError(null);
                    setEmploymentTypeError(null);
                    setSkillError(null);
                    setBudgetError(null);
                    setDurationError(null);
                    setDescriptionError(null);
                    checkVali = false;
                }
                setLoading(true);
                try {
                    const jobTitleInput = document.getElementById("job-title");
                    const jobTitle =
                        jobTitleInput.value.trim() !== "" ? jobTitleInput.value : null; // replace with the actual job title from your input
                    const jobDescription = value.trim() !== "" ? value : null; // get job description from the textarea
                    const numberDevInput = document.getElementById("number-dev");
                    const numberOfDev =
                        numberDevInput.value !== ""
                            ? parseInt(numberDevInput.value, 10)
                            : null;
                    const budgetInput = document.getElementById("budget");
                    const salaryPerDev =
                        budgetInput.value !== "" ? parseFloat(budgetInput.value) : null;
                    const durationInput = document.getElementById("duration");
                    const duration =
                        durationInput.value.trim() !== "" ? durationInput.value : null; // get duration from the date input
                    const typeRequireId = selectedOptions2.value
                        ? selectedOptions2.value
                        : null; // replace with actual value from the type dropdown
                    const levelRequireId = selectedOptions3.value
                        ? selectedOptions3.value
                        : null; // replace with actual value from the level dropdown
                    const employmentTypeId = selectedOptions5.value
                        ? selectedOptions5.value
                        : null;
                    const skillIds = selectedOptions.map((skill) => skill.value); // replace with actual values from the multi-select
                    const isSaved = true;
                    // const requestIdState = location.state?.requestId || null;
                    const queryParams = new URLSearchParams(location.search);
                    const projectId = queryParams.get("Id");

                    if (requestId) {
                        const response = await hiringRequestService.updateHiringRequest(
                            requestId,
                            jobTitle,
                            jobDescription,
                            numberOfDev,
                            salaryPerDev,
                            duration,
                            typeRequireId,
                            levelRequireId,
                            skillIds,
                            isSaved,
                            employmentTypeId
                        );
                        toast.success('Save hiring request successfully!');
                        console.log("Save hiring request successfully:", response);
                    } else {
                        const response = await hiringRequestService.createHiringRequest(
                            companyIdErr,
                            projectId,
                            jobTitle,
                            jobDescription,
                            numberOfDev,
                            salaryPerDev,
                            duration,
                            typeRequireId,
                            levelRequireId,
                            skillIds,
                            isSaved,
                            employmentTypeId
                        );
                        toast.success('Save hiring request successfully!');
                    }
                    setLoading(false);
                    setJobTitleError(null);
                    setErrorMessage(null);
                    closeModal();
                } catch (error) {
                    console.error("Error posting job:", error);
                    setLoading(false);
                    toast.error('Save hiring request fail!');
                    setSuccessMessage(null);
                    // Handle error, show error message, etc.
                }
            }
        }
    };

    useEffect(() => {
        setMaxDateDuration(maxDate)
        console.log(maxDate)
        console.log(requestId)
        if (isModalOpen) {
            const timeout = setTimeout(() => {
                if (descriptionRef.current) {
                    fetchData();
                }
            }, 200); // Đợi 100ms để chắc chắn rằng phần tử đã được render
            return () => clearTimeout(timeout);
        }
    }, [isModalOpen, requestId]);


    return (
        <React.Fragment>

            <Modal isOpen={isModalOpen} toggle={closeModal} size={"xl"}>
                <div className="mt-2 d-flex justify-content-end ">
                    <Button
                        close
                        className="close-button"
                        onClick={closeModal}
                        style={{ marginRight: "10px" }}
                    ></Button>
                </div>
                <ModalBody className="rounded" style={{ padding: "0px" }}>
                    {loading && (
                        <div className="overlay" style={{ zIndex: "2000" }}>
                            <div className="spinner"></div>
                        </div>
                    )}

                    {/* <section class="section"> */}
                    {/* <div class="container"> */}
                    <div class="row justify-content-center">
                        <div class="col-lg-12">
                            <div class="rounded shadow bg-white p-4">
                                <div class="custom-form">
                                    <div id="message3"></div>
                                    <form
                                        method="post"
                                        action="php/contact.php"
                                        name="contact-form"
                                        id="contact-form3"
                                    >
                                        <h4 class="text-dark mb-3">Create new hiring request </h4>
                                        <div class="row">
                                            <div class="col-md-9">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Hiring request title</label>
                                                    <input
                                                        id="job-title"
                                                        type="text"
                                                        class="form-control resume"
                                                        placeholder="Title..."
                                                        maxlength="100"
                                                        required
                                                    ></input>
                                                    {jobTitleError && (
                                                        <p className="text-danger mt-2">{jobTitleError}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Number of developer</label>
                                                    <input
                                                        id="number-dev"
                                                        type="number"
                                                        class="form-control resume"
                                                        placeholder="0"
                                                    ></input>
                                                    {numberDevError && (
                                                        <p className="text-danger mt-2">{numberDevError}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Salary per dev (VND)</label>
                                                    <input
                                                        id="budget"
                                                        type="number"
                                                        class="form-control resume"
                                                        placeholder="3000000 VND"
                                                    ></input>
                                                    {budgetError && (
                                                        <p className="text-danger mt-2">{budgetError}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div class="col-md-3">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Duration</label>
                                                    <input
                                                        type="date"
                                                        class="form-control resume"
                                                        placeholder=""
                                                        readOnly
                                                        value={selectedDate}
                                                    ></input>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted"></label>
                                                    <input
                                                        id="duration"
                                                        type="date"
                                                        class="form-control resume"
                                                        placeholder=""
                                                        min={minDateDuration}
                                                        max={maxDateDuration}
                                                    ></input>
                                                    {durationError && (
                                                        <p className="text-danger mt-2">{durationError}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">
                                                        Employment type requirement
                                                    </label>
                                                    <div className="form-button">
                                                        <Select
                                                            options={options5}
                                                            value={selectedOptions5}
                                                            onChange={handleChange5}
                                                            className="Select Select--level-highest"
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
                                                                })
                                                            }}
                                                        />
                                                    </div>
                                                    {employmentTypeError && (
                                                        <p className="text-danger mt-2">
                                                            {employmentTypeError}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Type of developer requirement</label>
                                                    <div className="form-button">
                                                        <Select
                                                            options={options2}
                                                            value={selectedOptions2}
                                                            onChange={handleChange2}
                                                            className="Select Select--level-highest"
                                                            style={{ maxHeight: '2000px', overflowY: 'auto' }}
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
                                                                })
                                                            }}
                                                        />
                                                    </div>

                                                    {typeError && (
                                                        <p className="text-danger mt-2">{typeError}</p>
                                                    )}
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
                                                                })
                                                            }}
                                                        />
                                                    </div>
                                                    {levelError && (
                                                        <p className="text-danger mt-2">{levelError}</p>
                                                    )}
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
                                                                })
                                                            }}
                                                        />
                                                    </div>
                                                    {skillError && (
                                                        <p className="text-danger mt-2">{skillError}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Hiring request description</label>
                                                    <Editor
                                                        class="fix-height"
                                                        id="description"
                                                        apiKey="axy85kauuja11vgbfrm96qlmduhgfg6egrjpbjil00dfqpwf"
                                                        onEditorChange={(newValue) => {
                                                            setValue(newValue);
                                                        }}
                                                        ref={descriptionRef}
                                                        init={{
                                                            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                                                            //   plugins:
                                                            //     "a11ychecker advcode advlist advtable anchor autolink autoresize autosave casechange charmap checklist code codesample directionality  emoticons export  formatpainter fullscreen importcss  insertdatetime link linkchecker lists media mediaembed mentions  nonbreaking pagebreak pageembed permanentpen powerpaste preview quickbars save searchreplace table  template tinydrive tinymcespellchecker  visualblocks visualchars wordcount",
                                                            // 
                                                        }}
                                                    />
                                                    {descriptionError && (
                                                        <p className="text-danger mt-2">
                                                            {descriptionError}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-12 mt-2 d-flex justify-content-end gap-2">
                                                <button
                                                    type="button"
                                                    className=" btn btn-info "
                                                    style={{ backgroundColor: "#0051ffe0" }}
                                                    onClick={handleSavePostJob}
                                                    disabled={loading}
                                                >
                                                    {loading ? (
                                                        <RingLoader color="#fff" loading={true} size={20} />
                                                    ) : (
                                                        "Save"
                                                    )}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={handlePostJob}
                                                    disabled={loading}
                                                >
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
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                    {/* </section > */}
                </ModalBody>
            </Modal>

        </React.Fragment>
    );
};

export default CreateHiringRequestPopup;

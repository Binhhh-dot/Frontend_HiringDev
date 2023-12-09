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

const ExtendDurationHiringRequestPopup = (
    { isModalOpen, closeModal, requestId },
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
    const [selectedDate, setSelectedDate] = useState('');
    const today = new Date();
    const descriptionRef = useRef(null);
    const [isCreateInterviewModal, setIsCreateInterviewModal] = useState(false);

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
        setLoading(true);
        let check = true;

        // Kiểm tra lỗi cho Duration
        if (!document.getElementById("duration").value) {
            check = false;
            setDurationError("Please enter the duration.");
        } else {
            setDurationError(null);
        }
        console.log("Posting job...");
        if (check) {
            try {
                const duration = document.getElementById("duration").value;
                if (requestId) {
                    const response = await hiringRequestService.extendDuration(
                        requestId,
                        duration
                    );
                    console.log(response);
                }
                setLoading(false);
                localStorage.removeItem("requestId");
                setErrorMessage(null);
                toast.success('Extend duration hiring request successfully!');
                CreateInterviewModalClose()
                closeModal();
            } catch (error) {
                console.log(value);
                setLoading(false);
                setSuccessMessage(null);
                toast.error('Extend duration hiring request fail!');
                CreateInterviewModalClose()
                // Handle error, show error message, etc.
            }
        } else {
            setLoading(false);
            setSuccessMessage(null);
            CreateInterviewModalClose()
        }
    };

    const CreateInterviewModalOpen = () => {
        let check = true;

        if (!document.getElementById("duration").value) {
            check = false;
            setDurationError("Please enter the duration.");
        } else {
            setDurationError(null);
        }

        if (check) {
            setIsCreateInterviewModal(true);
        }
    };


    const CreateInterviewModalClose = () => {
        setIsCreateInterviewModal(false);
    };

    useEffect(() => {
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
            <div>
                <Modal isOpen={isModalOpen} toggle={closeModal} size={"xl"}>
                    <div className="mt-2 d-flex justify-content-end ">
                        <Button
                            close
                            className="close-button"
                            onClick={closeModal}
                            style={{ marginRight: "10px" }}
                        ></Button>
                    </div>
                    <ModalBody className="rounded">
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
                                                            readOnly
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
                                                            readOnly
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
                                                            readOnly
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
                                                                isDisabled={true}

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
                                                                isDisabled={true}

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
                                                                isDisabled={true}

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
                                                                isDisabled={true}
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
                                                            disabled={true}
                                                            ref={descriptionRef}
                                                            init={{
                                                                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',

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
                                                        className="btn btn-primary"
                                                        onClick={CreateInterviewModalOpen}
                                                        disabled={loading}
                                                    >
                                                        {loading ? (
                                                            <RingLoader color="#fff" loading={true} size={20} />
                                                        ) : (
                                                            "Extend duration"
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
                    <Modal
                        style={{ padding: "10px" }}
                        isOpen={isCreateInterviewModal}
                        centered
                        tabIndex="-1"
                        contentLabel="Confirm Create Interview Modal"
                    >
                        <div className="modal-header">
                            <h3>Confirm Create Report</h3>
                        </div>
                        <ModalBody>
                            <div>
                                <h6 style={{ color: "#969BA5" }}>
                                    Are you sure you want to extend the duration of this hiring request? You will not be able to extend duration again!
                                </h6>
                            </div>
                        </ModalBody>
                        <div className="d-flex justify-content-around   mt-4 modal-footer">
                            <button
                                style={{ width: "100px" }}
                                className="btn btn-danger"
                                onClick={CreateInterviewModalClose}
                            >
                                Cancel
                            </button>
                            <button
                                style={{ width: "100px" }}
                                className="btn btn-primary"
                                onClick={handlePostJob}
                            >
                                Create
                            </button>
                        </div>
                    </Modal>
                </Modal>
            </div>
        </React.Fragment>
    );
};

export default ExtendDurationHiringRequestPopup;

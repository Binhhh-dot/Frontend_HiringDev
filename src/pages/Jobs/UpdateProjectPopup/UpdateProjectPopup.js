import React, { useState, useEffect } from "react";
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
import projectServices from "../../../services/project.services";
import projectTypeServices from "../../../services/projectType.services";

const UpdateProjectPopup = (
    { isModalOpen, closeModal, projectId },
    ...props
) => {
    const navigate = useNavigate();
    const [options2, setOptions2] = useState([]);
    const [selectedOptions2, setSelectedOptions2] = useState([]);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [countries, setCountries] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [value, setValue] = useState("");
    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [minDateEndDay, setMinDateEndDay] = useState('');
    const today = new Date();
    const today2 = new Date();
    today.setDate(today.getDate() + 10);
    today2.setDate(today2.getDate() + 40);
    const _30DayLater = today2.toISOString().split('T')[0];

    const [projectNameError, setProjectNameError] = useState(null);
    const [startDateError, setStartDateError] = useState(null);
    const [endDateError, setEndDateError] = useState(null);
    const [projectTypeError, setProjectTypeError] = useState(null);
    const [jobDescriptionError, setJobDescriptionError] = useState(null);


    const handleChange2 = (selected) => {
        console.log(selected);
        setSelectedOptions2(selected);
    };

    useEffect(() => {
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

    const fetchData = async () => {
        try {
            const response2 = await projectTypeServices.getAllType();
            const activeTypes = response2.data.data.filter(
                (type) => type.statusString === "Active"
            );
            let formattedTypes = activeTypes.map((type) => ({
                value: type.projectTypeId.toString(),
                label: type.projectTypeName,
            }));
            setOptions2(formattedTypes);
        } catch (error) {
            console.error("Error fetching types:", error);
        }
    };

    const fetchDetailProjectUpdate = async () => {
        try {
            const response2 = await projectServices.getProjectDetailByProjectId(projectId);
            document.getElementById("project-name").value =
                response2.data.data.projectName;
            document.getElementById("start-date").value = response2.data.data.startDate;
            document.getElementById("end-date").value = response2.data.data.endDate;
            const editor = window.tinymce.get("description"); // Giả sử 'description' là id của Editor
            if (editor) {
                editor.setContent(response2.data.data.description);
            }

            const requiredTypeName = response2.data.data.projectTypeName;
            const foundType = options2.find(
                (type) => type.label === requiredTypeName
            );
            if (foundType) {
                const newType = {
                    value: foundType.value,
                    label: foundType.label,
                };
                setSelectedOptions2(newType);
            }
        } catch (error) {
            console.error("Error fetching types:", error);
        }
    };
    const handlePostJob = async () => {
        console.log("Sdsad")
        // Kiểm tra xem có userID trong localStorage không
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
            setProjectTypeError("Select project type")
            check = false;

        } else {
            setProjectTypeError(null);
        }
        if (!value) {
            setJobDescriptionError("Enter job description")
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
                formData.append('projectId', projectId);
                formData.append('projectName', projectName);
                formData.append('projectTypeId', projectTypeRequireId);
                formData.append('startDate', startDate);
                formData.append('endDate', endDate);
                formData.append('description', projectDescription);
                const response = await projectServices.updateProject(projectId,
                    formData
                );
                setLoading(false);
                closeModal();
                toast.success("Update project successfully!")
            } catch (error) {
                setLoading(false);
                toast.error("Update project fail!")
                // Handle error, show error message, etc.
            }
        } else {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchDetailProjectUpdate();
    }, [isModalOpen]);

    const setMinDateEndDayByJs = () => {
        if (document.getElementById("start-date").value) {
            const startDateValue = document.getElementById("start-date").value;
            const startDate = new Date(startDateValue);
            startDate.setDate(startDate.getDate() + 1); // Thêm 30 ngày vào ngày bắt đầu

            const minDay = startDate.toISOString().slice(0, 10); // Chuyển đổi về chuỗi ngày tháng (YYYY-MM-DD)

            console.log(minDay);
            setMinDateEndDay(minDay)
        } else {
            setMinDateEndDay(_30DayLater)
        }
    }

    const setMinDateByJs = () => {
        if (document.getElementById("end-date").value) {
            const endDateValue = document.getElementById("end-date").value;
            const endDate = new Date(endDateValue);
            endDate.setDate(endDate.getDate() - 1); // Thêm 30 ngày vào ngày bắt đầu

            const minDay = endDate.toISOString().slice(0, 10); // Chuyển đổi về chuỗi ngày tháng (YYYY-MM-DD)

            setMaxDate(minDay)
        } else {
            setMaxDate(null);
        }
    }

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
                                            <h4 class="text-dark mb-3">Update Project :</h4>
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
                                                            <p className="text-danger mt-2">{projectNameError}</p>
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
                                                                style={{ maxHeight: '2000px', overflowY: 'auto' }}
                                                            />
                                                        </div>

                                                        {projectTypeError && (
                                                            <p className="text-danger mt-2">{projectTypeError}</p>
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
                                                                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
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
                                                            "Update project"
                                                        )}
                                                    </button>
                                                </div>
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
            </div>
        </React.Fragment>
    );
};

export default UpdateProjectPopup;

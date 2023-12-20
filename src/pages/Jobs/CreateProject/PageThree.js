import React, { useState, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { RingLoader, HashLoader } from "react-spinners";
import { Divider } from "antd";
import projectServices from "../../../services/project.services";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import userImage from "../../../assets/images/user/img-00.jpg"
import companyServices from "../../../services/company.services";
import userSerrvices from "../../../services/user.serrvices";
import { Input, Modal, ModalBody, Form, FormGroup, Label } from "reactstrap"; // Assuming you are using reactstrap for modal components


const PageThree = ({ onButtonClick, projectName, selectedOptions, startday, endday, selectedStatus, description }) => {
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState("");
    const [jobDescriptionError, setJobDescriptionError] = useState(null);
    const descriptionRef = useRef(null);
    const [isCreateInterviewModal, setIsCreateInterviewModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [avatar2, setAvatar2] = useState();
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [companyNameError, setCompanyNameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [phoneNumberError, setPhoneNumberError] = useState(null);
    const [countryError, setCountryError] = useState(null);
    const [addressError, setAddressError] = useState(null);
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
    const CreateInterviewModalClose = () => {
        setIsCreateInterviewModal(false);
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
    const navigate = useNavigate();

    const goback = () => {
        let check = true;
        if (check) {
            onButtonClick("pagetwo", {
                projectName: projectName,
                selectedOptions: selectedOptions,
                startday: startday,
                endday: endday,
                selectedStatus: selectedStatus,
                description: value,
            });
        }
    };

    const fetchDescription = () => {
        const editor = window.tinymce.get("description"); // Giả sử 'description' là id của Editor
        if (editor) {
            editor.setContent(description);
        }
    };

    useEffect(() => {

        const timeout = setTimeout(() => {
            if (descriptionRef.current) {
                fetchDescription();
            }
        }, 200); // Đợi 100ms để chắc chắn rằng phần tử đã được render
        return () => clearTimeout(timeout);
    }, []);

    const handlePostJob = async () => {
        // Kiểm tra xem có userID trong localStorage không        
        const companyIdErr = localStorage.getItem("companyId");
        if (companyIdErr == "null" || !companyIdErr) {
            openModal2();
        } else {
            setLoading(true);
            let check = true;
            const startDateValue = new Date(startday);
            const endDateValue = new Date(endday);
            if (!value) {
                setJobDescriptionError("Enter project description");
                check = false;
            } else {
                setJobDescriptionError(null);
            }
            // Kiểm tra nếu cách nhau hơn 6 tháng
            const diffInMonths = (endDateValue.getFullYear() - startDateValue.getFullYear()) * 12 + (endDateValue.getMonth() - startDateValue.getMonth());
            if (value)
                if (diffInMonths > 6) {
                    check = false;
                    setIsCreateInterviewModal(true);
                }
            if (check) {
                try {
                    const projectTypeRequireId = selectedOptions.value;
                    const statusId = selectedStatus.value;
                    const response = await projectServices.createProject(companyIdErr, projectName, projectTypeRequireId, statusId, startday, endday, value);
                    // }
                    setLoading(false);
                    navigate("/projectlist");
                    toast.success("Create project successfully!");
                } catch (error) {
                    console.log(value);
                    console.error("Error posting job:", error);
                    setLoading(false);
                    toast.error("Create project fail!");
                    // Handle error, show error message, etc.
                }
            } else {
                setLoading(false);
            }
        }

    };

    const createProject = async () => {
        try {
            CreateInterviewModalClose();
            setLoading(true);
            const companyIdErr = localStorage.getItem("companyId");

            const projectTypeRequireId = selectedOptions.value;
            const statusId = selectedStatus.value;
            const response = await projectServices.createProject(companyIdErr, projectName, projectTypeRequireId, statusId, startday, endday, value);
            // }
            setLoading(false);
            setIsCreateInterviewModal(false);
            navigate("/projectlist");
            toast.success("Create project successfully!");
        } catch (error) {
            console.log(value);
            console.error("Error posting job:", error);
            setLoading(false);
            toast.error("Create project fail!");
            // Handle error, show error message, etc.
        }
    }

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

    return (
        <>
            <h4 class="text-dark" style={{ marginTop: "80px" }} >DETAILED PROJECT DESCRIPTION</h4>
            <p style={{ fontWeight: "500", color: "#8f8484" }}>
                In this final step, you'll have the opportunity to provide a more detailed description of the project. You can input information such as goals, scope, specific tasks, and any other essential project-related details. This description will offer stakeholders a comprehensive overview and specifics about the project, enabling a better understanding of its objectives and necessary elements for successful execution.</p>
            <Divider style={{ borderColor: "#e5dcdc", margin: "40px 0" }}></Divider>
            <form
                method="post"
                action="php/contact.php"
                name="contact-form"
                id="contact-form3"
            >
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group app-label mt-2">
                            <label style={{ color: "black", fontWeight: "700" }} class="">Project Description</label> <label style={{ color: "red" }}>*</label>
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
                                <p className="text-danger mt-2">
                                    {jobDescriptionError}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-6 mt-2 d-flex justify-content-start gap-2">
                        <button
                            type="button"
                            className="btn btn-primary"
                            // onClick={handlePrevious}
                            onClick={() => goback()}
                        >
                            Previous
                        </button>
                    </div>
                    <div class="col-lg-6 mt-2 d-flex justify-content-end gap-2">
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

                </div>
            </form>
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

                </Form>
            </Modal>

            <Modal
                style={{ padding: "10px" }}
                isOpen={isCreateInterviewModal}
                centered
                tabIndex="-1"
                contentLabel="Confirm Create Interview Modal"
            >
                <div className="modal-header">
                    <h3>Confirm Create Project</h3>
                </div>
                <ModalBody>
                    <div>
                        <h6 style={{ color: "#969BA5" }}>
                            The project lasted more than six months. Are you sure you want to create this project?
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
                        onClick={createProject}

                    >
                        Create
                    </button>
                </div>
            </Modal>
        </>
    );
}

export default PageThree;
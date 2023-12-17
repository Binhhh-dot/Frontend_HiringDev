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
import img0 from "../../../assets/images/user/img-00.jpg"
import Select from "react-select";

import userSerrvices from "../../../services/user.serrvices";
//import { asString } from "html2canvas/dist/types/css/types/color";
import { toast } from "react-toastify";

const UpdateHRAccountPopup = (
    { isOpen, closeModal, userId },
    ...props
) => {
    const [avatar2, setAvatar2] = useState();
    const [userImage3, setUserImage3] = useState(null);

    const [firstNameForUpdateAccount, setFirstNameForUpdateAccount] =
        useState(null);
    const [lastNameForUpdateAccount, setLastNameForUpdateAccount] =
        useState(null);
    const [lastStatusForUpdateAccount, setStatusForUpdateAccount] =
        useState(null);
    const [emailForUpdateAccount, setEmailForUpdateAccount] = useState(null);
    const [phoneNumberForUpdateAccount, setPhoneNumberForUpdateAccount] =
        useState(null);
    const [passwordForUpdateAccount, setPasswordForUpdateAccount] =
        useState(null);
    const [dateOfBirthForUpdateAccount, setDateOfBirthForUpdateAccount] =
        useState(null);




    const handleChangeFirstName = (event) => {
        const newValue = event.target.value;
        setFirstNameForUpdateAccount(newValue);
    };

    const handleChangeLastName = (event) => {
        const newValue = event.target.value;
        setLastNameForUpdateAccount(newValue);
    };

    const handleChangeStatusName = (event) => {
        const newValue = event.target.value;
        setLastNameForUpdateAccount(newValue);
    }

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
    const [passwordError, setPasswordError] = useState(null);
    const [genderError, setGenderError] = useState(null);
    const [dateOfBirthError, setDateOfBirthError] = useState(null);
    const [phoneNumberError, setPhoneNumberError] = useState(null);

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

        if (!document.getElementById("password").value) {
            check = false;
            setPasswordError("Please enter the password");
        } else {
            setPasswordError(null);
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
        //   const Status = selectedOptions2 ? selectedOptions2.value : null;

        if (check) {
            try {
                const formData = new FormData();
                formData.append("UserId", userId);
                formData.append("FirstName", FirstName);
                formData.append("LastName", LastName);
                formData.append("Email", Email);
                formData.append("PhoneNumber", PhoneNumber);
                formData.append("Password", Password);
                formData.append("DateOfBirth", DateOfBirth);
                //     formData.append("Status", Status);
                formData.append("File", file || null);
                const response = await userSerrvices.updateHR(
                    userId,
                    formData
                );
                console.log(response);
                toast.success("Update HR account successfully");
                closeModal();
            } catch (error) {
                console.error("Error fetching update developer account:", error);
                toast.error("Update HR account fail");
            }
        }
    };
    //------------------------------------------------------------------------------------------------


    //------------------------------------------------------------------------------------------------
    useEffect(() => {
        const fetchDeveloperDetail = async () => {
            if (userId) {
                try {
                    const response = await userSerrvices.getHRById(
                        userId
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
                    setStatusForUpdateAccount(response.data.data.statusString)
                    const statusString = response.data.data.statusString || "";
                    const statusOptions = statusString.split(","); // Assuming it's a comma-separated string
                    const selectedOptions = statusOptions.map((option) => ({ label: option, value: option }));
                    setSelectedOptions2(selectedOptions || options2);
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
                                            {/* <div class="row">
                                                <div class="col-md-6">
                                                    <label class="text-muted">Status:</label>
                                                    <div className="form-button">
                                                        <Select
                                                            options={[
                                                                { label: 'Active', value: 1 },
                                                                { label: 'Inactive', value: 0 }
                                                            ]}
                                                            value={selectedOptions2}
                                                            onChange={handleChange2}
                                                            style={{ width: "100%" }}
                                                        />
                                                    </div>
                                                    {passwordError && (
                                                        <p className="text-danger mt-2">
                                                            {passwordError}
                                                        </p>
                                                    )}

                                                </div>
                                            </div> */}

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

export default UpdateHRAccountPopup;

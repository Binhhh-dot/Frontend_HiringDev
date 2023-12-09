import React, { useState, useEffect, useRef } from "react";
import {
  Input,
  Modal,
  ModalBody,
  FormGroup,
  Button,
  Form,
  Label,
  Col,
  Row,
} from "reactstrap";
import img0 from "../../../assets/images/user/img-00.jpg";
import userSerrvices from "../../../services/user.serrvices";
import { useUser } from "../../Profile/MyProfile/UserContext";
import axios from "axios";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";

const UpdateProfileManagerPopup = (
  { isModalOpen, closeModal, userId },
  ...props
) => {
  //----------------------------------------------------------------------------------------
  const [loadingUpdateAccount, setLoadingUpdateAccount] = useState(false);
  //----------------------------------------------------------------------------------------
  const [avatar2, setAvatar2] = useState();

  const [defaultImg, setDefaultImg] = useState(null);
  const [dateState, setDateState] = useState(null);
  const [firstNameState, setFirstnameState] = useState(null);
  const [lastNameState, setLastnameState] = useState(null);
  const [phoneState, setPhonenameState] = useState(null);
  const [userImageState, setUserState] = useState(null);

  //const { userData, updateUserData } = useUser();
  //const [editableData, setEditableData] = useState({ ...userData });
  const [firstNameError, setFirstNameError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [phoneNumberError, setPhoneNumberError] = useState(null);
  const [dayOfBirthError, setDayOfBirthError] = useState(null);
  const [imageError, setImageError] = useState(null);

  //----------------------------------------------------------------------------------------
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

  useEffect(() => {
    return () => avatar2 && URL.revokeObjectURL(avatar2.preview);
  }, [avatar2]);

  //----------------------------------------------------------------------------------------
  const handleUpdateUserData = async () => {
    setLoadingUpdateAccount(true);
    let check = true;
    const firstName = document.getElementById("firstNameTab2").value;
    if (!firstName) {
      setFirstNameError("Enter your first name");
      check = false;
    } else {
      setFirstNameError("");
    }
    const lastName = document.getElementById("lastNameTab2").value;
    if (!lastName) {
      setLastNameError("Enter your last name");
      check = false;
    } else {
      setLastNameError("");
    }
    const phoneNumber = document.getElementById("phoneNumberTab2").value;
    if (!phoneNumber) {
      setPhoneNumberError("Enter your phone number");
      check = false;
    } else {
      setPhoneNumberError("");
    }
    const dateOfBirth = document.getElementById("dayOfBirhTab2").value;
    if (!phoneNumber) {
      setDayOfBirthError("Enter your date of birth");
      check = false;
    } else {
      setDayOfBirthError("");
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

    if (
      firstName == firstNameState &&
      lastName == lastNameState &&
      phoneNumber == phoneState &&
      dateOfBirth == dateState &&
      !checkImageChange
    ) {
      toast.info("Nothing change!");
      check = false;
    }

    if (check) {
      const formData = new FormData();
      formData.append("UserId", userId);
      formData.append("FirstName", firstName);
      formData.append("LastName", lastName);
      formData.append("PhoneNumber", phoneNumber);
      formData.append("DateOfBirth", dateOfBirth);
      formData.append("file", file || null);
      console.log(formData);

      try {
        const response = await userSerrvices.updateUser(formData, userId);
        console.log(response);
        // Handle the response (you can show a success message or redirect to another page)
        toast.success("Update successfully");
        setFirstnameState(firstName);
        setLastnameState(lastName);
        setPhonenameState(phoneNumber);
        setDateState(dateOfBirth);
        setUserState(file);
        if (response.data.data.userImage) {
          setDefaultImg(response.data.data.userImage);
        } else {
          setDefaultImg(img0);
        }
      } catch (error) {
        setLoadingUpdateAccount(false);
        toast.success("Update fail");
      }

      // const file3 = document.getElementById("profile-img-file-input-2")
      //   .files[0];
      // if (file3) {
      //   file3.preview = URL.createObjectURL(file3);
      // }

      // var inputDate = document.getElementById("dayOfBirhTab2").value;

      // var date = new Date(inputDate);

      // var monthNames = [
      //   "January",
      //   "February",
      //   "March",
      //   "April",
      //   "May",
      //   "June",
      //   "July",
      //   "August",
      //   "September",
      //   "October",
      //   "November",
      //   "December",
      // ];

      // var day = date.getDate();
      // var monthIndex = date.getMonth();
      // var year = date.getFullYear();

      // var formattedDate = day + " " + monthNames[monthIndex] + " " + year;
      // if (file3) {
      //   const updatedUserData2 = {
      //     lastName: document.getElementById("firstNameTab2").value,
      //     firstName: document.getElementById("lastNameTab2").value,
      //     email: userData.email,
      //     phoneNumber: document.getElementById("phoneNumberTab2").value,
      //     dateOfBirth: formattedDate,
      //     userImage: file3.preview,
      //   };
      //   updateUserData(updatedUserData2);
      // } else {
      //   console.log(userData.userImage);
      //   const tempUserImage = userData.userImage;
      //   const updatedUserData2 = {
      //     lastName: document.getElementById("firstNameTab2").value,
      //     firstName: document.getElementById("lastNameTab2").value,
      //     email: userData.email,
      //     phoneNumber: document.getElementById("phoneNumberTab2").value,
      //     dateOfBirth: formattedDate,
      //     userImage: tempUserImage,
      //   };
      //   updateUserData(updatedUserData2);
      // }

      // manager : project + hiring request + contract + trans
      // Staff : company + report + interview

      setLoadingUpdateAccount(false);
    } else {
      setLoadingUpdateAccount(false);
    }
  };
  //----------------------------------------------------------------------------------------
  useEffect(() => {
    const fetchUserDetail = async () => {
      if (userId) {
        try {
          const response = await userSerrvices.getUserById(userId);
          //   const {
          //     lastName,
          //     firstName,
          //     email,
          //     phoneNumber,
          //     dateOfBirth,
          //     userImage,
          //   } = response.data.data;
          //   updateUserData({
          //     lastName,
          //     firstName,
          //     email,
          //     phoneNumber,
          //     dateOfBirth,
          //     userImage,
          //   });

          document.getElementById("firstNameTab2").value =
            response.data.data.firstName;
          document.getElementById("lastNameTab2").value =
            response.data.data.lastName;
          document.getElementById("phoneNumberTab2").value =
            response.data.data.phoneNumber;
          let formattedDate;
          if (response.data.data.dateOfBirth) {
            const dateOfBirthtemp = response.data.data.dateOfBirth;
            const parsedDate = new Date(dateOfBirthtemp);
            parsedDate.setDate(parsedDate.getDate() + 1);
            formattedDate = parsedDate.toISOString().split("T")[0];
            document.getElementById("dayOfBirhTab2").value = formattedDate;
            setDateState(formattedDate);
          }
          setFirstnameState(response.data.data.firstName);
          setLastnameState(response.data.data.lastName);
          setPhonenameState(response.data.data.phoneNumber);

          if (response.data.data.userImage) {
            setDefaultImg(response.data.data.userImage);
          } else {
            setDefaultImg(img0);
          }
        } catch (error) {
          console.error("Error loading user data:", error);
        }
      }
    };
    fetchUserDetail();
  }, [isModalOpen]);
  //----------------------------------------------------------------------------------------

  return (
    <React.Fragment>
      <div>
        <Modal isOpen={isModalOpen} toggle={closeModal} size={"lg"}>
          <div className="mt-2 d-flex justify-content-end ">
            <Button
              close
              className="close-button"
              onClick={closeModal}
              style={{ marginRight: "10px" }}
            ></Button>
          </div>
          <ModalBody className="rounded">
            <Form>
              <div>
                <h5 className="fs-17 fw-semibold mb-3 mb-0">Profile Manager</h5>
                <div className="text-center">
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
                        src={defaultImg} // Giá trị mặc định là "userImage2"
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
                <Row>
                  <Col lg={6}>
                    <div className="mb-3">
                      <label htmlFor="firstNameTab2" className="form-label">
                        First Name
                      </label>
                      <Input
                        type="text"
                        className="form-control"
                        id="firstNameTab2"
                        name="firstName"
                      />
                      {firstNameError && (
                        <p className="text-danger mt-2">{firstNameError}</p>
                      )}
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Label htmlFor="lastNameTab2" className="form-label">
                        Last Name
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="lastNameTab2"
                      />
                      {lastNameError && (
                        <p className="text-danger mt-2">{lastNameError}</p>
                      )}
                    </div>
                  </Col>

                  <Col lg={6}>
                    <div className="mb-3">
                      <Label htmlFor="phoneNumberTab2" className="form-label">
                        Phone Number
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="phoneNumberTab2"
                      />
                      {phoneNumberError && (
                        <p className="text-danger mt-2">{phoneNumberError}</p>
                      )}
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Label htmlFor="dayOfBirhTab2" className="form-label">
                        Day of Birth
                      </Label>
                      <Input
                        type="date"
                        className="form-control"
                        id="dayOfBirhTab2"
                      />
                      {dayOfBirthError && (
                        <p className="text-danger mt-2">{dayOfBirthError}</p>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            </Form>
            <div className="d-flex justify-content-end">
              <button
                id="rejectButton"
                className="btn btn-soft-blue mt-2 fw-bold"
                //onClick={() => handleUpdateUserData()}
                //disabled={loadingUpdateAccount}
              >
                {loadingUpdateAccount ? (
                  <HashLoader size={20} color={"white"} loading={true} />
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default UpdateProfileManagerPopup;

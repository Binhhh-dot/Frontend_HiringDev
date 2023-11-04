import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Card, Col, Input, Row, CardBody } from "reactstrap";

import lightLogo from "../../assets/images/logo-light.png";
import darkLogo from "../../assets/images/logo-dark.png";

import signUpImage from "../../assets/images/auth/sign-up.png";
import { Form } from "react-bootstrap";
import axios from "axios"; // Import Axios
import loginService from "../../services/login.service";
import userImage2 from "../../assets/images/user/img-02.jpg";
import Select from "react-select";
import companyServices from "../../services/company.services";


const SignCompany = () => {
    document.title = "Sign Up | Jobcy - Job Listing Template | Themesdesign";
    const navigate = useNavigate();
    const [avatar2, setAvatar2] = useState();
    const [userImage3, setUserImage3] = useState(null);

    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        companyName: "",
        companyEmail: "",
        phoneNumber: "",
        address: "",
        country: "",
        userId: "",
        file: "",
    });

    useEffect(() => {
        setUserImage3(userImage2);
    }, []);

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

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
        const inputElement = document.getElementById('profile-img-file-input-2');
        inputElement.click();
    };
    const handlePreviewAvatar2 = (e) => {
        const file = e.target.files[0];
        if (file) {
            file.preview = URL.createObjectURL(file);
            setAvatar2(file);
        }

    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const formData2 = new FormData();
        const userId = localStorage.getItem('userId');
        formData2.append('companyName', formData.companyName);
        formData2.append('companyEmail', formData.companyEmail);
        formData2.append('phoneNumber', formData.phoneNumber);
        formData2.append('address', formData.address);
        formData2.append('country', formData.country);
        formData2.append('userId', userId);
        formData2.append('file', avatar2);

        try {
            // Make API request
            const response = await companyServices.createCompany(formData2);

            // Handle the response (you can show a success message or redirect to another page)
            console.log('API Response:', response.data);
            const responseUser = await axios.get(`https://wehireapi.azurewebsites.net/api/User/${userId}`);
            const userData = responseUser.data;
            localStorage.setItem('companyId', userData.data.companyId);
            navigate("/layout3");
        } catch (error) {
            // Handle errors (show an error message or log the error)
            console.error('Error creating company:', error);
            console.log(error.response.data);
        }
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;

        // Thực hiện cập nhật state formData
        setFormData({ ...formData, email: newEmail });

        // Thực hiện xử lý kiểm tra email
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);

        if (newEmail.trim() === '') {
            e.target.setCustomValidity('Please enter your email');
            return; // Không cần kiểm tra tiếp nếu trống
        }

        if (!isValidEmail) {
            e.target.setCustomValidity('Please enter a valid email address.');
        } else {
            e.target.setCustomValidity('');
        }
    };

    return (
        <React.Fragment>
            <div>
                <div className="main-content">
                    <div className="page-content">
                        <section className="bg-auth">
                            <Container>
                                <Row className="justify-content-center">
                                    <Col xl={10} lg={12}>
                                        <Card className="auth-box">
                                            <Row className="align-items-center">
                                                <Col lg={6} className="text-center">
                                                    <CardBody className="p-4">
                                                        <Link to="/">
                                                            <img
                                                                src={lightLogo}
                                                                alt=""
                                                                className="logo-light"
                                                            />
                                                            <img
                                                                src={darkLogo}
                                                                alt=""
                                                                className="logo-dark"
                                                            />
                                                        </Link>
                                                        <div className="mt-5">
                                                            <img
                                                                src={signUpImage}
                                                                alt=""
                                                                className="img-fluid"
                                                            />
                                                        </div>
                                                    </CardBody>
                                                </Col>
                                                <Col lg={6}>
                                                    <CardBody className="auth-content p-5 text-white">
                                                        <div className="w-100">
                                                            <div className="text-center">
                                                                <h5>Let's Get Started</h5>
                                                                <p className="text-white-70">
                                                                    Sign Up and get access to all the features of
                                                                    Jobcy
                                                                </p>
                                                            </div>
                                                            <Form action="/" className="auth-form " onSubmit={handleSignUp} lang="en" >
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
                                                                                src={userImage3}  // Giá trị mặc định là "userImage2"
                                                                                className="rounded-circle img-thumbnail profile-img"
                                                                                id="profile-img-2"
                                                                                alt=""
                                                                            />
                                                                        )}
                                                                        <div className="p-0 rounded-circle profile-photo-edit">
                                                                            <label
                                                                                className="profile-photo-edit avatar-xs"
                                                                            >
                                                                                <i className="uil uil-edit" onClick={handleChooseAvatar2}></i>
                                                                            </label>
                                                                            <input
                                                                                type="file"
                                                                                id="profile-img-file-input-2"
                                                                                onChange={handlePreviewAvatar2}
                                                                                style={{ display: 'none' }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label
                                                                        htmlFor="firstnameInput"
                                                                        className="form-label"
                                                                    >
                                                                        Company Name
                                                                    </label>
                                                                    <Input lang="en"
                                                                        type="text"
                                                                        className="form-control"
                                                                        required
                                                                        id="firstnameInput"
                                                                        placeholder="Enter your first name"
                                                                        value={formData.firstName}
                                                                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                                                        onInput={(e) => e.target.setCustomValidity('')} // Clear custom validity on input
                                                                        onInvalid={(e) => e.target.setCustomValidity("Please enter your company name")}
                                                                    />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label
                                                                        htmlFor="lastnameInput"
                                                                        className="form-label"
                                                                    >
                                                                        Email
                                                                    </label>
                                                                    <Input
                                                                        type="text"
                                                                        className="form-control"
                                                                        required
                                                                        id="lastnameInput"
                                                                        placeholder="Enter your last name"
                                                                        value={formData.lastName}
                                                                        onChange={(e) => {
                                                                            setFormData({ ...formData, companyEmail: e.target.value });
                                                                        }}
                                                                        onInput={(e) => e.target.setCustomValidity('')} // Clear custom validity on input
                                                                        onInvalid={(e) => e.target.setCustomValidity("Please enter your email")}
                                                                    />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label
                                                                        htmlFor="phonenumberInput"
                                                                        className="form-label"
                                                                    >
                                                                        Company Phone Number
                                                                    </label>
                                                                    <Input
                                                                        type="number"
                                                                        className="form-control"
                                                                        required
                                                                        id="phonenumberInput"
                                                                        placeholder="Enter your phone number"
                                                                        value={formData.phoneNumber}
                                                                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                                                        onInput={(e) => e.target.setCustomValidity('')} // Clear custom validity on input
                                                                        onInvalid={(e) => e.target.setCustomValidity("Please enter your company phone number")}
                                                                    />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label
                                                                        htmlFor="passwordInput"
                                                                        className="form-label"
                                                                    >
                                                                        Country
                                                                    </label>
                                                                    {/* <Input
                                                                        lang="en"
                                                                        type="email"
                                                                        className="form-control"
                                                                        id="emailInput"
                                                                        placeholder="Enter your email"
                                                                        value={formData.email}
                                                                        onChange={handleEmailChange}
                                                                        required
                                                                        onInvalid={(e) => e.target.setCustomValidity("Please enter your country")}
                                                                    /> */}
                                                                    <Select
                                                                        className="Select Select--level-highest"
                                                                        styles={{
                                                                            control: (provided) => ({
                                                                                ...provided,
                                                                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                                                                border: "rgba(255, 255, 255, 0.1)",
                                                                            }),
                                                                            singleValue: (provided) => ({
                                                                                ...provided,
                                                                                color: "white",
                                                                            }),
                                                                            placeholder: (provided) => ({
                                                                                ...provided,
                                                                                color: "white",
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
                                                                        value={selectedCountry}
                                                                        onChange={(selectedOption) => {
                                                                            setSelectedCountry(selectedOption);
                                                                            setFormData({ ...formData, country: selectedOption.value });
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label
                                                                        htmlFor="emailInput"
                                                                        className="form-label"
                                                                    >
                                                                        Address
                                                                    </label>
                                                                    <Input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="passwordInput"
                                                                        placeholder="Enter your password"
                                                                        value={formData.password}
                                                                        required
                                                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                                        onInput={(e) => e.target.setCustomValidity('')} // Clear custom validity on input
                                                                        onInvalid={(e) => e.target.setCustomValidity("Please enter your address")}
                                                                    />
                                                                </div>
                                                                <div className="text-center">
                                                                    {error && <p className="text-danger mt-2">{error}</p>}
                                                                    <button
                                                                        type="submit"
                                                                        className="btn btn-white btn-hover w-100"
                                                                    >
                                                                        Create
                                                                    </button>
                                                                </div>
                                                                <div className="mt-3 me-2
                                                                 text-end">
                                                                    <p className="mb-0">
                                                                        {" "}
                                                                        <Link
                                                                            to="/layout3"
                                                                            className="fw-medium text-white text-decoration-underline"
                                                                        >
                                                                            {" "}
                                                                            Skip{" "}
                                                                        </Link>
                                                                    </p>
                                                                </div>
                                                            </Form>
                                                        </div>
                                                    </CardBody>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                        </section>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default SignCompany;

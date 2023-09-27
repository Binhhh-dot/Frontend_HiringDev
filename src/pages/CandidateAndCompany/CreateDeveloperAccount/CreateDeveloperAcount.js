import React, { useState } from "react";
import Section from "../CreateDeveloperAccount/Section";
import Select from "react-select";



const CreateDeveloperAccount = () => {
    document.title = "Create Developer Account";

    // Khai báo danh sách tùy chọn
    const options = [
        { value: "0", label: "cc-1" },
        { value: "2", label: "dd-2" },
        { value: "3", label: "Skill-3" },
        { value: "4", label: "ff-4" },
        { value: "5", label: "Skill-1" },
        { value: "6", label: "Skgill-2" },
        { value: "7", label: "ww-3" },
        { value: "8", label: "Skill-4" },
        { value: "9", label: "Skill-1" },
        { value: "10", label: "Skill-2" },
        { value: "11", label: "Skill-3" },
        { value: "12", label: "Skill-4" },
    ];

    const options2 = [
        { value: "1", label: "Type-1" },
        { value: "2", label: "Type-2" },
        { value: "3", label: "Type-3" },
        { value: "4", label: "Type-4" },
    ];

    const options3 = [
        { value: "1", label: "Type-1" },
        { value: "2", label: "Type-2" },
        { value: "3", label: "Type-3" },
        { value: "4", label: "Type-4" },
    ];



    const imageUrl = "https://firebasestorage.googleapis.com/v0/b/capstone-project-wehire.appspot.com/o/cv%2Ffront-end-engineer-.png?alt=media&token=ce6da673-0bcd-415b-84cf-edb5fb4c7fc2";


    const [selectedOptions, setSelectedOptions] = useState([]);

    const [selectedOptions2, setSelectedOptions2] = useState([]);

    const [selectedOptions3, setSelectedOptions3] = useState([]);





    const handleChange = (selected) => {
        setSelectedOptions(selected);
    };
    const handleChange2 = (selected2) => {
        setSelectedOptions2(selected2);
    };
    const handleChange3 = (selected3) => {
        setSelectedOptions3(selected3);
    };



    return (
        <React.Fragment>
            <Section />
            <section className="section">
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
                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">First name:</label>
                                                    <input id="company-name" type="text" class="form-control resume" placeholder=""></input>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Last name:</label>
                                                    <input id="company-name" type="text" class="form-control resume" placeholder=""></input>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Email</label>
                                                    <input id="email-address" type="email" class="form-control resume" placeholder="abc@gmail.com"></input>
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Password</label>
                                                    <input id="number" type="text" class="form-control resume" placeholder="123456@abcxzy"></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Date of birth</label>
                                                    <input id="email-address" type="date" class="custom-date resume"></input>
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Phone Number</label>
                                                    <input id="number" type="number" class="form-control resume" placeholder="+8426265656"></input>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Avarage Salary</label>
                                                    <input id="email-address" type="number" class="form-control resume"></input>
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Year of Experience</label>
                                                    <input id="number" type="number" class="form-control resume" placeholder="2"></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
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
                                                    </div>
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
                                            </div>
                                        </div>
                                        <div class="col-lg-12 mt-2">
                                            <div class="btn btn-primary">Create </div>
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

import React, { useState, useEffect } from "react";
import Section from "../CreateDeveloperAccount/Section";
import Select from "react-select";
import axios from "axios";


const CreateDeveloperAccount = () => {
    document.title = "Create Developer Account";

    // Khai báo danh sách tùy chọn



    const imageUrl = "https://firebasestorage.googleapis.com/v0/b/capstone-project-wehire.appspot.com/o/cv%2Ffront-end-engineer-.png?alt=media&token=ce6da673-0bcd-415b-84cf-edb5fb4c7fc2";


    const [options, setOptions] = useState([]);
    const [options2, setOptions2] = useState([]);
    const [options3, setOptions3] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedOptions2, setSelectedOptions2] = useState([]);
    const [selectedOptions3, setSelectedOptions3] = useState([]);



    const handleChange = (selected) => {
        setSelectedOptions(selected);
    };
    const handleChange2 = (selected) => {
        setSelectedOptions2(selected);
    };
    const handleChange3 = (selected) => {
        setSelectedOptions3(selected);
    };
    useEffect(() => {
        const fetchData = async () => {
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

        };
        fetchData();

    }, []);




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
                                            <div className="form-group app-label mt-2">
                                                <label class="text-muted">Choose </label>
                                                <input id="cv" type="text" class="form-control resume" placeholder=""></input>
                                            </div>
                                        </div>
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

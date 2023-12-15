import React, { useState, useEffect } from "react";
import Select from "react-select";
import projectTypeServices from "../../../services/projectType.services";
import { Divider } from "antd";

const PageOne = ({ onButtonClick, projectName, selectedOptions, startday, endday, selectedStatus, description }) => {
    const [projectNameError, setProjectNameError] = useState(null);
    const [projectTypeError, setProjectTypeError] = useState(null);
    const [options2, setOptions2] = useState([]);
    const [selectedOptions2, setSelectedOptions2] = useState([]);
    const handleChange2 = (selected) => {
        setSelectedOptions2(selected);
    };

    useEffect(() => {
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
                if (selectedOptions) {
                    const requiredTypeName = selectedOptions.label;
                    const foundType = formattedTypes.find(
                        (type) => type.label === requiredTypeName
                    );
                    if (foundType) {
                        const newType = {
                            value: foundType.value,
                            label: foundType.label,
                        };
                        setSelectedOptions2(newType);
                    }
                }
            } catch (error) {
                console.error("Error fetching types:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log("projectName")
        console.log(projectName)
        console.log(selectedOptions)
        if (projectName) {
            document.getElementById("project-name").value = projectName;
        }

    }, []);

    const checkvalidate = () => {
        let check = true;
        if (!selectedOptions2.value) {
            setProjectTypeError("Select project type");
            check = false;
        } else {
            setProjectTypeError(null);
        }

        if (!document.getElementById("project-name").value) {
            setProjectNameError("Enter project name");
            check = false;
        } else {
            setProjectNameError(null);
        }
        if (check) {
            onButtonClick("pagetwo", {
                projectName: document.getElementById("project-name").value,
                selectedOptions: selectedOptions2,
                startday: startday,
                endday: endday,
                selectedStatus: selectedStatus,
                description: description,
            });
        }
    };



    return (
        <>
            <h4 class="text-dark" style={{ marginTop: "80px" }} >BASIC INFORMATION ENTRY</h4>
            <p style={{ fontWeight: "500", color: "#8f8484" }}>
                In this step, you'll have the first opportunity to define your project. You'll need to input the project name along with its type to clarify its objectives and scope. The project name will serve as the starting point, identifying the project's identity, while the project type will describe which field it belongs to, such as web development, cybersecurity or E-learning.
            </p>
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
                            <label style={{ color: "black", fontWeight: "700" }} class="">Project Name</label> <label style={{ color: "red" }}>*</label>
                            <input
                                id="project-name"
                                type="text"
                                class="form-control resume"
                                placeholder="Enter your project name..."
                                maxLength="100"
                                required
                            ></input>
                            {projectNameError && (
                                <p className="text-danger mt-2">
                                    {projectNameError}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group app-label mt-2">
                            <label style={{ color: "black", fontWeight: "700" }} class="">Project type</label> <label style={{ color: "red" }}>*</label>
                            <div className="form-button">
                                <Select
                                    options={options2}
                                    value={selectedOptions2}
                                    onChange={handleChange2}
                                    className="Select Select--level-highest"
                                    style={{ maxHeight: "2000px", overflowY: "auto" }}
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
                                    }}
                                />
                            </div>

                            {projectTypeError && (
                                <p className="text-danger mt-2">
                                    {projectTypeError}
                                </p>
                            )}
                        </div>
                    </div>

                </div>


                <div class="row" style={{ marginTop: "15px" }}>

                    <div class="col-lg-12 mt-2 d-flex justify-content-end gap-2">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => checkvalidate()}
                        >
                            Continues
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default PageOne;

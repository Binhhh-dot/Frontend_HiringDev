import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import skillService from "../../../services/skill.service";
import projectTypeServices from "../../../services/projectType.services";


const ProjectType = ({ skill, setSkill, ...props }) => {
    const [options, setOptions] = useState([]);


    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await projectTypeServices.getAllType();

                if (response.data && response.data.data) {
                    const formattedOptions = response.data.data.map((item) => ({
                        label: item.projectTypeName,
                        value: item.projectTypeId.toString(),
                    }));

                    setOptions(formattedOptions);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchOptions();
    }, []); // Empty dependency array ensures the effect runs once on component mount

    const colourStyles = {
        control: (styles) => ({
            ...styles,
            border: 0,
            boxShadow: "none",
            padding: "12px 0 12px 40px",
            margin: "-16px -6px 0 -52px",
            borderRadius: "0",
        }),
    };

    const setSkillValue = (selectedOption) => {
        if (!selectedOption) {
            setSkill(null); // Hoặc giá trị thích hợp để biểu thị hủy chọn
        } else {
            setSkill(selectedOption);
        }
    };

    return (
        <React.Fragment>
            <Select
                options={options}
                styles={colourStyles}
                className="selectForm__inner"
                name="choices-single-categories"
                id="choices-single-categories"
                aria-label="Default select example"
                value={skill}
                onChange={setSkillValue}
                isClearable
                placeholder="Select project type..."
            />
        </React.Fragment>
    );
};

export default ProjectType;

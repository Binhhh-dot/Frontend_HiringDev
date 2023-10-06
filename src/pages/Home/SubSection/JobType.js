import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

const JobType = ({skill, setSkill, ...props}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(
          "https://wehireapi.azurewebsites.net/api/Skill"
        );

        if (response.data && response.data.data) {
          // Transform API data into the format expected by react-select
          const formattedOptions = response.data.data.map((item) => ({
            label: item.skillName,
            value: item.skillId.toString(),
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

  const setSkillValue = (value) => {
    setSkill(value)
  }

  return (
    <React.Fragment>
      <Select
        isMulti
        options={options}
        styles={colourStyles}
        className="selectForm__inner"
        name="choices-single-categories"
        id="choices-single-categories"
        aria-label="Default select example"
        value={skill}
        onChange={setSkillValue}
      />
    </React.Fragment>
  );
};

export default JobType;

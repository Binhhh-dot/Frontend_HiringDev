import React, { useState, useEffect } from "react";
import Section from "../CreateHiringRequest/Section";
import Select from "react-select";

const CreateHiringRequest = () => {
  document.title = "Job List | Jobcy - Job Listing Template | Themesdesign";
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
        const response = await fetch("https://wehireapi.azurewebsites.net/api/Skill");
        const data = await response.json();

        // Filter skills with statusString === "Active"
        const activeSkills = data.data.filter(skill => skill.statusString === "Active");

        // Map skills to the format expected by react-select
        const formattedSkills = activeSkills.map(skill => ({
          value: skill.skillId.toString(),
          label: skill.skillName
        }));

        setOptions(formattedSkills);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
      try {
        const response2 = await fetch("https://wehireapi.azurewebsites.net/api/Type");
        const data2 = await response2.json();

        // Filter types with statusString === "Active"
        const activeTypes = data2.data.filter(type => type.statusString === "Active");

        // Map types to the format expected by react-select
        const formattedTypes = activeTypes.map(type => ({
          value: type.typeId.toString(),
          label: type.typeName
        }));

        setOptions2(formattedTypes);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
      try {
        const response3 = await fetch("https://wehireapi.azurewebsites.net/api/Level");
        const data3 = await response3.json();

        // Filter types with statusString === "Active"
        const activeLevels = data3.data.filter(level => level.statusString === "Active");

        // Map types to the format expected by react-select
        const formattedLevels = activeLevels.map(level => ({
          value: level.levelId.toString(),
          label: level.levelName
        }));

        setOptions3(formattedLevels);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <React.Fragment>
      <Section />
      <section class="section">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-10">
              <div class="rounded shadow bg-white p-4">
                <div class="custom-form">
                  <div id="message3"></div>
                  <form method="post" action="php/contact.php" name="contact-form" id="contact-form3">
                    <h4 class="text-dark mb-3">Post a New Job :</h4>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group app-label mt-2">
                          <label class="text-muted">Job Title</label>
                          <input id="company-name" type="text" class="form-control resume" placeholder=""></input>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group app-label mt-2">
                          <label class="text-muted">Number of developer</label>
                          <input id="email-address" type="number" class="form-control resume" placeholder="2"></input>

                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group app-label mt-2">
                          <label class="text-muted">Type of developer</label>
                          <div className="form-button">
                            <Select
                              options={options2}
                              value={selectedOptions2}
                              onChange={handleChange2}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group app-label mt-2">
                          <label class="text-muted">Level requirement</label>
                          <div className="form-button">
                            <Select
                              options={options3}
                              value={selectedOptions3}
                              onChange={handleChange3}
                            />
                          </div>
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="form-group app-label mt-2">
                          <label class="text-muted">Skill requirement</label>
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
                    </div>



                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group app-label mt-2">
                          <label class="text-muted">Budget</label>
                          <input id="email-address" type="number" class="form-control resume" placeholder="300$"></input>
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="form-group app-label mt-2">
                          <label class="text-muted">Duration</label>
                          <input id="number" type="date" class="form-control resume" placeholder=""></input>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group app-label mt-2">
                          <label class="text-muted">Job Description</label>
                          <textarea id="description" rows="6" class="form-control resume" placeholder=""></textarea>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-12 mt-2">
                        <div class="btn btn-primary">Post a Job</div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default CreateHiringRequest;

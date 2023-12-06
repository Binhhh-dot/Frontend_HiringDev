import React, { useState, useEffect } from "react";
import {
  Input,
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Button,
  Label,
} from "reactstrap";
import Select from "react-select";
import projectTypeServices from "../../../services/projectType.services";
import { Editor } from "@tinymce/tinymce-react";
import projectServices from "../../../services/project.services";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProjectPopup = (
  { isModalOpen, closeModal, projectId },
  ...props
) => {
  const [modal, setModal] = useState(false);
  const [projectNameFormUpdateProject, setProjectNameFormUpdateProject] =
    useState(null);

  const [descriptionFormUpdateProject, setDescriptionFormUpdateProject] =
    useState(null);

  const [startDateFormUpdateProject, setStartDateFormUpdateProject] =
    useState(null);
  const [endDateFormUpdateProject, setEndDateFormUpdateProject] =
    useState(null);

  let updateProjectSaved;
  const [optionProjectType, setOptionProjectType] = useState([]);
  const [selectOptionProjectType, setSelectOptionProjectType] = useState([]);
  const [projectTypeIdError, setProjectTypeIdError] = useState(null);
  const [projectNameError, setProjectNameError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [startDateError, setStartDateError] = useState(null);
  const [endDateError, setEndDateError] = useState(null);

  //-----------------------------------------------------------------------
  const openModal = () => {
    setModal(!modal);
  };

  const handleChange = (selected) => {
    setSelectOptionProjectType(selected);
  };

  const handleProjectNameChange = (event) => {
    const newValue = event.target.value;
    setProjectNameFormUpdateProject(newValue);
  };

  const handleDescriptionChange = (event) => {
    const newValue = event.target.value;
    setDescriptionFormUpdateProject(newValue);
  };

  const handleStartDateChange = (event) => {
    const newValue = event.target.value;
    setStartDateFormUpdateProject(newValue);
  };

  const handleEndDateChange = (event) => {
    const newValue = event.target.value;
    setEndDateFormUpdateProject(newValue);
  };
  //---------------------------------------------------------------------
  const fetchData = async () => {
    try {
      const response2 = await projectTypeServices.getAllType();
      const activeTypes = response2.data.data;

      let formattedTypes = activeTypes.map((type) => ({
        value: type.projectTypeId.toString(),
        label: type.projectTypeName,
      }));
      setOptionProjectType(formattedTypes);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  //---------------------------------------------------------------------------

  const fetchGetProjectById = async () => {
    let response;
    try {
      response = await projectServices.getProjectDetailByProjectId(projectId);
      console.log(response.data.data);
      setProjectNameFormUpdateProject(response.data.data.projectName);
      setDescriptionFormUpdateProject(response.data.data.description);
      setStartDateFormUpdateProject(response.data.data.startDate);
      setEndDateFormUpdateProject(response.data.data.endDate);
      const editor = window.tinymce.get("description"); // Giả sử 'description' là id của Editor
      if (editor) {
        editor.setContent(response.data.data.description);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchGetProjectById();
  }, [isModalOpen, projectId]);

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
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <div className="rounded shadow bg-white p-4">
                  <div className="custom-form">
                    <form
                      method="put"
                      action="php/contact.php"
                      name="updateProject-form"
                      id="updateProject-form"
                    >
                      <h4 className="text-dark mb-3">Update Project</h4>
                      <div className="Row">
                        <div className="form-group app-label mt-2">
                          <label className="text-muted">Project Name</label>
                          <input
                            id="project-name"
                            type="text"
                            className="form-control resume"
                            placeholder=""
                            maxlength="100"
                            required
                            value={projectNameFormUpdateProject}
                          ></input>
                          {projectNameError && (
                            <p className="text-danger mt-2">
                              {projectNameError}
                            </p>
                          )}
                        </div>

                        <div className="form-group app-label mt-2">
                          <label className="text-muted">Project Type</label>

                          <div className="form-button">
                            <Select
                              options={optionProjectType}
                              value={selectOptionProjectType}
                              onChange={handleChange}
                              className="Select Select--level-highest"
                              style={{ maxHeight: "2000px", overflowY: "auto" }}
                            />
                          </div>

                          {projectTypeIdError && (
                            <p className="text-danger mt-2">
                              {projectTypeIdError}
                            </p>
                          )}
                        </div>

                        <div className="form-group app-label mt-2">
                          <label className="text-muted">Star Date</label>
                          <input
                            id="start-date"
                            type="date"
                            class="form-control resume"
                            placeholder=""
                            value={startDateFormUpdateProject}
                          ></input>
                          {startDateError && (
                            <p className="text-danger mt-2">{startDateError}</p>
                          )}
                        </div>

                        <div className="form-group app-label mt-2">
                          <label className="text-muted">End Date</label>
                          <input
                            id="end-date"
                            type="date"
                            class="form-control resume"
                            placeholder=""
                            value={endDateFormUpdateProject}
                          ></input>
                          {endDateError && (
                            <p className="text-danger mt-2">{endDateError}</p>
                          )}
                        </div>

                        <div className="form-group app-label mt-2">
                          <label className="text-muted">Description</label>
                          <Editor
                            class="fix-height"
                            id="description"
                            apiKey="axy85kauuja11vgbfrm96qlmduhgfg6egrjpbjil00dfqpwf"
                            // onEditorChange={(newValue) => {
                            //   setValue(newValue);
                            // }}
                            init={{
                              plugins:
                                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                              //   plugins:
                              //     "a11ychecker advcode advlist advtable anchor autolink autoresize autosave casechange charmap checklist code codesample directionality  emoticons export  formatpainter fullscreen importcss  insertdatetime link linkchecker lists media mediaembed mentions  nonbreaking pagebreak pageembed permanentpen powerpaste preview quickbars save searchreplace table  template tinydrive tinymcespellchecker  visualblocks visualchars wordcount",
                              //
                            }}
                          />
                          {descriptionError && (
                            <p className="text-danger mt-2">
                              {descriptionError}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="Row">
                        <div className="col-lg-12 mt-2 d-flex justify-content-end gap-2">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            //onClick={}
                          >
                            Cancel
                          </button>

                          <button
                            type="button"
                            className="btn btn-primary"
                            //onClick={}
                          >
                            Update Project
                          </button>
                        </div>
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

export default UpdateProjectPopup;

import React, { useState, useEffect } from "react";
import { Input, Modal, ModalBody, Form, FormGroup, Label } from "reactstrap"; // Assuming you are using reactstrap for modal components
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Section from "../CreateProject/Section";
import Select from "react-select";
import axios from "axios";
import { RingLoader, HashLoader } from "react-spinners";
import skillService from "../../../services/skill.service";
import typeService from "../../../services/type.service";
import levelService from "../../../services/level.service";
import hiringRequestService from "../../../services/hiringrequest.service";
import scheduleTypeService from "../../../services/scheduleType";
import employmentTypeServices from "../../../services/employmentType.services";
import { Editor } from "@tinymce/tinymce-react";
import companyServices from "../../../services/company.services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import projectTypeServices from "../../../services/projectType.services";
import backgroundImage from "../../../assets/images/logo/Frame 1.png";
import projectServices from "../../../services/project.services";
import userImage from "../../../assets/images/user/img-00.jpg"
import userSerrvices from "../../../services/user.serrvices";
import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";
import PageThree from "./PageThree";
import MultiStepProgressBar from "./MultiStepProgressBar";

const CreateProject = () => {
  document.title = "Job List | WeHire - Job Listing Template | Themesdesign";
  const [selectedOptions2, setSelectedOptions2] = useState([]);
  const [selectedOptions3, setSelectedOptions3] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const today = new Date();
  const today2 = new Date();
  today.setDate(today.getDate() + 10);
  today2.setDate(today2.getDate() + 40);

  const [page, setPage] = useState("pageone");
  const [projectName, setProjectName] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const nextPage = (page, data) => {
    setPage(page);
    setProjectName(data.projectName)
    setStartDate(data.startday)
    setEndDate(data.endday)
    setSelectedOptions2(data.selectedOptions)
    setSelectedOptions3(data.selectedStatus)
    setValue(data.description)
    console.log("Received Props:", data.projectName, data.selectedOptions, data.startday, data.endday, data.selectedStatus, data.description)
  };

  const nextPageNumber = (pageNumber) => {
    switch (pageNumber) {
      case "1":
        setPage("pageone");
        break;
      case "2":
        setPage("pagetwo");
        break;
      case "3":
        setPage("pagethree");
        break;
      default:
        setPage("1");
    }
  };


  const navigate = useNavigate();
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === null) {
      navigate("/signin");
    } else if (role === "manager") {
      navigate("/error404");
    }
  });



  return (
    <React.Fragment>
      {loading && (
        <div className="overlay" style={{ zIndex: "2000" }}>
          <div className="spinner"></div>
        </div>
      )}
      <Section />
      <section class="section">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-10">
              <div class="rounded shadow bg-white p-4">
                <div class="custom-form">
                  <div id="message3"></div>
                  <h4 class="text-dark" style={{ textAlign: "center", marginBottom: "50px", fontSize: "35px" }} >Post a New Project :</h4>
                  <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
                  {
                    {
                      pageone: <PageOne onButtonClick={nextPage} projectName={projectName}
                        selectedOptions={selectedOptions2} startday={startDate} endday={endDate} selectedStatus={selectedOptions3} description={value} />,
                      pagetwo: <PageTwo onButtonClick={nextPage} projectName={projectName}
                        selectedOptions={selectedOptions2} startday={startDate} endday={endDate} selectedStatus={selectedOptions3} description={value} />,
                      pagethree: <PageThree onButtonClick={nextPage} projectName={projectName}
                        selectedOptions={selectedOptions2} startday={startDate} endday={endDate} selectedStatus={selectedOptions3} description={value} />,
                    }[page]
                  }

                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    </React.Fragment>
  );
};

export default CreateProject;

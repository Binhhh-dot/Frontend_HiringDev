import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Collapse, Input, Label, Row, FormGroup, Card, CardBody } from "reactstrap";
import axios from "axios";
import Select from "react-select";
import JobType from "../../Home/SubSection/JobType";
import { Form } from "react-bootstrap";
import hiringrequestService from "../../../services/hiringrequest.service";
import projectServices from "../../../services/project.services";
import projectTypeServices from "../../../services/projectType.services";
import ProjectType from "../../Home/SubSection/ProjectType";
import { Empty } from 'antd';
import reportServices from "../../../services/report.services";
import { Modal as AntdModal } from "antd";
import img0 from "../../../assets/images/user/img-00.jpg";
import transactionHistoryServices from "../../../services/transactionHistory.services";
import notificationServices from "../../../services/notification.services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBullhorn,
    faEllipsisVertical,
    faX,
    faPlus,
    faTimes,
    faEllipsis,
    faAngleRight,
    faAngleLeft,
    faGear,
    faCircle,
    faMobileScreen
} from "@fortawesome/free-solid-svg-icons";

const NotificationVacancyList = (a) => {
    //Apply Now Model
    const [jobVacancyList, setJobVacancyList] = useState([]);
    const navigate = useNavigate();

    const [options, setOptions] = useState([]);


    const fetchJobVacancies = async () => {
        let response;
        const userId = localStorage.getItem("userId");
        try {
            response = await notificationServices.getListNotificationByUserId(userId)
                ;
            setJobVacancyList(response.data.data);
        } catch (error) {
            console.error("Error fetching job vacancies:", error);
        }
    };


    useEffect(() => {
        fetchJobVacancies();
    }, []);



    //Set initial state  for showFulSkill using object id
    const initialSkillsState = jobVacancyList.reduce(
        (acc, job) => ({ ...acc, [job.id]: false }),
        {}
    );



    const handleNoti = async (jobVacancyListDetails) => {
        const page = jobVacancyListDetails.notificationTypeName;
        const routeId = jobVacancyListDetails.routeId;
        var url;
        if (page == "Hiring Request") {
            url = "/hiringrequestlistincompanypartnerdetail?Id=" + routeId;
            console.log(url)
        }
        if (page == "Interview") {
            url = "/hiringrequestlistincompanypartnerdetail?Id=" + routeId;
            console.log(url)
        }
        if (page == "Contract") {
            url = "/contractListHr";
            console.log(url)
        }
        if (page == "Project") {
            url = "/projectdetailhr?Id=" + routeId;
            console.log(url)
        }
        if (page == "Payment") {
            url = "/payment?Id=" + routeId;
            console.log(url)
        }
        const userId = localStorage.getItem("userId");
        try {
            const respone = await notificationServices.readNotification(jobVacancyListDetails.notificationId, userId);
            console.log(respone);
        } catch (error) {
            console.log(error);
        }
        navigate(url, { replace: true }); // Sử dụng replace: true để tải lại trang
    };

    return (
        <React.Fragment>
            <Row>
                <Col lg={12}>
                    <div>
                        {jobVacancyList.length > 0 ? (
                            <>
                                {jobVacancyList.map((jobVacancyListDetails, key) => (
                                    <div
                                        key={key}
                                        className={
                                            " card mt-4"
                                        }
                                        // to={`/projectdetailhr?Id=${jobVacancyListDetails.projectId}`}
                                        onClick={() => handleNoti(jobVacancyListDetails)}
                                    >
                                        <div className="p-4" style={{ color: "black" }}>
                                            <Row className="align-items-center">
                                                <Col md={1}>
                                                    <div className="d-flex justify-content-center">
                                                        {jobVacancyListDetails.notificationTypeName == "Hiring Request" && (
                                                            <i
                                                                className="uil uil-window-maximize"
                                                                style={{ fontSize: "50px" }}
                                                            ></i>
                                                        )}
                                                        {jobVacancyListDetails.notificationTypeName == "Project" && (
                                                            <i
                                                                className="uil uil-parking-square"
                                                                style={{ fontSize: "50px" }}
                                                            ></i>
                                                        )}
                                                        {jobVacancyListDetails.notificationTypeName == "Contract" && (
                                                            <i
                                                                className="uil uil-file-plus-alt"
                                                                style={{ fontSize: "50px" }}
                                                            ></i>
                                                        )}
                                                        {jobVacancyListDetails.notificationTypeName == "Interview" && (
                                                            <i
                                                                className="uil uil-users-alt"
                                                                style={{ fontSize: "50px" }}
                                                            ></i>
                                                        )}
                                                        {jobVacancyListDetails.notificationTypeName == "Payment" && (
                                                            <i
                                                                className="uil uil-bill"
                                                                style={{ fontSize: "50px" }}
                                                            ></i>
                                                        )}
                                                    </div>
                                                </Col>

                                                <Col md={10}>
                                                    <div>

                                                        {jobVacancyListDetails.isRead != true ? (
                                                            <>
                                                                <h5 className="fs-18 mb-0">
                                                                    <div
                                                                        className=""
                                                                    >
                                                                        {
                                                                            jobVacancyListDetails.content
                                                                        }
                                                                    </div>
                                                                </h5>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="fs-18 mb-0">
                                                                    <div
                                                                        className=""
                                                                    >
                                                                        {
                                                                            jobVacancyListDetails.content
                                                                        }
                                                                    </div>

                                                                </div>
                                                            </>
                                                        )}

                                                        <p className="mb-0 fs-15 " style={{ fontWeight: "500" }}>
                                                            {jobVacancyListDetails.isRead != true ? (
                                                                <>
                                                                    <i style={{ color: "green" }} className="mdi mdi-clock-outline"></i>{" "}
                                                                    <span style={{ color: "green" }}> {jobVacancyListDetails.createdTime}</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <i className="mdi mdi-clock-outline"></i>{" "}
                                                                    <span> {jobVacancyListDetails.createdTime}</span>
                                                                </>
                                                            )}
                                                        </p>
                                                    </div>
                                                </Col>
                                                <Col md={1}>
                                                    {jobVacancyListDetails.isRead != true && (
                                                        <FontAwesomeIcon icon={faCircle} style={{ fontSize: "10px", color: "green" }} />
                                                    )}
                                                </Col>
                                            </Row>
                                        </div>

                                    </div>
                                ))}
                            </>
                        ) : (
                            <Empty />
                        )}
                    </div>
                </Col>
            </Row>

        </React.Fragment>
    );
};

export default NotificationVacancyList;

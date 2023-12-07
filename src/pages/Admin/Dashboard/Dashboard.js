import React, { useEffect, useState } from "react";

import { Pie, Column, Bar } from '@ant-design/charts';
import 'react-toastify/dist/ReactToastify.css';
import dashboardServices from '../../../services/dashboard.services';
import '../Dashboard/dashboard.css'
import SiderBarWeb from "../SlideBar/SiderBarWeb";
import { Table, Space, Modal, Button, Form, message, Input, Select, Layout, Badge, Switch, Breadcrumb } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import img0 from "../../../assets/images/user/img-00.jpg"
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Content } = Layout;




const Dashboard = () => {

    const getFormattedDateRange = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);

        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        const formattedStartDate = startDate.toLocaleDateString(undefined, options);
        const formattedEndDate = endDate.toLocaleDateString(undefined, options);

        return `${formattedStartDate} - ${formattedEndDate}`;
    };


    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Get Dashboard Project
    const getFormattedCurrentDate = () => {
        const currentDate = new Date();
        return currentDate.toISOString().split('T')[0];
    };
    const [projectWeek, setProjectWeek] = useState(null);

    const [currentWeekProject, setCurrentWeekProject] = useState(getFormattedCurrentDate());

    const getStartOfWeek = (date) => {
        const currentDate = new Date(date);
        const dayOfWeek = currentDate.getDay();
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - dayOfWeek);
        return startOfWeek.toISOString().split('T')[0];
    };

    const getEndOfWeek = (date) => {
        const currentDate = new Date(date);
        const dayOfWeek = currentDate.getDay();
        const endOfWeek = new Date(currentDate);
        endOfWeek.setDate(currentDate.getDate() + (6 - dayOfWeek));
        return endOfWeek.toISOString().split('T')[0];
    };

    const fetchDashboardProject = async (week) => {
        try {
            setLoading(true);
            const response = await dashboardServices.getDashboardProject(week);
            setProjectWeek(response.data.data);
        } catch (error) {
            console.error("Error fetching dashboard project:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePreviousWeek = () => {
        const currentDate = new Date(currentWeekProject);
        currentDate.setDate(currentDate.getDate() - 7);
        const previousWeek = currentDate.toISOString().split('T')[0];
        setCurrentWeekProject(previousWeek);
        fetchDashboardProject(previousWeek);
    };

    const handleNextWeek = () => {
        const currentDate = new Date(currentWeekProject);
        currentDate.setDate(currentDate.getDate() + 7);
        const nextWeek = currentDate.toISOString().split('T')[0];
        setCurrentWeekProjectHiring(nextWeek);
        fetchDashboardHiringRequest(nextWeek);
    };

    useEffect(() => {
        fetchDashboardProject(currentWeekProject);
    }, [currentWeekProject]);


    const dataProject = [
        { week: 'Sunday', projects: projectWeek?.Sunday || 0 },
        { week: 'Monday', projects: projectWeek?.Monday || 0 },
        { week: 'Tuesday', projects: projectWeek?.Tuesday || 0 },
        { week: 'Wednesday', projects: projectWeek?.Wednesday || 0 },
        { week: 'Thursday', projects: projectWeek?.Thursday || 0 },
        { week: 'Friday', projects: projectWeek?.Friday || 0 },
        { week: 'Saturday', projects: projectWeek?.Saturday || 0 },

    ];

    const configProject = {
        data: dataProject,
        xField: 'week',
        yField: 'projects',
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        meta: {
            projects: { alias: 'Projects' },
        },
        color: '#00CED1',
    };




    // Get Dashboard Hiring


    const [hiringRequestWeek, setHiringRequestWeek] = useState(null);

    const [currentWeekHiring, setCurrentWeekProjectHiring] = useState(getFormattedCurrentDate());


    const fetchDashboardHiringRequest = async (week) => {
        try {
            setLoading(true);
            const response = await dashboardServices.getDashboardHiringRequest(week);
            setHiringRequestWeek(response.data.data);
        } catch (error) {
            console.error("Error fetching dashboard project:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePreviousWeekHiring = () => {
        const currentDate = new Date(currentWeekHiring);
        currentDate.setDate(currentDate.getDate() - 7);
        const previousWeek = currentDate.toISOString().split('T')[0];
        setCurrentWeekProjectHiring(previousWeek);
        fetchDashboardHiringRequest(previousWeek);
    };

    const handleNextWeekHiring = () => {
        const currentDate = new Date(currentWeekHiring);
        currentDate.setDate(currentDate.getDate() + 7);
        const nextWeek = currentDate.toISOString().split('T')[0];
        setCurrentWeekProjectHiring(nextWeek);
        fetchDashboardHiringRequest(nextWeek);

    };

    useEffect(() => {
        fetchDashboardHiringRequest(currentWeekHiring);
    }, [currentWeekProject]);


    const dataHiring = [
        { week: 'Sunday', projects: hiringRequestWeek?.Sunday || 0 },
        { week: 'Monday', projects: hiringRequestWeek?.Monday || 0 },
        { week: 'Tuesday', projects: hiringRequestWeek?.Tuesday || 0 },
        { week: 'Wednesday', projects: hiringRequestWeek?.Wednesday || 0 },
        { week: 'Thursday', projects: hiringRequestWeek?.Thursday || 0 },
        { week: 'Friday', projects: hiringRequestWeek?.Friday || 0 },
        { week: 'Saturday', projects: hiringRequestWeek?.Saturday || 0 },

    ];

    const configHiring = {
        data: dataHiring,
        xField: 'week',
        yField: 'projects',
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        meta: {
            projects: { alias: 'Hiring Requests' },
        },
        color: '#00CED1',
    };




    // const handlePreviousWeekHiring = () => {
    //     const currentDate = new Date(currentWeekHiring);
    //     currentDate.setDate(currentDate.getDate() - 7);
    //     const previousWeek = currentDate.toISOString().split('T')[0];
    //     setCurrentWeekProjectHiring(previousWeek);
    //     fetchDashboardHiringRequest(previousWeek);
    // };

    // const handleNextWeekHiring = () => {
    //     const currentDate = new Date();
    //     const nextDate = new Date(currentWeekHiring);
    //     nextDate.setDate(nextDate.getDate() + 7);
    //     if (nextDate <= currentDate) {
    //         const nextWeek = nextDate.toISOString().split('T')[0];
    //         setCurrentWeekProjectHiring(nextWeek);
    //         fetchDashboardHiringRequest(nextWeek);
    //     } else {
    //         // Display a toast notification if trying to navigate beyond the current date
    //         toast.error("Cannot navigate to future weeks.");
    //     }
    // };

    // useEffect(() => {
    //     fetchDashboardHiringRequest(currentWeekHiring);
    // }, [currentWeekHiring]);


    // const getDayNumber = (day) => {
    //     const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //     return days.indexOf(day);
    // };

    // const getFormattedDate = (dayOfWeek, targetDay) => {
    //     const today = new Date(targetDay);
    //     const currentDay = today.getDay();
    //     const daysToAdd = currentDay - getDayNumber(dayOfWeek);
    //     today.setDate(today.getDate() - daysToAdd);
    //     return today.toLocaleDateString(); // You can customize the date format here
    // };

    // const dataHiring = [
    //     { label: 'Sunday', day: 'Sun', date: getFormattedDate('Sunday', currentWeekHiring), projects: hiringRequestWeek?.Sunday || 0 },
    //     { label: 'Monday', day: 'Mon', date: getFormattedDate('Monday', currentWeekHiring), projects: hiringRequestWeek?.Monday || 0 },
    //     { label: 'Tuesday', day: 'Tue', date: getFormattedDate('Tuesday', currentWeekHiring), projects: hiringRequestWeek?.Tuesday || 0 },
    //     { label: 'Wednesday', day: 'Wed', date: getFormattedDate('Wednesday', currentWeekHiring), projects: hiringRequestWeek?.Wednesday || 0 },
    //     { label: 'Thursday', day: 'Thu', date: getFormattedDate('Thursday', currentWeekHiring), projects: hiringRequestWeek?.Thursday || 0 },
    //     { label: 'Friday', day: 'Fri', date: getFormattedDate('Friday', currentWeekHiring), projects: hiringRequestWeek?.Friday || 0 },
    //     { label: 'Saturday', day: 'Sat', date: getFormattedDate('Saturday', currentWeekHiring), projects: hiringRequestWeek?.Saturday || 0 },
    // ];

    // const config2 = {
    //     data: dataHiring,
    //     xField: 'date',
    //     yField: 'projects',
    //     label: {
    //         position: 'middle',
    //         style: {
    //             fill: '#FFFFFF',
    //             opacity: 0.6,
    //         },
    //     },
    //     xAxis: {
    //         label: {
    //             formatter: (value) => `${dataHiring.find((day) => day.date === value)?.day || ''}\n${value}`,
    //         },
    //     },
    //     meta: {
    //         projects: { alias: 'Projects Count' },
    //     },
    //     color: '#00CED1',
    // };


    //Get RecentHiringRequest

    const [listRecentHiringRequest, setRecentHiringRequest] = useState([]);

    const fetchRecentHiringRequest = async () => {
        try {
            const response = await dashboardServices.getDashboardRecentHiringRequest();
            // setRecentHiringRequest(response.data.data);
            const sortedData = response.data.data.sort((a, b) => a.requestId - b.requestId);
            setRecentHiringRequest(sortedData);
            return response;
        } catch (error) {
            console.error('Error fetching user paging:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchRecentHiringRequest().then((data) => {
            console.log('Skill data:', data);
        });
    }, []);

    //Get Dashboard
    const [hRInfo, setHrInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await dashboardServices.getDashboard();
                setHrInfo(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching hiring request detail overview:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    // Modal

    const pieChartData = hRInfo?.accountDashboard || {};

    const totalValue = pieChartData.totalDeveloper + pieChartData.totalManager + pieChartData.totalAdmin + pieChartData.totalHumanResource + pieChartData.totalStaff;

    const pieConfig = {
        width: 300,  // Điều chỉnh chiều rộng của biểu đồ
        height: 300, // Điều chỉnh chiều cao của biểu đồ
        appendPadding: 10,
        data: [
            { type: 'Developer', value: pieChartData.totalDeveloper || 0 },
            { type: 'Manager', value: pieChartData.totalManager || 0 },
            { type: 'Admin', value: pieChartData.totalAdmin || 0 },
            { type: 'HumanResource', value: pieChartData.totalHumanResource || 0 },
            { type: 'Staff', value: pieChartData.totalStaff || 0 },


        ],
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        innerRadius: 0.7,
        statistic: null,
        annotations: [
            {
                type: 'text',
                position: ['50%', '50%'],
                content: `${totalValue}`,
                style: {
                    fontSize: 35,
                    textAlign: 'center',
                    fontWeight: 'bold',
                },
            },
            {
                type: 'text',
                position: ['50%', '58%'], // Adjust the position as needed
                content: ' users',
                style: {
                    fontSize: 18,
                    textAlign: 'center',
                    opacity: 0.7,
                },
            },
        ],


        legend: {
            layout: 'vertical',
            position: 'right',
            itemName: {
                formatter: (text, item) => {
                    const type = item.value;
                    const count = pieChartData[`total${type}`] || 0;
                    return `${type}: ${count}`;
                },
                style: {
                    fontSize: 14,
                },
            },
        },
        interactions: [
            {
                type: 'element-custom', // Replace with the actual interaction type for your library
                cfg: {
                    start: [
                        { trigger: 'element:mouseenter', action: 'element:hover' },
                        { trigger: 'element:mouseleave', action: 'element:unhover' },
                    ],
                },
            },
        ],
        color: ['#FF8C00', '#8FBC8F', '#008B8B', '#008080', '#FA8072'],

    };



    return (
        <React.Fragment>
            <Layout style={{ minHeight: "100vh" }}>
                <SiderBarWeb choose={"menu-key1/sub-menu-key1/2"}></SiderBarWeb>
                <Layout>
                    <div
                        style={{
                            backgroundColor: "#FFFF",
                            height: "70px",
                            display: "flex",
                            alignItems: "center",
                            borderRadius: "7px",
                            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                            marginLeft: "30px",
                            marginRight: "30px",
                            marginBottom: "0px",
                        }}
                        className="mt-4 justify-content-end"
                    >
                        <div
                            className="d-flex gap-4 align-items-center"
                            style={{ height: "inherit" }}
                        >
                            <Space>
                                <Badge dot>
                                    <i
                                        className="uil uil-bell"
                                        style={{ color: "#8F78DF", fontSize: "20px" }}
                                    ></i>
                                </Badge>
                            </Space>
                            <Space>
                                <Badge dot>
                                    <i
                                        className="uil uil-envelope-open"
                                        style={{ color: "#8F78DF", fontSize: "20px" }}
                                    ></i>
                                </Badge>
                            </Space>

                            <div
                                className="p-2  d-flex gap-3 align-items-center"
                                style={{
                                    height: "inherit",
                                    backgroundColor: "#6546D2",
                                    color: "white",
                                    borderRadius: "10px",
                                }}
                            >
                                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                                    <DropdownToggle
                                        className="p-2 d-flex gap-3 align-items-center"
                                        style={{
                                            height: "inherit",
                                            backgroundColor: "#6546D2",
                                            color: "white",

                                            cursor: "pointer",
                                            border: "0px",
                                        }}
                                    >
                                        <div>
                                            <img
                                                src={img0}
                                                className="ms-1"
                                                style={{
                                                    borderRadius: "10px",
                                                    height: "50px",
                                                }}
                                            />
                                        </div>
                                        <div className="me-1 d-flex flex-column align-items-center">
                                            <span className="fs-18">Nik jone</span>
                                            <span>Available</span>
                                        </div>
                                    </DropdownToggle>
                                    <DropdownMenu
                                        style={{
                                            marginLeft: "-25px",
                                        }}
                                    >
                                        <DropdownItem style={{ padding: "0px" }}>
                                            <div>
                                                <Link to="#" className="dropdown-item">
                                                    Setting
                                                </Link>
                                            </div>
                                        </DropdownItem>

                                        <DropdownItem style={{ padding: "0px" }}>
                                            <div>
                                                <Link to="/signout" className="dropdown-item">
                                                    Logout
                                                </Link>
                                            </div>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            padding: "30px",
                            background: "white",
                            margin: "30px",
                            borderRadius: "12px",
                            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                        }}
                    >
                        <Content>

                            <div className="row">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="page-header">
                                        <h2 className="pageheader-title">Dashboard </h2>
                                    </div>
                                </div>
                            </div>
                            <div className="ecommerce-widget">
                                <div className="row">
                                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                                        <div className="card border-3 border-top border-top-primary">
                                            <div className="card-body">
                                                <h5 className="text-muted">Total Project</h5>
                                                <div className="metric-value d-inline-block">
                                                    {hRInfo && (
                                                        <h1>{hRInfo.totalProject}</h1>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                                        <div className="card border-3 border-top border-top-primary">
                                            <div className="card-body">
                                                <h5 className="text-muted">Total Hiring Request</h5>
                                                <div className="metric-value d-inline-block">
                                                    {hRInfo && (
                                                        <h1>{hRInfo.totalHiringRequest}</h1>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                                        <div className="card border-3 border-top border-top-primary">
                                            <div className="card-body">
                                                <h5 className="text-muted">Total User</h5>
                                                <div className="metric-value d-inline-block">
                                                    {hRInfo && (
                                                        <h1>{hRInfo.accountDashboard.totalUser}</h1>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                                        <div className="card border-3 border-top border-top-primary">
                                            <div className="card-body">
                                                <h5 className="text-muted">Total Money</h5>
                                                <div className="metric-value d-inline-block">
                                                    {hRInfo && (
                                                        <h1>{hRInfo.totalMoney}</h1>
                                                    )}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/* <div className="row">
                                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div className="card " >
                                            <div className="card-body">
                                                <h5 className="text-muted">Total Project</h5>
                                                <div className="metric-value d-inline-block">
                                                    {hRInfo && (
                                                        <h1>{hRInfo.totalProject}</h1>
                                                    )}
                                                </div>
                                                <div className="metric-label d-inline-block float-right text-success font-weight-bold">
                                            <span><i className="fa fa-fw fa-arrow-up" /></span><span>5.86%</span>
                                        </div>
                                            </div>
                                            <div id="sparkline-revenue" />
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="text-muted">Total Hiring Request</h5>
                                                <div className="metric-value d-inline-block">
                                                    {hRInfo && (
                                                        <h1>{hRInfo.totalHiringRequest}</h1>
                                                    )}
                                                </div>
                                                <div className="metric-label d-inline-block float-right text-success font-weight-bold">
                                            <span><i className="fa fa-fw fa-arrow-up" /></span><span>5.86%</span>
                                        </div>
                                            </div>
                                            <div id="sparkline-revenue2" />
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="text-muted">Total Money</h5>
                                                <div className="metric-value d-inline-block">
                                                    {hRInfo && (
                                                        <h1>{hRInfo.totalMoney}</h1>
                                                    )}
                                                </div>
                                                <div className="metric-label d-inline-block float-right text-primary font-weight-bold">
                                            <span>N/A</span>
                                        </div>
                                            </div>
                                            <div id="sparkline-revenue3" />
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="text-muted">Total User</h5>
                                                <div className="metric-value d-inline-block">
                                                    {hRInfo && (
                                                        <h1>{hRInfo.accountDashboard.totalUser}</h1>
                                                    )}
                                                </div>
                                                <div className="metric-label d-inline-block float-right text-secondary font-weight-bold">
                                                    <span>User</span>
                                                </div>
                                            </div>
                                            <div id="sparkline-revenue4" />
                                        </div>
                                    </div>
                                </div> */}

                                <div className="row">
                                    <div className="col-xl-6 col-lg-12 col-md-6 col-sm-12 col-12">
                                        <div className="card">
                                            <h5 className="card-header">Recent Hiring Requests</h5>
                                            <div className="card-body p-0">
                                                <div className="table-responsive">
                                                    <table className="table">
                                                        <thead className="bg-light">
                                                            <tr className="border-0">
                                                                <th className="border-0">Request Code</th>
                                                                <th className="border-0">JobTitle</th>
                                                                <th className="border-0">Duration</th>
                                                                <th className="border-0">Posted Time</th>
                                                                <th className="border-0">Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {listRecentHiringRequest.map((request) => (
                                                                <tr key={request.requestId}>

                                                                    <td>{request.requestCode}</td>
                                                                    <td>{request.jobTitle}</td>

                                                                    <td>{request.duration}</td>
                                                                    <td>{request.postedTime}</td>
                                                                    <td>
                                                                        <Badge
                                                                            status={request.statusString === 'Completed' ? 'success' : request.statusString === 'In Progress' ? 'processing' : 'error'}
                                                                            text={request.statusString}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            ))}

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-5 col-md-12 col-sm-12 col-12">
                                        <div className="card">
                                            <h5 className="card-header">Account by role</h5>
                                            <div className="card-body">
                                                {loading ? (
                                                    <p>Loading...</p>
                                                ) : error ? (
                                                    <p>{error}</p>
                                                ) : (
                                                    <div>

                                                        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
                                                            <div style={{ width: '100%' }}>
                                                                <Pie {...pieConfig} />
                                                            </div>
                                                            {/* You can add more charts or components as needed */}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="row">
                                    {/* <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="card">
                                    <h5 className="card-header"> Product Category</h5>
                                    <div className="card-body">
                                        <div className="ct-chart-category ct-golden-section" style={{ height: 315 }} />
                                        <div className="text-center m-t-40">
                                            <span className="legend-item mr-3">
                                                <span className="fa-xs text-primary mr-1 legend-tile"><i className="fa fa-fw fa-square-full " /></span><span className="legend-text">Man</span>
                                            </span>
                                            <span className="legend-item mr-3">
                                                <span className="fa-xs text-secondary mr-1 legend-tile"><i className="fa fa-fw fa-square-full" /></span>
                                                <span className="legend-text">Woman</span>
                                            </span>
                                            <span className="legend-item mr-3">
                                                <span className="fa-xs text-info mr-1 legend-tile"><i className="fa fa-fw fa-square-full" /></span>
                                                <span className="legend-text">Accessories</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="card">
                                            <div className="card-header">
                                                <h5 className="mb-0">Number Of Projects</h5>
                                            </div>
                                            <div className="card-body">
                                                <div>
                                                    <Column {...configProject} />
                                                </div>
                                            </div>
                                            <div className="container-with-background" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <div style={{ cursor: 'pointer', marginRight: '10px' }} onClick={handlePreviousWeek}>
                                                    <LeftOutlined style={{ fontSize: '14px', color: '#1890ff' }} />
                                                </div>
                                                <p style={{ marginRight: '10px' }}>
                                                    {`${getFormattedDateRange(getStartOfWeek(currentWeekProject), getEndOfWeek(currentWeekProject))}`}
                                                </p>
                                                <div style={{ cursor: 'pointer' }} onClick={handleNextWeek}>
                                                    <RightOutlined style={{ fontSize: '14px', color: '#1890ff' }} />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-12 col-md-6 col-sm-12 col-12">
                                        <div className="card">
                                            <div className="card-header">
                                                <h5 className="mb-0">Number Of Hiring Requests</h5>
                                            </div>
                                            <div className="card-body">
                                                <div>
                                                    <Column {...configHiring} />
                                                </div>
                                            </div>
                                            <div className="container-with-background" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <div style={{ cursor: 'pointer', marginRight: '10px' }} onClick={handlePreviousWeekHiring}>
                                                    <LeftOutlined style={{ fontSize: '14px', color: '#1890ff' }} />
                                                </div>
                                                <p style={{ marginRight: '10px' }}>
                                                    {`${getFormattedDateRange(getStartOfWeek(currentWeekHiring), getEndOfWeek(currentWeekHiring))}`}
                                                </p>
                                                <div style={{ cursor: 'pointer' }} onClick={handleNextWeekHiring}>
                                                    <RightOutlined style={{ fontSize: '14px', color: '#1890ff' }} />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>

                        </Content>
                    </div>
                </Layout>
            </Layout>
        </React.Fragment>

    )
}

export default Dashboard

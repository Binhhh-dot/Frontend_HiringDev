import React, { useEffect, useState } from 'react';
import {
    Table, Space, Modal, Button, Form, message, Input, Select, Layout, Badge, Switch, Breadcrumb
} from 'antd';

import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import {
    faPenToSquare,
    faTrashCan,
    faPlusSquare,
} from '@fortawesome/free-regular-svg-icons';
import { Link } from "react-router-dom";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";

import levelService from '../../../services/level.service';
import img0 from "../../../assets/images/user/img-00.jpg"

import { ExclamationCircleOutlined } from '@ant-design/icons';
import SliderBarWeb from "../SlideBar/SiderBarWeb";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const { Column } = Table;
const { Option } = Select;
const { Header, Footer, Sider, Content } = Layout;
const page = {
    pageSize: 9, // Number of items per page
};

const ManageLevel = () => {


    const [visibleModal1, setVisibleModal1] = useState(false);
    const [visibleModal2, setVisibleModal2] = useState(false);

    const showModal1 = () => {
        setVisibleModal1(true);
    };
    const showModal2 = () => {
        setVisibleModal2(true);
    };
    const handleOk = () => {
        setVisibleModal1(false);
        setVisibleModal2(false);


    };

    const handleCancel = () => {
        setVisibleModal1(false);
        setVisibleModal2(false);


    };
    const [form] = Form.useForm();

    const handleOkCreate = () => {
        form
            .validateFields()
            .then(async (values) => {
                await createLevel(values);
                form.resetFields();
                setVisibleModal1(false);
                await fetchManageLevel();

            })
            .catch((errorInfo) => {
                console.log("Validation Failed:", errorInfo);
            });
    };

    const handleCancelCreate = () => {
        form.resetFields();
        setVisibleModal1(false);
    };

    const createLevel = async (values) => {
        try {
            const response = await levelService.createLevel(
                values.levelName,
                values.levelDescription,

                3
            );
            let data = response.data;

            console.log("Save posted successfully:", data);
            toast.success("Create level successfully!")
        } catch (error) {
            console.error("Error posting job:", error);
            toast.error("Create level fail!")
        }
    };

    const [manageLevelList, setManageLevelList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState('');

    const fetchManageLevel = async () => {
        try {
            const response = await levelService.getAllLevel();
            setManageLevelList(response.data.data);
            return response;
        } catch (error) {
            console.error('Error fetching user paging:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchManageLevel().then((data) => {
            console.log('Level data:', data);
        });
    }, []);

    const showDescriptionPopup = (description) => {
        setSelectedDescription(description);
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
        setSelectedDescription('');
    };
    //Date

    const [editingRow, setEditingRow] = useState(null);
    const handleOkUpdate = async () => {

        form
            .validateFields()
            .then(async (values) => {
                if (editingRow) {
                    await updateLevel(editingRow.levelId, values);
                } form.resetFields();
                setEditingRow(null);
                await fetchManageLevel();

            })
            .catch((errorInfo) => {
                console.log("Validation Failed:", errorInfo);
            });
    };

    const handleCancelUpdate = () => {
        form.resetFields();
        setEditingRow(null);
    };

    const updateLevel = async (levelId, values) => {
        try {
            const response = await levelService.updateLevel(
                levelId,
                values.levelName1,
                values.levelDescription1,
                values.status1
            );

            let data = response.data;
            console.log("Update successful:", data);
            toast.success('Edit Level successfully!');

        } catch (error) {
            console.error("Error updating level:", error);
            toast.error('Edit level fail!');

            throw error;
        }
    };

    const handleEdit = (record) => {
        setEditingRow(record);
    };

    //Delete 
    const [levelId, setLevelId] = useState(null);
    const [switchStatusMap, setSwitchStatusMap] = useState({});


    const handleDeleteClick = (levelId) => {
        showModal2();
        setLevelId(levelId);
    };
    const handleDeleteConfirm = async (levelId) => {
        try {
            await levelService.deleteLevel(levelId);
            toast.success('Delete Level successfully!');
            setSwitchStatusMap((prevMap) => ({ ...prevMap, [levelId]: true }));


        } catch (error) {
            console.error("Update failed:", error);
            toast.error('Delete Level fails!');

        }
    };

    const handleOkDelete = async () => {
        try {
            await handleDeleteConfirm(levelId);
            setVisibleModal2(false);
        } catch (error) {
            // Handle any errors that might occur during the deletion process
            console.error("Error deleting user:", error);
            // Optionally, you can show an error message to the user
        }
    };
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    return (
        <React.Fragment>
            <Layout style={{ minHeight: "100vh" }}>
                <SliderBarWeb choose={"menu-key1/sub-menu-key1/1"}></SliderBarWeb>
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
                            padding: "0px 30px 0px 30px",
                            background: "white",
                            margin: "30px",
                            borderRadius: "12px",
                            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                        }}
                    >
                        <Content>
                            <div
                                style={{
                                    padding: 20,
                                    minHeight: 360,
                                }}
                            >
                                <Breadcrumb
                                    style={{
                                        margin: "13px 0",
                                    }}
                                >
                                    <Breadcrumb.Item>Management Infomation</Breadcrumb.Item>
                                    <Breadcrumb.Item>Manage Level</Breadcrumb.Item>
                                </Breadcrumb>
                                <a
                                    className="me-1 d-flex flex-column align-items-end"
                                    onClick={showModal1}
                                >
                                    <FontAwesomeIcon size="3x" icon={faPlusSquare} />
                                </a>
                                <Form form={form}>
                                    <Table className="custom-table"
                                        pagination={page}
                                        size="middle"
                                        components={{
                                            header: {
                                                cell: (props) => (
                                                    <th
                                                        {...props}
                                                        style={{
                                                            background: "hsl(253deg 61% 85%)",
                                                            border: "none",
                                                        }}
                                                    />
                                                ),
                                            },
                                        }}
                                        dataSource={manageLevelList}>
                                        <Column title="LevelId" dataIndex="levelId" key="levelId" />
                                        <Column
                                            title="Level Name"
                                            dataIndex="levelName"
                                            key="levelName"
                                            rules={[{ required: true, message: "Please input your level name!" }]}
                                            render={(text, record) => (
                                                <span>
                                                    {editingRow === record ? (
                                                        <Form.Item
                                                            name="levelName1"
                                                            value={text}
                                                            rules={[{ required: true, message: "Please input your level name!" }]}
                                                        >
                                                            <Input />
                                                        </Form.Item>
                                                    ) : (
                                                        text
                                                    )}
                                                </span>
                                            )}
                                        />
                                        <Column
                                            title="Level Description"
                                            dataIndex="levelDescription"
                                            key="levelDescription"
                                            rules={[{ required: true, message: "Please input your level description!" }]}
                                            render={(text, record) => (
                                                <span>
                                                    {editingRow === record ? (
                                                        <Form.Item
                                                            name="levelDescription1"
                                                            value={text}
                                                            rules={[{ required: true, message: "Please input your level description!" }]}
                                                        >
                                                            <Input />
                                                        </Form.Item>
                                                    ) : text.length > 50 ? (
                                                        <span>
                                                            {text.slice(0, 50)}...
                                                            <a onClick={() => showDescriptionPopup(text)}>More</a>
                                                        </span>
                                                    ) : (
                                                        text
                                                    )}
                                                </span>
                                            )}
                                        />

                                        <Column
                                            title="Status"
                                            dataIndex="statusString"
                                            key="statusString"
                                            rules={[{ required: true, message: "Please select the status!" }]}
                                            render={(text, record) => (
                                                <span>
                                                    {editingRow === record ? (
                                                        <Form.Item
                                                            name="status1"
                                                            value={record.text}
                                                            rules={[{ required: true, message: "Please select the status!" }]}
                                                        >
                                                            <Select
                                                            >
                                                                <Option value="1">Active</Option>
                                                                <Option value="0">Inactive</Option>
                                                            </Select>
                                                        </Form.Item>
                                                    ) : (
                                                        <span className={text === "Active" ? "badge text-bg-success" : "badge text-bg-danger"}>
                                                            {text}
                                                        </span>)}
                                                </span>
                                            )}
                                        />

                                        <Column
                                            title="Action"
                                            key="action"
                                            render={(_, record) => (
                                                <Space size="middle">
                                                    {editingRow === record ? (
                                                        <Button type="primary" style={{ backgroundColor: "purple", borderColor: "purple" }}
                                                            onClick={() => handleOkUpdate()}>
                                                            Save
                                                        </Button>
                                                    ) : (
                                                        <FontAwesomeIcon
                                                            style={{ color: '#6d73f6' }}
                                                            size="xl"
                                                            icon={faPenToSquare}
                                                            onClick={() => {
                                                                handleEdit(record);
                                                                const status1Value = record.statusString === 'Active' ? '1' : '0';

                                                                form.setFieldsValue({
                                                                    levelName1: record.levelName,
                                                                    levelDescription1: record.levelDescription,
                                                                    status1: status1Value,
                                                                });
                                                            }}
                                                        />
                                                    )}
                                                    <Switch
                                                        checked={record.statusString === 'Active' && (switchStatusMap[record.levelId] || true)}
                                                        onChange={(checked, event) => {
                                                            handleDeleteClick(record.levelId);
                                                            setSwitchStatusMap((prevMap) => ({ ...prevMap, [record.levelId]: checked }));
                                                        }}
                                                        size="small" // Set size to "small" for iOS-like appearance
                                                        style={{ backgroundColor: record.statusString === 'Active' ? '#4CD964' : '#D1D1D6', borderColor: record.statusString === 'Active' ? '#4CD964' : '#D1D1D6' }}
                                                    />
                                                </Space>
                                            )}
                                        />
                                    </Table>
                                </Form>

                                <Modal
                                    title="Create Level"
                                    centered
                                    visible={visibleModal1}
                                    onOk={handleOkCreate}
                                    onCancel={handleCancelCreate}
                                    footer={null}
                                >
                                    <Form form={form} layout="vertical">
                                        <Form.Item
                                            name="levelName"
                                            label="Level Name"
                                            rules={[
                                                { required: true, message: "Please input your level name!" },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name="levelDescription"
                                            label="Level Description"
                                            rules={[
                                                { required: true, message: "Please input your level description!" },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>


                                        {/* Add other form fields here */}
                                        <Form.Item style={{ textAlign: "center" }}>
                                            <Button
                                                type="primary"
                                                onClick={handleOkCreate}
                                                style={{ backgroundColor: "purple", borderColor: "purple" }}
                                            >
                                                Save
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Modal>

                                <Modal
                                    title="Full Description"
                                    visible={modalVisible}
                                    onCancel={handleModalClose}
                                    footer={[
                                        <Button key="close" onClick={handleModalClose}>
                                            Close
                                        </Button>,
                                    ]}
                                >
                                    <p>{selectedDescription}</p>
                                </Modal>

                                <Modal
                                    visible={visibleModal2}
                                    onOk={handleOkDelete}
                                    onCancel={handleCancel}
                                    footer={[
                                        <Button
                                            key="cancel"
                                            className="badge text-bg-secondary"
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </Button>,
                                        <Button
                                            key="confirm"
                                            className="badge text-bg-danger"
                                            onClick={handleOkDelete}
                                        >
                                            Confirm Delete
                                        </Button>,
                                    ]}
                                >
                                    <ExclamationCircleOutlined
                                        style={{
                                            fontSize: "40px",
                                            margin: "auto",
                                            display: "block",
                                            color: "yellow",
                                        }}
                                    />
                                    <p style={{ textAlign: "center", fontWeight: "bold" }}>
                                        Are you sure you want to delete your account?
                                    </p>
                                </Modal>
                            </div>
                        </Content>
                    </div>

                </Layout>
            </Layout>
        </React.Fragment>
    );
};

export default ManageLevel;

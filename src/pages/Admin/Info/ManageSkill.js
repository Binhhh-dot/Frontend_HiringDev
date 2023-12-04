import React, { useEffect, useState } from 'react';
import {
    Table, Space, Modal, Button, Form, message, Input, Select, Layout, Badge, Switch, Breadcrumb
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import skillService from '../../../services/skill.service';
import img0 from "../../../assets/images/user/img-00.jpg"
import SliderBarWeb from "../SlideBar/SiderBarWeb";

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Column } = Table;
const { Option } = Select;
const { Header, Footer, Sider, Content } = Layout;
const page = {
    pageSize: 9, // Number of items per page
};


const ManageSkill = () => {


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
                await createSkill(values);
                form.resetFields();
                setVisibleModal1(false);
                await fetchManageSkill();

            })
            .catch((errorInfo) => {
                console.log("Validation Failed:", errorInfo);
            });
    };

    const handleCancelCreate = () => {
        form.resetFields();
        setVisibleModal1(false);
    };

    const createSkill = async (values) => {
        try {
            const response = await skillService.createSkill(
                values.skillName,
                values.skillDescription,

                3
            );
            let data = response.data;

            console.log("Save posted successfully:", data);
            toast.success("Create Skill Succesfullt!")
        } catch (error) {
            console.error("Error posting job:", error);
            toast.error("Create Skill Fail")
        }
    };

    const [ManageSkillList, setManageSkillList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState('');

    const fetchManageSkill = async () => {
        try {
            const response = await skillService.getAllSkill();
            setManageSkillList(response.data.data);
            return response;
        } catch (error) {
            console.error('Error fetching user paging:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchManageSkill().then((data) => {
            console.log('Skill data:', data);
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
    //UpDate

    const [editingRow, setEditingRow] = useState(null);
    const handleOkUpdate = async () => {

        form
            .validateFields()
            .then(async (values) => {
                if (editingRow) {
                    await updateSkill(editingRow.skillId, values);
                } form.resetFields();
                setEditingRow(null);
                await fetchManageSkill();

            })
            .catch((errorInfo) => {
                console.log("Validation Failed:", errorInfo);
            });
    };

    const handleCancelUpdate = () => {
        form.resetFields();
        setEditingRow(null);
    };

    const updateSkill = async (skillId, values) => {
        try {
            const response = await skillService.updateSkill(
                skillId,
                values.skillName1,
                values.skillDescription1,
                values.status1
            );

            let data = response.data;
            console.log("Update successful:", data);
            toast.success("Edit Skill Successfully");
        } catch (error) {
            console.error("Error updating level:", error);
            toast.success("Edit Skill Fail!!")
            throw error;
        }
    };

    const handleEdit = (record) => {
        setEditingRow(record);
    };

    //Delete 
    const [switchStatusMap, setSwitchStatusMap] = useState({});

    const [skillId, setSkillId] = useState(null);

    const handleDeleteClick = (skillId) => {
        showModal2();
        setSkillId(skillId);
    };
    const handleDeleteConfirm = async (skillId) => {
        try {
            await skillService.deleteSkill(skillId);
            toast.success("Delete skill successfully!")
            setSwitchStatusMap((prevMap) => ({ ...prevMap, [skillId]: true }));


        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Delete Skill Fail!!!")
        }
    };

    const handleOkDelete = async () => {
        try {
            await handleDeleteConfirm(skillId);
            setVisibleModal2(false);
            await fetchManageSkill();

        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <React.Fragment>
            <Layout style={{ minHeight: "100vh" }}>
                <SliderBarWeb choose={"menu-key1/sub-menu-key1/2"}></SliderBarWeb>
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
                                }}>
                                <Breadcrumb
                                    style={{
                                        margin: "13px 0",
                                    }}
                                >
                                    <Breadcrumb.Item>Management Infomation</Breadcrumb.Item>
                                    <Breadcrumb.Item>Manage Skill</Breadcrumb.Item>
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
                                        }} dataSource={ManageSkillList}>
                                        <Column title="SkillId" dataIndex="skillId" key="skillId" />
                                        <Column
                                            title="Skill Name"
                                            dataIndex="skillName"
                                            key="skillName"
                                            rules={[{ required: true, message: "Please input your skill name!" }]}
                                            render={(text, record) => (
                                                <span>
                                                    {editingRow === record ? (
                                                        <Form.Item
                                                            name="skillName1"
                                                            value={text}
                                                            rules={[{ required: true, message: "Please input your skill name!" }]}
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
                                            title="Skill Description"
                                            dataIndex="skillDescription"
                                            key="skillDescription"
                                            rules={[{ required: true, message: "Please input your skill description!" }]}
                                            render={(text, record) => (
                                                <span>
                                                    {editingRow === record ? (
                                                        <Form.Item
                                                            name="skillDescription1"
                                                            value={text}
                                                            rules={[{ required: true, message: "Please input your skill description!" }]}
                                                        >
                                                            <Input />
                                                        </Form.Item>
                                                    ) : text.length > 50 ? (
                                                        <span>
                                                            {text.slice(0, 50)}...
                                                            <a onClick={() => showDescriptionPopup(text)}>Read More</a>
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
                                                                handleEdit(record); form.setFieldsValue({
                                                                    skillName1: record.skillName,
                                                                    skillDescription1: record.skillDescription,
                                                                    status1: record.statusString === 'Active' ? '1' : '0',
                                                                });
                                                            }}
                                                        />
                                                    )}
                                                    <Switch
                                                        checked={record.statusString === 'Active' && (switchStatusMap[record.skillId] || true)}
                                                        onChange={(checked, event) => {
                                                            handleDeleteClick(record.skillId);
                                                            setSwitchStatusMap((prevMap) => ({ ...prevMap, [record.skillId]: checked }));
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
                                    title="Create Skill"
                                    centered
                                    visible={visibleModal1}
                                    onOk={handleOkCreate}
                                    onCancel={handleCancelCreate}
                                    footer={null}
                                >
                                    <Form form={form} layout="vertical">
                                        <Form.Item
                                            name="skillName"
                                            label="Skill Name"
                                            rules={[
                                                { required: true, message: "Please input your level name!" },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name="skillDescription"
                                            label="Skill Description"
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
                                        Are you sure you want to delete this skill?
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

export default ManageSkill;

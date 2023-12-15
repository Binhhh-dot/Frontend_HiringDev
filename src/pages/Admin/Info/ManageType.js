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
import typeService from '../../../services/type.service';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import img0 from "../../../assets/images/user/img-00.jpg"
import SliderBarWeb from "../SlideBar/SiderBarWeb";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SiderBarWebAdmin from '../SlideBar/SiderBarWebAdmin';
import NavBarWebAdmin from '../NavBar/NavBarWebAdmin';


const { Column } = Table;
const { Option } = Select;
const { Header, Footer, Sider, Content } = Layout;
const page = {
    pageSize: 9, // Number of items per page
};



const ManageType = () => {


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
                await createType(values);
                form.resetFields();
                setVisibleModal1(false);
                await fetchManageType();

            })
            .catch((errorInfo) => {
                console.log("Validation Failed:", errorInfo);
            });
    };

    const handleCancelCreate = () => {
        form.resetFields();
        setVisibleModal1(false);
    };

    const createType = async (values) => {
        try {
            const response = await typeService.createType(
                values.typeName,
                values.typeDescription,

                3
            );
            let data = response.data;

            console.log("Save posted successfully:", data);
            toast.success("Create Type Successfully!")
        } catch (error) {
            console.error("Error posting job:", error);
            toast.error("Create Type Fail!!")
        }
    };

    const [ManageTypeList, setManageTypeList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState('');

    const fetchManageType = async () => {
        try {
            const response = await typeService.getAllType();
            setManageTypeList(response.data.data);
            return response;
        } catch (error) {
            console.error('Error fetching user paging:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchManageType().then((data) => {
            console.log('Type data:', data);
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
                    await updateType(editingRow.typeId, values);
                } form.resetFields();
                setEditingRow(null);
                await fetchManageType();

            })
            .catch((errorInfo) => {
                console.log("Validation Failed:", errorInfo);
            });
    };

    const handleCancelUpdate = () => {
        form.resetFields();
        setEditingRow(null);
    };

    const updateType = async (typeId, values) => {
        try {
            const response = await typeService.updateType(
                typeId,
                values.typeName1,
                values.typeDescription1,
                values.status1
            );

            let data = response.data;
            console.log("Update successful:", data);
            toast.success("Update Type Successfully")
        } catch (error) {
            console.error("Error updating level:", error);
            message.error({
                content: "Error updating level: " + error.message,
                duration: 2,
                style: {
                    marginTop: "50px",
                    marginRight: "50px",
                },
            });
            throw error;
        }
    };



    const handleEdit = (record) => {
        setEditingRow(record);
    };
    //DeLete
    const [switchStatusMap, setSwitchStatusMap] = useState({});

    const [typeId, setTypeId] = useState(null);

    const handleDeleteClick = (typeId) => {
        showModal2();
        setTypeId(typeId);
    };
    const handleDeleteConfirm = async (typeId) => {
        try {
            await typeService.deleteType(typeId);
            toast.success("Delete Type Successfully")
            setSwitchStatusMap((prevMap) => ({ ...prevMap, [typeId]: true }));

        } catch (error) {
            console.error("Update failed:", error);
            message.error({
                content: "Error Deleting type ",
                duration: 2,
                style: {
                    marginTop: "50px",
                    marginRight: "50px",
                },
            });
        }
    };

    const handleOkDelete = async () => {
        try {
            await handleDeleteConfirm(typeId);
            setVisibleModal2(false);
            await fetchManageType();

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
                <SiderBarWebAdmin choose={"menu-key/8"}></SiderBarWebAdmin>
                <Layout>
                    <NavBarWebAdmin></NavBarWebAdmin>
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
                                    <Breadcrumb.Item>Manage Type</Breadcrumb.Item>
                                </Breadcrumb>

                                <a
                                    className="me-1 d-flex flex-column align-items-end"
                                    onClick={showModal1}
                                >
                                    <FontAwesomeIcon size="2xl" icon={faPlusSquare} />
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
                                        }} dataSource={ManageTypeList}>
                                        <Column title="TypeId" dataIndex="typeId" key="typeId" />
                                        <Column
                                            title="Type Name"
                                            dataIndex="typeName"
                                            key="typeName"
                                            rules={[{ required: true, message: "Please input your type name!" }]}
                                            render={(text, record) => (
                                                <span>
                                                    {editingRow === record ? (
                                                        <Form.Item
                                                            name="typeName1"
                                                            value={text}
                                                            rules={[{ required: true, message: "Please input your type name!" }]}
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
                                            title="Type Description"
                                            dataIndex="typeDescription"
                                            key="typeDescription"
                                            rules={[{ required: true, message: "Please input your type description!" }]}
                                            render={(text, record) => (
                                                <span>
                                                    {editingRow === record ? (
                                                        <Form.Item
                                                            name="typeDescription1"
                                                            value={text}
                                                            rules={[{ required: true, message: "Please input your type description!" }]}
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
                                                                    typeName1: record.typeName,
                                                                    typeDescription1: record.typeDescription,
                                                                    status1: record.statusString === 'Active' ? '1' : '0',
                                                                });
                                                            }}
                                                        />
                                                    )}
                                                    <Switch
                                                        checked={record.statusString === 'Active' && (switchStatusMap[record.typeId] || true)}
                                                        onChange={(checked, event) => {
                                                            handleDeleteClick(record.typeId);
                                                            setSwitchStatusMap((prevMap) => ({ ...prevMap, [record.typeId]: checked }));
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
                                    title="Create Type"
                                    centered
                                    visible={visibleModal1}
                                    onOk={handleOkCreate}
                                    onCancel={handleCancelCreate}
                                    footer={null}
                                >
                                    <Form form={form} layout="vertical">
                                        <Form.Item
                                            name="typeName"
                                            label="Type Name"
                                            rules={[
                                                { required: true, message: "Please input your level name!" },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name="typeDescription"
                                            label="Type Description"
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

export default ManageType;

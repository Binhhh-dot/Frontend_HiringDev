import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Divider } from "antd";

const PageTwo = ({ onButtonClick, projectName, selectedOptions, startday, endday, selectedStatus, description }) => {
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");
    const [minDateEndDay, setMinDateEndDay] = useState("");

    const [startDateError, setStartDateError] = useState(null);
    const [endDateError, setEndDateError] = useState(null);
    const [statusError, setStatusError] = useState(null);
    const [options3, setOptions3] = useState([]);
    const [selectedOptions3, setSelectedOptions3] = useState([]);

    useEffect(() => {
        const liststatuses = [
            { label: 'Preparing', value: 1 },
            { label: 'In Process', value: 2 },
        ];
        setOptions3(liststatuses)

        if (selectedStatus) {
            const requiredTypeName = selectedStatus.label;
            const foundType = liststatuses.find(
                (type) => type.label === requiredTypeName
            );
            if (foundType) {
                const newType = {
                    value: foundType.value,
                    label: foundType.label,
                };
                setSelectedOptions3(newType);
            }
        }

        const today = new Date();
        today.setDate(today.getDate() + 30);
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        setMinDateEndDay(formattedDate)
    }, []);

    useEffect(() => {
        if (startday) {
            document.getElementById("start-date").value = startday;
        }
        if (endday) {
            document.getElementById("end-date").value = endday;
        }

    }, []);



    const checkvalidate = () => {
        let check = true;
        if (!document.getElementById("start-date").value) {
            setStartDateError("Enter start date of project");
            check = false;
        } else {
            setStartDateError(null);
        }
        if (!selectedOptions3.value) {
            setStatusError("Enter status of project");
            console.log("Sdadasd")
            check = false;
        } else {
            setStatusError(null);
        }
        if (!document.getElementById("end-date").value) {
            setEndDateError("Enter end date of project");
            check = false;
        } else {
            setEndDateError(null);
        }

        if (document.getElementById("start-date").value && document.getElementById("end-date").value) {
            const currentDate = new Date();
            const startdate = document.getElementById("start-date").value;
            const startdateTemp = new Date(startdate);
            if (startdateTemp < currentDate && selectedOptions3.value == 1) {
                setStatusError("With project status preparing, the project start time must be greater than the current date");
                check = false;
            }
            if (startdateTemp > currentDate && selectedOptions3.value == 2) {
                setStatusError("With project status being in process, the project start time must be less than the current date");
                check = false;
            }
        }
        if (check) {
            onButtonClick("pagethree", {
                projectName: projectName,
                selectedOptions: selectedOptions,
                startday: document.getElementById("start-date").value,
                endday: document.getElementById("end-date").value,
                selectedStatus: selectedOptions3,
                description: description,
            });
        }
    };

    const goback = () => {
        onButtonClick("pageone", {
            projectName: projectName,
            selectedOptions: selectedOptions,
            startday: document.getElementById("start-date").value,
            endday: document.getElementById("end-date").value,
            selectedStatus: selectedOptions3,
            description: description,
        });
    }


    const setMinDateEndDayByJs = () => {
        if (selectedOptions3.value == 1) {
            if (document.getElementById("start-date").value) {
                const startdate = document.getElementById("start-date").value;
                const startdateTemp = new Date(startdate);
                const currentDate = new Date();
                if (currentDate > startdateTemp) {
                    currentDate.setDate(currentDate.getDate() + 30)
                    const minDay = currentDate.toISOString().slice(0, 10);
                    setMinDateEndDay(minDay);
                } else {
                    startdateTemp.setDate(startdateTemp.getDate() + 30)
                    const minDay = startdateTemp.toISOString().slice(0, 10);
                    setMinDateEndDay(minDay);
                }
            } else {
                const currentDate = new Date();
                currentDate.setDate(currentDate.getDate() + 30)
                const minDay = currentDate.toISOString().slice(0, 10);
                setMinDateEndDay(minDay);
            }
        }
        if (selectedOptions3.value == 2) {
            if (document.getElementById("start-date").value) {
                const startdate = document.getElementById("start-date").value;
                const startdateTemp = new Date(startdate);
                const currentDate = new Date();
                if (currentDate > startdateTemp) {
                    currentDate.setDate(currentDate.getDate() + 30)
                    const minDay = currentDate.toISOString().slice(0, 10);
                    setMinDateEndDay(minDay);
                } else {
                    startdateTemp.setDate(startdateTemp.getDate() + 30)
                    const minDay = startdateTemp.toISOString().slice(0, 10);
                    setMinDateEndDay(minDay);
                }
            } else {
                const currentDate = new Date();
                currentDate.setDate(currentDate.getDate() + 30)
                const minDay = currentDate.toISOString().slice(0, 10);
                setMinDateEndDay(minDay);
            }
        }
        if (!selectedOptions3.value) {
            if (document.getElementById("start-date").value) {
                const startdate = document.getElementById("start-date").value;
                const startdateTemp = new Date(startdate);
                const currentDate = new Date();
                if (currentDate > startdateTemp) {
                    currentDate.setDate(currentDate.getDate() + 30)
                    const minDay = currentDate.toISOString().slice(0, 10);
                    setMinDateEndDay(minDay);
                } else {
                    startdateTemp.setDate(startdateTemp.getDate() + 30)
                    const minDay = startdateTemp.toISOString().slice(0, 10);
                    setMinDateEndDay(minDay);
                }
            } else {
                const currentDate = new Date();
                currentDate.setDate(currentDate.getDate() + 30)
                const minDay = currentDate.toISOString().slice(0, 10);
                setMinDateEndDay(minDay);
            }
        }
    };

    const setMinDateByJs = () => {
        const currentDate = new Date();
        const minDay = currentDate.toISOString().slice(0, 10);
        console.log("currentday")
        console.log(currentDate)
        console.log(minDay)
        if (selectedOptions3.value == 1) {
            if (document.getElementById("end-date").value) {
                const endDateValue = document.getElementById("end-date").value;
                const endDate = new Date(endDateValue);
                endDate.setDate(endDate.getDate() - 30);

                const minDay = endDate.toISOString().slice(0, 10);
                setMaxDate(minDay);

                const currentDate = new Date();
                currentDate.setDate(currentDate.getDate() + 1);
                const minDay2 = currentDate.toISOString().slice(0, 10);
                setMinDate(minDay2);
            } else {
                const currentDate = new Date();
                currentDate.setDate(currentDate.getDate() + 1);
                const minDay = currentDate.toISOString().slice(0, 10);
                setMinDate(minDay);
                setMaxDate(null);
            }
        }
        if (selectedOptions3.value == 2) {
            if (document.getElementById("end-date").value) {
                const currentDate = new Date();
                const minDay = currentDate.toISOString().slice(0, 10);
                setMinDate(null);
                setMaxDate(minDay);
            } else {
                const currentDate = new Date();
                const minDay = currentDate.toISOString().slice(0, 10);
                setMinDate(null);
                setMaxDate(minDay);
            }
        }
        if (!selectedOptions3.value) {
            if (document.getElementById("end-date").value) {
                const endDateValue = document.getElementById("end-date").value;
                const endDate = new Date(endDateValue);
                endDate.setDate(endDate.getDate() - 30);

                const minDay = endDate.toISOString().slice(0, 10);

                setMaxDate(minDay);
                setMinDate(null);
            } else {
                setMinDate(null);
                setMaxDate(null);
            }
        }
    };

    const handleChange3 = (selected) => {
        console.log("nhay do")
        setSelectedOptions3(selected);
    };

    useEffect(() => {
        setMinDateByJs();
    }, [selectedOptions3]);

    return (
        <>
            <h4 class="text-dark" style={{ marginTop: "80px" }} >TIMEFRAME AND PROJECT STATTUS DETERMINATION</h4>
            <p style={{ fontWeight: "500", color: "#8f8484" }}>
                In this step, you'll input information regarding the timeframe, including the start date and end date of the project. This is crucial for planning and managing the work schedule. Additionally, the project status will be determined here to indicate the current phase of the project: whether it's in process, preparing, or in the preparation phase.</p>

            <Divider style={{ borderColor: "#e5dcdc", margin: "40px 0" }}></Divider>
            <form
                method="post"
                action="php/contact.php"
                name="contact-form"
                id="contact-form3"
            >


                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group app-label mt-2">
                            <label style={{ color: "black", fontWeight: "700" }} class="">Project status</label> <label style={{ color: "red" }}>*</label>
                            <div className="form-button">
                                <Select
                                    options={options3}
                                    value={selectedOptions3}
                                    onChange={handleChange3}
                                    className="Select Select--level-highest"
                                    style={{ maxHeight: "2000px", overflowY: "auto" }}
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            backgroundColor:
                                                "rgba(255, 255, 255, 0.1)",
                                            border: "1px solid #ede8e8",
                                        }),
                                        singleValue: (provided) => ({
                                            ...provided,
                                            color: "black",
                                        }),
                                        placeholder: (provided) => ({
                                            ...provided,
                                            color: "#ADB5BD",
                                        }),
                                        menu: (provided) => ({
                                            ...provided,
                                            backgroundColor: "white",
                                        }),
                                        option: (provided, state) => ({
                                            ...provided,
                                            color: "black",
                                        }),
                                    }}
                                />
                            </div>

                            {statusError && (
                                <p className="text-danger mt-2">
                                    {statusError}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div class="row" >
                    <div class="col-md-6">
                        <div class="form-group app-label mt-2">
                            <label style={{ color: "black", fontWeight: "700" }} class="">Start Date</label> <label style={{ color: "red" }}>*</label>
                            <input
                                id="start-date"
                                type="date"
                                class="form-control resume"
                                placeholder=""
                                min={minDate}
                                max={maxDate}
                                onChange={setMinDateEndDayByJs}
                                required
                            ></input>
                            {startDateError && (
                                <p className="text-danger mt-2">{startDateError}</p>
                            )}
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="form-group app-label mt-2">
                            <label style={{ color: "black", fontWeight: "700" }} class="">End date</label> <label style={{ color: "red" }}>*</label>
                            <input
                                id="end-date"
                                type="date"
                                class="form-control resume"
                                min={minDateEndDay}
                                onChange={setMinDateByJs}
                                placeholder=""
                                required
                            ></input>
                            {endDateError && (
                                <p className="text-danger mt-2">{endDateError}</p>
                            )}
                        </div>
                    </div>
                </div>



                <div class="row" style={{ marginTop: "15px" }}>
                    <div class="col-lg-6 mt-2 d-flex justify-content-start gap-2">
                        <button
                            type="button"
                            className="btn btn-primary"
                            // onClick={handlePrevious}
                            onClick={() => goback()}
                        >
                            Previous
                        </button>
                    </div>
                    <div class="col-lg-6 mt-2 d-flex justify-content-end gap-2">
                        <button
                            type="button"
                            className="btn btn-primary"
                            // onClick={handleContinue}
                            onClick={() => checkvalidate()}

                        >
                            Continues
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default PageTwo;
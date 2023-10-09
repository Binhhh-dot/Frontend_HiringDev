import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Collapse, Input, Label } from "reactstrap";
import "./index.css";
import levelService from "../../../services/level.service";
import hiringrequestService from "../../../services/hiringrequest.service";

const Sidebar = () => {
  const [toggleFirst, setToggleFirst] = useState(true);
  const [toggleSecond, setToggleSecond] = useState(true);
  const [toggleThird, setToggleThird] = useState(true);
  const [toggleFourth, setToggleFourth] = useState(true);
  const [toggleFifth, setToggleFifth] = useState(true);
  const [value, setValue] = React.useState(50);
  //CheckBox
  const [isChecked, setIsChecked] = useState(true);
  const [levels, setLevels] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const [isDateChecked, setIsDateChecked] = useState(true);
  const handleDateOnChange = () => {
    setIsDateChecked(!isDateChecked);
  };
  useEffect(() => {
    // Hàm để lấy cấp độ từ API\

    const fetchLevels = async () => {
      try {
        const response = await levelService.getAllLevel();

        // Giả sử dữ liệu nằm trong response.data.data
        setLevels(response.data.data);
      } catch (error) {
        console.error("Lỗi khi lấy cấp độ:", error);
      }
    };

    // Gọi hàm fetchLevels khi thành phần được mount
    fetchLevels();
  }, []);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await hiringrequestService.getAllStatusHiringRequest();
        setStatuses(response.data.data);
      } catch (error) {
        console.error("Error fetching statuses:", error);
      }
    };

    fetchStatuses();
  }, []);
  return (
    <React.Fragment>
      <Col lg={3}>
        <div className="side-bar mt-5 mt-lg-0">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item mt-4">
              <h2 className="accordion-header" id="experienceOne">
                <Button
                  className="accordion-button"
                  onClick={(e) => {
                    e.preventDefault();
                    setToggleSecond(!toggleSecond);
                  }}
                  role="button"
                  id="collapseExample"
                >
                  Developer Level Required
                </Button>
              </h2>
              <Collapse isOpen={toggleSecond}>
                <div className="accordion-body">
                  <div className="side-title">
                    <div className="form-check mt-2" key="0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault2"
                        value=""
                        id={`flexCheckChecked0`}
                        defaultChecked
                      />
                      <label
                        className="form-check-label ms-2 text-muted"
                        htmlFor={`flexCheckChecked0`}
                      >
                        All
                      </label>
                    </div>
                    {levels.map((level) => (
                      <div className="form-check mt-2" key={level.levelId}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault2"
                          value=""
                          id={`flexCheckChecked${level.levelId}`}
                        />
                        <label
                          className="form-check-label ms-2 text-muted"
                          htmlFor={`flexCheckChecked${level.levelId}`}
                        >
                          {level.levelName}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </Collapse>
            </div>

            <div className="accordion-item mt-3">
              <h2 className="accordion-header" id="jobType">
                <Button
                  className="accordion-button"
                  onClick={(e) => {
                    e.preventDefault();
                    setToggleThird(!toggleThird);
                  }}
                  role="button"
                  id="collapseExample"
                >
                  Status Hiring Request
                </Button>
              </h2>
              <Collapse isOpen={toggleThird}>
                <div className="accordion-body">
                  <div className="side-title">
                    <div className="form-check mt-2">
                      <Input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault6"
                        defaultChecked
                      />
                      <label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="flexRadioDefault6"
                      >
                        All
                      </label>
                    </div>
                    {statuses.map((status) => (
                      <div className="form-check mt-2" key={status.statusId}>
                        <Input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id={`flexRadioDefault${status.statusId}`}
                        />
                        <label
                          className="form-check-label ms-2 text-muted"
                          htmlFor={`flexRadioDefault${status.statusId}`}
                        >
                          {status.statusName}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </Collapse>
            </div>

            <div className="accordion-item mt-3">
              <h2 className="accordion-header" id="datePosted">
                <Button
                  className="accordion-button"
                  onClick={(e) => {
                    e.preventDefault();
                    setToggleFourth(!toggleFourth);
                  }}
                  role="button"
                  id="collapseExample"
                >
                  Budget
                </Button>
              </h2>
              <Collapse isOpen={toggleFourth}>
                <div className="accordion-body">
                  <div className="side-title form-check-all">
                    <div className="form-check">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="checkAll"
                        value=""
                      />
                      <Label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="checkAll"
                      >
                        All
                      </Label>
                    </div>
                    <div className="form-check mt-2">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        name="datePosted"
                        value="last"
                        id="flexCheckChecked5"
                        checked={isDateChecked}
                        onChange={handleDateOnChange}
                      />
                      <Label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="flexCheckChecked5"
                      >
                        0-500$
                      </Label>
                    </div>
                    <div className="form-check mt-2">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        name="datePosted"
                        value="last"
                        id="flexCheckChecked6"
                      />
                      <Label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="flexCheckChecked6"
                      >
                        500-1000$
                      </Label>
                    </div>
                    <div className="form-check mt-2">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        name="datePosted"
                        value="last"
                        id="flexCheckChecked7"
                      />
                      <Label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="flexCheckChecked7"
                      >
                        1000-5000$
                      </Label>
                    </div>
                    <div className="form-check mt-2">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        name="datePosted"
                        value="last"
                        id="flexCheckChecked8"
                      />
                      <Label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="flexCheckChecked8"
                      >
                        Up to 5000$
                      </Label>
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>

            <div className="accordion-item mt-3">
              <h2 className="accordion-header" id="tagCloud">
                <Button
                  className="accordion-button"
                  onClick={(e) => {
                    e.preventDefault();
                    setToggleFifth(!toggleFifth);
                  }}
                  role="button"
                  id="collapseExample"
                >
                  Duration
                </Button>
              </h2>
            </div>
            <div className="mt-3 date-hiring-request">
              <input type="date" id="datepicker" />
              <p id="selectedDate"></p>
            </div>
          </div>
        </div>
      </Col>
    </React.Fragment>
  );
};

export default Sidebar;

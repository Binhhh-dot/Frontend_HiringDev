import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Collapse, Input, Label } from "reactstrap";
import "./Custome.css";

const Sidebar = () => {
  const [toggleFirst, setToggleFirst] = useState(true);
  const [toggleSecond, setToggleSecond] = useState(true);
  const [toggleThird, setToggleThird] = useState(true);
  const [toggleFourth, setToggleFourth] = useState(true);
  const [toggleFifth, setToggleFifth] = useState(true);
  const [value, setValue] = React.useState(50);
  //CheckBox
  const [isChecked, setIsChecked] = useState(true);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const [isDateChecked, setIsDateChecked] = useState(true);
  const handleDateOnChange = () => {
    setIsDateChecked(!isDateChecked);
  };

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
                    <div className="form-check mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked1"
                      />
                      <label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="flexCheckChecked1"
                      >
                        Fresher Developer
                      </label>
                    </div>
                    <div className="form-check mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked2"
                        checked={isChecked}
                        onChange={handleOnChange}
                      />
                      <label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="flexCheckChecked2"
                      >
                        Junior Developer
                      </label>
                    </div>
                    <div className="form-check mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked3"
                      />
                      <label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="flexCheckChecked3"
                      >
                        Mid-level Developer
                      </label>
                    </div>
                    <div className="form-check mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked4"
                      />
                      <label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="flexCheckChecked4"
                      >
                        Senior Developer
                      </label>
                    </div>

                    <div className="form-check mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked4"
                      />
                      <label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="flexCheckChecked4"
                      >
                        Leader
                      </label>
                    </div>
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
                        Looking For Dev
                      </label>
                    </div>
                    <div className="form-check mt-2">
                      <Input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                      />
                      <label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="flexRadioDefault2"
                      >
                        Interview
                      </label>
                    </div>
                    <div className="form-check mt-2">
                      <Input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault3"
                      />
                      <label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="flexRadioDefault3"
                      >
                        Cancelled
                      </label>
                    </div>
                    <div className="form-check mt-2">
                      <Input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault4"
                      />
                      <label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="flexRadioDefault4"
                      >
                        Out Of Time
                      </label>
                    </div>
                    <div className="form-check mt-2">
                      <Input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault4"
                      />
                      <label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="flexRadioDefault4"
                      >
                        Done
                      </label>
                    </div>
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
            <div className="mt-3">
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

import React from "react";
import Section from "../CreateHiringRequest/Section";

const CreateHiringRequest = () => {
    document.title = "Job List | Jobcy - Job Listing Template | Themesdesign";
    return (
        <React.Fragment>
            <Section />
            <section class="section">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-10">
                            <div class="rounded shadow bg-white p-4">
                                <div class="custom-form">
                                    <div id="message3"></div>
                                    <form method="post" action="php/contact.php" name="contact-form" id="contact-form3">
                                        <h4 class="text-dark mb-3">Post a New Job :</h4>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Job Title</label>
                                                    <input id="company-name" type="text" class="form-control resume" placeholder=""></input>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Number of developer</label>
                                                    <div class="form-button">
                                                        <select class="nice-select rounded">
                                                            <option data-display="Job Type">Number of developer</option>
                                                            <option value="1">Full Time</option>
                                                            <option value="2">Part Time</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Type of developer</label>
                                                    <div class="form-button">
                                                        <select class="nice-select rounded">
                                                            <option data-display="Category">Type of developer</option>
                                                            <option value="1">Web Developer</option>
                                                            <option value="2">PHP Developer</option>
                                                            <option value="3">Web Designer</option>
                                                            <option value="4">Graphic Designer</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Level requirement</label>
                                                    <div class="form-button">
                                                        <select class="nice-select rounded">
                                                            <option data-display="Level">Level requirement</option>
                                                            <option value="1">Level-1</option>
                                                            <option value="2">Level-2</option>
                                                            <option value="3">Level-3</option>
                                                            <option value="4">Level-4</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Skill requirement</label>
                                                    <div class="form-button">
                                                        <select class="nice-select rounded">
                                                            <option data-display="Experience">Skill requirement</option>
                                                            <option value="1">1 Year</option>
                                                            <option value="2">2 Year</option>
                                                            <option value="3">3 Year</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Budget</label>
                                                    <input id="email-address" type="number" class="form-control resume" placeholder="300$"></input>
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Duration</label>
                                                    <input id="number" type="date" class="form-control resume" placeholder=""></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Job Description</label>
                                                    <textarea id="description" rows="6" class="form-control resume" placeholder=""></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-12 mt-2">
                                                <div class="btn btn-primary">Post a Job</div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default CreateHiringRequest;
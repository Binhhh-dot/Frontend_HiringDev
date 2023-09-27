import React from "react";
import Section from "../CreateStaffAccount/Section";

const CreateStaffAccount = () => {
    document.title = "Create Staff Account";
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
                                        <h4 class="text-dark mb-3">Create new account staff</h4>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">First name:</label>
                                                    <input id="company-name" type="text" class="form-control resume" placeholder=""></input>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Last name:</label>
                                                    <input id="company-name" type="text" class="form-control resume" placeholder=""></input>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Email</label>
                                                    <input id="email-address" type="email" class="form-control resume" placeholder="abc@gmail.com"></input>
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Password</label>
                                                    <input id="number" type="text" class="form-control resume" placeholder="123456@abcxzy"></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Date of birth</label>
                                                    <input id="email-address" type="date" class="resume custom-date"></input>
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group app-label mt-2">
                                                    <label class="text-muted">Phone Number</label>
                                                    <input id="number" type="number" class="form-control resume" placeholder="+8426265656"></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-12 mt-2">
                                            <div class="btn btn-primary">Create </div>
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

export default CreateStaffAccount;
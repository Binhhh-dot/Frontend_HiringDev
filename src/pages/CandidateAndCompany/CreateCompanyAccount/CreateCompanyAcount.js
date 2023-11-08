import React, { useState, useEffect } from "react";
import Section from "../CreateCompanyAccount/Section";
import Select from "react-select";
import axios from "axios";
import companyServices from "../../../services/company.services";

const CreateCompanyAccount = () => {
  document.title = "Create Company Account";

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name&fbclid=IwAR2NFDKzrPsdQyN2Wfc6KNsyrDkMBakGFkvYe-urrPH33yawZDSIbIoxjX4"
    )
      .then((response) => response.json())
      .then((data) => {
        const formattedCountries = data.map((country) => ({
          value: country.name.common,
          label: country.name.common,
        }));
        setCountries(formattedCountries);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);


  const handleCreateCompany = async () => {
    const companyName = document.getElementById('company-name').value;
    const companyEmail = document.getElementById('email-address').value;
    const phoneNumber = document.getElementById('number').value;
    const address = document.getElementById('address').value;
    const country = selectedCountry ? selectedCountry.value : '';

    const fileInput = document.getElementById('company-image');
    const file = fileInput.files[0];
    // Get userId from localStorage
    const userId = localStorage.getItem('userId');

    console.log(file)
    const formData = new FormData();
    formData.append('companyName', companyName);
    formData.append('companyEmail', companyEmail);
    formData.append('phoneNumber', phoneNumber);
    formData.append('address', address);
    formData.append('country', country);
    formData.append('userId', userId);
    formData.append('file', file);
    console.log(formData)

    try {
      // Make API request
      const response = await companyServices.createCompany(formData);

      // Handle the response (you can show a success message or redirect to another page)
      console.log('API Response:', response.data);
      const responseUser = await axios.get(`https://wehireapi.azurewebsites.net/api/User/${userId}`);
      const userData = responseUser.data;
      localStorage.setItem('companyId', userData.data.companyId);
    } catch (error) {
      // Handle errors (show an error message or log the error)
      console.error('Error creating company:', error);
      console.log(error.response.data);
    }


  };


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
                  <form
                    method="post"
                    action="php/contact.php"
                    name="contact-form"
                    id="contact-form3"
                  >
                    <h4 class="text-dark mb-3">Create new account company</h4>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group app-label mt-2">
                          <label class="text-muted">Company name</label>
                          <input
                            id="company-name"
                            type="text"
                            class="form-control resume"
                            placeholder=""
                          ></input>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group app-label mt-2">
                          <label class="text-muted">Country</label>

                          <Select
                            options={countries}
                            value={selectedCountry}
                            onChange={(selectedOption) =>
                              setSelectedCountry(selectedOption)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group app-label mt-2">
                          <label class="text-muted">Email</label>
                          <input
                            id="email-address"
                            type="email"
                            class="form-control resume"
                            placeholder="abc@gmail.com"
                          ></input>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group app-label mt-2">
                          <label class="text-muted">Address</label>
                          <input
                            id="address"
                            type="address"
                            class="form-control resume"
                            placeholder="3 District"
                          ></input>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group app-label mt-2">
                          <label class="text-muted">Logo Company</label>
                          {/* Thay đổi thành ô upload file */}
                          <input
                            id="company-image"
                            type="file"
                            //class="resume custom-date"
                            className="form-control resume custom-file-input"
                          />
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="form-group app-label mt-2">
                          <label class="text-muted">Company Phone Number</label>
                          <input
                            id="number"
                            type="number"
                            class="form-control resume"
                            placeholder="+8426265656"
                          ></input>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12 mt-2">
                      <button type="button" className="btn btn-primary" onClick={handleCreateCompany}>
                        Create
                      </button>
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

export default CreateCompanyAccount;

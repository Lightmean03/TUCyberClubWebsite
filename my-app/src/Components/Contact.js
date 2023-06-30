import React, { useState, useEffect } from 'react';
import './Contact.css';
import { isEmail } from 'validator';

const Contact = () => {
  const [validated, setValidated] = useState(false);
  const [newContact, setNewContact] = useState({
    submitter_name: '',
    submitter_email: '',
    submitter_phone: '',
    submitter_message: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const validateForm = () => {
      let newErrors = {};

      if (!newContact.submitter_name) {
        newErrors.submitter_name = 'Please provide a name.';
      }

      if (!newContact.submitter_email) {
        newErrors.submitter_email = 'Please provide an email address.';
      } else if (!isEmail(newContact.submitter_email)) {
        newErrors.submitter_email = 'Please provide a valid email address.';
      }

      if (!newContact.submitter_phone) {
        newErrors.submitter_phone = 'Please provide a phone number.';
      } else if (
        !/^[\+]?([0-9][\s]?|[0-9]?)([(][0-9]{3}[)][\s]?|[0-9]{3}[-\s\.]?)[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
          newContact.submitter_phone
        )
      ) {
        newErrors.submitter_phone = 'Please provide a valid phone number.';
      }

      if (!newContact.submitter_message) {
        newErrors.submitter_message = 'Please provide a message.';
      }

      setErrors(newErrors);
    };

    validateForm();
  }, [newContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      // Process the form submission if there are no errors
      console.log('Form submitted:', newContact);
      handleReset();
    }

    setValidated(true);
  };

  const handleReset = () => {
    setNewContact({
      submitter_name: '',
      submitter_email: '',
      submitter_phone: '',
      submitter_message: '',
    });
    setValidated(false);
    setErrors({});
  };

  return (
    <div className="container">
      <h3 className="mb-4">CONTACT US</h3>
      <p>
        Please use the form below to send comments or suggestions. Your contact information is optional unless you desire a response.
      </p>
      <form
        noValidate
        onSubmit={handleSubmit}
        onReset={handleReset}
        id="contact-form"
      >
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                required
                type="text"
                name="submitter_name"
                value={newContact.submitter_name}
                onChange={handleChange}
                className={`form-control ${validated && errors.submitter_name ? 'is-invalid' : ''}`}
              />
              {validated && errors.submitter_name && (
                <div className="invalid-feedback">{errors.submitter_name}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                name="submitter_email"
                value={newContact.submitter_email}
                onChange={handleChange}
                required
                className={`form-control ${validated && errors.submitter_email ? 'is-invalid' : ''}`}
              />
              {validated && errors.submitter_email && (
                <div className="invalid-feedback">{errors.submitter_email}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="tel"
                name="submitter_phone"
                onChange={handleChange}
                value={newContact.submitter_phone}
                required
                className={`form-control ${validated && errors.submitter_phone ? 'is-invalid' : ''}`}
              />
              {validated && errors.submitter_phone && (
                <div className="invalid-feedback">{errors.submitter_phone}</div>
              )}
              <small className="text-muted">
                Specify country code, area code, etc., as applicable.
              </small>
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                rows={5}
                name="submitter_message"
                onChange={handleChange}
                value={newContact.submitter_message}
                className={`form-control ${validated && errors.submitter_message ? 'is-invalid' : ''}`}
              />
              {validated && errors.submitter_message && (
                <div className="invalid-feedback">{errors.submitter_message}</div>
              )}
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-2">
            <button className="btn btn-primary" type="submit">
              Send Message
            </button>
          </div>
          <div className="col-md-2">
            <button className="btn btn-outline-primary" type="reset">
              Reset
            </button>
          </div>
        </div>
        {validated && (
          <div className="alert alert-danger mt-3">
            Please fill out all required fields.
          </div>
        )}
      </form>
    </div>
  );
};

export default Contact;

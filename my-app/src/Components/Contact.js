import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Alert, Button } from 'react-bootstrap';
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
    <Container>
      <h3 className="mb-4">CONTACT US</h3>
      <p>
        Please use the form below to send comments or suggestions. Your contact information is optional unless you desire a response.
      </p>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        onReset={handleReset}
        id="contact-form"
      >
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                required
                type="text"
                name="submitter_name"
                value={newContact.submitter_name}
                onChange={handleChange}
                isInvalid={validated && !!errors.submitter_name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.submitter_name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address:</Form.Label>
              <Form.Control
                type="email"
                name="submitter_email"
                value={newContact.submitter_email}
                onChange={handleChange}
                required
                isInvalid={validated && !!errors.submitter_email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.submitter_email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone Number:</Form.Label>
              <Form.Control
                type="tel"
                name="submitter_phone"
                onChange={handleChange}
                value={newContact.submitter_phone}
                required
                isInvalid={validated && !!errors.submitter_phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.submitter_phone}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Specify country code, area code, etc., as applicable.
              </Form.Text>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-5" controlId="message">
              <Form.Label>Message:</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="submitter_message"
                onChange={handleChange}
                value={newContact.submitter_message}
                isInvalid={validated && !!errors.submitter_message}
              />
              <Form.Control.Feedback type="invalid">
                {errors.submitter_message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={2}>
            <Button variant="primary" type="submit">
              Send Message
            </Button>
          </Col>
          <Col md={2}>
            <Button variant="outline-primary" type="reset">
              Reset
            </Button>
          </Col>
        </Row>
        {validated && (
          <Alert variant="danger" className="mt-3">
            Please fill out all required fields.
          </Alert>
        )}
      </Form>
    </Container>
  );
};

export default Contact;

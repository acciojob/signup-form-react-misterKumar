import React, { useState } from 'react';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: 'male',
    phoneNumber: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    gender: '',
    phoneNumber: '',
    password: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required.';
    } else if (!/^[a-zA-Z0-9 ]+$/.test(formData.name)) {
      newErrors.name = 'Name is not alphanumeric.';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Email must contain @.';
    }

    if (!['male', 'female', 'other'].includes(formData.gender)) {
      newErrors.gender = 'Please identify as male, female or others.';
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone Number is required.';
    } else if (!/^\d+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone Number must contain only numbers.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must contain at least 6 letters.';
    }

    // Update error state
    setErrors(newErrors);

    // If there are validation errors, return without submitting
    if (Object.values(newErrors).some((error) => error !== '')) {
      setSubmitted(false);
      return;
    }

    // Extract username from email
    const username = formData.email.split('@')[0];

    // Display welcome message
    setErrors({}); // Clear previous error messages
    setSubmitted(true);
    alert(`Hello ${username}`);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear previous error messages on input change
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            data-testid="name"
          />
        </label>
        <span style={{ color: 'red' }}>{errors.name}</span>
        <br />

        <label>
          Email address:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            data-testid="email"
          />
        </label>
        <span style={{ color: 'red' }}>{errors.email}</span>
        <br />

        <label>
          Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            data-testid="gender"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <span style={{ color: 'red' }}>{errors.gender}</span>
        <br />

        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            data-testid="phoneNumber"
          />
        </label>
        <span style={{ color: 'red' }}>{errors.phoneNumber}</span>
        <br />

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            data-testid="password"
          />
        </label>
        <span style={{ color: 'red' }}>{errors.password}</span>
        <br />

        <button type="submit" data-testid="submit">
          Submit
        </button>
      </form>

      {submitted && <h2>Hello {formData.name}</h2>}
    </div>
  );
};

export default SignUpForm;

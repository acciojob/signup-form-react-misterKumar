import React, { useState } from 'react';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: 'male',
    phoneNumber: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.password
    ) {
      setError('All fields are mandatory.');
      return;
    }

    if (!/^[a-zA-Z0-9 ]+$/.test(formData.name)) {
      setError('Name is not alphanumeric.');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Email must contain @.');
      return;
    }

    if (!['male', 'female', 'other'].includes(formData.gender)) {
      setError('Please identify as male, female or others.');
      return;
    }

    if (!/^\d+$/.test(formData.phoneNumber)) {
      setError('Phone Number must contain only numbers.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must contain at least 6 letters.');
      return;
    }

    // Extract username from email
    const username = formData.email.split('@')[0];

    // Display welcome message
    setError(`Hello ${username}`);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear previous error messages on input change
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
        <br />

        <button type="submit" data-testid="submit">
          Submit
        </button>
      </form>

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default SignUpForm;

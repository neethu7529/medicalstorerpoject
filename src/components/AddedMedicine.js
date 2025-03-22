import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import MyNavbar from './Navbar';

function AddMed() {
  const [medicine, setMedicine] = useState('');
  const [stocks, setStocks] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      const userMedicines = JSON.parse(localStorage.getItem(loggedInUser.username)) || [];
      setMedicines(userMedicines);
    }
  }, []);

  const handleAddMedicine = (e) => {
    e.preventDefault();

    if (!medicine) {
      setError('Please enter a medicine name.');
      return;
    }

    if (!stocks || isNaN(stocks) || stocks <= 0) {
      setError('Please enter a valid number of stocks.');
      return;
    }

    if (medicines.length >= 5) {
      setError('You can only add up to 5 medicines.');
      return;
    }

    const currentDateTime = new Date().toLocaleString();//This gets the current date and time in a human-readable format (e.g., MM/DD/YYYY, HH:MM:SS).
    const newMedicine = { name: medicine, stocks: Number(stocks), addedAt: currentDateTime };
    const newMedicines = [...medicines, newMedicine];//This creates a new array of medicines by adding the newly created medicine to the existing list of medicines.
    setMedicines(newMedicines);

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    localStorage.setItem(loggedInUser.username, JSON.stringify(newMedicines));//This saves the updated list of medicines back to localStorage, using the logged-in user's username as the key.

    setMedicine('');//Clears the medicine and stocks input fields after the form submission.
    setStocks('');
    setSuccess('Medicine added successfully!');
    setError('');// Clears any existing error message.
  };

  return (
    <>
      <MyNavbar/>
      <Container className="mt-5">
        <h2>Add Medicine</h2>
        <Form onSubmit={handleAddMedicine}>
          <Form.Group controlId="formMedicine">
            <Form.Label>Medicine Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter medicine name"
              value={medicine}
              onChange={(e) => setMedicine(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formStocks">
            <Form.Label>Number of Stocks</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter number of stocks"
              value={stocks}
              onChange={(e) => setStocks(e.target.value)}
            />
          </Form.Group>

          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          {success && <Alert variant="success" className="mt-3">{success}</Alert>}

          <Button variant="primary" type="submit" className="mt-3">
            Add Medicine
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default AddMed;
import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Modal, Form, Alert, InputGroup, FormControl } from 'react-bootstrap';
import MyNavbar from './Navbar';

function MedicineList() {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [medicinesPerPage] = useState(3);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      const userMedicines = JSON.parse(localStorage.getItem(loggedInUser.username)) || [];
      setMedicines(userMedicines);
    }
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  const handleOpenModal = (type, medicine = null) => {
    setModalType(type);
    setSelectedMedicine(medicine);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMedicine(null);
    setError('');
    setSuccess('');
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    const form = e.target;
    const medicineName = form.medicineName.value.trim();
    const medicineStocks = form.medicineStocks.value.trim();

    if (!medicineName || !medicineStocks) {
      setError('Please enter both the medicine name and the number of stocks.');
      return;
    }

    if (modalType === 'add') {
      if (medicines.length >= 5) {
        setError('You can only add up to 5 medicines.');
        return;
      }

      const currentDateTime = new Date().toLocaleString();
      const newMedicine = { name: medicineName, stocks: Number(medicineStocks), addedAt: currentDateTime };
      const updatedMedicines = [...medicines, newMedicine];
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
      localStorage.setItem(loggedInUser.username, JSON.stringify(updatedMedicines));
      setMedicines(updatedMedicines);
      setSuccess('Medicine added successfully!');
    } else if (modalType === 'edit') {
      const updatedMedicines = medicines.map(med =>
        med.name === selectedMedicine.name ? { ...med, name: medicineName, stocks: Number(medicineStocks) } : med
      );
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
      localStorage.setItem(loggedInUser.username, JSON.stringify(updatedMedicines));
      setMedicines(updatedMedicines);
      setSuccess('Medicine updated successfully!');
    }

    handleCloseModal();
  };

  const handleDeleteConfirmation = (medicine) => {
    setSelectedMedicine(medicine);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    const updatedMedicines = medicines.filter(med => med.name !== selectedMedicine.name);
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    localStorage.setItem(loggedInUser.username, JSON.stringify(updatedMedicines));
    setMedicines(updatedMedicines);
    setSuccess('Medicine deleted successfully!');
    setShowDeleteModal(false);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedMedicine(null);
  };

  // Pagination 
  const indexOfLastMedicine = currentPage * medicinesPerPage;
  const indexOfFirstMedicine = indexOfLastMedicine - medicinesPerPage;
  const currentMedicines = medicines
    .filter(med => med.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(indexOfFirstMedicine, indexOfLastMedicine);

  const totalPages = Math.ceil(medicines.length / medicinesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <MyNavbar />
      <Container className="mt-5">
        <h2>Medicines List</h2>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search medicines"
            value={searchTerm}
            onChange={handleSearch}
          />
        </InputGroup>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No:</th>
              <th>Medicine Name</th>
              <th>Stocks</th>
              <th>Added On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentMedicines.length > 0 ? (
              currentMedicines.map((med, index) => (
                <tr key={index}>
                  <td>{indexOfFirstMedicine + index + 1}</td>
                  <td>{med.name}</td>
                  <td>{med.stocks}</td>
                  <td>{med.addedAt}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleOpenModal('edit', med)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDeleteConfirmation(med)} className="ml-2">Delete</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No medicines found</td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Pagination */}
        <div className="d-flex justify-content-between">
          <Button
            variant="primary"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <div>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index}
                variant="secondary"
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 ${currentPage === index + 1 ? 'active' : ''}`}
              >
                {index + 1}
              </Button>
            ))}
          </div>
          <Button
            variant="primary"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>

        {/* Mdl Add/Edit Medicine */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{modalType === 'add' ? 'Add Medicine' : 'Edit Medicine'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSave}>
              <Form.Group controlId="medicineName">
                <Form.Label>Medicine Name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedMedicine?.name || ''}
                />
              </Form.Group>
              <Form.Group controlId="medicineStocks" className="mt-3">
                <Form.Label>Number of Stocks</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={selectedMedicine?.stocks || ''}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                {modalType === 'add' ? 'Add' : 'Save'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Confirm Modal Deletion */}
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete the medicine "{selectedMedicine?.name}"?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default MedicineList;

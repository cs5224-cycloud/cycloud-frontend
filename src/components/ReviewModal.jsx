import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Button, Range, Form } from "react-bootstrap";

const ReviewModal = ({ showModal, handleClose, selectedRoute, username }) => {
  const [difficulty, setDifficulty] = useState(50);
  const [show, setShowSuccessfulSubmissionModal] = useState(false);
  const handleCloseSuccessfulSubmissionModal = () => setShowSuccessfulSubmissionModal(false);
  const handleShowSuccessfulSubmissionModal = () => setShowSuccessfulSubmissionModal(true);

  const handleDifficultyChange = ({ target: { value } }) =>
    setDifficulty(value);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log(form);
    console.log(difficulty);
  };

 const successfulSubmissionModal = (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseSuccessfulSubmissionModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );

  // TODO: Remove hardcode
  const submitReview = () => {
    fetch("https://ls3jn9hal4.execute-api.ap-southeast-1.amazonaws.com/Prod/insertRating ", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        route_id: selectedRoute,
        username: username,
        rating: difficulty.value
      })
    })
    .then((data) => {
      handleShowSuccessfulSubmissionModal()
    })
    .catch((error) => {
      console.log(error, "catch the hoop")
    })
  }


  return (
    <Modal show={showModal} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Review routes</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          Woohoo, you're reading this text in a modal!
          <Form.Group controlId="difficultyRange">
            <Form.Label>Route Difficulty</Form.Label>
            <Row>
              <Col md={1}>Easy</Col>
              <Col md={10}>
                <Form.Control
                  type="range"
                  onChange={handleDifficultyChange}
                  value={difficulty}
                />
              </Col>
              <Col>Hard</Col>
            </Row>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitReview} type="submit">
              Submit
            </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ReviewModal;

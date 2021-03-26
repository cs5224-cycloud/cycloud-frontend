import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Button, Range, Form } from "react-bootstrap";

const ReviewModal = ({ showModal, handleClose }) => {
  const [difficulty, setDifficulty] = useState(50);

  const handleDifficultyChange = ({ target: { value } }) =>
    setDifficulty(value);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log(form);
    console.log(difficulty);
  };

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
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ReviewModal;

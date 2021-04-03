import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Button, Range, Form } from "react-bootstrap";

const ReviewModal = ({ showModal, handleClose, selectedRoute, username }) => {
  const [difficulty, setDifficulty] = useState(50);
  const [views, setViews] = useState(50);
  const [traffic, setTraffic] = useState(50);
  const [review, setReview] = useState(50);
  const [show, setShowSuccessfulSubmissionModal] = useState(false);
  const handleCloseSuccessfulSubmissionModal = () => setShowSuccessfulSubmissionModal(false);
  const handleShowSuccessfulSubmissionModal = () => setShowSuccessfulSubmissionModal(true);

  const handleDifficultyChange = ({ target: { value } }) =>
    setDifficulty(value);
  
  const handleViewsChange = ({ target: { value } }) =>
    setViews(value);

  const handleTrafficChange = ({ target: { value } }) =>
    setTraffic(value);
  
  const handleReviewChange = ({ target: { value } }) =>
    setReview(value);
  
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log(form);
    console.log(difficulty);
    console.log(views.value);
  };

 const successfulSubmissionModal = (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, your review is submitted!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseSuccessfulSubmissionModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const submitReview = () => {
    fetch("https://ls3jn9hal4.execute-api.ap-southeast-1.amazonaws.com/Prod/insertRating", {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        route_id: selectedRoute,
        username: username,
        rating: review.value
      })
    })
    .then((data) => {
      handleShowSuccessfulSubmissionModal()
    })
    .catch((error) => {
      console.log(error, "catch the hoop")
    })

    fetch("https://ls3jn9hal4.execute-api.ap-southeast-1.amazonaws.com/Prod/insertTag", {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        route_id: selectedRoute,
        username: username,
        difficulty: difficulty.value,
        views: views.value,
        traffic: traffic.value
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
            <br></br>
            <Form.Label>Route Views</Form.Label>
            <Row>
              <Col md={1}>Nature</Col>
              <Col md={10}>
                <Form.Control
                  type="range"
                  onChange={handleViewsChange}
                  value={views}
                />
              </Col>
              <Col>City</Col>
            </Row>
            <br></br>
            <Form.Label>Route Traffic</Form.Label>
            <Row>
              <Col md={1}>Easy</Col>
              <Col md={10}>
                <Form.Control
                  type="range"
                  onChange={handleTrafficChange}
                  value={traffic}
                />
              </Col>
              <Col>Hard</Col>
            </Row>
            <Row></Row>
            <br></br>
            <Form.Label>Overall Experience</Form.Label>
            <Row>
              <Col md={1}>Bad</Col>
              <Col md={10}>
                <Form.Control
                  type="range"
                  onChange={handleReviewChange}
                  value={review}
                />
              </Col>
              <Col md={1}>Good</Col>
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

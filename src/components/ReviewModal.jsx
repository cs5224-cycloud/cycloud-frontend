import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Button, Range, Form } from "react-bootstrap";
import StarRatings from "react-star-ratings";

const ReviewModal = ({ showModal, handleClose, selectedRoute, username }) => {
  const [difficulty, setDifficulty] = useState(50);
  const [views, setViews] = useState(50);
  const [traffic, setTraffic] = useState(50);
  const [review, setReview] = useState(50);
  const [show, setShowSuccessfulSubmissionModal] = useState(false);
  const handleCloseSuccessfulSubmissionModal = () =>
    setShowSuccessfulSubmissionModal(false);
  const handleShowSuccessfulSubmissionModal = () =>
    setShowSuccessfulSubmissionModal(true);

  const handleDifficultyChange = ({ target: { value } }) =>
    setDifficulty(value);

  const handleViewsChange = ({ target: { value } }) => setViews(value);

  const handleTrafficChange = ({ target: { value } }) => setTraffic(value);

  const handleReviewChange = (newRating, name) => {
    setReview(newRating);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log("This is the difficulty value");
    console.log(difficulty);
    console.log(views);
    console.log(review);
  };

  const successfulSubmissionModal = (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, your review is submitted!</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleCloseSuccessfulSubmissionModal}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const submitReview = () => {
    fetch(
      "https://kems29t9qc.execute-api.ap-southeast-1.amazonaws.com/Prod/insertRating",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          route_id: selectedRoute,
          username: username,
          rating: review,
        }),
      }
    )
      .then((data) => {
        handleShowSuccessfulSubmissionModal();
      })
      .catch((error) => {
        console.log(error, "catch the hoop");
      });

    fetch(
      "https://kems29t9qc.execute-api.ap-southeast-1.amazonaws.com/Prod/insertTag",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          route_id: selectedRoute,
          username: username,
          difficulty: difficulty,
          views: views,
          traffic: traffic,
        }),
      }
    )
      .then((data) => {
        handleShowSuccessfulSubmissionModal();
      })
      .catch((error) => {
        console.log(error, "catch the hoop");
      });
  };

  return (
    <Modal show={showModal} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Review route</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="difficultyRange">
            <Form.Label>
              <b>Route Difficulty</b>
            </Form.Label>
            <Row>
              <Col md={1}>Easy</Col>
              <Col md={10}>
                <Form.Control
                  type="range"
                  onChange={handleDifficultyChange}
                  value={difficulty}
                />
              </Col>
              <Col md={1}>Hard</Col>
            </Row>
            <br></br>
            <Form.Label>
              <b>Route Views</b>
            </Form.Label>
            <Row>
              <Col md={1}>Nature</Col>
              <Col md={10}>
                <Form.Control
                  type="range"
                  onChange={handleViewsChange}
                  value={views}
                />
              </Col>
              <Col md={1}>City</Col>
            </Row>
            <br></br>
            <Form.Label>
              {" "}
              <b>Route Traffic</b>
            </Form.Label>
            <Row>
              <Col md={1}>Easy</Col>
              <Col md={10}>
                <Form.Control
                  type="range"
                  onChange={handleTrafficChange}
                  value={traffic}
                />
              </Col>
              <Col md={1}>Hard</Col>
            </Row>
            <Row></Row>
            <br></br>
            <Form.Label>
              <b>Overall Experience</b>
            </Form.Label>
            <Row>
              <Col md={1}></Col>
              <Col md={10}>
                <StarRatings
                  rating={review}
                  starHoverColor="yellow"
                  starRatedColor="gold"
                  changeRating={handleReviewChange}
                  numberOfStars={5}
                  name="rating"
                />
              </Col>
              <Col md={1}></Col>
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

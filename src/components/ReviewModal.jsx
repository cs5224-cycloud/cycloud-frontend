import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Button, Range, Form } from "react-bootstrap";
import StarRatings from "react-star-ratings";

const ReviewModal = ({ showModal, handleClose, selectedRoute, username }) => {
  const [difficulty, setDifficulty] = useState(3);
  const [views, setViews] = useState(3);
  const [traffic, setTraffic] = useState(3);
  const [review, setReview] = useState(3);

  const handleSuccessfulRating = () => alert("Thank you, your rating is successfully submitted!");
  const handleFailedRating = () => alert("You rated this route already!");
  const handleSuccessfulTagging = () => alert("Thank you, your tagging is successfully submitted!");
  const handleFailedTagging = () => alert("You tagged this route already!");

  const handleDifficultyChange = ({ target: { value } }) =>
    setDifficulty(value);

  const handleViewsChange = ({ target: { value } }) => setViews(value);

  const handleTrafficChange = ({ target: { value } }) => setTraffic(value);

  const handleReviewChange = (newRating, name) => {
    setReview(newRating);
  };

  const submitReview = (event) => {
    event.preventDefault();
    fetch(
      "https://kems29t9qc.execute-api.ap-southeast-1.amazonaws.com/Prod/insertRating",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          route_id: selectedRoute,
          username: username,
          rating: review,
        }),
      }
    )
      .then((data) => {
        handleSuccessfulRating();
      })
      .catch((error) => {
        handleFailedRating();
      });

    fetch(
      "https://kems29t9qc.execute-api.ap-southeast-1.amazonaws.com/Prod/insertTag",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
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
        handleSuccessfulTagging();
      })
      .catch((error) => {
        handleFailedTagging();
      });
  };

  return (
    <div>
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Review route</Modal.Title>
      </Modal.Header>
      <Form>
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
                  min={1}
                  max={5}
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
                  min={1}
                  max={5}
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
                  min={1}
                  max={5}
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
      </div>
  );
};

export default ReviewModal;

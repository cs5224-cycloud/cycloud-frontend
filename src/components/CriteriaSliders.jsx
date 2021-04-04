import React, { useEffect, useState } from "react";
import { Row, Col, Button, Range, Form } from "react-bootstrap";

const SLIDER_WIDTH = 10;
const LABEL_WIDTH = 1;

const CriteriaSliders = ({}) => {
  const [difficulty, setDifficulty] = useState(50);
  const [views, setViews] = useState(50);
  const [traffic, setTraffic] = useState(50);

  const handleDifficultyChange = ({ target: { value } }) =>
    setDifficulty(value);

  const handleViewsChange = ({ target: { value } }) => setViews(value);

  const handleTrafficChange = ({ target: { value } }) => setTraffic(value);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log(form);
    console.log(difficulty, views, traffic);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="difficultyRange">
          <Form.Label>Route Difficulty</Form.Label>
          <Row>
            <Col md={LABEL_WIDTH}>Easy</Col>
            <Col md={SLIDER_WIDTH}>
              <Form.Control
                type="range"
                onChange={handleDifficultyChange}
                value={difficulty}
              />
            </Col>
            <Col md={LABEL_WIDTH}>Hard</Col>
          </Row>
          <br></br>
          <Form.Label>Route Views</Form.Label>
          <Row>
            <Col md={LABEL_WIDTH}>Nature</Col>
            <Col md={SLIDER_WIDTH}>
              <Form.Control
                type="range"
                onChange={handleViewsChange}
                value={views}
              />
            </Col>
            <Col md={LABEL_WIDTH}>City</Col>
          </Row>
          <br></br>
          <Form.Label>Route Traffic</Form.Label>
          <Row>
            <Col md={LABEL_WIDTH}>Light</Col>
            <Col md={SLIDER_WIDTH}>
              <Form.Control
                type="range"
                onChange={handleTrafficChange}
                value={traffic}
              />
            </Col>
            <Col md={LABEL_WIDTH}>Heavy</Col>
          </Row>
        </Form.Group>
        <Button variant="secondary" type="submit">
          Find route
        </Button>
      </Form>
    </>
  );
};

export default CriteriaSliders;
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
    console.log(JSON.stringify({
      inputs: [
        { numberValue: difficulty },
        { numberValue: views },
        { numberValue: traffic }
      ]
    }));
  };

  const submitSearch = () => {
    fetch(
      "https://us-central1-sage-philosophy-309216.cloudfunctions.net/demo_reco_endpoint",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          inputs: [
            { numberValue: difficulty },
            { numberValue: views },
            { numberValue: traffic }
          ]
        }),
      }
    )
      .then((data) => {
        console.log("successful!");
        console.log(data);
        var parsedData2 = await (data.json());
        console.log(parsedData2);
        console.log(parsedData2.payload);
        var maximumScore = 0;
        var bestRoute = -1;
        for (var i = 0; i < parsedData.length; i++) {
          if (parsedData[i].tables.score > maximumScore) {
            maximumScore = parsedData[i].tables.score;
            bestRoute = parseInt(parsedData[i].tables.stringValue);
          }
        }
        this.props.submitHandler(bestRoute);
      })
      .catch((error) => {
        console.log(error, "catch the hoop");
      });

  }

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
        <Button variant="secondary" type="submit" onClick={submitSearch}>
          Find route
        </Button>
      </Form>
    </>
  );
};

export default CriteriaSliders;

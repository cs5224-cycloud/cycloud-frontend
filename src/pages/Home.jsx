import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  ToggleButtonGroup,
  ToggleButton,
  Accordion,
  CardGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { GoogleMap, LoadScript, useGoogleMap } from "@react-google-maps/api";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import { LeafletMap, ReviewModal } from "../components";
import { findRenderedDOMComponentWithClass } from "react-dom/cjs/react-dom-test-utils.development";

const WEATHER_24H =
  "https://api.data.gov.sg/v1/environment/24-hour-weather-forecast";

const Home = () => {
  //console.log(process.env);
  const [layers, setLayers] = useState(["pcn_all"]);
  const [showModal, setShowModal] = useState(false);

  const handleLayersChange = (layer) => {
    console.log(layer);
    setLayers(layer);
  };

  useEffect(() => {
    fetch(WEATHER_24H)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //console.log(data.items[0]);
      })
      .catch((err) => console.error(err));
  });

  return (
    <>
      <br />
      <Accordion defaultActiveKey="0">
        <Accordion.Toggle as={Card.Header} eventKey="0">
          <b id="accord-toggle">Options</b>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Container>
            <br />
            <Row>
              <Col>Criteria</Col>
              <Col md={6}>Routing</Col>
              <Col>Review</Col>
            </Row>
            <Row>
              <Col>
                <ToggleButtonGroup
                  type="checkbox"
                  value={layers}
                  onChange={handleLayersChange}
                  vertical={true}
                >
                  <ToggleButton variant="success" value={"pcn_all"}>
                    Display PCNs
                  </ToggleButton>
                </ToggleButtonGroup>
              </Col>
              <Col md={6}>
                <Form>
                  <Form.Group>
                    <Form.Label>Start</Form.Label>
                    <Form.Control type="search" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>End</Form.Label>
                    <Form.Control type="search" />
                  </Form.Group>
                </Form>
              </Col>
              <Col>
                <Button onClick={() => setShowModal(true)} variant="info">
                  Rate routes
                </Button>
              </Col>
            </Row>
          </Container>
        </Accordion.Collapse>
      </Accordion>
      <hr />
      <Row>
        <Col>
          <LeafletMap showPCN={layers.includes("pcn_all")} />
        </Col>
      </Row>
      <ReviewModal
        showModal={showModal}
        handleClose={() => setShowModal(false)}
      />
    </>
  );
};

export default Home;

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
  DropdownButton,
  Dropdown,
  Tabs,
  Tab,
} from "react-bootstrap";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import {
  LeafletMap,
  ReviewModal,
  Weather,
} from "../components";
import { findRenderedDOMComponentWithClass } from "react-dom/cjs/react-dom-test-utils.development";
import { Auth } from "aws-amplify";
import { Link, Redirect, useHistory } from "react-router-dom";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import path_start_end from "../configs/generated_path_start_end.json";
import SelectSearch from "react-select-search";
import fuzzySearch from "../services/fuzzySearch";

const SLIDER_WIDTH = 10;
const LABEL_WIDTH = 1;

const Home = () => {
  const [layers, setLayers] = useState(["pcn_all"]);
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(-1);

  const startEndsArray = path_start_end["paths"].map((path, index) => {
    return {
      name: path.start.trim() + " - " + path.end.trim(),
      value: index,
    };
  });

  const handleLayersChange = (layer) => {
    console.log(layer);
    setLayers(layer);
  };

  const handleChoseRoute = (route) => {
    setSelectedRoute(route);
  };

  Auth.currentAuthenticatedUser()
    .then((data) => {
      setIsLoggedIn(true);
      console.log(data.username);
      setUsername(data.username);
    })
    .catch((err) => {
      setIsLoggedIn(false);
    });

  const handleSignOut = (e) => {
    e.preventDefault();
    Auth.signOut();
    <Redirect to={{ pathname: "/" }} />;
  };

  const history = useHistory();
  const navigateToLogin = () => history.push("/login"); //eg.history.push('/login');

  const [difficulty, setDifficulty] = useState(3);
  const [views, setViews] = useState(3);
  const [traffic, setTraffic] = useState(3);

  const handleDifficultyChange = ({ target: { value } }) =>
    setDifficulty(value);

  const handleViewsChange = ({ target: { value } }) => setViews(value);

  const handleTrafficChange = ({ target: { value } }) => setTraffic(value);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log(form);
    console.log(difficulty, views, traffic);
    console.log(
      JSON.stringify({
        inputs: [
          { numberValue: difficulty },
          { numberValue: views },
          { numberValue: traffic },
        ],
      })
    );
  };

  const submitSearch = (event) => {
    event.preventDefault();
    fetch(
      "https://us-central1-sage-philosophy-309216.cloudfunctions.net/demo_reco_endpoint",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          inputs: [
            { numberValue: difficulty },
            { numberValue: views },
            { numberValue: traffic },
          ],
        }),
      }
    )
      .then((data) => data.json())
      .then((json) => {
        var parsedData = json.payload;
        var maximumScore = 0;
        var bestRoute = -1;
        for (var i = 0; i < parsedData.length; i++) {
          if (parsedData[i].tables.score > maximumScore) {
            maximumScore = parsedData[i].tables.score;
            bestRoute = parseInt(parsedData[i].tables.value.stringValue);
          }
        }
        console.log(bestRoute);
        handleChoseRoute(bestRoute);
      });
  };

  return (
    <>
      <br />
      {isLoggedIn && <h2>Welcome {username}!</h2>}
      {/* <ToggleButtonGroup
        type="checkbox"
        value={layers}
        onChange={handleLayersChange}
        vertical={true}
      >
        <ToggleButton variant="success" value={"pcn_all"}>
          Display PCNs
        </ToggleButton>
      </ToggleButtonGroup> */}
      <br />
      <Accordion defaultActiveKey="0">
        <Accordion.Toggle as={Card.Header} eventKey="0">
          <b id="accord-toggle1">4-Day Weather Forecast</b>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Col md={10}>
            <Weather />
          </Col>
        </Accordion.Collapse>
      </Accordion>
      <br />
      <Row className="justify-content-md-center">
        {selectedRoute != -1 ? (
          <h4>
            Selected route:{" "}
            {selectedRoute && startEndsArray[selectedRoute].name} [
            {selectedRoute}]
          </h4>
        ) : (
          <h4>
            <i>No route selected</i>
          </h4>
        )}
      </Row>

      <Accordion defaultActiveKey="0">
        <Accordion.Toggle as={Card.Header} eventKey="0">
          <b id="accord-toggle2">Options</b>
        </Accordion.Toggle>

        <Accordion.Collapse eventKey="0">
          <Container fluid>
            <br />
            <Row></Row>
            <Row>
              <Col md={9}>
                <Tabs defaultActiveKey="criteria" id="uncontrolled-tab">
                  <Tab eventKey="criteria" title="Search by Criteria">
                    <br />

                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="difficultyRange">
                        <Form.Label>
                          <b>Route Difficulty</b>
                        </Form.Label>
                        <Row>
                          <Col md={LABEL_WIDTH}>Easy</Col>
                          <Col md={SLIDER_WIDTH}>
                            <Form.Control
                              type="range"
                              onChange={handleDifficultyChange}
                              value={difficulty}
                              min={1}
                              max={5}
                            />
                          </Col>
                          <Col md={LABEL_WIDTH}>Hard</Col>
                        </Row>
                        <br></br>
                        <Form.Label>
                          <b>Route Views</b>
                        </Form.Label>
                        <Row>
                          <Col md={LABEL_WIDTH}>Nature</Col>
                          <Col md={SLIDER_WIDTH}>
                            <Form.Control
                              type="range"
                              onChange={handleViewsChange}
                              value={views}
                              min={1}
                              max={5}
                            />
                          </Col>
                          <Col md={LABEL_WIDTH}>City</Col>
                        </Row>
                        <br></br>
                        <Form.Label>
                          <b>Route Traffic</b>
                        </Form.Label>
                        <Row>
                          <Col md={LABEL_WIDTH}>Light</Col>
                          <Col md={SLIDER_WIDTH}>
                            <Form.Control
                              type="range"
                              onChange={handleTrafficChange}
                              value={traffic}
                              min={1}
                              max={5}
                            />
                          </Col>
                          <Col md={LABEL_WIDTH}>Heavy</Col>
                        </Row>
                      </Form.Group>
                      <Button
                        variant="success"
                        type="submit"
                        onClick={submitSearch}
                      >
                        Find route
                      </Button>
                    </Form>
                    {/* <CriteriaSliders submitHandler={handleChoseRoute}/> */}
                  </Tab>
                  <Tab eventKey="search" title="Search by Routes">
                    <br />
                    <SelectSearch
                      search
                      options={startEndsArray}
                      name="route"
                      placeholder="Choose your route"
                      filterOptions={fuzzySearch}
                      onChange={handleChoseRoute}
                    />
                  </Tab>
                </Tabs>
              </Col>
              {selectedRoute != -1 ? (
                <Col md={3} id="rateDiv">
                  <Button
                    onClick={
                      isLoggedIn ? () => setShowModal(true) : navigateToLogin
                    }
                    variant="info"
                  >
                    Rate route
                  </Button>
                </Col>
              ) : (
                <Col></Col>
              )}
            </Row>
          </Container>
        </Accordion.Collapse>
      </Accordion>
      <hr />
      <LeafletMap
        showPCN={layers.includes("pcn_all")}
        selectedRoute={selectedRoute}
      />
      {isLoggedIn && selectedRoute != -1 ? (
        <Button onClick={handleSignOut}>Sign out</Button>
      ) : (
        <h1></h1>
      )}
      <ReviewModal
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        selectedRoute={selectedRoute}
        username={username}
      />
    </>
  );
};

export default Home;

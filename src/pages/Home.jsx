// import React, { useEffect, useState } from "react";
// import { Button, Row, Col, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
// import { GoogleMap, LoadScript, useGoogleMap } from "@react-google-maps/api";
// import { MapComponent } from "../components";
// import { Link, Redirect } from "react-router-dom";
// import { Auth } from 'aws-amplify';
// import { AmplifySignOut } from "@aws-amplify/ui-react";

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
import { LeafletMap, ReviewModal, CriteriaSliders } from "../components";
import { findRenderedDOMComponentWithClass } from "react-dom/cjs/react-dom-test-utils.development";
import { Auth } from "aws-amplify";
import { Link, Redirect, useHistory } from "react-router-dom";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import path_start_end from "../configs/generated_path_start_end.json";
import SelectSearch from "react-select-search";
import fuzzySearch from "../services/fuzzySearch";

const WEATHER_24H =
  "https://api.data.gov.sg/v1/environment/24-hour-weather-forecast";

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

  const handleDropdown = (route) => {
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

  useEffect(() => {
    fetch(WEATHER_24H)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //console.log(data.items[0]);
      })
      .catch((err) => console.error(err));
  });
  const history = useHistory();
  const navigateToLogin = () => history.push("/login"); //eg.history.push('/login');

  return (
    <>
      {isLoggedIn ? <h1>Hi {username}</h1> : <h1></h1>}
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
      <br />
      <Accordion defaultActiveKey="0">
        <Accordion.Toggle as={Card.Header} eventKey="0">
          <b id="accord-toggle">Options</b>
        </Accordion.Toggle>

        <Accordion.Collapse eventKey="0">
          <Container fluid>
            <br />
            <Row>
              <Col md={9}>
                <Tabs defaultActiveKey="search" id="uncontrolled-tab">
                  <Tab eventKey="criteria" title="Search by Criteria">
                    <br />
                    <CriteriaSliders />
                  </Tab>
                  <Tab eventKey="search" title="Search by Routes">
                    <br />
                    <div>Route chosen: {selectedRoute}</div>
                    <SelectSearch
                      search
                      options={startEndsArray}
                      name="route"
                      placeholder="Choose your route"
                      filterOptions={fuzzySearch}
                      onChange={handleDropdown}
                    />
                  </Tab>
                </Tabs>
              </Col>
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
            </Row>
          </Container>
        </Accordion.Collapse>
      </Accordion>
      <hr />
      <LeafletMap
        showPCN={layers.includes("pcn_all")}
        selectedRoute={selectedRoute}
      />
      {isLoggedIn ? (
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

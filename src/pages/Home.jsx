import React, { useEffect, useState } from "react";
import { Row, Col, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { GoogleMap, LoadScript, useGoogleMap } from "@react-google-maps/api";
import { MapComponent } from "../components";
import { Link } from "react-router-dom";
import { Auth } from 'aws-amplify';
import { AmplifySignOut } from "@aws-amplify/ui-react";


const Home = () => {
  console.log(process.env);
  const [layers, setLayers] = useState(["pcn_all"]);
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLayersChange = (layer) => {
    console.log(layer);
    setLayers(layer);
  };

  Auth.currentAuthenticatedUser()
    .then((data) => {
      setIsLoggedIn(true)
      console.log(data.username)
      setUsername(data.username);
    })
    .catch(err => {
      console.log("APA SIH");
      setIsLoggedIn(false);
    }
    );


  return (
    <>
      <br />
      <Row>
        {isLoggedIn ? <h1>Hi {username}</h1> : <h1></h1>}
        <Col>
          <MapComponent showPCN={layers.includes("pcn_all")} />
        </Col>
        <Col>
          <ToggleButtonGroup
            type="checkbox"
            value={layers}
            onChange={handleLayersChange}
            vertical={true}
          >
            <ToggleButton variant="info" value={"pcn_all"}>
              Display PCNs
            </ToggleButton>
          </ToggleButtonGroup>
          <Link to="/review" className="btn btn-primary">Review</Link>
          {isLoggedIn ? <AmplifySignOut></AmplifySignOut> : <h1></h1>}
        </Col>
      </Row>
    </>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { Row, Col, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { GoogleMap, LoadScript, useGoogleMap } from "@react-google-maps/api";
import { MapComponent } from "../components";
import { Link } from "react-router-dom";
import { Auth } from 'aws-amplify';


const Home = () => {
  console.log(process.env);
  const [layers, setLayers] = useState(["pcn_all"]);

  const handleLayersChange = (layer) => {
    console.log(layer);
    setLayers(layer);
  };


  return (
    <>
      <br />
      <Row>
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
          <Link to="/review" className="btn btn-primary">Review</Link>
          </ToggleButtonGroup>
        </Col>
      </Row>
    </>
  );
};

export default Home;

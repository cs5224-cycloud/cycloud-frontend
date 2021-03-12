import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, useGoogleMap } from "@react-google-maps/api";

const containerStyle = {
  width: "1100px",
  height: "800px",
};

const center = {
  lat: 1.3521,
  lng: 103.8198,
};

const PCN_GEOJSON_URL =
  "https://a0167086w-nus-03032021.s3.amazonaws.com/park-connector-loop-geojson.geojson";

// https://codesandbox.io/s/usegooglemap-repro-2z4iw?from-embed=&file=/src/Map.js
const HookMapComponent = ({ showPCN }) => {
  const map = useGoogleMap();
  const [pcnJson, setPcnLayer] = useState({});

  useEffect(() => {
    fetch(PCN_GEOJSON_URL)
      .then((res) => res.json())
      .then((data) => {
        setPcnLayer(data);
        map.data.addGeoJson(data);
      })
      .catch((err) => console.error(err));
    // loadGeoJson for XHR requests
  }, [map]);

  console.log(map);

  useEffect(() => {
    if (showPCN) {
      map.data.setStyle(function (feature) {
        return { visible: true, strokeColor: "lawngreen" };
      });
    } else {
      map.data.setStyle(function (feature) {
        console.log(feature); // use conditional statements to filter features
        return { visible: false };
      });
    }
  }, [showPCN]);

  return null;
};

const MemoizedHookMapComponent = React.memo(HookMapComponent);

const MapComponent = ({ showPCN }) => {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11}>
        <MemoizedHookMapComponent showPCN={showPCN} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;

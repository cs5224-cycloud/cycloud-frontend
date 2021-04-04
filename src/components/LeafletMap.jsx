import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import GeneratedRoutes from "../configs/generated.json";
import path_with_amenities from "../configs/generated_path_with_amenities.json";

const center = [1.3521, 103.8198];

const PCN_GEOJSON_URL =
  "https://a0167086w-nus-03032021.s3.amazonaws.com/park-connector-loop-geojson.geojson";

const AMENITIES_GEOJSON_URL =
  "https://a0167086w-nus-03032021.s3.amazonaws.com/park-facilities-geojson.geojson";

// initial geojson placeholder
const geojsonFeature = {
  type: "Feature",
  properties: {
    name: "Coors Field",
    amenity: "Baseball Stadium",
    popupContent: "This is where the Rockies play!",
  },
  geometry: {
    type: "Point",
    coordinates: [-104.99404, 39.75621],
  },
};

const LeafletMap = ({ showPCN, selectedRoute }) => {
  const [pcnJson, setPcnLayer] = useState(geojsonFeature);
  const [amenitiesGeoJson, setAmenitiesGeoJson] = useState(geojsonFeature);
  const [jsonLoaded, setJsonLoaded] = useState(0);

  const selectedPath = path_with_amenities["paths"][selectedRoute];

  useEffect(() => {
    fetch(PCN_GEOJSON_URL)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        setPcnLayer(data);
        setJsonLoaded(1);
      })
      .catch((err) => console.error(err));

    fetch(AMENITIES_GEOJSON_URL)
      .then((res) => res.json())
      .then((data) => {
        setAmenitiesGeoJson(data);
      });
  }, []);

  useEffect(() => {
    console.log("pcn shown");
  }, [showPCN]);

  return (
    <MapContainer center={center} zoom={12} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {showPCN && (
        <GeoJSON
          key={selectedRoute + jsonLoaded}
          data={pcnJson}
          style={(feature) => {
            //console.log(feature);
          }}
          filter={(geoJsonFeature) => {
            let kmlName = geoJsonFeature["properties"]["Name"];
            kmlName = String(kmlName).slice(4);
            // show all pcn paths
            if (selectedRoute == -1) {
              return true;
            } else if (
              // check if path_with_amenities based on the selected route contains current kml obtained from geojson
              selectedPath["kml"].includes(parseInt(kmlName) - 1)
            ) {
              return true;
            } else {
              return false;
            }
          }}
        />
      )}
      <GeoJSON
        key={selectedRoute}
        data={amenitiesGeoJson}
        style={{ backgroundColor: "green" }}
        filter={(feature) => {
          let kmlName = feature["properties"]["Name"];
          kmlName = String(kmlName).slice(4);
          if (selectedRoute < 0) {
            return false;
          } else if (selectedPath["amenities"].includes(parseInt(kmlName) - 1)) {
            return true;
          }
        }}
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;

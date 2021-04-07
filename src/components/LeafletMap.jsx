import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import GeneratedRoutes from "../configs/generated.json";
import path_with_amenities from "../configs/generated_path_with_amenities.json";
import L, { latLng } from "leaflet";

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

const parser = new DOMParser();
const parseAmenityType = (html) => {
  const htmlDoc = parser.parseFromString(html, "text/html");
  var tr = htmlDoc.querySelectorAll("table tr");
  if (tr[1].querySelector("th").innerHTML == "CLASS") {
    return tr[1].querySelector("td").innerHTML;
  }
};

const trimDescription = (html) => {
  const htmlDoc = parser.parseFromString(html, "text/html");
  var rows = htmlDoc.querySelectorAll("table tr");
  for (let i = 4; i < rows.length; i++) {
    const el = rows[i];
    el.remove();
  }
  return htmlDoc.documentElement.innerHTML;
};

const LeafletMap = ({ showPCN, selectedRoute }) => {
  const [pcnJson, setPcnLayer] = useState(geojsonFeature);
  const [amenitiesGeoJson, setAmenitiesGeoJson] = useState(geojsonFeature);
  const [jsonLoaded, setJsonLoaded] = useState(0);

  const selectedPath = path_with_amenities["paths"][selectedRoute];

  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.Description) {
      let description = feature.properties.Description;
      description = trimDescription(feature.properties.Description);
      layer.bindPopup(description);
    }
  };

  const toiletIcon = L.icon({
    iconUrl: "toiletIcon.png",
    iconSize: [40, 40],

    shadowUrl: "shadow.png",
    shadowSize: [30, 30],
    shadowAnchor: [10, 7],
  });

  const fitnessIcon = L.icon({
    iconUrl: "fitness.png",
    iconSize: [40, 40],
  });

  const shelterIcon = L.icon({
    iconUrl: "shelter.png",
    iconSize: [28, 28],
  });

  const meetingPtIcon = L.icon({
    iconUrl: "meetingPoint.png",
    iconSize: [25, 25],
  });

  const foodIcon = L.icon({
    iconUrl: "food.png",
    iconSize: [40, 40],
    shadowUrl: "shadow.png",
    shadowSize: [30, 30],
    shadowAnchor: [8, 5],
  });

  const waterIcon = L.icon({
    iconUrl: "water.png",
    iconSize: [37, 38],
    shadowUrl: "shadow.png",
    shadowSize: [30, 30],
    shadowAnchor: [8, 5],
  });

  const carparkIcon = L.icon({
    iconUrl: "carpark.png",
    iconSize: [25, 25],
  });

  const bikeIcon = L.icon({
    iconUrl: "bicycle.png",
    iconSize: [40, 40],
    shadowUrl: "shadow.png",
    shadowSize: [35, 35],
    shadowAnchor: [4, 6],
  });

  const tentIcon = L.icon({
    iconUrl: "tent.png",
    iconSize: [43, 43],
    shadowUrl: "shadow.png",
    shadowSize: [35, 35],
    shadowAnchor: [4, 6],
  });

  const bbqIcon = L.icon({
    iconUrl: "bbq.png",
    iconSize: [25, 25],
  });

  const playgroundIcon = L.icon({
    iconUrl: "playground.png",
    iconSize: [40, 40],
    shadowUrl: "shadow.png",
    shadowSize: [35, 35],
    shadowAnchor: [4, 6],
  });

  const pointToLayer = (feature, latLng) => {
    //console.log(feature, latLng);
    const description = feature.properties.Description;
    const amenityType = parseAmenityType(description);
    let amenityIcon;
    switch (amenityType) {
      case "TOILET":
        amenityIcon = toiletIcon;
        break;
      case "SHELTER":
        amenityIcon = shelterIcon;
        break;
      case "FITNESS AREA":
        amenityIcon = fitnessIcon;
        break;
      case "F&amp;B":
        amenityIcon = foodIcon;
        break;
      case "CARPARK":
        amenityIcon = carparkIcon;
        break;
      case "BICYCLE RENTAL SHOP":
        amenityIcon = bikeIcon;
        break;
      case "WATER POINT":
        amenityIcon = waterIcon;
        break;
      case "BBQ PIT":
        amenityIcon = bbqIcon;
        break;
      case "CAMPSITE":
        amenityIcon = tentIcon;
        break;
      case "PLAYGROUND":
        amenityIcon = playgroundIcon;
        break;
    }

    if (amenityIcon) {
      return L.marker(latLng, { icon: amenityIcon });
    }
    return L.marker(latLng);
  };

  useEffect(() => {
    fetch(PCN_GEOJSON_URL)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        setPcnLayer(data);
        setJsonLoaded(1337);
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
        filter={(feature) => {
          let kmlName = feature["properties"]["Name"];
          kmlName = String(kmlName).slice(4);
          if (selectedRoute < 0) {
            return false;
          } else if (
            selectedPath["amenities"].includes(parseInt(kmlName) - 1)
          ) {
            return true;
          }
        }}
        onEachFeature={onEachFeature}
        pointToLayer={pointToLayer}
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

// pointToLayer={(geoJsonPoint, latlng) => {
//     console.log(geoJsonPoint, latlng);
//     return;
//   }}

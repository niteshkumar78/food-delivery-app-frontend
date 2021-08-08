import React, { useEffect, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import XYZ from "ol/source/XYZ";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";
import { fromLonLat } from "ol/proj";
import VectorSource from "ol/source/Vector";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { Icon, Style, Stroke } from "ol/style";
import marker from "../marker.png";
import "../orderTracker.css";

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  return {
    value: value,
    setValue,
  };
}

function OrderTracker(props) {
  const allowLocationAcces = useInput(false);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      console.log("hi");
    } else {
      console.log("browser not supported");
    }
    function showPosition(position) {
      setTimeout(() => {
        document.getElementById("slide-up").className = "slide-up-start";
      }, 3000);

      setTimeout(() => {
        document.getElementById("slide-up").style.display = "none";
      }, 8000);
      console.log(
        "longitude",
        position.coords.longitude,
        "lattitude",
        position.coords.latitude
      );
      allowLocationAcces.setValue(true);

      const restraunent = new Feature({
        geometry: new Point(fromLonLat([77.159813, 28.651473])),
        name: "Eat Healthy Restaurnant",
      });

      restraunent.setStyle(
        new Style({
          image: new Icon({
            anchor: [0.5, 46],
            anchorXUnits: "fraction",
            anchorYUnits: "pixels",
            // src: "https://img-premium.flaticon.com/png/512/3295/premium/3295068.png?token=exp=1628359248~hmac=55f9e5d9d9272a2690884889f252cce1",
            src: marker,
          }),
        })
      );

      const user = new Feature({
        geometry: new Point(
          fromLonLat([position.coords.longitude, position.coords.latitude])
        ),
        name: "Your Location",
      });
      user.setStyle(
        new Style({
          image: new Icon({
            anchor: [0.5, 46],
            anchorXUnits: "fraction",
            anchorYUnits: "pixels",
            // src: "https://img-premium.flaticon.com/png/512/3295/premium/3295068.png?token=exp=1628359248~hmac=55f9e5d9d9272a2690884889f252cce1",
            src: marker,
          }),
        })
      );

      const path = new Feature({
        geometry: new LineString([
          fromLonLat([position.coords.longitude, position.coords.latitude]),
          fromLonLat([77.159813, 28.651473]),
        ]),
      });

      path.setStyle(
        new Style({
          stroke: new Stroke({
            color: "#d12710",
            width: 4,
          }),
        })
      );

      const vectorSource = new VectorSource({
        features: [user, restraunent, path],
      });
      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      const map1 = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new XYZ({
              url: "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibml0ZXNoNzgyNyIsImEiOiJja3J4czAwZ3MwYXM1Mm5vOXBvMnRpb2s2In0.stL5BjmN3ApwopL6ncypFQ",
              // url: pic,
              // url: "https://www.w3schools.com/howto/img_avatar.png",
              tileSize: 512,
              // wrapX: false,
            }),

            minZoom: -1,
            maxZoom: 18,
          }),
          vectorLayer,
        ],
        view: new View({
          center: fromLonLat([
            position.coords.longitude,
            position.coords.latitude,
          ]),
          zoom: 16,
          multiWorld: true,
        }),
      });
    }
    // props.updateMapState(map1);
  }, []);
  return (
    <div>
      {allowLocationAcces.value ? (
        <React.Fragment>
          <div className="OrderTrackerHeader">
            <h2>Eat Healthy</h2>
          </div>
          {/* <div className="PaymentSuccessMessage" id="PaymentSuccessMessage">
            Payment Successful
          </div> */}
          <div
            className="slide-up"
            id="slide-up"
            style={{ textAlign: "center" }}
          >
            <h1>Payment Succcessful &#x2713;</h1>
          </div>
          <div
            id="map"
            className="map"
            style={{ height: "91vh", width: "90%" }}
          ></div>
        </React.Fragment>
      ) : (
        <div>
          <h1>Please allow the location access to track your order</h1>
        </div>
      )}
    </div>
  );
}

export default OrderTracker;

import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { map } from "leaflet";
import { useGeolocation } from "../hooks/useGeoLocation";
import Button from "./Button";
import { useUrlPositions } from "../hooks/useUrlPositions";
function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities, flagemojiToPNG } = useCities();
  const {
    isLoading: isLoadingPos,
    position: geoPosition,
    getPosition,
  } = useGeolocation();

  const [lat, lng] = useUrlPositions();

  useEffect(
    function () {
      if (lat && lng) setMapPosition([lat, lng]);
    },
    [lat, lng]
  );

  useEffect(
    function () {
      if (geoPosition) setMapPosition([geoPosition.lat, geoPosition.lng]);
    },
    [geoPosition]
  );
  return (
    <div className={styles.mapContainer}>
      {!geoPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPos ? "Loading..." : "Use Your Position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.cityName}</span>{" "}
              <span>{flagemojiToPNG(city.emoji)}</span>
            </Popup>
          </Marker>
        ))}
        <ChangePos position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangePos({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;

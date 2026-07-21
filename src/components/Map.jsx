import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function ChangeView({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position);
    }
  }, [position, map]);

  return null;
}

export default function Map({ pickup, destination }) {
  const [pickupPosition, setPickupPosition] = useState(null);
  const [destinationPosition, setDestinationPosition] = useState(null);

  async function getCoordinates(location) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${location}`,
    );

    const data = await response.json();

    if (data.length > 0) {
      return [Number(data[0].lat), Number(data[0].lon)];
    }

    return null;
  }

  useEffect(() => {
    async function findLocations() {
      if (pickup) {
        const pickupCoords = await getCoordinates(pickup);
        setPickupPosition(pickupCoords);
      }

      if (destination) {
        const destinationCoords = await getCoordinates(destination);

        setDestinationPosition(destinationCoords);
      }
    }

    findLocations();
  }, [pickup, destination]);

  const defaultPosition = [35.9606, -83.9207];

  const center = pickupPosition || defaultPosition;

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{
        height: "400px",
        width: "100%",
      }}
    >
      <ChangeView position={center} />

      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {pickupPosition && (
        <Marker position={pickupPosition}>
          <Popup>Pickup: {pickup}</Popup>
        </Marker>
      )}

      {destinationPosition && (
        <Marker position={destinationPosition}>
          <Popup>Destination: {destination}</Popup>
        </Marker>
      )}

      {pickupPosition && destinationPosition && (
        <Polyline positions={[pickupPosition, destinationPosition]} />
      )}
    </MapContainer>
  );
}

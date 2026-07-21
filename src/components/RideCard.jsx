import "../styles/RideCard.css";

export default function RideCard({ ride, status, setStatus }) {
  return (
    <div className="confirmation-card">
      <h2>Ride Confirmed!</h2>

      <p>Name: {ride.name}</p>
      <p>Pickup: {ride.pickup}</p>
      <p>Destination: {ride.destination}</p>

      <p>Status: {status}</p>

      <button onClick={() => setStatus("Driver Assigned")}>
        Assign Driver
      </button>

      <button onClick={() => setStatus("Driver Arriving")}>
        Driver Arriving
      </button>

      <button onClick={() => setStatus("Completed")}>Complete Ride</button>
    </div>
  );
}

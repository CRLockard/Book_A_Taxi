import { useState } from "react";
import "../styles/Booking.css";
import RideCard from "../components/RideCard";
import Map from "../components/Map";

export default function Booking() {
  const [f, setF] = useState({
    name: "",
    email: "",
    pickup: "",
    destination: "",
  });

  const [e, setE] = useState({});
  const [ride, setRide] = useState(null);
  const [status, setStatus] = useState("");

  const sub = (x) => {
    x.preventDefault();

    let er = {};

    if (!f.name) er.name = "Required";

    if (!/^\S+@\S+\.\S+$/.test(f.email)) {
      er.email = "Valid email required";
    }

    if (!f.pickup) er.pickup = "Pickup required";

    if (!f.destination) er.destination = "Destination required";

    setE(er);

    if (!Object.keys(er).length) {
      setRide(f);
      setStatus("Requested");
    }
  };

  return (
    <>
      <form className="booking-card" onSubmit={sub}>
        <h1>Book Ride</h1>

        <input
          placeholder="Name"
          value={f.name}
          onChange={(x) => setF({ ...f, name: x.target.value })}
        />
        {e.name && <p>{e.name}</p>}

        <input
          placeholder="Email"
          value={f.email}
          onChange={(x) => setF({ ...f, email: x.target.value })}
        />
        {e.email && <p>{e.email}</p>}

        <input
          placeholder="Pickup location"
          value={f.pickup}
          onChange={(x) => setF({ ...f, pickup: x.target.value })}
        />
        {e.pickup && <p>{e.pickup}</p>}

        <input
          placeholder="Destination"
          value={f.destination}
          onChange={(x) => setF({ ...f, destination: x.target.value })}
        />
        {e.destination && <p>{e.destination}</p>}

        <button>Book Ride</button>
      </form>

      <Map pickup={f.pickup} destination={f.destination} />

      {ride && <RideCard ride={ride} status={status} setStatus={setStatus} />}
    </>
  );
}

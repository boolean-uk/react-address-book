import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { baseUrl } from "../utils/baseUrl";

const Meetings = () => {
  const [person, setPerson] = useState(null);
  const [meeting, setMeeting] = useState({});
  const { id } = useParams();

  const navigate = useNavigate();

  console.log(id);
  const { data, isPending, error } = useFetch(
    `http://localhost:3000/contacts/${id}`
  );

  useEffect(() => {
    if (data) {
      setPerson(data);
      setMeeting({
        firstName: "",
        location: "",
        date: "",
        time: "",
        contactId: id,
      });
    }
  }, [data]);

  async function createMeeting(el) {
    const opts = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(el),
    };
    await fetch(`${baseUrl}/meetings`, opts);
  }

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    await createMeeting(meeting);
    navigate(`/contact/${id}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeeting({ ...meeting, [name]: value });
  };
  return (
    <React.Fragment>
      {person && (
        <form onSubmit={formSubmitHandler} className="form-stack contact-form">
          <h2>
            Create Meeting {person.firstName} {person.lastName}
          </h2>
          <label htmlFor="firstName">Name</label>
          <input
            onChange={handleChange}
            id="firstName"
            name="firstName"
            type="text"
            required
          />

          <label htmlFor="date">Date</label>
          <input
            onChange={handleChange}
            id="date"
            name="date"
            type="date"
            required
          />

          <label htmlFor="time">Time:</label>
          <input
            onChange={handleChange}
            id="time"
            name="time"
            type="time"
            required
          />
          <label htmlFor="location">Location:</label>
          <input
            onChange={handleChange}
            id="location"
            name="location"
            type="text"
            required
          />

          <div className="actions-section">
            <button className="button blue" type="submit">
              Create
            </button>
          </div>
        </form>
      )}
    </React.Fragment>
  );
};

export default Meetings;

// const newPerson = {
//   ...person,
//   meetings: [...person.meetings, { ...meeting, id: Math.random() }],
// };
// const opts = {
//   method: "PATCH",
//   headers: { "Content-type": "application/json" },
//   body: JSON.stringify(newPerson),
// };

// try {
//   await fetch(`http://localhost:3000/contacts/${id}`, opts);
//   setPerson(newPerson);
// } catch (error) {
//   console.log(error);
// }

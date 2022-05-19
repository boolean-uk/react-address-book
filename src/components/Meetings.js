import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

function Meetings({ setContacts }) {
  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  const [newMeeting, setNewMeeting] = useState();
  const [meetings, setMeetings] = useState(null);
  // state

  //TODO: Implement controlled form
  //send POST to json server on form submit
  // console.log(setContacts);

  //   const navigate = useNavigate();
  let { id } = useParams();
  const userId = +id;

  const { data, isPending, error } = useFetch(
    `http://localhost:4000/meetings/`
  );

  useEffect(() => {
    if (data) {
      console.log(data);
      const filteredData = data.filter((meeting) => {
        return meeting.userId === userId;
      });

      console.log(filteredData);
      setMeetings(filteredData);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    switch (name) {
      case "time":
        return setNewMeeting({ ...newMeeting, time: value });
        break;
      case "date":
        return setNewMeeting({ ...newMeeting, date: value });
        break;
      case "location":
        return setNewMeeting({ ...newMeeting, location: value });
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMeetings((prevMeeting) => [...prevMeeting, { ...newMeeting, userId }]);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newMeeting, userId }),
    };

    await fetch("http://localhost:4000/meetings/", options);

    e.target.reset();
    // navigate("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-stack contact-form">
        <h2>Create Meeting</h2>

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
      {meetings &&
        meetings.map((meeting) => {
          return (
            <div key={meeting.id} className="meetings">
              <p className="meetings-details">Place: {meeting.location}</p>
              <p className="meetings-details">Date: {meeting.date}</p>
              <p className="meetings-details">Time: {meeting.time}</p>
            </div>
          );
        })}
    </>
  );
}

export default Meetings;

import { useEffect, useState } from "react";
import { HTTPMEETINGS } from "../http";

function MeetingAdd({ city, id, meetings, setMeetings }) {
  const [meeting, setMeeting] = useState({
    date: "",
    time: "",
    location: city,
    contactId: id,
  });

  const handleChange = (e) => {
    setMeeting({ ...meeting, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(HTTPMEETINGS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(meeting),
    })
      .then((res) => res.json())
      .then((respose) => setMeetings([...meetings, respose]));
  };
  return (
    <form onSubmit={handleSubmit} className="form-meeting" action="">
      <label>
        Date:
        <input
          name="date"
          type="date"
          value={meeting.date}
          onChange={handleChange}
        />
      </label>
      <label>
        Time:
        <input
          name="time"
          type="time"
          value={meeting.time}
          onChange={handleChange}
        />
      </label>
      <label>
        Location:
        <input
          name="location"
          type="text"
          value={meeting.location}
          onChange={handleChange}
        />
      </label>
      <button type="submit">add</button>
    </form>
  );
}

export default MeetingAdd;

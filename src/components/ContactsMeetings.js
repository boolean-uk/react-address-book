import { useEffect, useState, useRef } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
function ContactsMeetings(props) {
  const params = useParams();
  const navigate = useNavigate()
  const id = params.id;
  const [meetings, setMeetings] = useState([]);
  const [form, setForm] = useState({
    date: "",
    time: "",
    location: "",
    person:''
  });
  useEffect(() => {
    fetch(`http://localhost:3030/meetings?person=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMeetings(data);
      });
  }, []);
//   console.log(meetings);
  const handleSubmit = async (e) => {
    e.preventDefault();
    form.person = id
    console.log(form);
    const res = fetch("http://localhost:3030/meetings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    await fetch(`http://localhost:3030/meetings?person=${id}`)
    .then((res) => res.json())
    .then((data) => setMeetings(data));
    //i am already doing the update in the update function
    // navigate('/') can do this, gonna troubleshoot
    navigate("/");

  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <nav>
        <h2>Meetings</h2>
        {meetings.map((item, index) => {
            return(
          <div>
            <ul>
              <li key = {index} className="meeting"></li>
              <h3>Meeting {index+1}:</h3>
              <p>Date:{item.date}</p>
              <p>Time:{item.time}</p>
              <p>Location:{item.location}</p>
            </ul>
          </div>
            )
        })}
        <form onSubmit={handleSubmit}>
          <h3>Add new Meeting</h3>
          <div>
            <div className="meeting-data">
              <label htmlFor="date">Date:</label>
              <input
                className="meeting-data-input-small"
                value={form.date}
                onChange={handleChange}
                type="text"
                name="date"
              />
            </div>
            <div className="meeting-data">
              <label htmlFor="time">Time:</label>
              <input
                className="meeting-data-input-small"    
                value={form.time}
                onChange={handleChange}
                type="text"
                name="time"
              />
            </div>
            <div className="meeting-data">
              <label htmlFor="location">Location:</label>
              <input
                className="meeting-data-input"
                value={form.location}
                onChange={handleChange}
                type="text"
                name="location"
              />
            </div>
          </div>
        <div className="actions-section">
        <button className="button blue" type="submit" >
          Add meeting
        </button>
        </div>
        </form>
      </nav>
    </>
  );
}
export default ContactsMeetings;

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api";

const ContactsMeeting = () => {
  const [meetings, setMeetings] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    api
      .get(`/meetings?contactId=${id}`)
      .then((res) => setMeetings(res.data))
      .catch((err) => console.dir(err));
  }, []);
  return (
    <ul>
      {meetings.map((meeting, index) => {
        <li id={index}>
          <p>{meeting.location}</p>
          <p>{meeting.date}</p>
          <p>{meeting.time}</p>
        </li>;
      })}
    </ul>
  );
};
export default ContactsMeeting;

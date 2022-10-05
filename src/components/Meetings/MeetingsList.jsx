import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/loadspinner.css";

function MeetingsList(props) {
  const navigate = useNavigate();
  //"contacts" must be passed as prop to this component
  const { contacts, meetings, setMeetings } = props;

  return (
    <>
      <header>
        <h2>Meetings</h2>
      </header>
      <ul className="contacts-list">
        {meetings.length === 0 && (
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
        {meetings.map((meeting, index) => {
          const { subject, date, time } = meeting;
          return (
            <li className="contact" key={index}>
              <p>{subject}</p>
              <p>
                On {date} at {time}
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default MeetingsList;

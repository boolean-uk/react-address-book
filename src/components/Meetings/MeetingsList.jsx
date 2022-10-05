import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/loadspinner.css";

import MeetingsView from "./MeetingsView";

function MeetingsList(props) {
  const navigate = useNavigate();

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
              <p>
                <strong>{subject}</strong> on <em>{date}</em> at{" "}
                <em>{time} hr</em>
              </p>
              <p>
                <Link
                  to={`/meeting/${meeting.id}`}
                  state={{ meeting }}
                  className="actionButton"
                >
                  View
                </Link>
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default MeetingsList;

import { Link } from "react-router-dom";
import "../../styles/loadspinner.css";

function MeetingsList(props) {
  const { meetings, setMeetings } = props;

  const deleteMeeting = (id) => {
    if (confirm("Are you sure you want to delete this meeting?") == true) {
      fetch(`http://localhost:4000/meetings/${id}`, { method: "DELETE" }).then(
        () => {
          fetch("http://localhost:4000/meetings")
            .then((res) => res.json())
            .then((data) => {
              setMeetings(data);
            });
        }
      );
    }
  };

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
                <strong>{subject}</strong> on <em>{date}</em> at <em>{time}</em>
              </p>
              <p>
                <Link
                  to={`/meeting/${meeting.id}`}
                  state={{ meeting }}
                  className="actionButton"
                >
                  View
                </Link>
                <Link
                  to={`/editmeeting/${meeting.id}`}
                  state={{ meeting }}
                  className="actionButton"
                >
                  Edit
                </Link>
                <span
                  className="actionButton"
                  onClick={(e) => deleteMeeting(meeting.id)}
                >
                  Delete
                </span>
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default MeetingsList;

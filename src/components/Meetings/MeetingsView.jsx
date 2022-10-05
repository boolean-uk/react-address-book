import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import ParticipantItem from "./ParticipantItem";

function MeetingsView(props) {
  const location = useLocation();
  const [meeting, setMeeting] = useState(null);
  const [meetingParticipants, setMeetingParticipants] = useState([]);
  const { contacts } = props;

  useEffect(() => {
    if (location.state) {
      const { meeting } = location.state;
      setMeeting(meeting);

      const findParticipantInContacts = (participantID) => {
        return contacts.filter((thisContact) => {
          if (thisContact.id == participantID) {
            return thisContact;
          }
        });
      };

      const getParticipantsOfThisMeeting = () => {
        const meetingParticipants = [];
        meeting.participants.forEach((thisParticipant) => {
          meetingParticipants.push(findParticipantInContacts(thisParticipant));
        });
        return meetingParticipants.flat();
      };

      setMeetingParticipants(getParticipantsOfThisMeeting());
    }
  }, [location]);

  if (!meeting) {
    return <p>Loading</p>;
  }

  return (
    <>
      <header>
        <h2>Meeting Details</h2>
      </header>
      <div className="contactCard meeting light-shadow">
        <h2>{meeting.subject}</h2>
        <p>
          <em>{meeting.date}</em>,&nbsp;<em>{meeting.time}</em>
        </p>
        <p>&nbsp;</p>

        <strong>Participants:</strong>

        <ul>
          {meetingParticipants.map((contact, index) => (
            <ParticipantItem key={index} contact={contact} />
          ))}
        </ul>
        <p>
          <Link to={"/meetings"} className="backButton">
            Back
          </Link>
        </p>
      </div>
    </>
  );
}

export default MeetingsView;

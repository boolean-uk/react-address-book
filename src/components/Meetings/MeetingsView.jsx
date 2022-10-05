import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

function MeetingsView(props) {
  const location = useLocation();
  const [meeting, setMeeting] = useState(null);
  const { contacts } = props;

  useEffect(() => {
    if (location.state) {
      const { meeting } = location.state;
      setMeeting(meeting);
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
      <div className="contactCard light-shadow">
        <h2>{meeting.subject}</h2>
        <p>
          <em>{meeting.date}</em>,&nbsp;<em>{meeting.time}</em>
        </p>
        <p>
          <Link to={"/meetings"} className="backButton">
            Back to meetings list
          </Link>
        </p>
      </div>
    </>
  );
}

export default MeetingsView;

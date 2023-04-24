import { useParams } from "react-router";
import { HTTPMEETINGS, HTTPCONTACTS } from "../http";
import { useEffect, useState } from "react";
import MeetingAdd from "./MeetingAdd";
import MeetingList from "./MeetingList";

const Meetings = () => {
  const [contactInfo, setContactInfo] = useState(false);
  const [meetings, setMeetings] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetch(HTTPCONTACTS + `/${id}`)
      .then((res) => res.json())
      .then((result) => setContactInfo(result));
  }, []);

  useEffect(() => {
    fetch(HTTPMEETINGS + `/?contactId=${id}`)
      .then((res) => res.json())
      .then((result) => setMeetings(result));
  }, [contactInfo]);

  if (!contactInfo) {
    return <span className="loader"></span>;
  }
  return (
    <>
      <MeetingAdd
        meetings={meetings}
        setMeetings={setMeetings}
        city={contactInfo.city}
        id={id}
      />
      <MeetingList meetings={meetings} contactInfo={contactInfo} />
    </>
  );
};
export default Meetings;

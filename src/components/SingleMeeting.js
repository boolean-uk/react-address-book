import { MdPeopleOutline } from "react-icons/md";

function SingleMeeting({ date, time, location }) {
  return (
    <li className="single-meeting">
      <MdPeopleOutline className="meeting-icon" />
      <strong>{location}:</strong>
      <span>{`${date} at ${time}`}</span>
    </li>
  );
}

export default SingleMeeting;

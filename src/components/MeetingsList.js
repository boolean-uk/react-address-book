import { useState, useEffect } from "react"
import { useLocation, Link } from "react-router-dom";

import Meetings from "./Meetings";

const MeetingsList = (props) => {

  const {meetings, setMeetings} = props

  const [contact, setContact] = useState({});

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { contact } = location.state;
      setContact(contact);
    }
  }, []);


  const userId = contact.id
  const userName = contact.firstName
  // Set userId of meeting to contact.id and pass to Meeting component

  return(
    <>
    <h2>Meetings for {userName}</h2>
    <Meetings userId={userId} meetings={meetings} setMeetings={setMeetings}/>
    <Link to={`/contacts/${userId}/meetings/add`} state={userId}>Add a meeting</Link>
    {/* <Meetings userId = {contact.id}/> */}
    {/* http://localhost:4000/meetings?userId={contact.id} */}
    </>
  )
}

export default MeetingsList

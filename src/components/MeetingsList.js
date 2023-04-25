import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom";

const MeetingsList = () => {

  const [contact, setContact] = useState(null);

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { contact } = location.state;
      setContact(contact);
      console.log(contact)
    }
  }, [location]);


  return(
    <>
    <h2>Meetings</h2>
    {/* <Meetings userId = {contact.id}/> */}
    {/* http://localhost:4000/meetings?userId={contact.id} */}
    </>
  )
}

export default MeetingsList

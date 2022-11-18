// Steps

// New Meeting componeent - Needs to have a form to add a new meeting as well as display list of meetings for the clicked on user
// Link to this component needs to be added to the ContactsView - probably pass down the user data / userParams to access id
// Edit db json file  to store the meetings data - each meetings object should have a users array of the id's
// In Meetings component, we need to user json server filters to fetch the correct data - https://github.com/typicode/json-server#getting-started
//
// When adding a new meeting, make sure to add the user id to that meeting on the server
// We need to run useEffect to fetch the new meeting data each time the meeting state is updated

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Meeting() {
  const [meetings, setMeetings] = useState([]);

  const navigate = useNavigate();

  return (
    <>
      <h1>Meetings</h1>
      <button onClick={() => navigate(-1)}>Back</button>
    </>
  );
}

export default Meeting;

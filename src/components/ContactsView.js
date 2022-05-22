import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Grid, Button } from "@nextui-org/react";
import Spinner from "./Spinner";
import Meeting from "./Meeting";
import { baseUrl } from "../utils/baseUrl";

function ContactsView() {
  const [contact, setContact] = useState(null);
  const [meetings, setMeetings] = useState(null);
  const { id } = useParams();
  const { data, isPending, error } = useFetch(`${baseUrl}/contacts/${id}`);
  const {
    data: meetingsData,
    isPending: isMeetingsPending,
    error: meetingError,
  } = useFetch(`${baseUrl}/meetings?contactId=${id}`);

  console.log("rendering contacts");

  useEffect(() => {
    if (data) {
      setContact(data);
    }
  }, [data]);

  useEffect(() => {
    if (meetingsData) {
      setMeetings(meetingsData);
    }
  }, [meetingsData]);

  if (!contact) {
    return <Spinner />;
  }

  return (
    <>
      {isPending && <h3>Loading...</h3>}
      {error && <h3>{error}</h3>}
      {contact && (
        <>
          <div>
            <h2>
              Hello
              {contact.firstName} {contact.lastName}
            </h2>
            <p>
              {contact.street} {contact.city}
            </p>
            <p>Email: {contact.email || "Sign up to email"}</p>
            <p>Twitter: {contact.twitter || "I do not do twitter"} </p>
            <p>LinkedIn: {contact.linkedIn || "I do not do linkedIn"} </p>
          </div>
          <div className="meetings-btn">
            <Grid.Container gap={2}>
              <Grid>
                <Button color="success" auto>
                  <Link to={`/contact/${contact.id}/meetings`}>
                    Add New Meeting
                  </Link>
                </Button>
              </Grid>
            </Grid.Container>
          </div>
          {meetings?.length > 0 &&
            meetings.map((meeting) => (
              <Meeting
                meeting={meeting}
                contact={contact}
                key={meeting.id}
                setMeetings={setMeetings}
              />
            ))}
        </>
      )}
    </>
  );
}

export default ContactsView;

//TODO: Get the contact to load from the params and fetch.
//With useEffect, load the contact when params changes
//and update contact state

// useEffect(() => {
//   fetch(`${baseUrl}/meetings?contactId=${id}`)
//     .then((res) => res.json())
//     .then((data) => setMeetings(data));
// }, []);

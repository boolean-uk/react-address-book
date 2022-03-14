import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ContactsView() {
  const [contact, setContact] = useState(false);

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state

  const params = useParams(); // the useParams is asigned to a variable (params) - this params here onwards would mean is the function.
  useEffect(() => {
    console.log("making fetch request"); // this line tests if we're making the fetch requist successfully
    fetch(`http://localhost:4000/contacts/${params.id}`)
      .then((res) => res.json())
      .then((json) => {
        console.log("What's showing", json); // this line shows us the data received, if the fetch request was success
        setContact(json);
      });
  }, [params]);

  if (!contact) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <h2>
        {contact.firstName} {contact.lastName}
      </h2>
      <p>
        {contact.street} {contact.city}
      </p>
      <p>{contact.email}</p>
      <p>{contact.linkedIn}</p>
      <p>{contact.twitter}</p>
    </div>
  );
}

export default ContactsView;

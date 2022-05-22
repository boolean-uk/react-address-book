import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button, Grid } from "@nextui-org/react";
import Spinner from "./Spinner";
import { baseUrl } from "../utils/baseUrl";

function ContactsList({ contacts, setContacts, isPending, error }) {
  const [personalChecked, setPersonalChecked] = useState(false);
  const [workChecked, setWorkChecked] = useState(false);

  async function deleteFromLocalServer(id) {
    try {
      await fetch(`${baseUrl}/contacts/${id}`, { method: "DELETE" });
    } catch (e) {
      console.log(e);
    }
    setContacts((previous) => previous.filter((item) => item.id !== id));
  }

  useEffect(() => {
    let url = `${baseUrl}/contacts/${id}`;

    if (personalChecked) url = url + "?contactType=personal";
    if (workChecked && personalChecked) url = url + "&contactType=work";
    // fetch
    // setContacts
  }, [personalChecked, workChecked]);

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <input
        type="checkbox"
        onChange={() => setPersonalChecked((previous) => !previous)}
        value={personalChecked}
      />
      <input
        type="checkbox"
        onChange={() => setWorkChecked((previous) => !previous)}
        value={workChecked}
      />

      <ul className="contacts-list">
        {isPending && <Spinner />}
        {error && <h3>{error}</h3>}
        {contacts &&
          contacts.map((contact, index) => {
            const { firstName, lastName } = contact;
            return (
              <li className="contact" key={index}>
                <div>
                  <p>
                    {firstName} {lastName}
                  </p>
                </div>
                <Grid.Container gap={2}>
                  <Grid>
                    <Button shadow color="success" auto>
                      <Link to={`/contact/${contact.id}`}>View</Link>
                    </Button>
                  </Grid>
                  <Grid>
                    <Button shadow color="warning" auto>
                      <Link to={`contact/edit/${contact.id}`}>Edit</Link>
                    </Button>
                  </Grid>
                  <Grid>
                    <Button
                      shadow
                      color="error"
                      auto
                      onClick={() => deleteFromLocalServer(contact.id)}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid.Container>
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default ContactsList;

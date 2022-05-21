import { Link, useSearchParams } from "react-router-dom";
import { Button, Grid } from "@nextui-org/react";
import Spinner from "./Spinner";
import { baseUrl } from "../utils/baseUrl";
import Meetings from "./Meetings";

function ContactsList({ contacts, setContacts, isPending, error }) {
  async function deleteFromLocalServer(id) {
    try {
      await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
    } catch (e) {
      console.log(e);
    }
    setContacts((previous) => previous.filter((item) => item.id !== id));
  }

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
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

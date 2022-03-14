import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function ContactsList(props) {
  const { contacts } = props; // We're destructuring the props passed on - this means we can use the name 'contacts' and it will be recognised as the state contacts.
  console.log("contacts", contacts); // this console log can be used to check if you've passed the correct data on.
  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className="contacts-list">
        {contacts.map((contact, index) => {
          // this line is mapping through the contacts array
          const { firstName, lastName } = contact; // I think here is another example of destructuring prop/objrct - we're taking out/using two propert of the state object (firstName and lastName).This means the variable will be recognised for the value they're holding/passing.
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName}{" "}
                {/* This line is responsible of displaying the value passed from the form to the conatct list page */}
              </p>
              <p>
                {" "}
                <Link to={`/contacts/${contact.id}`}>
                  {" "}
                  {/* This is the link that directs the viewers to the individual contact that they've clicked to view of their details, I think? */}
                  View
                </Link>
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ContactsList;

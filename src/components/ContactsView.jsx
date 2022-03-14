import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import urlPath from '../helpers/helpers';

function ContactsView() {
  const [contact, setContact] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetch(`${urlPath}/contacts/${params.id}`)
      .then((response) => response.json())
      .then((json) => setContact(json));
  }, [params]);

  return (
    <div>
      <h2>
        {contact.firstName} {contact.lastName}
      </h2>
      <p>
        {contact.street} {contact.city}
      </p>
      {contact.email && <p>{contact.email}</p>}
      {contact.linkedin && <p>{contact.linkedin}</p>}
      {contact.twitter && <p>{contact.twitter}</p>}
    </div>
  );
}

export default ContactsView;

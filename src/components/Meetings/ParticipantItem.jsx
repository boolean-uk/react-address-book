import { Link } from "react-router-dom";

function ParticipantItem(props) {
  const { contact } = props;

  return (
    <li>
      &raquo; {contact.firstName} {contact.lastName} &nbsp;
      <Link
        to={`/contact/${contact.id}`}
        state={{ contact }}
        className="actionButton"
      >
        View
      </Link>
    </li>
  );
}

export default ParticipantItem;

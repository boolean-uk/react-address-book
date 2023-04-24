const MeetingList = ({ meetings, contactInfo }) => {
  return (
    <>
      <header>
        <h2>
          Meetings of {contactInfo.firstName} {contactInfo.lastName}
        </h2>
      </header>

      <ul className="contacts-list">
        {meetings.map((meeting, index) => {
          const { date, time, location } = meeting;
          return (
            <li className="contact" key={index}>
              <p>Date: {date}</p>
              <p>Time: {time}</p>
              <p>Location:{location}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default MeetingList;

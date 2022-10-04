async function GetContacts() {
  try {
    await fetch("http://localhost:4000/contacts")
      .then((data) => data.json())
      .then((data) => {
        return data;
      });
  } catch (err) {
    console.error(err);
  }
}

export default GetContacts;

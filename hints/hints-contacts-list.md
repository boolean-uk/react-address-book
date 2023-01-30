# View Contacts

- Inside `App.js` you will need to use `useEffect` to load data from json-server when the page first loads. Check back with the slides we covered `useEffect`, they cover this scenario.
- Inside your `useEffect`, you will make a `fetch` request to `http://localhost:4000/contacts`. Start by using `console.log` to make sure you are getting data back. Once your data is coming back, you then want to store it on the `contacts` state using `setContacts`
- Inside the `<Routes>` tag in `App.js` you will need to add a route for the path `/` which uses the `ContactsList` component as the element. You will need to pass the `contacts` state as props to `ContactsList`

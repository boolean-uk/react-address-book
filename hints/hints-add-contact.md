# Add Contacts

- You will need to add a `<Route>` inside `App.js` for your add contact form. `ContactsAdd` is the component you want to use. You will also need to add `Link` elements to the navigation menu for add contact and also list contacts (so the user can get back to the contacts list).
- Inside `ContactsAdd` you will need to make the form a controlled form - adding state properties for each field and adding change handlers to update the state.
- You'll also need to add a submit handler for the form. When the form is submitted, you will need to make a `POST` request to json-server using `fetch`, sending the data from the form in the request body. Check with Insomnia or a similar tool for the format you need to use.
- When the response comes back from the server, you will need to add the contact to the list of contacts held in state. To do this, the `App` component will need to pass down `contacts` and `setContacts` as props to the `ContactsAdd` component.
- Once the response is returned from the server, you will want to add *the json object returned from the server* as the new contact - this is because it contains the `id` property we'll need later in the vie form. You can update the array with the new object exactly as we do usually when updating an array held in immutable state:

```javascript
setContacts( [...contacts, json])
```

# View Contact

- Inside `ContactList`, you will need to add a `Link` for each contact. The `to` property of this link should be based on the `contact.id` property - for example, the contact with id `1` should create a link to `contacts/1`.
- You will then need to add a dynamic route in the `App` `<Routes>` element, using `:id` as a place holder for the contact ID. The component used to render these routes should be the `ContactsView` component.
- Inside `ContactsView`, you will need to use `useParams` to get the parameters object from React Router. You should then use `useEffect` with a dependency on the `params.id` property. 
- Inside your effect, you will want to make a `GET` request with `fetch` to load that contact from json server. Once the data comes back, you will then need to update the `contact` state property to display the contact on the page.
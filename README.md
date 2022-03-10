# React Address Book

![React Address Book](./images/address-book.gif)

In this exercise you are going to practice:
- Fetching data from a server using `useEffect` and `fetch`
- Implementing a controlled form
- Posting data to a server using `fetch`
- Implementing multiple routes

Some of the components have been created for you.

## Setup

1. Fork and clone this repository
2. `npm install`
3. `npm start`
4. Start json-server. In a new terminal: `npx json-server -p 4000 --watch db/db.json`
5. Visit localhost:4000/contacts to make sure your json-server is running

## Requirements
- A user can **view a list of contacts** at "/" when the app loads. 
	- Each contact should show first name and last name
	- The list of contacts should be fetched from json-server
- A user can **create a contact** at "/contacts/add" via a form when the "Add New Contact" menu link is clicked
	- The created contact should have:
		- first name
		- last name
		- street
		- city
	- When the form is submitted, the created contact should be saved in the database by sending to json-server
	- The created contact should be also be added to the contacts list
  - The add new contact form should be reset
- A user can **view a specific contact** at "/contacts/:id" by pressing a "view" link from the contacts list
	- The view contact page should display all the details of the contact
	- The specific contact should be fetched from json-server based on it's id

## Tips
- Check `db/db.json` and think about which URLs you are going to need when creating your `fetch` functions.
- Using the instructions above, json-server will run on `localhost:4000`, so you can `GET` all contacts at `http//localhost:4000/contacts`. 
- You can add a new contact by `POST`-ing to `http//localhost:4000/contacts`
- You can also use a tool such as Insomnia to test these requests before you start writing code

## Extension 1
- Add support for defining the following fields for each contact:
  - Email 
  - LinkedIn
  - Twitter
- Update the new contact form and the contact view page to show these fields

## Extension 2
- The user is automatically returned to the contacts list page when a contact is added.
  - Take a look at `useNavigate` on [React Router](https://reactrouter.com/docs/en/v6/getting-started/overview#navigation) for how to do this.

## Extension 3
- A user can **edit a contact**  when an "Edit" link is clicked in the contacts list
	- The updated contact should be saved in the database using a `PUT` or `PATCH` call to json-server
	- The updated contact should be viewable in the contacts list

## Extension 3
- The user can **delete a contact** from the contacts list

## Extension 4
- A user can **see a loading spinner** when the initial list of contacts is being fetched from json-server
  - To test this, you can use Chrome Developer Tools to [throttle your network connection](https://developer.chrome.com/docs/devtools/network/reference/#throttling)
  - Note: Your solution should assume that the list of contacts returned from the server could be empty

## Extension 5
- A user can **view a list of meetings and create new meetings** for each contact at "/contact/:id/meetings"
  - From the contact view page, a new link should be added, "Meetings" which takes the user to a new page, rendered with a new `Meetings` component
  - When the component loads, a list of meetings arranged for that contact should be fetched from json-server
  - A form at the top of the list should allow the user to add new meetings. Each meeting should contain a date, a time and a location.
  - New meetings should be saved using json-server
- For this extension you will need to update the `db.json` file to store meeting objects. See the [json-server documentation](https://github.com/typicode/json-server#getting-started) for more details.
- When you add meetings, you will need to "link them" to the specific contact by including the contact id in each meeting
  
## Extension 6
- A user can specify a contact type when adding a contact, `Work` or `Personal`. 
- Update the contacts list and contact view to show the contact type. Display each type in a different style, or use conditional rendering to add a different icon or emoji next to the contact based on their type.
- Add filter options to the contacts list so the user can toggle each contact type. Changing the filter should change the displayed contacts.
- Each time the filter changes, the URL should also be updated. 
  - In this instance, the specific filters should be added as URL Search params. For example, if the user filters by only "personal", the url should be something like `/?type=personal`. If the user filters by only "work", then the url should be `/?type=work`. If the user filters by both types, then the url should be `/?type=work&type=personal`. If there are no filters in the URL, then all contacts should be shown.
  - See `useSearchParams` on [React Router](https://reactrouter.com/docs/en/v6/getting-started/tutorial#search-params) for one approach to this. 
  - Read the documentation *carefully* on `useSearchParams`. It works similar to `useState`, but the value you get back is an instance of [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams), not an object as you may expect. 
  - You may want to consider using `useSearchParams` in a small test project first to understand how it works.
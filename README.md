# React Address Book

![React Address Book](./images/address-book.gif)

In this exercise you are going to practice `fetch` and `CRUD` with a large form and multiple endpoints.

Some of the components have been created for you.

## Setup

1. Fork and clone this repository
2. `npm install`
3. `npm run start`
5. Run json-server through a new terminal: `json-server --watch db/db.json --routes db/routes.json`

## Requirements
- A user can **view a list of contacts** when the app loads. 
	- Each contact should shown first name and last name
	- The list of contacts should be retrieved from the database
- A user can **create a contact** via a form when the "New Contact" button is clicked
	- The created contact should have:
		- first name
		- last name
		- street
		- city
		- post code
		- an option to block the contact
	- The created contact should be saved in the database
	- The created contact should be added to the contacts list
	- A link underneath the form should allow the user to return to the contacts list
- A use **view a specific contact** by selecting a view button from the contacts list
	- The view contact page should display all the details of the contact 
	- The specific contact should be loaded from the database based on it's id

## Tips

- Check `db/db.json` and think about which URLs you are going to need when creating your `fetch` functions.
- Use `state` to keep track of changes and render the UI.
- **When writing the "POST" requests you need to do one before the other, look at `addressId` in `contacts` to figure it out!**


## Extension 1
- When a user submits a form they should be automatically redirected to see the changes

## Extension 2
- A user can **edit a contact** via a form when the "Edit" button is clicked
	- The updated contact should be saved in the database
	- The updated contact should be viewable in the UI
	- The selected contact can also be deleted from the **edit contact** form

## Extension 3
- A user can specify a contact type when adding a contact ("Work,"Personal", etc.) 
- Add support for filtering contact types to the contact list page

## Extension 4
- A user can search for a specific contact

Book tracking website

This is a React / Node.js (Express) / MongoDB / Tailwind website for keeping track of what books you've read and what thoughts you have about them. You can upload, edit, or remove books you've read. Book cover images come from the Open Library API, so you don't have to upload your own. Sorting, searching (with debouncing), filtering, and pagination are available to make browsing the books easier.

Auth: API routes and functions related to user authentication.

Basic: API routes and functions related to fetching and mutating book data.

middleware: authentication middleware. The website uses JWT for server-side user authentication.

Schemas: MongoDB schemas.

frontend/src/components/AddBook.js: uploads a new book or edits an existing one depending on whether it receives a book id. You can rate books 1-5 stars and write notes/a review.

frontend/src/components/Books.js: displays the user's books.

frontend/src/components/Details.js: displays details about a book.

frontend/src/components/App.js: contains routing with React Router and route protection. Additionally, there is client-side user authentication (authContext.js) for improving the user experience.

frontend/src/components/smallReusables: UI elements like inputs and buttons.

frontend/src/utils: contexts, hooks, helper functions, etc.

TO DO:
Important:
- Add a nicer error page.
- Currently, when the user logs out, the page goes blank. Redirect instead to the landing page.
- Remove or shorten some timeouts that aren't useful anymore.
- Force stronger passwords.
- Modify alphabetical sorting so it uses the author's last name instead of first name, and ignores a / an / the in title sorting.
Can wait:
- Add a spinner instead of the "loading" text.
- Make the footer links point to something.
If I have too much free time:
- Replace the ugly AI assets.
- Add genre-based placeholder images for books without covers.
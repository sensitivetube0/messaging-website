# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

what can be improved an ai code review and how to

###

//start of code review for messaging website

import React, { createContext, useContext, useState, useEffect } from "react";
import { authenticate } from "../apiCalls"; // Adjust import as needed

const AuthContext = createContext();

export function AuthProvider({ children }) {
const [user, setUser] = useState(null);

useEffect(() => {
async function fetchUser() {
try {
const user = await authenticate();
setUser(user);
} catch (err) {
setUser(null);
}
}
fetchUser();
}, []);

return (
<AuthContext.Provider value={{ user, setUser }}>
{children}
</AuthContext.Provider>
);
}

export function useAuth() {
return useContext(AuthContext);
}

###

export const STATUS_CODES = {
OK: 200,
CREATED: 201,
BAD_REQUEST: 400,
UNAUTHORIZED: 401,
FORBIDDEN: 403,
NOT_FOUND: 404,
INTERNAL_SERVER_ERROR: 500,
// Add more as needed
};

import { STATUS_CODES } from "../constants/statusCodes";

res.status(STATUS_CODES.BAD_REQUEST).json({ error: "Invalid input" });

###

if (err.name === "TokenExpiredError") {
return res.status(401).json({ error: "Refresh token expired" });
}
if (err.name === "JsonWebTokenError") {
return res.status(401).json({ error: "Invalid refresh token" });
}
return res.status(500).json({ error: "Server error" });
}

###

const page = parseInt(req.query.page) || 1;
const size = parseInt(req.query.size) || 20;
const offset = (page - 1) \* size;

const friends = await prisma.friend.findMany({
skip: offset,
take: size,
where: { userId: req.user.id },
});

res.json({ friends });

###

To give user feedback after a redirect, you can:
Use query parameters:
Pass a message in the URL, then display it on the redirected page.
On the /friends page, read the query param and show the message.
Use global state/context:
Set a success/error message in context before redirecting, then display it on the next page.
Use a notification system:
Trigger a toast/snackbar notification after redirect using a global notification context.
Summary:
Pass feedback via query params, global state, or a notification system, and display it on the redirected page.

Example of notification and message

A notification component listens for changes by subscribing to a global state or context that holds the notification message.
Example using React Context:
import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
const [message, setMessage] = useState(null);

return (
<NotificationContext.Provider value={{ message, setMessage }}>
{children}
</NotificationContext.Provider>
);
}

export function useNotification() {
return useContext(NotificationContext);
}

Notification component:
import { useEffect } from "react";
import { useNotification } from "../../context/NotificationContext";

export default function Notification() {
const { message, setMessage } = useNotification();

useEffect(() => {
if (message) {
const timer = setTimeout(() => setMessage(null), 3000); // 3 seconds
return () => clearTimeout(timer);
}
}, [message, setMessage]);

if (!message) return null;

return (
<div className="notification">
{message}
<button onClick={() => setMessage(null)}>Close</button>
</div>
);
}

###

// zod for backend

import { z } from "zod";

const signupSchema = z.object({
username: z.string().min(3),
password: z.string().min(6),
});

app.post("/signup", (req, res) => {
const result = signupSchema.safeParse(req.body);
if (!result.success) {
return res.status(400).json({ error: "Invalid input", details: result.error.errors });
}
// Proceed with valid data
// result.data contains the validated body
});

###

Zod for front end apiCalls

import { z } from "zod";

const userSchema = z.object({
user: z.object({
id: z.number(),
username: z.string(),
}),
});

const res = await fetch("/api/user");
const data = await res.json();

const parsed = userSchema.safeParse(data);
if (!parsed.success) {
// Handle invalid response
throw new Error("Invalid API response");
}

//start of code review and where I can improve

PLease look a all files provided and do a BRUTALLY HONEST code reveiew of all of them rating them on the merits u see fit thanks
Here’s a brutally honest code review of all the files you provided, with ratings and feedback on code quality, design, maintainability, security, and UX.

Backend
messagesController.js
Strengths:
Good use of Prisma for DB access.
Checks for friendship before sending messages.
Error handling is present.
Weaknesses:
Error messages are sometimes vague ("Server Error").
No input validation for message content (could be empty or malicious).
No rate limiting or spam protection.
Hardcoded status codes; consider using constants.
No sanitization of user input (possible XSS if not handled elsewhere). – SANTISE ALL USER INPUTS
Some logic is duplicated (e.g., checking messageId).
No comments explaining complex logic.
NOTE LOOK ABOVE FOR EXAMPLE OF STATUS CODE GLOBAL
Rating: 6/10

friendsController.js
Strengths:
Prevents adding yourself as a friend.
Checks for duplicates before adding.
Weaknesses:
Console logs left in production code.
No input validation for usernames.
No pagination for friends list (could be huge).
No comments.
Error messages are inconsistent.
NOTE LOOK ABOVE FOR EXAMPLE OF PAGINATION PRETTY MUCH JUST RETURN A CERTAIN AMOUNT OF USERS EACH TIME LOOK AT THE PRISMA CALL
Rating: 6/10

refresh.js
Strengths:
Handles JWT refresh logic.
Deletes expired tokens.
Weaknesses:
No comments.
No logging for successful refresh (could help debugging).
Error handling is decent but could be more granular.
Security: secure: false on cookies is risky for production.
No rate limiting.
NOTE IMPLEMENT BETTER ERROR HANDLING TO RETURN MORE DETAILED ERROR MESSAGE CHECK THE ERR MESSAGE DATA AND DO SOME LOGIC LOOK ABOVE
Rating: 7/10

Frontend
Actions (signupAction.js, loginAction.js, addFriendAction.js, sendAction.js)
Strengths:
Use async/await for clarity.
Basic error handling.
Redirects on success.
Weaknesses:
Error handling is inconsistent (sometimes returns objects, sometimes raw data).
No input validation beyond checking for empty fields.
No user feedback on success/failure except redirect.
No comments.
Logging sensitive errors to console.
NOTE LOOK ABOVE ON HOW TO IMPLEMENT USER FEEDBACK TO REDIRECT IMPORTANT FOR UX ALWAYS VALIDATE INPUTS
Rating: 6/10

Loaders (authenticateLoader.js, openMesssageLoader.js)
Strengths:
Attempts to refresh tokens on failure.
Redirects on authentication failure.
Weaknesses:
Too much nesting in error handling (hard to read).
No comments.
Console logs in production code.
No user feedback on why redirect happened. – implement user feedback
NOTE PUT USER AUTH IN A GLOBAL CONTEXT
Rating: 6/10

UI Components (inputField.jsx, controllledInput.jsx, dropDownSelect.jsx, textArea.jsx, boxDiv.jsx, priamryButton.jsx)
Strengths:
Use of CSS modules for styling.
Components are reusable and simple.
Weaknesses:
Typo in filename: controllledInput.jsx (should be controlledInput.jsx).
Typo in filename: priamryButton.jsx (should be primaryButton.jsx).
No PropTypes or type checking.
No accessibility features (e.g., ARIA attributes).
No comments.
Some props are not used or named inconsistently (placeHolder vs placeholder).
Button onClick default just logs event (not useful).

Rating: 5/10

API Layer (apiCalls.js)
Strengths:
Centralized API calls.
Uses Axios interceptors for token refresh.
Handles errors in deleteMessage.
Weaknesses:
No comments.
No type checking.
No retry logic for network errors.
Error handling is inconsistent.
No validation of API responses.
NOTE USE ZOD TO VALIDATE API CALLS AND RESPONSES LOOK INTO ZOD
Rating: 7/10

Routing (router.jsx)
Strengths:
Centralized route config.
Uses loaders and actions.
Weaknesses:
No comments.
No route protection for sensitive pages (relies on loader).
No error boundaries.
No lazy loading for components.
USE TANSTACK ROUTER AND TANSTACK FORM NTB TO IMPLEMENT LAZY LOADING OR EVEN GLOBAL LOADING STATE RELY ON GLOBAL CONTEXT INSTEAD OF LOADERS FOR AUTHENTICATION TANSTACK ROUTER IMPLEMENTS ERROR BOUNDRY BY DEFAULT JUST HAVE TO SET THE PAGE
Rating: 6/10

Pages (addFriendPage.jsx, bodyForFriend.jsx)
Strengths:
Uses React Query for data fetching.
Handles loading and error states.
Weaknesses:
No comments.
No PropTypes.
No accessibility features.
Error messages are not user-friendly.
No feedback on successful actions.
AGAIN LOOK AT HOW TO IMPLEMENT NOTIFACTION ON REDRECT ABOVE TO GIVE USER FEEDBAC ON REDIRECT

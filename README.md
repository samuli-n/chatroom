# Chat App
A single page public chatroom with user authentication built with React and Firebase Firestore.

[Live Demo](https://chat-app-34ce9.web.app/)


### Notes:

The message time/date will only be correct in UTC+2. This is because the value is stored as a string on the server. It would be very easy to create a cloud function to calculate this value server-side and thus ensure that the time is correct depending on the user's time zone. However, this would require me to add a payment method to Firebase, which I did not want to do for this toy project.

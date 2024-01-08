export const PORT = 5555;

const username = encodeURIComponent("root");
const password = encodeURIComponent("T9QMwLWuR0mGhDyM");

export const mongoDBURL = `mongodb+srv://${username}:${password}@bookstore-mern.srp3oot.mongodb.net/?retryWrites=true&w=majority`;

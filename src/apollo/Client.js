import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedIn = makeVar(localStorage.getItem("token") !== null ? true : false);

const client = new ApolloClient({
    uri: "https://nomadgram-backend.herokuapp.com/",
    cache: new InMemoryCache(),
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export default client;

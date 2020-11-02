import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedIn = makeVar(localStorage.getItem("token") !== null ? true : false);

const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export default client;

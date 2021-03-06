import { gql } from "@apollo/client";

export const LOG_IN = gql`
    mutation requestSecret($email: String!) {
        requestSecret(email: $email)
    }
`;

export const CREATE_ACCOUNT = gql`
    mutation createAccount($email: String!, $username: String!, $firstName: String, $lastName: String, $bio: String) {
        createAccount(email: $email, username: $username, firstName: $firstName, lastName: $lastName, bio: $bio)
    }
`;

export const CONFIRM_SERCRET = gql`
    mutation confirmSecret($secret: String!, $email: String!) {
        confirmSecret(secret: $secret, email: $email)
    }
`;

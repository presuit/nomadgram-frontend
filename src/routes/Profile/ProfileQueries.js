import { gql } from "@apollo/client";

export const GET_USER = gql`
    query seeUser($username: String!) {
        seeUser(username: $username) {
            id
            username
            avatar
            fullName
            itsSelf
            isFollowing
            postCount
            followingCount
            follwerCount
            bio
            posts {
                id
                files {
                    url
                }
                likeCount
                commentCount
            }
        }
    }
`;

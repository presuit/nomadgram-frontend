import { gql } from "@apollo/client";

export const SEARCH = gql`
    query search($term: String!) {
        searchByPost(term: $term) {
            id
            files {
                url
            }
            likeCount
            commentCount
        }
        searchByUser(term: $term) {
            id
            avatar
            username
            isFollowing
            itsSelf
        }
    }
`;

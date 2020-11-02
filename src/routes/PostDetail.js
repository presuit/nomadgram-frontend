import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Redirect, withRouter } from "react-router-dom";
import TargetPost from "../components/TargetPost/TargetPostContainer";
import Helmet from "react-helmet";
import Loader from "../components/Loader";

export const GET_POST_DETAIL = gql`
    query seeFullPost($id: String!) {
        seeFullPost(id: $id) {
            id
            location
            caption
            createdAt
            user {
                id
                avatar
                username
            }
            files {
                id
                url
            }
            likeCount
            isLiked
            comments {
                id
                text
                user {
                    id
                    username
                }
            }
        }
    }
`;

const PostDetail = withRouter((props) => {
    const {
        match: {
            params: { postid },
        },
    } = props;
    const { data, loading, error } = useQuery(GET_POST_DETAIL, {
        skip: postid === undefined || postid === null,
        variables: {
            id: postid,
        },
    });

    if (error) {
        return <Redirect to={"/"}></Redirect>;
    }

    if (loading) {
        return (
            <>
                <Helmet>
                    <title>포스트 디테일 | Nomadgram</title>
                </Helmet>
                <Loader></Loader>
            </>
        );
    } else {
        const {
            seeFullPost: { id, user, files, likeCount, isLiked, comments, location, caption, createdAt },
        } = data;
        return (
            <>
                <Helmet>
                    <title>{id} | Nomadgram</title>
                </Helmet>
                <TargetPost id={id} user={user} files={files} likeCount={likeCount} isLiked={isLiked} comments={comments} location={location} caption={caption} createdAt={createdAt}></TargetPost>
            </>
        );
    }
});

export default PostDetail;

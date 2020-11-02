import React from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../components/Loader";
import Post from "../components/Post/PostContainer";

const SEE_FEED = gql`
    query seeFeed {
        seeFeed {
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

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 80vh;
`;

const Feed = () => {
    const { data, loading } = useQuery(SEE_FEED);
    console.log(data);
    return (
        <Wrapper>
            <Helmet>
                <title>피드 | Nomadgram</title>
            </Helmet>
            {loading && <Loader></Loader>}
            {!loading &&
                data?.seeFeed &&
                data.seeFeed.map((post) => (
                    <Post
                        key={post.id}
                        location={post.location}
                        caption={post.caption}
                        id={post.id}
                        user={post.user}
                        files={post.files}
                        likeCount={post.likeCount}
                        isLiked={post.isLiked}
                        comments={post.comments}
                        createdAt={post.createdAt}
                    ></Post>
                ))}
        </Wrapper>
    );
};

export default Feed;

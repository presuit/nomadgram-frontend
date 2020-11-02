import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PostPresenter from "./PostPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT, TOGGLE_LIKE } from "./PostQueries";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { convertDate } from "../../util";

const Post = ({ id, user, files, likeCount, isLiked, comments, location, caption, createdAt }) => {
    createdAt = convertDate(createdAt);
    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE);
    const [addCommentMutation] = useMutation(ADD_COMMENT);
    const [count, setCount] = useState(likeCount);
    const [like, setLike] = useState(isLiked);
    const [currentItem, setCurrentItem] = useState(0);
    const [fakeComments, setFakeComments] = useState([]);
    const comment = useInput("");

    const slide = () => {
        const totalFiles = files.length;
        if (currentItem === totalFiles - 1) {
            setTimeout(() => {
                setCurrentItem(0);
            }, 3000);
        } else {
            setTimeout(() => {
                setCurrentItem(currentItem + 1);
            }, 3000);
        }
    };

    useEffect(() => {
        slide();
    }, [currentItem]);

    const toggleLike = async () => {
        if (like === true) {
            setLike(false);
            setCount(count - 1);
        } else {
            setLike(true);
            setCount(count + 1);
        }
        try {
            await toggleLikeMutation({
                variables: {
                    postId: id,
                },
            });
        } catch (err) {
            setLike(!like);
            toast.error("좋아요를 누를 수 없습니다.");
            throw err;
        }
    };

    const onKeyPress = async (e) => {
        const { which } = e;
        if (which === 13) {
            e.preventDefault();
            // make fake comment that is not registered yet. but auto rendered just right after user press enter
            // it is fake at start, but you can see the logic that save db with mutation , so it is saved
            const newFakeComment = {
                id: uuidv4(),
                text: comment.value,
                user,
            };
            setFakeComments([...fakeComments, newFakeComment]);
            comment.setValue("");
            await addCommentMutation({
                variables: {
                    text: comment.value,
                    postId: id,
                },
            });
        }
    };
    return (
        <PostPresenter
            newComment={comment}
            user={user}
            files={files}
            likeCount={count}
            isLiked={like}
            comments={comments}
            location={location}
            caption={caption}
            createdAt={createdAt}
            setCount={setCount}
            setLike={setLike}
            currentItem={currentItem}
            toggleLike={toggleLike}
            onKeyPress={onKeyPress}
            fakeComments={fakeComments}
        ></PostPresenter>
    );
};

Post.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    files: PropTypes.array,
    likeCount: PropTypes.number,
    isLiked: PropTypes.bool,
    comments: PropTypes.array,
    location: PropTypes.string,
    caption: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
};

export default Post;

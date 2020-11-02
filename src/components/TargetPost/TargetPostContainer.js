import React, { useEffect, useState } from "react";
import TargetPostPresenter from "./TargetPostPresenter";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT, TOGGLE_LIKE } from "./TargetPostQuries";
import useInput from "../../Hooks/useInput";
import { v4 as uuidv4 } from "uuid";

const TargetPostContainer = ({ id, user, files, likeCount, isLiked, comments, location, caption, createdAt }) => {
    const [fakeLike, setFakeLike] = useState(isLiked);
    const [fakeLikeCount, setFakeLikeCount] = useState(likeCount);
    const [fakeComment, setFakeComment] = useState([]);
    const [fileIndex, setFileIndex] = useState(0);
    const comment = useInput("");
    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE);
    const [addCommentMutation] = useMutation(ADD_COMMENT);
    const toggleLike = async () => {
        try {
            await toggleLikeMutation({
                variables: {
                    postId: id,
                },
            });
        } catch (err) {
            throw err;
        }
        if (fakeLike === true) {
            setFakeLike(false);
            setFakeLikeCount(fakeLikeCount - 1);
        } else {
            setFakeLike(true);
            setFakeLikeCount(fakeLikeCount + 1);
        }
    };
    const onCommentSubmit = async (e) => {
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
            setFakeComment([...fakeComment, newFakeComment]);
            comment.setValue("");
            await addCommentMutation({
                variables: {
                    text: comment.value,
                    postId: id,
                },
            });
        }
    };

    const slide = () => {
        if (fileIndex === files.length - 1) {
            setTimeout(() => {
                setFileIndex(0);
            }, 2000);
        } else {
            setTimeout(() => {
                setFileIndex(fileIndex + 1);
            }, 2000);
        }
    };

    useEffect(() => {
        slide();
    }, [fileIndex]);
    return (
        <TargetPostPresenter
            id={id}
            user={user}
            files={files}
            likeCount={fakeLikeCount}
            isLiked={fakeLike}
            comments={comments}
            location={location}
            caption={caption}
            createdAt={createdAt}
            toggleLike={toggleLike}
            comment={comment}
            onCommentSubmit={onCommentSubmit}
            fakeComment={fakeComment}
            fileIndex={fileIndex}
        ></TargetPostPresenter>
    );
};

TargetPostContainer.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    files: PropTypes.array,
    likeCount: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    comments: PropTypes.array,
    location: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
};

export default TargetPostContainer;

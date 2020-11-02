import React, { useState } from "react";
import FollowButtonPresenter from "./FollowButtonPresenter";
import PropTypes from "prop-types";
import { FOLLOW, UNFOLLOW } from "./FollowButtonQueries";
import { useMutation } from "@apollo/client";

const FollowButtonContainer = ({ isFollowing, id }) => {
    const [isFollowingS, setIsFollowingS] = useState(isFollowing);
    const [followMutation] = useMutation(FOLLOW);
    const [unfollowMutation] = useMutation(UNFOLLOW);

    const onClick = async () => {
        if (isFollowingS === true) {
            await unfollowMutation({
                variables: {
                    id,
                },
            });
            setIsFollowingS(false);
        } else {
            await followMutation({
                variables: {
                    id,
                },
            });
            setIsFollowingS(true);
        }
    };

    return <FollowButtonPresenter onClick={onClick} isFollowing={isFollowingS}></FollowButtonPresenter>;
};

FollowButtonContainer.propTypes = {
    isFollowing: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
};

export default FollowButtonContainer;

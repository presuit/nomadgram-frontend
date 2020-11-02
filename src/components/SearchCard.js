import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "./Avatar";
import FatText from "./FatText";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton/FollowButtonContainer";

const Card = styled.div`
    margin-right: 10px;
    ${(props) => props.theme.whiteBox};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const EAvatar = styled(Avatar)`
    margin-bottom: 15px;
`;

const ELink = styled(Link)`
    color: black;
    margin-bottom: 10px;
`;

const UserCard = ({ username, isFollowing, url, itsSelf, id }) => (
    <Card>
        <ELink to={`/${username}`}>
            <EAvatar url={url} size={"md"}></EAvatar>
            <FatText text={username}></FatText>
        </ELink>
        {!itsSelf && <FollowButton isFollowing={isFollowing} id={id}></FollowButton>}
    </Card>
);

UserCard.propTypes = {
    username: PropTypes.string.isRequired,
    isFollowing: PropTypes.bool.isRequired,
    url: PropTypes.string,
    itsSelf: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
};

export default UserCard;

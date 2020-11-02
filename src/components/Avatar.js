import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const getSize = (size) => {
    let number;
    if (size === "sm") {
        number = 30;
    }
    if (size === "md") {
        number = 50;
    }
    if (size === "lg") {
        number = 150;
    }

    return `
        width: ${number}px;
        height: ${number}px;
        `;
};

const Container = styled.div`
    ${(props) => getSize(props.size)};
    background-image: url(${(props) => props.url});
    background-size: cover;
    background-position: center center;
    border-radius: 50%;
`;

const Avatar = ({ size = "sm", url, className }) => {
    return <Container size={size} url={url} className={className}></Container>;
};

Avatar.propTypes = {
    size: PropTypes.oneOf(["sm", "md", "lg"]),
    url: PropTypes.string,
};

export default Avatar;

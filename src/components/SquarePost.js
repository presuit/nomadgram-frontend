import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FilledComment, Heart } from "./Icon";
import { Link } from "react-router-dom";

const Overlay = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
`;

const Container = styled.div`
    background-image: url(${(props) => props.bg.url});
    background-size: cover;
    background-position: center center;
    height: 100%;
    cursor: pointer;
    &:hover {
        ${Overlay} {
            opacity: 1;
        }
    }
`;

const Number = styled.div`
    color: white;
    display: flex;
    align-items: center;
    &:first-child {
        margin-right: 30px;
    }
`;

const NumberText = styled.span`
    margin-left: 10px;
    font-weight: 500;
    font-size: 16px;
`;

const Post = ({ likeCount, commentCount, file, id }) => {
    return (
        <Link to={`/posts/${id}`}>
            <Container bg={file}>
                <Overlay className="Overlay">
                    <Number>
                        <Heart color={"white"}></Heart>
                        <NumberText>{likeCount}</NumberText>
                    </Number>
                    <Number>
                        <FilledComment color={"white"}></FilledComment>
                        <NumberText>{commentCount}</NumberText>
                    </Number>
                </Overlay>
            </Container>
        </Link>
    );
};

Post.propTypes = {
    likeCount: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired,
    file: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
};

export default Post;

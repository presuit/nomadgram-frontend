import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.button`
    width: 100%;
    border: 0;
    border-radius: ${(props) => props.theme.borderRadius};
    color: white;
    font-weight: 600;
    background-color: ${(props) => props.theme.blueColor};
    padding: 7px 0px;
    font-size: 14px;
    cursor: pointer;
`;

const Button = ({ text, onClick }) => {
    return <Wrapper onClick={onClick}>{text}</Wrapper>;
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default Button;

import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.input`
    background-color: ${(props) => props.theme.bgColor};
    outline: none;
    border: ${(props) => props.theme.boxBorder};
    border-radius: ${(props) => props.theme.borderRadius};
    height: 35px;
    padding: 0px 15px;
    font-size: 12px;
    &::placeholder {
        opacity: 0.7;
    }
`;

const Input = ({ className, placeholder, required = true, value, onChange, type = "text" }) => {
    return <Wrapper className={className} type={type} placeholder={placeholder} required={required} value={value} onChange={onChange}></Wrapper>;
};

Input.propTypes = {
    placeholder: PropTypes.string.isRequired,
    required: PropTypes.bool,
    value: PropTypes.string,
    onchange: PropTypes.func,
    type: PropTypes.string,
    className: PropTypes.string,
};

export default Input;

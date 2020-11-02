import React from "react";
import styled, { keyframes } from "styled-components";
import { Loading } from "./Icon";

const Animation = keyframes`
   100% {
    transform: rotate(360deg);
   }
`;

const LoaderContainer = styled.div`
    color: ${(props) => props.theme.blueColor};
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
        animation: ${Animation} 1s linear infinite;
    }
`;

export default () => {
    return (
        <LoaderContainer>
            <Loading></Loading>
        </LoaderContainer>
    );
};

import React from "react";
import Theme from "../style/Theme";

export const Instagram = ({ size = Theme.iconSize }) => {
    return <i className="fab fa-instagram" style={{ fontSize: size }}></i>;
};

export const Explore = ({ size = Theme.iconSize }) => {
    return <i className="far fa-compass" style={{ fontSize: size }}></i>;
};

export const Heart = ({ size = Theme.iconSize, color = "black" }) => {
    return <i className="far fa-heart" style={{ fontSize: size, color }}></i>;
};

export const User = ({ size = Theme.iconSize }) => {
    return <i className="far fa-user" style={{ fontSize: size }}></i>;
};

export const Loading = ({ size = Theme.iconSize }) => {
    return <i className="fas fa-spinner" style={{ fontSize: size }}></i>;
};

export const Comment = ({ size = Theme.iconSize, color = "black" }) => {
    return <i className="far fa-comment" style={{ fontSize: size, color }}></i>;
};

export const FilledComment = ({ size = Theme.iconSize, color = "black" }) => {
    return <i className="fas fa-comment" style={{ fontSize: size, color }}></i>;
};

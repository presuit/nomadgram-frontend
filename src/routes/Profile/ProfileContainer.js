import React from "react";
import { useQuery } from "@apollo/client";
import { Redirect, withRouter } from "react-router-dom";
import { GET_USER } from "./ProfileQueries";
import ProfilePresenter from "./ProfilePresenter";
import { isLoggedIn } from "../../apollo/Client";

const ProfileContainer = withRouter((props) => {
    const {
        match: {
            params: { username: usernameParam },
        },
    } = props;
    const { data, loading, error } = useQuery(GET_USER, {
        variables: {
            username: usernameParam,
        },
    });

    const logOutUser = () => {
        console.log("LogOutUser");
        localStorage.removeItem("token");
        isLoggedIn(false);
        props.history.push("/");
        window.location.reload();
    };

    if (error) {
        return <Redirect to={"/"}></Redirect>;
    }
    return <ProfilePresenter loading={loading} data={data} logOutUser={logOutUser}></ProfilePresenter>;
});

export default ProfileContainer;

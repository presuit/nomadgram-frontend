import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Feed from "../routes/Feed";
import Auth from "../routes/Auth/AuthContainer";
import Profile from "../routes/Profile/ProfileContainer";
import Explore from "../routes/Explore";
import Notification from "../routes/Notification";
import Search from "../routes/Search/SearchContainer";
import PostDetail from "../routes/PostDetail";

const AppRouter = ({ isLoggedIn }) => {
    return (
        <>
            {isLoggedIn ? (
                <Switch>
                    <Route path="/" exact>
                        <Feed />
                    </Route>
                    <Route path="/explore">
                        <Explore></Explore>
                    </Route>
                    <Route path="/notification">
                        <Notification></Notification>
                    </Route>
                    <Route path="/search">
                        <Search></Search>
                    </Route>
                    <Route path="/posts/:postid">
                        <PostDetail></PostDetail>
                    </Route>
                    <Route path="/:username">
                        <Profile></Profile>
                    </Route>
                    <Redirect from={"*"} to={"/"}></Redirect>
                </Switch>
            ) : (
                <Switch>
                    <Route path="/" exact>
                        <Auth></Auth>
                    </Route>
                    <Redirect from={"*"} to={"/"}></Redirect>
                </Switch>
            )}
        </>
    );
};

AppRouter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;

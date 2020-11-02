import React from "react";
import styled from "styled-components";
import { Explore, Heart, Instagram, User } from "./Icon";
import { Link, withRouter } from "react-router-dom";
import Input from "./Input";
import useInput from "../Hooks/useInput";
import Theme from "../style/Theme";
import { gql, useQuery } from "@apollo/client";

const Header = styled.header`
    width: 100%;
    border: 0;
    border-bottom: ${(props) => props.theme.boxBorder};
    border-radius: 0px;
    margin-bottom: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 25px 0px;
    background-color: white;
`;

const HeaderWrapper = styled.div`
    width: 100%;
    max-width: ${(props) => props.theme.maxWidth};
    display: flex;
    align-items: center;
`;
const HeaderColumn = styled.div`
    width: 33%;
    text-align: center;
    &:first-child {
        margin-right: auto;
        text-align: left;
    }
    &:last-child {
        margin-left: auto;
        text-align: right;
    }
`;

const HeaderLink = styled(Link)`
    &:not(:last-child) {
        margin-right: 20px;
    }
`;

const SearchInput = styled(Input)`
    width: 100%;
    background-color: ${(props) => props.theme.bgColor};
    padding: 5px;
    height: auto;
    font-size: 14px;
    &::placeholder {
        opacity: 0.7;
        font-weight: 200;
    }
    border-radius: 3px;
    text-align: center;
`;

const ME = gql`
    query me {
        me {
            username
        }
    }
`;

export default withRouter(({ history }) => {
    const search = useInput("");
    const { data } = useQuery(ME);
    const onSearchSubmit = (e) => {
        e.preventDefault();
        history.push(`/search?term=${search.value}`);
        search.setValue("");
    };
    return (
        <Header>
            <HeaderWrapper>
                {/* insta icon */}
                <HeaderColumn>
                    <HeaderLink to={"/"}>
                        <Instagram size={Theme.iconSize}></Instagram>
                    </HeaderLink>
                </HeaderColumn>
                {/* search */}
                <HeaderColumn>
                    <form onSubmit={onSearchSubmit} acceptCharset={"utf-8"}>
                        <SearchInput placeholder={"Search..."} value={search.value} onChange={search.onChange}></SearchInput>
                    </form>
                </HeaderColumn>
                <HeaderColumn>
                    {/* notif icon */}
                    <HeaderLink to={"/notification"}>
                        <Explore size={Theme.iconSize}></Explore>
                    </HeaderLink>
                    {/* explore icon */}
                    <HeaderLink to={"/explore"}>
                        <Heart size={Theme.iconSize} color={Theme.blueColor}></Heart>
                    </HeaderLink>
                    {/* user icon */}
                    {!data?.me ? (
                        <HeaderLink to={"/"}>
                            <User size={Theme.iconSize}></User>
                        </HeaderLink>
                    ) : (
                        <HeaderLink to={data.me.username}>
                            <User size={Theme.iconSize}></User>
                        </HeaderLink>
                    )}
                </HeaderColumn>
            </HeaderWrapper>
        </Header>
    );
});

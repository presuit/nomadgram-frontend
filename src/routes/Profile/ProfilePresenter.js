import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import Avatar from "../../components/Avatar";
import FatText from "../../components/FatText";
import FollowButton from "../../components/FollowButton/FollowButtonContainer";
import Helmet from "react-helmet";
import SquarePost from "../../components/SquarePost";
import Button from "../../components/Button";

const Wrapper = styled.div`
    min-height: 60vh;
`;

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 80%;
    margin: 0 auto;
`;

const HeaderColumn = styled.div``;

const Username = styled.span`
    font-size: 18px;
    font-weight: 600;
    display: block;
    white-space: nowrap;
    margin-right: 10px;
`;
const UsernameRow = styled.div`
    display: flex;
    align-items: center;
`;

const Counts = styled.ul`
    display: flex;
    margin: 15px 0px;
`;

const Count = styled.li`
    font-size: 16px;
    &:not(:last-child) {
        margin-right: 10px;
    }
`;

const FullName = styled(FatText)`
    font-size: 16px;
    font-weight: 500;
`;

const Bio = styled.p`
    margin-top: 10px;
`;

const Posts = styled.div`
    display: grid;
    gap: 25px;
    grid-template-columns: repeat(4, 200px);
    grid-auto-rows: 200px;
    margin-top: 50px;
`;

const ProfilePresenter = ({ loading, data, logOutUser }) => {
    if (loading) {
        return (
            <>
                <Helmet>
                    <title>프로필 | Nomadgram</title>
                </Helmet>
                <Wrapper>
                    <Loader></Loader>
                </Wrapper>
            </>
        );
    } else if (!loading && data?.seeUser) {
        const {
            seeUser: { bio, avatar, followingCount, follwerCount, fullName, id, isFollowing, itsSelf, postCount, posts, username },
        } = data;
        return (
            <>
                <Helmet>
                    <title>{username} | Nomadgram</title>
                </Helmet>
                <Wrapper>
                    <Header>
                        <HeaderColumn>
                            <Avatar size={"lg"} url={avatar}></Avatar>
                        </HeaderColumn>
                        <HeaderColumn>
                            <UsernameRow>
                                <Username>{username}</Username>
                                {!itsSelf && <FollowButton isFollowing={isFollowing} id={id}></FollowButton>}
                                {itsSelf && <Button text={"LogOut"} onClick={logOutUser}></Button>}
                            </UsernameRow>
                            <Counts>
                                <Count>
                                    <FatText text={`${postCount}`}></FatText> posts
                                </Count>
                                <Count>
                                    <FatText text={`${follwerCount}`}></FatText> followers
                                </Count>
                                <Count>
                                    <FatText text={`${followingCount}`}></FatText> following
                                </Count>
                            </Counts>
                            <FullName text={fullName}></FullName>
                            <Bio>{bio}</Bio>
                        </HeaderColumn>
                    </Header>
                    <Posts>{posts && posts.map((post) => <SquarePost key={post.id} id={post.id} file={post.files[0]} likeCount={post.likeCount} commentCount={post.commentCount}></SquarePost>)}</Posts>
                </Wrapper>
            </>
        );
    }
};

ProfilePresenter.propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.object,
    logOutUser: PropTypes.func,
};

export default ProfilePresenter;

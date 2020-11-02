import React from "react";
import styled from "styled-components";
import FatText from "../../components/FatText";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import UserCard from "../../components/SearchCard";
import SquarePost from "../../components/SquarePost";

const Wrapper = styled.div`
    height: 50vh;
`;

const SearchIndicator = styled(FatText)`
    display: block;
    margin-bottom: 10px;
`;
const Section = styled.div`
    display: grid;
    gap: 25px;
    grid-template-columns: repeat(4, 160px);
    grid-auto-rows: 160px;
    margin-bottom: 50px;
`;

const PostSection = styled(Section)`
    grid-template-columns: repeat(4, 200px);
    grid-auto-rows: 200px;
`;

const SearchPresenter = ({ term, data, loading }) => {
    if (term === undefined) {
        return (
            <Wrapper>
                <SearchIndicator text={"검색어를 입력해 주세요."}></SearchIndicator>
            </Wrapper>
        );
    } else if (loading === true) {
        return (
            <Wrapper>
                <Loader></Loader>
            </Wrapper>
        );
    } else if ((data && data.searchByUser) || (data && data.searchByPost)) {
        return (
            <Wrapper>
                <Section>
                    {!loading && data?.searchByUser?.length === 0 ? (
                        <SearchIndicator text={"일치하는 유저가 없습니다!"}></SearchIndicator>
                    ) : (
                        data.searchByUser.map((user) => {
                            return <UserCard key={user.id} id={user.id} username={user.username} isFollowing={user.isFollowing} url={user.avatar} itsSelf={user.itsSelf}></UserCard>;
                        })
                    )}
                </Section>
                <PostSection>
                    {!loading && data?.searchByPost?.length === 0 ? (
                        <SearchIndicator text={"일치하는 게시물이 없습니다!"}></SearchIndicator>
                    ) : (
                        data.searchByPost.map((post) => <SquarePost key={post.id} file={post.files[0]} likeCount={post.likeCount} commentCount={post.commentCount}></SquarePost>)
                    )}
                </PostSection>
            </Wrapper>
        );
    }
};

SearchPresenter.propTypes = {
    term: PropTypes.string,
};

export default SearchPresenter;

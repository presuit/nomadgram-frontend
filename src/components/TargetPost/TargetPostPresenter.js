import React from "react";
import styled from "styled-components";
import { Heart } from "../Icon";
import Theme from "../../style/Theme";
import { Comment as CommentIcon } from "../Icon";
import TextareaAutosize from "react-autosize-textarea";
import FatText from "../FatText";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
    display: flex;
    ${(props) => props.theme.whiteBox};
`;

const Files = styled.div`
    width: 60%;
    height: 800px;
    position: relative;
`;

const File = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.url});
    background-size: cover;
    background-position: center center;
    position: absolute;
    top: 0;
    left: 0;
    opacity: ${(props) => (props.isShowing === true ? 1 : 0)};
    transition: opacity 0.3s linear;
`;

const PostInfoWrapper = styled.div`
    width: 40%;
    height: 800px;
    padding: 0px 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const UserColumn = styled.div`
    width: 100%;
    display: flex;
    padding: 15px 0px;
    align-items: center;
    border-bottom: ${(props) => props.theme.boxBorder};
`;

const UserInfoColumn = styled.div``;

const CommentColumn = styled.div`
    width: 100%;
    margin: 0px 0px auto 0px;
`;

const Comments = styled.ul`
    width: 100%;
    margin-top: 10px;
`;

const Comment = styled.li`
    margin-bottom: 7px;
    span {
        margin-right: 7px;
    }
`;

const MetaColumn = styled.div`
    width: 100%;
    margin-top: 10px;
`;

const TextArea = styled(TextareaAutosize)`
    border: none;
    border-top: ${(props) => props.theme.boxBorder};
    width: 100%;
    padding: 10px 15px;
    resize: none;
    font-size: 14px;
    margin-top: 10px;
    &:focus {
        outline: none;
    }
`;

const UserText = styled(FatText)`
    display: block;
    font-size: 12px;
    &:first-child {
        margin-bottom: 5px;
    }
`;

const Buttons = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin: 10px 0px;
`;

const Button = styled.span`
    &:first-child {
        margin-right: 20px;
    }
`;

const EAvatar = styled(Avatar)`
    margin-right: 10px;
`;

const ELink = styled(Link)`
    color: inherit;
`;

const TargetPostPresenter = ({ fileIndex, fakeComment, onCommentSubmit, comment, toggleLike, id, user, files, likeCount, isLiked, comments, location, caption, createdAt }) => {
    return (
        <Wrapper>
            <Files>{files && files.map((file, index) => <File isShowing={fileIndex === index} key={file.id} id={file.id} url={file.url}></File>)}</Files>
            <PostInfoWrapper>
                <UserColumn>
                    <ELink to={`/${user.username}`}>
                        <EAvatar url={user.avatar}></EAvatar>
                    </ELink>
                    <UserInfoColumn>
                        <ELink to={`/${user.username}`}>
                            <UserText text={user.username}></UserText>
                            <UserText text={location}></UserText>
                        </ELink>
                    </UserInfoColumn>
                </UserColumn>
                <CommentColumn>
                    <Comments>
                        {comments &&
                            comments.map((comment) => (
                                <Comment key={comment.id}>
                                    <FatText text={comment.user.username}></FatText>
                                    {comment.text}
                                </Comment>
                            ))}
                        {fakeComment.length !== 0 &&
                            fakeComment.map((item) => (
                                <Comment key={item.id}>
                                    <FatText text={item.user.username}></FatText>
                                    {item.text}
                                </Comment>
                            ))}
                    </Comments>
                </CommentColumn>
                <MetaColumn>
                    <Buttons>
                        <Button onClick={toggleLike}>{isLiked ? <Heart color={Theme.redColor}></Heart> : <Heart color={Theme.lightGreyColor}></Heart>}</Button>
                        <Button>
                            <CommentIcon></CommentIcon>
                        </Button>
                    </Buttons>
                    <FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`}></FatText>
                    <TextArea placeholder={"댓글을 적어주세요."} onKeyPress={onCommentSubmit} onChange={comment.onChange} value={comment.value}></TextArea>
                </MetaColumn>
            </PostInfoWrapper>
        </Wrapper>
    );
};

export default TargetPostPresenter;

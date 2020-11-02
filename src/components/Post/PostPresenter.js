import React from "react";
import styled from "styled-components";
import Theme from "../../style/Theme";
import Avatar from "../Avatar";
import FatText from "../FatText";
import { Comment as CommentIcon, Heart } from "../Icon";
import TextareaAutosize from "react-autosize-textarea";
import { Link } from "react-router-dom";

const Post = styled.div`
    ${(props) => props.theme.whiteBox};
    width: 100%;
    max-width: 600px;
    margin-bottom: 25px;
    user-select: none;
`;

const Header = styled.header`
    padding: 15px;
    display: flex;
    align-items: center;
`;

const UserColumn = styled.div`
    margin-left: 10px;
`;

const Location = styled.span`
    display: block;
    margin-top: 10px;
    font-size: 12px;
`;

const Files = styled.div`
    position: relative;
    height: 800px;
    padding-bottom: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-shrink: 0;
`;

const File = styled.div`
    position: absolute;
    top: 0;
    height: 100%;
    background-image: url(${(props) => props.src});
    background-size: cover;
    background-position: center center;
    max-width: 100%;
    width: 100%;
    opacity: ${(props) => (props.showing ? 1 : 0)};
    transition: opacity 0.5s linear;
`;
const Button = styled.span`
    cursor: pointer;
`;

const Meta = styled.div`
    margin: 15px;
`;

const Buttons = styled.div`
    ${Button} {
        &:first-child {
            margin-right: 10px;
        }
    }
    margin-bottom: 10px;
`;

const TimeStamp = styled.span`
    font-weight: 400;
    text-transform: uppercase;
    opacity: 0.5;
    display: block;
    font-size: 12px;
    margin-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid ${(props) => props.theme.lightGreyColor};
`;

const TextArea = styled(TextareaAutosize)`
    border: none;
    width: 100%;
    padding: 10px 15px;
    resize: none;
    font-size: 14px;
    &:focus {
        outline: none;
    }
`;

const Comments = styled.ul`
    margin-top: 10px;
`;

const Comment = styled.li`
    margin-bottom: 7px;
    span {
        margin-right: 7px;
    }
`;

const ELink = styled(Link)`
    color: black;
`;

const PostPresenter = ({ fakeComments, onKeyPress, toggleLike, currentItem, newComment, user: { username, avatar }, files, likeCount, isLiked, comments, location, caption, createdAt }) => {
    return (
        <Post>
            <Header>
                <ELink to={`/${username}`}>
                    <Avatar size={"sm"} url={avatar}></Avatar>
                </ELink>
                <UserColumn>
                    <ELink to={`/${username}`}>
                        <FatText text={username}></FatText>
                    </ELink>
                    <Location>{location}</Location>
                </UserColumn>
            </Header>
            <Files>{files && files.map((file, index) => <File key={file.id} id={file.id} src={file.url} showing={index === currentItem}></File>)}</Files>
            <Meta>
                <Buttons>
                    <Button onClick={toggleLike}>{isLiked ? <Heart color={Theme.redColor}></Heart> : <Heart color={Theme.lightGreyColor}></Heart>}</Button>
                    <Button>
                        <CommentIcon></CommentIcon>
                    </Button>
                </Buttons>
                <FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`}></FatText>
                {comments && (
                    <Comments>
                        {comments.map((comment) => (
                            <Comment key={comment.id}>
                                <FatText text={comment.user.username}></FatText>
                                {comment.text}
                            </Comment>
                        ))}
                        {fakeComments.length !== 0 &&
                            fakeComments.map((fakeComment) => (
                                <Comment key={fakeComment.id}>
                                    <FatText text={fakeComment.user.username}></FatText>
                                    {fakeComment.text}
                                </Comment>
                            ))}
                    </Comments>
                )}
                <TimeStamp> {createdAt}</TimeStamp>
            </Meta>
            <TextArea placeholder={"Add a Comment"} value={newComment.value} onChange={newComment.onChange} onKeyPress={onKeyPress}></TextArea>
        </Post>
    );
};

export default PostPresenter;

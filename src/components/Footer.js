import React from "react";
import styled from "styled-components";

const Wrapper = styled.footer`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px;
`;

const List = styled.ul`
    width: 60%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const ListItem = styled.li`
    font-size: 12px;
`;

const Link = styled.a`
    &:hover {
        border-bottom: 1px solid black;
    }
    color: ${(props) => props.theme.darkBlueColor};
`;

const Footer = () => {
    return (
        <Wrapper>
            <List>
                <ListItem>
                    <Link href="#">소개</Link>
                </ListItem>
                <ListItem>
                    <Link href="#">도움말</Link>
                </ListItem>
                <ListItem>
                    <Link href="#">홍보 센터</Link>
                </ListItem>
                <ListItem>
                    <Link href="#">API</Link>
                </ListItem>
                <ListItem>
                    <Link href="#">채용정보</Link>
                </ListItem>
                <ListItem>
                    <Link href="#">개인정보처리방침</Link>
                </ListItem>
                <ListItem>
                    <Link href="#">약관</Link>
                </ListItem>
                <ListItem>
                    <Link href="#">위치</Link>
                </ListItem>
                <ListItem>
                    <Link href="#">인기 계정</Link>
                </ListItem>
                <ListItem>
                    <Link href="#">해시태그</Link>
                </ListItem>
                <ListItem>
                    <Link href="#">언어</Link>
                </ListItem>
            </List>
        </Wrapper>
    );
};

export default Footer;

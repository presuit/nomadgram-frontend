import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Input from "../../components/Input";
import Button from "../../components/Button";

const Wrapper = styled.div`
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Box = styled.div`
    ${(props) => props.theme.whiteBox};
    border-radius: 0;
    width: 100%;
    max-width: 350px;
`;

const StateChanger = styled(Box)`
    text-align: center;
    padding: 20px 0px;
`;

const Form = styled(Box)`
    padding: 40px;
    padding-bottom: 30px;
    margin-bottom: 15px;
    form {
        width: 100%;
        input {
            width: 100%;
            &:not(:last-child) {
                margin-bottom: 10px;
            }
        }
        button {
            margin-top: 15px;
        }
    }
`;

const Link = styled.span`
    color: ${(props) => props.theme.blueColor};
    margin-left: 5px;
    cursor: pointer;
`;

const AuthPresenter = ({ secret, onSubmit, action, username, email, lastName, firstName, setAction }) => {
    return (
        <Wrapper>
            <Helmet>
                <title>로그인 | Nomadgram</title>
            </Helmet>
            <Form>
                {action === "logIn" && (
                    <form onSubmit={onSubmit}>
                        <Input placeholder={"이메일"} value={email.value} onChange={email.onChange} type={"email"}></Input>
                        <Button text={"로그인"}></Button>
                    </form>
                )}
                {action === "signUp" && (
                    <>
                        <Helmet>
                            <title>회원가입 | Nomadgram</title>
                        </Helmet>
                        <form onSubmit={onSubmit}>
                            <Input placeholder={"이메일"} value={email.value} onChange={email.onChange} type={"email"}></Input>
                            <Input placeholder={"유저이름"} value={username.value} onChange={username.onChange}></Input>
                            <Input placeholder={"성"} value={firstName.value} onChange={firstName.onChange}></Input>
                            <Input placeholder={"이름"} value={lastName.value} onChange={lastName.onChange}></Input>
                            <Button text={"가입"}></Button>
                        </form>
                    </>
                )}
                {action === "confirm" && (
                    <>
                        <Helmet>
                            <title>시크릿 확인 | Nomadgram</title>
                        </Helmet>
                        <form onSubmit={onSubmit}>
                            <Input placeholder={"시크릿"} value={secret.value} onChange={secret.onChange}></Input>
                            <Button text={"시크릿 확인"}></Button>
                        </form>
                    </>
                )}
            </Form>
            {action !== "confirm" && (
                <StateChanger>
                    {action === "logIn" && (
                        <>
                            계정이 없으신가요?
                            <Link onClick={() => setAction("signUp")}>가입하기</Link>
                        </>
                    )}
                    {action === "signUp" && (
                        <>
                            계정이 있으신가요?
                            <Link onClick={() => setAction("logIn")}>로그인</Link>
                        </>
                    )}
                </StateChanger>
            )}
        </Wrapper>
    );
};

export default AuthPresenter;

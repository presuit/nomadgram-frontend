import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "@apollo/client";
import { CONFIRM_SERCRET, CREATE_ACCOUNT, LOG_IN } from "./AuthQueries";
import { toast } from "react-toastify";
import { isLoggedIn } from "../../apollo/Client";

const AuthContainer = () => {
    const [action, setAction] = useState("logIn");
    const [requestSecret] = useMutation(LOG_IN);
    const [createAccount] = useMutation(CREATE_ACCOUNT);
    const [confirmSecret] = useMutation(CONFIRM_SERCRET);

    const username = useInput("");
    const firstName = useInput("");
    const lastName = useInput("");
    const email = useInput("");
    const secret = useInput("");

    const onSubmit = async (e) => {
        e.preventDefault();
        if (action === "logIn") {
            if (email.value !== "") {
                try {
                    const newsecret = await requestSecret({
                        variables: { email: email.value },
                    });
                    const {
                        data: { requestSecret: requestSecretData },
                    } = newsecret;
                    if (!requestSecretData) {
                        toast.error("시크릿값을 요청하는데 실패했습니다.");
                        setTimeout(() => {
                            setAction("signUp");
                        }, 2000);
                    } else {
                        toast.success("시크릿 값을 요청하는데 성공하였습니다!");
                        setTimeout(() => {
                            setAction("confirm");
                        }, 2000);
                    }
                } catch (err) {
                    toast.error(err.message);
                }
            } else {
                toast.error("이메일 값이 비었습니다.");
            }
        } else if (action === "signUp") {
            if (email.value !== "" && username.value !== "" && firstName.value !== "" && lastName.value !== "") {
                try {
                    const newAccount = await createAccount({
                        variables: {
                            email: email.value,
                            username: username.value,
                            firstName: firstName.value,
                            lastName: lastName.value,
                            bio: "",
                        },
                    });
                    const {
                        data: { createAccount: createAccountData },
                    } = newAccount;
                    if (!createAccountData) {
                        toast.error("회원가입에 실패하였습니다.");
                    } else {
                        toast.success("회원가입에 성공하였습니다. 로그인 해주세요!");
                        setTimeout(() => {
                            setAction("logIn");
                        }, 2000);
                    }
                } catch (err) {
                    toast.error(err.message);
                }
            } else {
                toast.error("모든 입력 칸을 완성해 주세요.");
            }
        } else if (action === "confirm") {
            if (secret.value !== "") {
                try {
                    const newConfirmSecret = await confirmSecret({
                        variables: {
                            secret: secret.value,
                            email: email.value,
                        },
                    });
                    const {
                        data: { confirmSecret: secretToken },
                    } = newConfirmSecret;
                    if (secretToken !== "" && secretToken !== undefined) {
                        localStorage.setItem("token", secretToken);
                        isLoggedIn(true);
                        window.location.reload();
                    } else {
                        throw Error();
                    }
                } catch (err) {
                    toast.error(err.message);
                }
            } else {
                toast.error("시크릿 값이 비었습니다.");
            }
        }
    };

    return <AuthPresenter secret={secret} onSubmit={onSubmit} setAction={setAction} action={action} username={username} firstName={firstName} lastName={lastName} email={email}></AuthPresenter>;
};

export default AuthContainer;

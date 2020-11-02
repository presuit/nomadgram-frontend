import React from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "../style/GlobalStyles";
import Theme from "../style/Theme";
import AppRouter from "./Router";
import Footer from "./Footer";
import Header from "./Header";
import { HashRouter } from "react-router-dom";
import { isLoggedIn } from "../apollo/Client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wrapper = styled.div`
    margin: 0 auto;
    max-width: ${(props) => props.theme.maxWidth};
    width: 100%;
`;

const App = () => {
    return (
        <ThemeProvider theme={Theme}>
            <GlobalStyles />
            <HashRouter>
                {isLoggedIn() && <Header />}
                <Wrapper>
                    <AppRouter isLoggedIn={isLoggedIn()} />
                    <Footer></Footer>
                </Wrapper>
            </HashRouter>
            <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
        </ThemeProvider>
    );
};
export default App;

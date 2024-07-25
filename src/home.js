import React from "react";
import Header from "./components/Header";
import MainContainer from './components/MainContainer';

const Home = () => {
    return (
        <div className="h-screen w-full">
            <Header />
            <MainContainer />
        </div>
    );
};

export default Home;
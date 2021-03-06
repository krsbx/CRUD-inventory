import React, { Component } from 'react';
import style from 'styled-components';

const Styled = style.div`
.navbar{
    position: fixed;
    background: transparent;
    width: 100%;
    padding: 25px 0;
    top: 0;
    z-index: 999;
    transition: .3s linear;
}

.inner-width{
    max-width: 13000px;
    margin: auto;
    padding: 0 40px;
}

.navbar .inner-width{
    padding-top: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo{
    position: absolute;
    left: 20px;
    padding-left: 80px;
}

.logo span{
    background: linear-gradient(130deg, #e66767, #74b9ff);
    border-radius: 50%;
    padding: 10px;
    background-size: 200% 200%;
    animation: gradient 2s linear infinite;
}

.logo a{
    font-family: "vampire_warsitalic", sans-serif;
    color: #ffffff;
    padding-right: 5px;
    font-size: 20px;
    font-weight: 100;
}

.logo a:hover{
    color: #183241;
}

.container{
    height: 100vh;
    min-height: 500px;
    background-size: cover;
    background-attachment: fixed;
    background: url('../Images/wallpaper.jpg') no-repeat center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
}

@keyframes gradient{
    25%{
        background-position: left bottom;
    }
    50%{
        background-position: right bottom;
    }
    75%{
        background-position: right top;
    }
    100%{
        background-position: left top;
    }
}

.menu-btn{
    background: none;
    width: 30px;
    border: none;
    cursor: pointer;
    position: absolute;
    right: 20px;
    outline: none;
    z-index: 999;
    display: none;
}

.menu-btn span{
    display: block;
    height: 3px;
    background-color: #ffffff;
    margin: 6px 0;
    position: relative;
    transition: .3s linear;
}

.navbar-menu{
    padding-right: 60px;
}

.navbar-menu a{
    color: #ffffff;
    font-size: 15px;
    font-weight: 600px;
    margin-left: 60px;
    transition: .2s linear;
}

.navbar-menu a:hover{
    color: #e66767;
}

.sticky{
    background: #183241;
}


@media screen and (max-width:980px){
    .logo{
        padding-top: 20px;
        left: 20px;
        padding-left: 60px;
    }

    .navbar{
        padding: 20px 0;
    }

    .navbar .inner-width{
        padding-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .logo{
        padding-left: 0;
    }

    .navbar-menu{
        padding-right: 0;
    }

    .menu-btn{
        display: block;
    }

    .navbar-menu{
        position: fixed;
        height: 100vh;
        width: 100%;
        background: #183241;
        top: 0;
        right: -100%;
        max-width: 480px;
        padding: 80px 50px;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        transition: .3s linear;
    }

    .navbar-menu a{
        display: block;
        text-align: center;
        font-size: 20px;
        font-weight: 600;
        margin: 30px 0;
    }

    .navbar-menu.active{
        right: 0;
    }

    .menu-btn.active span:nth-child(1){
        transform: rotate(-45deg);
        top: 4px;
    }
    .menu-btn.active span:nth-child(2){
        opacity: 0;
    }
    .menu-btn.active span:nth-child(3){
        transform: rotate(45deg);
        bottom: 14px;
    }
}
`;


export default class NavBar extends Component {
    constructor(props){
        super(props);
    }

    render () {
        let isAuthorized = localStorage.getItem('isAuthorized');

        const Login_Logout = () => {
            if(isAuthorized == "true"){
                return <a href="http://localhost:8000/logout">Logout</a>;
            }
            return <a href="http://localhost:8000/login">Login</a>;
        }

        return (
        <Styled>
        <nav class="navbar">
            <div class="logo">
                <span>
                    <a href="http://localhost:8000">K</a>
                </span>
            </div>
            <div class="inner-width">
                <div class="navbar-menu">
                    <a href="http://localhost:8000">Home</a>
                    <a href="http://localhost:8000/register">Register</a>
                    {Login_Logout()}
                    <a href="http://localhost:8000/about">About</a>
                </div>
            </div>
            <button class="menu-btn">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </nav>
        </Styled>
        );
    }
}
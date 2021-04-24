import React, { useState, useEffect } from 'react';
import AppsIcon from '@material-ui/icons/Apps';
import CloseIcon from '@material-ui/icons/Close';
import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SideBarData from './SideBarData';
import NavBarData from './NavBarData';
import './SideBar.css'

function IsAuthtenticated () {
    const authenticated = localStorage.getItem('isAuthorized');

    if(authenticated == 'true'){
        return (
            SideBarData.map((item, id) => {
                return (
                    <li key={id} className={item.clName}>
                        <Link to={item.path}>
                            <div className="items_icons">{item.icon}</div>
                            <span>{item.title}</span>
                        </Link>
                    </li>
                );
            }, this)
        );
    }else{
        return (
            <div className='notif-text'>
                <Link to='/login'>
                    <span>Sign In First!</span>
                </Link>
            </div>
        );
    }
}


export default function SideBar () {
    const [sideBar, setSideBar] = useState(false);

    const showSideBar = () => {
        setSideBar(!sideBar);
    }

    return (
        <div className='Navigations'>
            <div className='SideBar'>
                <Link to='#' className='MenuBar'>
                    <AppsIcon onClick={showSideBar} />
                </Link>
                <div className='Hide-Able-Menu'>
                    {NavBarData.map((item, id) => {
                        return (
                            <li key={id} className={item.clName}>
                                <Link to={item.path}>
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    }, this)}
                </div>
            </div>
            <nav className={sideBar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSideBar}>
                    <li className='navbar-toggler'>
                        <Link to='#' className='MenuBar'>
                            <CloseIcon onClick={showSideBar} className='closeIcons'/>
                        </Link>
                    </li>
                    <div className='To-Show-Menu'>
                        {NavBarData.map((item, id) => {
                            return (
                                <li key={id} className={item.clName}>
                                    <Link to={item.path}>
                                    <div className="menu_icons">{item.icon}</div>
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        }, this)}
                    </div>
                    <IsAuthtenticated />
                </ul>
            </nav>
        </div>
    );
}
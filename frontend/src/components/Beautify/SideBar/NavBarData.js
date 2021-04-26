import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const NavBarData = [
    {
        title: 'Home',
        path: '/',
        icon: <HomeIcon />,
        clName: 'menu-text'
    },
    {
        title: 'Sign In',
        path: '/login',
        icon: <VpnKeyIcon />,
        clName: 'menu-text'
    },
    {
        title: 'Sign Up',
        path: '/register',
        icon: <ExitToAppIcon />,
        clName: 'regis-text'
    },
]

export default NavBarData;
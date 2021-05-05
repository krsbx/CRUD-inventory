import React from 'react';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import CreateIcon from '@material-ui/icons/Create';
import ApartmentIcon from '@material-ui/icons/Apartment';
import BookIcon from '@material-ui/icons/Book';

const SideBarData = [
    {
        title: 'Peminjaman',
        path: '/peminjaman',
        icon: <CreateIcon />,
        clName: 'nav-text'
    },
    {
        title: 'Barang',
        path: '/barang',
        icon: <BookIcon />,
        clName: 'nav-text'
    },
    {
        title: 'Gedung',
        path: '/gedung',
        icon: <ApartmentIcon />,
        clName: 'nav-text'
    },
    {
        title: 'Ruang',
        path: '/ruang',
        icon: <MeetingRoomIcon />,
        clName: 'nav-text'
    }
]

export default SideBarData;
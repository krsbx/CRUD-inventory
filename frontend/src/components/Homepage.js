import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import Logout from './Logout';
import Gedung from './Inventaris/Gedung';
import Barang from './Inventaris/Barang';
import Ruang from './Inventaris/Ruang';
import Peminjaman from './Inventaris/Peminjaman';
import Details from './Inventaris/Details';
import SideBar from './Beautify/SideBar/SideBar';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

export default class Homepage extends Component {
    constructor(props){
        super(props);
    }

    render () {
        let isAuthorized = localStorage.getItem('isAuthorized'); // mengambil variabel isAutho pada cache 

        const drawRegister = () => {    // render peminjaman atau register
            if(isAuthorized == "true"){
                return <Peminjaman />
            }
            return <Register />;
        }

        return  (
        <Router>
            <SideBar />
            <Switch>
                <div className="container">
                    <Route exact path='/' component={drawRegister} /> 
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/peminjaman/' component={Peminjaman} />
                    <Route path='/detail/:nomor_peminjaman' component={Details} />
                    <Route path='/barang/' component={Barang} />
                    <Route path='/gedung/' component={Gedung} />
                    <Route path='/ruang/' component={Ruang} />
                </div>
            </Switch>
        </Router>
        );
    }
} 
/*
line 33  jika link tepat pada host tampilkan nilai dari drawRegister 
line 34 - 41 tampilkan component sesuai dengan uri (link)
*/
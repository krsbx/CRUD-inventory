import React, { Component } from 'react';
import About from './About';
import NavBar from './NavBar';
import Login from './Login';
import Register from './Register';
import Logout from './Logout';
import Gedung from './Gedung';
import Barang from './Barang';
import Ruang from './Ruang';
import Peminjaman from './Peminjaman';
import Details from './Details';
import SideBar from './Beautify/SideBar/SideBar';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

export default class Homepage extends Component {
    constructor(props){
        super(props);
    }

    render () {
        let isAuthorized = localStorage.getItem('isAuthorized');

        const drawRegister = () => {
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
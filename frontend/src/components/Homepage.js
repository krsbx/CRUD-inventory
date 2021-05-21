import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import Logout from './Logout';
import Gedung from './Inventaris/Gedung';
import EditGedung from './Beautify/Gedung/EditGedung';
import Barang from './Inventaris/Barang';
import BarangInfo from './Beautify/Barang/BarangInfo';
import EditBarang from './Beautify/Barang/EditBarang';
import Ruang from './Inventaris/Ruang';
import EditRuang from './Beautify/Ruang/EditRuang';
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
                    <Route exact path='/barang/' component={Barang} />
                    <Route exact path='/barang/:kode_barang' component={BarangInfo} />
                    <Route exact path='/barang/edit/:kode_barang' component={EditBarang} />
                    <Route exact path='/gedung/' component={Gedung} />
                    <Route exact path='/gedung/edit/:gedung' component={EditGedung} />
                    <Route exact path='/ruang/' component={Ruang} />
                    <Route exact path='/ruang/edit/:ruang' component={EditRuang} />
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
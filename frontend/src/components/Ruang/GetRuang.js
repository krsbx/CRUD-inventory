import React, { Component } from 'react';
import axiosInstance from '../AxiosInstance';
import { Button, TextField } from '@material-ui/core';

export default class GetRuang extends Component {
    constructor(props){
        super(props);

        this.state = {
            ruang : [],
        }
    }

    /*
        RuangList function will create a GET Rest API
        All informations retrieved will be printed in browser console
    */

    RuangList = () => {
        axiosInstance.get(`/api/ruang/`).then((result) => {
            const data = result.data.results;
            let ruangList = data.map((r) => {
                return (
                    <div className="GroupsOfRows">
                        <div className="CustomRow">{r.ruangID}</div>
                        <div className="CustomRow">{r.ruang}</div>
                        <div className="CustomRow">{r.pj_ruang}</div>
                        <div className="CustomRow">{r.gedung}</div>
                    </div>
                );
            }, this);
            this.setState( { ruang : ruangList } )
        });
    }

    componentDidMount () {
        this.RuangList();
    }

    /*
        render function is used to render all necessary component for the page
    */

    render () {
        return (
        <>
            <div className="CustomTables">
                <div className="CustomHeader">ID Ruang</div>
                <div className="CustomHeader">Ruang</div>
                <div className="CustomHeader">PJ Ruang</div>
                <div className="CustomHeader">Gedung</div>
                { this.state.ruang }
            </div>
            <Button variant="contained" color="primary" onClick={() => this.RuangList()}>Get Ruang!</Button>
        </>
        );
    }
}
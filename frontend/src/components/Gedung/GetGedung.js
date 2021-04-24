import React, { Component } from 'react';
import axiosInstance from '../AxiosInstance';
import { Button, TextField } from '@material-ui/core';

export default class GetOptions extends Component {
    constructor(props){
        super(props);

        this.state = {
            gedung : [],
        }
    }

    /*
        GedungList function will create a GET Rest API
        All informations retrieved will be printed in browser console
    */

    GedungList = () => {
        axiosInstance.get(`/api/gedung/`).then((result) => {
            const data = result.data.results;
            let gedungList = data.map((g) => {
                return (
                    <div className="GroupsOfRows">
                        <div className="CustomRow">{g.gedungID}</div>
                        <div className="CustomRow">{g.gedung}</div>
                        <div className="CustomRow">{g.mg_gedung}</div>
                    </div>
                );
            }, this);
            this.setState( { gedung : gedungList } );
        });
    }

    componentDidMount() {
        this.GedungList();
    }

    /*
        render function is used to render all necessary component for the page
    */

    render () {
        return (
        <>
            <div className="CustomTables">
                <div className="CustomHeader">ID Gedung</div>
                <div className="CustomHeader">Gedung</div>
                <div className="CustomHeader">MG Gedung</div>
                { this.state.gedung }
            </div>
            <Button variant="contained" color="primary" onClick={() => this.GedungList()}>Get Gedung!</Button>
        </>
        );
    }
}
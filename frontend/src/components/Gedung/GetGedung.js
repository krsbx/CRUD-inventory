import React, { Component } from 'react';
import axiosInstance from '../AxiosInstance';
import { Button, TextField } from '@material-ui/core';

export default class GetOptions extends Component {
    constructor(props){
        super(props);
    }

    /*
        GedungList function will create a GET Rest API
        All informations retrieved will be printed in browser console
    */

    GedungList = () => {
        axiosInstance.get(`/api/gedung/`).then((result) => {
            const data = result.data.results;
            data.forEach(a => {
                console.log(a);
            });
        });
    }

    /*
        render function is used to render all necessary component for the page
    */

    render () {
        return (<Button variant="contained" color="primary" onClick={() => this.GedungList()}>Get Gedung!</Button>);
    }
}
import React, { Component } from 'react';
import axiosInstance from '../AxiosInstance';
import { Button, TextField } from '@material-ui/core';

export default class GetRuang extends Component {
    constructor(props){
        super(props);

        this.state = {
            fields: {},
            errors: {},
        }
    }

    /*
        RuangList function will create a GET Rest API
        All informations retrieved will be printed in browser console
    */

    RuangList = () => {
        axiosInstance.get(`/api/ruang/`).then((result) => {
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
        return (<Button variant="contained" color="primary" onClick={() => this.RuangList()}>Get Ruang!</Button>);
    }
}
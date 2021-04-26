import React, { Component } from 'react';
import { axiosInstance, baseURL, PrevNext, previousCheck } from '../../AxiosInstance'
import { Button, TextField } from '@material-ui/core';

export default class GetOptions extends Component {
    constructor(props){
        super(props);

        this.state = {
            gedung : [],
            next : [],
            prev : [],
        }
    }

    /*
        GedungList function will create a GET Rest API
        All informations retrieved will be printed in browser console
    */

    GedungList = () => {
        axiosInstance.get(`/api/gedung/`).then((result) => {
            const data = result.data.results;
            let gedungList = data.map((ged) => {
                return (
                    <div className="GroupsOfRows">
                        <div className="CustomRow">{ged.gedungID}</div>
                        <div className="CustomRow">{ged.gedung}</div>
                        <div className="CustomRow">{ged.mg_gedung}</div>
                    </div>
                );
            }, this);

            const parser = [ result.data.next ? new URL(result.data.next) : null, result.data.prev ? new URL(result.data.prev) : null ];

            const path = {
                'next' : parser[0] ? parser[0].searchParams.get('page') : null,
                'prev' : previousCheck(parser[1], `gedung`),
            };

            if(path.next){
                const toNext = PrevNext(`?page=${path.next}`, this.GedungList, true);
                this.setState( { next : toNext } );
            }

            if(path.prev){
                const toPrev = PrevNext(`?page=${path.prev}`, this.GedungList, false);
                this.setState( { prev : toPrev } );
            }

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
                <div className="CustomHeader last">MG Gedung</div>
                { this.state.gedung }
            </div>
            { this.state.prev }
            <Button variant="contained" color="primary" onClick={() => this.GedungList()}>Get Gedung!</Button>
            { this.state.next }
        </>
        );
    }
}
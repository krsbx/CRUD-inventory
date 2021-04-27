import React, { Component } from 'react';
import { axiosInstance, baseURL, PrevNext, previousCheck } from '../../AxiosInstance'
import { Button, TextField } from '@material-ui/core';

export default class GetRuang extends Component {
    constructor(props){
        super(props);

        this.state = {
            ruang : [],
            next : [],
            prev : [],
        }
    }

    /*
        RuangList function will create a GET Rest API
        All informations retrieved will be printed in browser console
    */

    RuangList = () => {
        axiosInstance.get(`/api/ruang/`).then((result) => {
            const data = result.data.results;
            let ruangList = data.map((rng) => {
                return (
                    <div className="GroupsOfRows">
                        <div className="CustomRow">{rng.ruangID}</div>
                        <div className="CustomRow">{rng.ruang}</div>
                        <div className="CustomRow">{rng.pj_ruang}</div>
                        <div className="CustomRow">{rng.gedung}</div>
                    </div>
                );
            }, this);

            const parser = [ result.data.next ? new URL(result.data.next) : null, result.data.prev ? new URL(result.data.prev) : null ];

            const path = {
                'next' : parser[0] ? parser[0].searchParams.get('page') : null,
                'prev' : previousCheck(parser[1], `ruang`),
            };

            if(path.next){
                const toNext = PrevNext(`?page=${path.next}`, this.RuangList, true);
                this.setState( { next : toNext } );
            }

            if(path.prev){
                const toPrev = PrevNext(`?page=${path.prev}`, this.RuangList, false);
                this.setState( { prev : toPrev } );
            }

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
                <div className="CustomHeader last">Gedung</div>
                { this.state.ruang }
            </div>
            { this.state.prev }
            {/* <Button variant="contained" color="primary" onClick={() => this.RuangList()}>Get Ruang!</Button> */}
            { this.state.next }
        </>
        );
    }
}
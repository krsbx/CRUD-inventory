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

    RuangList = (urls='') => {
        axiosInstance.get(`/api/ruang/${urls}`).then((result) => { // melakukan get-request pada peminjaman API.
            const data = result.data.results; // peroleh hasil dari get-request.

            let ruangList = data.map((rng) => { // menyimpan semua objek yang ada pada data kedalam bentuk html.
                return (
                    <div className="GroupsOfRows">
                        <div className="CustomRow">{rng.ruangID}</div>
                        <div className="CustomRow">{rng.ruang}</div>
                        <div className="CustomRow">{rng.pj_ruang}</div>
                        <div className="CustomRow">{rng.gedung}</div>
                    </div>
                );
            }, this);

            // memperoleh URI next dan prev page.
            const parser = [ result.data.next ? new URL(result.data.next) : null, result.data.prev ? new URL(result.data.prev) : null ];

            const path = { // memperoleh nilai dari tiap parameter yang ada pada parser.
                'next' : parser[0] ? parser[0].searchParams.get('page') : null,
                'prev' : previousCheck(parser[1], `ruang`),
            };

            if(path.next){ // jika next ada pada path.
                const toNext = PrevNext(`?page=${path.next}`, this.RuangList, true); // memperoleh button next untuk ditampilkan.
                this.setState( { next : toNext } );
            }

            if(path.prev){ // jika prev ada pada path.
                const toPrev = PrevNext(`?page=${path.prev}`, this.RuangList, false); // memperoleh button prev untuk ditampilkan.
                this.setState( { prev : toPrev } );
            }

            this.setState( { ruang : ruangList } )  // mengubah variable ruang pada state menjadi ruangList.
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
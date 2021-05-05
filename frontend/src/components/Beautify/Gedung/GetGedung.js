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
        axiosInstance.get(`/api/gedung/`).then((result) => { // melakukan get-request pada gedung API.
            const data = result.data.results; // peroleh hasil dari get-request.

            let gedungList = data.map((ged) => { // menyimpan semua objek yang ada pada data kedalam bentuk html.
                return (
                    <div className="GroupsOfRows">
                        <div className="CustomRow">{ged.gedungID}</div>
                        <div className="CustomRow">{ged.gedung}</div>
                        <div className="CustomRow">{ged.mg_gedung}</div>
                    </div>
                );
            }, this);

            // memperoleh URI next dan prev page.
            const parser = [ result.data.next ? new URL(result.data.next) : null, result.data.prev ? new URL(result.data.prev) : null ];

            const path = { // memperoleh nilai dari tiap parameter yang ada pada parser.
                'next' : parser[0] ? parser[0].searchParams.get('page') : null,
                'prev' : previousCheck(parser[1], `gedung`),
            };

            if(path.next){ // jika next ada pada path.
                const toNext = PrevNext(`?page=${path.next}`, this.GedungList, true); // memperoleh button next untuk ditampilkan.
                this.setState( { next : toNext } );
            }

            if(path.prev){ // jika prev ada pada path.
                const toPrev = PrevNext(`?page=${path.prev}`, this.GedungList, false); // memperoleh button prev untuk ditampilkan.
                this.setState( { prev : toPrev } );
            }

            this.setState( { gedung : gedungList } ); // mengubah variable gedung pada state menjadi gedungList.
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
            { this.state.next }
        </>
        );
    }
}
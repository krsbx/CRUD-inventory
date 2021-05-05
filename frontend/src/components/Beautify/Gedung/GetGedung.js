import React, { useState, useEffect } from 'react';
import { axiosInstance, baseURL, PrevNext, previousCheck } from '../../AxiosInstance'

export default function GetOptions (props) {
    const [gedung, setGedung] = useState([]);
    const [next, setNext] = useState([]);
    const [prev, setPrev] = useState([]);

    /*
        GedungList function will create a GET Rest API
        All informations retrieved will be printed in browser console
    */

    const GedungList = (urls='') => { 
        axiosInstance.get(`/api/gedung/${urls}`).then((result) => { // melakukan get-request pada gedung API.
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
                const toNext = PrevNext(`?page=${path.next}`, GedungList, true); // memperoleh button next untuk ditampilkan.
                setNext(toNext);
            }

            if(path.prev){ // jika prev ada pada path.
                const toPrev = PrevNext(`?page=${path.prev}`, GedungList, false); // memperoleh button prev untuk ditampilkan.
                setPrev(toPrev);
            }

            setGedung(gedungList); // mengubah variable gedung pada state menjadi gedungList.
        });
    }

    useEffect (() => {
        GedungList();
    }, [])

    /*
        render function is used to render all necessary component for the page
    */

    return (
    <>
        <div className="CustomTables">
            <div className="CustomHeader">ID Gedung</div>
            <div className="CustomHeader">Gedung</div>
            <div className="CustomHeader last">MG Gedung</div>
            { gedung }
        </div>
        { prev }
        { next }
    </>
    );
}
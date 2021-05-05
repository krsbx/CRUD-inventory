import React, { useEffect, useState } from 'react';
import { axiosInstance, PrevNext, previousCheck } from '../../AxiosInstance'

export default function GetRuang (props) {
    const [ruang, setRuang] = useState([]);
    const [next, setNext] = useState([]);
    const [prev, setPrev] = useState([]);

    /*
        RuangList function will create a GET Rest API
        All informations retrieved will be printed in browser console
    */

    const RuangList = (urls='') => {
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
                const toNext = PrevNext(`?page=${path.next}`, RuangList, true); // memperoleh button next untuk ditampilkan.
                setNext(toNext);
            }

            if(path.prev){ // jika prev ada pada path.
                const toPrev = PrevNext(`?page=${path.prev}`, RuangList, false); // memperoleh button prev untuk ditampilkan.
                setPrev(toPrev);
            }

            setRuang(ruangList)  // mengubah variable ruang pada state menjadi ruangList.
        });
    }

    useEffect (() => {
        RuangList();
    }, [])

    /*
        render function is used to render all necessary component for the page
    */

    return (
    <>
        <div className="CustomTables">
            <div className="CustomHeader">ID Ruang</div>
            <div className="CustomHeader">Ruang</div>
            <div className="CustomHeader">PJ Ruang</div>
            <div className="CustomHeader last">Gedung</div>
            { ruang }
        </div>
        { prev }
        { next }
    </>
    );
}
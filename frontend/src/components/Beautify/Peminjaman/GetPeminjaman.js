import React, { Component } from 'react'
import { axiosInstance, baseURL, PrevNext, previousCheck } from '../../AxiosInstance'
import GetDetails from '../Details/GetDetails'
import { Link } from 'react-router-dom'
import { Button, TextField } from '@material-ui/core'

export default class GetPeminjaman extends Component {
    constructor(props) {
        super(props);

        this.state = {
            peminjaman : [],
            next : [],
            prev : [],
        }

    }


    /*
        PeminjamanList function will create a GET Rest API
        All informations retrieved will printed in browser console
    */

    PeminjamanList = (urls='') => {
        axiosInstance.get(`/api/peminjaman/${urls}`).then((result) => { // melakukan get-request pada peminjaman API.
            const data = result.data.results; // peroleh hasil dari get-request.

            let peminjamanList = data.map((pem) => { // menyimpan semua objek yang ada pada data kedalam bentuk html.
                return (
                    <div className="GroupsOfRows">
                        <div className="CustomRow">{pem.id_Peminjaman}</div>
                        <div className="CustomRow">
                            <Link to={`/detail/${pem.nomor_peminjaman}`} >
                                {pem.nomor_peminjaman}
                            </Link>
                        </div>
                        <div className="CustomRow">{pem.nip_nrk}</div>
                        <div className="CustomRow">{pem.nama_pegawai}</div>
                        <div className="CustomRow">{pem.tgl_pinjam}</div>
                        <div className="CustomRow">{pem.tgl_kembali ? pem.tgl_kembali : "Undefined"}</div>
                    </div>
                );
            }, this);

            // memperoleh URI next dan prev page.
            const parser = [ result.data.next ? new URL(result.data.next) : null, result.data.prev ? new URL(result.data.prev) : null ];

            const path = { // memperoleh nilai dari tiap parameter yang ada pada parser.
                'next' : parser[0] ? parser[0].searchParams.get('page') : null,
                'prev' : previousCheck(parser[1], `peminjaman`),
            };

            if(path.next){ // jika next ada pada path.
                const toNext = PrevNext(`?page=${path.next}`, this.PeminjamanList, true); // memperoleh button next untuk ditampilkan.
                this.setState( { next : toNext } );
            }

            if(path.prev){ // jika prev ada pada path.
                const toPrev = PrevNext(`?page=${path.prev}`, this.PeminjamanList, false); // memperoleh button prev untuk ditampilkan.
                this.setState( { prev : toPrev } );
            }

            this.setState( { peminjaman : peminjamanList} ); // mengubah variable peminjaman pada state menjadi peminjamanList.
        });
    }

    componentDidMount () {
        this.PeminjamanList();
    }

    /*
        render function is used to render all necessary component for the page
    */

    render () {
        return (
            <>
                <div className="CustomTables">
                    <div className="CustomHeader">ID Peminjaman</div>
                    <div className="CustomHeader">Nomor Peminjaman</div>
                    <div className="CustomHeader">NIP/NRK</div>
                    <div className="CustomHeader">Nama Pegawai</div>
                    <div className="CustomHeader">Tanggal Pinjam</div>
                    <div className="CustomHeader last">Tanggal Kembali</div>
                    { this.state.peminjaman }
                </div>
                { this.state.prev }
                { this.state.next }
            </>
        );
    }
}
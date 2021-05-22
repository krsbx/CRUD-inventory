import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../AxiosInstance';
import { Button, TextField, Select, InputLabel, FormControl, Input } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';
import firebase from '../../Firebase/FirebaseSDK';
import { Autocomplete } from '@material-ui/lab';

export default function PinjamBarang (props) {
    const [pinFields, SetPinFields] = useState({});
    const [detFields, SetDetFields] = useState({});
    const [pinErrors, SetPinErrors] = useState({});
    const [detErrors, SetDetErrors] = useState({});
    const [tglPinjam, setTglPinjam] = useState();
    const [tglKembali, setTglKembali] = useState();
    const [jumlah, setJumlah] = useState();
    const [kode, SetKode] = useState([]);
    const [ruang, SetRuang] = useState([]);
    const [stkBrg, setStkBrg] = useState(0);
    const [bast, setBAST] = useState('Tidak ada file terpilih');
    
    /*
        handleChange function will set the state value for input fields
    */

    function DetHandleChange(field, e) {
        let fields = detFields;

        if(field != "kode_barang" && field != "ruang"){
            fields[field] = e.target.value;
        }
        
        SetDetFields(fields);
    }

    function OptionHandler(field, val) {
        let fields = detFields;
        
        fields[field] = val[field];

        if(field == "kode_barang"){
            fields["nama_barang"] = val['nama_barang'];
            setStkBrg(val['stock']);
        }else if(field == "ruang"){
            fields["gedung"] = val['gedung'];
        }

        
        SetDetFields(fields);
    }

    /*
        handleValidation function will set state value for error input
            the function will check all user the input same as the database require or nots
    */

    function DetHandleValidation() {
        let fields = detFields;
        let errors = {};
        let formIsValid = true;

        //kode_barang
        if(!fields["kode_barang"]){
            formIsValid = false;
            errors["kode_barang"] = "Cannot be empty";
        }

        //jumlah
        if(!jumlah){
            formIsValid = false;
            errors["jumlah"] = "Cannot be empty";
        }

        if(jumlah > stkBrg){
            formIsValid = false;
            errors["jumlah"] = "Peminjaman melebihi stock";
        }

        //gedung
        if(!fields["gedung"]){
            formIsValid = false;
            errors["gedung"] = "Cannot be empty";
        }

        //ruang
        if(!fields["ruang"]){
            formIsValid = false;
            errors["ruang"] = "Cannot be empty";
        }

        SetDetErrors(errors);
        return formIsValid;
    }


    function PinHandleValidation() {
        let fields = pinFields;
        let errors = {};
        let formIsValid = true;

        //tgl_pinjam
        if(!tglPinjam){
            formIsValid = false;
            errors["tgl_pinjam"] = "Cannot be empty";
        }

        //Check if tgl_kembali exist
        if(tglKembali){
            if(Date.parse(tglKembali) < Date.parse(tglPinjam)){
                formIsValid = false;
                errors["tgl_kembali"] = "Pengembalian harus sesudah Peminjaman";
            }
        }

        //BAST_disposisi
        if(fields["BAST_disposisi"] === "undefined" || !fields["BAST_disposisi"]){
            formIsValid = false;
            errors["BAST_disposisi"] = "Cannot be empty";
        }

        SetPinErrors(errors);
        console.log(pinErrors);
        return formIsValid;
    }

    /*
        PostRuang function will create a POST Rest API
            All Informations inputted by user, will be posted to database
            The POST Request will printed the result in browser console
    */

    async function PostInfo () {
        let data = pinFields;
        let details = detFields;
        let stock = 0;

        data['tgl_pinjam'] = tglPinjam;
        data['tgl_kembali'] = tglKembali;

        details['jumlah'] = jumlah;

        const DisposisiRef = firebase.storage().ref(`Documents/Disposisi/`).child(`${localStorage.getItem('nip_nrk')}_${data["BAST_disposisi"]["name"]}`);
        await DisposisiRef.put(data["BAST_disposisi"]);

        await DisposisiRef.getDownloadURL().then(url => data['BAST_disposisi'] = url);

        //Create Peminjaman Informations
        await axiosInstance.post(`/api/peminjaman/`, data).then((result) => {
            //On Success
            if(result.status === 201){
                //Retrieved the response data
                const resp = result['data'];
                
                //Print all response data to console
                for(var key in resp){
                    console.log(`${key} : ${resp[key]}`);
                }
                
                //Save nomor_peminjaman in response data to details
                details['nomor_peminjaman'] = resp['nomor_peminjaman'];
            }
        }).catch((error) => {
            //On Error
            if(error.response.status === 400){
                //Get errors object from state
                let errors = pinErrors;

                //Set all errors to errors objects
                for(var key in error.response.data){
                    errors[key] = error.response.data[key];
                }
                
                //Set errors to errors state
                SetPinErrors(errors);
                
                return;
            }
        });

        //Create Details Peminjaman Informations
        await axiosInstance.post(`/api/detail/`, details).then((result) => {
            //On Success
            if(result.status === 201){
                //Retrieved the response data
                const resp = result['data'];

                //Print all response data to console
                for(var key in resp){
                    console.log(`${key} : ${resp[key]}`);
                }
            }
        }).catch((error) => {
            //On Error
            if(error.response.status === 400){
                //Get errors object from state
                let errors = detErrors;

                //Set all errors to errors objects
                for(var key in error.response.data){
                    errors[key] = error.response.data[key];
                }

                //Set errors to errors state
                SetDetErrors(errors);

                return;
            }
        });

        //Get Current Barang Stock
        await axiosInstance.get(`/api/barang/${detFields['kode_barang']}`).then((result) => {
            const data = result.data;

            stock = data['stock'];
        });
        
        //Decrease Barang Stock
        await axiosInstance.patch(`/api/barang/${detFields['kode_barang']}`, {
            'stock' : stock-jumlah,
        }).then((result) => {
            console.log(result.data);
            window.location.href = '/';
        });
    }

    /*
        Call PinHandleValidation function to validate Peminjaman Inputs
        Call DetHandleValidation function to validate Detail Inputs
            Call PostInfo function to create a peminjaman data in database
    */
    
    const PostPeminjaman = event => {
        event.preventDefault();

        let pinjam = PinHandleValidation();
        let detail = DetHandleValidation();

        if(pinjam && detail){
            PostInfo();
        }
    }

    /*
        GetRuangName function will create a GET Rest API
        All informations retrieved will stored inside the corresponding state
    */

    const GetRuang = () => {
        axiosInstance.get(`/api/ruang/`).then((result) => {
            const data = result.data;
            
            let ruangList =
            data.map((rng) => {
                return {
                    ruang: rng.ruang,
                    gedung: rng.gedung,
                }
            }, this);

            SetRuang(ruangList);
        });
    }

    /*
        GetBarang function will create a GET Rest API
        All informations retrieved will stored inside the corresponding state
    */

    const GetBarang = () => {
        axiosInstance.get(`/api/barang/`).then((result) => {
            const data = result.data;
                
            let barangList =
            data.map((brg) => {
                if(brg.stock > 0){
                    return {
                        kode_barang: brg.kode_barang,
                        nama_barang: brg.nama_barang,
                        stock: brg.stock,
                    }
                }
            }, this);

            const filtered = barangList.filter((brg) => {
                return brg != undefined;
            });
    
            SetKode(filtered);
        });
    }

    /*
        useEffect function will be called on page loaded
            when page loaded, call GetGedungName function, GetRuang function, GetBarang function
    */
        
    useEffect(() => {
        GetRuang();
        GetBarang();
    }, []);

    /*
        handleFile function will set the state value for file input
    */

    function handleFile(field, e) {
        let fields = pinFields;
        fields[field] = e.target.files[0];
        SetPinFields(fields);

        setBAST(e.target.files[0]['name']);

        console.log(e.target.files[0]);
    }

    /*
        render function is used to render all necessary component for the page
        render function will render:
            Selection for Nomor Peminjaman
            Selection for Kode Barang
            Textfield for Jumlah
            Selection for Gedung
            Selection for Ruang
            DatePicker for Tanggal Pinjam
            DatePicker for Tanggal Kembali
            Uploadfield for BAST Disposisi
            Button for submitting response
    */


    return (
        <div className="PostDetails">
            <form onSubmit={PostPeminjaman}>
                {/* Barang Field */}
                <p>
                    <Autocomplete
                        options={kode}
                        getOptionLabel={opt => `${opt['nama_barang']}  |  ${opt['stock']}`}
                        onChange={(e, val) => OptionHandler('kode_barang', val)}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Nama Barang" variant="outlined" />}
                    />
                    <span style={{color: "red"}}>{detErrors["kode_barang"]}</span>
                </p>
                {/* Jumlah Field */}
                <p>
                    <br /> <TextField type='number' size="30" onChange={(e) => setJumlah(e.target.value)} value={jumlah} 
                    label='Jumlah' variant="outlined" inputProps={{ maxLength: 32 }} />
                    <br /> <span style={{color: "red"}}>{detErrors["jumlah"]}</span>
                </p>
                {/* Ruang Field */}
                <br />
                <p>
                    <Autocomplete
                        options={ruang}
                        getOptionLabel={opt => `${opt['ruang']}  =>  ${opt['gedung']}`}
                        onChange={(e, val) => OptionHandler('ruang', val)}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Ruang" variant="outlined" />}
                    />
                    <span style={{color: "red"}}>{detErrors["ruang"]}</span>
                </p>
                {/* Tanggal Peminjaman */}
                <p>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker margin="normal" label="Tanggal Peminjaman" format="yyyy-MM-dd" KeyboardButtonProps={{ 'aria-label': 'change date', }} 
                        value={tglPinjam} onChange={(e, d) => setTglPinjam(d)} minDate={new Date()} />
                    </MuiPickersUtilsProvider>
                    <br /> <span style={{color: "red"}}>{pinErrors["tgl_pinjam"]}</span>
                </p>
                {/* Tanggal Kembali */}
                <p>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker margin="normal" label="Tanggal Kembali" format="yyyy-MM-dd" KeyboardButtonProps={{ 'aria-label': 'change date', }} 
                        value={tglKembali} onChange={(e, d) => setTglKembali(d)} minDate={new Date()} />
                    </MuiPickersUtilsProvider>
                    <br /> <span style={{color: "red"}}>{pinErrors["tgl_kembali"]}</span>
                </p>
                {/* BAST Disposisi */}
                <p>
                    <FormControl className="UploadInput">
                        <br /> <span id="bast_name">{bast}</span>
                        <br />
                        <input accept="application/pdf" id="contained-button-file" type="file" 
                            style={{ visibility: 'hidden', width: '0px', height: '0px' }}
                            onChange={handleFile.bind(this, "BAST_disposisi")} />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" component="span">BAST Perolehan [*.pdf]</Button>
                        </label>
                    </FormControl>
                    <br /> <span style={{color: "red"}}>{pinErrors["BAST_disposisi"]}</span>
                </p>
                <br /><Button variant="contained" color="primary" type="submit">Pinjam!</Button>
            </form>
        </div>
    );
}
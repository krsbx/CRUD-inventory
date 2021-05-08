import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../AxiosInstance';
import { Button, TextField, Select, InputLabel, FormControl, Input } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';
import firebase from '../../Firebase/FirebaseSDK';

export default function PinjamBarang (props) {
    const [pinFields, SetPinFields] = useState({});
    const [detFields, SetDetFields] = useState({});
    const [pinErrors, SetPinErrors] = useState({});
    const [detErrors, SetDetErrors] = useState({});
    const [kode, SetKode] = useState([]);
    const [gedung, SetGedung] = useState([]);
    const [ruang, SetRuang] = useState([]);
    
    /*
        handleChange function will set the state value for input fields
    */

    function DetHandleChange(field, e) {
        let fields = detFields;
        if(field != "kode_barang"){
            fields[field] = e.target.value;
        }else{
            fields[field] = e.target.value.kode;
            fields["nama_barang"] = e.target.value.nama;
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
        if(!fields["jumlah"]){
            formIsValid = false;
            errors["jumlah"] = "Cannot be empty";
        }
    
        if(typeof fields["jumlah"] !== "undefined"){
            if(!fields["jumlah"].match(/^[0-9]+$/)){
                formIsValid = false;
                errors["jumlah"] = "Integer Only";
            }
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
        if(!fields["tgl_pinjam"]){
            formIsValid = false;
            errors["tgl_pinjam"] = "Cannot be empty";
        }

        //BAST_disposisi
        if(fields["BAST_disposisi"] === "undefined" || !fields["BAST_disposisi"]){
            formIsValid = false;
            errors["BAST_disposisi"] = "Cannot be empty";
        }

        SetPinErrors(errors);
        return formIsValid;
    }

    /*
        PostRuang function will create a POST Rest API
            All Informations inputted by user, will be posted to database
            The POST Request will printed the result in browser console
    */

    async function PostInfo () {
        const data = pinFields;
        let details = detFields;
        let stock = 0;
        const jumlah = detFields['jumlah'];

        const DisposisiRef = firebase.storage().ref(`Documents/Perolehan/`).child(`${pinFields["BAST_disposisi"]["name"]}`);
        await DisposisiRef.put(pinFields["BAST_disposisi"]["name"]);

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
        Set Tanggal Pinjam/Kembali Functions
            Set the values to corresponding object keys
    */

    const SetPinjamDate = (event, date) => {
        pinFields['tgl_pinjam'] = date;
    }

    const SetKembaliDate = (event, date) => {
        pinFields['tgl_kembali'] = date;
    }

    /*
        GetGedungName function will create a GET Rest API
        All informations retrieved will stored inside the corresponding state
    */

    const GetGedungName = () => {
        axiosInstance.get(`/api/allGedung/`).then((result) => {
            const data = result.data;
            
            let gedungList =
            data.map((ged) => {
                return (<option value={ged.gedung}> {ged.gedung} </option>);
            }, this);
    
            SetGedung(gedungList);
        });
    }

    /*
        GetRuangName function will create a GET Rest API
        All informations retrieved will stored inside the corresponding state
    */

    const GetRuang = () => {
        axiosInstance.get(`/api/allRuang/`).then((result) => {
            const data = result.data;
            
            let ruangList =
            data.map((rng) => {
                return (<option value={rng.ruang}> {rng.ruang} </option>);
            }, this);

            SetRuang(ruangList);
        });
    }

    /*
        GetBarang function will create a GET Rest API
        All informations retrieved will stored inside the corresponding state
    */

    const GetBarang = () => {
        axiosInstance.get(`/api/allBarang/`).then((result) => {
            const data = result.data;
                
            let barangList =
            data.map((brg) => {
                if(brg.stock > 0){
                    return (<option value={{"kode": brg.kode_barang, "nama": brg.nama_barang}}> { brg.nama_barang } | { brg.stock } </option>);
                }
            }, this);
    
            SetKode(barangList);
        });
    }

    /*
        useEffect function will be called on page loaded
            when page loaded, call GetGedungName function, GetRuang function, GetBarang function
    */
        
    useEffect(() => {
        GetGedungName();
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
                    <br /><FormControl className="SelectInput">
                    <InputLabel>Nama Barang</InputLabel>
                        <Select name="Nama Barang" onChange={DetHandleChange.bind(this, "kode_barang")} > { kode } </Select>
                    </FormControl>
                    <br /> <span style={{color: "red"}}>{detErrors["kode_barang"]}</span>
                </p>
                {/* Jumlah Field */}
                <p>
                    <br /> <TextField type='text' size="30" onChange={DetHandleChange.bind(this, "jumlah")} value={detFields["jumlah"]} 
                    label='Jumlah' variant="outlined" inputProps={{ maxLength: 8 }} />
                    <br /> <span style={{color: "red"}}>{detErrors["ruang"]}</span>
                </p>
                {/* Gedung Field */}
                <p>
                    <br /><FormControl className="SelectInput">
                    <InputLabel>Gedung</InputLabel>
                        <Select name="Gedung" onChange={DetHandleChange.bind(this, "gedung")} > { gedung } </Select>
                    </FormControl>
                    <br /> <span style={{color: "red"}}>{detErrors["gedung"]}</span>
                </p>
                {/* Ruang Field */}
                <p>
                    <br /><FormControl className="SelectInput">
                    <InputLabel>Ruang</InputLabel>
                        <Select name="Ruang" onChange={DetHandleChange.bind(this, "ruang")} > { ruang } </Select>
                    </FormControl>
                    <br /> <span style={{color: "red"}}>{detErrors["ruang"]}</span>
                </p>
                {/* Tanggal Peminjaman */}
                <p>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <br /> <KeyboardDatePicker margin="normal" label="Tanggal Peminjaman" format="yyyy-MM-dd" KeyboardButtonProps={{ 'aria-label': 'change date', }} 
                        value={pinFields['tgl_pinjam']} onChange={SetPinjamDate} minDate={new Date()} />
                    </MuiPickersUtilsProvider>
                    <br /> <span style={{color: "red"}}>{pinErrors["tgl_pinjam"]}</span>
                </p>
                {/* Tanggal Kembali */}
                <p>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <br /> <KeyboardDatePicker margin="normal" label="Tanggal Kembali" format="yyyy-MM-dd" KeyboardButtonProps={{ 'aria-label': 'change date', }} 
                        value={pinFields['tgl_kembali']} onChange={SetKembaliDate} minDate={new Date()} />
                    </MuiPickersUtilsProvider>
                    <br /> <span style={{color: "red"}}>{pinErrors["tgl_kembali"]}</span>
                </p>
                {/* BAST Disposisi */}
                <p>
                    <br /><FormControl className="UploadInput">
                        <InputLabel>BAST Disposisi</InputLabel>
                        <br /><Button variant="outlined" component="BAST_disposisi" label="BAST Disposisi"><Input type='file' onChange={handleFile.bind(this, "BAST_disposisi")}/></Button>
                    </FormControl>
                    <br /> <span style={{color: "red"}}>{pinErrors["BAST_disposisi"]}</span>
                </p>
                <br /><Button variant="contained" color="primary" type="submit">Pinjam!</Button>
            </form>
        </div>
    );
}
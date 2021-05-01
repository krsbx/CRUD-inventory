import React, { Component } from 'react';
import { axiosInstance, baseURL } from '../../AxiosInstance';
import { Button, TextField, Select, InputLabel, FormControl, Input } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers';

export default class PostDetails extends Component {
    constructor(props){
        super(props);

        this.state = {
            pinFields : {},
            detFields : {},
            pinErrors : {},
            detErrors : {},
            kode : [],
            peminjaman : [],
            gedung : [],
            ruang : [],
        }
    }

    /*
        handleChange function will set the state value for text input
    */

        DetHandleChange(field, e) {
            let fields = this.state.detFields;
            if(field != "kode_barang"){
                fields[field] = e.target.value;
            }else{
                fields[field] = e.target.value.kode;
                fields["nama_barang"] = e.target.value.nama;
            }
            this.setState( { detFields : fields } );
        }
    
        /*
            handleValidation function will set state value for error input
                the function will check all user the input same as the database require or nots
        */
    
        DetHandleValidation(){
            let fields = this.state.detFields;
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
    
           this.setState( { detErrors: errors } );
           return formIsValid;
        }


        PinHandleValidation(){
            let fields = this.state.pinFields;
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
    
           this.setState( { pinErrors: errors } );
           return formIsValid;
        }

        /*
            handleFile function will set the state value for file input
        */

        handleFile(field, e){
            let fields = this.state.pinFields;
            fields[field] = e.target.files[0];
            this.setState({fields});

            console.log(e.target.files[0]);
        }

        /*
            PostRuang function will create a POST Rest API
            All Informations inputted by user, will be posted to database
            The POST Request will printed the result in browser console
        */

        async PostInfo () {
            const data = this.state.pinFields;
            let details = this.state.detFields;
            let toPost = new FormData();
            let stock = 0;
            const jumlah = this.state.detFields['jumlah'];

            for(let d in data){
                toPost.append(d, data[d]);
            }

            //Create Peminjaman Informations
            await axiosInstance.post(`/api/peminjaman/`, toPost, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((result) => {
                if(result.status === 201){
                    const resp = result['data'];
                    console.log(resp);
                    for(var key in resp){
                        console.log(`${key} : ${resp[key]}`);
                    }
                    
                    details['nomor_peminjaman'] = resp['nomor_peminjaman'];
                }
            }).catch((error) => {
                console.log(error.response.data);
                if(error.response.status === 400){
                    let errors = this.state.errors;

                    for(var key in error.response.data){
                        errors[key] = error.response.data[key];
                    }
                        
                    this.state.errors = errors;
                        
                    return;
                }
            });

            //Create Details Peminjaman Informations
            await axiosInstance.post(`/api/detail/`, details).then((result) => {
                if(result.status === 201){
                    const resp = result['data'];
                    for(var key in resp){
                        console.log(`${key} : ${resp[key]}`);
                    }
                }
            }).catch((error) => {
                if(error.response.status === 400){
                    let errors = this.state.errors;

                    for(var key in error.response.data){
                        errors[key] = error.response.data[key];
                    }
                        
                    this.state.errors = errors;
                }
            });

            //Get CUrren Barang Stock
            await axiosInstance.get(`/api/barang/${this.state.detFields['kode_barang']}`).then((result) => {
                const data = result.data;

                stock = data['stock'];
            });
            
            //Decrease Barang Stock
            await axiosInstance.patch(`/api/barang/${this.state.detFields['kode_barang']}`, {
                'stock' : stock-jumlah,
            }).then((result) => {
                console.log(result.data);
                window.location.href = '/';
            });
        }
    
        PostPeminjaman = event => {
            event.preventDefault();

            let pinjam = this.PinHandleValidation();
            let detail = this.DetHandleValidation();
    
            if(pinjam && detail){
                this.PostInfo();
            }
        }
    

        SetPinjamDate = (event, date) => {
            this.state.pinFields['tgl_pinjam'] = date;
            console.log(this.state.pinFields['tgl_pinjam']);
        }

        SetKembaliDate = (event, date) => {
            this.state.pinFields['tgl_kembali'] = date;
            console.log(this.state.pinFields['tgl_kembali']);
        }

        /*
            GetGedungName function will create a GET Rest API
            All informations retrieved will be printed in browser console
        */
    
        GetGedungName = () => {
            axiosInstance.get(`/api/gedung/`).then((result) => {
                const data = result.data.results;
                
                let gedungList =
                data.map((ged) => {
                    return (<option value={ged.gedung}> {ged.gedung} </option>);
                }, this);
        
                this.setState( { gedung : gedungList } );
            });
        }

        /*
            GetRuangName function will create a GET Rest API
            All informations retrieved will be printed in browser console
        */

        GetRuang = () => {
            axiosInstance.get(`/api/ruang/`).then((result) => {
                const data = result.data.results;
                
                let ruangList =
                data.map((rng) => {
                    return (<option value={rng.ruang}> {rng.ruang} </option>);
                }, this);
    
                this.setState( { ruang : ruangList } );
            });
        }

        /*
            GetBarang function will create a GET Rest API
            All informations retrieved will be printed in browser console
        */

        GetBarang = () => {
            axiosInstance.get(`/api/barang/`).then((result) => {
                const data = result.data.results;
                    
                let barangList =
                data.map((brg) => {
                    if(brg.stock > 0){
                        return (<option value={{"kode": brg.kode_barang, "nama": brg.nama_barang}}> { brg.nama_barang } | { brg.stock } </option>);
                    }
                }, this);
        
                this.setState( { kode : barangList } );
            });
        }
    
        /*
            componentDidMount function will be called on page loaded
                when page loaded, call GetGedungName function
        */
    
        componentDidMount() {
            this.GetGedungName();
            this.GetRuang();
            this.GetBarang();
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
    
        render () {
            return (
                <div className="PostDetails">
                    <form onSubmit={this.PostPeminjaman}>
                        {/* Barang Field */}
                        <p>
                            <br /><FormControl className="SelectInput">
                            <InputLabel>Nama Barang</InputLabel>
                                <Select name="Nama Barang" onChange={this.DetHandleChange.bind(this, "kode_barang")} > { this.state.kode } </Select>
                            </FormControl>
                            <br /> <span style={{color: "red"}}>{this.state.detErrors["kode_barang"]}</span>
                        </p>
                        {/* Jumlah Field */}
                        <p>
                            <br /> <TextField type='text' size="30" onChange={this.DetHandleChange.bind(this, "jumlah")} value={this.state.detFields["jumlah"]} 
                            label='Jumlah' variant="outlined" inputProps={{ maxLength: 8 }} />
                            <br /> <span style={{color: "red"}}>{this.state.detErrors["ruang"]}</span>
                        </p>
                        {/* Gedung Field */}
                        <p>
                            <br /><FormControl className="SelectInput">
                            <InputLabel>Gedung</InputLabel>
                                <Select name="Gedung" onChange={this.DetHandleChange.bind(this, "gedung")} > { this.state.gedung } </Select>
                            </FormControl>
                            <br /> <span style={{color: "red"}}>{this.state.detErrors["gedung"]}</span>
                        </p>
                        {/* Ruang Field */}
                        <p>
                            <br /><FormControl className="SelectInput">
                            <InputLabel>Ruang</InputLabel>
                                <Select name="Ruang" onChange={this.DetHandleChange.bind(this, "ruang")} > { this.state.ruang } </Select>
                            </FormControl>
                            <br /> <span style={{color: "red"}}>{this.state.detErrors["ruang"]}</span>
                        </p>
                        {/* Tanggal Peminjaman */}
                        <p>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <br /> <KeyboardDatePicker margin="normal" label="Tanggal Peminjaman" format="yyyy-MM-dd" KeyboardButtonProps={{ 'aria-label': 'change date', }} 
                                value={this.state.pinFields["tgl_pinjam"]} onChange={this.SetPinjamDate} minDate={new Date()} />
                            </MuiPickersUtilsProvider>
                            <br /> <span style={{color: "red"}}>{this.state.pinErrors["tgl_pinjam"]}</span>
                        </p>
                        {/* Tanggal Kembali */}
                        <p>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <br /> <KeyboardDatePicker margin="normal" label="Tanggal Kembali" format="yyyy-MM-dd" KeyboardButtonProps={{ 'aria-label': 'change date', }} 
                                value={this.state.pinFields["tgl_kembali"]} onChange={this.SetKembaliDate} minDate={new Date()} />
                            </MuiPickersUtilsProvider>
                            <br /> <span style={{color: "red"}}>{this.state.pinErrors["tgl_kembali"]}</span>
                        </p>
                        {/* BAST Disposisi */}
                        <p>
                            <br /><FormControl className="UploadInput">
                                <InputLabel>BAST Disposisi</InputLabel>
                                <br /><Button variant="outlined" component="BAST_disposisi" label="BAST Disposisi"><Input type='file' onChange={this.handleFile.bind(this, "BAST_disposisi")}/></Button>
                            </FormControl>
                            <br /> <span style={{color: "red"}}>{this.state.pinErrors["BAST_disposisi"]}</span>
                        </p>
                        <br /><Button variant="contained" color="primary" type="submit">Pinjam!</Button>
                    </form>
                </div>
            );
        }
}
import React, { Component } from 'react';
import axiosInstance from '../AxiosInstance';
import { Button, TextField, Select } from '@material-ui/core';

export default class PostDetails extends Component {
    constructor(props){
        super(props);

        this.state = {
            fields : {},
            errors : {},
            kode : [],
            peminjaman : [],
            gedung : [],
            ruang : [],
        }
    }

    /*
        handleChange function will set the state value for text input
    */

        handleChange(field, e){
            let fields = this.state.fields;
            if(field != "kode_barang"){
                fields[field] = e.target.value;
            }else{
                fields[field] = e.target.value.kode;
                fields["nama_barang"] = e.target.value.nama;
            }
            this.setState({fields});
        }
    
        /*
            handleValidation function will set state value for error input
                the function will check all user the input same as the database require or nots
        */
    
        handleValidation(){
            let fields = this.state.fields;
            let errors = {};
            let formIsValid = true;
     
            //nomor_peminjaman
            if(!fields["nomor_peminjaman"]){
                formIsValid = false;
                errors["nomor_peminjaman"] = "Cannot be empty";
            }
    
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
    
           this.setState({errors: errors});
           return formIsValid;
        }
    
        /*
            PostRuang function will create a POST Rest API
            All Informations inputted by user, will be posted to database
            The POST Request will printed the result in browser console
        */
    
        PostDetails = event => {
            event.preventDefault();

            const data = this.state.fields;
    
            if(this.handleValidation()){
                axiosInstance.post(`/api/detail/`, data).then((result) => {
                    if(result.status === 200){
                        const resp = result['data'];
                        for(var key in resp){
                            console.log(`${key} : ${resp[key]}`);
                        }
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
            }
        }
    
        /*
            GetGedungName function will create a GET Rest API
            All informations retrieved will be printed in browser console
        */
    
        GetGedungName = () => {
            axiosInstance.get(`/api/gedung/`).then((result) => {
                const data = result.data.results;
                
                let gedungList =
                data.map((m) => {
                    return (<option value={m.gedung}> {m.gedung} </option>);
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
                data.map((m) => {
                    return (<option value={m.ruang}> {m.ruang} </option>);
                }, this);
    
                this.setState( { ruang : ruangList } );
            });
        }

        /*
            GetPeminjaman function will create a GET Rest API
            All informations retrieved will be printed in browser console
        */

        GetPeminjaman = () => {
            axiosInstance.get(`/api/peminjaman/`).then((result) => {
                const data = result.data.results;
                
                let peminjamanList =
                data.map((m) => {
                    return (<option value={m.nomor_peminjaman}> {m.nomor_peminjaman} </option>);
                }, this);
    
                this.setState( { peminjaman : peminjamanList } );
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
                data.map((m) => {
                    return (<option value={{"kode": m.kode_barang, "nama": m.nama_barang}}> {m.nama_barang} </option>);
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
            this.GetPeminjaman();
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
                Button for submitting response
        */
    
        render () {
            return (
                <div>
                    <form onSubmit={this.PostDetails}>
                        <p>
                            <Select name="Nomor Peminjaman" onChange={this.handleChange.bind(this, "nomor_peminjaman")} > { this.state.peminjaman } </Select>
                            <br /> <span style={{color: "red"}}>{this.state.errors["nomor_peminjaman"]}</span>
                        </p>
                        <p>
                            <Select name="Kode Barang" onChange={this.handleChange.bind(this, "kode_barang")} > { this.state.kode } </Select>
                            <br /> <span style={{color: "red"}}>{this.state.errors["kode_barang"]}</span>
                        </p>
                        <p>
                            <br /> <TextField type='text' size="30" onChange={this.handleChange.bind(this, "jumlah")} value={this.state.fields["jumlah"]} 
                            label='Jumlah' variant="outlined" InputLabelProps={{className: 'label_textfield'}} InputProps={{className: 'login_textFields'}} inputProps={{ maxLength: 8 }} />
                            <br /> <span style={{color: "red"}}>{this.state.errors["ruang"]}</span>
                        </p>
                        <p>
                            <Select name="Gedung" onChange={this.handleChange.bind(this, "gedung")} > { this.state.gedung } </Select>
                            <br /> <span style={{color: "red"}}>{this.state.errors["gedung"]}</span>
                        </p>
                        <p>
                            <Select name="Ruang" onChange={this.handleChange.bind(this, "ruang")} > { this.state.ruang } </Select>
                            <br /> <span style={{color: "red"}}>{this.state.errors["ruang"]}</span>
                        </p>
                        <br /><Button variant="contained" color="primary" type="submit">Post Details!</Button>
                    </form>
                </div>
            );
        }
}
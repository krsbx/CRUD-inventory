import React, { Component } from 'react';
// import axios from 'axios';
import axiosInstance from '../AxiosInstance'
import { Button, TextField, Input } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers';

export default class GetPeminjmana extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fields : {},
            errors : {},
        }
    }

    /*
        handleChange function will set the state value for text input
    */

    handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }

    /*
        handleFile function will set the state value for file input
    */

    handleFile(field, e){
        let fields = this.state.fields;
        fields[field] = e.target.files[0];
        this.setState({fields});

        console.log(e.target.files[0]);
    }

    /*
        handleValidation function will set state value for error input
            the function will check all user the input same as the database require or nots
    */

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        console.log(fields);

        //id_Peminjaman
        if(!fields["id_Peminjaman"]){
           formIsValid = false;
           errors["id_Peminjaman"] = "Cannot be empty";
        }
  
        if(typeof fields["id_Peminjaman"] !== "undefined"){
            if(!fields["id_Peminjaman"].match(/^[a-zA-Z0-9]+$/)){
               formIsValid = false;
               errors["id_Peminjaman"] = "Alpha Numeric Only";
            }
         }
 
        //nomor_peminjaman
        if(!fields["nomor_peminjaman"]){
            formIsValid = false;
            errors["nomor_peminjaman"] = "Cannot be empty";
        }
    
        if(typeof fields["nomor_peminjaman"] !== "undefined"){
             if(!fields["nomor_peminjaman"].match(/^[a-zA-Z0-9]+$/)){
                formIsValid = false;
                errors["nomor_peminjaman"] = "Alpha Numeric Only";
            }
        }

        //tgl_pinjam
        if(!fields["tgl_pinjam"]){
            formIsValid = false;
            errors["tgl_pinjam"] = "Cannot be empty";
        }

       this.setState({errors: errors});
       return formIsValid;
    }

    /*
        PostPeminjaman function will create a POST Rest API
        All Informations inputted by user, will be posted to database
        The POST Request will printed the result in browser console
    */

    PostPeminjaman = () => {
        const data = this.state.fields;

        if(this.handleValidation()){
            let toPost = new FormData();

            for(let d in data){
                toPost.append(d, data[d]);
            }

            axiosInstance.post(`/api/peminjaman/`, toPost, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((result) => {
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
        render function is used to render all necessary component for the page
        render function will render:
            Textfield for ID Peminjaman
            Textfield for Nomor Peminjaman
            Textfield for Tanggal Pinjam
            Textfield for Tanggal Kembali
            Uploadfield for BAST Disposisi
            Button for submitting response
    */

    render () {
        return (
            <div>
                <p>
                    <br /> <TextField type='text' size="30" onChange={this.handleChange.bind(this, "id_Peminjaman")} value={this.state.fields["id_Peminjaman"]} 
                    label='ID Peminjaman' variant="outlined" InputLabelProps={{className: 'label_textfield'}} InputProps={{className: 'login_textFields'}} inputProps={{ maxLength: 10 }} />
                    <br /> <span style={{color: "red"}}>{this.state.errors["id_Peminjaman"]}</span>
                </p>
                <p>
                    <br /> <TextField type='text' size="30" onChange={this.handleChange.bind(this, "nomor_peminjaman")} value={this.state.fields["nomor_peminjaman"]} 
                    label='Nomor Peminjaman' variant="outlined" InputLabelProps={{className: 'label_textfield'}} InputProps={{className: 'login_textFields'}} inputProps={{ maxLength: 8 }} />
                    <br /> <span style={{color: "red"}}>{this.state.errors["nomor_peminjaman"]}</span>
                </p>
                <p>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <br /> <KeyboardDatePicker margin="normal" label="Tanggal Pinjam" format="yyyy-MM-dd" KeyboardButtonProps={{ 'aria-label': 'change date', }} 
                        value={this.state.fields["tgl_pinjam"]} onChange={(value, e) => this.state.fields['tgl_pinjam'] = e} />
                    </MuiPickersUtilsProvider>
                    <br /> <span style={{color: "red"}}>{this.state.errors["tgl_pinjam"]}</span>
                </p>
                <p>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <br /> <KeyboardDatePicker margin="normal" label="Tanggal Kembali" format="yyyy-MM-dd" KeyboardButtonProps={{ 'aria-label': 'change date', }} 
                        value={this.state.fields["tgl_kembali"]} onChange={(value, e) => this.state.fields['tgl_pinjam'] = e} />
                    </MuiPickersUtilsProvider>
                    <br /> <span style={{color: "red"}}>{this.state.errors["tgl_kembali"]}</span>
                </p>
                <p>
                    <Button variant="outlined" component="BAST_disposisi" label="BAST Diposisi"><Input type='file' hidden onChange={this.handleFile.bind(this, "BAST_disposisi")}/></Button>
                    <br /> <span style={{color: "red"}}>{this.state.errors["BAST_disposisi"]}</span>
                </p>
                <br /><Button variant="contained" color="primary" onClick={() => this.PostPeminjaman()}>Post Peminjaman!</Button>
            </div>
        );
    }
}
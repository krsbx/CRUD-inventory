import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import {baseURL } from './AxiosInstance'

export default class Register extends Component {
    constructor(props){
        super(props);
   
        this.state = {
            fields: {},
            errors: {}
        }
     }

    /*
        Submit function will create a post request to register all user input
            The result of the user registration will bre printed in browser console
    */

    Submit = event => {
        event.preventDefault();

        const url = `${baseURL}api/register/`
        let data = this.state.fields;

        console.log(data);

        if(this.handleValidation()){
            fetch(url, {
                method: 'POST',   
                headers: {
                    'Content-type' : 'application/json' // post req ke backend
                },
                body: JSON.stringify(data),
            }).then((result) => {
                if(result.status === 400){   
                    let errors = this.state.errors;
                    result.json().then(resp => {
                        if(resp["nip_nrk"] != null){
                            errors["nip_nrk"] = resp["nip_nrk"];
                        }
                        if(resp["password"] != null){
                            errors["password"] = resp["password"];
                        }
                        if(resp["email"] != null){
                            errors["email"] = resp["email"];
                        }
                        if(resp["nama_pegawai"] != null){
                            errors["nama_pegawai"] = resp["nama_pegawai"];
                        }
                        if(resp["alamat"] != null){
                            errors["alamat"] = resp["alamat"];
                        }
                        if(resp["telp"] != null){
                            errors["telp"] = resp["telp"];
                        }

                        this.state.errors = errors;

                        return;
                    });
                }
                if(result.status === 201){
                    result.json().then(resp => {
                        if((resp.nip_nrk == null || resp.nip_nrk == "") && (resp.alamat == null || resp.alamat == "")){
                            console.log("Success!");
                        }
                        console.log(resp);
                    });

                    window.location.href = '/';
                }
            });
        }
    };

    /*
        handleValidation function will set state value for error input
            the function will check all user the input same as the database require or nots
    */

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //nip_nrk
        if(!fields["nip_nrk"]){
           formIsValid = false;
           errors["nip_nrk"] = "Cannot be empty";
        }
  
        if(typeof fields["nip_nrk"] !== "undefined"){
           if(!fields["nip_nrk"].match(/^[a-zA-Z0-9]+$/)){
              formIsValid = false;
              errors["nip_nrk"] = "Alpha Numeric Only";
           }
        }

        //password
        if(!fields["password"]){
            formIsValid = false;
            errors["password"] = "Cannot be empty";
        }
   
        if(typeof fields["password"] !== "undefined"){
            if(!fields["password"].match(/^[a-zA-Z0-9]+$/)){
               formIsValid = false;
               errors["password"] = "Alpha Numeric Only";
            }
        }
   
        //email
        if(!fields["email"]){
           formIsValid = false;
           errors["email"] = "Cannot be empty";
        }
  
        if(typeof fields["email"] !== "undefined"){
           let lastAtPos = fields["email"].lastIndexOf('@');
           let lastDotPos = fields["email"].lastIndexOf('.');

           if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
              formIsValid = false;
              errors["email"] = "Email is not valid";
            }
        }

        //nama_pegawai
        if(!fields["nama_pegawai"]){
            formIsValid = false;
            errors["nama_pegawai"] = "Cannot be empty";
        }
   
        //alamat
        if(!fields["alamat"]){
            formIsValid = false;
            errors["alamat"] = "Cannot be empty";
        }

        //telp
        if(!fields["telp"]){
            formIsValid = false;
            errors["telp"] = "Cannot be empty";
        }
   
        if(typeof fields["telp"] !== "undefined"){
            if(!fields["telp"].match(/^[a-zA-Z0-9]+$/)){
               formIsValid = false;
               errors["telp"] = "Alpha Numeric Only";
            }        
        }
        

       this.setState({errors: errors});
       return formIsValid;
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
        render function is used to render all necessary component for the page
        render function will render:
            Textfield for NIP/NRK
            Textfield for Password
            Textfield for Email
            Textfield for Nama Pegawai
            Textfield for Alamat
            Textfield for Telepon
            Button for submitting response
    */

    render () {
        return (
            <div className='Register'>
                <form onSubmit={this.Submit}>
                    <p>
                        <br /> <TextField type='text' size="30" onChange={this.handleChange.bind(this, "nip_nrk")} value={this.state.fields["nip_nrk"]} 
                        label='NIP/NRK' variant="outlined" inputProps={{ maxLength: 120 }} />
                        <br /> <span style={{color: "red"}}>{this.state.errors["nip_nrk"]}</span>
                    </p>
                    <p>
                        <br /> <TextField type='password' size="30" onChange={this.handleChange.bind(this, "password")} value={this.state.fields["password"]} 
                        label='Password' variant="outlined" inputProps={{ maxLength: 16, minLength: 8 }} />
                        <br /> <span style={{color: "red"}}>{this.state.errors["password"]}</span>
                    </p>
                    <p>
                        <br /> <TextField type='text' size="30" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]} 
                        label='Email' variant="outlined" inputProps={{ maxLength: 255 }} />
                        <br /> <span style={{color: "red"}}>{this.state.errors["email"]}</span>
                    </p>
                    <p>
                        <br /> <TextField type='text' size="30" onChange={this.handleChange.bind(this, "nama_pegawai")} value={this.state.fields["nama_pegawai"]} 
                        label='Nama Pegawai' variant="outlined" inputProps={{ maxLength: 120 }} />
                        <br /> <span style={{color: "red"}}>{this.state.errors["nama_pegawai"]}</span>
                    </p>
                    <p>
                        <br /> <TextField type='text' size="30" onChange={this.handleChange.bind(this, "alamat")} value={this.state.fields["alamat"]} 
                        label='Alamat' variant="outlined" inputProps={{ maxLength: 120 }} />
                        <br /> <span style={{color: "red"}}>{this.state.errors["alamat"]}</span>
                    </p>
                    <p>
                        <br /> <TextField type='text' size="30" onChange={this.handleChange.bind(this, "telp")} value={this.state.fields["telp"]} 
                        label='Telepon' variant="outlined" inputProps={{ maxLength: 120 }} />
                        <br /> <span style={{color: "red"}}>{this.state.errors["telp"]}</span>
                    </p>
                    <p>
                        <br /> <Button variant="contained" color="primary" type="submit">Register!</Button>
                    </p>
                </form>
            </div>
        );
    }
}
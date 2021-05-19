import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import { axiosInstance } from './AxiosInstance';

export default class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            fields: {},
            errors: {}
        }
     }

     /*
        Submit function will create a post request to login the user
            The result of the user action will be illustrated by the page redirecting the user to the homepage
    */

    Submit = event => {
        event.preventDefault();

        const data = this.state.fields;

        if(this.handleValidation()){ // panggil fungsi handleValidation dan periksa nilainya  (state)
            axiosInstance.post(`/api/login/`, data).then((result) => {    // lakukan post request pada login API 
                if(result.status === 200){
                    if(result.data.access_token){
                        localStorage.setItem('access_token', result.data.access_token); //simpan akses token pada cache

                        //Cache the current user nip_nrk to
                        localStorage.setItem('nip_nrk', result.data.nip_nrk); // simpan user id pada cache

                        //Cache staff status
                        localStorage.setItem('is_staff', result.data.is_staff);

                        axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token'); 
                        // ubah header request menjadi Bearer dan dilanjutkan dengan akses token pada cache
                    }
                    if(result.data.refresh){
                        localStorage.setItem('refresh', result.data.refresh); // simpan refresh token pada cache
                    }
                    
                    localStorage.setItem('isAuthorized', true); // ubah isAuthorized pada cache menjadi true
                    window.location.href = '/'; // re direct user ke homepage
                }
            });
        }
    };

    /*
        handleValidation function will set state value for error input
            the function will check all user the input same as the database require or nots
    */

    handleValidation(){
        let fields = this.state.fields; // mengambil informasi pada variabel fields
        let errors = {};
        let formIsValid = true;

        //nip_nrk
        if(!fields["nip_nrk"]){    // cek kosong atau tidak bar nip_nrk
           formIsValid = false;
           errors["nip_nrk"] = "Cannot be empty";
        }
  
        if(typeof fields["nip_nrk"] !== "undefined"){ // jika bernilai , cek menggunakan regex 
            if(!fields["nip_nrk"].match(/^[a-zA-Z0-9]+$/)){  // cek apakah sesuai dengan ketentuan 
               formIsValid = false;
               errors["nip_nrk"] = "Alpha Numeric Only";
            }
         }
 
        //password
        if(!fields["password"]){  //cek kosong atau tidak bar password
            formIsValid = false;
            errors["password"] = "Cannot be empty";
        }
    
        if(typeof fields["password"] !== "undefined"){ // jika bernilai , cek menggunakan regex 
             if(!fields["password"].match(/^[a-zA-Z0-9]+$/)){ // cek apakah sesuai dengan ketentuan 
                formIsValid = false;
                errors["password"] = "Alpha Numeric Only";
            }
        }

       this.setState({errors: errors}); // ubah variabel errors pada state menjadi errors
       return formIsValid; // kembalikan nilai formisvalid false / true
   }

   /*
        handleChange function will set the state value for text input

    */

    handleChange(field, e){            // ubah variabel field pada state menjadi nilai e
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }


    /*
        render function is used to render all necessary component for the page
        render function will render:
            Textfield for NIP/NRK
            Textfield for Password
            Button for submitting response
    */

    render () {
        return (
            <div className='Login'>
                <form onSubmit={this.Submit}>
                    <p>
                        <br /> <TextField variant="filled" color='primary' type='text' size="30" onChange={this.handleChange.bind(this, "nip_nrk")} value={this.state.fields["nip_nrk"]} 
                        label='NIP/NRK' inputProps={{ maxLength: 120 }} />
                        <br /> <span style={{color: "red"}}>{this.state.errors["nip_nrk"]}</span>
                    </p>
                    <p>
                        <br /> <TextField variant="filled" color='primary' type='password' size="30" onChange={this.handleChange.bind(this, "password")} value={this.state.fields["password"]} 
                        label='Password' inputProps={{ maxLength: 16, minLength: 8 }} />
                        <br /> <span style={{color: "red"}}>{this.state.errors["password"]}</span>
                    </p>
                    <p>
                        <br /><Button variant="contained" color="primary" type="submit">Login!</Button>  
                    </p>
                </form>
            </div>
        );
    }
}
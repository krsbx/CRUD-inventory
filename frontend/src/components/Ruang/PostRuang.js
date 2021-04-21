import React, { Component, useState } from 'react';
import axiosInstance from '../AxiosInstance';
import { Button, TextField, Select } from '@material-ui/core';

export default class PostRuang extends Component {
    constructor(props){
        super(props);

        this.state = {
            fields : {},
            errors : {},
            gedung : [],
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
        handleValidation function will set state value for error input
            the function will check all user the input same as the database require or nots
    */

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //ruangID
        if(!fields["ruangID"]){
           formIsValid = false;
           errors["ruangID"] = "Cannot be empty";
        }
  
        if(typeof fields["ruangID"] !== "undefined"){
            if(!fields["ruangID"].match(/^[a-zA-Z0-9]+$/)){
               formIsValid = false;
               errors["ruangID"] = "Alpha Numeric Only";
            }
         }
 
        //ruang
        if(!fields["ruang"]){
            formIsValid = false;
            errors["ruang"] = "Cannot be empty";
        }
    
        if(typeof fields["ruang"] !== "undefined"){
             if(!fields["ruang"].match(/^[a-zA-Z0-9]+$/)){
                formIsValid = false;
                errors["ruang"] = "Alpha Numeric Only";
            }
        }

        //pj_ruang
        if(!fields["pj_ruang"]){
            formIsValid = false;
            errors["pj_ruang"] = "Cannot be empty";
        }
    
        if(typeof fields["pj_ruang"] !== "undefined"){
             if(!fields["pj_ruang"].match(/^[a-zA-Z0-9]+$/)){
                formIsValid = false;
                errors["pj_ruang"] = "Alpha Numeric Only";
            }
        }

        //gedung
        if(!fields["gedung"]){
            formIsValid = false;
            errors["gedung"] = "Cannot be empty";
        }
    
        if(typeof fields["gedung"] !== "undefined"){
             if(!fields["gedung"].match(/^[a-zA-Z0-9]+$/)){
                formIsValid = false;
                errors["gedung"] = "Alpha Numeric Only";
            }
        }

       this.setState({errors: errors});
       return formIsValid;
    }

    /*
        PostRuang function will create a POST Rest API
        All Informations inputted by user, will be posted to database
        The POST Request will printed the result in browser console
    */

    PostRuang = () => {
        const data = this.state.fields;

        if(this.handleValidation()){
            axiosInstance.post(`/api/ruang/`, data).then((result) => {
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
        componentDidMount function will be called on page loaded
            when page loaded, call GetGedungName function
    */

    componentDidMount() {
        this.GetGedungName();
    }

    /*
        render function is used to render all necessary component for the page
        render function will render:
            Textfield for Ruang ID
            Textfield for Ruang
            Textfield for MG Gedung
            Button for submitting response
    */

    render () {
        return (
            <div>
                <p>
                    <br /> <TextField type='text' size="30" onChange={this.handleChange.bind(this, "ruangID")} value={this.state.fields["ruangID"]} 
                    label='Ruang ID' variant="outlined" InputLabelProps={{className: 'label_textfield'}} InputProps={{className: 'login_textFields'}} inputProps={{ maxLength: 10 }} />
                    <br /> <span style={{color: "red"}}>{this.state.errors["ruangID"]}</span>
                </p>
                <p>
                    <br /> <TextField type='text' size="30" onChange={this.handleChange.bind(this, "ruang")} value={this.state.fields["ruang"]} 
                    label='Ruang' variant="outlined" InputLabelProps={{className: 'label_textfield'}} InputProps={{className: 'login_textFields'}} inputProps={{ maxLength: 8 }} />
                    <br /> <span style={{color: "red"}}>{this.state.errors["ruang"]}</span>
                </p>
                <p>
                    <br /> <TextField type='text' size="30" onChange={this.handleChange.bind(this, "pj_ruang")} value={this.state.fields["pj_ruang"]} 
                    label='MG Gedung' variant="outlined" InputLabelProps={{className: 'label_textfield'}} InputProps={{className: 'login_textFields'}} inputProps={{ maxLength: 120 }} />
                    <br /> <span style={{color: "red"}}>{this.state.errors["pj_ruang"]}</span>
                </p>
                <p>
                    <Select name="Gedung" onChange={this.handleChange.bind(this, "gedung")} > { this.state.gedung } </Select>
                    <br /> <span style={{color: "red"}}>{this.state.errors["gedung"]}</span>
                </p>
                <br /><Button variant="contained" color="primary" onClick={() => this.PostRuang()}>Post Ruang!</Button>
            </div>
        );
    }
}
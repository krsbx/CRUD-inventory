import React, { Component } from 'react';
import axiosInstance from '../AxiosInstance';
import { Button, TextField } from '@material-ui/core';

export default class PostGedung extends Component {
    constructor(props){
        super(props);

        this.state = {
            fields: {},
            errors: {},
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
 
        //gedung
        if(!fields["gedung"]){
            formIsValid = false;
            errors["gedung"] = "Cannot be empty";
        }

        //mg_gedung
        if(!fields["mg_gedung"]){
            formIsValid = false;
            errors["mg_gedung"] = "Cannot be empty";
        }

       this.setState({errors: errors});
       return formIsValid;
    }

    /*
        PostGedung function will create a POST Rest API
        All Informations inputted by user, will be posted to database
        The POST Request will printed the result in browser console
    */

    PostGedung = event => {
        event.preventDefault();

        const data = this.state.fields;

        if(this.handleValidation()){
            axiosInstance.post(`/api/gedung/`, data).then((result) => {
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
            Textfield for Gedung
            Textfield for MG Gedung
            Button for submitting response
    */

    render () {
        return (
            <div className>
                <form onSubmit={this.PostGedung}>
                    <p>
                        <br /> <TextField type='text' size="30" onChange={this.handleChange.bind(this, "gedung")} value={this.state.fields["gedung"]} 
                        label='Gedung' variant="outlined" InputLabelProps={{className: 'label_textfield'}} InputProps={{className: 'login_textFields'}} inputProps={{ maxLength: 8 }} />
                        <br /> <span style={{color: "red"}}>{this.state.errors["gedung"]}</span>
                    </p>
                    <p>
                        <br /> <TextField type='text' size="30" onChange={this.handleChange.bind(this, "mg_gedung")} value={this.state.fields["mg_gedung"]} 
                        label='MG Gedung' variant="outlined" InputLabelProps={{className: 'label_textfield'}} InputProps={{className: 'login_textFields'}} inputProps={{ maxLength: 120 }} />
                        <br /> <span style={{color: "red"}}>{this.state.errors["mg_gedung"]}</span>
                    </p>
                    <br /><Button variant="contained" color="primary" type="submit">Post Gedung!</Button>
                </form>
            </div>
        );
    }
}
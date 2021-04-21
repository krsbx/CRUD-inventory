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

    handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //gedungID
        if(!fields["gedungID"]){
           formIsValid = false;
           errors["gedungID"] = "Cannot be empty";
        }
  
        if(typeof fields["gedungID"] !== "undefined"){
            if(!fields["gedungID"].match(/^[a-zA-Z0-9]+$/)){
               formIsValid = false;
               errors["gedungID"] = "Alpha Numeric Only";
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

        //mg_gedung
        if(!fields["mg_gedung"]){
            formIsValid = false;
            errors["mg_gedung"] = "Cannot be empty";
        }
    
        if(typeof fields["mg_gedung"] !== "undefined"){
             if(!fields["mg_gedung"].match(/^[a-zA-Z0-9]+$/)){
                formIsValid = false;
                errors["mg_gedung"] = "Alpha Numeric Only";
            }
        }

       this.setState({errors: errors});
       return formIsValid;
    }

    PostGedung = () => {
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

    render () {
        return (
            <div>
                <p>
                    <br /> <TextField type='text' size="30" onChange={this.handleChange.bind(this, "gedungID")} value={this.state.fields["gedungID"]} 
                    label='Gedung ID' variant="outlined" InputLabelProps={{className: 'label_textfield'}} InputProps={{className: 'login_textFields'}} inputProps={{ maxLength: 10 }} />
                    <br /> <span style={{color: "red"}}>{this.state.errors["gedungID"]}</span>
                </p>
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
                <br /><Button variant="contained" color="primary" onClick={() => this.PostGedung()}>Post Gedung!</Button>
            </div>
        );
    }
}
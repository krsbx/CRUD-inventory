import React, { Component } from 'react';
import axiosInstance from './axios';
import { Button, TextField } from '@material-ui/core';

export default class Gedung extends Component {
    constructor(props){
        super(props);

        this.state = {
            fields: {},
            errors: {}
        }
    }

    GedungList = () => {
        axiosInstance.get(`/api/gedung/`).then((result) => {
            const data = result.data;
            data.forEach(a => {
                console.log(a);
            });
        });
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
            axiosInstance.post(`/api/gedung/`, {
                gedungID: data['gedungID'],
                gedung: data['gedung'],
                mg_gedung: data['mg_gedung']
            }).then((result) => {
                if(result.status === 200){
                    const resp = result['data'];
                    console.log(resp['gedungID']);
                    console.log(resp['gedung']);
                    console.log(resp['mg_gedung']);
                }
            }).catch((error) => {
                console.log(error.response.data);
                if(error.response.status === 400){
                    let errors = this.state.errors;
                    console.log(error.response.data.gedung[0]);
                    errors['gedung'] = error.response.data.gedung[0];

                    this.state.errors = errors;
                    
                    return;
                }
            });
        }
    }

    render(){
        return (
            <div className='Gedung'>
                <Button variant="contained" color="primary" onClick={() => this.GedungList()}>Get Gedung!</Button>
                <p>
                    <br /> <TextField type='text' size="30" onChange={this.handleChange.bind(this, "gedungID")} value={this.state.fields["gedungID"]} 
                    label='Gedung ID' variant="outlined" InputLabelProps={{className: 'label_textfield'}} InputProps={{className: 'login_textFields'}} inputProps={{ maxLength: 120 }} />
                    <br /> <span style={{color: "red"}}>{this.state.errors["gedungID"]}</span>
                </p>
                <p>
                    <br /> <TextField type='text' size="30" onChange={this.handleChange.bind(this, "gedung")} value={this.state.fields["gedung"]} 
                    label='Gedung' variant="outlined" InputLabelProps={{className: 'label_textfield'}} InputProps={{className: 'login_textFields'}} inputProps={{ maxLength: 16, minLength: 8 }} />
                    <br /> <span style={{color: "red"}}>{this.state.errors["gedung"]}</span>
                </p>
                <p>
                    <br /> <TextField type='text' size="30" onChange={this.handleChange.bind(this, "mg_gedung")} value={this.state.fields["mg_gedung"]} 
                    label='MG Gedung' variant="outlined" InputLabelProps={{className: 'label_textfield'}} InputProps={{className: 'login_textFields'}} inputProps={{ maxLength: 255 }} />
                    <br /> <span style={{color: "red"}}>{this.state.errors["mg_gedung"]}</span>
                </p>
                <br /><Button variant="contained" color="primary" onClick={() => this.PostGedung()}>Post Gedung!</Button>
            </div>
        );
    }
};
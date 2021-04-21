import React, { Component } from 'react';
import axios from 'axios';
import { Button, TextField, Input } from '@material-ui/core';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 5000,
	headers: {
		'Authorization': localStorage.getItem('access_token') ? 'Bearer ' + localStorage.getItem('access_token') : null,
		'Content-Type': 'multipart/form-data',
		'Accept': 'application/json',
	}, 
});

export default class PostBarang extends Component {
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

        //barangId
        if(!fields["barangId"]){
           formIsValid = false;
           errors["barangId"] = "Cannot be empty";
        }
  
        if(typeof fields["barangId"] !== "undefined"){
            if(!fields["barangId"].match(/^[a-zA-Z0-9]+$/)){
               formIsValid = false;
               errors["barangId"] = "Alpha Numeric Only";
            }
         }
 
        //kode_barang
        if(!fields["kode_barang"]){
            formIsValid = false;
            errors["kode_barang"] = "Cannot be empty";
        }
    
        if(typeof fields["kode_barang"] !== "undefined"){
             if(!fields["kode_barang"].match(/^[a-zA-Z0-9]+$/)){
                formIsValid = false;
                errors["kode_barang"] = "Alpha Numeric Only";
            }
        }

        //nama_barang
        if(!fields["nama_barang"]){
            formIsValid = false;
            errors["nama_barang"] = "Cannot be empty";
        }
    
        if(typeof fields["nama_barang"] !== "undefined"){
             if(!fields["nama_barang"].match(/^[a-zA-Z0-9]+$/)){
                formIsValid = false;
                errors["nama_barang"] = "Alpha Numeric Only";
            }
        }

        //merk
        if(!fields["merk"]){
            formIsValid = false;
            errors["merk"] = "Cannot be empty";
        }
    
        if(typeof fields["merk"] !== "undefined"){
             if(!fields["merk"].match(/^[a-zA-Z0-9]+$/)){
                formIsValid = false;
                errors["merk"] = "Alpha Numeric Only";
            }
        }

        //stock
        if(!fields["stock"]){
            formIsValid = false;
            errors["stock"] = "Cannot be empty";
        }
    
        if(typeof fields["stock"] !== "undefined"){
             if(!fields["stock"].match(/^[0-9]+$/)){
                formIsValid = false;
                errors["stock"] = "Integer Only";
            }
        }
        
        //BAST_perolehan
        if(fields["BAST_perolehan"] === "undefined" || !fields["BAST_perolehan"]){
            formIsValid = false;
            errors["BAST_perolehan"] = "Cannot be empty";
        }

       this.setState({errors: errors});
       return formIsValid;
    }

    /*
        PostBarang function will create a POST Rest API
        All Informations inputted by user, will be posted to database
        The POST Request will printed the result in browser console
    */

    PostBarang = () => {
        const data = this.state.fields;

        if(this.handleValidation()){
            let toPost = new FormData();

            for(let d in data){
                toPost.append(d, data[d]);
            }

            axiosInstance.post(`/api/barang/`, toPost).then((result) => {
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
            Textfield for Barang ID
            Textfield for Kode Barang
            Textfield for Nama Barang
            Textfield for Merk
            Textfield for Stock
            Uploadfield for BAST Perolehan
            Button for submitting response
    */

    render () {
        return (
            <div>
                <p>
                    <br /> <TextField type='text' size="30" onChange={this.handleChange.bind(this, "barangId")} value={this.state.fields["barangId"]} 
                    label='Barang ID' variant="outlined" InputLabelProps={{className: 'label_textfield'}} InputProps={{className: 'login_textFields'}} inputProps={{ maxLength: 20 }} />
                    <br /> <span style={{color: "red"}}>{this.state.errors["barangId"]}</span>
                </p>
                <p>
                    <br /> <TextField type='text' size="30" onChange={this.handleChange.bind(this, "kode_barang")} value={this.state.fields["kode_barang"]} 
                    label='Kode Barang' variant="outlined" InputLabelProps={{className: 'label_textfield'}} InputProps={{className: 'login_textFields'}} inputProps={{ maxLength: 20 }} />
                    <br /> <span style={{color: "red"}}>{this.state.errors["kode_barang"]}</span>
                </p>
                <p>
                    <br /> <TextField type='text' size="30" onChange={this.handleChange.bind(this, "nama_barang")} value={this.state.fields["nama_barang"]} 
                    label='Nama Barang' variant="outlined" InputLabelProps={{className: 'label_textfield'}} InputProps={{className: 'login_textFields'}} inputProps={{ maxLength: 20 }} />
                    <br /> <span style={{color: "red"}}>{this.state.errors["nama_barang"]}</span>
                </p>
                <p>
                    <br /> <TextField type='text' size="30" onChange={this.handleChange.bind(this, "merk")} value={this.state.fields["merk"]} 
                    label='Merk' variant="outlined" InputLabelProps={{className: 'label_textfield'}} InputProps={{className: 'login_textFields'}} inputProps={{ maxLength: 20 }} />
                    <br /> <span style={{color: "red"}}>{this.state.errors["merk"]}</span>
                </p>
                <p>
                    <br /> <TextField type='text' size="30" onChange={this.handleChange.bind(this, "stock")} value={this.state.fields["stock"]} 
                    label='Stock' variant="outlined" InputLabelProps={{className: 'label_textfield'}} InputProps={{className: 'login_textFields'}} />
                    <br /> <span style={{color: "red"}}>{this.state.errors["stock"]}</span>
                </p>
                <p>
                    <Button variant="outlined" component="BAST_perolehan" label="BAST Perolehan"><Input type='file' hidden onChange={this.handleFile.bind(this, "BAST_perolehan")}/></Button>
                    <br /> <span style={{color: "red"}}>{this.state.errors["BAST_perolehan"]}</span>
                </p>
                <br /><Button variant="contained" color="primary" onClick={() => this.PostBarang()}>Post Barang!</Button>
            </div>
        );
    }
}
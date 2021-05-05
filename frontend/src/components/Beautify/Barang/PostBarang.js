import React, { Component } from 'react';
import { axiosInstance, baseURL } from '../../AxiosInstance';
import { Button, TextField, Select, InputLabel, FormControl, Input } from '@material-ui/core';

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
 
        //kode_barang
        //  kode_barang can be empty

        //nama_barang
        if(!fields["nama_barang"]){
            formIsValid = false;
            errors["nama_barang"] = "Cannot be empty";
        }

        //merk
        if(!fields["merk"]){
            formIsValid = false;
            errors["merk"] = "Cannot be empty";
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

    PostBarang = event => { 
        event.preventDefault();

        const data = this.state.fields;

        if(this.handleValidation()){ // memanggil fungsi handlevalidation.
            let toPost = new FormData(); // membuat objek formData untuk di kirimkan.

            for(let d in data){ // isi formData dengan data yang ada pada variabel fields.
                toPost.append(d, data[d]);
            }

            axiosInstance.post(`/api/barang/`, toPost, { // membuat post request pada barang API .
                headers: { 
                    'Content-Type': 'multipart/form-data', // mengubah header content-type menjadi form-data.
                }
            }).then((result) => {
                if(result.status === 201){ // jika sukses.
                    const resp = result['data']; 

                    for(var key in resp){ // mencetak hasil kedalam console.
                        console.log(`${key} : ${resp[key]}`);
                    }
                    window.location.href = '/barang'; // re-direct ke barang page.
                }
            }).catch((error) => {
                console.log(error.response.data);
                
                if(error.response.status === 400){ // jika terjadi kesalahan request.
                    let errors = this.state.errors;

                    for(var key in error.response.data){ //  masukan semua kesalahan pada variable errors. 
                        errors[key] = error.response.data[key];
                    }

                    this.state.errors = errors; // mengubah variable errors pada state menjadi errors.
                    
                    return;
                }
            });
        }
    }

    /*
        render function is used to render all necessary component for the page
        render function will render:
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
                <form onSubmit={this.PostBarang}>
                    {/* Kode Barang Field */}
                    <p>
                        <br /> <TextField type='text' size="30" onChange={this.handleChange.bind(this, "kode_barang")} value={this.state.fields["kode_barang"]} 
                        label='Kode Barang' variant="outlined" inputProps={{ maxLength: 20 }} />
                        <br /> <span style={{color: "red"}}>{this.state.errors["kode_barang"]}</span>
                    </p>
                    {/* Nama Barang Field */}
                    <p>
                        <br /> <TextField type='text' size="30" onChange={this.handleChange.bind(this, "nama_barang")} value={this.state.fields["nama_barang"]} 
                        label='Nama Barang' variant="outlined" inputProps={{ maxLength: 20 }} />
                        <br /> <span style={{color: "red"}}>{this.state.errors["nama_barang"]}</span>
                    </p>
                    {/* Merk Barang Field */}
                    <p>
                        <br /> <TextField type='text' size="30" onChange={this.handleChange.bind(this, "merk")} value={this.state.fields["merk"]} 
                        label='Merk' variant="outlined" inputProps={{ maxLength: 20 }} />
                        <br /> <span style={{color: "red"}}>{this.state.errors["merk"]}</span>
                    </p>
                    {/* Stock Barang Field */}
                    <p>
                        <br /> <TextField type='text' size="30" onChange={this.handleChange.bind(this, "stock")} value={this.state.fields["stock"]} 
                        label='Stock' variant="outlined" />
                        <br /> <span style={{color: "red"}}>{this.state.errors["stock"]}</span>
                    </p>
                    {/* BAST Perolehan Field */}
                    <p>
                        <br /><FormControl className="UploadInput">
                            <InputLabel>BAST Perolehan</InputLabel>
                            <br /><Button variant="outlined" component="BAST_perolehan" label="BAST Perolehan"><Input type='file' hidden onChange={this.handleFile.bind(this, "BAST_perolehan")}/></Button>
                        </FormControl>
                        <br /> <span style={{color: "red"}}>{this.state.errors["BAST_perolehan"]}</span>
                    </p>
                    <br /><Button variant="contained" color="primary" type="submit">Simpan Barang!</Button>
                </form>
            </div>
        );
    }
}
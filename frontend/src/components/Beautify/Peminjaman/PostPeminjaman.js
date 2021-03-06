import React, { Component } from 'react';
import { axiosInstance, baseURL } from '../../AxiosInstance';
import { Button, TextField, Input } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers';

export default class PostPeminjaman extends Component {
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

        //tgl_pinjam
        if(!fields["tgl_pinjam"]){
            formIsValid = false;
            errors["tgl_pinjam"] = "Cannot be empty";
        }

        //BAST_disposisi
        if(fields["BAST_disposisi"] === "undefined" || !fields["BAST_disposisi"]){
            formIsValid = false;
            errors["BAST_disposisi"] = "Cannot be empty";
        }

       this.setState({errors: errors});
       return formIsValid;
    }

    /*
        PostPeminjaman function will create a POST Rest API
        All Informations inputted by user, will be posted to database
        The POST Request will printed the result in browser console
    */

    PostPeminjaman = event => {
        event.preventDefault();
        
        const data = this.state.fields;

        if(this.handleValidation()){ // memanggil fungsi handlevalidation.
            let toPost = new FormData(); // membuat objek formData untuk di kirimkan.

            for(let d in data){ // isi formData dengan data yang ada pada variabel fields.
                toPost.append(d, data[d]);
            }

            axiosInstance.post(`/api/peminjaman/`, toPost, { // membuat post request pada barang API .
                headers: {
                    'Content-Type': 'multipart/form-data', // mengubah header content-type menjadi form-data.
                }
            }).then((result) => {
                if(result.status === 200){ // jika sukses.
                    const resp = result['data'];

                    for(var key in resp){ // mencetak hasil kedalam console.
                        console.log(`${key} : ${resp[key]}`);
                    }
                }
            }).catch((error) => {
                console.log(error.response.data);

                if(error.response.status === 400){ // jika terjadi kesalahan request.
                    let errors = this.state.errors;

                    for(var key in error.response.data){ // masukan semua kesalahan pada variable errors. 
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
            Textfield for Tanggal Pinjam
            Textfield for Tanggal Kembali
            Uploadfield for BAST Disposisi
            Button for submitting response
    */

    render () {
        return (
            <div>
                <form onSubmit={this.PostPeminjaman}>
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
                            value={this.state.fields["tgl_kembali"]} onChange={(value, e) => this.state.fields['tgl_kembali'] = e} />
                        </MuiPickersUtilsProvider>
                        <br /> <span style={{color: "red"}}>{this.state.errors["tgl_kembali"]}</span>
                    </p>
                    <p>
                        <br /><Button variant="outlined" component="BAST_disposisi" label="BAST Disposisi"><Input type='file' onChange={this.handleFile.bind(this, "BAST_disposisi")}/></Button>
                        <br /> <span style={{color: "red"}}>{this.state.errors["BAST_disposisi"]}</span>
                    </p>
                    <br /><Button variant="contained" color="primary" type="submit">Post Peminjaman!</Button>
                </form>
            </div>
        );
    }
}
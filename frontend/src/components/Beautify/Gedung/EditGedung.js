import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../AxiosInstance';
import { useParams } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';

export default function EditGedung() {
  const [error, setError] = useState({});
  const [mg_gedung, setMg_gedung] = useState('');
  const { gedung } = useParams();

  const GetGedungDetails = async () => {
    await axiosInstance.get(`/api/gedung/${gedung}`).then((result) => {
        //Retrieved response body of the request
        const data = result.data;
        setMg_gedung(data.mg_gedung);
    });
  }

  const handleValidation = () => {
    let formIsValid = true;
    let err = {};

    //mg_gedung
    if(!mg_gedung){
        formIsValid = false;
        err["merk"] = "Cannot be empty";
    }

    setError(err);
    return formIsValid;
  }

  const UpdateGedung = async (event) => {
    event.preventDefault();

    if(handleValidation()) {
      let data = {
        'mg_gedung': mg_gedung,
      }

      await axiosInstance.patch(`/api/gedung/${gedung}`, data);

      window.location.href='/gedung';
    }
  }

  useEffect(() => {
    GetGedungDetails();
  }, [])

  return (
    <div>
        <form onSubmit={UpdateGedung}>
            {/* Nama Gedung Field */}
            <p>
                <br /> <TextField type='text' size="30" value={gedung} 
                label='Gedung' variant="outlined" inputProps={{ readOnly: true, }}/>
            </p>
            {/* MG Gedung Field */}
            <p>
                <br /> <TextField type='text' size="30" onChange={(e) => setMg_gedung(e.target.value)}
                value={mg_gedung} label='MG Gedung' variant="outlined" inputProps={{ maxLength: 120 }} />
                <br /> <span style={{color: "red"}}>{error["mg_gedung"]}</span>
            </p>
            <br /><Button variant="contained" color="primary" type="submit">Perbarui Gedung!</Button>
        </form>
    </div>
  );
}

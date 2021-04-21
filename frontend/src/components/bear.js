import React, {Component} from 'react'
import {Button , Grid } from '@material-ui/core'
export default class bear extends Component {

    constructor (props){
        super(props);

    }
    render () {
        return (
        <div className = 'gibran'> 
            <h1>selamat datang</h1> 
            <p /> <h1>assalamualaikum</h1>  
            <Button variant="contained" color="secondary" >  Salam </Button>
            
        </div>);
        
    }
}

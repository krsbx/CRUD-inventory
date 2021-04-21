import React, { Component } from 'react';
import axiosInstance from './AxiosInstance';

export default class Logout extends Component {
    constructor(props){
        super(props);
    }

    render () {

        const logout = () => {
            axiosInstance.defaults.headers['Authorization'] = null;
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh');
            localStorage.removeItem('isAuthorized');
            window.location.href = '/';
        }

        return (
            <div>
                {logout()}
            </div>
        );
    }
}
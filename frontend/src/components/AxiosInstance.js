import axios from 'axios'
import React from 'react'
import { Button } from '@material-ui/core'
/*
	This module will be used for all REST request after the user logged in
*/

//	Set the website main url

export const baseURL = 'http://127.0.0.1:8000/';

/*
	Create an axios instance with the current configurations
		baseURL => base connections request
		timeout => maximum time for the request to call
		headers => will be used for rest API
*/

export const axiosInstance = axios.create({ //membuat objek axios 
	baseURL: baseURL,   // baseURL request akan dipanggil kesini semua req yang ada
	timeout: 5000,      // waktu maksimal request (5s)
	headers: {
		'Authorization': localStorage.getItem('access_token') ? 'Bearer ' + localStorage.getItem('access_token') : null, // akses yang diberikan (mengambil dari cache)
		'Content-Type': 'application/json',			// req yang diminta berupa json
		'Accept': 'application/json',            // response dari server berupa json
	}, 
});


export const PrevNext = (urls, ListFunc, isNext) => {   // fungsi prevnext dengan 3 parameter 
	let newUrls = urls;    			// ambil nilai dari url
	
	if(urls == `?page=#`){					// cek apakah pada main URI 
		newUrls = ``;
	}

	return (
		<>
			<Button variant="contained" color="primary" onClick={() => ListFunc(newUrls)}>{isNext == true ? 'Next' : 'Prev'}</Button>
		</>
	);   // kembalikan button untuk ke prev atau next page 
}

export const previousCheck = (toCheck, apiPath) => {  // fungsi dengan 2 parameter 
	if(toCheck == `${baseURL}api/${apiPath}/`){  		// pengecekan apakah sesuai dengan main URI
		return 1;
	}else if(toCheck == null){ 							// pengecekan untuk kondisi empty (null) atau tidak 
		return '#';
	}

	return toCheck.searchParams.get('page');      // kembalikan nilai dari page pada parameter URI
}

/*
	Set additional request when creating rest API
		Create a reject promis on user not logged in
		If the user has a refresh token, create a new request for a new token
*/

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;

		if (typeof error.response === 'undefined') {       // pengecekan cors header
			alert(
				'A server/network error occurred. ' +
					'Looks like CORS might be the problem. ' +
					'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}

		if (error.response.status === 401 && originalRequest.url === baseURL + 'api/token/refresh/') { //pengecekan jika user tidak login
			window.location.href = `${baseURL}login/`;
			return Promise.reject(error);
		}

		if (error.response.data.code === 'token_not_valid' && error.response.status === 401 && error.response.statusText === 'Unauthorized') {  
			// pengecekan jika user tidak login dan token tidak valid 
			const refreshToken = localStorage.getItem('refresh');

			if (refreshToken !== "undefined") {   // cek token ada atau tidak
				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

				// exp date in token is expressed in seconds, while now() returns milliseconds:
				const now = Math.ceil(Date.now() / 1000);
				console.log(tokenParts.exp);

				if (tokenParts.exp > now) {  // cek refresh token valid atau tidak  
					return axiosInstance // lakukan post request pada token /refresh 
						.post('api/token/refresh/', { refresh: refreshToken })
						.then((response) => {
							localStorage.setItem('access_token', response.data.access);  // memperbaharui akses token pada cache
								
							// memperbaharui header axios
							axiosInstance.defaults.headers['Authorization'] = 
								'Bearer ' + response.data.access;
							originalRequest.headers['Authorization'] =
								'Bearer ' + response.data.access;

							return axiosInstance(originalRequest);
						})
						.catch((err) => {
							console.log(err);
						});
				} else {                      // jika refresh token tidak valid 
					// hapus semua informasi ppada cache 
					console.log('Refresh token is expired', tokenParts.exp, now);  
					localStorage.removeItem('access_token');
					localStorage.removeItem('refresh');
					localStorage.removeItem('nip_nrk');
					localStorage.removeItem('isAuthorized');
					window.location.href = `${baseURL}login/`;   // re direct user ke login page
				}
			} else {
				// hapus semua informasi ppada cache 
				console.log('Refresh token not available.');
				localStorage.removeItem('access_token');
				localStorage.removeItem('refresh');
				localStorage.removeItem('nip_nrk');
				localStorage.removeItem('isAuthorized');
				window.location.href = `${baseURL}login/`; // re direct user ke login page
			}
		}

		// specific error handling done elsewhere
		return Promise.reject(error);
	}
);

export default { axiosInstance, baseURL, PrevNext, previousCheck};
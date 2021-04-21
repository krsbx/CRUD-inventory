import axios from 'axios'

const baseURL = 'http://localhost:8000/';

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
	headers: {
		'Authorization': localStorage.getItem('access_token') ? 'Bearer ' + localStorage.getItem('access_token') : null,
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	}, 
});

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;

		if (typeof error.response === 'undefined') {
			alert(
				'A server/network error occurred. ' +
					'Looks like CORS might be the problem. ' +
					'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}

		if (error.response.status === 401 && originalRequest.url === baseURL + 'api/token/refresh/') {
			window.location.href = `${baseURL}login/`;
			return Promise.reject(error);
		}

		if (error.response.data.code === 'token_not_valid' && error.response.status === 401 && error.response.statusText === 'Unauthorized') {
			const refreshToken = localStorage.getItem('refresh');

			if (refreshToken !== "undefined") {
				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

				// exp date in token is expressed in seconds, while now() returns milliseconds:
				const now = Math.ceil(Date.now() / 1000);
				console.log(tokenParts.exp);

				if (tokenParts.exp > now) {
					return axiosInstance
						.post('api/token/refresh/', { refresh: refreshToken })
						.then((response) => {
							localStorage.setItem('access_token', response.data.access);

							axiosInstance.defaults.headers['Authorization'] =
								'Bearer ' + response.data.access;
							originalRequest.headers['Authorization'] =
								'Bearer ' + response.data.access;

							return axiosInstance(originalRequest);
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					console.log('Refresh token is expired', tokenParts.exp, now);
					localStorage.removeItem('access_token');
					localStorage.removeItem('refresh');
					localStorage.removeItem('isAuthorized');
					window.location.href = `${baseURL}login/`;
				}
			} else {
				console.log('Refresh token not available.');
				localStorage.removeItem('access_token');
				localStorage.removeItem('refresh');
				localStorage.removeItem('isAuthorized');
				window.location.href = `${baseURL}login/`;
			}
		}

		// specific error handling done elsewhere
		return Promise.reject(error);
	}
);

export default axiosInstance;
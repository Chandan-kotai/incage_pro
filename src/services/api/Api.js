import axios from "axios";


export const BaseUrl = "http://192.168.1.14/smart_lock_pro";

const Api = axios.create({ baseURL: `${BaseUrl}/api` });

// const config = {
//     headers: {
//         'Content-Type': 'multipart/form-data',
//     },
//     data: formData,
// }

// user login
export const LOGIN = (loginData) => Api.post('/user-sign-in.php', loginData);
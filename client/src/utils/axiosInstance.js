import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] =` Bearer ${token}`;
    }
    else
        delete axios.defaults.headers.common["Authorization"];
}
const token = localStorage.getItem("token");
if (token) {
    setAuthToken(token);
}

export default axios.create({
    baseURL: "http://localhost:7070/api/v1",
})
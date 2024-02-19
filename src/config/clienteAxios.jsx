import axios from 'axios'

const clienteAxios = axios.create({
    baseURL: 'https://cepronetciebackend-dev-hrjq.1.us-1.fl0.io/api'
})

export default clienteAxios;

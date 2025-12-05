import axios, { Axios } from "axios";

const URL_API="http://localhost:8015/api/v1"

export const getAllProductos = async () =>{
    const response = await axios.get(`${URL_API}/productos`);
    return response.data;
}
export const saveProducto = async (producto)=>{
    const response = await axios.post(`${URL_API}/productos/save`,producto);
    return response.data; 
}

export const findProductoId = async (id) =>{
    const response = await axios.get(`${URL_API}/productos/find/${id}`)
    return response.data;
}
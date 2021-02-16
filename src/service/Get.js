// import { url } from "./Config";
import instance from "axios";
const axios = instance.create();

const url = 'https://pokeapi.co/api/v2';

const Get = (path, params, bool) => {
    let getAxios;
    switch (bool) {
        case true:
            getAxios = axios.get(`${url}/${path}/${params}`);
            break;
        case false:
            getAxios = axios.get(`${url}/${path}`);
            break;
        default:
            break;
    }
    const promise = new Promise((resolve, reject) => {
        getAxios.then(
            res => {
                resolve(res);
            },
            err => {
                reject(err);
            }
        );
    });
    return promise;
};

export default Get;

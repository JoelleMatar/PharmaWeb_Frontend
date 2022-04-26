import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';



export const login = (formData) => async (dispatch) => {
    try {
        console.log("hiii")
        const { data } = await api.login(formData);

        console.log("dataaa", data);
        // dispatch({ type: AUTH, data });
        if (data.result.role === 1) {
            return "admin";
        }
        else
            return "user";
    } catch (error) {
        console.log(error);
        return false
    }
};

export const signUpBuyer = (formData) => async (dispatch) => {
    try {
        console.log("dataa", data)
        const { data } = await api.signUpBuyer(formData);

        // dispatch({ type: AUTH, data });

        return data

    } catch (error) {
        console.log(error);

        return false
    }
};
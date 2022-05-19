import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

// These are from Auth.js a dispatch action sent with parameters
export const signin = (formData, history) => async (dispatch) => {

    try {
        // Log in the user once we get our data we want to dispatch and action
        const { data } = await api.signIn(formData);

        // Dispatching an action
        dispatch({ type: AUTH, data })

        history.push("/");
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        // Log in the user once we get our data we want to dispatch and action
        const { data } = await api.signUp(formData);

        // Dispatching an action
        dispatch({ type: AUTH, data })

        history.push("/");
    } catch (error) {
        console.log(error);
    }
}
import { notification } from 'antd'
import { getToken, authAxios as axios } from "../../../request";
import { addProduct, listProduct } from '../api/productApi';


export const addProducts = (valData) => async (dispatch) => {
    dispatch({ type: 'PRODUCT_SHOWLOADER' });
    let { data } = await axios.post(addProduct(), valData, getToken());
    if (!data.error) {
        dispatch({ type: 'PRODUCT_HIDELOADER' });

        notification.success({
            message: data.message || 'Success'
        })

    } else {
        dispatch({ type: 'PRODUCT_HIDELOADER' });

        notification.error({
            message: data.message || 'Error',
        })
    }

    return data;
}


export const listAllProduct = (filters) => async (dispatch) => {
    dispatch({ type: 'PRODUCT_SHOWLOADER' });
    let config = {
        params: { ...filters },
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
    }
    let { data } = await axios.get(listProduct(), config);
    console.log(data)
    dispatch({ type: 'PRODUCT_HIDELOADER' });
    if (!data.error) {
        // notification.success({
        //     message: data.message || 'Success'
        // })
        dispatch({ type: 'LIST_ALL_PRODUCT', payload: data.data });

    } else {
        notification.error({
            message: data.message || 'Error',
        })
    }
    return data.data;

}

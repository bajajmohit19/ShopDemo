import { apiUrl } from "../../../settings";

export const addProduct = () => {
    return apiUrl + '/product';
};

export const listProduct = () => {
    return apiUrl + '/product';
};
export const listProductUrl = (id) => {
    return apiUrl + '/product/' + id;
};
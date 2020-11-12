export default (
    state = {
        productLoader: false,
        addedProduct: {},
        allProducts: [],
        totalProducts: 0,
        product: {}
    },
    action
) => {
    switch (action.type) {
        case 'PRODUCT_SHOWLOADER':
            return { ...state, productLoader: true };
        case 'PRODUCT_HIDELOADER':
            return { ...state, productLoader: false };
        case 'PRODUCT_CARD_SHOWLOADER':
            return { ...state, productCardLoader: true };
        case 'PRODUCT_CARD_HIDELOADER':
            return { ...state, productCardLoader: false };
        case 'PRODUCT_COURSE':
            return { ...state, product: action.payload.data };
        case 'PRODUCT_COURSE':
            return { ...state, addedProduct: action.payload };
        case 'LIST_ALL_PRODUCT':
            return { ...state, allProducts: action.payload.data, totalProducts: action.payload.total }
        default:
            return state
    }
}

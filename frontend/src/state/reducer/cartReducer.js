const reducer = (state = [],action) => {
    switch(action.type){
        case "add":
            //add a product
            var payload = action.payload;
            var found = false;
            const newState = state.map((product,index) => {
                if(product._id === payload._id){
                    product.quantity++;
                    found = true; 
                    return product;
                }else{
                    return product;
                }
            })
            if(found)
            return newState;
            else return [...newState,{...payload,quantity:1}];
        case "initialiseCart":
            var payload = action.payload;
            return [...payload];
        case "delete":
            //delete a product
            return state;
        case "increment":
            return state;
            //
        case "decrement":
            return state;
            //
        default:
            return state;
    }
}
export default reducer
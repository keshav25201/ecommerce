const reducer = (state = null,action) => {
    switch(action.type){
        case "set":
            return action.payload;
        case "unset":
            return null;
        default:
            return state;
    }
}

export default reducer;
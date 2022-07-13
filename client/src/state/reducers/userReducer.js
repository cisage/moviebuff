const reducer = (state = null, action) => {
  if (action.type === "store_user") {
    console.log("dispatched");
    console.log(action.payload);
    return action.payload;
  } else {
    return state;
  }
};

export default reducer;

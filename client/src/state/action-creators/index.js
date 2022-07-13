export const storeCurrentUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: "store_user",
      payload: user,
    });
  };
};

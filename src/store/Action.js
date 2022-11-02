export const ADD_INFOMEMBER = "ADD_INFOMEMBER";
export const UPDATE_INFOMEMBER = "UPDATE_INFOMEMBER";
export const DELETE_INFOMEMBER = "DELETE_INFOMEMBER";

export const addInfoMember = (value) => {
  return {
    type: ADD_INFOMEMBER,
    value
  };
};

export const updateInfoMember = (value) => {
  return {
    type: UPDATE_INFOMEMBER,
    value
  };
};

export const deleteInfoMember = (value) => {
  return {
    type: DELETE_INFOMEMBER,
    value
  };
};

import { createSlice } from '@reduxjs/toolkit';
// const initialState = {
//   f_CountryCode: '',
//   f_StateCode: '',
//   f_Lat: '',
//   f_Lng: '',
//   f_Country: '',
//   f_State: '',
//   f_City: '',
//   f_Floor: '',
//   f_street: '',
//   t_CountryCode: '',
//   t_StateCode: '',
//   t_Lat: '',
//   t_Lng: '',
//   t_Country: '',
//   t_State: '',
//   t_City: '',
//   t_Floor: '',
//   t_street: '',
//   phone: '',
//   info: '',
// };

const initialState = {
  location: '',
};

const mylocationSlice = createSlice({
  name: 'mylocation',
  initialState,
  reducers: {
    addLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { addLocation } = mylocationSlice.actions;
export default mylocationSlice.reducer;

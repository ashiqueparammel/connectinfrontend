import { createSlice } from "@reduxjs/toolkit"

const INITIAL_STATE = {
    userInfo: {},
    // userDetail:{},
}

export const userSlice = createSlice({
    name: "user",
    initialState: INITIAL_STATE,
    reducers: {
        setUserDetails: (state, action) => {
            state.userInfo = action.payload;
        },
        resetState: (state) => {
            return INITIAL_STATE;
        }

    }

})

export const { setUserDetails,resetState } = userSlice.actions; // Export the setUserDetails action

export default userSlice.reducer;
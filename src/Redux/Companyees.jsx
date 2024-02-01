import { createSlice } from "@reduxjs/toolkit"

const INITIAL_STATE = {
   companyInfo: {},
    
}

export const companySlice = createSlice({
    name: "company",
    initialState: INITIAL_STATE,
    reducers: {
        setCompanyDetails: (state, action) => {
            state.companyInfo = action.payload;
        },
        CompanyResetState: (state) => {
            return INITIAL_STATE;
        }

    }

})

export const { setCompanyDetails,CompanyResetState } = companySlice.actions; // Export the setCompanyDetails action

export default companySlice.reducer;
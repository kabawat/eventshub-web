import URLs from "@/lib/endpoints";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ServiceAccessAPI } from "@/lib/services";
import { handleError } from "@/store/helper/errorHandle";
// Thunk to fetch user profile data
export const get_profile = createAsyncThunk('get_user_profile', async (_, { rejectWithValue }) => {
    try {
        const { data } = await ServiceAccessAPI.get(URLs.PROFILE);

        return data;
    } catch (error) {
        const resError = handleError(error)
        return rejectWithValue(resError);
    }
});

const user_profile = createSlice({
    name: "user_profile",
    initialState: {
        loading: false,
        error: null,
        data: null,
        status: false,
    },
    extraReducers: (builder) => {
        builder.addCase(get_profile.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(get_profile.fulfilled, (state, { payload }) => {
            state.data = payload?.profile;
            state.status = true;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(get_profile.rejected, (state, { payload }) => {
            state.error = payload;
            state.loading = false;
            state.data = null;
        });
    },
    reducers: {}
});
const ProfileSlice = user_profile.reducer;
export default ProfileSlice;

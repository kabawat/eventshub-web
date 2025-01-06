import { FetchEventsService } from "@/lib/services/admin";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    loading: false,
    error: null,
    data: null,
    status: false,
    currentPage: 0,
    totalEvents: 0,
    totalPages: 0,
    activeEvents: 0
};

export const fetchAllEvents = createAsyncThunk(
    "events/fetchEvents",
    async ({ page }, { rejectWithValue }) => {
        try {
            const res = await FetchEventsService({ page });
            return res;
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Failed to fetch events.";
            return rejectWithValue(errorMessage);
        }
    }
);

// Slice
const evenhandler = createSlice({
    name: "events",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllEvents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllEvents.fulfilled, (state, action) => {
                const { events, currentPage, totalEvents, totalPages, activeEvents } = action.payload;
                state.data = events;
                state.status = true;
                state.loading = false;
                state.error = null;
                state.currentPage = currentPage;
                state.totalEvents = totalEvents;
                state.totalPages = totalPages;
                state.activeEvents = activeEvents;
            })
            .addCase(fetchAllEvents.rejected, (state, action) => {
                state.error = action.payload || "Unknown error occurred.";
                state.loading = false;
                state.data = null;
            });
    },
});
const eventsSlice = evenhandler.reducer
export default eventsSlice;

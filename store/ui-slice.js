import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
	name: "ui",
	initialState: {
		navBarColor: "transparent",
	},
	reducers: {
		scrollChanged: (state, payload) => {
			if (payload.payload > 80 && state.navBarColor !== "blur")
				state.navBarColor = "blur";
			else if (payload.payload <= 80 && state.navBarColor === "blur")
				state.navBarColor = "transparent";
		},
	},
});

export default uiSlice;

export const uiActions = uiSlice.actions;

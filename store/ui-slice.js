import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
	name: "ui",
	initialState: {
		navBarColor: "transparent",
		language: "English",
	},
	reducers: {
		scrollChanged: (state, payload) => {
			if (payload.payload > 80 && state.navBarColor !== "blur")
				state.navBarColor = "blur";
			else if (payload.payload <= 80 && state.navBarColor === "blur")
				state.navBarColor = "transparent";
		},
		setLanguage: (state, payload) => {
			state.language = payload.payload;
			console.log(payload);
		},
	},
});

export default uiSlice;

export const uiActions = uiSlice.actions;

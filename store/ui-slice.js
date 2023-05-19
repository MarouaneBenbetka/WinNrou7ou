import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
	name: "ui",
	initialState: {
		navBarColor: "transparent",
		language: "English",
		mapView: false,
		windowHeight: 1000,
	},
	reducers: {
		scrollChanged: (state, payload) => {
			if (payload.payload > 80 && state.navBarColor !== "blur")
				state.navBarColor = "blur";
			else if (payload.payload <= 80 && state.navBarColor === "blur")
				state.navBarColor = "transparent";

			if (payload.payload >= state.windowHeight - 10)
				state.mapView = true;
			else if (payload.payload < state.windowHeight - 10)
				state.mapView = false;
		},
		setLanguage: (state, payload) => {
			state.language = payload.payload;
			console.log(payload);
		},
		onResize: (state, payload) => {
			state.windowHeight = payload.payload;
		},
	},
});

export default uiSlice;

export const uiActions = uiSlice.actions;

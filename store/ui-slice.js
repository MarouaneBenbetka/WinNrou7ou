import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
	name: "ui",
	initialState: {
		navBarColor: "transparent",
		language: "English",
		mapView: false,
		windowHeight: 1000,
		scrollDisabled: false,
	},
	reducers: {
		toggleScroll: (state) => {
			state.scrollDisabled = !state.scrollDisabled;
		},
		disableScroll: (state) => {
			state.scrollDisabled = false;
		},

		scrollChanged: (state, payload) => {
			if (payload.payload > 80 && state.navBarColor !== "blur")
				state.navBarColor = "blur";
			else if (payload.payload <= 80 && state.navBarColor === "blur")
				state.navBarColor = "transparent";

			// if (payload.payload >= state.windowHeight) state.mapView = true;
			// else if (payload.payload < state.windowHeight)
			// 	state.mapView = false;
			if (
				payload.payload >= state.windowHeight / 2 &&
				state.mapView === false
			)
				state.mapView = true;
			else if (
				payload.payload < state.windowHeight / 2 &&
				state.mapView === true
			)
				state.mapView = false;
		},
		setLanguage: (state, payload) => {
			state.language = payload.payload;
		},
		onResize: (state, { payload }) => {
			if (payload.scrollOffset >= payload.windowHeight)
				state.mapView = true;
			else if (payload.scrollOffset < payload.windowHeight)
				state.mapView = false;

			state.windowHeight = payload.windowHeight;
		},
	},
});

export default uiSlice;

export const uiActions = uiSlice.actions;

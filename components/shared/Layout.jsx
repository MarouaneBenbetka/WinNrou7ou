import Head from "next/head";
import React, { Children, useEffect, useState } from "react";
import { uiActions } from "@/store/ui-slice";
import { useSelector, useDispatch } from "react-redux";

function getWindowHeight() {
	return window.innerHeight;
}

const Layout = ({ children }) => {
	const ui = useSelector((state) => state.ui);
	const dispatcher = useDispatch();

	const handleScroll = () => {
		dispatcher(uiActions.scrollChanged(window.pageYOffset));
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		// Function to update window height when resized
		dispatcher(uiActions.onResize(window.innerHeight));

		function handleResize() {
			dispatcher(uiActions.onResize(window.innerHeight));
		}

		// Event listener for window resize
		window.addEventListener("resize", handleResize);

		// Clean up the event listener
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div onScroll={handleScroll}>
			<Head>
				<title>WinNrou7ou e-tourisme</title>
			</Head>
			{children}
		</div>
	);
};

export default Layout;

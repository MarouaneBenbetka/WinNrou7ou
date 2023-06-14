import Head from "next/head";
import React, { Children, useEffect, useState } from "react";
import { uiActions } from "@/store/ui-slice";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../auth/Modal";
import ChatButton from "../chat/ChatButton";
import Chat from "../chat/Chat";

function getWindowHeight() {
	return window.innerHeight;
}

const Layout = ({ children }) => {
	const ui = useSelector((state) => state.ui);

	const dispatcher = useDispatch();

	const handleScroll = (e) => {
		if (ui.scrollDisabled) {
			e.preventDefault();
			window.scrollTo(0, window.innerHeight);
		} else {
			dispatcher(uiActions.scrollChanged(window.pageYOffset));
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [ui.scrollDisabled]);

	useEffect(() => {
		// Function to update window height when resized
		dispatcher(
			uiActions.onResize({
				windowHeight: window.innerHeight,
				scrollOffset: window.pageYOffset,
			})
		);

		function handleResize() {
			dispatcher(
				uiActions.onResize({
					windowHeight: window.innerHeight,
					scrollOffset: window.pageYOffset,
				})
			);
		}

		// Event listener for window resize
		window.addEventListener("resize", handleResize);

		// Clean up the event listener
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div
			onScroll={handleScroll}
			className="  font-poppins  w-screen max-w-[100vw]"
		>
			{children}

			<ChatButton />
		</div>
	);
};

export default Layout;

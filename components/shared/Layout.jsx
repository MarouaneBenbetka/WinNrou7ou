import Head from "next/head";
import React, { Children, useEffect, useState } from "react";
import { uiActions } from "@/store/ui-slice";
import { useSelector, useDispatch } from "react-redux";

const Layout = ({ children }) => {
	const ui = useSelector((state) => state.ui);
	const dispatcher = useDispatch();

	const handleScroll = () => {
		dispatcher(uiActions.scrollChanged(window.pageYOffset));
	};

	React.useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
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

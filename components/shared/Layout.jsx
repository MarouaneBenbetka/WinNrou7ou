import Head from "next/head";
import React, { Children, useEffect, useState } from "react";

const Layout = ({ children }) => {
	return (
		<div className="max-h-screen overflow-hidden relative w-screen max-w-screen">
			{children}
		</div>
	);
};

export default Layout;

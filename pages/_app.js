import "@/styles/globals.css";
import Layout from "../components/shared/Layout.jsx";
import Navbar from "@/components/shared/Navbar.jsx";
import store from "@/store/index.js";
import { Provider } from "react-redux";
import Head from "next/head.js";
import Modal from "@/components/auth/Modal.jsx";
import { useState } from "react";
import { SessionProvider } from 'next-auth/react'


export default function App({session,  Component, pageProps }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<SessionProvider session={session}>

		<Provider store={store}>
			<Head>
				<title>WIN e-tourisme</title>
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</Head>
			<Modal showModal={showModal} setShowModal={setShowModal} />
			<Layout>
				<Navbar setShowModal={setShowModal} />
				<Component {...pageProps} />
			</Layout>
		</Provider>
		</SessionProvider>

	);
}

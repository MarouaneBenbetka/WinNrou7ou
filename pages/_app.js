import "@/styles/globals.css";
import Layout from "../components/shared/Layout.jsx";
import Navbar from "@/components/shared/Navbar.jsx";
import store from "@/store/index.js";
import { Provider } from "react-redux";
import Head from "next/head.js";

export default function App({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Head>
				<title>WEEN e-tourisme</title>
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</Head>
			<Layout>
				<Navbar />
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}

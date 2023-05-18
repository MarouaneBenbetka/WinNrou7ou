import "@/styles/globals.css";
import Layout from "../components/shared/Layout.jsx";
import Navbar from "@/components/shared/Navbar.jsx";
import store from "@/store/index.js";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Layout>
				<Navbar />
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}

import axios from "axios";

const env = process.env.NODE_ENV;

export const BASE_URL = "http://localhost:3000";
// env == "development"
// 	? "http://localhost:3000"
// 	: "https://win-nrou7ou.vercel.app/";

export const instance = axios.create({
	baseURL: BASE_URL,
});

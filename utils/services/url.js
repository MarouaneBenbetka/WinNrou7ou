import axios from "axios";

const env = process.env.NODE_ENV;

export const BASE_URL = "https://win-nrou7ou.vercel.app/";
// env == "development"
// 	? "http://localhost:3000"
// 	: "";

export const instance = axios.create({
	baseURL: BASE_URL,
});

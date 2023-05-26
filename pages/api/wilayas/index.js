import { getEvents, getWilayas } from "@/controllers/wilayas";

export default async function handler(req, res) {
	const { method, cookies } = req;

	const token = cookies.token;
	//await dbConnect()
	// this was for mongodb connection you don't need it
	if (method === "GET") {
		return getWilayas(req, res);
	}
}

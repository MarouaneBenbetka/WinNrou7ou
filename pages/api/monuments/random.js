import { getRandomMonuments } from "@/controllers/monuments";

export default async function handler(req, res) {
	const { method } = req;
	if (method === "GET") {
		return getRandomMonuments(req, res);
	}
}

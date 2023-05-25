import { getTypes } from "@/controllers/types";

export default async function handler(req, res) {
	const { method } = req;
	if (method === "GET") {
		return getTypes(req, res);
	}
}

import Wilaya from "@/models/wilaya";

export async function getWilayas(req, res) {
	try {
		const wilayas = (await Wilaya.findAll()).map((item) => item.name);
		res.status(200).send({ wilayas });
	} catch (err) {
		res.status(500).json(err);
	}
}

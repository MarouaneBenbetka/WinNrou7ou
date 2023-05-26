import Type from "@/models/type";

export async function getTypes(req, res) {
	try {
		const types = (await Type.findAll()).map((item) => item.name);
		res.status(200).send({ types });
	} catch (err) {
		res.status(500).json(err);
	}
}

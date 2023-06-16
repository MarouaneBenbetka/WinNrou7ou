import { Op } from "sequelize";
import Content360 from "@/models/Content360";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import User from "@/models/user";
import UserTypes from "@/models/systemUserTypes";

export async function getContent360(req, res) {
	const { wilaya, q = "", page = 0, page_size = 10000 } = req.query;

	try {
		const content360 = await Content360.findAll({
			where: {
				...(wilaya && { wilaya_name: wilaya }),
				title: { [Op.like]: `%${q}%` },
			},
			limit: Number(page_size),
			offset: Number(page) * Number(page_size),
		});
		const page_limit = Math.ceil(
			(await Content360.count()) / Number(page_size)
		);
		res.status(200).send({ content360, page_limit });
	} catch (err) {
		res.status(500).json(err);
	}
}

export async function createContent360(req, res) {
	const { title, vr_link, latitude, longitude, location, image_url, wilaya } =
		req.query;
	try {
		if (
			!(
				title &
				vr_link &
				latitude &
				longitude &
				location &
				image_url &
				wilaya
			)
		) {
			return res.status(400).json({ message: "missing info" });
		}
		const session = await getServerSession(req, res, authOptions);
		if (!session) {
			return res.status(401).json({ message: "unauthorized" });
		}
		const user = await User.findOne({
			where: { email: session.user.email },
		});
		if (user.type !== UserTypes.ADMIN) {
			return res.status(401).json({ message: "unauthorized" });
		}
		const content360 = await Content360.create({
			title,
			vr_link,
			latitude,
			longitude,
			location,
			image_url,
			wilaya_name: wilaya,
		});
		res.status(200).json({ content360 });
	} catch (err) {
		res.status(500).json(err);
	}
}

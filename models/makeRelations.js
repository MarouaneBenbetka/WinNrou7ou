import User from "./user";
import Monument from "@/models/monument";
import Wilaya from "@/models/wilaya";
import Type from "@/models/type";
import MonumentTypesItem from "@/models/monumentTypesItem";
import Image from "@/models/image";
import Review from "@/models/review";
import ExternalReview from "@/models/ExternalReview";
import Event from "@/models/event";
import UserFavouriteEvent from "@/models/userFavouriteEvent";
import UserFavouriteMonument from "@/models/userFavouriteMonument";

export default function makeRelations() {
	//relation between wilaya and monument (wilaya has many monuments) (one-to-many relationship)
	Monument.belongsTo(Wilaya, { foreignKey: "wilaya_name" });
	Wilaya.hasMany(Monument, { foreignKey: "wilaya_name" });

	//relation between monument and type (monument has many types and type has many monuments) (many-to-many relationship)
	Monument.belongsToMany(Type, {
		through: MonumentTypesItem,
		foreignKey: "monument_id",
	});
	Type.belongsToMany(Monument, {
		through: MonumentTypesItem,
		foreignKey: "type",
	});

	//relation between monument and image (monument has many images) (one-to-many relationship)
	Monument.hasMany(Image);
	Image.belongsTo(Monument);

	//relation between user and monument through reviews
	User.hasMany(Review);
	Monument.hasMany(Review);

	ExternalReview.belongsTo(Monument);


	Event.belongsToMany(User,{through:UserFavouriteEvent});
	User.belongsToMany(Event,{through:UserFavouriteEvent});

	Monument.belongsToMany(User,{through:UserFavouriteMonument});
	User.belongsToMany(Monument,{through:UserFavouriteMonument});
}

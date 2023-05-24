import User from "./user";
import Monument from "@/models/monument";
import Wilaya from "@/models/wilaya";
import Type from "@/models/type";
import MonumentTypesItem from "@/models/monumentTypesItem";
import Image from "@/models/image";
import Review from "@/models/review";
import ExternalReview from "@/models/ExternalReview";


export default function makeRelations (){

    //relation between wilaya and monument (wilaya has many monuments) (one-to-many relationship)
    Monument.belongsTo(Wilaya,{foreignKey: "wilaya_name"});
    Wilaya.hasMany(Monument,{foreignKey:"wilaya_name"});


    //relation between monument and type (monument has many types and type has many monuments) (many-to-many relationship)
    Monument.belongsToMany(Type,{through:MonumentTypesItem,foreignKey:"monument_id"});
    Type.belongsToMany(Monument,{through:MonumentTypesItem,foreignKey:"type"});

    //relation between monument and image (monument has many images) (one-to-many relationship)
    Monument.hasMany(Image);
    Image.belongsTo(Monument);

    //relation between user and monument through reviews
    User.belongsToMany(Monument,{through:Review});
    Monument.belongsToMany(User,{through:Review});

    ExternalReview.belongsTo(Monument);


}
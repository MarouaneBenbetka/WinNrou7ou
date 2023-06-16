import data from "./discover_dz.json"
import content360Data from "./content360_data.json";
import Wilaya from "../models/wilaya";
import Type from "../models/type";
import Monument from "../models/monument";
import Image from "../models/image";
import Content360 from "../models/Content360";

import MonumentTypesItem from "../models/monumentTypesItem";
import makeRelations from "@/models/makeRelations";
import db from "@/utils/config/dbConnection";
import ExternalReview from "@/models/ExternalReview";


async function fillData() {
    makeRelations()
    await db.sync({force: true});
    const wilayas = [
        "Adrar",
        "Chlef",
        "Laghouat",
        "Oum El Bouaghi",
        "Batna",
        "Béjaïa",
        "Biskra",
        "Béchar",
        "Blida",
        "Bouira",
        "Tamanrasset",
        "Tébessa",
        "Tlemcen",
        "Tiaret",
        "Tizi Ouzou",
        "Alger",
        "Djelfa",
        "Jijel",
        "Sétif",
        "Saïda",
        "Skikda",
        "Sidi Bel Abbès",
        "Annaba",
        "Guelma",
        "Constantine",
        "Médéa",
        "Mostaganem",
        "M'Sila",
        "Mascara",
        "Ouargla",
        "Oran",
        "El Bayadh",
        "Illizi",
        "Bordj Bou Arreridj",
        "Boumerdès",
        "El Tarf",
        "Tindouf",
        "Tissemsilt",
        "El Oued",
        "Khenchela",
        "Souk Ahras",
        "Tipaza",
        "Mila",
        "Aïn Defla",
        "Naâma",
        "Aïn Témouchent",
        "Ghardaïa",
        "Relizane",
        "Timimoun",
        "Bordj Badji Mokhtar",
        "Ouled Djellal",
        "Béni Abbès",
        "In Salah",
        "In Guezzam",
        "Touggourt",
        "Djanet",
        "El Meghaier",
        "El Menia"
    ];
    for (const wilaya of wilayas) {
        await Wilaya.create({name: wilaya});
    }
    for (const monument of data) {
        if (!(await Wilaya.findOne({where: {name: monument.wilaya}}))) {
            await Wilaya.create({name: monument.wilaya})
        }
        const newMonument = await Monument.create({
            title: monument.title,
            summary: monument.summary,
            ...(monument.coordinates && {latitude: monument.coordinates.lat, longitude: monument.coordinates.lon}),
            rating: monument.rating,
            wilaya_name: monument.wilaya
        });
        for (const type of monument.types) {
            let newType = await Type.findOne({where: {name: type}});
            if (!newType) {
                newType = await Type.create({name: type})
            }
            await MonumentTypesItem.create({type: newType.name, monument_id: newMonument.id});
        }
        for (const url of monument.images) {
            await Image.create({url, monumentId: newMonument.id});
        }
        for (const review of monument.reviews) {
            await ExternalReview.create({...review, monumentId: newMonument.id});
        }

    }
    for (const item of content360Data) {
        await Content360.create({title: item.title,
            vr_link: item.vr_link,
            latitude: item.lat,
            longitude: item.lon,
            location : item.location,
            image_url: item.image_url,
            wilaya_name: item.wilaya
        });
    }
    return "done"
}

export default fillData



import { BsFillTelephoneFill, BsGlobe } from "react-icons/bs";
import { MdMail } from "react-icons/md";
import { RiMapPin2Fill, RiTeamLine } from "react-icons/ri";
import {
	FaFacebook,
	FaInstagram,
	FaLinkedin,
	FaTwitter,
	FaYoutube,
} from "react-icons/fa";

export const navLinks = [
	{
		id: "/",
		titleEnglish: "Home",
		titleFrench: "Accueil",
		titleSpanish: "Bienvenida",
		titleArabic: "استقبال",
	},
	{
		id: "events",
		titleEnglish: "Events",
		titleFrench: "Événements",
		titleSpanish: "Eventos",
		titleArabic: "الأحداث",
	},
	{
		id: "vr",
		titleEnglish: "360 view",
		titleFrench: "Vue 360",
		titleSpanish: "Vista 360",
		titleArabic: "360° عرض",
	},
	{
		id: "about",
		titleEnglish: "About us",
		titleFrench: "à propos",
		titleSpanish: "acerca de",
		titleArabic: "حول الصفحة",
	},
];

export const languages = [
	{
		id: 1,
		lanArabic: "العربية",
		lanEnglish: "Arabic",
		lanFrench: "Arab",
		lanSpanish: "Arábica",
		flag: "🇩🇿",
	},
	{
		id: 2,
		lanArabic: "الفرنسية",
		lanEnglish: "French",
		lanFrench: "Français",
		lanSpanish: "Francés",
		flag: "🇫🇷",
	},
	{
		id: 3,
		lanArabic: "الانجليزية",
		lanEnglish: "English",
		lanFrench: "Anglais",
		lanSpanish: "Inglés",
		flag: "🇺🇸",
	},
	{
		id: 4,
		lanArabic: "الاسبانية",
		lanEnglish: "Spanish",
		lanFrench: "Espagnol",
		lanSpanish: "Español",
		flag: "🇪🇸",
	},
];

export const heroData = {
	title1: {
		Arabic: "اكتشف الجزائر",
		French: "Explorer l'Algérie,",
		English: "Explore Algeria,",
		Spanish: "Explore Argelia,",
	},
	title2: {
		Arabic: "عش المغامرة",
		French: "vivre l'aventure",
		English: "live the adventure",
		Spanish: "vive la aventura",
	},
	summary: {
		Arabic: ".انغمس في سحر الجزائر مع وين، موقع سياحي غامر ، مصمم لإشعال فتيلك المتجول وتوفير بوابة لتجارب لا تُنسى",
		French: "Plongez dans la magie de l'Algérie avec WIN, un site web touristique immersif, conçu pour enflammer votre curiosité et vous faire vivre des expériences inoubliables.",
		English:
			"Immerse yourself in the magic of Algeria with WIN, an immersive tourism website, designed to ignite your wanderlust and provide a gateway to unforgettable experiences",
		Spanish:
			"Sumérjase en la magia de Argelia con WIN, un sitio web de turismo inmersivo, diseñado para despertar su pasión por los viajes y proporcionarle una puerta de acceso a experiencias inolvidables.",
	},
	login: {
		Arabic: "تسجيل الدخول",
		French: "login",
		English: "login",
		Spanish: "login",
	},
};

export const wilayas = [
	{ key: "Adrar", value: "Adrar" },
	{ key: "Chlef", value: "Chlef" },
	{ key: "Laghouat", value: "Laghouat" },
	{ key: "Oum El Bouaghi", value: "Oum El Bouaghi" },
	{ key: "Batna", value: "Batna" },
	{ key: "Béjaïa", value: "Béjaïa" },
	{ key: "Biskra", value: "Biskra" },
	{ key: "Béchar", value: "Béchar" },
	{ key: "Blida", value: "Blida" },
	{ key: "Bouira", value: "Bouira" },
	{ key: "Tamanrasset", value: "Tamanrasset" },
	{ key: "Tébessa", value: "Tébessa" },
	{ key: "Tlemcen", value: "Tlemcen" },
	{ key: "Tiaret", value: "Tiaret" },
	{ key: "Tizi Ouzou", value: "Tizi Ouzou" },
	{ key: "Alger", value: "Alger" },
	{ key: "Djelfa", value: "Djelfa" },
	{ key: "Jijel", value: "Jijel" },
	{ key: "Sétif", value: "Sétif" },
	{ key: "Saïda", value: "Saïda" },
	{ key: "Skikda", value: "Skikda" },
	{ key: "Sidi Bel Abbès", value: "Sidi Bel Abbès" },
	{ key: "Annaba", value: "Annaba" },
	{ key: "Guelma", value: "Guelma" },
	{ key: "Constantine", value: "Constantine" },
	{ key: "Médéa", value: "Médéa" },
	{ key: "Mostaganem", value: "Mostaganem" },
	{ key: "M'Sila", value: "M'Sila" },
	{ key: "Mascara", value: "Mascara" },
	{ key: "Ouargla", value: "Ouargla" },
	{ key: "Oran", value: "Oran" },
	{ key: "El Bayadh", value: "El Bayadh" },
	{ key: "Illizi", value: "Illizi" },
	{ key: "Bordj Bou Arreridj", value: "Bordj Bou Arreridj" },
	{ key: "Boumerdès", value: "Boumerdès" },
	{ key: "El Tarf", value: "El Tarf" },
	{ key: "Tindouf", value: "Tindouf" },
	{ key: "Tissemsilt", value: "Tissemsilt" },
	{ key: "El Oued", value: "El Oued" },
	{ key: "Khenchela", value: "Khenchela" },
	{ key: "Souk Ahras", value: "Souk Ahras" },
	{ key: "Tipaza", value: "Tipaza" },
	{ key: "Mila", value: "Mila" },
	{ key: "Aïn Defla", value: "Aïn Defla" },
	{ key: "Naâma", value: "Naâma" },
	{ key: "Aïn Témouchent", value: "Aïn Témouchent" },
	{ key: "Ghardaïa", value: "Ghardaïa" },
	{ key: "Relizane", value: "Relizane" },
	{ key: "Timimoun", value: "Timimoun" },
	{ key: "Bordj Badji Mokhtar", value: "Bordj Badji Mokhtar" },
	{ key: "Ouled Djellal", value: "Ouled Djellal" },
	{ key: "Béni Abbès", value: "Béni Abbès" },
	{ key: "In Salah", value: "In Salah" },
	{ key: "In Guezzam", value: "In Guezzam" },
	{ key: "Touggourt", value: "Touggourt" },
	{ key: "Djanet", value: "Djanet" },
	{ key: "El Meghaier", value: "El Meghaier" },
	{ key: "El Menia", value: "El Menia" },
];

export const DUMMY_SUGGESTIONS = [
	{
		id: 1,
		title: "Casbah d'Alger",
		img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/48/c3/60/20180224-122151-largejpg.jpg?w=900&h=600&s=1",
	},
	{
		id: 2,
		title: "Casbah d'Alger",
		img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/48/c3/60/20180224-122151-largejpg.jpg?w=900&h=600&s=1",
	},
	{
		id: 3,
		title: "Casbah d'Alger",
		img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/48/c3/60/20180224-122151-largejpg.jpg?w=900&h=600&s=1",
	},
	{
		id: 4,
		title: "Casbah d'Alger",
		img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/48/c3/60/20180224-122151-largejpg.jpg?w=900&h=600&s=1",
	},
	{
		id: 5,
		title: "Casbah d'Alger",
		img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/48/c3/60/20180224-122151-largejpg.jpg?w=900&h=600&s=1",
	},
	{
		id: 6,
		title: "Casbah d'Alger",
		img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/48/c3/60/20180224-122151-largejpg.jpg?w=900&h=600&s=1",
	},
];

export const contactInfos = [
	{
		href: "https://www.google.com/maps/place/Ecole+Nationale+Sup%C3%A9rieure+d'Informatique+(Higher+School+for+Computer+Science)/@36.7050299,3.1739156,15z/data=!4m5!3m4!1s0x0:0x215c157a5406653c!8m2!3d36.7050299!4d3.1739156",
		name: "Place",
		icon: <RiMapPin2Fill size={20}></RiMapPin2Fill>,
		content: "Oued Smar, Alger",
	},
	{
		href: "mailto:km_benbetka@esi.dz",
		name: "Mail",
		icon: <MdMail size={20}></MdMail>,
		content: "contact@utotech.com",
	},
	{
		href: "tel:+213666636252",
		name: "Phone",
		icon: <BsFillTelephoneFill size={20}></BsFillTelephoneFill>,
		content: "+213 667 271 665",
	},
];

export const aboutInfo = [
	{
		href: "https://uto-tech.vercel.app/",
		name: "website",
		icon: <BsGlobe size={20} />,
		content: "website",
	},
	{
		href: "mailto:schoolofai.algiers@esi.dz",
		name: "team",
		icon: <RiTeamLine size={20}></RiTeamLine>,
		content: "Our team",
	},
];

import EventCard from "@/components/events/EventCard";
import SmallEventCard from "@/components/events/SmallEventCard";
import Footer from "@/components/shared/Footer";
import { staggerContainer, textVariant } from "@/styles/motion";
import { instance } from "@/utils/services/url";
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useErrorBoundary } from "react-error-boundary";

const DUMMY_EVENTS = [
	{
		id: 1,
		title: "Algiers Choir and Friends",
		date: "10-06-2023",
		mainImage:
			"https://www.kherdja.com/images/produits/o/recital-de-chorale-algiers-choir-and-friends-a-la-basilique-notre-dame-d-afrique--62546.jpg",
		secondaryImage:
			"https://res.cloudinary.com/dus25a6ll/image/upload/v1686943527/events-images/1_a1gfew.jpg",
		latitude: 36.801097962112834,
		longitude: 3.042583161026613,
		description:
			"Algiers Choir and Friends vous donnent rendez-vous pour un récital de chorale à la Basilique Notre Dame d'Afrique, ce samedi 10 juin 2023, à partir de 19h30.\n\nCe spectacle aura lieu avec la participation de solistes d'Opéra et sous la direction musicale du maestro Zohir Mazari.\n\nEntrée libre dans la mesure des places disponibles.",
		adress: "Basilique Notre Dame d'Afrique, Alger; ",
	},
	{
		id: 2,
		title: "Hamidou en concert",
		date: "22-06-2023",
		mainImage:
			"https://res.cloudinary.com/dus25a6ll/image/upload/v1686943528/events-images/2_tblrtn.jpg",
		secondaryImage:
			"https://www.kherdja.com/images/produits/o/hamidou-en-concert-a-alger-ce-22-juin--958519.jpg",
		latitude: 36.77717328168416,
		longitude: 3.0530056767387146,
		description:
			"Hamidou en concert au Théatre de Verdure Ladi Flici à Alger, le 22 juin 2023 !\n\nHamidou, un artiste très apprécié par le public algérien, donne rendez-vous à son public algérois, le jeudi 22 juin à venir, pour un concert exceptionnel, au Théatre de Verdure Ladi Flici (plus bas que l'hotel l'Aurassi), à partir de 19 heures.\n\nPrix des tickets : 1500 DA (en prévente à partir du 13 juin aux guichets de la salle Ibn Khaldoun et du Théatre de verdure)",
		adress: "Théâtre de Verdure Ladi Flici, plus bas que l'hôtel l'Aurassi; ",
	},

	{
		id: 3,
		title: "Abdelkader Chaou et Lamia",
		date: "09-06-2023",
		mainImage:
			"https://www.kherdja.com/images/produits/o/abdelkader-chaou-et-lamia--62221.jpg",
		secondaryImage: "",
		latitude: 36.7742457030341,
		longitude: 3.0571203775200164,
		description:
			"Un spectacle inoubliable en perspective : 'Ferha w Zahwa' avec Abdelkader Chaou et Lamia !\n\nMarquez vos agendas pour assister à un concert exceptionnel le 09 juin à partir de 19h, qui se déroulera à la prestigieuse salle Ibn Khaldoun à Alger. Laissez-vous transporter par la voix envoûtante d'Abdelkader Chaou, un artiste élégant qui maîtrise l'art de toucher nos cœurs avec ses chansons tristes ou gaies. Sa musique, empreinte de la tradition ibérique, crée une ambiance festive et ne manque pas de faire vibrer nos hanches au rythme de ses mélodies.\n\nEt ce n'est pas tout ! La soirée sera également marquée par la présence de Lamia Ait Amara, une étoile montante de la musique andalouse. Dès l'âge de 4 ans, elle a commencé à interpréter des chansons en s'accompagnant de plusieurs instruments traditionnels tels que le rebab, le luth, la mandoline et le violon. Son talent exceptionnel et sa passion contagieuse pour la musique promettent de captiver le public et de créer une atmosphère enchanteresse.",
		adress: "Salle Ibn Khaldoun à Alger",
	},
	{
		id: 4,
		title: "Mis Raíces",
		date: "01-06-2023",
		mainImage:
			"https://res.cloudinary.com/dus25a6ll/image/upload/v1686943531/events-images/4_x1grgq.jpg",
		secondaryImage:
			"https://www.kherdja.com/images/produits/320/la-mezzosoprano-ana-hasler-et-le-pianiste-david-casanova-en-concert-a-la-basilique-notre-dame-d-afrique-d-alger--744437.jpg",
		latitude: 36.801097962112834,
		longitude: 3.042583161026613,
		description:
			"Un spectacle inoubliable en perspective : 'Ferha w Zahwa' avec Abdelkader Chaou et Lamia !\n\nMarquez vos agendas pour assister à un concert exceptionnel le 09 juin à partir de 19h, qui se déroulera à la prestigieuse salle Ibn Khaldoun à Alger. Laissez-vous transporter par la voix envoûtante d'Abdelkader Chaou, un artiste élégant qui maîtrise l'art de toucher nos cœurs avec ses chansons tristes ou gaies. Sa musique, empreinte de la tradition ibérique, crée une ambiance festive et ne manque pas de faire vibrer nos hanches au rythme de ses mélodies.\n\nEt ce n'est pas tout ! La soirée sera également marquée par la présence de Lamia Ait Amara, une étoile montante de la musique andalouse. Dès l'âge de 4 ans, elle a commencé à interpréter des chansons en s'accompagnant de plusieurs instruments traditionnels tels que le rebab, le luth, la mandoline et le violon. Son talent exceptionnel et sa passion contagieuse pour la musique promettent de captiver le public et de créer une atmosphère enchanteresse.",
		adress: "La prestigieuse basilique Notre-Dame d'Afrique à Alger.",
	},
	{
		id: 5,
		title: "Nawel Mebarek en concert",
		date: "26-05-2023",
		mainImage:
			"https://res.cloudinary.com/dus25a6ll/image/upload/v1686943531/events-images/5_whaoco.jpg",
		secondaryImage:
			"https://www.kherdja.com/images/produits/320/nawel-mebarek-en-concert-a-alger--314774.jpg",
		latitude: 36.801097962112834,
		longitude: 3.042583161026613,
		description:
			"Le 26 mai, Nawel Mebarek, chanteuse et auteure-compositrice, donnera un concert intitulé 'Good Vibes' à partir de 19h à la salle Ibn Zeydoun (Riadh El Feth) à Alger.\n\nNawel Mebarek est passionnée de musique depuis son jeune âge et a sorti son premier album intitulé 'Lemrassem' en septembre 2014. L'album a rencontré un grand succès, ce qui lui a valu d'être nominée dans la catégorie 'Album de l'année' lors des 'Algerian Music Awards 2015'.\n\nLe prix du billet pour le concert est fixé à 800 DA.",
		adress: "La prestigieuse basilique Notre-Dame d'Afrique à Alger.",
	},
	{
		id: 6,
		title: "Le 1er Salon  des Établissements de la Petite Enfance",
		date: "03-06-2023",
		mainImage:
			"https://www.kherdja.com/images/produits/o/le-1er-salon-algerien-des-etablissements-de-la-petite-enfance--235670.jpg",
		secondaryImage:
			"https://res.cloudinary.com/dus25a6ll/image/upload/v1686943527/events-images/6_b65vod.jpg",
		latitude: 35.726290133989075,
		longitude: -0.5950214683059065,
		description:
			"Du 1er au 3 juin 2023, l'École Supérieure d'Hôtellerie et de Restauration d'Alger (ESHRA) Ain Benian accueille un salon dédié aux tout-petits et à leurs établissements, offrant un programme d'animation captivant pour les enfants et des ateliers de sensibilisation pour le personnel des crèches et les mamans.\n\nLe SAPEC vise à réunir les acteurs clés du secteur de la petite enfance en Algérie et à promouvoir le développement optimal des enfants dès leur plus jeune âge. Cet événement sans précédent offrira un programme d'animation riche en activités pour divertir et éduquer les enfants présents, ainsi que des ateliers de sensibilisation destinés au personnel travaillant dans les crèches et aux mamans.\n\nle 1er Salon Algérien des Établissements de la Petite Enfance est un événement essentiel pour les professionnels de la petite enfance, les parents et tous ceux qui s'intéressent au bien-être et à l'éducation des tout-petits. Avec un programme d'animation passionnant pour les enfants et des ateliers de sensibilisation enrichissants .",
		adress: " l'École Supérieure d'Hôtellerie et de Restauration d'Alger (ESHRA) Ain Benian",
	},
];

const Events = ({ events, status }) => {
	const nextSectionRef = useRef();
	const { showBoundary } = useErrorBoundary();

	useEffect(() => {
		if (status != "ok") showBoundary(status);
	}, [status, showBoundary]);

	return (
		<div className="bg-white">
			<motion.section
				className="relative  h-screen w-screen bg-events bg-cover "
				variants={staggerContainer}
				initial="hidden"
				whileInView="show"
			>
				<div className="absolute inset-0  bg-[#0B1723] opacity-50 z-10"></div>
				<div className="relative  h-screen w-full flex flex-col items-center justify-center z-40">
					<motion.h1
						className="text-4xl md:text-6xl pb-2  font-bold "
						variants={textVariant(0.4)}
					>
						Algerian Events
					</motion.h1>
					<motion.p
						className="mx-5 md:mx-[20vw] text-center text-lg md:text-xl mt-6"
						variants={textVariant(0.6)}
					>
						Step into the Soul of Algeria: An Enchanting Cultural
						Experience
					</motion.p>
					<motion.div
						className="floatAnimation absolute bottom-4 cursor-pointer"
						variants={textVariant(0.8)}
						onClick={() =>
							nextSectionRef.current.scrollIntoView({
								behavior: "smooth",
							})
						}
					>
						<Image
							src={"/images/scroll.svg"}
							alt=""
							width={28}
							height={28}
						/>
					</motion.div>
				</div>
			</motion.section>
			<section
				ref={nextSectionRef}
				className="min-h-screen w-screen flex  items-center flex-col pt-[150px] relative"
			>
				<div className="relative">
					<h1 className="text-dark font-bold text-5xl relative z-10 before:content-[''] before:h-5 before:bg-blue before:w-full before:absolute before:bottom-0 before:left-0 before:-z-10">
						Soon
					</h1>
				</div>
				<div className="w-[105vw] h-[320px]  absolute top-0 left-0 ">
					<Image
						src={"/images/asset.png"}
						alt=""
						fill
						className="object-fill"
					/>
				</div>
				<div className=" px-10 flex justify-center items-center">
					<div className="  flex mmmd:block  mmd:carousel mmmd:carousel-start   mt-7 mmd:w-[100vw]   py-4 px-6">
						{events.slice(0, 3).map((event) => (
							<EventCard
								key={event.id}
								id={event.id}
								title={event.title}
								date={event.date.split("T")[0]}
								image={event.main_image_url}
							/>
						))}
					</div>
				</div>
			</section>
			<section className="min-h-screen w-screen flex  items-center flex-col pt-[150px] relative">
				<div className="relative">
					<h1 className="text-dark font-bold text-5xl relative z-10 before:content-[''] before:h-5 before:bg-blue before:w-full before:absolute before:bottom-0 before:left-0 before:-z-10">
						Events
					</h1>
				</div>
				<div className="w-[45vw] h-[230px]  absolute top-0 right-0 ">
					<Image
						src={"/images/asset2.png"}
						alt=""
						fill
						className="object-fill"
					/>
				</div>
				<div className=" hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3   gap-6 mt-8 mb-14 ">
					{events.map((event) => (
						<SmallEventCard
							id={event.id}
							key={event.id}
							title={event.title}
							date={event.date.split("T")[0]}
							image={event.main_image_url}
						/>
					))}
				</div>
				<div className="    md:hidden  carousel carousel-start   mt-7 w-[100vw]   py-4 px-6 mb-8">
					{DUMMY_EVENTS.map((event) => (
						<EventCard
							key={event.id}
							title={event.title}
							date={event.date.split("T")[0]}
							image={event.main_image_url}
						/>
					))}
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default Events;

export async function getServerSideProps() {
	try {
		const res = await instance.get("/api/events");
		console.log(res.data.events);
		return {
			props: {
				events: res?.data.events,
				status: "ok",
			},
		};
	} catch (e) {
		console.log(e.message);
		return {
			props: {
				events: null,
				status: "error",
			},
		};
	}
}

import VrBg from "@/components/vr/VrBg";
import { motion } from "framer-motion";
import { staggerContainer, textVariant } from "../styles/motion";
import Image from "next/image";
import { useRef, useState } from "react";
import SearchBar from "@/components/vr/SearchBar";
import { Map } from "react-algeria-map";
import VrModal from "@/components/vr/modal/VrModal";
import { wilayas } from "@/data/data";
import Footer from "@/components/shared/Footer";

const data = {
	Adrar: 0,
	Alger: 15,
	Annaba: 22,
	"Aïn Defla": 43,
	"Aïn Témouchent": 45,
	Batna: 4,
	Biskra: 6,
	Blida: 8,
	"Bordj Badji Mokhtar": 49,
	"Bordj Bou Arreridj": 33,
	Bouira: 9,
	Boumerdès: 34,
	Béchar: 7,
	Béjaïa: 5,
	"Béni Abbès": 51,
	Chlef: 1,
	Constantine: 24,
	Djanet: 55,
	Djelfa: 16,
	"El Bayadh": 31,
	"El Meghaier": 56,
	"El Menia": 57,
	"El Oued": 38,
	"El Tarf": 35,
	Ghardaïa: 46,
	Guelma: 23,
	Illizi: 32,
	"In Guezzam": 53,
	"In Salah": 52,
	Jijel: 17,
	Khenchela: 39,
	Laghouat: 2,
	"M'Sila": 27,
	Mascara: 28,
	Mila: 42,
	Mostaganem: 26,
	Médéa: 25,
	Naâma: 44,
	Oran: 30,
	Ouargla: 29,
	"Ouled Djellal": 50,
	"Oum El Bouaghi": 3,
	Relizane: 47,
	Saïda: 19,
	"Sidi Bel Abbès": 21,
	Skikda: 20,
	"Souk Ahras": 40,
	Sétif: 18,
	Tamanrasset: 10,
	Tiaret: 13,
	Timimoun: 48,
	Tindouf: 36,
	Tipaza: 41,
	Tissemsilt: 37,
	"Tizi Ouzou": 14,
	Tlemcen: 12,
	Touggourt: 54,
	Tébessa: 11,
};

const Vr = () => {
	const nextSectionRef = useRef();
	const [wilaya, setWilaya] = useState("");
	const [showModal, setShowModal] = useState(false);
	return (
		<section>
			<VrBg />
			<motion.div
				className="snap-start h-screen pt-20 flex items-center justify-center flex-col text-white relative z-30"
				variants={staggerContainer}
				initial="hidden"
				whileInView="show"
			>
				<motion.h2
					className="hidden md:block text-center text-3xl relative z-1 sm:text-4xl  xmd:text-5xl xl:text-6xl font-semibold before:content-['']  before:h-5 before:bg-blue before:w-full before:absolute before:bottom-0 before:left-0 before:-z-10"
					variants={textVariant(0.4)}
					initial="hidden"
					animate="show"
				>
					Take a virtual tour of Algeria&apos;s cities,
				</motion.h2>
				<motion.h2
					className="block md:hidden text-center text-3xl relative z-1 md:text-5xl xl:text-6xl font-semibold "
					variants={textVariant(0.4)}
					initial="hidden"
					animate="show"
				>
					Take a virtual tour of,
				</motion.h2>
				<motion.h2
					className="block md:hidden text-center text-3xl relative z-1 md:text-6xl font-semibold before:content-['']  before:h-5 before:bg-blue before:w-full before:absolute before:bottom-0 before:left-0 before:-z-10"
					variants={textVariant(0.4)}
					initial="hidden"
					animate="show"
				>
					Algeria&apos;s cities,
				</motion.h2>
				<motion.h1
					className="text-2xl md:text-4xl  xmd:text-5xl xl:text-5xl pb-2  font-medium mt-3"
					variants={textVariant(0.6)}
					initial="hidden"
					animate="show"
				>
					where beauty knows no bounds
				</motion.h1>
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
			</motion.div>
			<section
				ref={nextSectionRef}
				className="min-h-screen w-full flex  items-center flex-col bg-white pt-10 md:pt-[80px] relative"
			>
				<div
					className="w-screen min-h-screen absolute top-0 left-0  bg-transparent"
					onClick={() => setShowModal(false)}
				/>
				<div className="relative mb-6">
					<h1 className="bg-white text-center text-dark font-bold hidden md:block md:text-3xl lg:text-5xl relative z-10 before:content-[''] before:h-5 before:bg-blue before:w-full before:absolute before:bottom-0 before:left-0 before:-z-10">
						select a city and enjoy a 360° view
					</h1>
					<h1 className="bg-white text-center text-dark font-bold block md:hidden text-2xl relative z-10 ">
						select a city
					</h1>
					<h1 className="bg-white text-center text-dark font-bold block md:hidden text-2xl relative z-10 before:content-[''] before:h-5 before:bg-blue before:w-full before:absolute before:bottom-0 before:left-0 before:-z-10">
						enjoy a 360° view
					</h1>
				</div>
				<div className="hidden md:block md:w-[250px] lg:w-[calc(40px+20vw)] h-[130px] lg:h-[150px]  absolute top-0 left-0 ">
					<Image
						src={"/images/vr_h1_shapes.png"}
						alt=""
						fill
						className="object-fill"
					/>
				</div>
				<SearchBar
					setWilaya={setWilaya}
					openModal={() => setShowModal(true)}
				/>
				<div className="relative z-10">
					<Map
						className="relaive z-10"
						color="#069ADF"
						HoverColor="#1e739a"
						stroke="#fff"
						hoverStroke="#17475e"
						height="500px"
						width="500px"
						data={data}
						onWilayaClick={(wilaya, data) => {
							console.log(wilaya, data);
							setShowModal(true);
							setWilaya(wilayas[data].key);
						}}
					/>
				</div>
				{showModal && (
					<VrModal
						wilaya={wilaya}
						closeModal={() => setShowModal(false)}
					/>
				)}
			</section>
			<Footer />
		</section>
	);
};

export default Vr;

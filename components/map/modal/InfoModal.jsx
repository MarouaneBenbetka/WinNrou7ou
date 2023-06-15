import { Carousel } from "@mantine/carousel";
import { rem } from "@mantine/core";
import Image from "next/image";
import RowInfo from "./RowInfo";
import { GoLocation } from "react-icons/go";
import { CiGrid41, CiFaceSmile } from "react-icons/ci";
import { RxClock } from "react-icons/rx";
import { FiBookOpen } from "react-icons/fi";
import Ratting from "./Ratting";
import { MdExpandMore } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Review from "./Review";
import axios from "axios";
import ModalSkelton from "./ModalSkelton";
import ErrorLoading from "./ErrorLoading";

const InfoModal = ({ id, closeModal }) => {
	const [expandHistory, setExpandHistory] = useState(false);
	const [expandReviews, setExpandReviews] = useState(false);
	const [modalData, setModalData] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchMarkers = async () => {
			setLoading(true);
			setError(false);
			try {
				const res = await axios.get(
					`http://localhost:3000/api/monuments/${id}`
				);
				setModalData(res.data.monument);
				setLoading(false);
			} catch (e) {
				console.log(e);
				setLoading(false);
				setError(true);
			}
		};
		fetchMarkers();
	}, [id]);

	return (
		<motion.div
			className="mantine-carousel bg-white shadow-md h-[calc(96vh-130px)] py-5 px-2 w-[360px] rounded-3xl absolute left-4 top-28 z-50 overflow-y-scroll"
			initial={{ x: "-400px" }}
			animate={{ x: 0 }}
			transition={{ type: "spring", stiffness: 105 }}
			exit={{ x: "-400px" }}
		>
			{loading ? (
				<ModalSkelton />
			) : error ? (
				<ErrorLoading closeModal={closeModal} />
			) : (
				<>
					<h1 className="text-blue text-center font-semibold text-2xl px-2">
						{modalData.title}
					</h1>
					<h3 className="text-green font-medium text-lg text-center py-2">
						open
					</h3>
					{modalData.images.length > 0 ? (
						<Carousel
							maw={300}
							mx="auto"
							withIndicators
							height={200}
							className="rounded-xl  overflow-hidden "
							styles={{
								indicator: {
									width: rem(12),
									height: rem(4),
									transition: "width 250ms ease",

									"&[data-active]": {
										width: rem(40),
									},
								},
							}}
						>
							{modalData.images.map((img, index) => (
								<Carousel.Slide key={index}>
									<Image src={img} alt="" fill />
								</Carousel.Slide>
							))}
						</Carousel>
					) : (
						<div className="w-[300px] h-[200px] relative rounded-xl  overflow-hidden mx-auto">
							<Image
								src={"/images/placeholder.png"}
								alt=""
								fill
								className="opacity-50"
							/>
						</div>
					)}
					<div className="mt-4 ml-10 mr-5">
						<RowInfo>
							<GoLocation size={28} className="text-orange" />
							<p className="text-dark">{modalData.wilaya}</p>
						</RowInfo>
						<RowInfo>
							<CiGrid41 size={28} className="text-orange" />
							<p className="text-dark">{modalData.type}</p>
						</RowInfo>

						<RowInfo>
							<RxClock size={28} className="text-orange" />
							<p className="text-dark">Today 09:00–17:00</p>
						</RowInfo>

						<RowInfo>
							<FiBookOpen size={28} className="text-orange" />
							<p className="text-dark ">History</p>
							<MdExpandMore
								size={24}
								className={
									"text-dark ml-auto mr-6 cursor-pointer   transition  " +
									(expandHistory ? "rotate-180" : "")
								}
								onClick={() =>
									setExpandHistory((prev) => !prev)
								}
							/>
						</RowInfo>
						{/* truncate overflow-ellipsis max-w-[200px] */}
						{expandHistory && (
							<p
								className=" pr-2  text-gray-500 text-sm text-justify mb-4 cursor-pointer"
								onClick={() => setExpandHistory(false)}
							>
								{modalData.summary}
							</p>
						)}
						<RowInfo>
							<FaRegCommentDots
								size={28}
								className="text-orange"
							/>
							<p className="text-dark ">Reviews</p>
							<MdExpandMore
								size={24}
								className={
									"text-dark ml-auto mr-6 cursor-pointer   transition  " +
									(expandReviews ? "rotate-180" : "")
								}
								onClick={() =>
									setExpandReviews((prev) => !prev)
								}
							/>
						</RowInfo>

						{expandReviews && (
							<>
								<div>
									<input type="text" />
								</div>
								<div className="ml-2 mt-4">
									{modalData.reviews.map((item, index) => (
										<Review
											key={index}
											sender={item.sender}
											image={item.sender_image}
											comment={item.comment}
										/>
									))}
								</div>
							</>
						)}
						<div className="flex justify-center">
							<Ratting num={modalData.rating} />
						</div>
					</div>
				</>
			)}
		</motion.div>
	);
};

export default InfoModal;

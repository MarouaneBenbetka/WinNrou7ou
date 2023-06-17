import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ModalSkelton from "@/components/map/modal/ModalSkelton";
import ErrorLoading from "@/components/map/modal/ErrorLoading";
import ImageCard from "./ImageCard";
import NoData from "./NoData";
import { instance } from "@/utils/services/url";

const VrModal = ({ wilaya, closeModal }) => {
	const [modalData, setModalData] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchMarkers = async () => {
			setLoading(true);
			setError(false);
			try {
				const res = await instance.get(
					`/api/content360?wilaya=${wilaya}`
				);
				setModalData(res.data.content360);
				console.log(res.data.content360);
				setLoading(false);
			} catch (e) {
				console.log(e);
				setLoading(false);
				setError(true);
			}
		};
		fetchMarkers();
	}, [wilaya]);

	return (
		<motion.div
			className=" bg-white shadow-md h-[calc(96vh-130px)] py-5 px-2 w-[360px] rounded-3xl absolute left-4 top-28 z-50 overflow-y-scroll"
			initial={{ x: "-400px" }}
			animate={{ x: 0 }}
			transition={{ type: "spring", stiffness: 105 }}
			exit={{ x: "-400px" }}
		>
			{loading ? (
				<ModalSkelton />
			) : error ? (
				<ErrorLoading closeModal={closeModal} />
			) : modalData?.length === 0 ? (
				<NoData closeModal={closeModal} />
			) : (
				<>
					<h1 className="text-blue text-center font-semibold text-2xl px-2">
						{wilaya}
					</h1>
					<div className="flex flex-col gap-3">
						{modalData.map((item) => {
							return (
								<ImageCard
									key={item.id}
									title={item.title}
									link={item.vr_link}
									img={item.image_url}
								/>
							);
						})}
					</div>
				</>
			)}
		</motion.div>
	);
};

export default VrModal;

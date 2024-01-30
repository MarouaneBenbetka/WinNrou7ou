import AddMonument from "@/components/admin/AddMonument";
import MonumentModal from "@/components/admin/MonumentModal";
import InfoModal from "@/components/map/modal/InfoModal";
import { instance } from "@/utils/services/url";
import { getSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { AiOutlinePlus } from "react-icons/ai";
import { BsSearch, BsTrash3 } from "react-icons/bs";
import { FiEdit2, FiEdit3 } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";

const Monuments = ({ monuments, status }) => {
	const { showBoundary } = useErrorBoundary();
	const [lieux, setLieux] = useState(monuments);
	const inputRef = useRef();
	const [modalId, setModalId] = useState(1);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		if (status != "ok") showBoundary(status);
	}, [status, showBoundary]);

	const searchHandler = async (e) => {
		e.preventDefault();
		try {
			const res = await instance.get(
				`/api/monuments?q=${inputRef.current.value}`
			);

			setLieux(res.data.monuments);
		} catch (e) {
			console.log(e.message);
		}
	};
	const deleteHandler = (id) => {
		console.log(id);
		setLieux((prev) => prev.filter((item) => item.id !== id));
	};
	return (
		<section className="h-screen bg-white pl-44 pt-11">
			<h1 className="font-bold text-4xl text-dark">Lieux</h1>
			<div className="flex mt-6 gap-10">
				<div
					className="bg-green flex w-fit text-dark items-center gap-4 py-2 px-3 rounded-lg  cursor-pointer"
					onClick={() => setShowModal(true)}
				>
					<AiOutlinePlus size={22} className="text-dark" />
					<h2>Ajouter un lieu</h2>
				</div>
				<form className="w-[400px] relative" onSubmit={searchHandler}>
					<input
						className=" bg-white hover:bg-white hover:border-blue w-full text-dark px-4 py-2 border-2 border-blue focus:outline-none rounded-2xl"
						type="text"
						placeholder="Rechercher un lieu ..."
						ref={inputRef}
					/>
					<BsSearch
						size={26}
						className="text-blue absolute right-3 top-2 cursor-pointer"
						onClick={searchHandler}
					/>
				</form>
			</div>
			<div>
				<div className="mt-10 mr-[400px] overflow-x-auto">
					<div className="flex gap-5">
						<h2 className="w-[300px] text-center text-gray-500">
							Nom du lieu
						</h2>
						<h2 className="w-[200px] text-center text-gray-500">
							Date d&apos;ajout
						</h2>
						<h2 className="w-[100px] text-center text-gray-500">
							Consultation
						</h2>
					</div>
					<div className="max-h-[calc(100vh-240px)] overflow-y-auto w-fit pr-6">
						{lieux.map((item) => (
							<div
								className="flex gap-5 py-6 border-b border-gray-300 items-center w-fit"
								key={item.id}
							>
								<p
									className="w-[300px]  text-dark font-semibold truncate hover:underline cursor-pointer"
									onClick={() => setModalId(item.id)}
								>
									{item.title}
								</p>
								<p className="w-[200px] text-center text-dark">
									2023-10-02
								</p>
								<p className="w-[100px] text-center text-dark border border-orange rounded-lg py-1">
									12
								</p>
								<div className="ml-5 flex gap-6 ">
									<FiEdit2 size={26} className="text-green" />
									<BsTrash3
										size={24}
										className="text-gray-500 cursor-pointer"
										onClick={() => deleteHandler(item.id)}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
				<MonumentModal id={modalId} closeModal={() => setModalId(1)} />
			</div>
			<AddMonument showModal={showModal} setShowModal={setShowModal} />
		</section>
	);
};

export default Monuments;

export async function getServerSideProps({ req }) {
	try {
		const session = await getSession({ req });

		if (session?.user?.type != "ADMIN") {
			return {
				redirect: {
					destination: "/",
					permanent: false,
				},
			};
		}
	} catch {
		console.log("error");
	}

	try {
		const res = await instance.get("/api/monuments");
		console.log(res);
		return {
			props: {
				monuments: res?.data.monuments,
				status: "ok",
			},
		};
	} catch (e) {
		console.log(e.message);
		return {
			props: {
				monuments: null,
				status: "error",
			},
		};
	}
}

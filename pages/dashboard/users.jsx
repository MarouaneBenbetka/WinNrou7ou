import MonumentModal from "@/components/admin/MonumentModal";
import InfoModal from "@/components/map/modal/InfoModal";
import { instance } from "@/utils/services/url";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { AiOutlinePlus } from "react-icons/ai";
import { BsSearch, BsTrash3 } from "react-icons/bs";
import { FiEdit2, FiEdit3 } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";

const Users = ({ users, status }) => {
	const { showBoundary } = useErrorBoundary();
	const [data, setData] = useState(users);
	const inputRef = useRef();

	useEffect(() => {
		if (status != "ok") showBoundary(status);
	}, [status, showBoundary]);

	const searchHandler = async (e) => {
		e.preventDefault();
		try {
			const res = await instance.get(
				`/api/users?q=${inputRef.current.value}`
			);

			setData(res.data.users);
		} catch (e) {
			console.log(e.message);
		}
	};
	const deleteHandler = (id) => {
		console.log(id);
		setData((prev) => prev.filter((item) => item.id !== id));
	};
	return (
		<section className="h-screen bg-white pl-44 pt-11">
			<h1 className="font-bold text-4xl text-dark">Utilisateurs</h1>
			<div className="flex mt-6 gap-10">
				<div className="bg-green flex w-fit text-dark items-center gap-4 py-2 px-3 rounded-lg  cursor-pointer">
					<AiOutlinePlus size={22} className="text-dark" />
					<h2>Ajouter un utilisateur</h2>
				</div>
				<form className="w-[400px] relative" onSubmit={searchHandler}>
					<input
						className=" bg-white hover:bg-white hover:border-blue w-full text-dark px-4 py-2 border-2 border-blue focus:outline-none rounded-2xl"
						type="text"
						placeholder="Rechercher un utilisateur ..."
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
						<h2 className="w-[40px]"></h2>
						<h2 className="w-[200px] text-center text-gray-500 ml-7">
							Nom et prénom
						</h2>
						<h2 className="w-[200px] text-center text-gray-500">
							Date d’inscription
						</h2>
						<h2 className="w-[100px] text-center text-gray-500">
							Consultation
						</h2>
					</div>
					<div className="max-h-[calc(100vh-240px)] overflow-y-auto w-fit pr-6">
						{data.map((item) => (
							<div
								className="flex gap-5 py-6 border-b border-gray-300 items-center w-fit"
								key={item.id}
							>
								<div className="w-[40px] h-[40px] relative rounded-full overflow-hidden">
									<Image
										src={
											item.image ||
											"/images/user-placeholder.png"
										}
										alt="img"
										fill
										className="object-cover object-center"
									/>
								</div>
								<div className="w-[200px] ml-7 ">
									<p className=" text-dark font-semibold truncate hover:underline cursor-pointer text-center">
										{item.name}
									</p>
									<h4 className="text-gray-400 text-sm text-center">
										{item.email}
									</h4>
								</div>

								<p className="w-[200px] text-center text-dark">
									2023-10-02
								</p>
								<p className="w-[100px] text-center text-dark border border-orange rounded-lg py-1">
									12
								</p>
								<div className="ml-5 flex gap-6 ">
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
			</div>
		</section>
	);
};

export default Users;

export async function getServerSideProps() {
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
		const res = await instance.get("/api/users", { withCredentials: true });
		console.log(res);
		return {
			props: {
				users: res?.data.users,
				status: "ok",
			},
		};
	} catch (e) {
		console.log(e.message);
		return {
			props: {
				users: null,
				status: "error",
			},
		};
	}
}

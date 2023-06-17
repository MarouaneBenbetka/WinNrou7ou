import Image from "next/image";
import styles from "../../styles/navbar.module.css";
import { navAdminData } from "@/data/data";
import Link from "next/link";
import { IoMdNotificationsOutline } from "react-icons/io";
const AdminNavbar = ({ image, name }) => {
	return (
		<>
			<div
				className={
					"fixed top-0 bottom-0 my-auto left-3 h-[90vh] min-h-[200px] w-[84px]  z-50 rounded-full flex flex-col items-center " +
					styles.nav
				}
			>
				<div className="bg-white mt-2 rounded-t-full rounded-bl-full w-[70px] ">
					<div className="w-[70px] h-[100px] relative mt-3">
						<Image
							src={"/images/logo_name.png"}
							alt=""
							fill
							className="object-contain"
						/>
					</div>
				</div>
				<div className="flex flex-col gap-4 mt-4 ">
					{navAdminData.map((item) => (
						<Link
							key={item.id}
							className="text-white rounded-l-full hover:bg-white hover:text-blue px-6 py-2 transition-all ease-in-out cursor-pointer"
							href={item.id}
						>
							{item.icon}
						</Link>
					))}
				</div>
			</div>
			<div className="flex items-center gap-2 cursor-pointer fixed top-4 right-6">
				<h1 className="text-dark text-xl">{name}</h1>
				<div className="w-[48px] h-[48px]  rounded-full overflow-hidden relative border-2 border-blue">
					<Image
						src={image || "/images/user-placeholder.png"}
						alt=""
						fill
					/>
				</div>
			</div>
		</>
	);
};

export default AdminNavbar;

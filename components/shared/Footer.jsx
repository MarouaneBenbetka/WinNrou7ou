import { aboutInfo, contactInfos, socials } from "@/data/data";
import Image from "next/image";

const Footer = () => {
	return (
		<footer id="footer" className="  bg-dark text-white">
			<div className="bottom-0 z-10  w-full  px-2 md:px-10 pt-16">
				<div className="flex flex-col sm:flex-row justify-between mx-16 md:mx-28 mb-5">
					{/* contact */}
					<div className="hidden md:block">
						<Image
							width={80}
							height={160}
							src={"/images/logo_name.png"}
							alt="logo.png"
						/>
					</div>
					<div className="mb-16 flex flex-col  sm:m-0">
						<div className="pb-4 text-xl md:text-3xl font-semibold">
							About us
						</div>
						<div className="flex flex-col gap-y-4 font-medium pl-4">
							{aboutInfo.map((info, i) => (
								<a
									href={info.href}
									key={i}
									className="flex items-center gap-x-4 text-sm"
									target="_blank"
									rel="noreferrer"
								>
									<div className="flex items-center justify-center">
										{info.icon}
									</div>
									<div className="">{info.content}</div>
								</a>
							))}
						</div>
					</div>
					<div className="mb-16 flex flex-col  sm:m-0">
						<div className="pb-4 text-xl md:text-3xl font-semibold">
							Contact us
						</div>
						<div className="flex flex-col gap-y-4 font-medium pl-4">
							{contactInfos.map((info, i) => (
								<a
									href={info.href}
									key={i}
									className="flex items-center gap-x-4 text-sm"
									target="_blank"
									rel="noreferrer"
								>
									<div className="flex items-center justify-center">
										{info.icon}
									</div>
									<div className="">{info.content}</div>
								</a>
							))}
						</div>
					</div>
				</div>
			</div>
			<h5 className="bottom-0 px-2 pb-2 text-center text-[14px] md:text-[18px] ">
				© 2023 UtoTech . All rights reserved.
			</h5>
		</footer>
	);
};

export default Footer;

import BgSignUp from "@/components/auth/BgSignUp";
import Image from "next/image";
import { MdOutlineNavigateBefore } from "react-icons/md";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import SignUpForm from "@/components/auth/SignUpFrom";

const Signup = () => {
	return (
		<section className="min-h-screen relative bg-orange bg-signup bg-cover pb-5">
			<BgSignUp />
			<div className="min-h-screen relative z-40 flex mx-[15vw] items-center justify-between md:flex-row flex-col">
				<SignUpForm />
				<div className="md:block hidden">
					<Image
						width={140}
						height={200}
						src={"/images/logo_name.png"}
						alt="logo.png"
					/>
				</div>
			</div>
		</section>
	);
};

export default Signup;

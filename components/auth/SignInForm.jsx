import { Form, Formik } from "formik";
import CustomInput from "./CustomInput";
import { Schema } from "./Schema";
import Image from "next/image";
import Link from "next/link";

const SignInForm = ({ closeModal }) => {
	// for sign in with email and password
	const onSubmit = async (values, actions) => {
		actions.resetForm();
		closeModal();
	};
	// for google auth
	const googleAuth = () => {};
	return (
		<Formik
			initialValues={{ email: "", password: "" }}
			validationSchema={Schema}
			onSubmit={onSubmit}
		>
			{({ isSubmitting }) => (
				<Form>
					<div className="relative p-8 flex flex-col justify-start items-center pt-16 w-[75vw] md:w-[490px] h-[480px]">
						<div className="absolute top-0 left-0 hidden md:block md:w-[200px] h-[100px]">
							<Image
								src={"/images/modal-top.png"}
								fill
								alt=""
								className="object-cover"
							/>
						</div>

						<div className="absolute hidden md:block bottom-0 right-0 w-[160px] h-[100px]">
							<Image
								src={"/images/modal-bottom.png"}
								fill
								alt=""
								className="object-cover"
							/>
						</div>

						<Image
							src={"/images/logo_name.png"}
							alt=""
							width={60}
							height={50}
						/>
						<CustomInput
							label="Email"
							name="email"
							type="text"
							placeholder="Enter your email"
						/>
						<CustomInput
							label="Password"
							name="password"
							type="password"
							placeholder="Enter your password"
						/>
						<div className="flex justify-center items-center mt-7">
							<button
								disabled={isSubmitting}
								type="submit"
								className="bg-orange rounded-xl  py-2 px-4 text-lg font-semibold text-white  hover:scale-[1.05] transition  "
							>
								login
							</button>
							<div
								className="w-[42px] h-[42px] relative rounded-full  cursor-pointer ml-5 hover:scale-[1.06] transition"
								onClick={googleAuth}
							>
								<Image
									src="/images/google.png"
									fill
									className="object-contain shadow-md rounded-full p-2 bg-[#838383] bg-opacity-10"
									alt=""
								/>
							</div>
						</div>

						<p className="text-xs text-gray-500 mt-2">
							No account?{" "}
							<Link
								href={"/signup"}
								className="text-orange hover:underline"
								onClick={() => setShowModal(false)}
							>
								Register
							</Link>{" "}
						</p>
					</div>
				</Form>
			)}
		</Formik>
	);
};
export default SignInForm;

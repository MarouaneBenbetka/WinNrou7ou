import { Form, Formik } from "formik";
import CustomInput from "./CustomInput";
import { SignUpSchema } from "./Schema";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineNavigateBefore } from "react-icons/md";
import { motion } from "framer-motion";
import CustomInput2 from "./CustomInput2";
import { useRouter } from "next/router";
import ImageInput from "./ImageInput";
import axios from "axios";
import { instance } from "@/utils/services/url";

const SignUpForm = ({}) => {
	const router = useRouter();
	// for sign in with email and password
	const onSubmit = async (values, actions) => {
		console.log(values);

		try {
			const result = await instance.post(`/api/users`, {
				email: values.email,
				name: values.username,
				password: values.password,
				image: values.image,
			});
			console.log(result);
		} catch (error) {
			console.log(error);
		}
		actions.resetForm();
	};
	// for google auth
	const googleAuth = () => {};
	return (
		<Formik
			initialValues={{
				email: "",
				username: "",
				password: "",
				confirmPassword: "",
				image: "",
			}}
			validationSchema={SignUpSchema}
			onSubmit={onSubmit}
		>
			{({ isSubmitting, setFieldValue }) => (
				<Form>
					<div className="max-screen">
						<motion.div
							className="mt-10  flex gap-1 items-center cursor-pointer mb-10"
							onClick={() => router.back()}
							whileHover={{
								scale: 1.15,
								originX: 0,
							}}
						>
							<MdOutlineNavigateBefore
								className="text-dark"
								size={32}
							/>
							<h1 className="font-semibold text-lg text-dark">
								back
							</h1>
						</motion.div>
						<h1 className="font-semibold text-5xl text-white mb-9">
							Sign up
						</h1>
						<ImageInput
							name="image"
							setFieldValue={setFieldValue}
						/>
						<CustomInput2
							label="Email"
							name="email"
							type="email"
							placeholder="Email"
						/>
						<CustomInput2
							label="Username"
							name="username"
							type="text"
							placeholder="Username"
						/>
						<CustomInput2
							label="Password"
							name="password"
							type="password"
							placeholder="Password"
						/>
						<CustomInput2
							label="Confirm Password"
							name="confirmPassword"
							type="password"
							placeholder="Confirm  password"
						/>

						<button
							disabled={isSubmitting}
							type="submit"
							className="block bg-dark mx-auto rounded-xl  py-3 px-5 text-lg font-semibold text-white mt-7 hover:scale-[1.05] transition  "
						>
							create account
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};
export default SignUpForm;

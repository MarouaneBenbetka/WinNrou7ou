import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import { wilayas } from "@/data/data";

import axios from "axios";

import dynamic from "next/dynamic";
import { instance } from "@/utils/services/url";

const LocationPicker2 = dynamic(() => import("./LocationPicker"), {
	ssr: false,
});

const AddAnnonce = ({ onFinishSubmit }) => {
	const status = "loading";
	const [images, setImages] = useState([]);
	const initialValues = {
		titre: "",
		description: "",
		wilaya: "Alger",
	};

	// postion for the map location
	const [position, setPosition] = useState({
		lat: "36.7681618",
		lng: "3.0404258",
	});

	const validationSchema = Yup.object({
		wilaya: Yup.string().required("Required"),
		description: Yup.string().required("Required"),
		titre: Yup.string().required("Required"),
	});

	const onSubmit = async (values, onSubmitProps) => {
		console.log("onSubmit", values);
		let links = [];
		const button = document.querySelector("[type=submit]");
		button.innerText = "";
		button.classList.add("loading");

		let { titre, description, wilaya } = values;
		console.log(values);
		console.log(images);
		try {
			for (let i = 0; i < images.length; i++) {
				let formdata = new FormData();
				formdata.append("file", images[i]);
				formdata.append("upload_preset", "win-uploads");
				let res = await axios.post(
					"https://api.cloudinary.com/v1_1/dus25a6ll/image/upload",
					formdata
				);
				console.log(res.data.secure_url);
				links.push(res.data.secure_url);
			}
			const body = {
				title: titre,
				summary: description,
				latitude: position.lat,
				longitude: position.lng,
				images: links,
				wilaya,
			};
			console.log(body);
			instance
				.post(`/api/monuments`, body)
				.then((res) => {
					onSubmitProps.setSubmitting(false);
					button.classList.remove("loading");
					button.innerText = "Submit";
					onSubmitProps.resetForm();
					onFinishSubmit();
				})
				.catch((err) => {
					console.log(err);
					onSubmitProps.setSubmitting(false);
					button.classList.remove("loading");
					button.innerText = "Submit";
				});
		} catch (e) {
			onSubmitProps.setSubmitting(false);
			button.classList.remove("loading");
		}

		// } catch {
		// 	toast.error("Connexion echoue");
		// }
	};

	return (
		<div className="card flex-shrink-0  text-dark w-full shadow-2xl bg-white overflow-y-auto max-h-[95vh]">
			<label
				className="btn btn-sm btn-circle absolute right-3 top-3 bg-[#d92525] border-[#d92525] hover:bg-[#d92525] hover:border-[#d92525] text-white"
				onClick={onFinishSubmit}
			>
				✕
			</label>
			<div className="card-body p-4	px-8">
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					{(formik) => {
						return (
							<Form>
								<div className="md:grid md:grid-cols-2 md:gap-y-1 md:gap-x-6">
									<FormikControl
										control="textarea"
										type="text"
										label="Titre"
										name="titre"
										formik={formik}
										placeholder="Nom du lieux ..."
									/>
									<FormikControl
										control="select"
										label="Wilaya"
										name="wilaya"
										options={wilayas}
									/>

									<FormikControl
										control="textarea"
										label="Description"
										name="description"
										formik={formik}
										placeholder="Entrer une Description du lieux"
									/>
									<div>
										<div className="form-control">
											<label
												className="label"
												htmlFor="images"
											>
												<span className="label-text  text-lg">
													Images
												</span>
											</label>
											<input
												type="file"
												alt="images"
												id="image_input"
												aria-describedby="file_input_help"
												accept="image/*"
												name="images"
												className="file-input file-input-bordered w-full file-input-md file-input-accent file-selector-button:bg-primary bg-white"
												onChange={(e) => {
													setImages(e.target.files);
												}}
												multiple={true}
											/>
										</div>
									</div>
									<div className="form-control col-span-2 w-full">
										<label
											className="label"
											htmlFor="image"
										>
											<span className="label-text  text-lg">
												Position sur la carte
											</span>
										</label>
										<LocationPicker2
											position={position}
											onChangedPosition={setPosition}
										/>
									</div>
								</div>

								<div
									className={`form-control mt-6  ${
										status === "loading" ? "loading" : ""
									}`}
								>
									<button
										className={`btn btn-wide border-2 hover:bg-white2 hover:border-purple hover:text-purple mx-auto  bg-purple border-purple ${
											status === "pending_save"
												? "loading"
												: ""
										}`}
										type="submit"
										disabled={
											!formik.isValid ||
											formik.isSubmitting
										}
									>
										Submit
									</button>
								</div>
							</Form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};

export default AddAnnonce;

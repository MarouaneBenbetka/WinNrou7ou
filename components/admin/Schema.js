import * as yup from "yup";

export const Schema = yup.object().shape({
	title: yup.string().required("Required"),
	summary: yup.string().required("Required"),
	wilaya: yup.string().required("Required"),
});

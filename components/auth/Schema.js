import * as yup from "yup";

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,20}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const Schema = yup.object().shape({
	email: yup
		.string()
		.email("Please enter a valid email")
		.required("Required"),
	password: yup.string().required("Required"),
});

export const SignUpSchema = yup.object().shape({
	email: yup
		.string()
		.email("Please enter a valid email")
		.required("Required"),
	username: yup
		.string()
		.min(3, "Username must be at least 3 characters long")
		.required("Required"),
	password: yup
		.string()
		.min(5, "Password must be at least 5 characters long")
		.matches(passwordRules, {
			message: "use upper lower and numeric characters",
		})
		.required("Required"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password"), null], "Passwords must match")
		.required("Required"),
});

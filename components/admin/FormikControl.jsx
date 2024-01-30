import React from "react";
import Input from "./Input";
import Select from "./Select";
import Textarea from "./TextArea";

function FormikControl(props) {
	const { control, ...rest } = props;
	switch (control) {
		case "input":
			return <Input {...rest} />;
		case "textarea":
			return <Textarea {...rest} />;
		case "select":
			return <Select {...rest} />;

		default:
			return null;
	}
}

export default FormikControl;

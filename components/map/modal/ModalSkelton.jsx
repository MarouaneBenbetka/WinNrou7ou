import React from "react";
import ContentLoader from "react-content-loader";

const ModalSkelton = (props) => (
	<ContentLoader
		speed={2}
		width={360}
		height={500}
		viewBox="0 0 360 500"
		backgroundColor="#eae6e3"
		foregroundColor="#dcdada"
		{...props}
	>
		<rect x="35" y="11" rx="3" ry="3" width="280" height="17" />
		<rect x="94" y="42" rx="3" ry="3" width="150" height="18" />
		<rect x="35" y="82" rx="12" ry="12" width="280" height="180" />
		<rect x="100" y="290" rx="3" ry="3" width="205" height="17" />
		<circle cx="62" cy="300" r="20" />
		<rect x="100" y="340" rx="3" ry="3" width="205" height="17" />
		<circle cx="62" cy="350" r="20" />
		<rect x="100" y="390" rx="3" ry="3" width="205" height="17" />
		<circle cx="62" cy="400" r="20" />
		<rect x="80" y="450" rx="10" ry="10" width="205" height="17" />
	</ContentLoader>
);

export default ModalSkelton;

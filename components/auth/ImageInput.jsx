import Image from "next/image";
import { useState } from "react";
import axios from "axios";

const ImageInput = ({ setFieldValue }) => {
	const [avatarPreview, setAvatarPreview] = useState("/images/addPic.png");

	return (
		<div className="flex text-center justify-center items-center flex-col mt-3 mb-2 ">
			<label className="w-[100px] h-[100px] relative rounded-full overflow-hidden cursor-pointer">
				<Image
					src={avatarPreview || user?.avatar}
					fill
					alt=""
					className=" object-cover object-center "
				/>

				<input
					name="avatar"
					accept="image/*"
					id="contained-button-file"
					type="file"
					className="w-full h-full hidden"
					onChange={async (e) => {
						const fileReader = new FileReader();
						fileReader.onload = () => {
							if (fileReader.readyState === 2) {
								setAvatarPreview(fileReader.result);
							}
						};
						fileReader.readAsDataURL(e.target.files[0]);
						let formdata = new FormData();
						formdata.append("file", e.target.files[0]);
						formdata.append("upload_preset", "win-uploads");
						let res = await axios.post(
							"https://api.cloudinary.com/v1_1/dus25a6ll/image/upload",
							formdata
						);
						const link = res.data.secure_url;
						setFieldValue("image", link);
						console.log(link);
					}}
				/>
			</label>
		</div>
	);
};

export default ImageInput;

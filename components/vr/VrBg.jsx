const VrBg = () => {
	return (
		<>
			<div className="absolute top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,.65)] z-10"></div>
			<video
				src="/videos/algiers_by_drone.mp4"
				autoPlay
				loop
				muted
				className="absolute top-0 left-0 w-screen h-screen max-h-screen object-cover z-1"
			/>
		</>
	);
};

export default VrBg;

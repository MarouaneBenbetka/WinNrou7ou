import { FiCalendar } from "react-icons/fi";

const Notification = ({ color }) => {
	return (
		<div className="rounded-xl overflow-hidden flex  items-center relative shadow-md w-[90vw] sm:w-[80vw] md:w-[50vw]">
			<div className={`w-[60px] bg-${color} h-[88px] mr-3`}></div>
			<div className="text-dark">
				<h4>New event</h4>
				<h2 className="text-lg md:text-xl font-semibold">
					Mediterranean Festival of Oran
				</h2>
				<div className="flex gap-1 text-xs items-center mt-1">
					<FiCalendar size={16} className="text-dark opacity-80" />
					<p>24-05-2002</p>
				</div>
			</div>
		</div>
	);
};

export default Notification;

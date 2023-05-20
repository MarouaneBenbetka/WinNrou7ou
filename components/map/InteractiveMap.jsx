import {
	Map,
	TileLayer,
	useMap,
	Marker,
	Popup,
	MapContainer,
	ZoomControl,
	useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import InfoModal from "./modal/InfoModal";

export default function InteractiveMap({ lat, lng, lock }) {
	const mapRef = useRef();
	const [showModal, setShowModal] = useState(false);
	useEffect(() => {
		lock
			? mapRef.current?.scrollWheelZoom.enable()
			: mapRef.current?.scrollWheelZoom.disable();
	}, [lock]);

	function MapEventsHandler() {
		useMapEvents({
			click: (e) => {
				const { latlng } = e;
				setShowModal(false); // Handle the click event, e.g., display coordinates
			},
		});

		return null;
	}
	return (
		<div className="h-screen w-full focus:outline-none z-10 bg-transparent relative">
			<MapContainer
				ref={mapRef}
				center={[lat, lng]}
				zoom={6}
				scrollWheelZoom={lock}
				className="w-full h-full z-10"
				zoomControl={false}
			>
				<MapEventsHandler />
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<Marker
					position={[lat, lng]}
					icon={L.icon({
						iconUrl: "/images/logo.svg",
						iconSize: [72, 72],
					})}
					eventHandlers={{
						click: (e) => {
							setShowModal((prev) => !prev);
						},
						dblclick: (event) => {
							event.originalEvent.preventDefault(); // Prevents default double-click behavior
						},
					}}
				></Marker>
				<ZoomControl position="bottomright" />
			</MapContainer>
			{showModal && <InfoModal />}
		</div>
	);
}

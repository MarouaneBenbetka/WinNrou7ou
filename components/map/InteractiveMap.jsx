import {
	Map,
	TileLayer,
	useMap,
	Marker,
	Popup,
	MapContainer,
	ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";

export default function InteractiveMap({ lat, lng, lock }) {
	const mapRef = useRef();
	useEffect(() => {
		lock
			? mapRef.current?.scrollWheelZoom.enable()
			: mapRef.current?.scrollWheelZoom.disable();
	}, [lock]);
	return (
		<MapContainer
			ref={mapRef}
			center={[lat, lng]}
			zoom={6}
			scrollWheelZoom={lock}
			className="h-screen w-full focus:outline-none z-10 bg-transparent relative "
			zoomControl={false}
		>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			<Marker
				position={[lat, lng]}
				icon={L.icon({
					iconUrl: "/images/logo.svg",
					iconSize: [72, 72],
				})}
			>
				<Popup>Voici la position d immoblier</Popup>
			</Marker>
			<ZoomControl position="bottomright" />
		</MapContainer>
	);
}

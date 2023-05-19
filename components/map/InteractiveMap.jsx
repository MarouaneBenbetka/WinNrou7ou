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

export default function InteractiveMap({ lat, lng }) {
	return (
		<MapContainer
			center={[lat, lng]}
			zoom={15}
			scrollWheelZoom={false}
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

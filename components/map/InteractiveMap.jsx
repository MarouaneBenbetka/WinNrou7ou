import {
	TileLayer,
	useMap,
	Marker,
	MapContainer,
	ZoomControl,
	useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import InfoModal from "./modal/InfoModal";
import { markersPostions } from "@/data/mapData";
import MarkerClusterGroup from "./MarkerClusterGroup";
import axios from "axios";

const HighlightedMarkersComponent = ({
	highlightedMarkers,
	setModalId,
	setShowModal,
}) => {
	const map1 = useMap();
	useEffect(() => {
		if (highlightedMarkers.length === 1) {
			map1.flyTo(
				[
					highlightedMarkers[0].latitude,
					highlightedMarkers[0].longitude,
				],
				10
			);
			setTimeout(() => {
				setShowModal(true);
				setModalId(highlightedMarkers[0].id);
			}, 500);
		} else {
			setShowModal(false);
			map1.flyTo([34.254999624124345, 3.291259381451609], 6);
		}
	}, [highlightedMarkers, map1, setModalId, setShowModal]);

	return highlightedMarkers.map((item) => (
		<Marker
			key={item.id}
			position={[item.latitude, item.longitude]}
			title={item.title}
			icon={L.icon({
				iconUrl: "/images/logo.svg",
				iconSize: [42, 42],
			})}
			eventHandlers={{
				click: (e) => {
					setModalId(item.id);
					setShowModal((prev) => !prev);
				},
				dblclick: (event) => {
					event.originalEvent.preventDefault(); // Prevents default double-click behavior
				},
			}}
		/>
	));
};

export default function InteractiveMap({
	lat,
	lng,
	lock,
	markers,
	highlightedMarkers,
}) {
	const mapRef = useRef();
	const [showModal, setShowModal] = useState(false);
	const [modalId, setModalId] = useState(0);

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

				{highlightedMarkers && highlightedMarkers.length ? (
					<HighlightedMarkersComponent
						highlightedMarkers={highlightedMarkers}
						setShowModal={setShowModal}
						setModalId={setModalId}
					/>
				) : (
					<MarkerClusterGroup>
						{markers.map((item) => (
							<Marker
								key={item.id}
								position={[item.latitude, item.longitude]}
								title={item.title}
								icon={L.icon({
									iconUrl: "/images/logo.svg",
									iconSize: [42, 42],
								})}
								eventHandlers={{
									click: (e) => {
										setModalId(item.id);
										setShowModal((prev) => !prev);
									},
									dblclick: (event) => {
										event.originalEvent.preventDefault(); // Prevents default double-click behavior
									},
								}}
							/>
						))}
					</MarkerClusterGroup>
				)}

				<ZoomControl position="bottomright" />
			</MapContainer>
			{showModal && (
				<InfoModal
					id={modalId}
					closeModal={() => setShowModal(false)}
				/>
			)}
		</div>
	);
}

// import {
// 	TileLayer,
// 	Marker,
// 	MapContainer,
// 	ZoomControl,
// 	useMapEvents,
// } from "react-leaflet";

// import L from "leaflet";
// import { useEffect, useRef, useState } from "react";
// import InfoModal from "./modal/InfoModal";
// import { markersPostions } from "@/data/mapData";

// export default function InteractiveMap({ lat, lng, lock }) {
// 	const mapRef = useRef();
// 	const [showModal, setShowModal] = useState(false);
// 	useEffect(() => {
// 		lock
// 			? mapRef.current?.scrollWheelZoom.enable()
// 			: mapRef.current?.scrollWheelZoom.disable();
// 	}, [lock]);

// 	function MapEventsHandler() {
// 		useMapEvents({
// 			click: (e) => {
// 				const { latlng } = e;
// 				setShowModal(false); // Handle the click event, e.g., display coordinates
// 			},
// 		});

// 		return null;
// 	}
// 	return (
// 		<div className="h-screen w-full focus:outline-none z-10 bg-transparent relative">
// 			<MapContainer
// 				ref={mapRef}
// 				center={[lat, lng]}
// 				zoom={6}
// 				scrollWheelZoom={lock}
// 				className="w-full h-full z-10"
// 				zoomControl={false}
// 			>
// 				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

// 				{markersPostions.map((item) => (
// 					<Marker
// 						key={item.id}
// 						position={[item.lat, item.lon]}
// 						title={item.title}
// 						icon={L.icon({
// 							iconUrl: "/images/logo.svg",
// 							iconSize: [42, 42],
// 						})}
// 						eventHandlers={{
// 							click: (e) => {
// 								setShowModal((prev) => !prev);
// 							},
// 							dblclick: (event) => {
// 								event.originalEvent.preventDefault(); // Prevents default double-click behavior
// 							},
// 						}}
// 					/>
// 				))}
// 				<MapEventsHandler />
// 				{/* <Marker
// 					position={[lat, lng]}
// 					icon={L.icon({
// 						iconUrl: "/images/logo.svg",
// 						iconSize: [72, 72],
// 					})}
// 					eventHandlers={{
// 						click: (e) => {
// 							setShowModal((prev) => !prev);
// 						},
// 						dblclick: (event) => {
// 							event.originalEvent.preventDefault(); // Prevents default double-click behavior
// 						},
// 					}}
// 				></Marker> */}
// 				<ZoomControl position="bottomright" />
// 			</MapContainer>
// 			{showModal && <InfoModal />}
// 		</div>
// 	);
// }

import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Markers from './Markers'

const MapView = () => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={15}>
        <TileLayer  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      <Markers/>
    </MapContainer>
  )
}

export default MapView

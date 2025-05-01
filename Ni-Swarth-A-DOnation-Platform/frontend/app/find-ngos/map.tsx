"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Button } from "@/components/ui/button"
import { Phone, Mail } from "lucide-react"

// Fix Leaflet marker icon issues
const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const userIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: "text-blue-500",
})

const selectedIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [30, 46],
  iconAnchor: [15, 46],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: "text-accent",
})

// Component to recenter the map when user location changes
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, 12)
  }, [center, map])
  return null
}

interface MapProps {
  userLocation: { lat: number; lng: number }
  ngos: any[]
  selectedNGO: any | null
  setSelectedNGO: (ngo: any) => void
}

export default function Map({ userLocation, ngos, selectedNGO, setSelectedNGO }: MapProps) {
  const [map, setMap] = useState<L.Map | null>(null)

  // Center map on selected NGO when it changes
  useEffect(() => {
    if (map && selectedNGO) {
      map.setView([selectedNGO.coordinates.lat, selectedNGO.coordinates.lng], 14)
    }
  }, [selectedNGO, map])

  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lng]}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
      whenCreated={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ChangeView center={[userLocation.lat, userLocation.lng]} />

      {/* User location marker */}
      <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
        <Popup>
          <div className="text-center">
            <h3 className="font-semibold text-primary">Your Location</h3>
          </div>
        </Popup>
      </Marker>

      {/* NGO markers */}
      {ngos.map((ngo) => (
        <Marker
          key={ngo.id}
          position={[ngo.coordinates.lat, ngo.coordinates.lng]}
          icon={selectedNGO?.id === ngo.id ? selectedIcon : markerIcon}
          eventHandlers={{
            click: () => {
              setSelectedNGO(ngo)
            },
          }}
        >
          <Popup>
            <div className="text-center p-1">
              <h3 className="font-semibold text-primary mb-1">{ngo.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{ngo.distance} km away</p>
              <div className="flex flex-wrap gap-1 justify-center mb-2">
                {ngo.services.map((service: string, index: number) => (
                  <span key={index} className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    {service}
                  </span>
                ))}
              </div>
              <div className="flex justify-center space-x-2 mt-2">
                <Button size="sm" asChild variant="outline" className="text-xs py-1 h-auto">
                  <a href={`tel:${ngo.contact.phone}`}>
                    <Phone className="h-3 w-3 mr-1" /> Call
                  </a>
                </Button>
                <Button size="sm" asChild variant="outline" className="text-xs py-1 h-auto">
                  <a href={`mailto:${ngo.contact.email}`}>
                    <Mail className="h-3 w-3 mr-1" /> Email
                  </a>
                </Button>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

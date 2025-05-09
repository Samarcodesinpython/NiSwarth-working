"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Users, Target } from "lucide-react"

type UserRole = "ngo" | "donor" | "volunteer"
const mockUserRole: UserRole = "donor" // Change to 'ngo' to see Create Event button

// Mock events data
const events = [
  {
    id: 1,
    name: "Summer Beach Cleanup",
    ngo: "Green Earth Initiative",
    venue: "Sunset Beach, CA",
    date: "2024-06-15",
    time: "09:00 AM - 12:00 PM",
    target: "50 Volunteers",
    description: "Join us for our annual beach cleanup event. Help keep our beaches clean and protect marine life.",
  },
  {
    id: 2,
    name: "Save the Bay Fundraiser Gala",
    ngo: "Harbor Conservation Trust",
    venue: "Harbor View Hotel, San Francisco",
    date: "2024-06-22",
    time: "06:00 PM - 10:00 PM",
    target: "$25,000",
    description: "An elegant evening to raise funds for our coastal conservation efforts. Dinner, music, and silent auction.",
  },
  {
    id: 3,
    name: "School Supplies Donation Drive",
    ngo: "Hope Foundation",
    venue: "Hope Community Center, Delhi",
    date: "2024-07-01",
    time: "10:00 AM - 04:00 PM",
    target: "500 School Kits",
    description: "Help us provide essential school supplies to underprivileged children for the new academic year.",
  },
  {
    id: 4,
    name: "Women's Empowerment Workshop",
    ngo: "Women Empowerment Trust",
    venue: "Empowerment Hall, Kolkata",
    date: "2024-07-10",
    time: "11:00 AM - 03:00 PM",
    target: "200 Attendees",
    description: "A workshop to empower women with skills and resources for better livelihood opportunities.",
  },
  {
    id: 5,
    name: "Rural Health Camp",
    ngo: "Rural Development Foundation",
    venue: "Village Health Center, Lucknow",
    date: "2024-07-15",
    time: "08:00 AM - 02:00 PM",
    target: "300 Patients",
    description: "Free health check-ups and medicines for rural communities in Lucknow.",
  },
  {
    id: 6,
    name: "Disability Awareness Drive",
    ngo: "Disability Support Network",
    venue: "City Auditorium, Pune",
    date: "2024-07-20",
    time: "10:00 AM - 01:00 PM",
    target: "100 Volunteers",
    description: "Join us to spread awareness and support for people with disabilities.",
  },
  {
    id: 7,
    name: "Asha Child Education Fair",
    ngo: "Uttarakhand Asha Foundation",
    venue: "Asha School Grounds, Dehradun",
    date: "2024-07-25",
    time: "09:00 AM - 05:00 PM",
    target: "1000 Children",
    description: "A fair to promote education and distribute learning materials to children in need.",
  },
  {
    id: 8,
    name: "Sanrakshan Tree Plantation",
    ngo: "Sanrakshan",
    venue: "City Park, Jaipur",
    date: "2024-08-01",
    time: "07:00 AM - 11:00 AM",
    target: "2000 Saplings",
    description: "Help us plant trees and make Jaipur greener!",
  },
  {
    id: 9,
    name: "Youth Sports for Change",
    ngo: "Yuva Shakti",
    venue: "Youth Sports Complex, Bhopal",
    date: "2024-08-10",
    time: "03:00 PM - 08:00 PM",
    target: "500 Youth Participants",
    description: "A sports event to encourage youth participation and healthy living.",
  },
]

export default function CommunityPage() {
  const [showCreateEvent, setShowCreateEvent] = useState(false)

  return (
    <div className="container mx-auto px-4 py-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-primary">Community Events</h1>
          <p className="text-muted-foreground max-w-xl">
            Discover upcoming fundraisers and donation drives organized by NGOs. Join an event to make a difference, or create a new event if you represent an NGO.
          </p>
        </div>
        {mockUserRole === "ngo" && (
          <Button className="mt-4 md:mt-0" onClick={() => setShowCreateEvent(true)}>
            + Create Event
          </Button>
        )}
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow duration-300 rounded-2xl border-l-4 border-accent bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-primary mb-1">{event.name}</CardTitle>
              <div className="text-sm text-muted-foreground mb-1">by {event.ngo}</div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-accent" />
                <span>{event.venue}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-accent" />
                <span>{event.date} | {event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Target className="h-4 w-4 text-accent" />
                <span>Goal: {event.target}</span>
              </div>
              <div className="text-sm text-foreground/80 mt-2 mb-4">{event.description}</div>
              {(mockUserRole === "donor" || mockUserRole === "volunteer") && (
                <Button className="w-full" variant="default">
                  Join Event
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Event Modal (Mock) */}
      {showCreateEvent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-background p-8 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
            <p className="mb-4 text-muted-foreground">(Event creation form goes here...)</p>
            <Button variant="outline" onClick={() => setShowCreateEvent(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  )
} 
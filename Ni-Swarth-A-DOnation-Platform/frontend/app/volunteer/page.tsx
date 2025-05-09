"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Calendar, CheckCircle, Award, Bell, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function VolunteerDashboardPage() {
  const [profileEdit, setProfileEdit] = useState(false);
  const [profile, setProfile] = useState({ name: "Aditi Verma", email: "aditi@email.com", location: "Delhi", age: 24, skills: "Teaching, Fundraising", interests: "Education, Environment" });

  // Mock data for events and commitments
  const upcomingEvents = [
    {
      id: 1,
      name: "Sanrakshan Tree Plantation",
      ngo: "Sanrakshan",
      date: "2024-08-01",
      time: "07:00 AM - 11:00 AM",
      location: "City Park, Jaipur",
      urgent: true,
    },
    {
      id: 2,
      name: "School Supplies Donation Drive",
      ngo: "Hope Foundation",
      date: "2024-07-01",
      time: "10:00 AM - 04:00 PM",
      location: "Hope Community Center, Delhi",
      urgent: false,
    },
    {
      id: 3,
      name: "Women's Empowerment Workshop",
      ngo: "Women Empowerment Trust",
      date: "2024-07-10",
      time: "11:00 AM - 03:00 PM",
      location: "Empowerment Hall, Kolkata",
      urgent: true,
    },
  ]

  const myCommitments = [
    {
      id: 1,
      name: "Summer Beach Cleanup",
      ngo: "Green Earth Initiative",
      date: "2024-06-15",
      hours: 4,
      status: "Completed",
      feedback: "Great teamwork and impact!",
    },
    {
      id: 2,
      name: "Save the Bay Fundraiser Gala",
      ngo: "Harbor Conservation Trust",
      date: "2024-06-22",
      hours: 5,
      status: "Upcoming",
      feedback: "--",
    },
  ]

  const badges = [
    { id: 1, label: "Green Warrior", desc: "Planted 100+ trees", icon: <Award className="w-6 h-6 text-green-500" /> },
    { id: 2, label: "Education Champion", desc: "Volunteered 50+ hours for education", icon: <Award className="w-6 h-6 text-blue-500" /> },
    { id: 3, label: "Fundraiser Star", desc: "Helped raise over ₹10,000", icon: <Award className="w-6 h-6 text-yellow-500" /> },
  ]

  const certificates = [
    { id: 1, name: "Certificate of Appreciation", event: "Sanrakshan Tree Plantation", url: "#" },
    { id: 2, name: "Volunteer Excellence", event: "School Supplies Donation Drive", url: "#" },
  ]

  const quickSignUp = upcomingEvents.filter(e => e.urgent)

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div className="mb-4 flex items-center gap-4">
        <User className="w-10 h-10 text-primary" />
        <div>
          <h1 className="text-3xl font-bold mb-1">Welcome, {profile.name}!</h1>
          <p className="text-lg text-muted-foreground">Thank you for volunteering. Your time and skills are making a real difference!</p>
        </div>
      </div>

      {/* Notifications Placeholder */}
      <Card className="shadow-md">
        <CardContent className="flex items-center gap-2 p-4">
          <Bell className="w-5 h-5 text-accent" />
          <span className="text-muted-foreground">[Notifications will appear here]</span>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-md">
          <CardContent className="flex items-center gap-4 p-6">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div>
              <div className="text-2xl font-bold">120</div>
              <div className="text-sm text-muted-foreground">Hours Volunteered</div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="flex items-center gap-4 p-6">
            <Calendar className="w-8 h-8 text-blue-500" />
            <div>
              <div className="text-2xl font-bold">8</div>
              <div className="text-sm text-muted-foreground">Events Attended</div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="flex items-center gap-4 p-6">
            <Award className="w-8 h-8 text-yellow-500" />
            <div>
              <div className="text-2xl font-bold">200+</div>
              <div className="text-sm text-muted-foreground">People Helped</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Editable Profile Section */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Volunteer Profile</h2>
            <Button variant="ghost" size="icon" onClick={() => setProfileEdit((v) => !v)}>
              <Pencil className="w-5 h-5" />
            </Button>
          </div>
          {profileEdit ? (
            <form className="space-y-4">
              <Input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} placeholder="Name" />
              <Input value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} placeholder="Email" />
              <Input value={profile.location} onChange={e => setProfile({ ...profile, location: e.target.value })} placeholder="Location" />
              <Input value={profile.age} onChange={e => setProfile({ ...profile, age: Number(e.target.value) })} placeholder="Age" type="number" />
              <Input value={profile.skills} onChange={e => setProfile({ ...profile, skills: e.target.value })} placeholder="Skills" />
              <Input value={profile.interests} onChange={e => setProfile({ ...profile, interests: e.target.value })} placeholder="Interests" />
              <Button className="w-full" onClick={e => { e.preventDefault(); setProfileEdit(false); }}>Save</Button>
            </form>
          ) : (
            <div className="space-y-2">
              <div><span className="font-medium">Name:</span> {profile.name}</div>
              <div><span className="font-medium">Email:</span> {profile.email}</div>
              <div><span className="font-medium">Location:</span> {profile.location}</div>
              <div><span className="font-medium">Age:</span> {profile.age}</div>
              <div><span className="font-medium">Skills:</span> {profile.skills}</div>
              <div><span className="font-medium">Interests:</span> {profile.interests}</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingEvents.map(event => (
              <div key={event.id} className="border rounded-lg p-4 bg-primary/5 flex flex-col gap-1">
                <div className="font-semibold text-primary">{event.name}</div>
                <div className="text-sm text-muted-foreground">by {event.ngo}</div>
                <div className="text-xs text-foreground/70">{event.date} | {event.time} | {event.location}</div>
                <Button className="mt-2 w-fit" size="sm">Sign Up</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* My Commitments */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">My Commitments</h2>
          <div className="space-y-3">
            {myCommitments.map(commitment => (
              <div key={commitment.id} className="border rounded-lg p-4 bg-secondary/10 flex flex-col gap-1">
                <div className="font-semibold text-primary">{commitment.name}</div>
                <div className="text-sm text-muted-foreground">by {commitment.ngo}</div>
                <div className="text-xs text-foreground/70">{commitment.date} | Hours: {commitment.hours}</div>
                <div className="text-xs">Status: <span className={commitment.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}>{commitment.status}</span></div>
                <div className="text-xs italic">Feedback: {commitment.feedback}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Sign-Up */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Sign-Up</h2>
          <div className="flex flex-wrap gap-4">
            {quickSignUp.map(event => (
              <div key={event.id} className="border rounded-lg p-4 bg-accent/10 flex flex-col gap-1">
                <div className="font-semibold text-accent">{event.name}</div>
                <div className="text-xs text-foreground/70">{event.date} | {event.location}</div>
                <Button className="mt-2 w-fit" size="sm" variant="default">Sign Up Now</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Badges & Certificates */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Badges & Certificates</h2>
          <div className="flex flex-wrap gap-4 mb-4">
            {badges.map(badge => (
              <div key={badge.id} className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-primary/10">
                {badge.icon}
                <div>
                  <div className="font-semibold">{badge.label}</div>
                  <div className="text-xs text-muted-foreground">{badge.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2">
            <div className="font-semibold mb-2">Certificates</div>
            <ul className="list-disc ml-6">
              {certificates.map(cert => (
                <li key={cert.id} className="mb-1">
                  <a href={cert.url} className="text-accent underline">{cert.name}</a> <span className="text-xs text-muted-foreground">({cert.event})</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Testimonials & Feedback Placeholder */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Testimonials & Feedback</h2>
          <div className="text-muted-foreground">[Testimonials, feedback form, social sharing will go here]</div>
        </CardContent>
      </Card>

      {/* Featured Events/NGOs Placeholder */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Featured Events & NGOs</h2>
          <div className="text-muted-foreground">[Featured events/NGOs with volunteer buttons will go here]</div>
        </CardContent>
      </Card>
    </div>
  );
} 
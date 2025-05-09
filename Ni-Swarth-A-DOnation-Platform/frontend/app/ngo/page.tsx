"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Heart, Users, TrendingUp, Calendar, BarChart2, MessageCircle, FileText, Settings, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function NGODashboardPage() {
  const [profileEdit, setProfileEdit] = useState(false);
  const [profile, setProfile] = useState({ name: "Green Earth Initiative", logo: "/images/ngos/green-earth.jpg", mission: "Environmental conservation and community development.", contact: "contact@greenearth.org", services: "Environment, Education", location: "Chennai, India", website: "https://greenearth.org" });

  // Mock data for dashboard sections
  const donations = [
    { id: 1, donor: "Priya Sharma", item: "Books", qty: 50, status: "Fulfilled" },
    { id: 2, donor: "Rahul Verma", item: "Blankets", qty: 30, status: "Pending" },
    { id: 3, donor: "Sunita Patel", item: "Funds", qty: "₹10,000", status: "Fulfilled" },
  ];
  const volunteers = [
    { id: 1, name: "Aditi Verma", event: "Tree Plantation", hours: 5, status: "Approved" },
    { id: 2, name: "Rohan Singh", event: "Beach Cleanup", hours: 3, status: "Pending" },
    { id: 3, name: "Meera Das", event: "Donation Drive", hours: 4, status: "Approved" },
  ];
  const campaigns = [
    { id: 1, name: "Green City Fundraiser", goal: 50000, raised: 32000, urgent: true },
    { id: 2, name: "School Kit Drive", goal: 1000, raised: 800, urgent: false },
  ];
  const events = [
    { id: 1, name: "Tree Plantation", date: "2024-08-01", signups: 40 },
    { id: 2, name: "Donation Drive", date: "2024-07-10", signups: 25 },
  ];
  const stats = {
    donations: 120,
    events: 15,
    peopleHelped: 2000,
    volunteers: 80,
  };
  const notifications = [
    { id: 1, message: "New donation received from Priya Sharma." },
    { id: 2, message: "Volunteer Rohan Singh signed up for Beach Cleanup." },
    { id: 3, message: "Campaign 'Green City Fundraiser' reached 60% of its goal!" },
  ];
  const testimonials = [
    { id: 1, name: "Priya Sharma", quote: "Supporting Green Earth Initiative has been a rewarding experience!" },
    { id: 2, name: "Aditi Verma", quote: "Volunteering here made me realize the power of community." },
  ];
  const documents = [
    { id: 1, name: "Donation Receipt - Books.pdf", url: "#" },
    { id: 2, name: "Volunteer Hours Report.pdf", url: "#" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div className="mb-4 flex items-center gap-4">
        <img src={profile.logo} alt={profile.name} className="w-14 h-14 rounded-full object-cover border-2 border-primary" />
        <div>
          <h1 className="text-3xl font-bold mb-1">Welcome, {profile.name}!</h1>
          <p className="text-lg text-muted-foreground">Thank you for making a difference in the community.</p>
        </div>
      </div>

      {/* Editable Profile Section */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">NGO Profile</h2>
            <Button variant="ghost" size="icon" onClick={() => setProfileEdit((v) => !v)}>
              <Pencil className="w-5 h-5" />
            </Button>
          </div>
          {profileEdit ? (
            <form className="space-y-4">
              <Input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} placeholder="NGO Name" />
              <Input value={profile.logo} onChange={e => setProfile({ ...profile, logo: e.target.value })} placeholder="Logo URL" />
              <Input value={profile.mission} onChange={e => setProfile({ ...profile, mission: e.target.value })} placeholder="Mission" />
              <Input value={profile.contact} onChange={e => setProfile({ ...profile, contact: e.target.value })} placeholder="Contact Email" />
              <Input value={profile.services} onChange={e => setProfile({ ...profile, services: e.target.value })} placeholder="Services" />
              <Input value={profile.location} onChange={e => setProfile({ ...profile, location: e.target.value })} placeholder="Location" />
              <Input value={profile.website} onChange={e => setProfile({ ...profile, website: e.target.value })} placeholder="Website" />
              <Button className="w-full" onClick={e => { e.preventDefault(); setProfileEdit(false); }}>Save</Button>
            </form>
          ) : (
            <div className="space-y-2">
              <div><span className="font-medium">Name:</span> {profile.name}</div>
              <div><span className="font-medium">Mission:</span> {profile.mission}</div>
              <div><span className="font-medium">Contact:</span> {profile.contact}</div>
              <div><span className="font-medium">Services:</span> {profile.services}</div>
              <div><span className="font-medium">Location:</span> {profile.location}</div>
              <div><span className="font-medium">Website:</span> <a href={profile.website} className="text-primary underline" target="_blank" rel="noopener noreferrer">{profile.website}</a></div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Donation Management */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Donation Management</h2>
          <div className="space-y-2">
            {donations.map(d => (
              <div key={d.id} className="flex items-center justify-between border rounded-lg px-3 py-2 bg-primary/10">
                <div>
                  <span className="font-semibold text-primary">{d.donor}</span> donated <span className="font-semibold">{d.qty} {d.item}</span>
                </div>
                <div className={d.status === 'Fulfilled' ? 'text-green-600' : 'text-yellow-600'}>{d.status}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Volunteer Management */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Volunteer Management</h2>
          <div className="space-y-2">
            {volunteers.map(v => (
              <div key={v.id} className="flex items-center justify-between border rounded-lg px-3 py-2 bg-secondary/10">
                <div>
                  <span className="font-semibold text-primary">{v.name}</span> for <span className="font-semibold">{v.event}</span> ({v.hours} hrs)
                </div>
                <div className={v.status === 'Approved' ? 'text-green-600' : 'text-yellow-600'}>{v.status}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fundraisers & Campaigns */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Fundraisers & Campaigns</h2>
          <div className="space-y-3">
            {campaigns.map(c => (
              <div key={c.id} className="border rounded-lg px-3 py-2 bg-primary/5">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-primary">{c.name}</span>
                  {c.urgent && <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Urgent</span>}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: `${(c.raised / c.goal) * 100}%` }} />
                </div>
                <div className="text-xs mt-1">Raised: ₹{c.raised} / ₹{c.goal}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Event Management */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Event Management</h2>
          <div className="space-y-2">
            {events.map(e => (
              <div key={e.id} className="flex items-center justify-between border rounded-lg px-3 py-2 bg-primary/10">
                <div>
                  <span className="font-semibold text-primary">{e.name}</span> on <span className="text-xs">{e.date}</span>
                </div>
                <div className="text-xs">Signups: {e.signups}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Impact Stats */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Impact Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-primary/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.donations}</div>
              <div className="text-xs text-muted-foreground">Donations</div>
            </div>
            <div className="bg-primary/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.events}</div>
              <div className="text-xs text-muted-foreground">Events</div>
            </div>
            <div className="bg-primary/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.peopleHelped}</div>
              <div className="text-xs text-muted-foreground">People Helped</div>
            </div>
            <div className="bg-primary/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.volunteers}</div>
              <div className="text-xs text-muted-foreground">Volunteers</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testimonials */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Testimonials</h2>
          <div className="space-y-2">
            {testimonials.map(t => (
              <div key={t.id} className="border-l-4 border-accent bg-secondary/10 rounded-lg px-4 py-2">
                <div className="italic">"{t.quote}"</div>
                <div className="text-xs text-muted-foreground text-right">- {t.name}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Documents</h2>
          <ul className="list-disc ml-6">
            {documents.map(doc => (
              <li key={doc.id} className="mb-1">
                <a href={doc.url} className="text-accent underline">{doc.name}</a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <ul className="list-disc ml-6">
            {notifications.map(n => (
              <li key={n.id} className="mb-1">{n.message}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Social Share & Security Settings Placeholder */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Social Share & Security Settings</h2>
          <div className="text-muted-foreground">[Social share tools, login info, donation alerts, password update]</div>
        </CardContent>
      </Card>
    </div>
  );
} 
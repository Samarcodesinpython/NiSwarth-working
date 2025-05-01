"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Heart, Users, TrendingUp, Calendar, BarChart2, MessageCircle, FileText, Settings, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function NGODashboardPage() {
  const [profileEdit, setProfileEdit] = useState(false);
  const [profile, setProfile] = useState({ name: "Green Earth Initiative", logo: "/images/ngos/green-earth.jpg", mission: "Environmental conservation and community development.", contact: "contact@greenearth.org", services: "Environment, Education", location: "Chennai, India", website: "https://greenearth.org" });

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

      {/* Donation Management Placeholder */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Donation Management</h2>
          <div className="text-muted-foreground">[List of donations, status, fulfill toggle will go here]</div>
        </CardContent>
      </Card>

      {/* Volunteer Management Placeholder */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Volunteer Management</h2>
          <div className="text-muted-foreground">[Event-wise volunteer list, approve/reject, track hours will go here]</div>
        </CardContent>
      </Card>

      {/* Campaigns Placeholder */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Fundraisers & Campaigns</h2>
          <div className="text-muted-foreground">[Manage campaigns, progress bars, urgent campaigns at top]</div>
        </CardContent>
      </Card>

      {/* Events Placeholder */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Event Management</h2>
          <div className="text-muted-foreground">[Create/edit events, view signups]</div>
        </CardContent>
      </Card>

      {/* Impact Stats Placeholder */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Impact Stats</h2>
          <div className="text-muted-foreground">[Donations, events, people helped (bar/pie charts)]</div>
        </CardContent>
      </Card>

      {/* Testimonials Placeholder */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Testimonials</h2>
          <div className="text-muted-foreground">[Upload stories/photos, display quotes]</div>
        </CardContent>
      </Card>

      {/* Documents Placeholder */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Documents</h2>
          <div className="text-muted-foreground">[Upload receipts/docs, generate/download certificates]</div>
        </CardContent>
      </Card>

      {/* Notifications Placeholder */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <div className="text-muted-foreground">[New activity notifications will go here]</div>
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
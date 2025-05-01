"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Calendar, CheckCircle, Award, Bell, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function VolunteerDashboardPage() {
  const [profileEdit, setProfileEdit] = useState(false);
  const [profile, setProfile] = useState({ name: "Aditi Verma", email: "aditi@email.com", location: "Delhi", age: 24, skills: "Teaching, Fundraising", interests: "Education, Environment" });

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

      {/* Upcoming Events Placeholder */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
          <div className="text-muted-foreground">[Events list/grid with filters and sign-up buttons will go here]</div>
        </CardContent>
      </Card>

      {/* My Commitments Placeholder */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">My Commitments</h2>
          <div className="text-muted-foreground">[List of events, status, hours, feedback will go here]</div>
        </CardContent>
      </Card>

      {/* Quick Sign-Up Placeholder */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Sign-Up</h2>
          <div className="text-muted-foreground">[Trending/urgent events sign-up buttons will go here]</div>
        </CardContent>
      </Card>

      {/* Badges & Certificates Placeholder */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Badges & Certificates</h2>
          <div className="text-muted-foreground">[Badges, milestones, downloadable certificates will go here]</div>
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
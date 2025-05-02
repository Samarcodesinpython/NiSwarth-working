"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Heart, Users, Landmark, Download, Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Carousel, CarouselItem } from "@/components/ui/carousel";

const donationHistory = [
  { date: "Nov 15, 2023", ngo: "Akshaya Patra Foundation", type: "Food", amount: 1000 },
  { date: "Oct 28, 2023", ngo: "CRY - Child Rights and You", type: "Education", amount: 500 },
  { date: "Oct 10, 2023", ngo: "Wildlife SOS", type: "Environment", amount: 750 },
  { date: "Sep 22, 2023", ngo: "Goonj", type: "Disaster Relief", amount: 2000 },
  { date: "Aug 30, 2023", ngo: "Smile Foundation", type: "Health", amount: 1200 },
  { date: "Jul 18, 2023", ngo: "GiveIndia", type: "General", amount: 800 },
  { date: "Jun 05, 2023", ngo: "HelpAge India", type: "Elderly Care", amount: 1500 },
];

const featuredNGOs = [
  { name: "Hope Foundation", image: "/images/ngos/hope-foundation.jpg", desc: "Providing food, education, and healthcare to underprivileged communities.", link: "#" },
  { name: "Green Earth Initiative", image: "/images/ngos/green-earth.jpg", desc: "Environmental conservation and community development.", link: "#" },
  { name: "Women Empowerment Trust", image: "/images/ngos/women-empowerment.jpg", desc: "Empowering women through education and livelihood.", link: "#" },
];

export default function DonorDashboardPage() {
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [profileEdit, setProfileEdit] = useState(false);
  const [profile, setProfile] = useState({ name: "", email: "", phone: "", payment: "" });
  const [donateAmount, setDonateAmount] = useState(100);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const user = JSON.parse(userInfo);
      setProfile((prev) => ({ ...prev, name: user.name, email: user.email }));
    }
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-1">Welcome back, {profile.name || "Donor"}!</h1>
        <p className="text-lg text-muted-foreground">Thank you for your generosity. Your contributions are making a real difference.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-md">
          <CardContent className="flex items-center gap-4 p-6">
            <Heart className="w-8 h-8 text-pink-500" />
            <div>
              <div className="text-2xl font-bold">₹12,500</div>
              <div className="text-sm text-muted-foreground">Total Donated</div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="flex items-center gap-4 p-6">
            <Users className="w-8 h-8 text-green-500" />
            <div>
              <div className="text-2xl font-bold">250+</div>
              <div className="text-sm text-muted-foreground">People Helped</div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="flex items-center gap-4 p-6">
            <Landmark className="w-8 h-8 text-blue-500" />
            <div>
              <div className="text-2xl font-bold">8</div>
              <div className="text-sm text-muted-foreground">NGOs Supported</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Donate */}
      <div className="bg-card rounded-xl p-6 shadow-md flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">Quick Donate</h2>
          <div className="flex gap-2 flex-wrap">
            {[100, 500, 1000, 5000].map((amt) => (
              <Button key={amt} variant="secondary" onClick={() => { setDonateAmount(amt); setDonateModalOpen(true); }}>₹{amt}</Button>
            ))}
            <Button variant="outline" onClick={() => setDonateModalOpen(true)}>Custom Amount</Button>
          </div>
        </div>
        <Button className="bg-primary text-white mt-4 md:mt-0" onClick={() => setDonateModalOpen(true)}>Donate Now</Button>
      </div>

      {/* Quick Donate Modal */}
      <Dialog open={donateModalOpen} onOpenChange={setDonateModalOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Quick Donate</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input type="number" min={1} value={donateAmount} onChange={e => setDonateAmount(Number(e.target.value))} placeholder="Enter amount" />
            <div className="flex flex-col items-center">
              <img src="/images/qr-placeholder.png" alt="QR Code" className="w-32 h-32 rounded" />
              <span className="text-xs text-muted-foreground mt-2">Scan to pay</span>
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full" onClick={() => setDonateModalOpen(false)}>Confirm Donation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Donation History Table */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Donation History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b border-border">
                  <th className="py-2 pr-4">NGO Name</th>
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-4">Category</th>
                  <th className="py-2 pr-4">Amount</th>
                  <th className="py-2">Receipt</th>
                </tr>
              </thead>
              <tbody>
                {donationHistory.map((row, i) => (
                  <tr key={i} className="border-b border-border hover:bg-accent/30">
                    <td className="py-2 pr-4 font-medium">{row.ngo}</td>
                    <td className="py-2 pr-4">{row.date}</td>
                    <td className="py-2 pr-4"><span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">{row.type}</span></td>
                    <td className="py-2 pr-4 font-semibold">₹{row.amount.toLocaleString()}</td>
                    <td className="py-2">
                      <Button variant="ghost" size="icon" aria-label="Download Receipt">
                        <Download className="w-5 h-5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Featured NGOs Carousel/Grid */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Featured NGOs</h2>
          <Carousel className="w-full">
            {featuredNGOs.map((ngo, i) => (
              <CarouselItem key={i} className="inline-block w-full md:w-1/2 lg:w-1/3 px-2">
                <div className="bg-muted rounded-lg shadow p-4 flex flex-col items-center">
                  <img src={ngo.image} alt={ngo.name} className="w-32 h-32 object-cover rounded mb-2" />
                  <div className="font-semibold text-lg mb-1">{ngo.name}</div>
                  <div className="text-sm text-muted-foreground mb-2 text-center">{ngo.desc}</div>
                  <Button className="w-full">Donate Now</Button>
                </div>
              </CarouselItem>
            ))}
          </Carousel>
        </CardContent>
      </Card>

      {/* Editable Profile Section */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Profile</h2>
            <Button variant="ghost" size="icon" onClick={() => setProfileEdit((v) => !v)}>
              <Pencil className="w-5 h-5" />
            </Button>
          </div>
          {profileEdit ? (
            <form className="space-y-4">
              <Input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} placeholder="Name" />
              <Input value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} placeholder="Email" />
              <Input value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} placeholder="Phone" />
              <Input value={profile.payment} onChange={e => setProfile({ ...profile, payment: e.target.value })} placeholder="Payment Preference" />
              <Button className="w-full" onClick={e => { e.preventDefault(); setProfileEdit(false); }}>Save</Button>
            </form>
          ) : (
            <div className="space-y-2">
              <div><span className="font-medium">Name:</span> {profile.name}</div>
              <div><span className="font-medium">Email:</span> {profile.email}</div>
              <div><span className="font-medium">Phone:</span> {profile.phone}</div>
              <div><span className="font-medium">Payment:</span> {profile.payment}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 
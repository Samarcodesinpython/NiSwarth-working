"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Download } from "lucide-react";

const sampleDonations = [
  { id: 1, donor: "Rahul Sharma", amount: 2500, date: "2024-05-01", status: true },
  { id: 2, donor: "Aditi Verma", amount: 1000, date: "2024-04-28", status: false },
  { id: 3, donor: "John Doe", amount: 500, date: "2024-04-20", status: true },
  { id: 4, donor: "Priya Singh", amount: 1500, date: "2024-04-15", status: false },
];

export default function NGODonationsPage() {
  const [donations, setDonations] = useState(sampleDonations);

  const toggleStatus = (id: number) => {
    setDonations((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: !d.status } : d))
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Donation Management</h1>
      <Card className="shadow-md">
        <CardContent className="p-6 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b border-border">
                <th className="py-2 pr-4">Donor Name</th>
                <th className="py-2 pr-4">Amount</th>
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Fulfilled</th>
                <th className="py-2">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation.id} className="border-b border-border hover:bg-accent/30">
                  <td className="py-2 pr-4 font-medium">{donation.donor}</td>
                  <td className="py-2 pr-4 font-semibold">₹{donation.amount.toLocaleString()}</td>
                  <td className="py-2 pr-4">{donation.date}</td>
                  <td className="py-2 pr-4">
                    <Switch checked={donation.status} onCheckedChange={() => toggleStatus(donation.id)} />
                  </td>
                  <td className="py-2">
                    <Button variant="ghost" size="icon" aria-label="Download Receipt">
                      <Download className="w-5 h-5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
} 
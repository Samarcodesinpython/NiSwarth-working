"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const sampleVolunteers = [
  { id: 1, name: "Aditi Verma", event: "Tree Plantation Drive", hours: 8, status: "approved" },
  { id: 2, name: "Rahul Sharma", event: "Health Camp", hours: 5, status: "pending" },
  { id: 3, name: "Priya Singh", event: "Fundraiser Marathon", hours: 10, status: "approved" },
  { id: 4, name: "John Doe", event: "Clean City Campaign", hours: 4, status: "pending" },
];

export default function NGOVolunteersPage() {
  const [volunteers, setVolunteers] = useState(sampleVolunteers);

  const updateStatus = (id: number, newStatus: "approved" | "pending") => {
    setVolunteers((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: newStatus } : v))
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Volunteer Management</h1>
      <Card className="shadow-md">
        <CardContent className="p-6 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b border-border">
                <th className="py-2 pr-4">Volunteer Name</th>
                <th className="py-2 pr-4">Event</th>
                <th className="py-2 pr-4">Hours</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((vol) => (
                <tr key={vol.id} className="border-b border-border hover:bg-accent/30">
                  <td className="py-2 pr-4 font-medium">{vol.name}</td>
                  <td className="py-2 pr-4">{vol.event}</td>
                  <td className="py-2 pr-4">{vol.hours}</td>
                  <td className="py-2 pr-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${vol.status === "approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {vol.status.charAt(0).toUpperCase() + vol.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-2 space-x-2">
                    <Button size="sm" variant="outline" onClick={() => updateStatus(vol.id, "approved")} disabled={vol.status === "approved"}>Approve</Button>
                    <Button size="sm" variant="destructive" onClick={() => updateStatus(vol.id, "pending")} disabled={vol.status === "pending"}>Reject</Button>
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
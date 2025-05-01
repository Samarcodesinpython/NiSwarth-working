"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";

const sampleCampaigns = [
  { id: 1, name: "Clean Water for All", goal: 10000, raised: 8500, urgent: true },
  { id: 2, name: "Tree Plantation Drive", goal: 5000, raised: 5000, urgent: false },
  { id: 3, name: "Education for Every Child", goal: 20000, raised: 12000, urgent: true },
];

export default function NGOCampaignsPage() {
  const [campaigns, setCampaigns] = useState(sampleCampaigns);
  const [editOpen, setEditOpen] = useState(false);
  const [editCampaign, setEditCampaign] = useState<number | null>(null);
  const [editValues, setEditValues] = useState({ name: "", goal: 0, raised: 0, urgent: false });

  const openEdit = (campaign: typeof sampleCampaigns[number]) => {
    setEditCampaign(campaign.id);
    setEditValues({ ...campaign });
    setEditOpen(true);
  };

  const saveEdit = () => {
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === editCampaign ? { ...c, ...editValues } : c
      )
    );
    setEditOpen(false);
    setEditCampaign(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Fundraisers & Campaigns</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((c) => {
          const percent = Math.min(100, Math.round((c.raised / c.goal) * 100));
          return (
            <Card key={c.id} className="shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-lg">{c.name}</div>
                  {c.urgent && <Badge variant="destructive">Urgent</Badge>}
                </div>
                <div className="mb-2 text-sm text-muted-foreground">Goal: ₹{c.goal.toLocaleString()}</div>
                <div className="mb-2 text-sm">Raised: <span className="font-semibold">₹{c.raised.toLocaleString()}</span></div>
                <div className="w-full h-3 bg-muted rounded-full mb-2">
                  <div className="h-3 rounded-full bg-primary" style={{ width: percent + "%" }} />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{percent}% funded</span>
                  <Button size="sm" variant="outline" onClick={() => openEdit(c)}><Pencil className="w-4 h-4 mr-1" />Edit</Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Campaign</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input value={editValues.name} onChange={e => setEditValues(v => ({ ...v, name: e.target.value }))} placeholder="Campaign Name" />
            <Input type="number" value={editValues.goal} onChange={e => setEditValues(v => ({ ...v, goal: Number(e.target.value) }))} placeholder="Goal Amount" />
            <Input type="number" value={editValues.raised} onChange={e => setEditValues(v => ({ ...v, raised: Number(e.target.value) }))} placeholder="Amount Raised" />
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={editValues.urgent} onChange={e => setEditValues(v => ({ ...v, urgent: e.target.checked }))} />
              <span>Urgent</span>
            </label>
          </div>
          <DialogFooter>
            <Button className="w-full" onClick={saveEdit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 
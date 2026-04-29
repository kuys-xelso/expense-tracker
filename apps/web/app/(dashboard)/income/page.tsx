"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function IncomePage() {
  return (
    <div className="flex flex-col gap-8 p-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight">Income</h1>
          <p className="text-muted-foreground text-lg">
            Track and manage your income sources.
          </p>
        </div>
        <Button size="lg" className="shadow-lg hover:shadow-xl transition-all">
          <Plus className="mr-2 h-5 w-5" />
          Add Income
        </Button>
      </div>

      <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm ring-1 ring-foreground/5">
        <CardHeader>
          <CardTitle>Recent Income</CardTitle>
          <CardDescription>A list of your recent earnings.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-20 flex flex-col items-center justify-center gap-4 border-2 border-dashed rounded-2xl bg-muted/10 opacity-60">
            <p className="text-muted-foreground font-medium">No income records found.</p>
            <Button variant="outline">Import Transactions</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, Filter } from "lucide-react";
import { useState } from "react";

interface ActionItem {
  id: number;
  text: string;
  assignee: string;
  due: string;
  meeting: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
}

const initialItems: ActionItem[] = [
  { id: 1, text: "Set up TypeScript strict config", assignee: "Sarah", due: "Mar 12", meeting: "Sprint Planning Q1", priority: "High", completed: false },
  { id: 2, text: "Draft JD for frontend engineer role", assignee: "Mike", due: "Mar 10", meeting: "Sprint Planning Q1", priority: "High", completed: false },
  { id: 3, text: "Create mobile app beta TestFlight build", assignee: "John", due: "Mar 28", meeting: "Sprint Planning Q1", priority: "Medium", completed: false },
  { id: 4, text: "Update design system documentation", assignee: "Emily", due: "Mar 15", meeting: "Design Review", priority: "Medium", completed: true },
  { id: 5, text: "Send Acme Co onboarding materials", assignee: "John", due: "Mar 9", meeting: "Client Onboarding", priority: "High", completed: false },
  { id: 6, text: "Schedule investor demo", assignee: "Sarah", due: "Mar 20", meeting: "Investor Update", priority: "Low", completed: false },
];

const priorityColors: Record<string, string> = {
  High: "bg-destructive/10 text-destructive",
  Medium: "bg-warning/10 text-warning",
  Low: "bg-muted text-muted-foreground",
};

const ActionItems = () => {
  const [items, setItems] = useState(initialItems);

  const toggleItem = (id: number) => {
    setItems(items.map((item) => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const pending = items.filter((i) => !i.completed);
  const completed = items.filter((i) => i.completed);

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Action Items</h1>
            <p className="text-sm text-muted-foreground mt-1">{pending.length} pending · {completed.length} completed</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Filter className="h-4 w-4" /> Filter</Button>
            <Button variant="hero" size="sm"><Plus className="h-4 w-4" /> Add Item</Button>
          </div>
        </div>

        {/* Pending */}
        <Card className="shadow-sm divide-y divide-border">
          {pending.map((item) => (
            <div key={item.id} className="flex items-start gap-3 p-4 hover:bg-muted/30 transition-colors">
              <Checkbox
                checked={item.completed}
                onCheckedChange={() => toggleItem(item.id)}
                className="mt-0.5"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{item.text}</p>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                  <span>{item.assignee}</span>
                  <span>Due {item.due}</span>
                  <span>{item.meeting}</span>
                </div>
              </div>
              <Badge className={`text-xs ${priorityColors[item.priority]}`} variant="secondary">
                {item.priority}
              </Badge>
            </div>
          ))}
        </Card>

        {/* Completed */}
        {completed.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground mb-3">Completed</h2>
            <Card className="shadow-sm divide-y divide-border opacity-60">
              {completed.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-4">
                  <Checkbox
                    checked={item.completed}
                    onCheckedChange={() => toggleItem(item.id)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <p className="text-sm line-through">{item.text}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                      <span>{item.assignee}</span>
                      <span>{item.meeting}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default ActionItems;

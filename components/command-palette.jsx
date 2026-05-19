"use client";

import * as React from "react";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  LayoutDashboard,
  Wallet,
  PieChart,
  BrainCircuit,
  Search,
} from "lucide-react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command) => {
    setOpen(false);
    command();
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-xl mx-4">
        <Command
          className="rounded-xl border border-border bg-card text-card-foreground shadow-2xl overflow-hidden"
          shouldFilter={true}
        >
          <div className="flex items-center px-4 py-3 border-b border-border">
            <Search className="w-5 h-5 mr-2 text-muted-foreground" />
            <Command.Input
              autoFocus
              className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
              placeholder="Type a command or search..."
            />
          </div>

          <Command.List className="max-h-[300px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              <Command.Item
                className="flex items-center px-2 py-2.5 text-sm rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground aria-selected:bg-accent aria-selected:text-accent-foreground"
                onSelect={() => runCommand(() => router.push("/dashboard"))}
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Command.Item>
              <Command.Item
                className="flex items-center px-2 py-2.5 text-sm rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground aria-selected:bg-accent aria-selected:text-accent-foreground"
                onSelect={() => runCommand(() => router.push("/transaction/create"))}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Add Transaction
              </Command.Item>
              <Command.Item
                className="flex items-center px-2 py-2.5 text-sm rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground aria-selected:bg-accent aria-selected:text-accent-foreground"
                onSelect={() => runCommand(() => router.push("/account"))}
              >
                <Wallet className="w-4 h-4 mr-2" />
                Accounts
              </Command.Item>
            </Command.Group>

            <Command.Separator className="h-px bg-border my-1" />

            <Command.Group heading="AI Tools" className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              <Command.Item
                className="flex items-center px-2 py-2.5 text-sm rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground aria-selected:bg-accent aria-selected:text-accent-foreground"
                onSelect={() => runCommand(() => router.push("/dashboard#ai-insights"))}
              >
                <BrainCircuit className="w-4 h-4 mr-2 text-primary" />
                Ask Gemini Assistant
              </Command.Item>
            </Command.Group>
            
            <Command.Separator className="h-px bg-border my-1" />

            <Command.Group heading="Settings" className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              <Command.Item
                className="flex items-center px-2 py-2.5 text-sm rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground aria-selected:bg-accent aria-selected:text-accent-foreground"
                onSelect={() => runCommand(() => router.push("/settings"))}
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}

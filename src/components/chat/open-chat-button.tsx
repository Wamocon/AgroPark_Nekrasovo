"use client";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
export function OpenChatButton({ label = "AI-чат", compact = false, className }: { label?: string; compact?: boolean; className?: string }) { return <Button variant="outline" className={cn(compact ? "gap-2" : "h-auto flex-col gap-2 py-4", className)} onClick={() => window.dispatchEvent(new CustomEvent("agropark:open-chat"))}><Bot className="size-4" /><span>{label}</span></Button>; }

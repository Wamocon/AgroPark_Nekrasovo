"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";

interface OpenChatButtonProps {
  label?: string;
  className?: string;
  compact?: boolean;
}

export function OpenChatButton({
  label = "Chatbot",
  className,
  compact = false,
}: OpenChatButtonProps) {
  return (
    <Button
      variant="outline"
      className={cn(compact ? "gap-2" : "h-auto flex-col gap-2 py-4", className)}
      onClick={() => {
        window.dispatchEvent(new CustomEvent("agropark:open-chat"));
      }}
    >
      <MessageSquare className="size-5" />
      <span className={compact ? "text-sm" : "text-xs"}>{label}</span>
    </Button>
  );
}

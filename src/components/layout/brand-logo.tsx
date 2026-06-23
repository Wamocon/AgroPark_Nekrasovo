import Link from "next/link";
import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  href?: string;
}

export function BrandLogo({ className, href = "/" }: BrandLogoProps) {
  return (
    <Link
      href={href}
      className={cn("group flex items-center gap-3 text-emerald-950", className)}
      aria-label="AgroPark Nekrasovo Digital"
    >
      <span className="flex size-9 items-center justify-center rounded-lg border border-amber-500/25 bg-amber-50 text-amber-700 shadow-sm transition-transform group-hover:-rotate-6">
        <Leaf className="size-5" />
      </span>
      <span className="leading-none">
        <span className="block text-sm font-black tracking-tight">AgroPark Nekrasovo</span>
        <span className="mt-1 block text-[10px] font-black uppercase text-emerald-700">
          Digital
        </span>
      </span>
    </Link>
  );
}

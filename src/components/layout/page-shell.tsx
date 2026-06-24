import { Navbar } from "./navbar";
import { Footer } from "./footer";

interface PageShellProps {
 children: React.ReactNode;
 className?: string;
}

export function PageShell({ children, className }: PageShellProps) {
 return (
 <>
 <Navbar />
 <main className={`flex-1 pt-28 md:pt-20 ${className ?? ""}`}>{children}</main>
 <Footer />
 </>
 );
}

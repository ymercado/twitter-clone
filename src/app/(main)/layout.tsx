import { Sidebar } from "@/components/sidebar";
import { RightSidebar } from "@/components/right-sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex justify-center">
      {/* Container with max width */}
      <div className="w-full max-w-[1300px] flex">
        {/* Left Sidebar - Fixed */}
        <aside className="hidden sm:flex w-[68px] xl:w-[275px] flex-shrink-0">
          <div className="fixed h-screen w-[68px] xl:w-[275px] flex flex-col border-r border-border">
            <Sidebar />
          </div>
        </aside>

        {/* Main Content - Scrollable */}
        <main className="flex-1 min-w-0 border-r border-border">
          {children}
        </main>

        {/* Right Sidebar - Sticky */}
        <aside className="hidden lg:block w-[350px] flex-shrink-0">
          <div className="sticky top-0 h-screen overflow-y-auto px-4">
            <RightSidebar />
          </div>
        </aside>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 h-14 bg-background border-t border-border flex items-center justify-around px-4 z-50">
        <MobileNavItem href="/home" icon="home" label="Home" />
        <MobileNavItem href="/explore" icon="search" label="Search" />
        <MobileNavItem href="/profile" icon="user" label="Profile" />
      </nav>
    </div>
  );
}

function MobileNavItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: string;
  label: string;
}) {
  return (
    <a
      href={href}
      className="flex flex-col items-center justify-center p-2 text-text-secondary hover:text-text-primary transition-colors"
      aria-label={label}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {icon === "home" && (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        )}
        {icon === "search" && (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        )}
        {icon === "user" && (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        )}
      </svg>
    </a>
  );
}

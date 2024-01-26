import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ModeToggle } from "@/components/ModeToggle";
import { getAuthSession } from "@/lib/auth/utils";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getAuthSession();
  return (
    <div className="flex h-screen bg-yellow-50 w-full cursor-default">
      <Sidebar />
      <main className="flex-1 md:p-8 pt-2 p-8 overflow-y-auto w-full">
        <Navbar />
        {children}
      </main>
      {session && (
        <div className="absolute right-10 bottom-10">
          <ModeToggle />
        </div>
      )}
    </div>
  );
}

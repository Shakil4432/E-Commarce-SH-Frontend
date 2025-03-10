import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Inter, Roboto } from "next/font/google";
import { ReactNode } from "react";
const roboto = Roboto({ subsets: ["latin"] });
export default function DashboardPage({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb></Breadcrumb>
          </div>
        </header>
        <div
          className={`${roboto.className} flex flex-1 flex-col gap-4 p-4 pt-0`}
        >
          <div
            className={`${roboto.className} min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min`}
          >
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

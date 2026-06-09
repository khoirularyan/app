import { Bell, Search, HelpCircle, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { company } from "@/data/mockData";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const Header = () => {
  return (
    <header
      data-testid="app-header"
      className="h-14 bg-white border-b border-[#DFE3E8] flex items-center px-6 sticky top-0 z-30"
    >
      {/* Plant context */}
      <div className="flex items-center gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-[#59687A] leading-none">Plant</div>
          <div className="text-[13px] font-semibold text-[#1C252E] leading-tight">{company.plant}</div>
        </div>
        <div className="w-px h-8 bg-[#DFE3E8]" />
        <div>
          <div className="text-[11px] uppercase tracking-wider text-[#59687A] leading-none">Shift Aktif</div>
          <div className="text-[13px] font-semibold text-[#107E3E] leading-tight">{company.shift}</div>
        </div>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#59687A]" />
          <Input
            data-testid="global-search"
            placeholder="Cari order, produk, customer..."
            className="pl-9 h-9 bg-[#F4F6F8] border-[#DFE3E8] text-sm focus-visible:ring-1 focus-visible:ring-[#0A6ED1]"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1 ml-auto">
        <button
          data-testid="header-help"
          className="w-9 h-9 flex items-center justify-center text-[#59687A] hover:bg-[#F4F6F8] rounded transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
        <button
          data-testid="header-notifications"
          className="w-9 h-9 flex items-center justify-center text-[#59687A] hover:bg-[#F4F6F8] rounded transition-colors relative"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#B00020] rounded-full" />
        </button>
        <button
          data-testid="header-settings"
          className="w-9 h-9 flex items-center justify-center text-[#59687A] hover:bg-[#F4F6F8] rounded transition-colors"
        >
          <Settings className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-[#DFE3E8] mx-2" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              data-testid="header-user-menu"
              className="flex items-center gap-2 h-9 px-2 hover:bg-[#F4F6F8] rounded transition-colors"
            >
              <Avatar className="w-7 h-7">
                <AvatarImage src="https://images.unsplash.com/photo-1603696774905-83ae340e2cae?crop=entropy&cs=srgb&fm=jpg&q=85&w=64" alt={company.operator} />
                <AvatarFallback className="text-xs bg-[#0A6ED1] text-white">BS</AvatarFallback>
              </Avatar>
              <div className="text-left hidden md:block">
                <div className="text-[12px] font-medium text-[#1C252E] leading-tight">{company.operator}</div>
                <div className="text-[10px] text-[#59687A] leading-tight">Plant Manager</div>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem data-testid="menu-profile">Profil</DropdownMenuItem>
            <DropdownMenuItem data-testid="menu-preferences">Preferensi</DropdownMenuItem>
            <DropdownMenuItem data-testid="menu-shift">Ganti Shift</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem data-testid="menu-logout" className="text-[#B00020]">Keluar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;

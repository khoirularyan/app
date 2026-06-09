import { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import StatusBadge from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { productionOrders } from "@/data/mockData";
import { Plus, Search, Filter, Download, Eye } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProductionOrders = () => {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = productionOrders.filter((o) => {
    const q = query.toLowerCase();
    const ok = o.no.toLowerCase().includes(q) || o.produk.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q);
    const okStatus = statusFilter === "all" || o.status === statusFilter;
    return ok && okStatus;
  });

  const statuses = ["all", "Direncanakan", "Casting", "Curing", "Demoulding", "QC", "Selesai"];

  return (
    <div>
      <PageHeader
        title="Order Produksi"
        subtitle="Daftar lengkap order produksi pabrik Precast"
        breadcrumbs={["Beranda", "Order Produksi"]}
        testId="po-page-header"
        actions={
          <>
            <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5"><Download className="w-3.5 h-3.5" />Ekspor</Button>
            <Button size="sm" className="h-8 text-xs gap-1.5 bg-[#0A6ED1] hover:bg-[#0854A1]" data-testid="btn-create-po"><Plus className="w-3.5 h-3.5" />Order Baru</Button>
          </>
        }
      />
      <div className="p-6 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {[
            { label: "Total Order", value: 10, color: "#1C252E" },
            { label: "Direncanakan", value: 1, color: "#59687A" },
            { label: "Casting", value: 1, color: "#0A6ED1" },
            { label: "Curing", value: 3, color: "#E9730C" },
            { label: "QC", value: 1, color: "#0070F2" },
            { label: "Selesai", value: 3, color: "#107E3E" },
          ].map((s, i) => (
            <div key={i} className="bg-white border border-[#DFE3E8] rounded-md p-3" data-testid={`po-stat-${i}`}>
              <div className="text-[10px] uppercase tracking-wider text-[#59687A] font-semibold">{s.label}</div>
              <div className="text-xl font-semibold font-mono-num mt-0.5" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white border border-[#DFE3E8] rounded-md overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#DFE3E8] gap-3">
            <div className="relative w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#59687A]" />
              <Input
                data-testid="po-search"
                placeholder="Cari order, produk, customer..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 h-8 text-xs bg-[#F4F6F8] border-[#DFE3E8]"
              />
            </div>
            <div className="flex gap-2 items-center ml-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-8 w-40 text-xs" data-testid="po-status-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((s) => (
                    <SelectItem key={s} value={s} className="text-xs">{s === "all" ? "Semua Status" : s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5"><Filter className="w-3.5 h-3.5" />Filter</Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full mes-table">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">No. Order</th>
                  <th className="px-4 py-2 text-left">Produk</th>
                  <th className="px-4 py-2 text-right">Qty</th>
                  <th className="px-4 py-2 text-left">Line</th>
                  <th className="px-4 py-2 text-left">Customer</th>
                  <th className="px-4 py-2 text-left">Periode</th>
                  <th className="px-4 py-2 text-left w-48">Progress</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Prioritas</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o, i) => (
                  <tr key={o.no} data-testid={`po-row-${i}`}>
                    <td className="px-4 font-mono-num text-[#0A6ED1] font-medium">{o.no}</td>
                    <td className="px-4 font-medium">{o.produk}</td>
                    <td className="px-4 text-right font-mono-num">{o.qty}</td>
                    <td className="px-4">{o.line}</td>
                    <td className="px-4 text-[#59687A]">{o.customer}</td>
                    <td className="px-4 font-mono-num text-[#59687A] text-[12px]">{o.tglMulai}<br/>→ {o.tglSelesai}</td>
                    <td className="px-4">
                      <div className="flex items-center gap-2">
                        <Progress value={o.progress} className="h-1.5 flex-1" />
                        <span className="font-mono-num text-xs text-[#1C252E] w-9 text-right">{o.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4"><StatusBadge status={o.status} /></td>
                    <td className="px-4"><StatusBadge status={o.prioritas} /></td>
                    <td className="px-4">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0" data-testid={`po-view-${i}`}>
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionOrders;

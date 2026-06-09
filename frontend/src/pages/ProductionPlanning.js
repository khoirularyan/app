import PageHeader from "@/components/shared/PageHeader";
import StatusBadge from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { planningRows } from "@/data/mockData";
import { ChevronLeft, ChevronRight, Plus, Download } from "lucide-react";

const days = ["Sen 10", "Sel 11", "Rab 12", "Kam 13", "Jum 14", "Sab 15", "Min 16", "Sen 17"];

const lineColor = {
  "LINE-A": "#0A6ED1",
  "LINE-B": "#107E3E",
  "LINE-C": "#E9730C",
  "LINE-D": "#59687A",
};

const ProductionPlanning = () => {
  return (
    <div>
      <PageHeader
        title="Perencanaan Produksi"
        subtitle="Penjadwalan order produksi per line — Minggu 7, Februari 2026"
        breadcrumbs={["Beranda", "Perencanaan Produksi"]}
        testId="planning-page-header"
        actions={
          <>
            <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5"><Download className="w-3.5 h-3.5" />Ekspor Jadwal</Button>
            <Button size="sm" className="h-8 text-xs gap-1.5 bg-[#0A6ED1] hover:bg-[#0854A1]"><Plus className="w-3.5 h-3.5" />Order Baru</Button>
          </>
        }
      />
      <div className="p-6 space-y-4">
        {/* Date controls */}
        <div className="bg-white border border-[#DFE3E8] rounded-md p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-7 w-7 p-0"><ChevronLeft className="w-3.5 h-3.5" /></Button>
            <div className="text-sm font-medium text-[#1C252E]">10 — 16 Februari 2026</div>
            <Button variant="outline" size="sm" className="h-7 w-7 p-0"><ChevronRight className="w-3.5 h-3.5" /></Button>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-7 text-xs">Harian</Button>
            <Button size="sm" className="h-7 text-xs bg-[#0A6ED1] hover:bg-[#0854A1]">Mingguan</Button>
            <Button variant="outline" size="sm" className="h-7 text-xs">Bulanan</Button>
          </div>
        </div>

        {/* Gantt */}
        <div className="bg-white border border-[#DFE3E8] rounded-md overflow-x-auto" data-testid="gantt-chart">
          <div className="min-w-[900px]">
            {/* Header */}
            <div className="grid grid-cols-[280px_repeat(8,1fr)] border-b border-[#DFE3E8] bg-[#F4F6F8]">
              <div className="px-4 py-2 text-[10px] uppercase tracking-wider text-[#59687A] font-semibold border-r border-[#DFE3E8]">Order / Line</div>
              {days.map((d, i) => (
                <div key={i} className="px-2 py-2 text-[10px] uppercase tracking-wider text-[#59687A] font-semibold text-center border-r border-[#DFE3E8] last:border-r-0">{d}</div>
              ))}
            </div>
            {/* Rows */}
            {planningRows.map((row, i) => (
              <div key={i} data-testid={`gantt-row-${i}`} className="grid grid-cols-[280px_repeat(8,1fr)] border-b border-[#EEF0F2] hover:bg-[#F8FAFC]">
                <div className="px-4 py-3 border-r border-[#DFE3E8]">
                  <div className="text-xs font-mono-num text-[#0A6ED1] font-medium">{row.no}</div>
                  <div className="text-[13px] text-[#1C252E] truncate">{row.produk}</div>
                  <div className="text-[10px] text-[#59687A]">{row.line}</div>
                </div>
                <div className="relative col-span-8 h-14">
                  <div className="absolute inset-0 grid grid-cols-8">
                    {Array.from({ length: 8 }).map((_, k) => (
                      <div key={k} className="border-r border-[#EEF0F2] last:border-r-0" />
                    ))}
                  </div>
                  <div
                    className="absolute top-3 h-8 rounded text-white text-[11px] px-2 flex items-center font-medium shadow-sm"
                    style={{
                      left: `${(row.start / 8) * 100}%`,
                      width: `${(row.duration / 8) * 100}%`,
                      backgroundColor: lineColor[row.line] || "#0A6ED1",
                      opacity: row.status === "Selesai" ? 0.6 : 1,
                    }}
                  >
                    <span className="truncate">{row.no}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 px-2">
          {Object.entries(lineColor).map(([k, v]) => (
            <div key={k} className="flex items-center gap-1.5 text-xs text-[#59687A]">
              <span className="w-3 h-3 rounded" style={{ backgroundColor: v }} />
              {k}
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-white border border-[#DFE3E8] rounded-md p-4">
            <div className="text-[11px] uppercase tracking-wider text-[#59687A] font-semibold">Total Order Aktif</div>
            <div className="text-2xl font-semibold text-[#1C252E] font-mono-num mt-1">8</div>
          </div>
          <div className="bg-white border border-[#DFE3E8] rounded-md p-4">
            <div className="text-[11px] uppercase tracking-wider text-[#59687A] font-semibold">Sedang Berjalan</div>
            <div className="text-2xl font-semibold text-[#0A6ED1] font-mono-num mt-1">5</div>
          </div>
          <div className="bg-white border border-[#DFE3E8] rounded-md p-4">
            <div className="text-[11px] uppercase tracking-wider text-[#59687A] font-semibold">Direncanakan</div>
            <div className="text-2xl font-semibold text-[#E9730C] font-mono-num mt-1">2</div>
          </div>
          <div className="bg-white border border-[#DFE3E8] rounded-md p-4">
            <div className="text-[11px] uppercase tracking-wider text-[#59687A] font-semibold">Selesai Minggu Ini</div>
            <div className="text-2xl font-semibold text-[#107E3E] font-mono-num mt-1">1</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionPlanning;

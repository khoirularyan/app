import PageHeader from "@/components/shared/PageHeader";
import StatusBadge from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { productionOrders, productionLines } from "@/data/mockData";
import { ArrowRight } from "lucide-react";
import { ProcessIcon } from "@/components/visuals/ProcessIcons";
import ProductIcon from "@/components/visuals/ProductIcon";

const stages = [
  { id: "casting",    label: "Casting",         color: "#0A6ED1" },
  { id: "curing",     label: "Curing",          color: "#E9730C" },
  { id: "demoulding", label: "Demoulding",      color: "#0070F2" },
  { id: "qc",         label: "Quality Control", color: "#107E3E" },
];

const ProductionExecution = () => {
  const active = productionOrders.filter((o) => o.status !== "Selesai" && o.status !== "Direncanakan");

  return (
    <div>
      <PageHeader
        title="Eksekusi Produksi"
        subtitle="Pemantauan real-time proses casting, curing, demoulding & QC"
        breadcrumbs={["Beranda", "Eksekusi Produksi"]}
        testId="exec-page-header"
      />
      <div className="p-6 space-y-6">
        {/* Global Process Status — 5-stage live pipeline */}
        <div className="bg-white border border-[#DFE3E8] rounded-md overflow-hidden" data-testid="global-process-status">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#DFE3E8] bg-gradient-to-r from-[#F8FAFC] to-white">
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#0A6ED1] font-semibold">Live Pipeline</div>
              <div className="text-base font-display font-semibold text-[#1C252E]">Global Process Status</div>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#59687A]">
              <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#5DCB7E] animate-pulse" />Real-time · Auto-refresh 5s</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5">
            {[
              { id: "batching",  label: "Batching",   color: "#0A6ED1", inQ: 18, outQ: 16, wait: 4, util: 88 },
              { id: "casting",   label: "Casting",    color: "#0070F2", inQ: 16, outQ: 14, wait: 8, util: 72 },
              { id: "curing",    label: "Curing",     color: "#E9730C", inQ: 14, outQ: 0,  wait: 248, util: 95 },
              { id: "finishing", label: "Finishing",  color: "#107E3E", inQ: 22, outQ: 20, wait: 12, util: 64 },
              { id: "storage",   label: "Storage",    color: "#59687A", inQ: 20, outQ: 18, wait: 0,  util: 92 },
            ].map((s, i, arr) => (
              <div key={s.id} data-testid={`pipeline-${s.id}`} className="relative px-4 py-4 border-r border-[#EEF0F2] last:border-r-0 group hover:bg-[#F8FAFC] transition-colors">
                {/* Stage number bubble */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: s.color }}>
                      {i + 1}
                    </span>
                    <span className="text-sm font-semibold text-[#1C252E]">{s.label}</span>
                  </div>
                  {/* Pulse dot */}
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: s.color }} />
                </div>
                {/* Utilization bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-[10px] text-[#59687A] mb-1">
                    <span>Utilisasi</span>
                    <span className="font-mono-num font-semibold" style={{ color: s.color }}>{s.util}%</span>
                  </div>
                  <div className="h-1.5 bg-[#EEF0F2] rounded-full overflow-hidden">
                    <div className="h-full transition-all" style={{ width: `${s.util}%`, backgroundColor: s.color }} />
                  </div>
                </div>
                {/* In/Out/Waiting */}
                <div className="grid grid-cols-3 gap-1 text-center">
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-[#59687A] font-semibold">In</div>
                    <div className="text-sm font-mono-num font-semibold text-[#1C252E]">{s.inQ}</div>
                  </div>
                  <div className="border-l border-r border-[#EEF0F2]">
                    <div className="text-[9px] uppercase tracking-wider text-[#59687A] font-semibold">Out</div>
                    <div className="text-sm font-mono-num font-semibold text-[#107E3E]">{s.outQ}</div>
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-[#59687A] font-semibold">Wait</div>
                    <div className="text-sm font-mono-num font-semibold text-[#E9730C]">{s.wait}</div>
                  </div>
                </div>
                {/* Arrow connector */}
                {i < arr.length - 1 && (
                  <div className="hidden md:flex absolute right-[-7px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 items-center justify-center bg-white border border-[#DFE3E8] rounded-full z-10">
                    <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1 1 L 5 4 L 1 7" stroke="#59687A" strokeWidth="1.4" fill="none" /></svg>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Bottom flow band */}
          <div className="h-1 bg-gradient-to-r from-[#0A6ED1] via-[#0070F2] via-30% via-[#E9730C] via-60% via-[#107E3E] via-85% to-[#59687A]" />
        </div>

        {/* Lines status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {productionLines.map((l, i) => (
            <div key={l.kode} data-testid={`line-card-${i}`} className="bg-white border border-[#DFE3E8] rounded-md p-4 overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#59687A] font-semibold">{l.kode}</div>
                  <div className="text-sm font-semibold text-[#1C252E] font-display">{l.nama}</div>
                </div>
                <StatusBadge status={l.status} />
              </div>
              <div className="text-xs text-[#59687A] mb-2">{l.produk}</div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-2xl font-semibold font-mono-num text-[#1C252E]">{l.output}</span>
                <span className="text-xs text-[#59687A]">/ {l.kapasitas} unit</span>
              </div>
              <Progress value={(l.output / l.kapasitas) * 100} className="h-1.5" />
              <div className="mt-3 text-xs text-[#59687A]">Supervisor: <span className="text-[#1C252E] font-medium">{l.supervisor}</span></div>
            </div>
          ))}
        </div>

        {/* Stage pipeline */}
        <div className="bg-white border border-[#DFE3E8] rounded-md p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-base font-semibold text-[#1C252E] font-display">Alur Proses Produksi</div>
              <div className="text-xs text-[#59687A]">Casting → Curing → Demoulding → Quality Control</div>
            </div>
          </div>
          <div className="flex items-stretch gap-2 overflow-x-auto">
            {stages.map((s, i) => {
              const count = active.filter((o) => o.status.toLowerCase() === s.label.toLowerCase() || (s.id === "qc" && o.status === "QC")).length;
              return (
                <div key={s.id} className="flex items-center gap-2 flex-shrink-0">
                  <div
                    className="relative border rounded-md p-4 min-w-[210px] overflow-hidden"
                    style={{ borderColor: s.color + "33", background: `linear-gradient(135deg, ${s.color}08 0%, #FFFFFF 60%)` }}
                    data-testid={`stage-${s.id}`}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-12 h-12 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: s.color + "12" }}>
                        <ProcessIcon stage={s.id} color={s.color} size="md" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] uppercase tracking-wider text-[#59687A] font-semibold">Tahap {i + 1}</div>
                        <div className="text-sm font-semibold text-[#1C252E]">{s.label}</div>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-semibold font-mono-num" style={{ color: s.color }}>{count}</span>
                      <span className="text-xs text-[#59687A]">order aktif</span>
                    </div>
                    {/* Bottom accent bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: s.color }} />
                  </div>
                  {i < stages.length - 1 && <ArrowRight className="w-4 h-4 text-[#59687A] flex-shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Orders */}
        <div className="bg-white border border-[#DFE3E8] rounded-md overflow-hidden">
          <div className="px-4 py-3 border-b border-[#DFE3E8]">
            <div className="text-base font-semibold text-[#1C252E] font-display">Order Sedang Berjalan</div>
            <div className="text-xs text-[#59687A]">Total {active.length} order aktif di lantai produksi</div>
          </div>
          <table className="w-full mes-table">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">No. PO</th>
                <th className="px-4 py-2 text-left">Produk</th>
                <th className="px-4 py-2 text-right">Qty</th>
                <th className="px-4 py-2 text-left">Line</th>
                <th className="px-4 py-2 text-left">Tahap Saat Ini</th>
                <th className="px-4 py-2 text-left w-64">Progress</th>
                <th className="px-4 py-2 text-left">Target Selesai</th>
              </tr>
            </thead>
            <tbody>
              {active.map((o, i) => (
                <tr key={o.no} data-testid={`exec-row-${i}`}>
                  <td className="px-4 font-mono-num text-[#0A6ED1] font-medium">{o.no}</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2">
                      <ProductIcon name={o.produk} size="sm" />
                      <span className="font-medium">{o.produk}</span>
                    </div>
                  </td>
                  <td className="px-4 text-right font-mono-num">{o.qty}</td>
                  <td className="px-4">{o.line}</td>
                  <td className="px-4"><StatusBadge status={o.status} /></td>
                  <td className="px-4">
                    <div className="flex items-center gap-2">
                      <Progress value={o.progress} className="h-1.5 flex-1" />
                      <span className="font-mono-num text-xs w-9 text-right">{o.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 font-mono-num text-[#59687A]">{o.tglSelesai}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductionExecution;

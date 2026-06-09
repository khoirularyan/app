import PageHeader from "@/components/shared/PageHeader";
import StatusBadge from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { productionOrders, productionLines } from "@/data/mockData";
import { ArrowRight } from "lucide-react";
import { ProcessIcon } from "@/components/visuals/ProcessIcons";
import ProductIcon from "@/components/visuals/ProductIcon";
import { ProductionLineIllustration } from "@/components/visuals/IndustrialVisuals";

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
              {/* Line illustration */}
              <div className="bg-[#F8FAFC] border border-[#EEF0F2] rounded mb-3 px-2 py-1">
                <ProductionLineIllustration status={l.status} utilisasi={(l.output / l.kapasitas) * 100} />
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

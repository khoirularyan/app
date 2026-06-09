import PageHeader from "@/components/shared/PageHeader";
import StatusBadge from "@/components/shared/StatusBadge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { curingBatches } from "@/data/mockData";
import { Thermometer, Droplets, Clock, Plus } from "lucide-react";
import FormDialog from "@/components/shared/FormDialog";

const CuringManagement = () => {
  return (
    <div>
      <PageHeader
        title="Curing Management"
        subtitle="Pemantauan proses curing — suhu, kelembaban, dan durasi per batch"
        breadcrumbs={["Beranda", "Curing"]}
        testId="curing-page-header"
        actions={
          <FormDialog
            testId="curing-create"
            title="Mulai Batch Curing Baru"
            description="Mulai proses curing untuk batch produk yang telah selesai casting"
            submitLabel="Mulai Curing"
            successMessage="Batch curing berhasil dimulai"
            fields={[
              { name: "po", label: "Order Produksi (PO)", type: "select", required: true, options: [
                { value: "PO-2026-0244", label: "PO-2026-0244 — Barrier NJ" },
                { value: "PO-2026-0243", label: "PO-2026-0243 — Box Culvert 1500" },
                { value: "PO-2026-0242", label: "PO-2026-0242 — U-Ditch 800" },
              ]},
              { name: "chamber", label: "Steam Chamber", type: "select", required: true, options: [
                { value: "Curing-A", label: "Chamber A" },
                { value: "Curing-B", label: "Chamber B" },
              ]},
              { name: "qty", label: "Jumlah Unit", type: "number", placeholder: "Mis. 24", required: true },
              { name: "suhu", label: "Setpoint Suhu (°C)", type: "number", placeholder: "65", required: true },
              { name: "kelembaban", label: "Setpoint Kelembaban (%)", type: "number", placeholder: "92" },
              { name: "durasi", label: "Durasi (jam)", type: "number", placeholder: "48" },
              { name: "catatan", label: "Catatan", type: "textarea", span: 2 },
            ]}
            trigger={
              <Button size="sm" className="h-8 text-xs gap-1.5 bg-[#0A6ED1] hover:bg-[#0854A1]"><Plus className="w-3.5 h-3.5" />Mulai Batch Baru</Button>
            }
          />
        }
      />
      <div className="p-6 space-y-6">
        {/* Chamber overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["Curing-A", "Curing-B"].map((chamber) => {
            const batches = curingBatches.filter((b) => b.chamber === chamber);
            const avgTemp = batches.reduce((s, b) => s + b.suhu, 0) / batches.length;
            const avgHum = batches.reduce((s, b) => s + b.kelembaban, 0) / batches.length;
            return (
              <div key={chamber} data-testid={`chamber-${chamber}`} className="bg-white border border-[#DFE3E8] rounded-md p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#59687A] font-semibold">Steam Chamber</div>
                    <div className="text-lg font-semibold text-[#1C252E] font-display">{chamber}</div>
                  </div>
                  <StatusBadge status="Running" />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="border-l-2 border-[#E9730C] pl-3">
                    <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#59687A] font-semibold">
                      <Thermometer className="w-3 h-3" /> Suhu Rata-rata
                    </div>
                    <div className="text-2xl font-semibold font-mono-num text-[#1C252E] mt-1">{avgTemp.toFixed(0)}°C</div>
                  </div>
                  <div className="border-l-2 border-[#0070F2] pl-3">
                    <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#59687A] font-semibold">
                      <Droplets className="w-3 h-3" /> Kelembaban
                    </div>
                    <div className="text-2xl font-semibold font-mono-num text-[#1C252E] mt-1">{avgHum.toFixed(0)}%</div>
                  </div>
                </div>
                <div className="text-xs text-[#59687A]">{batches.length} batch aktif • Total {batches.reduce((s, b) => s + b.qty, 0)} unit</div>
              </div>
            );
          })}
        </div>

        {/* Active batches */}
        <div className="bg-white border border-[#DFE3E8] rounded-md overflow-hidden">
          <div className="px-4 py-3 border-b border-[#DFE3E8] flex items-center justify-between">
            <div>
              <div className="text-base font-semibold text-[#1C252E] font-display">Batch Curing Aktif</div>
              <div className="text-xs text-[#59687A]">Standar PCI: 65-70°C selama 48 jam, kelembaban &gt;90%</div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 p-4">
            {curingBatches.map((b, i) => (
              <div key={b.batch} data-testid={`curing-batch-${i}`} className="border border-[#DFE3E8] rounded-md p-4 hover:border-[#0A6ED1] transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#59687A] font-semibold">{b.chamber}</div>
                    <div className="font-mono-num text-sm text-[#0A6ED1] font-medium">{b.batch}</div>
                    <div className="text-sm font-semibold text-[#1C252E] mt-0.5">{b.produk}</div>
                    <div className="text-xs text-[#59687A]">{b.qty} unit • PO {b.po}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#59687A] font-semibold">Suhu</div>
                    <div className="font-mono-num text-[#E9730C] font-semibold text-sm">{b.suhu}°C</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#59687A] font-semibold">Kelembaban</div>
                    <div className="font-mono-num text-[#0070F2] font-semibold text-sm">{b.kelembaban}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#59687A] font-semibold flex items-center gap-1"><Clock className="w-3 h-3" />Progress</div>
                    <div className="font-mono-num text-[#107E3E] font-semibold text-sm">{b.progress}%</div>
                  </div>
                </div>
                <Progress value={b.progress} className="h-1.5 mb-2" />
                <div className="flex items-center justify-between text-[11px] text-[#59687A] font-mono-num">
                  <span>Mulai: {b.mulai}</span>
                  <span>Selesai: {b.target}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuringManagement;

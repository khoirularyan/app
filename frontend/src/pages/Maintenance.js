import PageHeader from "@/components/shared/PageHeader";
import StatusBadge from "@/components/shared/StatusBadge";
import KPICard from "@/components/shared/KPICard";
import { Button } from "@/components/ui/button";
import { maintenanceLog, machines } from "@/data/mockData";
import { Wrench, AlertTriangle, CheckCircle2, Clock, Plus } from "lucide-react";
import FormDialog from "@/components/shared/FormDialog";

const Maintenance = () => {
  return (
    <div>
      <PageHeader
        title="Pemeliharaan"
        subtitle="Manajemen preventive & corrective maintenance mesin produksi"
        breadcrumbs={["Beranda", "Pemeliharaan"]}
        testId="maint-page-header"
        actions={
          <FormDialog
            testId="wo-create"
            title="Work Order Maintenance Baru"
            description="Buat work order pemeliharaan mesin"
            submitLabel="Buat Work Order"
            successMessage="Work Order maintenance berhasil dibuat"
            fields={[
              { name: "mesin", label: "Mesin", type: "select", required: true, options: machines.map(m => ({ value: m.kode, label: `${m.kode} — ${m.nama}` })) },
              { name: "tipe", label: "Tipe Maintenance", type: "select", required: true, options: [
                { value: "Preventif", label: "Preventif" },
                { value: "Korektif", label: "Korektif" },
                { value: "Prediktif", label: "Prediktif" },
              ]},
              { name: "prioritas", label: "Prioritas", type: "select", options: [
                { value: "Tinggi", label: "Tinggi" },
                { value: "Sedang", label: "Sedang" },
                { value: "Rendah", label: "Rendah" },
              ]},
              { name: "teknisi", label: "Teknisi", type: "select", options: [
                { value: "Tim Mekanik A", label: "Tim Mekanik A" },
                { value: "Tim Mekanik B", label: "Tim Mekanik B" },
                { value: "PT Mitra Servis", label: "PT Mitra Servis (Vendor)" },
              ]},
              { name: "tglMulai", label: "Tanggal Mulai", type: "date", required: true },
              { name: "estimasi", label: "Estimasi Selesai", type: "date" },
              { name: "masalah", label: "Masalah / Pekerjaan", type: "textarea", span: 2, required: true, placeholder: "Deskripsi masalah atau jenis pekerjaan maintenance" },
            ]}
            trigger={<Button size="sm" className="h-8 text-xs gap-1.5 bg-[#0A6ED1] hover:bg-[#0854A1]"><Plus className="w-3.5 h-3.5" />Work Order Baru</Button>}
          />
        }
      />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <KPICard testId="mt-kpi-active" label="Maintenance Berlangsung" value="1" unit="WO" icon={Wrench} accent="warning" />
          <KPICard testId="mt-kpi-due" label="Jatuh Tempo 7 Hari" value="2" unit="mesin" icon={AlertTriangle} accent="error" />
          <KPICard testId="mt-kpi-done" label="Selesai Bulan Ini" value="4" unit="WO" icon={CheckCircle2} accent="success" />
          <KPICard testId="mt-kpi-uptime" label="Uptime Mesin" value="96.8%" icon={Clock} accent="success" trend="up" trendValue="+1.2%" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* WO Log */}
          <div className="bg-white border border-[#DFE3E8] rounded-md overflow-hidden">
            <div className="px-4 py-3 border-b border-[#DFE3E8]">
              <div className="text-base font-semibold text-[#1C252E] font-display">Riwayat Work Order</div>
            </div>
            <table className="w-full mes-table">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">No.</th>
                  <th className="px-4 py-2 text-left">Mesin</th>
                  <th className="px-4 py-2 text-left">Tipe</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {maintenanceLog.map((m, i) => (
                  <tr key={m.no} data-testid={`mt-row-${i}`}>
                    <td className="px-4 font-mono-num text-[#0A6ED1] font-medium">{m.no}</td>
                    <td className="px-4">
                      <div className="font-medium text-[13px]">{m.nama}</div>
                      <div className="text-[11px] text-[#59687A] font-mono-num">{m.mesin}</div>
                    </td>
                    <td className="px-4">{m.tipe}</td>
                    <td className="px-4"><StatusBadge status={m.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Machine status */}
          <div className="bg-white border border-[#DFE3E8] rounded-md overflow-hidden">
            <div className="px-4 py-3 border-b border-[#DFE3E8]">
              <div className="text-base font-semibold text-[#1C252E] font-display">Status Mesin Pabrik</div>
            </div>
            <div className="divide-y divide-[#EEF0F2]">
              {machines.map((m, i) => (
                <div key={m.kode} data-testid={`mach-row-${i}`} className="px-4 py-3 flex items-center justify-between hover:bg-[#F8FAFC]">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-num text-[12px] text-[#0A6ED1] font-medium">{m.kode}</span>
                      <StatusBadge status={m.status} />
                    </div>
                    <div className="text-sm font-medium text-[#1C252E] mt-0.5">{m.nama}</div>
                    <div className="text-[11px] text-[#59687A]">{m.tipe} • {m.line}</div>
                  </div>
                  <div className="text-right text-[11px] text-[#59687A] flex-shrink-0">
                    <div>Next: <span className="font-mono-num text-[#1C252E]">{m.nextMaintenance}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full WO details */}
        <div className="bg-white border border-[#DFE3E8] rounded-md overflow-hidden">
          <div className="px-4 py-3 border-b border-[#DFE3E8]">
            <div className="text-base font-semibold text-[#1C252E] font-display">Detail Work Order</div>
          </div>
          <table className="w-full mes-table">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">No. WO</th>
                <th className="px-4 py-2 text-left">Mesin</th>
                <th className="px-4 py-2 text-left">Masalah / Pekerjaan</th>
                <th className="px-4 py-2 text-left">Teknisi</th>
                <th className="px-4 py-2 text-left">Mulai</th>
                <th className="px-4 py-2 text-left">Estimasi Selesai</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceLog.map((m, i) => (
                <tr key={m.no} data-testid={`mt-detail-${i}`}>
                  <td className="px-4 font-mono-num text-[#0A6ED1] font-medium">{m.no}</td>
                  <td className="px-4 font-medium">{m.nama}</td>
                  <td className="px-4">{m.masalah}</td>
                  <td className="px-4 text-[#59687A]">{m.teknisi}</td>
                  <td className="px-4 font-mono-num text-[#59687A]">{m.mulai}</td>
                  <td className="px-4 font-mono-num">{m.estimasi}</td>
                  <td className="px-4"><StatusBadge status={m.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;

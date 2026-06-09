import { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import StatusBadge from "@/components/shared/StatusBadge";
import KPICard from "@/components/shared/KPICard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { qcInspections, strengthTests, rejects, rejectByReason } from "@/data/mockData";
import { ShieldCheck, AlertTriangle, Activity, FlaskConical, Plus } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import FormDialog from "@/components/shared/FormDialog";
import { DefectIcon, QualityStamp, defectList, reasonToDefectKey } from "@/components/visuals/ProcessIcons";
import ProductIcon from "@/components/visuals/ProductIcon";

const COLORS = ["#0A6ED1", "#E9730C", "#107E3E", "#0070F2", "#B00020", "#59687A"];

const QualityControl = () => {
  const [tab, setTab] = useState("inspections");

  return (
    <div>
      <PageHeader
        title="Quality Control"
        subtitle="Inspeksi mutu beton, dimensi, dan manajemen produk reject"
        breadcrumbs={["Beranda", "Quality Control"]}
        testId="qc-page-header"
        actions={
          <FormDialog
            testId="qc-create"
            title="Inspeksi QC Baru"
            description="Catat hasil inspeksi quality control untuk batch produk"
            submitLabel="Simpan Inspeksi"
            successMessage="Inspeksi QC berhasil disimpan"
            fields={[
              { name: "po", label: "PO / Batch", type: "select", required: true, options: [
                { value: "PO-2026-0241", label: "PO-2026-0241 — U-Ditch 500" },
                { value: "PO-2026-0242", label: "PO-2026-0242 — U-Ditch 800" },
                { value: "PO-2026-0243", label: "PO-2026-0243 — Box Culvert 1500" },
              ]},
              { name: "jenis", label: "Jenis Inspeksi", type: "select", required: true, options: [
                { value: "dimensi", label: "Inspeksi Dimensi" },
                { value: "visual", label: "Inspeksi Visual" },
                { value: "kuatTekan", label: "Uji Kuat Tekan" },
                { value: "full", label: "Inspeksi Lengkap" },
              ]},
              { name: "qty", label: "Jumlah Diinspeksi", type: "number", required: true },
              { name: "lulus", label: "Jumlah Lulus", type: "number" },
              { name: "kuatTekan", label: "Kuat Tekan (MPa)", type: "number", placeholder: "Mis. 32.4" },
              { name: "inspektur", label: "Inspektur", type: "select", required: true, options: [
                { value: "Rina Kusumawati", label: "Rina Kusumawati" },
                { value: "Hendra Gunawan", label: "Hendra Gunawan" },
              ]},
              { name: "hasil", label: "Hasil", type: "select", options: [
                { value: "Lulus", label: "Lulus" },
                { value: "Lulus Bersyarat", label: "Lulus Bersyarat" },
                { value: "Reject", label: "Reject" },
              ]},
              { name: "catatan", label: "Catatan Inspeksi", type: "textarea", span: 2 },
            ]}
            trigger={
              <Button size="sm" className="h-8 text-xs gap-1.5 bg-[#0A6ED1] hover:bg-[#0854A1]"><Plus className="w-3.5 h-3.5" />Inspeksi Baru</Button>
            }
          />
        }
      />
      <div className="p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <KPICard testId="qc-kpi-lulus" label="Lulus QC Hari Ini" value="42" unit="unit" icon={ShieldCheck} accent="success" trend="up" trendValue="+12%" />
          <KPICard testId="qc-kpi-reject" label="Reject Hari Ini" value="6" unit="unit" icon={AlertTriangle} accent="error" trend="up" trendValue="+2 unit" />
          <KPICard testId="qc-kpi-rate" label="Reject Rate" value="2.1%" icon={Activity} accent="warning" trend="up" trendValue="+0.4%" />
          <KPICard testId="qc-kpi-strength" label="Avg. Kuat Tekan" value="32.4" unit="MPa" icon={FlaskConical} accent="default" trend="up" trendValue="+1.8%" />
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="bg-white border border-[#DFE3E8] p-1 h-auto">
            <TabsTrigger value="inspections" className="text-xs h-8">Inspeksi Produk</TabsTrigger>
            <TabsTrigger value="strength" className="text-xs h-8">Uji Kuat Tekan</TabsTrigger>
            <TabsTrigger value="rejects" className="text-xs h-8">Reject Management</TabsTrigger>
            <TabsTrigger value="analysis" className="text-xs h-8">Analisis Reject</TabsTrigger>
          </TabsList>

          <TabsContent value="inspections" className="mt-4">
            <div className="bg-white border border-[#DFE3E8] rounded-md overflow-hidden">
              <table className="w-full mes-table">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">No. QC</th>
                    <th className="px-4 py-2 text-left">PO</th>
                    <th className="px-4 py-2 text-left">Produk</th>
                    <th className="px-4 py-2 text-right">Qty</th>
                    <th className="px-4 py-2 text-right">Dimensi OK</th>
                    <th className="px-4 py-2 text-right">Reject</th>
                    <th className="px-4 py-2 text-right">Kuat Tekan (MPa)</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Inspektur</th>
                    <th className="px-4 py-2 text-left">Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {qcInspections.map((q, i) => (
                    <tr key={q.no} data-testid={`qc-row-${i}`}>
                      <td className="px-4 font-mono-num text-[#0A6ED1] font-medium">{q.no}</td>
                      <td className="px-4 font-mono-num">{q.po}</td>
                      <td className="px-4">
                        <div className="flex items-center gap-2">
                          <ProductIcon name={q.produk} size="sm" />
                          <span className="font-medium">{q.produk}</span>
                        </div>
                      </td>
                      <td className="px-4 text-right font-mono-num">{q.qty}</td>
                      <td className="px-4 text-right font-mono-num text-[#107E3E]">{q.dimensiOK}</td>
                      <td className="px-4 text-right font-mono-num text-[#B00020]">{q.dimensiReject}</td>
                      <td className="px-4 text-right font-mono-num font-semibold">{q.kuatTekan}</td>
                      <td className="px-4">
                        <div className="flex items-center gap-2">
                          <StatusBadge status={q.status} />
                          {(q.status === "Lulus" || q.status === "Lulus Bersyarat") && <QualityStamp type="pass" />}
                          {q.status === "Reject" && <QualityStamp type="reject" />}
                        </div>
                      </td>
                      <td className="px-4 text-[#59687A]">{q.inspektur}</td>
                      <td className="px-4 font-mono-num text-[#59687A]">{q.tanggal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="strength" className="mt-4">
            <div className="bg-white border border-[#DFE3E8] rounded-md overflow-hidden">
              <table className="w-full mes-table">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Kode Uji</th>
                    <th className="px-4 py-2 text-left">Batch</th>
                    <th className="px-4 py-2 text-left">Mutu</th>
                    <th className="px-4 py-2 text-right">Umur (hari)</th>
                    <th className="px-4 py-2 text-right">Target f&apos;c</th>
                    <th className="px-4 py-2 text-right">Hasil (MPa)</th>
                    <th className="px-4 py-2 text-right">% Target</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {strengthTests.map((t, i) => (
                    <tr key={t.kode} data-testid={`strength-row-${i}`}>
                      <td className="px-4 font-mono-num text-[#0A6ED1] font-medium">{t.kode}</td>
                      <td className="px-4 font-mono-num">{t.batch}</td>
                      <td className="px-4"><StatusBadge status={t.grade} variant="info" /></td>
                      <td className="px-4 text-right font-mono-num">{t.umur}</td>
                      <td className="px-4 text-right font-mono-num text-[#59687A]">{t.target}</td>
                      <td className="px-4 text-right font-mono-num font-semibold">{t.hasil}</td>
                      <td className="px-4 text-right font-mono-num font-semibold" style={{ color: t.persen >= 100 ? "#107E3E" : t.persen >= 85 ? "#E9730C" : "#B00020" }}>{t.persen}%</td>
                      <td className="px-4"><StatusBadge status={t.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="rejects" className="mt-4">
            <div className="bg-white border border-[#DFE3E8] rounded-md overflow-hidden">
              <table className="w-full mes-table">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">No. Reject</th>
                    <th className="px-4 py-2 text-left">Visual</th>
                    <th className="px-4 py-2 text-left">Produk</th>
                    <th className="px-4 py-2 text-right">Qty</th>
                    <th className="px-4 py-2 text-left">Alasan</th>
                    <th className="px-4 py-2 text-left">PO Asal</th>
                    <th className="px-4 py-2 text-left">Tanggal</th>
                    <th className="px-4 py-2 text-left">Disposisi</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rejects.map((r, i) => (
                    <tr key={r.no} data-testid={`reject-row-${i}`}>
                      <td className="px-4 font-mono-num text-[#B00020] font-medium">{r.no}</td>
                      <td className="px-4">
                        <DefectIcon type={reasonToDefectKey(r.alasan)} className="w-12 h-9" />
                      </td>
                      <td className="px-4">
                        <div className="flex items-center gap-2">
                          <ProductIcon name={r.produk} size="sm" />
                          <span className="font-medium">{r.produk}</span>
                        </div>
                      </td>
                      <td className="px-4 text-right font-mono-num">{r.qty}</td>
                      <td className="px-4">{r.alasan}</td>
                      <td className="px-4 font-mono-num text-[#59687A]">{r.po}</td>
                      <td className="px-4 font-mono-num text-[#59687A]">{r.tanggal}</td>
                      <td className="px-4"><StatusBadge status={r.disposisi} variant="warning" /></td>
                      <td className="px-4"><QualityStamp type="reject" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="mt-4">
            {/* Defect Reference Gallery */}
            <div className="bg-white border border-[#DFE3E8] rounded-md p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-base font-semibold text-[#1C252E] font-display">Galeri Cacat Referensi</div>
                  <div className="text-xs text-[#59687A]">Standar visual untuk identifikasi defect mengacu SNI 7833:2012</div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {defectList.map((d) => (
                  <div key={d.key} data-testid={`defect-card-${d.key}`} className="border border-[#DFE3E8] rounded-md overflow-hidden">
                    <DefectIcon type={d.key} className="w-full !h-24 !rounded-none !border-0 border-b" />
                    <div className="p-3">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="text-sm font-semibold text-[#1C252E]">{d.label}</div>
                        <QualityStamp type="reject" className="!text-[9px] !py-0 !px-1.5" />
                      </div>
                      <div className="text-[11px] text-[#59687A]">{d.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white border border-[#DFE3E8] rounded-md p-4">
                <div className="text-base font-semibold text-[#1C252E] font-display mb-4">Distribusi Penyebab Reject</div>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={rejectByReason} dataKey="jumlah" nameKey="alasan" cx="50%" cy="50%" outerRadius={100} innerRadius={50}>
                      {rejectByReason.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {rejectByReason.map((r, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-[#59687A] flex-1">{r.alasan}</span>
                      <span className="font-mono-num font-medium">{r.jumlah}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-[#DFE3E8] rounded-md p-4">
                <div className="text-base font-semibold text-[#1C252E] font-display mb-4">Jumlah Reject per Kategori</div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={rejectByReason} layout="vertical" margin={{ left: 0 }}>
                    <CartesianGrid stroke="#EEF0F2" strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11, fill: "#59687A" }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="alasan" tick={{ fontSize: 11, fill: "#1C252E" }} axisLine={false} tickLine={false} width={140} />
                    <Tooltip />
                    <Bar dataKey="jumlah" fill="#B00020" radius={[0, 2, 2, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default QualityControl;

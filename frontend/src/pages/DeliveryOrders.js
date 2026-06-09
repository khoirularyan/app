import PageHeader from "@/components/shared/PageHeader";
import StatusBadge from "@/components/shared/StatusBadge";
import KPICard from "@/components/shared/KPICard";
import { Button } from "@/components/ui/button";
import { deliveryOrders, customers } from "@/data/mockData";
import { Truck, MapPin, Clock, CheckCircle2, Plus } from "lucide-react";
import FormDialog from "@/components/shared/FormDialog";

const DeliveryOrders = () => {
  return (
    <div>
      <PageHeader
        title="Pengiriman"
        subtitle="Manajemen delivery order dan pengiriman produk ke customer"
        breadcrumbs={["Beranda", "Pengiriman"]}
        testId="delivery-page-header"
        actions={
          <FormDialog
            testId="do-create"
            title="Delivery Order Baru"
            description="Buat surat jalan pengiriman ke customer"
            submitLabel="Buat DO"
            successMessage="Delivery Order berhasil dibuat"
            fields={[
              { name: "so", label: "Sales Order", type: "select", required: true, options: [
                { value: "SO-2026-0095", label: "SO-2026-0095 — PT Adhi Karya" },
                { value: "SO-2026-0096", label: "SO-2026-0096 — Dinas PU Surabaya" },
                { value: "SO-2026-0097", label: "SO-2026-0097 — PT Hutama Karya" },
              ]},
              { name: "customer", label: "Customer", type: "select", required: true, options: customers.map(c => ({ value: c.kode, label: c.nama })) },
              { name: "muatan", label: "Muatan", type: "text", span: 2, placeholder: "Mis. 80 U-Ditch 500 + 160 Cover" },
              { name: "truk", label: "Nomor Polisi Truk", type: "text", placeholder: "Mis. B-9012-AB" },
              { name: "driver", label: "Driver", type: "text", placeholder: "Nama driver" },
              { name: "tglKirim", label: "Tanggal Kirim", type: "date", required: true },
              { name: "tujuan", label: "Tujuan", type: "text" },
              { name: "catatan", label: "Catatan Pengiriman", type: "textarea", span: 2 },
            ]}
            trigger={<Button size="sm" className="h-8 text-xs gap-1.5 bg-[#0A6ED1] hover:bg-[#0854A1]"><Plus className="w-3.5 h-3.5" />DO Baru</Button>}
          />
        }
      />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <KPICard testId="do-kpi-active" label="Pengiriman Aktif" value="2" unit="DO" icon={Truck} accent="warning" />
          <KPICard testId="do-kpi-route" label="Dalam Perjalanan" value="1" unit="DO" icon={MapPin} accent="default" />
          <KPICard testId="do-kpi-ready" label="Siap Berangkat" value="1" unit="DO" icon={Clock} accent="default" />
          <KPICard testId="do-kpi-done" label="Selesai Minggu Ini" value="12" unit="DO" icon={CheckCircle2} accent="success" trend="up" trendValue="+25%" />
        </div>

        <div className="bg-white border border-[#DFE3E8] rounded-md overflow-hidden">
          <div className="px-4 py-3 border-b border-[#DFE3E8]">
            <div className="text-base font-semibold text-[#1C252E] font-display">Daftar Delivery Order</div>
          </div>
          <table className="w-full mes-table">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">No. DO</th>
                <th className="px-4 py-2 text-left">SO Terkait</th>
                <th className="px-4 py-2 text-left">Customer</th>
                <th className="px-4 py-2 text-left">Muatan</th>
                <th className="px-4 py-2 text-left">Truk</th>
                <th className="px-4 py-2 text-left">Driver</th>
                <th className="px-4 py-2 text-left">Tgl Kirim</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {deliveryOrders.map((d, i) => (
                <tr key={d.no} data-testid={`do-row-${i}`}>
                  <td className="px-4 font-mono-num text-[#0A6ED1] font-medium">{d.no}</td>
                  <td className="px-4 font-mono-num text-[#59687A]">{d.so}</td>
                  <td className="px-4 font-medium">{d.customer}</td>
                  <td className="px-4">{d.qty}</td>
                  <td className="px-4 font-mono-num">{d.truk}</td>
                  <td className="px-4 text-[#59687A]">{d.driver}</td>
                  <td className="px-4 font-mono-num">{d.tglKirim}</td>
                  <td className="px-4"><StatusBadge status={d.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeliveryOrders;

import PageHeader from "@/components/shared/PageHeader";
import StatusBadge from "@/components/shared/StatusBadge";
import KPICard from "@/components/shared/KPICard";
import { Button } from "@/components/ui/button";
import { salesOrders, formatRupiah } from "@/data/mockData";
import { ShoppingCart, TrendingUp, FileCheck, Clock, Plus, Download } from "lucide-react";

const SalesOrders = () => {
  const totalNilai = salesOrders.reduce((s, o) => s + o.nilai, 0);
  const aktif = salesOrders.filter((o) => o.status !== "Selesai").length;

  return (
    <div>
      <PageHeader
        title="Order Penjualan"
        subtitle="Manajemen sales order dari customer BUMN, swasta, dan pemerintah"
        breadcrumbs={["Beranda", "Order Penjualan"]}
        testId="sales-page-header"
        actions={
          <>
            <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5"><Download className="w-3.5 h-3.5" />Ekspor</Button>
            <Button size="sm" className="h-8 text-xs gap-1.5 bg-[#0A6ED1] hover:bg-[#0854A1]"><Plus className="w-3.5 h-3.5" />Sales Order Baru</Button>
          </>
        }
      />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <KPICard testId="so-kpi-total" label="Total Nilai Order" value={(totalNilai / 1000000000).toFixed(2)} unit="Milyar" icon={ShoppingCart} accent="success" />
          <KPICard testId="so-kpi-aktif" label="Order Aktif" value={aktif} unit="order" icon={TrendingUp} accent="default" />
          <KPICard testId="so-kpi-siap" label="Siap Dikirim" value="2" unit="order" icon={FileCheck} accent="warning" />
          <KPICard testId="so-kpi-pending" label="Menunggu Produksi" value="3" unit="order" icon={Clock} accent="neutral" />
        </div>

        <div className="bg-white border border-[#DFE3E8] rounded-md overflow-hidden">
          <div className="px-4 py-3 border-b border-[#DFE3E8]">
            <div className="text-base font-semibold text-[#1C252E] font-display">Daftar Sales Order</div>
          </div>
          <table className="w-full mes-table">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">No. SO</th>
                <th className="px-4 py-2 text-left">Customer</th>
                <th className="px-4 py-2 text-left">Produk</th>
                <th className="px-4 py-2 text-right">Nilai Order</th>
                <th className="px-4 py-2 text-left">Tgl Order</th>
                <th className="px-4 py-2 text-left">Tgl Kirim</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {salesOrders.map((s, i) => (
                <tr key={s.no} data-testid={`so-row-${i}`}>
                  <td className="px-4 font-mono-num text-[#0A6ED1] font-medium">{s.no}</td>
                  <td className="px-4 font-medium">{s.customer}</td>
                  <td className="px-4 text-[#59687A] max-w-xs truncate">{s.produk}</td>
                  <td className="px-4 text-right font-mono-num font-semibold">{formatRupiah(s.nilai)}</td>
                  <td className="px-4 font-mono-num text-[#59687A]">{s.tglOrder}</td>
                  <td className="px-4 font-mono-num">{s.tglKirim}</td>
                  <td className="px-4"><StatusBadge status={s.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesOrders;

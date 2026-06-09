import { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import StatusBadge from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Search, Filter, Download } from "lucide-react";
import {
  products, productCategories, concreteGrades, materials, molds,
  customers, suppliers, warehouses, productionLines, machines, employees, shifts,
  formatRupiah, formatNumber
} from "@/data/mockData";

const Section = ({ children, columns, data, testId }) => (
  <div className="bg-white border border-[#DFE3E8] rounded-md overflow-hidden" data-testid={testId}>
    <div className="flex items-center justify-between px-4 py-3 border-b border-[#DFE3E8]">
      <div className="relative w-64">
        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#59687A]" />
        <Input placeholder="Cari..." className="pl-9 h-8 text-xs bg-[#F4F6F8] border-[#DFE3E8]" />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5"><Filter className="w-3.5 h-3.5" />Filter</Button>
        <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5"><Download className="w-3.5 h-3.5" />Ekspor</Button>
        <Button size="sm" className="h-8 text-xs gap-1.5 bg-[#0A6ED1] hover:bg-[#0854A1]"><Plus className="w-3.5 h-3.5" />Tambah</Button>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full mes-table">
        <thead>
          <tr>{columns.map((c) => <th key={c.key} className={`px-4 py-2 text-left ${c.cls || ""}`}>{c.label}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} data-testid={`row-${testId}-${i}`}>
              {columns.map((c) => (
                <td key={c.key} className={`px-4 ${c.cls || ""}`}>
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const MasterData = () => {
  const [tab, setTab] = useState("products");

  return (
    <div>
      <PageHeader
        title="Master Data"
        subtitle="Kelola data referensi produk, material, customer, dan sumber daya pabrik"
        breadcrumbs={["Beranda", "Master Data"]}
        testId="master-data-header"
      />
      <div className="p-6">
        <Tabs value={tab} onValueChange={setTab} data-testid="master-tabs">
          <TabsList className="bg-white border border-[#DFE3E8] p-1 h-auto flex flex-wrap gap-1">
            <TabsTrigger value="products" className="text-xs h-8">Produk</TabsTrigger>
            <TabsTrigger value="categories" className="text-xs h-8">Kategori</TabsTrigger>
            <TabsTrigger value="grades" className="text-xs h-8">Mutu Beton</TabsTrigger>
            <TabsTrigger value="materials" className="text-xs h-8">Material</TabsTrigger>
            <TabsTrigger value="molds" className="text-xs h-8">Cetakan</TabsTrigger>
            <TabsTrigger value="customers" className="text-xs h-8">Customer</TabsTrigger>
            <TabsTrigger value="suppliers" className="text-xs h-8">Supplier</TabsTrigger>
            <TabsTrigger value="warehouses" className="text-xs h-8">Gudang</TabsTrigger>
            <TabsTrigger value="lines" className="text-xs h-8">Line Produksi</TabsTrigger>
            <TabsTrigger value="machines" className="text-xs h-8">Mesin</TabsTrigger>
            <TabsTrigger value="employees" className="text-xs h-8">Karyawan</TabsTrigger>
            <TabsTrigger value="shifts" className="text-xs h-8">Shift</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-4">
            <Section testId="products-table" data={products} columns={[
              { key: "kode", label: "Kode", cls: "font-mono-num text-[#0A6ED1] font-medium" },
              { key: "nama", label: "Nama Produk", cls: "font-medium" },
              { key: "kategori", label: "Kategori" },
              { key: "spek", label: "Spesifikasi", cls: "text-[#59687A]" },
              { key: "grade", label: "Mutu", render: (r) => <StatusBadge status={r.grade} variant="info" /> },
              { key: "berat", label: "Berat (kg)", cls: "text-right font-mono-num", render: (r) => formatNumber(r.berat) },
              { key: "harga", label: "Harga", cls: "text-right font-mono-num", render: (r) => formatRupiah(r.harga) },
            ]} />
          </TabsContent>

          <TabsContent value="categories" className="mt-4">
            <Section testId="categories-table" data={productCategories} columns={[
              { key: "kode", label: "Kode", cls: "font-mono-num text-[#0A6ED1] font-medium" },
              { key: "nama", label: "Kategori", cls: "font-medium" },
              { key: "deskripsi", label: "Deskripsi", cls: "text-[#59687A]" },
              { key: "jumlahProduk", label: "Jumlah Produk", cls: "text-right font-mono-num" },
            ]} />
          </TabsContent>

          <TabsContent value="grades" className="mt-4">
            <Section testId="grades-table" data={concreteGrades} columns={[
              { key: "grade", label: "Mutu", render: (r) => <StatusBadge status={r.grade} variant="info" /> },
              { key: "fc", label: "f'c (MPa)", cls: "text-right font-mono-num" },
              { key: "slump", label: "Slump (cm)" },
              { key: "semen", label: "Semen (kg/m³)", cls: "text-right font-mono-num" },
              { key: "agregat", label: "Agregat (kg/m³)", cls: "text-right font-mono-num" },
              { key: "air", label: "Air (kg/m³)", cls: "text-right font-mono-num" },
              { key: "admixture", label: "Admixture" },
            ]} />
          </TabsContent>

          <TabsContent value="materials" className="mt-4">
            <Section testId="materials-table" data={materials} columns={[
              { key: "kode", label: "Kode", cls: "font-mono-num text-[#0A6ED1] font-medium" },
              { key: "nama", label: "Nama Material", cls: "font-medium" },
              { key: "satuan", label: "Satuan" },
              { key: "stok", label: "Stok", cls: "text-right font-mono-num", render: (r) => formatNumber(r.stok) },
              { key: "minStok", label: "Min Stok", cls: "text-right font-mono-num text-[#59687A]", render: (r) => formatNumber(r.minStok) },
              { key: "supplier", label: "Supplier Utama", cls: "text-[#59687A]" },
              { key: "harga", label: "Harga/Unit", cls: "text-right font-mono-num", render: (r) => formatRupiah(r.harga) },
            ]} />
          </TabsContent>

          <TabsContent value="molds" className="mt-4">
            <Section testId="molds-table" data={molds} columns={[
              { key: "kode", label: "Kode", cls: "font-mono-num text-[#0A6ED1] font-medium" },
              { key: "nama", label: "Cetakan", cls: "font-medium" },
              { key: "produk", label: "Produk" },
              { key: "jumlah", label: "Total", cls: "text-right font-mono-num" },
              { key: "aktif", label: "Aktif", cls: "text-right font-mono-num" },
              { key: "kondisi", label: "Kondisi", render: (r) => <StatusBadge status={r.kondisi} /> },
              { key: "utilisasi", label: "Utilisasi", cls: "text-right font-mono-num", render: (r) => `${r.utilisasi}%` },
            ]} />
          </TabsContent>

          <TabsContent value="customers" className="mt-4">
            <Section testId="customers-table" data={customers} columns={[
              { key: "kode", label: "Kode", cls: "font-mono-num text-[#0A6ED1] font-medium" },
              { key: "nama", label: "Customer", cls: "font-medium" },
              { key: "kontak", label: "Kontak" },
              { key: "telepon", label: "Telepon", cls: "font-mono-num" },
              { key: "kota", label: "Kota" },
              { key: "segmen", label: "Segmen" },
              { key: "limitKredit", label: "Limit Kredit", cls: "text-right font-mono-num", render: (r) => formatRupiah(r.limitKredit) },
            ]} />
          </TabsContent>

          <TabsContent value="suppliers" className="mt-4">
            <Section testId="suppliers-table" data={suppliers} columns={[
              { key: "kode", label: "Kode", cls: "font-mono-num text-[#0A6ED1] font-medium" },
              { key: "nama", label: "Supplier", cls: "font-medium" },
              { key: "material", label: "Material" },
              { key: "kontak", label: "Kontak", cls: "font-mono-num" },
              { key: "kota", label: "Kota" },
              { key: "rating", label: "Rating", render: (r) => "★".repeat(r.rating) + "☆".repeat(5 - r.rating) },
            ]} />
          </TabsContent>

          <TabsContent value="warehouses" className="mt-4">
            <Section testId="warehouses-table" data={warehouses} columns={[
              { key: "kode", label: "Kode", cls: "font-mono-num text-[#0A6ED1] font-medium" },
              { key: "nama", label: "Gudang", cls: "font-medium" },
              { key: "tipe", label: "Tipe" },
              { key: "lokasi", label: "Lokasi" },
              { key: "kapasitas", label: "Kapasitas" },
              { key: "utilisasi", label: "Utilisasi", cls: "text-right font-mono-num", render: (r) => `${r.utilisasi}%` },
            ]} />
          </TabsContent>

          <TabsContent value="lines" className="mt-4">
            <Section testId="lines-table" data={productionLines} columns={[
              { key: "kode", label: "Kode", cls: "font-mono-num text-[#0A6ED1] font-medium" },
              { key: "nama", label: "Line", cls: "font-medium" },
              { key: "produk", label: "Produk Utama" },
              { key: "kapasitas", label: "Kapasitas/Hari", cls: "text-right font-mono-num" },
              { key: "output", label: "Output Hari Ini", cls: "text-right font-mono-num" },
              { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
              { key: "supervisor", label: "Supervisor" },
            ]} />
          </TabsContent>

          <TabsContent value="machines" className="mt-4">
            <Section testId="machines-table" data={machines} columns={[
              { key: "kode", label: "Kode", cls: "font-mono-num text-[#0A6ED1] font-medium" },
              { key: "nama", label: "Mesin", cls: "font-medium" },
              { key: "tipe", label: "Tipe" },
              { key: "line", label: "Lokasi" },
              { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
              { key: "lastMaintenance", label: "Maint. Terakhir", cls: "font-mono-num text-[#59687A]" },
              { key: "nextMaintenance", label: "Maint. Berikutnya", cls: "font-mono-num" },
            ]} />
          </TabsContent>

          <TabsContent value="employees" className="mt-4">
            <Section testId="employees-table" data={employees} columns={[
              { key: "nik", label: "NIK", cls: "font-mono-num text-[#0A6ED1] font-medium" },
              { key: "nama", label: "Nama", cls: "font-medium" },
              { key: "jabatan", label: "Jabatan" },
              { key: "departemen", label: "Departemen" },
              { key: "shift", label: "Shift" },
              { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
            ]} />
          </TabsContent>

          <TabsContent value="shifts" className="mt-4">
            <Section testId="shifts-table" data={shifts} columns={[
              { key: "kode", label: "Kode", cls: "font-mono-num text-[#0A6ED1] font-medium" },
              { key: "nama", label: "Shift", cls: "font-medium" },
              { key: "jam", label: "Jam Kerja", cls: "font-mono-num" },
              { key: "supervisor", label: "Supervisor" },
              { key: "jumlahPekerja", label: "Jumlah Pekerja", cls: "text-right font-mono-num" },
            ]} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MasterData;

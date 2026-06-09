import { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import StatusBadge from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Search, Download } from "lucide-react";
import FormDialog from "@/components/shared/FormDialog";
import FilterPopover, { showExportToast } from "@/components/shared/FilterPopover";
import { toast } from "sonner";
import {
  products, productCategories, concreteGrades, materials, molds,
  customers, suppliers, warehouses, productionLines, machines, employees, shifts,
  formatRupiah, formatNumber
} from "@/data/mockData";

const Section = ({ children, columns, data, testId, entityName, addFields, filterSelects }) => {
  const [query, setQuery] = useState("");
  const filtered = data.filter((row) => {
    if (!query) return true;
    return Object.values(row).some((v) => String(v).toLowerCase().includes(query.toLowerCase()));
  });
  return (
    <div className="bg-white border border-[#DFE3E8] rounded-md overflow-hidden" data-testid={testId}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#DFE3E8]">
        <div className="relative w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#59687A]" />
          <Input
            placeholder="Cari..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 h-8 text-xs bg-[#F4F6F8] border-[#DFE3E8]"
            data-testid={`${testId}-search`}
          />
        </div>
        <div className="flex gap-2">
          <FilterPopover testId={`${testId}-filter`} selects={filterSelects || []} />
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5" onClick={() => showExportToast(entityName)} data-testid={`${testId}-export`}>
            <Download className="w-3.5 h-3.5" />Ekspor
          </Button>
          <FormDialog
            testId={`${testId}-create`}
            title={`Tambah ${entityName}`}
            description={`Tambahkan data ${entityName.toLowerCase()} baru ke master data`}
            submitLabel="Simpan"
            successMessage={`${entityName} berhasil ditambahkan`}
            fields={addFields}
            trigger={
              <Button size="sm" className="h-8 text-xs gap-1.5 bg-[#0A6ED1] hover:bg-[#0854A1]" data-testid={`${testId}-add`}>
                <Plus className="w-3.5 h-3.5" />Tambah
              </Button>
            }
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full mes-table">
          <thead>
            <tr>{columns.map((c) => <th key={c.key} className={`px-4 py-2 text-left ${c.cls || ""}`}>{c.label}</th>)}</tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i} data-testid={`row-${testId}-${i}`}>
                {columns.map((c) => (
                  <td key={c.key} className={`px-4 ${c.cls || ""}`}>
                    {c.render ? c.render(row) : row[c.key]}
                  </td>
                ))}
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={columns.length} className="px-4 py-6 text-center text-xs text-[#59687A]">Tidak ada data yang cocok</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

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
            <Section testId="products-table" entityName="Produk" data={products}
              addFields={[
                { name: "kode", label: "Kode Produk", required: true },
                { name: "nama", label: "Nama Produk", required: true, span: 2 },
                { name: "kategori", label: "Kategori", type: "select", options: productCategories.map(c => ({ value: c.nama, label: c.nama })) },
                { name: "grade", label: "Mutu Beton", type: "select", options: concreteGrades.map(g => ({ value: g.grade, label: g.grade })) },
                { name: "spek", label: "Spesifikasi" },
                { name: "berat", label: "Berat (kg)", type: "number" },
                { name: "harga", label: "Harga (Rp)", type: "number" },
              ]}
              filterSelects={[
                { name: "kategori", label: "Kategori", options: productCategories.map(c => ({ value: c.nama, label: c.nama })) },
              ]}
              columns={[
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
            <Section testId="categories-table" entityName="Kategori Produk" data={productCategories}
              addFields={[
                { name: "kode", label: "Kode", required: true },
                { name: "nama", label: "Nama Kategori", required: true },
                { name: "deskripsi", label: "Deskripsi", type: "textarea", span: 2 },
              ]}
              columns={[
              { key: "kode", label: "Kode", cls: "font-mono-num text-[#0A6ED1] font-medium" },
              { key: "nama", label: "Kategori", cls: "font-medium" },
              { key: "deskripsi", label: "Deskripsi", cls: "text-[#59687A]" },
              { key: "jumlahProduk", label: "Jumlah Produk", cls: "text-right font-mono-num" },
            ]} />
          </TabsContent>

          <TabsContent value="grades" className="mt-4">
            <Section testId="grades-table" entityName="Mutu Beton" data={concreteGrades}
              addFields={[
                { name: "grade", label: "Kode Mutu (K-...)", required: true },
                { name: "fc", label: "f'c (MPa)", type: "number", required: true },
                { name: "slump", label: "Slump (cm)" },
                { name: "semen", label: "Semen (kg/m³)", type: "number" },
                { name: "agregat", label: "Agregat (kg/m³)", type: "number" },
                { name: "air", label: "Air (kg/m³)", type: "number" },
                { name: "admixture", label: "Admixture", span: 2 },
              ]}
              columns={[
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
            <Section testId="materials-table" entityName="Material" data={materials}
              addFields={[
                { name: "kode", label: "Kode Material", required: true },
                { name: "nama", label: "Nama Material", required: true, span: 2 },
                { name: "satuan", label: "Satuan", type: "select", options: [
                  { value: "kg", label: "kg" }, { value: "ton", label: "ton" },
                  { value: "m3", label: "m³" }, { value: "liter", label: "liter" }, { value: "lembar", label: "lembar" },
                ]},
                { name: "stok", label: "Stok Awal", type: "number" },
                { name: "minStok", label: "Stok Minimum", type: "number" },
                { name: "harga", label: "Harga (Rp/unit)", type: "number" },
                { name: "supplier", label: "Supplier Utama", type: "select", options: suppliers.map(s => ({ value: s.nama, label: s.nama })) },
              ]}
              columns={[
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
            <Section testId="molds-table" entityName="Cetakan" data={molds}
              addFields={[
                { name: "kode", label: "Kode Cetakan", required: true },
                { name: "nama", label: "Nama Cetakan", required: true, span: 2 },
                { name: "produk", label: "Produk Terkait", type: "select", options: products.map(p => ({ value: p.kode, label: p.kode })) },
                { name: "jumlah", label: "Jumlah Cetakan", type: "number" },
                { name: "kondisi", label: "Kondisi", type: "select", options: [
                  { value: "Baik", label: "Baik" }, { value: "Sedang", label: "Sedang" }, { value: "Perlu Perawatan", label: "Perlu Perawatan" },
                ]},
              ]}
              columns={[
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
            <Section testId="customers-table" entityName="Customer" data={customers}
              addFields={[
                { name: "kode", label: "Kode Customer", required: true },
                { name: "nama", label: "Nama Perusahaan", required: true, span: 2 },
                { name: "kontak", label: "Kontak Person" },
                { name: "telepon", label: "Telepon" },
                { name: "kota", label: "Kota" },
                { name: "segmen", label: "Segmen", type: "select", options: [
                  { value: "BUMN Konstruksi", label: "BUMN Konstruksi" }, { value: "Swasta", label: "Swasta" }, { value: "Pemerintah", label: "Pemerintah" },
                ]},
                { name: "limitKredit", label: "Limit Kredit (Rp)", type: "number" },
                { name: "alamat", label: "Alamat Lengkap", type: "textarea", span: 2 },
              ]}
              columns={[
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
            <Section testId="suppliers-table" entityName="Supplier" data={suppliers}
              addFields={[
                { name: "kode", label: "Kode Supplier", required: true },
                { name: "nama", label: "Nama Supplier", required: true, span: 2 },
                { name: "material", label: "Material Disuplai" },
                { name: "kontak", label: "Telepon" },
                { name: "kota", label: "Kota" },
                { name: "rating", label: "Rating (1-5)", type: "number" },
              ]}
              columns={[
              { key: "kode", label: "Kode", cls: "font-mono-num text-[#0A6ED1] font-medium" },
              { key: "nama", label: "Supplier", cls: "font-medium" },
              { key: "material", label: "Material" },
              { key: "kontak", label: "Kontak", cls: "font-mono-num" },
              { key: "kota", label: "Kota" },
              { key: "rating", label: "Rating", render: (r) => "★".repeat(r.rating) + "☆".repeat(5 - r.rating) },
            ]} />
          </TabsContent>

          <TabsContent value="warehouses" className="mt-4">
            <Section testId="warehouses-table" entityName="Gudang" data={warehouses}
              addFields={[
                { name: "kode", label: "Kode Gudang", required: true },
                { name: "nama", label: "Nama Gudang", required: true, span: 2 },
                { name: "tipe", label: "Tipe", type: "select", options: [
                  { value: "Raw Material", label: "Raw Material" }, { value: "Work In Progress", label: "Work In Progress" },
                  { value: "Curing", label: "Curing" }, { value: "Finished Goods", label: "Finished Goods" }, { value: "Reject", label: "Reject" },
                ]},
                { name: "lokasi", label: "Lokasi" },
                { name: "kapasitas", label: "Kapasitas" },
              ]}
              columns={[
              { key: "kode", label: "Kode", cls: "font-mono-num text-[#0A6ED1] font-medium" },
              { key: "nama", label: "Gudang", cls: "font-medium" },
              { key: "tipe", label: "Tipe" },
              { key: "lokasi", label: "Lokasi" },
              { key: "kapasitas", label: "Kapasitas" },
              { key: "utilisasi", label: "Utilisasi", cls: "text-right font-mono-num", render: (r) => `${r.utilisasi}%` },
            ]} />
          </TabsContent>

          <TabsContent value="lines" className="mt-4">
            <Section testId="lines-table" entityName="Line Produksi" data={productionLines}
              addFields={[
                { name: "kode", label: "Kode Line", required: true },
                { name: "nama", label: "Nama Line", required: true, span: 2 },
                { name: "produk", label: "Produk Utama" },
                { name: "kapasitas", label: "Kapasitas/Hari", type: "number" },
                { name: "supervisor", label: "Supervisor", type: "select", options: employees.map(e => ({ value: e.nama, label: e.nama })) },
              ]}
              columns={[
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
            <Section testId="machines-table" entityName="Mesin" data={machines}
              addFields={[
                { name: "kode", label: "Kode Mesin", required: true },
                { name: "nama", label: "Nama Mesin", required: true, span: 2 },
                { name: "tipe", label: "Tipe", type: "select", options: [
                  { value: "Mixer", label: "Mixer" }, { value: "Casting", label: "Casting" },
                  { value: "Curing", label: "Curing" }, { value: "Material Handling", label: "Material Handling" }, { value: "QC Lab", label: "QC Lab" },
                ]},
                { name: "line", label: "Lokasi/Line" },
                { name: "lastMaintenance", label: "Maint. Terakhir", type: "date" },
                { name: "nextMaintenance", label: "Maint. Berikutnya", type: "date" },
              ]}
              columns={[
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
            <Section testId="employees-table" entityName="Karyawan" data={employees}
              addFields={[
                { name: "nik", label: "NIK", required: true },
                { name: "nama", label: "Nama Lengkap", required: true, span: 2 },
                { name: "jabatan", label: "Jabatan" },
                { name: "departemen", label: "Departemen", type: "select", options: [
                  { value: "Produksi", label: "Produksi" }, { value: "Quality", label: "Quality" },
                  { value: "Logistik", label: "Logistik" }, { value: "Maintenance", label: "Maintenance" }, { value: "Admin", label: "Admin" },
                ]},
                { name: "shift", label: "Shift", type: "select", options: [
                  { value: "Pagi", label: "Pagi" }, { value: "Sore", label: "Sore" }, { value: "Malam", label: "Malam" },
                ]},
              ]}
              columns={[
              { key: "nik", label: "NIK", cls: "font-mono-num text-[#0A6ED1] font-medium" },
              { key: "nama", label: "Nama", cls: "font-medium" },
              { key: "jabatan", label: "Jabatan" },
              { key: "departemen", label: "Departemen" },
              { key: "shift", label: "Shift" },
              { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
            ]} />
          </TabsContent>

          <TabsContent value="shifts" className="mt-4">
            <Section testId="shifts-table" entityName="Shift" data={shifts}
              addFields={[
                { name: "kode", label: "Kode Shift", required: true },
                { name: "nama", label: "Nama Shift", required: true },
                { name: "jam", label: "Jam Kerja", placeholder: "Mis. 07:00 - 15:00" },
                { name: "supervisor", label: "Supervisor", type: "select", options: employees.map(e => ({ value: e.nama, label: e.nama })) },
                { name: "jumlahPekerja", label: "Jumlah Pekerja", type: "number" },
              ]}
              columns={[
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

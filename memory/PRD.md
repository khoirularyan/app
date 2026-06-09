# Precast Concrete MES Dashboard — PRD

## Original Problem Statement
Design a modern web-based Manufacturing Execution System (MES) dashboard for an Indonesian Precast Concrete Factory (PT Beton Pracetak Nusantara). SAP Fiori-inspired enterprise UI, Bahasa Indonesia, blue/gray/white industrial palette, Recharts. Products include Pipa Beton Bertulang/Non Bertulang, Jacking Pipe, U-Ditch, Cover U-Ditch, Box Culvert, Barrier Beton, Sumur Resapan.

## User Choices (Phase 1)
- Frontend-only with realistic mock data (no backend, no DB)
- No authentication (open demo)
- Recharts for charts
- Bahasa Indonesia UI
- SAP Fiori inspired industrial design

## Architecture (Phase 1)
- React 19 + react-router 7 + TailwindCSS + Shadcn UI + Recharts + lucide-react
- All data in `/app/frontend/src/data/mockData.js`
- Layout: `AppLayout` → fixed Sidebar (13 modules) + sticky Header + page content
- Shared components: `KPICard`, `PageHeader`, `StatusBadge`
- 13 page routes

## What's Implemented (2026-02-09)
- ✅ Dashboard with 12 KPI cards, production trend (area), monthly production (bar), top products, recent activities timeline
- ✅ Master Data with 12 tabs (Produk, Kategori, Mutu Beton, Material, Cetakan, Customer, Supplier, Gudang, Line Produksi, Mesin, Karyawan, Shift)
- ✅ Perencanaan Produksi (Gantt-like weekly view)
- ✅ Order Produksi with searchable/filterable table (10 orders)
- ✅ Eksekusi Produksi with 4 line cards + stage pipeline (Casting → Curing → Demoulding → QC)
- ✅ Curing Management with chamber overview and active batches
- ✅ Quality Control with 4 tabs (inspections, strength tests, rejects, analysis)
- ✅ Persediaan with raw materials, finished goods, stock movements, consumption chart
- ✅ Order Penjualan, Pengiriman, Pembelian, Pemeliharaan, Laporan
- ✅ All UI in Bahasa Indonesia
- ✅ Testing: 100% pass, zero console errors

## Prioritized Backlog (P0/P1/P2)

### P0 — Foundation for backend phase
- FastAPI + MongoDB models for Products, ProductionOrders, Inventory, QC, Sales
- CRUD endpoints with /api prefix
- Replace mock data imports with API calls

### P1 — Functionality depth
- Order create/edit forms with validation
- Real-time data updates (WebSocket or polling)
- Authentication (JWT + RBAC: Supervisor, Operator, QC, Manager, Admin)
- File upload for QC photo evidence
- Print-friendly delivery notes / production reports

### P2 — Advanced features
- Drag-and-drop Gantt rescheduling
- IoT sensor integration for curing chambers
- Mobile-responsive operator app
- Email/WhatsApp notifications
- Multi-plant support
- KPI threshold alerts

## Next Tasks
1. Stakeholder review of frontend prototype
2. Confirm business process flows for each module
3. Define API contract for backend integration
4. Implement backend + auth (Phase 2)

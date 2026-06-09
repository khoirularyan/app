import PageHeader from "@/components/shared/PageHeader";
import StatusBadge from "@/components/shared/StatusBadge";
import KPICard from "@/components/shared/KPICard";
import FormDialog from "@/components/shared/FormDialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { planningRows, productionOrders, productionLines, curingBatches } from "@/data/mockData";
import { Calendar } from "@/components/ui/calendar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChevronLeft, ChevronRight, Plus, Download, CalendarRange, Factory } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ProductionPlanning = () => {
  const [calendarMonth, setCalendarMonth] = useState(new Date(2026, 5, 9));

  // quick KPI calculations
  const totalPlanned = productionOrders.reduce((s, o) => s + (o.qty || 0), 0);
  const totalActive = productionOrders.filter((o) => o.status !== "Selesai").length;
  const plannedThisWeek = planningRows.length;
  const utilization = 93.4; // placeholder

  // compute resource capacity data aggregated by batch
  const batches = Array.from(new Set((planningRows || []).map((r) => r.batch))).filter(Boolean);
  const capacityData = batches.map((b) => {
    const poNos = (planningRows || []).filter((r) => r.batch === b).map((r) => r.no);
    const orders = productionOrders.filter((o) => poNos.includes(o.no));
    const planned = orders.reduce((s, o) => s + (o.qty || 0), 0);
    const actual = orders.reduce((s, o) => s + ((o.qty || 0) * ((o.progress || 0) / 100)), 0);
    return { batch: b, planned, actual: Math.round(actual) };
  });

  return (
    <div>
      <PageHeader
        title="Production Planning"
        subtitle="Strategic optimization and scheduling for operations"
        breadcrumbs={["Beranda", "Perencanaan Produksi"]}
        testId="planning-page-header"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-3.5 h-3.5" />Export Report
            </Button>
            <Button size="sm" className="bg-[#0A6ED1] hover:bg-[#0854A1]">
              <Plus className="w-3.5 h-3.5" /> New Schedule
            </Button>
          </div>
        }
      />

      <div className="p-6 space-y-6">
        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <KPICard label="Monthly Target" value={`12,500 m³`} unit="" icon={undefined} accent="default" />
          <KPICard label="Available Capacity" value={`15,200 Hrs`} unit="" icon={undefined} accent="default" />
          <KPICard label="Planned Capacity" value={`14,080 Hrs`} unit="" icon={undefined} accent="default" />
          <KPICard label="Utilization %" value={`${utilization}%`} unit="" icon={undefined} accent="warning" />
        </div>

        {/* Calendar + Capacity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-1 bg-white border border-[#DFE3E8] rounded-md p-4 flex flex-col min-h-[430px]">
            <div>
              <div className="text-sm font-semibold text-[#1C252E]">Calendar</div>
              <div className="mt-3 text-xs text-[#59687A]">{calendarMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</div>
            </div>
            <div className="mt-4 flex-1 min-h-[280px] overflow-hidden rounded-md border border-[#EEF0F2]">
              <Calendar className="h-full" month={calendarMonth} onMonthChange={setCalendarMonth} />
            </div>

            <div className="mt-4">
              <div className="text-xs font-semibold text-[#1C252E]">Upcoming Events</div>
              <div className="mt-3 space-y-3 max-h-[140px] overflow-y-auto pr-1">
                {curingBatches.slice(0, 3).map((c) => {
                  const time = c.mulai ? c.mulai.split(" ")[1] : "--:--";
                  const date = c.mulai ? c.mulai.split(" ")[0] : "-";
                  return (
                    <div key={c.batch} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#0A6ED1] mt-1" />
                      <div>
                        <div className="text-sm font-medium">{c.produk}</div>
                        <div className="text-xs text-[#59687A]">{date} • {time} — {c.chamber}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white border border-[#DFE3E8] rounded-md p-4 flex flex-col min-h-[430px]">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-[#1C252E]">Resource Capacity Planning</div>
              <div className="text-xs text-[#59687A]">Forecast vs Actual load per facility</div>
            </div>
            <div className="mt-4 flex-1 rounded-md">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={capacityData} margin={{ left: -20 }}>
                  <CartesianGrid stroke="#EEF0F2" vertical={false} />
                  <XAxis dataKey="batch" tick={{ fontSize: 11, fill: "#59687A" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#59687A" }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="planned" name="Planned" fill="#0A6ED1" />
                  <Bar dataKey="actual" name="Actual" fill="#9CA3AF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Active Production Schedule */}
        <div className="bg-white border border-[#DFE3E8] rounded-md overflow-hidden">
          <div className="px-4 py-3 border-b border-[#DFE3E8] flex items-center justify-between">
            <div>
              <div className="text-base font-semibold text-[#1C252E]">Active Production Schedule</div>
              <div className="text-xs text-[#59687A]">List of active schedules and their status</div>
            </div>
            <div className="text-xs text-[#59687A]">All Plants</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full mes-table">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Product</th>
                  <th className="px-4 py-2 text-left">Planned Qty</th>
                  <th className="px-4 py-2 text-left">Plant</th>
                  <th className="px-4 py-2 text-left">Shift</th>
                  <th className="px-4 py-2 text-left">Due Date</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {productionOrders.map((o) => (
                  <tr key={o.no} className="border-t border-[#EEF0F2] hover:bg-[#F8FAFC]">
                    <td className="px-4 py-3 font-medium">{o.produk}</td>
                    <td className="px-4 py-3 font-mono-num">{o.qty} Units</td>
                    <td className="px-4 py-3">Plant 01</td>
                    <td className="px-4 py-3"><span className="inline-block bg-[#F4F6F8] px-2 py-1 rounded text-xs">Morning Shift</span></td>
                    <td className="px-4 py-3 text-[#59687A]">{o.tglSelesai || '-'}</td>
                    <td className="px-4 py-3">{o.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Timeline overview (week) */}
        <div className="bg-white border border-[#DFE3E8] rounded-md p-4">
          <div className="text-sm font-semibold text-[#1C252E]">Timeline Overview (Weekly View)</div>
          <div className="mt-4">
            <GanttChart rows={planningRows} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductionPlanning;

// Simple lightweight Gantt chart (day-indexed) — no external deps
function GanttChart({ rows }) {
  if (!rows || rows.length === 0) return <div className="text-sm text-[#59687A] p-4">No schedule data</div>;

  const maxEnd = Math.max(...rows.map((r) => (r.start || 0) + (r.duration || 0)));
  const days = Array.from({ length: maxEnd }, (_, i) => i);

  const statusColor = (s) => {
    if (!s) return "bg-gray-300";
    if (s.toLowerCase().includes("selesai") || s.toLowerCase().includes("done")) return "bg-green-400";
    if (s.toLowerCase().includes("progress") || s.toLowerCase().includes("casting") || s.toLowerCase().includes("curing")) return "bg-blue-400";
    if (s.toLowerCase().includes("direncanakan") || s.toLowerCase().includes("planned")) return "bg-yellow-300";
    return "bg-gray-300";
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[600px]">
        {/* Header */}
        <div className="flex items-center border-b border-[#EEF0F2]">
          <div className="w-56 px-4 py-2 text-xs text-[#59687A]">Schedule</div>
          {days.map((d) => (
            <div key={d} className="px-3 py-2 text-xs text-center text-[#59687A] border-l border-[#EEF0F2]">D{d}</div>
          ))}
        </div>

        {/* Rows */}
        <div>
          {rows.map((r) => (
            <div key={r.no} className="flex items-center border-b border-[#F4F6F8]">
              <div className="w-56 px-4 py-3 text-sm font-medium">{r.produk} <span className="text-xs text-[#8B97A6]">{r.batch}</span></div>
              {days.map((d) => {
                const isBar = d >= r.start && d < r.start + r.duration;
                return (
                  <div key={d} className="px-1 py-2 border-l border-[#F4F6F8]">
                    {isBar ? (
                      <div className={`${statusColor(r.status)} h-6 rounded-sm`} style={{ width: 28 }} />
                    ) : (
                      <div className="h-6" />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

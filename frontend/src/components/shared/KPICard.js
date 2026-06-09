import { ArrowUp, ArrowDown, Minus } from "lucide-react";

export const KPICard = ({ label, value, unit, trend, trendValue, icon: Icon, accent = "default", testId }) => {
  const accents = {
    default: { bar: "bg-[#0A6ED1]", iconBg: "bg-[#E5F0FA] text-[#0A6ED1]" },
    success: { bar: "bg-[#107E3E]", iconBg: "bg-[#E6F5EC] text-[#107E3E]" },
    warning: { bar: "bg-[#E9730C]", iconBg: "bg-[#FDF3E7] text-[#E9730C]" },
    error:   { bar: "bg-[#B00020]", iconBg: "bg-[#FBE6E9] text-[#B00020]" },
    neutral: { bar: "bg-[#59687A]", iconBg: "bg-[#F4F6F8] text-[#59687A]" },
  };
  const a = accents[accent] || accents.default;

  const trendIcon = trend === "up" ? <ArrowUp className="w-3 h-3" /> :
                    trend === "down" ? <ArrowDown className="w-3 h-3" /> :
                    <Minus className="w-3 h-3" />;
  const trendColor = trend === "up" ? "text-[#107E3E]" : trend === "down" ? "text-[#B00020]" : "text-[#59687A]";

  return (
    <div
      data-testid={testId}
      className="mes-tile relative bg-white border border-[#DFE3E8] rounded-md p-4 overflow-hidden"
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${a.bar}`} />
      <div className="flex items-start justify-between mb-3">
        <div className="text-[11px] uppercase tracking-wider text-[#59687A] font-semibold">{label}</div>
        {Icon && (
          <div className={`w-8 h-8 rounded flex items-center justify-center ${a.iconBg}`}>
            <Icon className="w-4 h-4" strokeWidth={1.8} />
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-1.5">
        <div className="text-[28px] font-semibold text-[#1C252E] tracking-tight font-display leading-none font-mono-num">{value}</div>
        {unit && <div className="text-sm text-[#59687A] font-medium">{unit}</div>}
      </div>
      {trendValue && (
        <div className={`mt-2 flex items-center gap-1 text-xs ${trendColor}`}>
          {trendIcon}
          <span className="font-medium">{trendValue}</span>
          <span className="text-[#59687A]">vs kemarin</span>
        </div>
      )}
    </div>
  );
};

export default KPICard;

import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import logo from "../../assets/Predictive_Maintenance.png";
import StatusBadge from "../../components/StatusBadge";
import { Download, Trash2 } from "lucide-react";

const Section = ({ icon, title, subtitle, children, color = "text-gray-700" }) => (
  <section>
    <h2 className={`text-2xl font-semibold flex items-center gap-2 mb-2 ${color}`}>
      <span>{icon}</span> {title}
    </h2>
    {subtitle && <p className="text-sm text-gray-500 mb-4">{subtitle}</p>}
    {children}
  </section>
);

const Insights = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reportRef = useRef();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (location.state) {
      localStorage.setItem("insightData", JSON.stringify(location.state));
      setData(location.state);
    } else {
      const stored = localStorage.getItem("insightData");
      if (stored) {
        setData(JSON.parse(stored));
      }
    }
  }, [location.state]);

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center text-center min-h-screen space-y-6 pt-24">
        <p className="text-2xl text-gray-600">No data found. Please input device details first.</p>
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => navigate("/manual-input")}
        >
          Go to Manual Input
        </button>
      </div>
    );
  }

  const downloadPDF = () => {
    const options = {
      margin: 0.5,
      filename: `${data.brand || "device"}-insight-report.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(options).from(reportRef.current).save();
  };

  const getSuggestions = () => {
    const suggestions = [];
    const {
      batteryHealth,
      chargesOvernight,
      overheating,
      previousRepairs,
      storageUsage,
      ramUsage,
      dropHistory,
      waterDamage,
      sensorIssues,
      buttonsNotWorking,
      batteryBulging,
    } = data;

    if (parseInt(batteryHealth) < 80) {
      suggestions.push("Battery health is below 80%. Consider replacing the battery soon.");
    }
    if (chargesOvernight === "yes") {
      suggestions.push("Avoid overnight charging to extend battery life.");
    }
    if (overheating) {
      suggestions.push("Device is overheating. Check for background apps or hardware issues.");
    }
    if (previousRepairs?.length >= 3) {
      suggestions.push("Frequent repairs indicate potential long-term issues. Consider device upgrade.");
    }
    if (parseInt(storageUsage) > 85 || parseInt(ramUsage) > 85) {
      suggestions.push("High resource usage detected. Optimize apps or consider a factory reset.");
    }
    if (dropHistory === "frequent" || waterDamage === "yes") {
      suggestions.push("Device has sustained damage. Future reliability may be compromised.");
    }
    if (sensorIssues || buttonsNotWorking || batteryBulging) {
      suggestions.push("Hardware issues detected. Consider a professional diagnosis.");
    }

    return suggestions.length
      ? suggestions
      : ["Your device appears to be in good condition. Maintain routine checks for optimal performance."];
  };

  const getFailureTimeline = () => {
    const timeline = [];
    const age = parseInt(data.age);
    const battery = parseInt(data.batteryHealth);
    const repairs = data.previousRepairs?.length || 0;

    if (age >= 24 || battery < 70 || data.batteryBulging) {
      timeline.push("⚠️ 1–3 months: High risk of battery or power failure.");
    }
    if (repairs >= 3 || data.waterDamage === "yes" || data.dropHistory === "frequent") {
      timeline.push("⚠️ 3–6 months: Likely chance of motherboard or component failures.");
    }
    if (parseInt(data.storageUsage) > 90 || parseInt(data.ramUsage) > 90) {
      timeline.push("⚠️ 6–9 months: Performance degradation expected due to resource overuse.");
    }
    if (!timeline.length) {
      timeline.push("✅ Your device shows no major signs of failure in the next 6–12 months.");
    }

    return timeline;
  };

  const getDeviceStatus = () => {
    const battery = parseInt(data.batteryHealth);
    const storage = parseInt(data.storageUsage);
    const ram = parseInt(data.ramUsage);
    const { overheating, dropHistory, waterDamage, sensorIssues, batteryBulging, screenCracked, buttonsNotWorking } =
      data;

    const critical = [
      battery < 50,
      storage > 90,
      ram > 90,
      overheating,
      dropHistory === "frequent",
      waterDamage === "yes",
      sensorIssues,
      batteryBulging,
      screenCracked,
      buttonsNotWorking,
    ];

    const attention = [battery < 70, storage > 80, ram > 80];

    if (critical.some(Boolean)) return "Critical";
    if (attention.some(Boolean)) return "Needs Attention";
    return "Good";
  };

  const deviceStatus = getDeviceStatus();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12 pt-28">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <h1 className="text-4xl font-bold text-gray-800">📊 Device Health Insights</h1>
        <div className="flex flex-wrap items-center gap-4">
          <StatusBadge status={deviceStatus} />
          
          <button
            onClick={() => {
              localStorage.removeItem("insightData");
              navigate("/manual-input");
            }}
            className="px-4 py-2 flex items-center gap-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            <Trash2 size={18} />
            Clear Data
          </button>
          <button
            onClick={downloadPDF}
            className="px-4 py-2 flex items-center gap-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Download size={18} />
            Download PDF
          </button>
        </div>
      </div>

      <div ref={reportRef} className="bg-white rounded-2xl shadow-xl p-10 space-y-12 border">
        <div className="flex justify-between items-center border-b pb-4">
          <img src={logo} alt="Logo" className="h-12" />
          <p className="text-sm text-gray-400">Generated by Predictive Maintenance App</p>
        </div>
        <Section icon="📱" title="Device Info">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-gray-600">
            <p><strong>Brand:</strong> {data.brand}</p>
            <p><strong>Model:</strong> {data.model}</p>
            <p><strong>OS:</strong> {data.os}</p>
            <p><strong>Age:</strong> {data.age} months</p>
            <p><strong>Total RAM:</strong> {data.totalRam} GB</p>
            <p><strong>Total Storage:</strong> {data.totalStorage} GB</p>
            <p><strong>Screen Time/Day:</strong> {data.screenTimeDaily} hrs</p>
            <p><strong>Charging Frequency:</strong> {data.chargingFrequency}</p>
            <p><strong>Software Status:</strong> {data.softwareStatus}</p>
          </div>
        </Section>

        <Section icon="🔋" title="Battery Info">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-600">
            <p><strong>Cycle Count:</strong> {data.batteryCycleCount}</p>
            <div>
              <p><strong>Health:</strong> {data.batteryHealth}%</p>
              <div className="w-full h-3 bg-gray-200 rounded-full mt-1">
                <div
                  className={`h-full rounded-full ${
                    data.batteryHealth >= 80 ? "bg-green-500" : data.batteryHealth >= 50 ? "bg-yellow-500" : "bg-red-500"
                  }`}
                  style={{ width: `${data.batteryHealth}%` }}
                />
              </div>
            </div>
            <p><strong>Fast Charging:</strong> {data.fastCharging}</p>
            <p><strong>Charges Overnight:</strong> {data.chargesOvernight}</p>
          </div>
        </Section>

        <Section icon="🛠️" title="Repair History">
          <ul className="list-disc pl-6 text-gray-600">
            {data.previousRepairs?.length > 0
              ? data.previousRepairs.map((repair, idx) => <li key={idx}>{repair}</li>)
              : <li>No major repairs reported.</li>}
          </ul>
        </Section>

        <Section icon="⚙️" title="Performance & Condition">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-600">
            <div>
              <p><strong>Storage Usage:</strong> {data.storageUsage}%</p>
              <div className="w-full h-3 bg-gray-200 rounded-full mt-1">
                <div
                  className={`h-full rounded-full ${
                    data.storageUsage <= 70 ? "bg-green-500" : data.storageUsage <= 90 ? "bg-yellow-500" : "bg-red-500"
                  }`}
                  style={{ width: `${data.storageUsage}%` }}
                />
              </div>
            </div>

            <div>
              <p><strong>RAM Usage:</strong> {data.ramUsage}%</p>
              <div className="w-full h-3 bg-gray-200 rounded-full mt-1">
                <div
                  className={`h-full rounded-full ${
                    data.ramUsage <= 70 ? "bg-green-500" : data.ramUsage <= 90 ? "bg-yellow-500" : "bg-red-500"
                  }`}
                  style={{ width: `${data.ramUsage}%` }}
                />
              </div>
            </div>

            <p><strong>Overheating:</strong> {data.overheating ? "Yes" : "No"}</p>
            <p><strong>Sensor Issues:</strong> {data.sensorIssues ? "Yes" : "No"}</p>
            <p><strong>Drop History:</strong> {data.dropHistory}</p>
            <p><strong>Water Damage:</strong> {data.waterDamage}</p>
          </div>
        </Section>

        <Section icon="💡" title="Maintenance Suggestions" color="text-green-700">
          <ul className="list-disc pl-6 text-gray-800 space-y-1">
            {getSuggestions().map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </Section>

        <Section icon="📅" title="Predictive Failure Timeline" color="text-red-600">
          <ul className="list-disc pl-6 text-red-700 space-y-1">
            {getFailureTimeline().map((event, index) => (
              <li key={index}>{event}</li>
            ))}
          </ul>
        </Section>

        <footer className="pt-6 mt-6 border-t text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} Predictive Maintenance App. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Insights;

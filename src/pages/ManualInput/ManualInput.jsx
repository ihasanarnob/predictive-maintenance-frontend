// src/pages/ManualInput/ManualInput.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ManualInput = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    os: "",
    age: "",
    batteryCycleCount: "",
    batteryHealth: "",
    fastCharging: "",
    chargesOvernight: "",
    previousRepairs: [],
    lastRepairDate: "",
    authorizedService: "",
    warrantyStatus: "",
    storageUsage: "",
    ramUsage: "",
    overheating: false,
    dropHistory: "",
    waterDamage: "",
    sensorIssues: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "select-multiple") {
      const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
      setFormData({ ...formData, [name]: selectedOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/insights", { state: formData });
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-xl mt-12 min-h-screen">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center tracking-tight">Manually Enter Device Details</h2>
      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Device Info */}
        <fieldset className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
          <legend className="text-xl font-semibold text-gray-700">Device Info</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" className="input" required />
            <input type="text" name="model" value={formData.model} onChange={handleChange} placeholder="Model" className="input" required />
            <input type="text" name="os" value={formData.os} onChange={handleChange} placeholder="OS Version" className="input" required />
            <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Device Age (months)" className="input" required />
          </div>
        </fieldset>

        {/* Battery Info */}
        <fieldset className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
          <legend className="text-xl font-semibold text-gray-700">Battery Info</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <input type="number" name="batteryCycleCount" value={formData.batteryCycleCount} onChange={handleChange} placeholder="Battery Cycle Count" className="input" />
            <input type="number" name="batteryHealth" value={formData.batteryHealth} onChange={handleChange} placeholder="Battery Health (%)" className="input" />
            <select name="fastCharging" value={formData.fastCharging} onChange={handleChange} className="input">
              <option value="">Fast Charging?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <select name="chargesOvernight" value={formData.chargesOvernight} onChange={handleChange} className="input">
              <option value="">Charges Overnight?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </fieldset>

        {/* Repair History */}
        <fieldset className="border border-gray-300 rounded-lg p-4 mb-6 shadow-sm">
  <legend className="text-lg font-semibold text-gray-700">Repair History</legend>
  <p className="text-sm text-gray-500 mb-2">Select all that apply:</p>
  <div className="flex flex-wrap gap-3">
    {[
      "Battery Replacement",
      "Screen Repair",
      "Motherboard Repair",
      "Water Damage",
      "Software Issues",
      "Charging Port",
      "Speaker/Mic Repair",
      "Camera Replacement"
    ].map((repair, index) => (
      <label key={index} className="inline-flex items-center px-3 py-2 bg-gray-100 text-sm rounded-full border border-gray-300 cursor-pointer hover:bg-blue-100 transition">
        <input
          type="checkbox"
          name="repairHistory"
          value={repair}
          className="hidden peer"
          onChange={handleChange}
        />
        <span className="peer-checked:text-blue-600 peer-checked:font-semibold">
          {repair}
        </span>
      </label>
    ))}
  </div>
</fieldset>

        {/* Performance */}
        <fieldset className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
          <legend className="text-xl font-semibold text-gray-700">Performance & Condition</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <input type="number" name="storageUsage" value={formData.storageUsage} onChange={handleChange} placeholder="Storage Used (%)" className="input" />
            <input type="text" name="ramUsage" value={formData.ramUsage} onChange={handleChange} placeholder="RAM Usage (optional)" className="input" />
            <input type="text" name="dropHistory" value={formData.dropHistory} onChange={handleChange} placeholder="Drop History (e.g., 2 major drops)" className="input" />
            <input type="text" name="waterDamage" value={formData.waterDamage} onChange={handleChange} placeholder="Water Damage (Yes/No)" className="input" />
            <label className="flex items-center gap-3">
              <input type="checkbox" name="overheating" checked={formData.overheating} onChange={handleChange} className="h-4 w-4" />
              <span className="text-gray-700">Frequent Overheating</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" name="sensorIssues" checked={formData.sensorIssues} onChange={handleChange} className="h-4 w-4" />
              <span className="text-gray-700">Sensor/Touch Issues</span>
            </label>
          </div>
        </fieldset>

        <button type="submit" className="w-full py-4 bg-blue-600 text-white font-semibold text-lg rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg">Submit</button>
      </form>
    </div>
  );
};

export default ManualInput;

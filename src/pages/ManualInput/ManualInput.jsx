import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {ToggleSwitch} from "../../components/ui/ToggleSwitch";

import {
  FaBatteryFull,
  FaWrench,
  FaMobileAlt,
  FaClock,
  FaChargingStation,
} from "react-icons/fa";

const ManualInput = () => {
  const repairOptions = [
  "Screen Replacement",
  "Battery Replacement",
  "Charging Port Repair",
  "Camera Repair",
  "Speaker/Mic Issue",
  "Software Issue",
  "Motherboard Repair",
  "Water Damage",
];
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    os: "",
    deviceAge: "",
    batteryCycleCount: "",
    batteryHealth: "",
    fastCharging: "",
    chargesOvernight: "",
    previousRepairs: [],
    lastRepairDate: "",
    authorizedService: "",
    warrantyStatus: "",
    storageCapacity: "",
    ramCapacity: "",
    storageUsage: "",
    ramUsage: "",
    // 
    overheating: false,
    dropHistory: false,
    waterDamage: false,
    sensorIssues: false,
    batteryBulging: false,
    screenCracked: false,
    buttonsNotWorking: false,
    // 
    screenTime: "",
    primaryUse: [],
    chargeFrequency: "",
    chargeTime: "",
    environment: "",
    regionTemp: "",
    updatedSoftware: "",
    rooted: "",
    majorConcern: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, multiple } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (multiple) {
      const selected = Array.from(e.target.selectedOptions, (o) => o.value);
      setFormData({ ...formData, [name]: selected });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/insights", { state: formData });
  };




  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <motion.h2
        className="text-3xl font-bold mb-4 text-center text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Please input your device information manually
      </motion.h2>

      {/* Circular Progress Indicator */}


      <motion.form
        onSubmit={handleSubmit}
        className="space-y-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Section: Device Information */}
        <div className="p-6 border shadow border-l-4 border-blue-500 rounded-md">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <FaMobileAlt /> Device Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input name="brand" placeholder="Brand (e.g., Samsung)" value={formData.brand} onChange={handleChange} required className="input" />
            <input name="model" placeholder="Model (e.g., Galaxy S22)" value={formData.model} onChange={handleChange} required className="input" />
            <input name="os" placeholder="OS Version (e.g., Android 13)" value={formData.os} onChange={handleChange} required className="input" />
            <input name="deviceAge" type="number" min={0} max={60} placeholder="Device Age (Months)" value={formData.deviceAge} onChange={handleChange} className="input" title="Enter device age between 0 and 120 months" />
            <input name="storageCapacity" placeholder="Storage Capacity (e.g., 128 GB)" value={formData.storageCapacity} onChange={handleChange} className="input" />
            <input name="ramCapacity" placeholder="RAM Capacity (e.g., 6 GB)" value={formData.ramCapacity} onChange={handleChange} className="input" />
          </div>
        </div>

        {/* Section: Battery & Performance */}
        <div className="p-6 border shadow border-l-4 border-green-500 rounded-md">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <FaBatteryFull /> Battery & Performance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
  name="batteryCycleCount" type="number" min={0} placeholder="Battery Cycle Count" value={formData.batteryCycleCount} onChange={handleChange} className="input" title="Enter a non-negative number (e.g., 0, 100, 200)" />

<input name="batteryHealth" type="number" min={0} max={100} placeholder="Battery Health (%)" value={formData.batteryHealth} onChange={handleChange} className="input" title="Enter battery health between 0% and 100%" />

<input name="storageUsage" type="number" min={0} max={100} placeholder="Storage Used (%)" value={formData.storageUsage} onChange={handleChange} className="input" title="Enter storage usage between 0% and 100%" />

<input name="ramUsage" type="number" min={0} max={100} placeholder="RAM Usage (%)" value={formData.ramUsage} onChange={handleChange} className="input" title="Enter RAM usage between 0% and 100%" />
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
        </div>

        {/* Section: Repair History */}
        <div className="p-6 border shadow border-l-4 border-yellow-500 rounded-md">
      <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
        <FaWrench className="text-yellow-500" />
        Repair History
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Checkboxes */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-700 font-medium mb-2">
            Select Past Repairs (if any)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {repairOptions.map((repair) => (
              <label
                key={repair}
                className="flex items-center space-x-2 bg-gray-100 p-2 rounded hover:bg-gray-200 transition cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="previousRepairs"
                  value={repair}
                  checked={formData.previousRepairs.includes(repair)}
                  onChange={(e) => {
                    const { value, checked } = e.target;
                    setFormData((prev) => {
                      const updatedRepairs = checked
                        ? [...prev.previousRepairs, value]
                        : prev.previousRepairs.filter((item) => item !== value);
                      return { ...prev, previousRepairs: updatedRepairs };
                    });
                  }}
                  className="accent-yellow-500"
                />
                <span>{repair}</span>
              </label>
            ))}
          </div>
        </div>

        <select
          name="authorizedService"
          value={formData.authorizedService}
          onChange={handleChange}
          className="input px-4 py-2 rounded border border-gray-300 focus:ring-yellow-500 focus:outline-none"
        >
          <option value="">Was it an authorized center?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        {/* Warranty Status */}
        <select
          name="warrantyStatus"
          value={formData.warrantyStatus}
          onChange={handleChange}
          className="input px-4 py-2 rounded border border-gray-300 focus:ring-yellow-500 focus:outline-none"
        >
          <option value="">Warranty Status</option>
          <option value="in">In Warranty</option>
          <option value="out">Out of Warranty</option>
        </select>
      </div>
    </div>
          {/* {Device Hardware Condition} */}

      {/* <div className="p-6 border shadow border-l-4 border-purple-500 rounded-md"></div> */}
      <div className="p-6 border shadow border-l-4 border-gray-500 rounded-md">
      <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
        <FaChargingStation className="text-gray-500" />
        Hardware Condition
      </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-30">
              <ToggleSwitch
                label="Overheating"
                checked={formData.overheating}
                onChange={(val) => setFormData({ ...formData, overheating: val })}
                tooltip="Does the device heat up unusually during use?"
              />
              <ToggleSwitch
                label="Drop History"
                checked={formData.dropHistory}
                onChange={(val) => setFormData({ ...formData, dropHistory: val })}
                tooltip="Has the device been dropped or had impact damage?"
              />
              <ToggleSwitch
                label="Water Damage"
                checked={formData.waterDamage}
                onChange={(val) => setFormData({ ...formData, waterDamage: val })}
                tooltip="Has the device been exposed to water or moisture?"
              />
              <ToggleSwitch
                label="Sensor Issues"
                checked={formData.sensorIssues}
                onChange={(val) => setFormData({ ...formData, sensorIssues: val })}
                tooltip="Are there problems with proximity, gyroscope, or other sensors?"
              />
              <ToggleSwitch
                label="Battery Bulging"
                checked={formData.batteryBulging}
                onChange={(val) => setFormData({ ...formData, batteryBulging: val })}
                tooltip="Are there any swelling with battery?"
              />
              <ToggleSwitch
                label="Screen Cracked"
                checked={formData.screenCracked}
                onChange={(val) => setFormData({ ...formData, screenCracked: val })}
                tooltip="Can you see visual problems or cracks on the screen?"
              />
              <ToggleSwitch
                label="Buttons Not Working"
                checked={formData.buttonsNotWorking}
                onChange={(val) => setFormData({ ...formData, buttonsNotWorking: val })}
                tooltip="Are you facing any problems with the volume or power button?"
              />
            </div>
          </div>


        {/* Section: Usage Behavior */}
        <div className="p-6 border shadow border-l-4 border-purple-500 rounded-md">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <FaClock /> Usage Behavior
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <select name="screenTime" value={formData.screenTime} onChange={handleChange} className="input">
              <option value="">Avg. Screen Time/Day</option>
              <option value="<2h">Less than 2 hrs</option>
              <option value="2-4h">2–4 hrs</option>
              <option value="4-6h">4–6 hrs</option>
              <option value=">6h">6+ hrs</option>
            </select>
            
            <select name="chargeFrequency" value={formData.chargeFrequency} onChange={handleChange} className="input">
              <option value="">Charging Frequency</option>
              <option value="1/day">Once per day</option>
              <option value="2/day">Twice per day</option>
              <option value=">2/day">More than twice</option>
              <option value="rare">Rarely</option>
            </select>

            <select name="chargeTime" value={formData.chargeTime} onChange={handleChange} className="input">
              <option value="">Usual Charging Duration</option>
              <option value="<1h">Less than 1 hour</option>
              <option value="1-2h">1–2 hours</option>
              <option value=">2h">More than 2 hours</option>
            </select>

            <select name="environment" value={formData.environment} onChange={handleChange} className="input">
              <option value="">Usage Environment</option>
              <option value="home">Home</option>
              <option value="office">Office</option>
              <option value="outdoors">Outdoors</option>
              <option value="mixed">Mixed</option>
            </select>

            <input
              name="regionTemp"
              placeholder="Region Temp (°C, e.g. 25)"
              value={formData.regionTemp}
              onChange={handleChange}
              type="number"
              className="input"
            />

            <select name="updatedSoftware" value={formData.updatedSoftware} onChange={handleChange} className="input">
              <option value="">Software Updated?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            <select name="rooted" value={formData.rooted} onChange={handleChange} className="input">
              <option value="">Device Rooted/Jailbroken?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="unknown">Not Sure</option>
            </select>

            <textarea
              name="majorConcern"
              placeholder="Describe your primary concern or issue..."
              value={formData.majorConcern}
              onChange={handleChange}
              rows={4}
              className="input col-span-1 md:col-span-2"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700 transition font-semibold"
          >
            Submit and View Insights
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default ManualInput;


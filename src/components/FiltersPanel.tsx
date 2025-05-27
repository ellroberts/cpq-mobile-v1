import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobileAlt,
  faLaptop,
  faGlobe,
  faNetworkWired,
  faPhone,
  faHeadphones,
  faCode,
  faWifi,
  faChevronDown,
  faPlane,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import FilterGroup from "./FilterGroup";

export function FiltersPanel({ selectedFilters, toggleFilter, resetFilters }) {
  const [expanded, setExpanded] = useState({
    network: true,
    data: true,
    contract: true,
    type: true,
    roaming: true,
    features: true,
  });

  const [selectedProduct, setSelectedProduct] = useState("Mobile");
  const [showDropdown, setShowDropdown] = useState(false);

  const toggle = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const iconMap = {
    Mobile: faMobileAlt,
    Hardware: faLaptop,
    Ethernet: faGlobe,
    Fibre: faNetworkWired,
    "Hosted Voice": faPhone,
    "IT Support": faHeadphones,
    Software: faCode,
    WIFI: faWifi,
  };

  const products = Object.keys(iconMap);
  const networks = ["O2", "Vodafone", "EE", "Three"];
  const dataOptions = ["Unlimited", "100GB", "50GB", "10GB"];
  const contractLengths = ["12 months", "24 months"];
  const productTypes = ["Voice & Data", "Voice only", "Mobile broadband"];
  const roamingOptions = ["Yes", "No"];
  const featuresOptions = [
    { label: "Travel Plus", value: "phone", icon: faPhone },
    { label: "Travel Free", value: "plane", icon: faPlane },
    { label: "International Calling", value: "globe", icon: faGlobe },
  ];

  return (
    <div className="space-y-4 pb-2">
      {/* Product Dropdown */}
      <div className="bg-gray-100 p-4 rounded mb-2">
        <label className="text-sm font-semibold block mb-1">
          Selected Product:
        </label>
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full border rounded px-3 py-2 bg-white flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              {iconMap[selectedProduct] && (
                <FontAwesomeIcon icon={iconMap[selectedProduct]} />
              )}
              {selectedProduct}
            </span>
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          {showDropdown && (
            <div className="absolute z-10 bg-white border rounded w-full mt-1 max-h-60 overflow-y-auto shadow-lg">
              {products.map((product) => (
                <button
                  key={product}
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={iconMap[product]} />
                  {product}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Reset All */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-md font-semibold">Filters</h2>
        <button
          onClick={resetFilters}
          className="text-sm text-blue-600 hover:underline"
        >
          Reset All
        </button>
      </div>

      {/* Network */}
      <FilterGroup
        title="Network"
        expanded={expanded.network}
        onToggle={() => toggle("network")}
      >
        {networks.map((item) => (
          <label key={item} className="block text-sm mb-1 pl-2">
            <input
              type="checkbox"
              checked={selectedFilters.network.includes(item)}
              onChange={() => toggleFilter("network", item)}
              className="mr-2"
            />
            {item}
          </label>
        ))}
      </FilterGroup>

      {/* Data */}
      <FilterGroup
        title="Data"
        expanded={expanded.data}
        onToggle={() => toggle("data")}
      >
        {dataOptions.map((item) => (
          <label key={item} className="block text-sm mb-1 pl-2">
            <input
              type="checkbox"
              checked={selectedFilters.data.includes(item)}
              onChange={() => toggleFilter("data", item)}
              className="mr-2"
            />
            {item}
          </label>
        ))}
      </FilterGroup>

      {/* Contract */}
      <FilterGroup
        title="Contract Length"
        expanded={expanded.contract}
        onToggle={() => toggle("contract")}
      >
        {contractLengths.map((item) => (
          <label key={item} className="block text-sm mb-1 pl-2">
            <input
              type="checkbox"
              checked={selectedFilters.contract.includes(item)}
              onChange={() => toggleFilter("contract", item)}
              className="mr-2"
            />
            {item}
          </label>
        ))}
      </FilterGroup>

      {/* Type */}
      <FilterGroup
        title="Product Type"
        expanded={expanded.type}
        onToggle={() => toggle("type")}
      >
        {productTypes.map((item) => (
          <label key={item} className="block text-sm mb-1 pl-2">
            <input
              type="checkbox"
              checked={selectedFilters.type.includes(item)}
              onChange={() => toggleFilter("type", item)}
              className="mr-2"
            />
            {item}
          </label>
        ))}
      </FilterGroup>

      {/* International Roaming */}
      <FilterGroup
        title="International Roaming"
        expanded={expanded.roaming}
        onToggle={() => toggle("roaming")}
      >
        {roamingOptions.map((item) => (
          <label key={item} className="block text-sm mb-1 pl-2">
            <input
              type="checkbox"
              checked={selectedFilters.roaming.includes(item)}
              onChange={() => toggleFilter("roaming", item)}
              className="mr-2"
            />
            {item}
          </label>
        ))}
      </FilterGroup>

      {/* Features */}
      <FilterGroup
        title={
          <div className="flex items-center gap-1">
            <span>Features</span>
            <div className="relative group">
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              />
              <div className="absolute left-6 top-0 z-10 hidden group-hover:block w-48 text-xs text-white bg-gray-800 p-2 rounded shadow-md">
                Choose one or more plan features
              </div>
            </div>
          </div>
        }
        expanded={expanded.features}
        onToggle={() => toggle("features")}
        hideDivider={true}
      >
        {featuresOptions.map(({ label, value, icon }) => (
          <label
            key={value}
            className="block text-sm pl-2 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedFilters.features.includes(value)}
                onChange={() => toggleFilter("features", value)}
              />
              <span>{label}</span>
            </div>
            <FontAwesomeIcon icon={icon} />
          </label>
        ))}
      </FilterGroup>
    </div>
  );
}

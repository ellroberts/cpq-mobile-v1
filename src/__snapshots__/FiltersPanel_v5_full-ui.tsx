// v5 snapshot with restored full UI and working network filters

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
  faRedo,
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
  const networks = ["O2", "Vodafone"];

  return (
    <div className="space-y-4">
      {/* Product Dropdown - Custom with FA Icons */}
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
          className="text-sm text-blue-600 hover:underline flex items-center gap-1"
        >
          <FontAwesomeIcon icon={faRedo} />
          Reset All
        </button>
      </div>

      {/* Filter Group: Network (working) */}
      <FilterGroup
        title="Network"
        expanded={expanded.network}
        onToggle={() => toggle("network")}
      >
        {networks.map((network) => (
          <label key={network} className="block text-sm mb-1 pl-2">
            <input
              type="checkbox"
              checked={selectedFilters.network.includes(network)}
              onChange={() => toggleFilter("network", network)}
              className="mr-2"
            />
            {network}
          </label>
        ))}
      </FilterGroup>

      {/* Placeholder groups */}
      <FilterGroup
        title="Data"
        expanded={expanded.data}
        onToggle={() => toggle("data")}
      >
        <p className="text-xs pl-2 text-gray-500">[Coming Soon]</p>
      </FilterGroup>
      <FilterGroup
        title="Contract Length"
        expanded={expanded.contract}
        onToggle={() => toggle("contract")}
      >
        <p className="text-xs pl-2 text-gray-500">[Coming Soon]</p>
      </FilterGroup>
      <FilterGroup
        title="Product Type"
        expanded={expanded.type}
        onToggle={() => toggle("type")}
      >
        <p className="text-xs pl-2 text-gray-500">[Coming Soon]</p>
      </FilterGroup>
      <FilterGroup
        title="Roaming"
        expanded={expanded.roaming}
        onToggle={() => toggle("roaming")}
      >
        <p className="text-xs pl-2 text-gray-500">[Coming Soon]</p>
      </FilterGroup>
      <FilterGroup
        title="Features"
        expanded={expanded.features}
        onToggle={() => toggle("features")}
      >
        <p className="text-xs pl-2 text-gray-500">[Coming Soon]</p>
      </FilterGroup>
    </div>
  );
}

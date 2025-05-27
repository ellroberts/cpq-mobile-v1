import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane, faPhone, faGlobe } from "@fortawesome/free-solid-svg-icons";

import o2Logo from "../assets/o2-logo.png";
import vodafoneLogo from "../assets/vodafone-logo.png";
import gammaLogo from "../assets/gamma-logo.png";
import eeLogo from "../assets/ee-logo.png";
import threeLogo from "../assets/three-logo.png";

const iconMap = {
  phone: faPhone,
  plane: faPlane,
  globe: faGlobe,
};

const logoMap: Record<string, string> = {
  o2: o2Logo,
  vodafone: vodafoneLogo,
  gamma: gammaLogo,
  ee: eeLogo,
  three: threeLogo,
};

export interface MobilePlan {
  id: number;
  network: string;
  name: string;
  minutes: string;
  sms: string;
  data: string;
  ukEuMins: string;
  icons: string[];
  price: string;
  setup: string;
  term: string;
  isSelected?: boolean;
  onToggle?: (id: number) => void;
}

export function MobilePlanCard(props: MobilePlan) {
  const {
    id,
    network,
    name,
    minutes,
    sms,
    data,
    ukEuMins,
    icons,
    price,
    setup,
    term,
    isSelected = false,
    onToggle,
  } = props;

  const logo = logoMap[network.toLowerCase()];

  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between text-sm h-full">
      {logo && (
        <div className="flex justify-center mb-2">
          <img src={logo} alt={`${network} logo`} className="h-6" />
        </div>
      )}

      <h3 className="text-center font-semibold text-gray-900 mb-3">{name}</h3>

      <ul className="text-gray-700 mb-3 space-y-1">
        <li>Minutes: {minutes}</li>
        <li>SMS: {sms}</li>
        <li>Data: {data}</li>
      </ul>

      <div className="bg-gray-50 border-t border-b py-2 px-3 flex justify-between text-sm font-medium text-gray-700 mb-3">
        <span>UK-EU Mins:</span>
        <span className="text-black">{ukEuMins}</span>
      </div>

      <div className="flex justify-center gap-3 text-lg text-gray-700 mb-3">
        {icons.map((icon, i) =>
          iconMap[icon] ? (
            <FontAwesomeIcon icon={iconMap[icon]} key={i} />
          ) : null
        )}
      </div>

      <div className="text-center text-gray-900 mb-1">
        <strong>{price}</strong>{" "}
        {setup && <span className="text-xs text-gray-500">{setup}</span>}
      </div>

      <div className="text-center text-xs text-gray-500 mb-3">{term}</div>

      <button
        onClick={() => onToggle?.(id)}
        className={`font-medium py-1.5 text-sm rounded w-full border transition ${
          isSelected
            ? "bg-green-600 text-white border-green-600 hover:bg-green-700"
            : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
        }`}
      >
        {isSelected ? "✓ Added" : "+ Add"}
      </button>
    </div>
  );
}

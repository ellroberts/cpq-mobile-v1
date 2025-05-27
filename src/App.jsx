import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Layout from './components/Layout';
import MobileSelection from './pages/MobileSelection';
import MobilePlans from './pages/MobilePlans';
import AddOns from './pages/AddOns';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/mobile-selection" replace />} />
          <Route path="/mobile-selection" element={<MobileSelection />} />
          <Route path="/mobile-plans" element={<MobilePlans />} />
          <Route path="/add-ons" element={<AddOns />} />
        </Route>
      </Routes>
    </Router>
  );
}

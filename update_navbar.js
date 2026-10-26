const fs = require('fs');

let content = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

// We need to import useLocation
if (!content.includes('useLocation')) {
  content = content.replace('import { Link } from "react-router-dom";', 'import { Link, useLocation } from "react-router-dom";');
}

// Extract useLocation hook
if (!content.includes('const location = useLocation();')) {
  content = content.replace('const [isScrolled, setIsScrolled] = useState(false);', 'const location = useLocation();\n  const [isScrolled, setIsScrolled] = useState(false);');
}

// Add conditional styling for active links in desktop dropdown
content = content.replace(
  /className="block px-4 py-2\.5 text-\[14px\] text-slate-600 hover:text-\[#f97316\] hover:bg-orange-50 rounded-xl transition-colors"/g,
  '`block px-4 py-2.5 text-[14px] rounded-xl transition-colors ${location.pathname === link.path ? "text-[#f97316] bg-orange-50 font-bold" : "text-slate-600 hover:text-[#f97316] hover:bg-orange-50"}`'
);

// Add conditional styling for active links in mobile dropdown
content = content.replace(
  /className="block py-2 text-\[14px\] text-slate-600 hover:text-\[#f97316\]"/g,
  '`block py-2 text-[14px] transition-colors ${location.pathname === link.path ? "text-[#f97316] font-bold" : "text-slate-600 hover:text-[#f97316]"}`'
);

fs.writeFileSync('src/components/Navbar.tsx', content);

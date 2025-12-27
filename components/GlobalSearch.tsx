import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Command, 
  FileText, 
  LayoutDashboard, 
  CreditCard, 
  ShieldCheck, 
  Settings, 
  Users, 
  Zap,
  Building2,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { MOCK_SALES_TRANSACTIONS, VENDOR_ITC_DATA } from '../constants';

interface SearchItem {
  id: string;
  title: string;
  category: string;
  path: string;
  icon: React.ReactNode;
  description?: string;
}

const GlobalSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Define static navigation items
  const navItems: SearchItem[] = [
    { id: 'nav-overview', title: 'Overview', category: 'Page', path: '/dashboard/overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'nav-sales', title: 'Sales Register', category: 'Page', path: '/dashboard/sales', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'nav-itc', title: 'Input Tax Credit', category: 'Page', path: '/dashboard/itc', icon: <FileText className="w-4 h-4" /> },
    { id: 'nav-compliance', title: 'Compliance & Alerts', category: 'Page', path: '/dashboard/compliance', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'nav-settings', title: 'Settings', category: 'Page', path: '/settings', icon: <Settings className="w-4 h-4" /> },
    { id: 'nav-sub', title: 'Subscription', category: 'Page', path: '/subscription', icon: <Zap className="w-4 h-4" /> },
    { id: 'nav-gst', title: 'Connect GSTIN', category: 'Action', path: '/gst-connection', icon: <Building2 className="w-4 h-4" /> },
  ];

  // Index Mock Data
  const dataItems: SearchItem[] = [
    ...MOCK_SALES_TRANSACTIONS.map(inv => ({
      id: `inv-${inv.invoiceNo}`,
      title: `Invoice ${inv.invoiceNo}`,
      category: 'Invoice',
      path: '/dashboard/sales',
      description: `${inv.customer} - ${inv.totalValue}`,
      icon: <FileText className="w-4 h-4" />
    })),
    ...VENDOR_ITC_DATA.map(vendor => ({
      id: `vnd-${vendor.gstin}`,
      title: vendor.name,
      category: 'Vendor',
      path: '/dashboard/itc',
      description: `GSTIN: ${vendor.gstin}`,
      icon: <Users className="w-4 h-4" />
    }))
  ];

  const allItems = [...navItems, ...dataItems];

  // Handle Search Logic
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
    } else {
      const lowerQuery = query.toLowerCase();
      const filtered = allItems.filter(item => 
        item.title.toLowerCase().includes(lowerQuery) || 
        item.description?.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery)
      ).slice(0, 8); // Limit to 8 results
      setResults(filtered);
      setSelectedIndex(0);
    }
  }, [query]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle search with Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }

      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % results.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
      } else if (e.key === 'Enter' && results.length > 0) {
        handleSelect(results[selectedIndex]);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Click Outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item: SearchItem) => {
    navigate(item.path);
    setQuery('');
    setIsOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div className="relative w-64 md:w-80" ref={containerRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input 
          ref={inputRef}
          type="text" 
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
          }}
          placeholder="Search..." 
          className="w-full pl-10 pr-12 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all focus:bg-white"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1 pointer-events-none">
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-bold text-gray-400 bg-gray-100 border border-gray-200 rounded">⌘K</kbd>
        </div>
      </div>

      {/* Results Dropdown */}
      {isOpen && (query || results.length > 0) && (
        <div className="absolute top-full mt-2 left-0 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100">
            {results.length > 0 ? (
                <div className="py-2">
                    <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider flex justify-between">
                        <span>Results</span>
                        <span>{results.length} found</span>
                    </div>
                    <ul>
                        {results.map((item, index) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => handleSelect(item)}
                                    onMouseEnter={() => setSelectedIndex(index)}
                                    className={`w-full text-left px-4 py-2.5 flex items-center justify-between group transition-colors ${
                                        index === selectedIndex ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className={`p-1.5 rounded-lg flex-shrink-0 ${index === selectedIndex ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-500'}`}>
                                            {item.icon}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium truncate">{item.title}</p>
                                            {item.description && (
                                                <p className={`text-xs truncate ${index === selectedIndex ? 'text-indigo-400' : 'text-gray-400'}`}>
                                                    {item.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {index === selectedIndex && <ArrowRight className="w-4 h-4 opacity-50" />}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="p-8 text-center text-gray-500">
                    <Command className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No results found for "{query}"</p>
                    <p className="text-xs mt-1 text-gray-400">Try searching for pages, invoices, or vendors.</p>
                </div>
            )}
            <div className="bg-gray-50 px-3 py-2 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400">
                <div className="flex gap-2">
                    <span><kbd className="font-sans border px-1 rounded bg-white">↑</kbd> <kbd className="font-sans border px-1 rounded bg-white">↓</kbd> to navigate</span>
                    <span><kbd className="font-sans border px-1 rounded bg-white">↵</kbd> to select</span>
                </div>
                <span><kbd className="font-sans border px-1 rounded bg-white">esc</kbd> to close</span>
            </div>
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
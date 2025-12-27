import { Users, FileText, CreditCard, PieChart, Activity, Link, Settings, Download, LayoutDashboard, BarChart3, AlertCircle } from 'lucide-react';

export const MOCK_CUSTOMERS = [
  { id: '1', name: 'Sarah Chen', avatar: 'https://picsum.photos/32/32?random=1', subscription: 'Active', totalSpend: '$1,250.75', lastActive: '2 days ago', joined: 'Jan 15, 2023' },
  { id: '2', name: 'Michael Brown', avatar: 'https://picsum.photos/32/32?random=2', subscription: 'Trial', totalSpend: '$0.00', lastActive: '5 hours ago', joined: 'Oct 28, 2023' },
  { id: '3', name: 'Fatima Khan', avatar: 'https://picsum.photos/32/32?random=3', subscription: 'Inactive', totalSpend: '$450.00', lastActive: '1 month ago', joined: 'Mar 01, 2022' },
  { id: '4', name: 'David Lee', avatar: 'https://picsum.photos/32/32?random=4', subscription: 'Active', totalSpend: '$3,200.50', lastActive: '1 hour ago', joined: 'Aug 20, 2021' },
  { id: '5', name: 'Maria Garcia', avatar: 'https://picsum.photos/32/32?random=5', subscription: 'Active', totalSpend: '$780.20', lastActive: '6 days ago', joined: 'Nov 10, 2023' },
];

export const MOCK_SUBSCRIPTIONS = [
  { id: '1', customerName: 'Acme Corp', email: 'acme@example.com', plan: 'Enterprise', status: 'Active', startDate: '2023-01-01', endDate: '2024-01-01', monthlyPrice: '$99.99' },
  { id: '2', customerName: 'Globex Inc.', email: 'globex@example.com', plan: 'Pro', status: 'Pending', startDate: '2023-02-15', endDate: '2024-02-15', monthlyPrice: '$49.99' },
  { id: '3', customerName: 'Soylent Corp', email: 'soylent@example.com', plan: 'Basic', status: 'Cancelled', startDate: '2023-03-01', endDate: '2023-09-01', monthlyPrice: '$19.99' },
  { id: '4', customerName: 'Initech LLC', email: 'initech@example.com', plan: 'Pro', status: 'Active', startDate: '2023-04-20', endDate: '2024-04-20', monthlyPrice: '$49.99' },
  { id: '5', customerName: 'Umbrella Corp', email: 'umbrella@example.com', plan: 'Enterprise', status: 'Suspended', startDate: '2023-05-10', endDate: '2024-05-10', monthlyPrice: '$99.99' },
  { id: '6', customerName: 'Weyland-Yutani', email: 'weyland@example.com', plan: 'Basic', status: 'Active', startDate: '2023-06-01', endDate: '2024-06-01', monthlyPrice: '$19.99' },
];

export const MOCK_SALES_TRANSACTIONS = [
  { invoiceNo: 'INV-2023-001', date: '2023-11-28', customer: 'Global Solutions Ltd.', type: 'B2B', taxableValue: '₹45,000', gstAmount: '₹8,100', totalValue: '₹53,100' },
  { invoiceNo: 'INV-2023-002', date: '2023-11-28', customer: 'Ramesh Sharma', type: 'B2C', taxableValue: '₹1,200', gstAmount: '₹216', totalValue: '₹1,416' },
  { invoiceNo: 'INV-2023-003', date: '2023-11-27', customer: 'Export Traders Inc.', type: 'Export', taxableValue: '₹75,000', gstAmount: '₹0', totalValue: '₹75,000' },
  { invoiceNo: 'INV-2023-004', date: '2023-11-27', customer: 'Tech Innovations Pvt. Ltd.', type: 'B2B', taxableValue: '₹28,000', gstAmount: '₹5,040', totalValue: '₹33,040' },
  { invoiceNo: 'INV-2023-005', date: '2023-11-26', customer: 'Priya Singh', type: 'B2C', taxableValue: '₹3,500', gstAmount: '₹630', totalValue: '₹4,130' },
];

export const COMPLIANCE_ALERTS = [
  { type: 'GSTR-3B Filing', description: 'Missing GSTR-3B for July 2023', period: 'July 2023', severity: 'Critical' },
  { type: 'Vendor Filing', description: 'Vendor GSTIN X not filed GSTR-1 for August 2023', period: 'August 2023', severity: 'High' },
  { type: 'ITC Mismatch', description: 'ITC mismatch detected in GSTR-2A vs Purchase Register', period: 'September 2023', severity: 'Medium' },
  { type: 'ITC Reversal', description: 'Input tax credit reversal required for non-payment to vendor', period: 'Q2 FY23-24', severity: 'High' },
  { type: 'Tax Discrepancy', description: 'Tax liability discrepancy identified for Q3', period: 'Q3 FY23-24', severity: 'Medium' },
  { type: 'Export Docs', description: 'Incomplete documentation for exports', period: 'October 2023', severity: 'Low' },
];

export const VENDOR_ITC_DATA = [
  { name: 'Global Suppliers Ltd.', gstin: '27AABCZ1234N1Z2', total: '₹ 500,000', eligible: '₹ 490,000', ineligible: '₹ 10,000' },
  { name: 'Tech Solutions Pvt. Ltd.', gstin: '27ZYXWJ5678Q1Z5', total: '₹ 320,000', eligible: '₹ 320,000', ineligible: '₹ 0' },
  { name: 'Office Supplies Inc.', gstin: '27PQRST6789R1Z1', total: '₹ 150,000', eligible: '₹ 145,000', ineligible: '₹ 5,000' },
  { name: 'Marketing Innovations', gstin: '27LMNOC1122S1Z3', total: '₹ 80,000', eligible: '₹ 75,000', ineligible: '₹ 5,000' },
  { name: 'Logistics Co.', gstin: '27DEFGH3344T1Z7', total: '₹ 120,000', eligible: '₹ 120,000', ineligible: '₹ 0' },
];

export const MISSING_INVOICES = [
  { number: 'INV0012345', vendor: '27ABCDA1234A1Z1', date: '2023-10-15', amount: '₹ 12,500', status: 'Missing' },
  { number: 'INV0012346', vendor: '27ABCDA1234A1Z1', date: '2023-10-18', amount: '₹ 8,900', status: 'Pending' },
  { number: 'INV0012347', vendor: '27BCDEF5678B1Z2', date: '2023-11-01', amount: '₹ 25,000', status: 'Missing' },
  { number: 'INV0012348', vendor: '27CDEFG9012C1Z3', date: '2023-11-05', amount: '₹ 5,200', status: 'Resolved' },
  { number: 'INV0012349', vendor: '27FGHIJ3456D1Z4', date: '2023-11-10', amount: '₹ 18,750', status: 'Missing' },
];

export const CHART_DATA_OVERVIEW = [
  { name: 'Jan', income: 45000, expense: 28000 },
  { name: 'Feb', income: 32000, expense: 30000 },
  { name: 'Mar', income: 38000, expense: 33000 },
  { name: 'Apr', income: 36000, expense: 31000 },
  { name: 'May', income: 42000, expense: 37000 },
  { name: 'Jun', income: 44000, expense: 39000 },
];

export const CHART_DATA_LINE = [
  { name: 'Jan', liability: 1850000, itc: 1510000 },
  { name: 'Feb', liability: 1910000, itc: 1530000 },
  { name: 'Mar', liability: 1890000, itc: 1520000 },
  { name: 'Apr', liability: 1980000, itc: 1650000 },
  { name: 'May', liability: 2100000, itc: 1750000 },
  { name: 'Jun', liability: 2050000, itc: 1700000 },
];

export const CHART_DATA_SALES_TREND = [
  { name: 'Jan', value: 320000 },
  { name: 'Feb', value: 350000 },
  { name: 'Mar', value: 310000 },
  { name: 'Apr', value: 380000 },
  { name: 'May', value: 410000 },
  { name: 'Jun', value: 390000 },
  { name: 'Jul', value: 430000 },
  { name: 'Aug', value: 450000 },
  { name: 'Sep', value: 430000 },
  { name: 'Oct', value: 470000 },
  { name: 'Nov', value: 500000 },
  { name: 'Dec', value: 530000 },
];

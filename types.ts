export interface NavItem {
  label: string;
  icon: any;
  path: string;
  subItems?: NavItem[];
}

export interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  isNegative?: boolean;
  subText?: string;
  icon?: any;
  iconColor?: string;
}

export interface Customer {
  id: string;
  name: string;
  avatar: string;
  subscription: 'Active' | 'Trial' | 'Inactive';
  totalSpend: string;
  lastActive: string;
  joined: string;
}

export interface Subscription {
  id: string;
  customerName: string;
  email: string;
  plan: 'Enterprise' | 'Pro' | 'Basic';
  status: 'Active' | 'Pending' | 'Cancelled' | 'Suspended';
  startDate: string;
  endDate: string;
  monthlyPrice: string;
}

export interface SalesTransaction {
  invoiceNo: string;
  date: string;
  customer: string;
  type: 'B2B' | 'B2C' | 'Export';
  taxableValue: string;
  gstAmount: string;
  totalValue: string;
}

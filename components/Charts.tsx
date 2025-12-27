import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const CommonGrid = () => <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />;
const CommonXAxis = ({ dataKey = "name" }) => <XAxis dataKey={dataKey} axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />;
const CommonYAxis = () => <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />;
const CommonTooltip = () => <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />;
const CommonLegend = () => <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />;

export const FinancialChart = ({ data, type = 'bar' }: { data: any[], type?: 'bar' | 'line' | 'area' }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      {type === 'bar' ? (
        <BarChart data={data} barSize={20}>
          <CommonGrid />
          <CommonXAxis />
          <CommonYAxis />
          <CommonTooltip />
          <CommonLegend />
          <Bar dataKey="income" name="Income" fill="#6366f1" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" name="Expense" fill="#ec4899" radius={[4, 4, 0, 0]} />
        </BarChart>
      ) : type === 'line' ? (
        <LineChart data={data}>
          <CommonGrid />
          <CommonXAxis />
          <CommonYAxis />
          <CommonTooltip />
          <CommonLegend />
          <Line type="monotone" dataKey="income" name="Income" stroke="#6366f1" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="expense" name="Expense" stroke="#ec4899" strokeWidth={2} dot={false} />
        </LineChart>
      ) : (
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ec4899" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CommonGrid />
          <CommonXAxis />
          <CommonYAxis />
          <CommonTooltip />
          <CommonLegend />
          <Area type="monotone" dataKey="income" name="Income" stroke="#6366f1" fillOpacity={1} fill="url(#colorIncome)" />
          <Area type="monotone" dataKey="expense" name="Expense" stroke="#ec4899" fillOpacity={1} fill="url(#colorExpense)" />
        </AreaChart>
      )}
    </ResponsiveContainer>
  );
};

export const LiabilityChart = ({ data, type = 'line' }: { data: any[], type?: 'bar' | 'line' | 'area' }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      {type === 'bar' ? (
        <BarChart data={data} barSize={20}>
          <CommonGrid />
          <CommonXAxis />
          <CommonYAxis />
          <CommonTooltip />
          <CommonLegend />
          <Bar dataKey="liability" name="Tax Liability" fill="#ef4444" radius={[4, 4, 0, 0]} />
          <Bar dataKey="itc" name="ITC Claimed" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        </BarChart>
      ) : type === 'line' ? (
        <LineChart data={data}>
          <CommonGrid />
          <CommonXAxis />
          <CommonYAxis />
          <CommonTooltip />
          <CommonLegend />
          <Line type="monotone" dataKey="liability" name="Tax Liability" stroke="#ef4444" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="itc" name="ITC Claimed" stroke="#f59e0b" strokeWidth={2} dot={false} />
        </LineChart>
      ) : (
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorLiab" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorItc" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CommonGrid />
          <CommonXAxis />
          <CommonYAxis />
          <CommonTooltip />
          <CommonLegend />
          <Area type="monotone" dataKey="liability" name="Tax Liability" stroke="#ef4444" fillOpacity={1} fill="url(#colorLiab)" />
          <Area type="monotone" dataKey="itc" name="ITC Claimed" stroke="#f59e0b" fillOpacity={1} fill="url(#colorItc)" />
        </AreaChart>
      )}
    </ResponsiveContainer>
  );
};

export const SalesAnalysisChart = ({ data, type = 'area' }: { data: any[], type?: 'bar' | 'line' | 'area' }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      {type === 'bar' ? (
         <BarChart data={data} barSize={20}>
            <CommonGrid />
            <CommonXAxis />
            <CommonYAxis />
            <CommonTooltip />
            <CommonLegend />
            <Bar dataKey="value" name="Total Sales" fill="#6366f1" radius={[4, 4, 0, 0]} />
         </BarChart>
      ) : type === 'line' ? (
         <LineChart data={data}>
            <CommonGrid />
            <CommonXAxis />
            <CommonYAxis />
            <CommonTooltip />
            <CommonLegend />
            <Line type="monotone" dataKey="value" name="Total Sales" stroke="#6366f1" strokeWidth={2} dot={false} />
         </LineChart>
      ) : (
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CommonGrid />
          <CommonXAxis />
          <CommonYAxis />
          <CommonTooltip />
          <Area 
            type="monotone" 
            dataKey="value" 
            name="Total Sales"
            stroke="#6366f1" 
            strokeWidth={2} 
            fillOpacity={1} 
            fill="url(#colorSales)" 
          />
          <CommonLegend />
        </AreaChart>
      )}
    </ResponsiveContainer>
  );
};

export const ITCAnalysisChart = ({ type = 'pie' }: { type?: 'pie' | 'donut' | 'bar' }) => {
  const data = [
    { name: 'Eligible', value: 75, color: '#10b981' },
    { name: 'Ineligible', value: 10, color: '#ef4444' },
    { name: 'Pending', value: 15, color: '#f59e0b' },
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      {type === 'bar' ? (
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e7eb" />
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 12}} />
            <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
            <Bar dataKey="value" barSize={30} radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
            </Bar>
        </BarChart>
      ) : (
        <PieChart>
            <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={type === 'donut' ? 60 : 0}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            >
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      )}
    </ResponsiveContainer>
  );
};

export const ComplianceScoreChart = ({ score }: { score: number }) => {
    return (
        <div className="relative flex flex-col items-center justify-center h-48">
            <svg viewBox="0 0 100 50" className="w-full h-full">
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#f3f4f6" strokeWidth="8" strokeLinecap="round" />
                <path 
                    d="M 10 50 A 40 40 0 0 1 90 50" 
                    fill="none" 
                    stroke="#1f2937" 
                    strokeWidth="8" 
                    strokeLinecap="round" 
                    strokeDasharray="126"
                    strokeDashoffset={126 - (126 * score) / 100}
                    className="transition-all duration-1000 ease-out"
                />
            </svg>
            <div className="absolute top-24 text-center">
                <div className="text-4xl font-bold text-gray-900">{score}</div>
                <div className="text-sm text-gray-500">Score</div>
            </div>
        </div>
    );
}

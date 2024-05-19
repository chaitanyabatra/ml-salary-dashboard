import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Table } from 'antd';
import salaryData from '../data/salaryData.json';

// Function to aggregate data
const getAggregatedData = (data: any) => {
  const result = data.reduce((acc: any, current: any) => {
    const { work_year, salary_in_usd, job_title } = current;
    if (!acc[work_year]) {
      acc[work_year] = { year: work_year, totalJobs: 0, totalSalary: 0, jobDetails: {} };
    }
    acc[work_year].totalJobs += 1;
    acc[work_year].totalSalary += salary_in_usd;
    if (!acc[work_year].jobDetails[job_title]) {
      acc[work_year].jobDetails[job_title] = 0;
    }
    acc[work_year].jobDetails[job_title] += 1;
    return acc;
  }, {});

  return Object.values(result).map((yearData: any) => ({
    year: yearData.year,
    totalJobs: yearData.totalJobs,
    averageSalary: yearData.totalSalary / yearData.totalJobs,
    jobDetails: Object.entries(yearData.jobDetails).map(([title, count]) => ({ title, count }))
    
  }));
};

const Analytics: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const aggregatedData = getAggregatedData(salaryData);

  const handleRowClick = (record: any) => {
    setSelectedYear(record.year);
  };

  const columns = [
    { title: 'Year', dataIndex: 'year', key: 'year', sorter: (a: any, b: any) => a.year - b.year, onCell: (record: any)=> ({ onClick: () => handleRowClick(record) }) },
    { title: 'Total Jobs', dataIndex: 'totalJobs', key: 'totalJobs', sorter: (a: any, b: any) => a.totalJobs - b.totalJobs },
    { title: 'Average Salary (USD)', dataIndex: 'averageSalary', key: 'averageSalary', sorter: (a: any, b: any) => a.averageSalary - b.averageSalary },
  ];

  const jobDetailsColumns = [
    { title: 'Job Title', dataIndex: 'title', key: 'title' },
    { title: 'Count', dataIndex: 'count', key: 'count' },
  ];

  const selectedJobDetails = aggregatedData.find(item => item.year === selectedYear)?.jobDetails || [];

  return (
    <div>
      <LineChart width={600} height={300} data={aggregatedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="totalJobs" stroke="#8884d8" />
      </LineChart>
      <Table dataSource={aggregatedData} columns={columns} rowKey="year" />
      {selectedYear && <Table dataSource={selectedJobDetails} columns={jobDetailsColumns} rowKey="title" />}
    </div>
  );
};

export default Analytics;

import React from 'react';
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

const MainTable: React.FC = () => {
  const aggregatedData = getAggregatedData(salaryData);

  const columns = [
    { title: 'Year', dataIndex: 'year', key: 'year', sorter: (a: any, b: any) => a.year - b.year },
    { title: 'Total Jobs', dataIndex: 'totalJobs', key: 'totalJobs', sorter: (a: any, b: any) => a.totalJobs - b.totalJobs },
    { title: 'Average Salary (USD)', dataIndex: 'averageSalary', key: 'averageSalary', sorter: (a: any, b: any) => a.averageSalary - b.averageSalary },
  ];

  return <Table dataSource={aggregatedData} columns={columns} rowKey="year" />;
};

export default MainTable;

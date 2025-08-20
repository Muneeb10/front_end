import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [isCalculated, setIsCalculated] = useState(false);

  useEffect(() => {
    if (emi) {
      setIsCalculated(true);
    }
  }, [emi]);

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const N = parseInt(tenure);

    if (!P || !annualRate || !N) {
      setEmi(null);
      setChartData([]);
      setIsCalculated(false);
      return;
    }

    const R = annualRate / 12 / 100; // Monthly Interest Rate

    const emiValue =
      (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);

    const totalPaymentValue = emiValue * N;
    const totalInterestValue = totalPaymentValue - P;

    setEmi(emiValue.toFixed(2));
    setTotalInterest(totalInterestValue.toFixed(2));
    setTotalPayment(totalPaymentValue.toFixed(2));

    setChartData([
      { name: "Principal", value: P },
      { name: "Interest", value: parseFloat(totalInterestValue.toFixed(2)) },
    ]);
  };

  const resetCalculator = () => {
    setLoanAmount("");
    setInterestRate("");
    setTenure("");
    setEmi(null);
    setChartData([]);
    setIsCalculated(false);
  };

  const COLORS = ["#029fae", "#f0f2f3"];
  const formatTooltip = (value) => `₹${value.toLocaleString('en-IN')}`;

  return (
    <div className="min-h-screen bg-[#f0f2f3] p-4 w-full">
      <div className="bg-white shadow-xl rounded-3xl p-4 md:p-6 lg:p-8 w-full overflow-hidden transition-all duration-300 hover:shadow-2xl mx-auto max-w-6xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#029fae] to-cyan-600">
          EMI Calculator
        </h1>
        <p className="text-base sm:text-lg text-gray-600 text-center mx-auto max-w-3xl">
          Our EMI Calculator is a powerful financial tool designed to help you make informed decisions about your loans. Whether you're planning for a home loan, car loan, personal loan, or any other type of credit, this calculator provides a clear breakdown of your monthly payments and total loan cost.
        </p>
        <div className="grid grid-cols-1 mt-6 sm:mt-8 lg:grid-cols-2 gap-6 sm:gap-8 w-full">
          {/* Input Section */}
          <div className="space-y-4 sm:space-y-6 w-full">
            <div className="p-4 sm:p-6 rounded-2xl border border-gray-200 w-full">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Loan Amount (₹)</label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="e.g. 500000"
                  className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#029fae] focus:border-transparent transition"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Interest Rate (% per annum)</label>
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="e.g. 8.5"
                  step="0.1"
                  className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#029fae] focus:border-transparent transition"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Loan Tenure (Months)</label>
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  placeholder="e.g. 60"
                  className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#029fae] focus:border-transparent transition"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={calculateEMI}
                  className="flex-1 bg-[#029fae] hover:bg-[#028a97] text-white py-3 rounded-xl font-semibold transition-all duration-300 sm:transform sm:hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  Calculate EMI
                </button>
                <button
                  onClick={resetCalculator}
                  className="flex-1 border-2 border-teal-500 hover:from-gray-600 hover:to-gray-800 text-teal-500 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Reset
                </button>
              </div>
            </div>

            {emi && (
              <div className={`bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-md transition-opacity duration-500 w-full ${isCalculated ? 'opacity-100' : 'opacity-0'}`}>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 text-center">Loan Summary</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-[#f0f2f3] p-3 sm:p-4 rounded-xl text-center">
                    <p className="text-sm text-gray-700 font-medium">Monthly EMI</p>
                    <p className="text-lg sm:text-xl font-bold text-gray-900">₹ {emi}</p>
                  </div>
                  <div className="bg-[#e0f7fa] p-3 sm:p-4 rounded-xl text-center">
                    <p className="text-sm text-gray-700 font-medium">Total Interest</p>
                    <p className="text-lg sm:text-xl font-bold text-gray-900">₹ {totalInterest}</p>
                  </div>
                  <div className="bg-[#029fae] p-3 sm:p-4 rounded-xl text-center sm:col-span-2">
                    <p className="text-sm text-white font-medium">Total Payment</p>
                    <p className="text-lg sm:text-xl font-bold text-white">₹ {totalPayment}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chart Section */}
          <div className="flex flex-col items-center justify-center w-full">
            {chartData.length > 0 ? (
              <div className={`w-full transition-opacity duration-700 ${isCalculated ? 'opacity-100' : 'opacity-0'}`}>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 text-center">Payment Breakdown</h2>
                <div className="h-64 sm:h-72 md:h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        innerRadius={50}
                        dataKey="value"
                        animationDuration={1000}
                        animationEasing="ease-out"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={formatTooltip} />
                      <Legend 
                        iconType="circle" 
                        iconSize={10}
                        formatter={(value) => <span className="text-sm text-gray-700">{value}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-600">
                  <p>Principal: ₹{parseFloat(loanAmount).toLocaleString('en-IN')}</p>
                  <p>Interest Payable: ₹{totalInterest}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 sm:h-72 md:h-80 w-full bg-gradient-to-br from-[#f0f2f3] to-cyan-50 rounded-2xl border-2 border-dashed border-gray-300 p-6 text-center">
                <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                <p className="text-sm sm:text-base text-gray-500 font-medium">Enter loan details and calculate to see visualization</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

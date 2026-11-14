import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Rectangle,
  LineChart,
  Line,
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#84cc16", "#64748b", "#0ea5e9", "#f59e0b"];
const CustomBarShape = (props) => {
  const { index } = props;
  return (
    <Rectangle
      {...props}
      fill={COLORS[index % COLORS.length]}
      radius={[6, 6, 0, 0]}
    />
  );
};

const CustomPieShape = (props) => {
  const { index, ...rest } = props;

  return <Sector {...rest} fill={COLORS[index % COLORS.length]} />;
};
const ReChartSetUp = ({ charts }) => {
  return (
    <div>
      {charts.map((chart, index) => (
        <div key={index}>
          <h4>{chart.title}</h4>

          <ResponsiveContainer width="100%" height={300}>
            {chart.type === "bar" && (
              <BarChart data={chart.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="value"
                  radius={[6, 6, 0, 0]}
                  barSize={50}
                  shape={CustomBarShape}
                ></Bar>
              </BarChart>
            )}

            {chart.type === "line" && (
              <LineChart data={chart.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            )}

            {chart.type === "pie" && (
              <PieChart>
                <Pie
                  data={chart.data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  shape={CustomPieShape}
                />
                <Tooltip />
                <Legend />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
};

export default ReChartSetUp;

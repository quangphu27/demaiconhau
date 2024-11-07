import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const ChartComponent = () => {
  const [dates, setDates] = useState([]);
  const [counts, setCounts] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        const formattedDates = data.map(item => item.ngayPhatHanh);
        const formattedCounts = data.map(item => item.soLuong);
        setDates(formattedDates);
        setCounts(formattedCounts);
      })
      .catch((error) => console.error('Error loading JSON:', error));
  }, []);

  return (
    <Plot
      data={[{
        x: dates,
        y: counts,
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'blue' },
      }]}
      layout={{
        title: 'Biểu đồ Số lượng Bài viết',
        xaxis: { title: 'Ngày phát hành' },
        yaxis: { title: 'Số lượng' },
        template: 'plotly_white',
      }}
    />
  );
};

export default ChartComponent;

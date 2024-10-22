import React from "react";
import ReactApexChart from "react-apexcharts";
// import Chart from "react-apexchart";

const PieChartComp =  () => {
    const opts = {
        options: {
            chart: {
                type: 'donut'
              },
              
 
            
          },
         
  series: [  66, 34,],
  chartOptions: {
    labels: ['Apple', 'Watermelon']
  }
          
        };
    
    return (
        <div className="row">
        <div className="mixed-chart">
          <ReactApexChart
            options={opts.options}
            series={opts.series}
            type="pie"
            width={300}
            height={300}
          />
        </div>
      </div>
    )
}

export default PieChartComp;
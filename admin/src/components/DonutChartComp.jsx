import React from "react";
import ReactApexChart from "react-apexcharts";
// import Chart from "react-apexchart";

const DonutComp =  () => {
    const opts = {
        options: {
            chart: {
                type: 'donut'
              }
            
          },
          series: [44, 55, 35,],
          chartOptions: {  
            labels: ['Apple', 'Mango', 'Orange', ]
          }
          
        };
    
    return (
        <div className="row">
        <div className="mixed-chart">
          <ReactApexChart
            options={opts.options}
            series={opts.series}
            type="donut"
            width={300}
            height={300}
            
          />
        </div>
      </div>
    )
}

export default DonutComp;
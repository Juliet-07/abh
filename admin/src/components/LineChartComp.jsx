import React from "react";
import ReactApexChart from "react-apexcharts";
// import Chart from "react-apexchart";

const LinechartComp =  () => {
    const opts = {
        options: {
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "jun", "july", "Aug", "Sep", "Oct", "Nov", "Dec"]
            },
            plotOptions: {
                bar: {
                  borderRadius: 10,
                  color: "teal"
                }
              },
              stroke: {
                curve: 'smooth',
              }
          },
          series: [
            {
              name: "series-1",
              data: [30, 40, 45, 50, 90, 60, 70, 40, 10, 0, 0, 0]
            }
          ]
        };
    
    return (
        <div className="row">
        <div className="mixed-chart">
          <ReactApexChart
            options={opts.options}
            series={opts.series}
            type="area"
            width="97%"
            height={400}
          />
        </div>
      </div>
    )
}

export default LinechartComp;
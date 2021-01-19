import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill,
  ApexStroke,
  ApexLegend,
  ApexPlotOptions,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexGrid,
  ApexMarkers
} from 'ng-apexcharts';
export type circleChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive | ApexResponsive[];
};
export type radarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  fill: ApexFill;
  markers: ApexMarkers;
  xaxis: ApexXAxis;
};
export type areaChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};
export type pieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  responsive: ApexResponsive[];
  labels: any;
};
export type avgLecChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};
declare const Chart: any;
declare const window: any;
@Component({
  selector: 'app-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.sass']
})
export class ChartWidgetComponent implements OnInit {
  public radarChartOptions: any;
  public circleChartOptions: any;
  public areaChartOptions: any;
  public pieChartOptions: any;
  public avgLecChartOptions: any;
  constructor() {}
  @ViewChild('chart', { static: true }) chart: ChartComponent;

  ngOnInit() {
    this.initChartReport1();
    this.initChartReport2();
    this.initChartReport3();
    this.initChartReport4();
    this.pieChart();
    this.radarChart();
    this.chartArea();
  }
  private initChartReport1() {
    var canvas = <HTMLCanvasElement>document.getElementById('chartReport1');
    // Apply multiply blend when drawing datasets
    var multiply = {
      beforeDatasetsDraw: function (chart, options, el) {
        chart.ctx.globalCompositeOperation = 'multiply';
      },
      afterDatasetsDraw: function (chart, options) {
        chart.ctx.globalCompositeOperation = 'source-over';
      }
    };
    // Gradient color - this week
    var gradientThisWeek = canvas
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 150);
    gradientThisWeek.addColorStop(0, '#5555FF');
    gradientThisWeek.addColorStop(1, '#9787FF');
    // Gradient color - previous week
    var gradientPrevWeek = canvas
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 150);
    gradientPrevWeek.addColorStop(0, '#FF55B8');
    gradientPrevWeek.addColorStop(1, '#FF8787');
    var config = {
      type: 'line',
      data: {
        labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
        datasets: [
          {
            label: 'This week',
            data: [24, 18, 16, 18, 24, 36, 28],
            backgroundColor: gradientThisWeek,
            borderColor: 'transparent',
            pointBackgroundColor: '#FFFFFF',
            pointBorderColor: '#FFFFFF',
            lineTension: 0.4
          },
          {
            label: 'Previous week',
            data: [20, 22, 30, 22, 18, 22, 30],
            backgroundColor: gradientPrevWeek,
            borderColor: 'transparent',
            pointBackgroundColor: '#FFFFFF',
            pointBorderColor: '#FFFFFF',
            lineTension: 0.4
          }
        ]
      },
      options: {
        elements: {
          point: {
            radius: 0,
            hitRadius: 5,
            hoverRadius: 5
          }
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              display: false
            }
          ],
          yAxes: [
            {
              display: false,
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      },
      plugins: [multiply]
    };
    window.chart = new Chart(canvas, config);
  }
  private initChartReport2() {
    var canvas = <HTMLCanvasElement>document.getElementById('chartReport2');
    var gradientBlue = canvas
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 150);
    gradientBlue.addColorStop(0, 'rgba(85, 85, 255, 0.9)');
    gradientBlue.addColorStop(1, 'rgba(151, 135, 255, 0.8)');
    var gradientHoverBlue = canvas
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 150);
    gradientHoverBlue.addColorStop(0, 'rgba(65, 65, 255, 1)');
    gradientHoverBlue.addColorStop(1, 'rgba(131, 125, 255, 1)');
    var gradientRed = canvas
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 150);
    gradientRed.addColorStop(0, 'rgba(255, 85, 184, 0.9)');
    gradientRed.addColorStop(1, 'rgba(255, 135, 135, 0.8)');
    var gradientHoverRed = canvas
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 150);
    gradientHoverRed.addColorStop(0, 'rgba(255, 65, 164, 1)');
    gradientHoverRed.addColorStop(1, 'rgba(255, 115, 115, 1)');
    var redArea = null;
    var blueArea = null;
    var shadowed = {
      beforeDatasetsDraw: function (chart, options) {
        chart.ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
        chart.ctx.shadowBlur = 40;
      },
      afterDatasetsDraw: function (chart, options) {
        chart.ctx.shadowColor = 'rgba(0, 0, 0, 0)';
        chart.ctx.shadowBlur = 0;
      }
    };
    window.chart = new Chart(document.getElementById('chartReport2'), {
      type: 'radar',
      data: {
        labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
        datasets: [
          {
            label: 'Product',
            data: [25, 59, 90, 81, 60, 82, 52],
            fill: true,
            backgroundColor: gradientRed,
            borderColor: 'transparent',
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent',
            pointHoverBackgroundColor: 'transparent',
            pointHoverBorderColor: 'transparent',
            pointHitRadius: 50
          },
          {
            label: 'Services',
            data: [40, 100, 40, 90, 40, 90, 84],
            fill: true,
            backgroundColor: gradientBlue,
            borderColor: 'transparent',
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent',
            pointHoverBackgroundColor: 'transparent',
            pointHoverBorderColor: 'transparent',
            pointHitRadius: 50
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        gridLines: {
          display: false
        },
        scale: {
          ticks: {
            maxTicksLimit: 1,
            display: false
          }
        }
      },
      plugins: [shadowed]
    });
  }
  private initChartReport3() {
    this.pieChartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        type: 'donut',
        width: 200
      },
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      labels: ['Science', 'Mathes', 'Economics', 'History', 'Music'],
      responsive: [
        {
          breakpoint: 480,
          options: {}
        }
      ]
    };
  }
  private initChartReport4() {
    this.avgLecChartOptions = {
      series: [
        {
          name: 'Avg. Lecture',
          data: [65, 72, 62, 73, 66, 74, 63, 67]
        }
      ],
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'July', 'Aug'],
        title: {
          text: 'Weekday'
        }
      },
      yaxis: {
        title: {
          text: 'Avg. Lecture'
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['#35fdd8'],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      },
      markers: {
        size: 4,
        colors: ['#FFA41B'],
        strokeColors: '#fff',
        strokeWidth: 2,
        hover: {
          size: 7
        }
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true
        },
        x: {
          show: true
        }
      }
    };
  }
  private pieChart() {
    this.circleChartOptions = {
      series: [76, 67, 61, 90],
      chart: {
        height: 260,
        type: 'radialBar'
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: '30%',
            background: 'transparent',
            image: undefined
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              show: false
            }
          }
        }
      },
      colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
      labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
      legend: {
        show: true,
        floating: true,
        fontSize: '16px',
        position: 'left',
        offsetX: 50,
        offsetY: 10,
        labels: {
          useSeriesColors: true
        },
        formatter: function (seriesName, opts) {
          return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex];
        },
        itemMargin: {
          horizontal: 3
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false
            }
          }
        }
      ]
    };
  }
  private radarChart() {
    this.radarChartOptions = {
      series: [
        {
          name: 'Series Blue',
          data: [80, 50, 30, 40, 100, 20]
        },
        {
          name: 'Series Green',
          data: [20, 30, 40, 80, 20, 80]
        },
        {
          name: 'Series Orange',
          data: [44, 76, 78, 13, 43, 10]
        }
      ],
      chart: {
        height: 250,
        type: 'radar',
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1
        }
      },
      stroke: {
        width: 0
      },
      fill: {
        opacity: 0.4
      },
      markers: {
        size: 0
      },
      xaxis: {
        categories: ['2011', '2012', '2013', '2014', '2015', '2016']
      }
    };
  }
  private chartArea() {
    this.areaChartOptions = {
      chart: {
        height: 240,
        type: 'area',
        toolbar: {
          show: false
        }
      },
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      series: [
        {
          name: 'series1',
          data: [31, 40, 28, 51, 42]
        },
        {
          name: 'series2',
          data: [11, 32, 45, 32, 34]
        }
      ],
      xaxis: {
        type: 'datetime',
        categories: ['1990', '1991', '1992', '1993', '1994']
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        }
      }
    };
  }
}

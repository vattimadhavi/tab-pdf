import { Component, AfterViewInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(...registerables);   
Chart.register(ChartDataLabels);      

@Component({
  selector: 'app-population',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './population.html',
  styleUrls: ['./population.css']
})
export class Population implements AfterViewInit {
  pieChartData: ChartData<'pie'> = {
    labels: ['West Australia', 'South Australia','New South Wales', 'Victoria', 'Queensland', 'Tasmania', 'Northern Territory', 'Australian Capital Territory', 'Other'],
    datasets: [{
      data: [10.3, 7.3, 32.3, 25, 20.2, 1.9, 1.2, 1.8, 0.4],
      backgroundColor: ['#261eff', '#DC143C','#FFA500', '#32CD32', '#be70db', '#008cff', '#e12285', '#1ae05c', '#A9A9A9'],
      hoverOffset: 4
    }]
  };

  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right'
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value}%`;
          }
        }
      },
     datalabels: {
  color: '#fff',
  font: {
    weight: 'bold',
    size: 14
  },
  formatter: (value, ctx) => {
    if ((value as number) < 2) return null; 
    const total = ctx.chart.data.datasets[0].data.reduce((acc:any, val:any) => acc + val, 0);
    const percentage = ((value as number) / total * 100).toFixed(1);
    return `${percentage}%`;
  },
  anchor: 'center',
  align: 'center'
}
    }
  };

  ngAfterViewInit() {
    this.pieChartData = { ...this.pieChartData }; 
  }
}

import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register all the default scales
Chart.register(...registerables);

const chartData = {
    labels: ['Overall Return', 'Parlay Return', 'Single Return'],
    datasets: [{
        label: 'Values',
        data: [
            parseFloat((localStorage.getItem('totalWon') - localStorage.getItem('totalStake')) + (localStorage.getItem('totalSingleWon') - localStorage.getItem('totalSingleStake'))),
            parseFloat(localStorage.getItem('totalWon') - localStorage.getItem('totalStake')),
            parseFloat(localStorage.getItem('totalSingleWon') - localStorage.getItem('totalSingleStake')),
        ],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1
    }]
}

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true
        },
        x: {
            stacked: true
        }
    },
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            titleFont: {
                weight: 'bold'
            },
            bodyFont: {
                weight: 'normal'
            },
            callbacks: {
                label: function(context) {
                    return context.parsed.y + localStorage.getItem('currency');
                }
            }
        }
    }
}

export default function BarChart() {
    return (
        <div className="w-[100vw] sm:w-[60vw] h-[40vh] sm:h-[60vh]">
            <Bar options={chartOptions} data={chartData} />
        </div>
    )
}
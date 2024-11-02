import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import {useEffect} from "react";

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
            'rgba(149, 236, 32, 1)',
            'rgba(47, 61, 246, 1)',
            'rgba(253, 48, 48, 1)',
        ],
        borderColor: [
            'rgba(109, 180, 13, 1)',
            'rgba(11, 20, 138, 1)',
            'rgba(123, 8, 8, 1)',
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

    useEffect(() => {
        chartData.datasets[0].data = [
            parseFloat((localStorage.getItem('totalWon') - localStorage.getItem('totalStake')) + (localStorage.getItem('totalSingleWon') - localStorage.getItem('totalSingleStake'))),
            parseFloat(localStorage.getItem('totalWon') - localStorage.getItem('totalStake')),
            parseFloat(localStorage.getItem('totalSingleWon') - localStorage.getItem('totalSingleStake')),
        ]
    }, []);


    return (
        <div className="w-[100vw] sm:w-[60vw] h-[40vh] sm:h-[60vh]">
            <Bar options={chartOptions} data={chartData} />
        </div>
    )
}
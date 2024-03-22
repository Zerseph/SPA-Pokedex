/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import styleCard from './Card.module.css';

const ChartComponent = ({
    hp,
    attack,
    defense,
    special_attack,
    special_defense,
    speed
}) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        const maxStats = {
            hp: 255,
            attack: 190,
            defense: 230,
            special_attack: 194,
            special_defense: 230,
            speed: 180
        };

        // destruir chart si este existe
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['HP', 'Attack', 'Def', 'At. Esp.', 'Def. Esp.', 'Speed'],
                datasets: [{
                    label: 'Stats',
                    data: [hp, attack, defense, special_attack, special_defense, speed],
                    backgroundColor: 'rgba(54, 162, 235, 1)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                    pointBorderColor: '#fff',
                    borderWidth: 1,
                }]
            },
            options: {
                layout: {
                    padding: {
                        top: -50,
                        bottom: 0,
                        left: -50,
                        right: -50
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: Math.max(...Object.values(maxStats)) + 10,
                        ticks: {
                            display: false // Oculta las etiquetas del eje radial
                        },
                        grid: {
                            lineWidth: 1
                        },
                        pointLabels: {
                            fontSize: 14,
                            fontColor: '#000',
                            fontFamily: "'Arial', sans-serif",
                            fontStyle: 'bold',
                            display: true, // Muestra los nombres de las estadísticas
                            padding: -20,
                            offset: 10,
                            color: 'rgba(0, 0, 0, 1)',
                            font: {
                                weight: 'bold'
                            }
                        }
                    }
                }
            }
        });
    
    }, [hp, attack, defense, special_attack, special_defense, speed]);

    return <canvas ref={chartRef} className={styleCard.chartCanvas}></canvas>;
};

export default ChartComponent;

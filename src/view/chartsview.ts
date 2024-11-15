import ApexCharts from 'apexcharts'

export function renderRatioChart(el: HTMLDivElement) {
    const options = {
        series: [{
            data: [1100, 1380]
        }],
        chart: {
            type: 'bar',
            height: 100,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                borderRadiusApplication: 'end',
                horizontal: true,
                distributed: true
            }
        },
        legend: {
            show: true,
            markers: {
                fillColors: ['#ba72d6', '#431e51'],
            },
            labels: {
                colors: ['#ffffff', '#ffffff'],
            }
        },
        colors: ['#ba72d6', '#431e51'],
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: ['Done', 'Received'],
            labels: {
                show: false,
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }

        },
        yaxis: {
            labels: {
                show: true,
                style: {
                    colors: ['#ffffff', '#ffffff'],
                }
            }
        }
    };

    setTimeout(() => {
        const chart = new ApexCharts(el, options);
        chart.render()
    }, 0)
}

export function renderProgressChart(el: HTMLDivElement) {

    const options = {
        series: [{
            name: "Desktops",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
        chart: {
            height: 300,
            width: 600,
            type: 'line',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        }
    };
    setTimeout(() => {
        const chart = new ApexCharts(el, options);
        chart.render();
    }, 0)

}

export function renderBestSkillsChart(el: HTMLDivElement) {
    var options = {
        series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
        chart: {
            type: 'polarArea',
            height: 250,
            width: 300,
        },
        stroke: {
            colors: ['#fff']
        },
        fill: {
            opacity: 0.8
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };
    setTimeout(() => {
        var chart = new ApexCharts(el, options);
        chart.render();
    }, 0)
    // var chart = new ApexCharts(el, options);
    // chart.render();

}


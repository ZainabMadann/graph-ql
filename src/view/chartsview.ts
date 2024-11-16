import ApexCharts from 'apexcharts'
import UserRatioModel from '../model/userRatioModel';

export async function renderRatioChart(el: HTMLDivElement) {
    const [userdata, error] = await UserRatioModel()
    if (error){
        console.error(error.message)
        alert(`error: ${error.message}`)
        return
    }
    // console.log(userdata.totalUp ,userdata.totalDown  )
    //@ts-ignore
    const roundedTotalUp = (userdata.totalUp / 1000000).toFixed(2)
    //@ts-ignore
    const roundedTotalDown = (userdata.totalDown / 1000000).toFixed(2)

    const audit = document.getElementById('ratio-span')
    if(!audit){
        return
    }
    const srtRatio = userdata.totalRatio.toFixed(1)
    audit.textContent = srtRatio
    const options = {
        series: [{
            data: [roundedTotalUp, roundedTotalDown]
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
    // setTimeout(() => {
    //     const chart = new ApexCharts(el, options);
    //     chart.render()
    // }, 0)
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


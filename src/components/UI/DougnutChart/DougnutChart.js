import "./DougnutChart.css"
import { Chart as ChartJS , ArcElement , Tooltip , Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement ,Tooltip ,Legend)

const options = {
    plugins:{
        legend:{
            labels:{
                color: "#FFF",
            }
        }
    }
}
const DougnutChart = ({ usedData , colors }) => {

    const charData = {
        labels: Object.keys(usedData),
        datasets:[
            {   
                data:Object.values(usedData),
                backgroundColor:colors,
                // borderColor:colors,
                borderColor:"#fff",
                borderWidth:1
            }
        ]
    }


    return (
        <div className="dougnut-chart">
            <div className="dougnut-chart-box">
                <Doughnut data={charData} options={options} />
            </div>  
        </div>
    )
}

export default DougnutChart
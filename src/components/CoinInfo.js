import React, { useEffect, useState, useRef } from 'react'
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { HistoricalChart } from '../config/Api';
import { ThemeProvider, createTheme } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,

} from 'chart.js';
import { chartDays } from '../config/data';
import SelectButton from './SelectButton';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const [chartInstance, setChartInstance] = useState(null);
  const { currency } = CryptoState();
  const chartRef = useRef();
  const [flag,setflag] = useState(false);

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency))
    setHistoricalData(data.prices);
  }

  useEffect(() => {
    fetchHistoricData();
  }, [currency, days]);

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }

    if (chartRef && chartRef.current) {
      const newChartInstance = new ChartJS(chartRef.current, {
        type: 'line',
        data: chartData,
        options: {
          elements: {
            point: {
              radius: 1,
            },
          },
        },
      });

      setChartInstance(newChartInstance);
    }
  }, [historicData, days]);

  const chartData = historicData && {
    labels: historicData.map(coin => {
      let date = new Date(coin[0]);
      let time =
        date.getHours() > 12
          ? `${date.getHours() - 12}:${date.getMinutes()} PM `
          : `${date.getHours()}:${date.getMinutes()} AM`;

      return days === 1 ? time : date.toLocaleDateString();
    }),

    datasets: [
      {
        data: historicData.map(coin => coin[1]),
        label: `Price ( Past ${days} Days ) in ${currency}`,
        borderColor: "#EEBC1D",
      },
    ],
  }

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#484848",
      },
      mode: 'dark',
    },
  });

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className='container2'>
          {!historicData ? (
            <CircularProgress
              style={{ color: "gold" }}
              size={250}
              thickness={1} />

          ) : (
            <canvas ref={chartRef} />
          )
          }
        </div>
        <div
          style={{
            display:"flex",
            marginTop:20,
            justifyContent:"space-around",
            width:"100%",
          }}
        >
             {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
        </div>
      </ThemeProvider>
    </div>
)}
export default CoinInfo

import { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { UtilService } from "../services/UtilService";
import { useAppSelector } from "../hooks/useStoreTypes";

export const Dashboard = () => {
  const { events } = useAppSelector((state) => state.eventModule);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const { he } = UtilService;
  const eventTypes = Object.values(he.eventType);
  const textColor = "whitesmoke";

  useEffect(() => {
    if (events.length) {
      const data = getData();
      const options = getOptions();
      setChartData(data);
      setChartOptions(options);
    }
  }, [events]);

  const getData = () => {
    return {
      labels: eventTypes,
      datasets: [
        {
          label: "כמות אירועים לפי סוג",
          data: events.length ? getEventCountByType() : [],
          backgroundColor: [
            "rgba(255, 159, 64, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(46, 192, 41, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgb(255, 159, 64)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgba(46, 192, 41, 1)",
            "rgb(153, 102, 255)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const getOptions = () => {
    return {
      animation: false, // disable animation to prevent jump
      plugins: {
        legend: { labels: { color: textColor } },
        title: { color: textColor },
      },
      scales: {
        x: { ticks: { color: textColor } },
        y: {
          beginAtZero: true,
          ticks: {
            color: textColor,
            precision: 0, // show only integers
          },
        },
      },
    };
  };

  const getEventCountByType = () => {
    return eventTypes.map(
      (type) => events.filter((event) => event.type === type).length,
    );
  };

  const isChartReady = "datasets" in chartData;

  return (
    <div className="card">
      {isChartReady && (
        <Chart type="bar" data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

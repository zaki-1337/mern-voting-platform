import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from "axios";

class PieRechartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, pieData: undefined, COLORS: undefined };
  }

  componentDidMount() {
    axios.post("http://localhost:3001/app/piechartData").then((response) => {
      // console.log(response.data);
      let colors = [];
      let tempArr = response.data.arrayTemp;

      tempArr.forEach(() => {
        colors.push("#" + Math.floor(Math.random() * 16777215).toString(16));
      });

      this.setState({ pieData: tempArr });
      this.setState({ COLORS: colors });
      this.setState({ isLoading: false });
    });
  }

  CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#ffff",
            padding: "5px",
            border: "1px solid #cccc",
          }}
        >
          <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
        </div>
      );
    }
    return null;
  };

  render() {
    const { isLoading, COLORS, pieData } = this.state;

    if (isLoading) {
      return <div className="App">Loading...</div>;
    }

    return (
      <PieChart width={730} height={300}>
        <Pie
          data={pieData}
          color="#000000"
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<this.CustomTooltip />} />
        <Legend />
      </PieChart>
    );
  }
}
export default PieRechartComponent;

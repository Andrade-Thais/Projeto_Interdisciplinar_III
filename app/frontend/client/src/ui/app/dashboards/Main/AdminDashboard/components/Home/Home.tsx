import { useState, useEffect } from "react";
import {
  BsCash,
  BsCashStack,
  BsCashCoin,
  BsCardImage,
  BsFillPersonCheckFill,
  BsFillPersonPlusFill,
} from "react-icons/bs";
import { FaFilePdf, FaFileCsv } from "react-icons/fa";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { saveAs } from "file-saver";

function Home() {
  const [dashboardData, setDashboardData] = useState({
    receitas: 0,
    despesas: 0,
    saldo: 0,
    galerias: 0,
    clientes: 0,
    prospeccoes: 0,
  });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch dashboard data
    axios
      .get("http://localhost:8000/app/aggregate")
      .then((response) => {
        setDashboardData(response.data);

        // Create chart data
        const data = [
          { name: "Receitas", value: response.data.receitas },
          { name: "Despesas", value: response.data.despesas },
          { name: "Saldo", value: response.data.saldo },
        ];
        setChartData(data);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);

  // Pie chart colors
  const COLORS = ["#AFBF9F", "#FF7F7F", "#FFFEC8"];

  // Function to export data to PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Dashboard Report", 14, 20);
    doc.autoTable({
      startY: 30,
      head: [["Metric", "Value"]],
      body: [
        ["Receitas", `R$ ${dashboardData.receitas.toFixed(2)}`],
        ["Despesas", `R$ ${dashboardData.despesas.toFixed(2)}`],
        ["Saldo", `R$ ${dashboardData.saldo.toFixed(2)}`],
        ["Galerias", dashboardData.galerias],
        ["Clientes", dashboardData.clientes],
        ["Prospecções", dashboardData.prospeccoes],
      ],
    });
    doc.save("Relatorio-Completo.pdf");
  };

  // Function to export data to CSV
  const exportCSV = () => {
    const csvContent = [
      ["Metric", "Value"],
      ["Receitas", `R$ ${dashboardData.receitas.toFixed(2)}`],
      ["Despesas", `R$ ${dashboardData.despesas.toFixed(2)}`],
      ["Saldo", `R$ ${dashboardData.saldo.toFixed(2)}`],
      ["Galerias", dashboardData.galerias],
      ["Clientes", dashboardData.clientes],
      ["Prospecções", dashboardData.prospeccoes],
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "Relatorio-Completo.csv");
  };

  return (
    <div className="flex flex-col">
      <main className="flex-grow w-full">
        <div className="title font-bold m-4">
          <h1 className="text-3xl">PÁGINA DE CONTROLE</h1>
        </div>

        <div className="flex justify-end mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2 flex items-center"
            onClick={exportPDF}
          >
            <FaFilePdf className="mr-2" />
            Export to PDF
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
            onClick={exportCSV}
          >
            <FaFileCsv className="mr-2" />
            Export to CSV
          </button>
        </div>

        <div className="main-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="card text-center font-bold flex flex-col italic bg-success p-4">
            <div className="card-inner flex flex-col">
              <h3>RECEITAS DO MÊS</h3>
              <BsCash className="card_icon" />
            </div>
            <h1>R$ {dashboardData.receitas.toFixed(2)}</h1>
          </div>
          <div className="card text-center font-bold italic bg-error p-4">
            <div className="card-inner flex flex-col">
              <h3>DESPESAS DO MÊS</h3>
              <BsCashStack className="card_icon" />
            </div>
            <h1>R$ {dashboardData.despesas.toFixed(2)}</h1>
          </div>
          <div className="card text-center font-bold italic bg-warning p-4">
            <div className="card-inner flex flex-col items-center">
              <h3>SALDO</h3>
              <BsCashCoin className="card_icon" />
            </div>
            <h1>R$ {dashboardData.saldo.toFixed(2)}</h1>
          </div>
          <div className="card text-center font-bold italic bg-primary p-4">
            <div className="card-inner flex flex-col items-center">
              <h3>GALERIA DE FOTOS</h3>
              <BsCardImage className="card_icon" />
            </div>
            <h3>Galerias cadastradas</h3>
            <h1>{dashboardData.galerias}</h1>
          </div>
          <div className="card text-center font-bold italic bg-primary p-4">
            <div className="card-inner flex flex-col items-center">
              <h3>CLIENTES</h3>
              <BsFillPersonCheckFill className="card_icon" />
            </div>
            <h3>Clientes cadastrados</h3>
            <h1>{dashboardData.clientes}</h1>
          </div>
          <div className="card text-center font-bold italic bg-primary p-4">
            <div className="card-inner flex flex-col items-center">
              <h3>PROSPECÇÃO</h3>
              <BsFillPersonPlusFill className="card_icon" />
            </div>
            <h3>Formulários Preenchidos</h3>
            <h1>{dashboardData.prospeccoes}</h1>
          </div>
        </div>

        <div className="charts flex flex-col lg:flex-row gap-4 mt-4">
          <div className="w-full lg:w-1/2">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full lg:w-1/2">
            <ResponsiveContainer width="100%" height={300} className="lg:flex sm:none">
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;

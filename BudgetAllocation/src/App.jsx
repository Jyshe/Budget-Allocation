import React from "react";
import Table from "./Table";
import "./style.css";
const initialData = [
  {
    id: "electronics",
    label: "Electronics",
    value: 1500,
    children: [
      { id: "phones", label: "Phones", value: 800 },
      { id: "laptops", label: "Laptops", value: 700 }
    ]
  },
  {
    id: "furniture",
    label: "Furniture",
    value: 1000,
    children: [
      { id: "tables", label: "Tables", value: 300 },
      { id: "chairs", label: "Chairs", value: 700 }
    ]
  }
];

export default function App() {
  return (
    <div className="app">
      <h2 className="heading">Hierarchical Table</h2>
      <Table data={initialData} />
    </div>
  );
}

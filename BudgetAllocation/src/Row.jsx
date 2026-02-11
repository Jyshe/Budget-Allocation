import React, { useState } from "react";

export default function Row({
  row,
  parent,
  original,
  onPercent,
  onValue
}) {
  const [input, setInput] = useState("");

  const variance =
    ((row.value - original.value) / original.value) * 100;

  return (
    <tr>
      <td>{parent ? "-- " : ""}{row.label}</td>
      <td>{row.value.toFixed(2)}</td>

      <td>
        <input
          type="number"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
      </td>

      <td>
        <button onClick={() => onPercent(Number(input))}>
          %
        </button>
      </td>

      <td>
        <button onClick={() => onValue(Number(input))}>
          Val
        </button>
      </td>

      <td>{variance.toFixed(2)}%</td>
    </tr>
  );
}

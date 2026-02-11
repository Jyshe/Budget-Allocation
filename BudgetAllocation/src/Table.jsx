import React, { useState } from "react";
import Row from "./Row";

export default function Table({ data }) {
  const [rows, setRows] = useState(data);
  const original = data;

  const updateChild = (parentId, childId, newValue) => {
    const updated = rows.map((row) => {
      if (row.id !== parentId) 
        return row;

      const newChildren = row.children.map((child) =>
        child.id === childId ? { ...child, value: newValue } : child,
      );

      const total = newChildren.reduce((sum, c) => sum + c.value, 0);

      return { ...row, value: total, children: newChildren };
    });

    setRows(updated);
  };

  const updateParent = (parentId, newValue) => {
    const updated = rows.map((row) => {
      if (row.id !== parentId) return row;

      const oldTotal = row.children.reduce((sum, c) => sum + c.value, 0);

      const newChildren = row.children.map((child) => {
        const ratio = child.value / oldTotal;
        return {
          ...child,
          value: parseFloat((ratio * newValue).toFixed(2)),
        };
      });

      return { ...row, value: newValue, children: newChildren };
    });

    setRows(updated);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Label</th>
          <th>Value</th>
          <th>Input</th>
          <th>%</th>
          <th>Val</th>
          <th>Variance</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((row) => (
          <React.Fragment key={row.id}>
            <Row
              row={row}
              original={original.find((o) => o.id === row.id)}
              onPercent={(val) =>
                updateParent(row.id, row.value + (row.value * val) / 100)
              }
              onValue={(val) => updateParent(row.id, val)}
            />

            {row.children.map((child) => (
              <Row
                key={child.id}
                row={child}
                parent
                original={original
                  .find((o) => o.id === row.id)
                  .children.find((c) => c.id === child.id)}
                onPercent={(val) =>
                  updateChild(
                    row.id,
                    child.id,
                    child.value + (child.value * val) / 100,
                  )
                }
                onValue={(val) => updateChild(row.id, child.id, val)}
              />
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

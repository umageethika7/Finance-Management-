import { Table, Button, Badge, Group } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";

export default function FinanceTable({ refresh, setEditData }) {

  const [data, setData] = useState([]);

  const URL = "http://localhost:2507/finance";

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = async () => {
    try {
      const res = await axios.get(URL);
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ❌ DELETE
  const handleDelete = async (id) => {
    if (confirm("Delete this record?")) {
      await axios.delete(`${URL}/${id}`);
      fetchData();
    }
  };

  // ✏ EDIT (IMPORTANT: real id use avtundi)
  const handleEdit = (row) => {
    setEditData(row);
  };

  // 💰 TOTALS
  const totalIncome = data
    .filter(d => d.type === "INCOME")
    .reduce((sum, d) => sum + d.amount, 0);

  const totalExpense = data
    .filter(d => d.type === "EXPENSE")
    .reduce((sum, d) => sum + d.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <>
      <Table striped highlightOnHover mt="md">
        <thead>
          <tr>
            <th>ID</th> {/* 🔥 continuous ID */}
            <th>User</th>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td> {/* 🔥 MAIN CHANGE */}
              <td>{row.userName}</td>

              <td>
                <Badge color={row.type === "INCOME" ? "green" : "red"}>
                  {row.type}
                </Badge>
              </td>

              <td>{row.category}</td>

              <td style={{ color: row.type === "INCOME" ? "green" : "red" }}>
                ₹ {row.amount}
              </td>

              <td>{row.date}</td>

              <td>
                <Group>
                  <Button size="xs" onClick={() => handleEdit(row)}>
                    Edit
                  </Button>

                  <Button
                    size="xs"
                    color="red"
                    onClick={() => handleDelete(row.id)} // ⚠️ real id
                  >
                    Delete
                  </Button>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h3 style={{ color: "red" }}>Total Expense: ₹ {totalExpense}</h3>
      <h3 style={{ color: "green" }}>Total Income: ₹ {totalIncome}</h3>
      <h2>Balance: ₹ {balance}</h2>
    </>
  );
}
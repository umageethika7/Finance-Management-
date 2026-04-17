import { TextInput, Button, Select, Group } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import axios from "axios";
import { useEffect, useState } from "react";

export default function FinanceForm({ refresh, setRefresh, editData, setEditData }) {

  const [form, setForm] = useState({
    id: "",
    userName: "",
    type: "",
    category: "",
    amount: "",
    description: "",
    date: null
  });

  const URL = "http://localhost:2507/finance";

  // ✅ EDIT PREFILL
  useEffect(() => {
    if (editData) {
      setForm({
        ...editData,
        date: editData.date ? new Date(editData.date) : null
      });
    }
  }, [editData]);

  // ✅ INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ FULL FIXED SUBMIT
  const handleSubmit = async () => {
    try {

      let formattedDate = null;

      if (form.date) {
        const d = new Date(form.date);

        formattedDate =
          d.getFullYear() +
          "-" +
          String(d.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(d.getDate()).padStart(2, "0");
      }

      const formattedData = {
        ...form,
        amount: Number(form.amount),
        date: formattedDate
      };

      if (editData) {
        await axios.put(`${URL}/${form.id}`, formattedData);
      } else {
        await axios.post(URL, formattedData);
      }

      setRefresh(!refresh);
      setEditData(null);

      setForm({
        id: "",
        userName: "",
        type: "",
        category: "",
        amount: "",
        description: "",
        date: null
      });

    } catch (err) {
      console.log("ERROR 👉", err.response?.data || err.message);
      alert("Error saving data");
    }
  };

  return (
    <>
      <Group grow>
        {/* ID AUTO GENERATED */}
        <TextInput value={form.id} placeholder="Auto ID" disabled />

        <TextInput
          name="userName"
          value={form.userName}
          onChange={handleChange}
          placeholder="Name"
        />

        <Select
          placeholder="Type"
          data={["INCOME", "EXPENSE"]}
          value={form.type}
          onChange={(value) => setForm({ ...form, type: value })}
        />
      </Group>

      <Group grow mt="sm">
        <TextInput
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
        />

        <TextInput
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
        />

        <TextInput
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
        />
      </Group>

      {/* ✅ CALENDAR FIX */}
      <DateInput
        mt="sm"
        placeholder="Select date"
        value={form.date ? new Date(form.date) : null}
        onChange={(value) => setForm({ ...form, date: value })}
      />

      <Button mt="md" onClick={handleSubmit}>
        {editData ? "Update" : "Add Record"}
      </Button>
    </>
  );
}
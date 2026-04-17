import { useState } from "react";
import FinanceForm from "./components/FinanceForm";
import FinanceTable from "./components/FinanceTable";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [editData, setEditData] = useState(null);

  return (
    <div style={{ padding: 20 }}>
      <h1>Finance Manager 💰</h1>

      <FinanceForm
        refresh={refresh}
        setRefresh={setRefresh}
        editData={editData}
        setEditData={setEditData}
      />

      <FinanceTable
        refresh={refresh}
        setRefresh={setRefresh}
        setEditData={setEditData}   // 🔥 THIS LINE FIXES YOUR ERROR
      />
    </div>
  );
}

export default App;
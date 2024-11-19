import React, { useState } from "react";
import FieldForm from "./components/FieldForm/FieldForm";
import { FieldData } from "./types";
import Header from "./components/Header/Header";
import FieldListTableWithFilters from "./components/FieldListTable/FieldListTableWithFilters";

const App: React.FC = () => {
  const [fields, setFields] = useState<FieldData[]>([]);

  const addField = (fieldData: FieldData) => {
    setFields((prevFields) => [...prevFields, fieldData]);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen w-full flex flex-col items-center bg-gray-100 p-5 pt-8">
        <FieldForm addField={addField} />
        <FieldListTableWithFilters fields={fields} />
      </main>
    </>
  );
};

export default App;

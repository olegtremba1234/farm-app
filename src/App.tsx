import React, { useState } from "react";
import FieldForm from "./components/FieldForm";
import { FieldData } from "./types";
import WeatherComponent from "./components/WeatherComponent";
import FieldListTable from "./components/FIeldListTable";
import YieldCalculatorTable from "./components/YieldCalculatorTable";

const App: React.FC = () => {
  const [fields, setFields] = useState<FieldData[]>([]);

  const addField = (fieldData: FieldData) => {
    setFields((prevFields) => [...prevFields, fieldData]);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 p-5">
      <FieldForm addField={addField} />
      <FieldListTable fields={fields} />
      <YieldCalculatorTable fields={fields} />
      <WeatherComponent />
    </div>
  );
};

export default App;

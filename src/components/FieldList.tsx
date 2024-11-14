import React from "react";
import { FieldData } from "../types";

interface FieldListProps {
  fields: FieldData[];
}

const FieldList: React.FC<FieldListProps> = ({ fields }) => {
  return (
    <div className="space-y-5 mb-5">
      {fields.map((field) => (
        <div
          key={field.id}
          className="p-4 border border-gray-200 rounded-md shadow-sm"
        >
          <h3>{field.name}</h3>
          <p>Площа: {field.area} га</p>
          <p>Культура: {field.crop}</p>
          <p>
            Прогноз врожайності (без добрив): {field.yieldPerHa * field.area} т
          </p>
        </div>
      ))}
    </div>
  );
};

export default FieldList;

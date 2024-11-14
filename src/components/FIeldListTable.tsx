import React from "react";
import { FieldData } from "../types";

interface FieldListProps {
  fields: FieldData[];
}

const FieldListTable: React.FC<FieldListProps> = ({ fields }) => {
  const totalArea = fields.reduce((sum, field) => sum + field.area, 0);
  const totalYieldWithoutFertilizers = fields.reduce(
    (sum, field) => sum + field.yieldPerHa * field.area,
    0
  );

  return (
    <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md mx-4 mb-5">
      <h2 className="text-2xl font-semibold mb-4 text-center">Поля</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Назва</th>
              <th className="border px-4 py-2">Площа (га)</th>
              <th className="border px-4 py-2">Культура</th>
              <th className="border px-4 py-2">
                Прогноз врожайності (без добрив), т
              </th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field) => (
              <tr key={field.id} className="text-center">
                <td className="border px-4 py-2">{field.name}</td>
                <td className="border px-4 py-2">{field.area}</td>
                <td className="border px-4 py-2">{field.crop}</td>
                <td className="border px-4 py-2">
                  {field.yieldPerHa * field.area} т
                </td>
              </tr>
            ))}
            <tr className="font-semibold text-center bg-gray-100">
              <td className="border px-4 py-2">Всього</td>
              <td className="border px-4 py-2">{totalArea} га</td>
              <td className="border px-4 py-2">-</td>
              <td className="border px-4 py-2">
                {totalYieldWithoutFertilizers} т
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FieldListTable;

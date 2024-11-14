import React from "react";
import { FieldData } from "../types";

// Прогноз ефекту від добрив
const fertilizersEffect: { [key: string]: number } = {
  nitrogen: 0.1,
  phosphorus: 0.15,
  potassium: 0.2,
  complex: 0.3,
};

interface YieldCalculatorProps {
  fields: FieldData[];
}

const YieldCalculatorTable: React.FC<YieldCalculatorProps> = ({ fields }) => {
  const totalYieldWithFertilizers = fields.reduce((total, field) => {
    const fertilizersTotalEffect = field.fertilizers.reduce(
      (effect, fertilizer) => {
        return effect + (fertilizersEffect[fertilizer] || 0);
      },
      0
    );

    return total + field.yieldPerHa * (1 + fertilizersTotalEffect) * field.area;
  }, 0);

  return (
    <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md mx-4 mb-5">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Загальна врожайність
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Тип врожайності</th>
              <th className="border px-4 py-2">Значення (т)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="border px-4 py-2">Без добрив</td>
              <td className="border px-4 py-2">
                {fields.reduce(
                  (total, field) => total + field.yieldPerHa * field.area,
                  0
                )}{" "}
                кг
              </td>
            </tr>
            <tr className="text-center bg-gray-100 font-semibold">
              <td className="border px-4 py-2">З добривами</td>
              <td className="border px-4 py-2">
                {totalYieldWithFertilizers.toFixed(2)} т
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default YieldCalculatorTable;

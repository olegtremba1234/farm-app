import React from "react";
import { FieldData } from "../types";

// Прогноз ефекту від добрив
const fertilizersEffect: { [key: string]: number } = {
  nitrogen: 0.15, // 15% підвищення
  phosphorus: 0.1, // 10% підвищення
  potassium: 0.12, // 12% підвищення
  complex: 0.2, // 20% підвищення
};

interface YieldCalculatorProps {
  fields: FieldData[];
}

const YieldCalculator: React.FC<YieldCalculatorProps> = ({ fields }) => {
  const totalWithoutFertilizers = fields.reduce((total, field) => {
    return total + field.yieldPerHa * field.area;
  }, 0);

  const totalWithFertilizers = fields.reduce((total, field) => {
    const fertilizersTotalEffect = field.fertilizers.reduce(
      (effect, fertilizer) => {
        return effect + (fertilizersEffect[fertilizer] || 0);
      },
      0
    );

    return total + (field.yieldPerHa + fertilizersTotalEffect) * field.area;
  }, 0);

  return (
    <div className="p-6 bg-white shadow-md rounded-md mb-5">
      <h2 className="text-2xl font-semibold">Загальна врожайність</h2>
      <div className="space-y-4">
        <p>Загальна врожайність без добрив: {totalWithoutFertilizers} т</p>
        <p>
          Загальна врожайність з добривами:{" "}
          <span className="text-green-500">{totalWithFertilizers} т</span>
        </p>
      </div>
    </div>
  );
};

export default YieldCalculator;

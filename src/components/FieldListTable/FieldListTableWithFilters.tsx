import React, { useState } from "react";
import { FieldData } from "../../types";
import { FaFilter } from "react-icons/fa";
import Tooltip from "../../utils/Tooltip";

interface FieldListProps {
  fields: FieldData[];
}

const fertilizersEffect: { [key: string]: number } = {
  nitrogen: 0.1,
  phosphorus: 0.15,
  potassium: 0.2,
  complex: 0.3,
};

const FieldListTable: React.FC<FieldListProps> = ({ fields }) => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [cropFilter, setCropFilter] = useState("");
  const [sortField, setSortField] = useState<"area" | "yield" | "crop" | null>(
    null
  );

  const toggleFilters = () => setFiltersVisible(!filtersVisible);

  // Apply filters
  const filteredFields = fields.filter((field) =>
    cropFilter ? field.crop === cropFilter : true
  );

  // Apply sorting
  const sortedFields = [...filteredFields].sort((a, b) => {
    if (sortField === "area") {
      return b.area - a.area;
    } else if (sortField === "yield") {
      return b.yieldPerHa * b.area - a.yieldPerHa * a.area;
    } else if (sortField === "crop") {
      return a.crop.localeCompare(b.crop);
    }
    return 0;
  });

  const totalArea = sortedFields.reduce((sum, field) => sum + field.area, 0);
  const totalYieldWithoutFertilizers = sortedFields.reduce(
    (sum, field) => sum + field.yieldPerHa * field.area,
    0
  );
  const totalYieldWithFertilizers = sortedFields.reduce((total, field) => {
    const fertilizersTotalEffect = field.fertilizers.reduce(
      (effect, fertilizer) => {
        return effect + (fertilizersEffect[fertilizer] || 0);
      },
      0
    );
    return total + field.yieldPerHa * (1 + fertilizersTotalEffect) * field.area;
  }, 0);

  return (
    <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md mx-auto mb-5">
      {fields.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          <p>Поки що немає жодного поля, додайте поле!</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Поля</h2>
            <Tooltip text="Фільтр">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={toggleFilters}
              >
                <FaFilter size={20} />
              </button>
            </Tooltip>
          </div>

          {filtersVisible && (
            <div className="mb-4 p-4 bg-gray-100 rounded-lg">
              <label className="block mb-2">
                Фільтр за культурою:
                <select
                  value={cropFilter}
                  onChange={(e) => setCropFilter(e.target.value)}
                  className="ml-2 border rounded px-2 py-1"
                >
                  <option value="">Всі</option>
                  {Array.from(new Set(fields.map((field) => field.crop))).map(
                    (crop) => (
                      <option key={crop} value={crop}>
                        {crop}
                      </option>
                    )
                  )}
                </select>
              </label>

              <label className="block">
                Сортування:
                <select
                  value={sortField || ""}
                  onChange={(e) =>
                    setSortField(
                      e.target.value as "area" | "yield" | "crop" | null
                    )
                  }
                  className="ml-2 border rounded px-2 py-1"
                >
                  <option value="">Без сортування</option>
                  <option value="area">Площа</option>
                  <option value="yield">Врожай</option>
                  <option value="crop">Культура</option>
                </select>
              </label>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Назва</th>
                  <th className="border px-4 py-2">Площа (га)</th>
                  <th className="border px-4 py-2">Культура</th>
                  <th className="border px-4 py-2">Без добрив, т</th>
                  <th className="border px-4 py-2">З добривами, т</th>
                </tr>
              </thead>
              <tbody>
                {sortedFields.map((field) => {
                  const yieldWithFertilizers =
                    field.yieldPerHa *
                    field.area *
                    field.fertilizers.reduce((effect, fertilizer) => {
                      return effect + (fertilizersEffect[fertilizer] || 0);
                    }, 1);

                  return (
                    <tr key={field.id} className="text-center">
                      <td className="border px-4 py-2">{field.name}</td>
                      <td className="border px-4 py-2">{field.area}</td>
                      <td className="border px-4 py-2">{field.crop}</td>
                      <td className="border px-4 py-2">
                        {(field.yieldPerHa * field.area).toFixed(2)} т
                      </td>
                      <td className="border px-4 py-2">
                        {yieldWithFertilizers.toFixed(2)} т
                      </td>
                    </tr>
                  );
                })}

                <tr className="font-semibold text-center bg-gray-100">
                  <td className="border px-4 py-2">Всього</td>
                  <td className="border px-4 py-2">
                    {totalArea.toFixed(2)} га
                  </td>
                  <td className="border px-4 py-2">-</td>
                  <td className="border px-4 py-2">
                    {totalYieldWithoutFertilizers.toFixed(2)} т
                  </td>
                  <td className="border px-4 py-2">
                    {totalYieldWithFertilizers.toFixed(2)} т
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default FieldListTable;

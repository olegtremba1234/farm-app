import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { FieldData } from "../types";

interface FieldFormProps {
  addField: (fieldData: FieldData) => void;
}

const cropYieldDefaults: { [key: string]: number } = {
  Кукурудза: 11.7,
  Соя: 3.65,
  Соняшник: 3.43,
  Пшениця: 6.86,
};

// Масив добрив із назвами та ID
const fertilizersList = [
  { id: "nitrogen", name: "Азот" },
  { id: "phosphorus", name: "Фосфор" },
  { id: "potassium", name: "Калій" },
  { id: "complex", name: "Комплексне" },
];

const FieldForm: React.FC<FieldFormProps> = ({ addField }) => {
  return (
    <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md mx-4 mb-5">
      <h2 className="text-2xl font-semibold mb-4 text-center">Додати поле</h2>
      <Formik
        initialValues={{ name: "", area: 0, crop: "", fertilizers: [] }}
        onSubmit={(values) => {
          const yieldPerHa = cropYieldDefaults[values.crop] || 0;
          const fieldData: FieldData = {
            id: uuidv4(),
            name: values.name,
            area: values.area,
            crop: values.crop,
            fertilizers: values.fertilizers,
            yieldPerHa,
          };
          addField(fieldData);
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Вкажіть назву"),
          area: Yup.number()
            .positive("Повинно бути більше 0")
            .required("Вкажіть площу"),
          crop: Yup.string().required("Виберіть культуру"),
        })}
      >
        <Form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700">
              Назва поля
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              placeholder="Назва поля"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="area" className="block text-gray-700">
              Площа (га)
            </label>
            <Field
              type="number"
              id="area"
              name="area"
              placeholder="0"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <ErrorMessage
              name="area"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="crop" className="block text-gray-700">
              Культура
            </label>
            <Field
              as="select"
              id="crop"
              name="crop"
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Виберіть культуру</option>
              <option value="Пшениця">Пшениця</option>
              <option value="Кукурудза">Кукурудза</option>
              <option value="Соняшник">Соняшник</option>
              <option value="Соя">Соя</option>
            </Field>
            <ErrorMessage
              name="crop"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="fertilizers" className="block text-gray-700">
              Добрива
            </label>
            <div className="border border-gray-300 p-2 rounded-md">
              {fertilizersList.map((fertilizer) => (
                <div key={fertilizer.id} className="flex items-center">
                  <Field
                    type="checkbox"
                    name="fertilizers"
                    value={fertilizer.id}
                    className="mr-2"
                  />
                  <label>{fertilizer.name}</label>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
          >
            Додати поле
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default FieldForm;

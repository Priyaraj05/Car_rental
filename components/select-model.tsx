"use client";


import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";



type modelProps = {
  models: any[] | null
}

const SelectModel = (props: modelProps) => {
  const [selectedModel, setSelectedModel] = React.useState(""); 
  
  const uniqueModels = new Set<string>();

  // Filter out duplicates and populate unique models set
  const filteredModels = props.models?.filter((car) => {
    if (!uniqueModels.has(car.Model)) {
      uniqueModels.add(car.Model);
      return true;
    }
    return false;
  });

  console.log("Database output:", props.models);
  return (
    <div className="Models">
      <h2>Select Model</h2>
      <Select onValueChange={setSelectedModel}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select model" />
        </SelectTrigger>
        <SelectContent>
          {filteredModels?.map((car) => (
            <SelectItem value={car.Model} key={car.Car_id}>
              {car.Model}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p>Selected model: {selectedModel}</p>
    </div>
  );
};

export default SelectModel;

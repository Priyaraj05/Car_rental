"use client";

import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type CityProps ={
  cityList: any []|null;
}

const SelectCities = (props : CityProps) => {
  const [selectedCity, setselectedCity] = React.useState("");

  const handleCityChange = (city: string) => {
    setselectedCity(city);
  };

  return (
    <div className="Cities">
      <h2>Select Cities</h2>
      <Select onValueChange={handleCityChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select City" />
        </SelectTrigger>
        <SelectContent>
        {props.cityList?.map((city) => (
          <SelectItem value={city.CityName} key={city.City_id}>{city.CityName}</SelectItem>
        ))} 
        </SelectContent>
      </Select>
      <p>Selected City: {selectedCity}</p>
    </div>
  );
};

export default SelectCities;


import React from "react";
import SelectCities from "./select-cities";
import SelectModel from "./select-model";
import supabase from "@/supabaseClient";

export default async function CarFilters() {

  // Select all cities
  const { data: cities } = await supabase
  .from("City_Info")
  .select();

  return (
    <div>
      <SelectCities cityList = {cities} />
      {/* <SelectModel models={cars}/> */}
    </div>
  );
}

"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DataTableFilter } from "./data-table-filter"
import { Price_Catalog } from "@/types"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  data: Price_Catalog 
}

export function DataTableToolbar<TData>({
  table,
  data
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  // get unique cities from the data
  const uniqueCities = new Set(data.map((car) => car.City_Info?.CityName))
  const cities = Array.from(uniqueCities)
  const uniqueModels = new Set(data.map((car) => car.Car_Details?.Model))
  const models = Array.from(uniqueModels)

  const citiesObject = cities.map(city => {
    return {
      value: city,
      label: city
    };
  });

  const modelsObject = models.map(city => {
    return {
      value: city,
      label: city
    };
  });

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {table.getColumn("City_Info.CityName") && (
          <DataTableFilter
            column={table.getColumn("City_Info.CityName")}
            title="City"
            options={citiesObject}
          />
        )}
        {table.getColumn("Car_Details.Model") && (
          <DataTableFilter
            column={table.getColumn("Car_Details.Model")}
            title="Model"
            options={modelsObject}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {/* <div className="flex-1 text-sm text-muted-foreground">
        { table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
  </div> */}
  {/* <pre>{JSON.stringify(table.getState().rowSelection, null, 2)}</pre> */}
  {/* <pre>{table.getSelectedRowModel().rows.map(
    (row) => JSON.stringify(row.original, null, 2)
  )}</pre> */}

    </div>
  )
}
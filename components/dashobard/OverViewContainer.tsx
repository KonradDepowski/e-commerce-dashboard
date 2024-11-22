"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Overview } from "./OverView";
import { fetchMonthRevenue } from "@/lib/actions/dashboard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export type RevenueData = {
  id: number;
  name: string;
  total: number;
};

const OverViewContainer = () => {
  const [monthlyRevenue, setMonthyRevenue] = useState<RevenueData[]>([]);
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const data = await fetchMonthRevenue(year);

        setMonthyRevenue(data!);
      } catch (error) {
        console.error("Failed to fetch monthly revenue", error);
      }
    };
    fetchRevenue();
  }, [year]);

  return (
    <Card className="col-span-4 relative">
      <CardHeader>
        <CardTitle className="">
          Overview
          <Select onValueChange={(value) => setYear(Number(value))}>
            <SelectTrigger className="h-8  absolute top-2 right-2 w-[80px]">
              <SelectValue defaultValue={year} placeholder={year} />
            </SelectTrigger>
            <SelectContent className="w-[80px]">
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2020">2020</SelectItem>
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-0">
        <Overview data={monthlyRevenue} />
      </CardContent>
    </Card>
  );
};

export default OverViewContainer;

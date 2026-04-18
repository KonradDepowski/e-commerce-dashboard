"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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

const Overview = dynamic(
  () => import("./OverView").then((mod) => mod.Overview),
  {
    ssr: false,
    loading: () => (
      <div className="h-[350px] w-full animate-pulse rounded-md bg-muted" />
    ),
  },
);

const OverViewContainer = ({
  initialData,
  initialYear,
}: {
  initialData: RevenueData[];
  initialYear: number;
}) => {
  const [monthlyRevenue, setMonthyRevenue] =
    useState<RevenueData[]>(initialData);
  const [year, setYear] = useState<number>(initialYear);

  useEffect(() => {
    if (year === initialYear && monthlyRevenue.length > 0) {
      return;
    }

    const fetchRevenue = async () => {
      const data = await fetchMonthRevenue(year);
      setMonthyRevenue(data!);
    };

    fetchRevenue();
  }, [year, initialYear, monthlyRevenue.length]);

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

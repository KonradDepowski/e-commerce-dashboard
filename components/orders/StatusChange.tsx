"use client";

import { updateOrderStatus } from "@/lib/actions/order";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const StatusChange = ({
  defaultValue,
  orderId,
}: {
  defaultValue: string;
  orderId: string;
}) => {
  const changeValueHandler = async (value: string) => {
    await updateOrderStatus(orderId, value);
  };
  return (
    <Select onValueChange={changeValueHandler} defaultValue={defaultValue}>
      <SelectTrigger className="w-[110px] py-0">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent className="bg-primary py-0">
        <SelectItem className="text-[12px]" value="paid">
          Paid
        </SelectItem>
        <SelectItem className="text-[12px]" value="completed">
          Completed
        </SelectItem>
        <SelectItem className="text-[12px]" value="failed">
          Failed
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default StatusChange;

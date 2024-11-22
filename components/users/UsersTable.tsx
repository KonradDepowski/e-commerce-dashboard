"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useAuth } from "@clerk/nextjs";
import { createInvitation } from "@/lib/actions/createInvitation";
import { deleteUser } from "@/lib/actions/deleteUser";
import { toast } from "sonner";
import { OrganiztionMemebersType } from "@/lib/actions/getOrganizationUsers";

const deleteUserHandler = (userId: string) => {
  try {
    deleteUser(userId);
  } catch (error: unknown) {
    console.log(error);
    toast.error("Could not delete user");
  }
};

export const columns: ColumnDef<object>[] = [
  {
    accessorKey: "image_url",
    header: "Avatar",
    cell: ({ row }) => (
      <div className="lowercase">
        {
          <Image
            className="rounded-full"
            src={row.getValue("image_url")}
            width={30}
            height={30}
            alt="logo"
          />
        }
      </div>
    ),
  },
  {
    accessorKey: "first_name",
    header: "First Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("first_name")}</div>
    ),
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("last_name")}</div>
    ),
  },

  {
    accessorKey: "identifier",
    header: "E-mail",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("identifier")}</div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div className="lowercase">{row.getValue("role")}</div>,
  },
  {
    accessorKey: "user_id",
    header: "Delete",
    cell: ({ row }) => (
      <Button
        onClick={() => deleteUserHandler(row.getValue("user_id"))}
        className="bg-[var(--error)] hover:bg-[var(--error-hover)]"
      >
        Delete
      </Button>
    ),
  },
];
const UsersTable = ({ data }: { data: OrganiztionMemebersType[] }) => {
  const [email, setEmail] = useState<string>("");
  const { userId } = useAuth();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const sendInvitation = async () => {
    try {
      await createInvitation(userId!, email);
      toast.success("Invitation send!");
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "message" in error) {
        toast.error(error.message as string);
      }
    }
  };

  return (
    <div className="w-full max-w-[1500px] m-auto flex flex-col ">
      <Dialog>
        <DialogTrigger className="self-end  " asChild>
          <Button className="bg-[var(--purple)] hover:bg-[var(--purple-hover)]">
            Add New
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] ">
          <DialogHeader>
            <DialogTitle className="text-[var(--green-main)] text-xl">
              Add new User
            </DialogTitle>
            <DialogDescription>
              Send an invitation to the new user.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="">
              <Input
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter a email"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button
                onClick={() => sendInvitation()}
                className="bg-[var(--purple)] hover:bg-[var(--purple-hover)]"
                type="button"
              >
                Send
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="rounded-md border mt-10">
        <Table>
          <TableHeader className="px-7">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className=" px-7  py-2" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead className="px-5 py-4" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="px-5 py-4" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersTable;

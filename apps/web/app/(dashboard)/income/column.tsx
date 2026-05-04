"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Wallet,
  ShoppingBag,
  Car,
  Home,
  Coffee,
  Utensils,
  Tv,
  Zap,
  Heart,
  Smartphone,
  Globe,
  Ghost,
  Gift,
  Gamepad2,
  Dumbbell,
  Plane,
  Briefcase,
} from "lucide-react";

const ICONS: Record<string, any> = {
  Wallet,
  ShoppingBag,
  Car,
  Home,
  Coffee,
  Utensils,
  Tv,
  Zap,
  Heart,
  Smartphone,
  Globe,
  Ghost,
  Gift,
  Gamepad2,
  Dumbbell,
  Plane,
  Briefcase,
};

export type IncomeRow = {
  id: string;
  name: string;
  description: string | null;
  amount: number;
  category: {
    id: string;
    name: string;
    iconName: string;
  };
};

export function columns({
  onEdit,
  onDelete,
}: {
  onEdit: (income: IncomeRow) => void;
  onDelete: (income: IncomeRow) => void;
}): ColumnDef<IncomeRow>[] {
  return [
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.original.category;
        const Icon = ICONS[category.iconName] || Wallet;
        return (
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 text-primary">
              <Icon className="h-4 w-4" />
            </div>
            <span className="font-medium">{category.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <span className="text-muted-foreground truncate max-w-50 block">
          {row.getValue("description") || "—"}
        </span>
      ),
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        const formatted = new Intl.NumberFormat("en-PH", {
          style: "currency",
          currency: "PHP",
        }).format(amount);

        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const income = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onEdit(income)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(income)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}

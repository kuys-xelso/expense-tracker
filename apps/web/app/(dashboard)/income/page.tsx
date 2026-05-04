"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  Loader2,
  Plus,
  AlertCircle,
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { GET_CATEGORIES, GET_INCOME } from "@/lib/graphql/queries";
import {
  CREATE_INCOME,
  REMOVE_INCOME,
  UPDATE_INCOME,
} from "@/lib/graphql/mutations";
import { DataTable } from "./data-table";
import { columns, type IncomeRow } from "./column";

type CategoryItem = { id: string; name: string; iconName: string };
type IncomeItem = {
  id: string;
  name: string;
  description: string | null;
  amount: string;
  categoryId: string;
};

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

export default function IncomePage() {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    amount: "",
    categoryId: "",
  });

  const { data: categoryData, loading: categoryLoading } = useQuery<{
    categories: CategoryItem[];
  }>(GET_CATEGORIES);
  const {
    data: incomeData,
    loading: incomeLoading,
    error: incomeError,
    refetch,
  } = useQuery<{ income: IncomeItem[] }>(GET_INCOME);
  const [createIncome] = useMutation(CREATE_INCOME);
  const [updateIncome] = useMutation(UPDATE_INCOME);
  const [removeIncome] = useMutation(REMOVE_INCOME);

  const categories = categoryData?.categories ?? [];
  const data: IncomeRow[] = useMemo(
    () =>
      (incomeData?.income ?? []).map((income: IncomeItem) => {
        const category = categories.find(
          (item: CategoryItem) => item.id === income.categoryId,
        );
        return {
          id: income.id,
          name: income.name,
          description: income.description,
          amount: Number(income.amount),
          category: {
            id: income.categoryId,
            name: category?.name || "Uncategorized",
            iconName: category?.iconName || "Wallet",
          },
        };
      }),
    [incomeData, categories],
  );

  const onSubmit = async () => {
    if (!form.name.trim() || !form.amount || !form.categoryId) return;
    setIsSaving(true);
    setError(null);
    try {
      if (editingId)
        await updateIncome({
          variables: {
            input: {
              id: editingId,
              name: form.name,
              amount: form.amount,
              description: form.description || null,
              categoryId: form.categoryId,
            },
          },
        });
      else
        await createIncome({
          variables: {
            input: {
              name: form.name,
              amount: form.amount,
              description: form.description || null,
              categoryId: form.categoryId,
            },
          },
        });
      await refetch();
      setEditingId(null);
      setForm((prev) => ({ ...prev, name: "", description: "", amount: "" }));
      setIsModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save income");
    } finally {
      setIsSaving(false);
    }
  };

  const onEdit = (income: IncomeRow) => {
    setEditingId(income.id);
    setForm({
      name: income.name,
      description: income.description || "",
      amount: String(income.amount),
      categoryId: income.category.id,
    });
    setIsModalOpen(true);
  };

  const onDelete = async (income: IncomeRow) => {
    setIsSaving(true);
    setError(null);
    try {
      await removeIncome({ variables: { id: income.id } });
      await refetch();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete income");
    } finally {
      setIsSaving(false);
    }
  };

  const isLoading = categoryLoading || incomeLoading;
  const viewError = error ?? incomeError?.message;

  return (
    <div className="flex flex-col gap-8 p-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight">Income</h1>
          <p className="text-muted-foreground text-lg">
            Track and manage your income sources.
          </p>
        </div>
        <Button
          size="lg"
          className="shadow-lg hover:shadow-xl transition-all"
          onClick={() => {
            setEditingId(null);
            setForm((prev) => ({
              ...prev,
              name: "",
              description: "",
              amount: "",
              categoryId: prev.categoryId || categories[0]?.id || "",
            }));
            setIsModalOpen(true);
          }}
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Income
        </Button>
      </div>

      <Sheet open={isModalOpen} onOpenChange={setIsModalOpen}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{editingId ? "Edit Income" : "Add Income"}</SheetTitle>
            <SheetDescription>
              Fill out income details and choose a category icon.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4 p-6">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                placeholder="Income name"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                type="number"
                placeholder="Amount"
                value={form.amount}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, amount: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <div className="grid grid-cols-5 gap-2">
                {categories.map((category) => {
                  const Icon = ICONS[category.iconName] || Wallet;
                  const isSelected = form.categoryId === category.id;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      title={category.name}
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          categoryId: category.id,
                        }))
                      }
                      className={`flex items-center justify-center h-10 rounded-md border transition ${isSelected ? "bg-primary text-primary-foreground border-primary" : "bg-background hover:bg-muted border-border"}`}
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button onClick={onSubmit} disabled={isSaving}>
                {editingId ? "Update" : "Create"}
              </Button>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground font-medium">
            Fetching your income...
          </p>
        </div>
      ) : viewError ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 rounded-xl border border-red-500/10 bg-red-500/5 text-red-500">
          <AlertCircle className="h-10 w-10" />
          <div className="text-center">
            <p className="font-bold text-lg">Failed to load data</p>
            <p className="text-sm opacity-80">{viewError}</p>
          </div>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="mt-2"
          >
            Try Again
          </Button>
        </div>
      ) : (
        <DataTable columns={columns({ onEdit, onDelete })} data={data} />
      )}
    </div>
  );
}

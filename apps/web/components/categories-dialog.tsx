"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  Plus,
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
  AlertCircle,
  Loader2,
  CheckCircle2Icon,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { GET_CATEGORIES } from "@/lib/graphql/queries";
import { CREATE_CATEGORY, REMOVE_CATEGORY } from "@/lib/graphql/mutations";
import type {
  CreateCategoryMutation,
  CreateCategoryMutationVariables,
  RemoveCategoryMutation,
  RemoveCategoryMutationVariables,
} from "@/lib/graphql/generated/graphql";

import { toast } from "sonner";

type CategoryItem = {
  id: string;
  name: string;
  iconName: string;
  createdAt: string;
};

const ICONS = [
  { name: "Wallet", icon: Wallet },
  { name: "ShoppingBag", icon: ShoppingBag },
  { name: "Car", icon: Car },
  { name: "Home", icon: Home },
  { name: "Coffee", icon: Coffee },
  { name: "Utensils", icon: Utensils },
  { name: "Tv", icon: Tv },
  { name: "Zap", icon: Zap },
  { name: "Heart", icon: Heart },
  { name: "Smartphone", icon: Smartphone },
  { name: "Globe", icon: Globe },
  { name: "Ghost", icon: Ghost },
  { name: "Gift", icon: Gift },
  { name: "Gamepad2", icon: Gamepad2 },
  { name: "Dumbbell", icon: Dumbbell },
  { name: "Plane", icon: Plane },
  { name: "Briefcase", icon: Briefcase },
];

const CATEGORY_COLORS = [
  "bg-orange-500/10 text-orange-500",
  "bg-blue-500/10 text-blue-500",
  "bg-green-500/10 text-green-500",
  "bg-purple-500/10 text-purple-500",
  "bg-pink-500/10 text-pink-500",
  "bg-cyan-500/10 text-cyan-500",
  "bg-red-500/10 text-red-500",
  "bg-amber-500/10 text-amber-500",
];

interface CategoriesDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CategoriesDialog({
  open: controlledOpen,
  onOpenChange,
}: CategoriesDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("Wallet");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(
    null,
  );

  // Handle controlled/uncontrolled state
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = onOpenChange
    ? (value: boolean) => onOpenChange(value)
    : setInternalOpen;

  const { data, loading, error, refetch } = useQuery<{
    categories: CategoryItem[];
  }>(GET_CATEGORIES);

  const [createCategory, { loading: isSubmitting }] = useMutation<
    CreateCategoryMutation,
    CreateCategoryMutationVariables
  >(CREATE_CATEGORY);

  const [removeCategory] = useMutation<
    RemoveCategoryMutation,
    RemoveCategoryMutationVariables
  >(REMOVE_CATEGORY);

  const categories = useMemo(
    () =>
      (data?.categories ?? []).map((category: CategoryItem, index: number) => ({
        ...category,
        color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
      })),
    [data],
  );

  const handleAddCategory = async () => {
    if (!categoryName) return;
    setSubmitError(null);

    try {
      const result = await createCategory({
        variables: { input: { name: categoryName, iconName: selectedIcon } },
      });

      if (result.data?.createCategory?.success) {
        setCategoryName("");
        setSelectedIcon("Wallet");
        await refetch();
        toast(
          <div className="flex items-center gap-2">
            <CheckCircle2Icon className="size-5.5 shrink-0 text-green-700" />
            <span className="text-green-600">
              Category created successfully!
            </span>
          </div>,
        );
      } else {
        setSubmitError(
          result.data?.createCategory?.message || "Failed to create category",
        );
      }
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Failed to create category",
      );
    }
  };

  const getIcon = (iconName: string) => {
    const iconObj = ICONS.find((i) => i.name === iconName);
    const IconComponent = iconObj ? iconObj.icon : Wallet;
    return <IconComponent className="h-5 w-5" />;
  };

  const handleRemoveCategory = (categoryId: string) => {
    toast("Are you sure?", {
      position: "top-center",
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: async () => {
          setSubmitError(null);
          setDeletingCategoryId(categoryId);
          try {
            const result = await removeCategory({
              variables: { id: categoryId },
            });
            if (result.data?.removeCategory?.success) {
              await refetch();
              toast.success("Category removed");
            }
          } catch (err) {
            toast.error("Failed to remove category");
          } finally {
            setDeletingCategoryId(null);
          }
        },
      },
    });
  };

  const uiError = submitError ?? (error ? error.message : null);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl! p-0 overflow-hidden max-h-[90vh] flex flex-col gap-0">
        {/* Header */}
        <DialogHeader className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6 space-y-2 border-b border-foreground/5">
          <DialogTitle className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Categories
          </DialogTitle>
          <DialogDescription className="text-base sm:text-lg">
            Organize your finances by creating custom categories.
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 sm:py-8">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Form Section */}
            <div className="lg:col-span-5">
              <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm ring-1 ring-foreground/5">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">New Category</CardTitle>
                  <CardDescription>
                    Configure your category details below.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Category Name Input */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="category-name"
                      className="text-sm font-semibold"
                    >
                      Category Name
                    </Label>
                    <Input
                      id="category-name"
                      placeholder="e.g. Health & Fitness"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      className="bg-background/50 border-foreground/10 focus-visible:ring-1 h-11"
                    />
                  </div>

                  {/* Icon Selector */}
                  <div className="space-y-4">
                    <Label className="text-sm font-semibold">
                      Choose an Icon
                    </Label>
                    <div className="grid grid-cols-6 gap-2.5 p-3 rounded-xl bg-white">
                      {ICONS.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.name}
                            onClick={() => setSelectedIcon(item.name)}
                            className={cn(
                              "flex items-center justify-center aspect-square rounded-lg transition-all duration-200 group border-2 border-background-500",
                              selectedIcon === item.name
                                ? "bg-green-600 text-primary-foreground shadow-lg scale-110"
                                : "bg-background/50 text-muted-foreground hover:bg-background hover:text-foreground hover:scale-105",
                            )}
                          >
                            <Icon
                              className={cn(
                                "h-5 w-5 transition-transform group-active:scale-90",
                                selectedIcon === item.name
                                  ? "animate-in zoom-in-75 duration-300"
                                  : "",
                              )}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Error Message */}
                  {uiError && (
                    <div className="flex gap-3 p-3 rounded-lg bg-red-500/10 text-red-700 text-sm">
                      <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                      <span>{uiError}</span>
                    </div>
                  )}

                  {/* Add Button */}
                  <Button
                    className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
                    onClick={handleAddCategory}
                    disabled={!categoryName || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-5 w-5" />
                        Add Category
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Categories List Section */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="flex flex-col gap-6 max-h-125 overflow-y-auto pr-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Existing Categories</h2>
                </div>

                {loading ? (
                  <div className="col-span-full py-12 sm:py-20 flex flex-col items-center justify-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    <p className="text-muted-foreground font-medium">
                      Loading categories...
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4 ">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className="group relative flex items-center gap-4 p-5 rounded-2xl border border-foreground/5 bg-card/40 backdrop-blur-sm transition-all hover:shadow-xl hover:border-primary/20 hover:-translate-y-1"
                      >
                        {/* Icon Container */}
                        <div
                          className={cn(
                            "flex items-center justify-center h-12 w-12 rounded-xl transition-transform group-hover:scale-110 shrink-0",
                            category.color,
                          )}
                        >
                          {getIcon(category.iconName)}
                        </div>

                        {/* Text Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                            {category.name}
                          </h3>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-blue-500 bg-blue-500/20 hover:bg-blue-500/30 rounded-sm"
                            onClick={() => {
                              console.log("Edit", category.id);
                            }}
                          >
                            <Briefcase className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-red-500 bg-red-500/20 hover:bg-red-500/30 rounded-sm"
                            onClick={() =>
                              void handleRemoveCategory(category.id)
                            }
                            disabled={deletingCategoryId === category.id}
                          >
                            {deletingCategoryId === category.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Ghost className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}

                    {categories.length === 0 && (
                      <div className="col-span-full py-12 sm:py-20 flex flex-col items-center justify-center gap-4 border-2 border-dashed rounded-3xl bg-muted/10 opacity-60">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                          <Plus className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground font-medium">
                          Start by adding your first category
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

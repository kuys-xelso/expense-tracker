"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";
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
import { createCategory, getCategories } from "@/lib/api-client";

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

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("Wallet");
  const [categories, setCategories] = useState<
    Array<{
      id: string;
      name: string;
      iconName: string;
      color: string;
    }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getCategories();
        const categoriesWithColors = data.map(
          (
            category: { id: string; name: string; iconName: string },
            index: number,
          ) => ({
            ...category,
            icon: category.iconName,
            color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
          }),
        );
        setCategories(categoriesWithColors);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load categories",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!categoryName) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await createCategory(categoryName, selectedIcon);

      if (result?.success) {
        const newCategory = {
          id: result.category.id,
          name: result.category.name,
          iconName: result.category.iconName,
          color: CATEGORY_COLORS[categories.length % CATEGORY_COLORS.length],
        };

        setCategories([...categories, newCategory]);
        setCategoryName("");
        setSelectedIcon("Wallet");
      } else {
        setError(result?.message || "Failed to create category");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create category",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getIcon = (iconName: string) => {
    const iconObj = ICONS.find((i) => i.name === iconName);
    const IconComponent = iconObj ? iconObj.icon : Wallet;
    return <IconComponent className="h-5 w-5" />;
  };

  return (
    <div className="flex flex-col gap-8 p-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Categories
        </h1>
        <p className="text-muted-foreground text-lg">
          Organize your spending by creating custom categories with unique
          icons.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Create Form */}
        <div className="lg:col-span-5">
          <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm ring-1 ring-foreground/5">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">New Category</CardTitle>
              <CardDescription>
                Configure your category details below.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-sm font-semibold">
                  Category Name
                </Label>
                <Input
                  id="name"
                  placeholder="e.g. Health & Fitness"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="bg-background/50 border-foreground/10 focus-visible:ring-1 h-11"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-semibold">Choose an Icon</Label>
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

              {error && (
                <div className="flex gap-3 p-3 rounded-lg bg-red-500/10 text-red-700 text-sm">
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

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

        {/* Right Column: List of Categories */}
        <div className="lg:col-span-7">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Existing Categories</h2>
            </div>

            {isLoading ? (
              <div className="col-span-full py-20 flex flex-col items-center justify-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <p className="text-muted-foreground font-medium">
                  Loading categories...
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="group relative flex items-center gap-4 p-5 rounded-2xl border border-foreground/5 bg-card/40 backdrop-blur-sm transition-all hover:shadow-xl hover:border-primary/20 hover:-translate-y-1"
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center h-12 w-12 rounded-xl transition-transform group-hover:scale-110",
                        category.color,
                      )}
                    >
                      {getIcon(category.iconName)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Expense Category
                      </p>
                    </div>
                  </div>
                ))}

                {categories.length === 0 && (
                  <div className="col-span-full py-20 flex flex-col items-center justify-center gap-4 border-2 border-dashed rounded-3xl bg-muted/10 opacity-60">
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
  );
}

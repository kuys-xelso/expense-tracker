import { SectionCards } from "@/components/section-cards";
import { ShoppingBag as ShoppingBagIcon, Wallet as WalletIcon } from "lucide-react";

export default function OverviewPage() {
  return (
    <>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:gap-6 px-4 lg:px-6">
        <div className="rounded-xl border bg-card/50 p-6 shadow-sm backdrop-blur-sm">
          <h3 className="font-semibold text-lg mb-4">Expense Breakdown</h3>
          <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-xl bg-muted/20">
            <p className="text-muted-foreground">Chart Placeholder</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card/50 p-6 shadow-sm backdrop-blur-sm">
          <h3 className="font-semibold text-lg mb-4">Monthly Trend</h3>
          <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-xl bg-muted/20">
            <p className="text-muted-foreground">Chart Placeholder</p>
          </div>
        </div>
      </div>

      <div className="flex-1 rounded-xl bg-muted/50 p-6 mt-6 mx-4 lg:mx-6 border border-foreground/5 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-lg">Recent Transactions</h3>
          <button className="text-sm text-primary hover:underline font-medium">View All</button>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 rounded-xl bg-background/50 border border-foreground/5 transition-hover hover:bg-background/80">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                <ShoppingBagIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Groceries</p>
                <p className="text-sm text-muted-foreground">Today, 2:00 PM</p>
              </div>
            </div>
            <p className="font-bold text-red-500 text-lg">-$120.00</p>
          </div>
          
          <div className="flex justify-between items-center p-4 rounded-xl bg-background/50 border border-foreground/5 transition-hover hover:bg-background/80">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                <WalletIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Salary</p>
                <p className="text-sm text-muted-foreground">Yesterday</p>
              </div>
            </div>
            <p className="font-bold text-green-500 text-lg">+$3,200.00</p>
          </div>
        </div>
      </div>
    </>
  );
}

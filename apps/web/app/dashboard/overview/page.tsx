import { SectionCards } from "@/components/section-cards";

export default function OverviewPage() {
  return (
    <>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards />
      </div>

      <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
        <h3 className="font-semibold text-lg mb-4">Recent Transactions</h3>
        {/* Placeholder for transactions list */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <div>
              <p className="font-medium">Groceries</p>
              <p className="text-sm text-muted-foreground">Today, 2:00 PM</p>
            </div>
            <p className="font-medium text-red-500">-$120.00</p>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <div>
              <p className="font-medium">Salary</p>
              <p className="text-sm text-muted-foreground">Yesterday</p>
            </div>
            <p className="font-medium text-green-500">+$3,200.00</p>
          </div>
        </div>
      </div>
    </>
  );
}

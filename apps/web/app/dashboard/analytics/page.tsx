export default function AnalyticzsPage() {
  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-2">
        <div className="aspect-video rounded-xl bg-muted/50 p-4">
          <h3 className="font-semibold text-lg mb-4">Spending by Category</h3>
          <div className="flex h-[80%] items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
            <p className="text-muted-foreground">Pie chart placeholder</p>
          </div>
        </div>
        <div className="aspect-video rounded-xl bg-muted/50 p-4">
          <h3 className="font-semibold text-lg mb-4">Income vs Expenses</h3>
          <div className="flex h-[80%] items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
            <p className="text-muted-foreground">Bar chart placeholder</p>
          </div>
        </div>
      </div>
      <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
        <h3 className="font-semibold text-lg mb-4">Monthly Trends</h3>
        <div className="flex h-75 items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
          <p className="text-muted-foreground">Line chart placeholder</p>
        </div>
      </div>
    </>
  );
}

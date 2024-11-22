import { recentSalesHandler } from "@/lib/actions/dashboard";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export async function RecentSales() {
  const recentSales = await recentSalesHandler();

  if (!recentSales) {
    return;
  }

  return (
    <div className="space-y-8">
      {recentSales.map((item) => (
        <div key={item.email} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={item.avatar} alt="Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{item.name}</p>
            <p className="text-sm text-muted-foreground">{item.email}</p>
          </div>
          <div className="ml-auto font-medium">+${item.totalAmount}</div>
        </div>
      ))}
    </div>
  );
}

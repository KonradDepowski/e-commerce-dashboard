import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Overview } from "../dashobard/OverView";
import { RecentSales } from "../dashobard/RecentSales";
import {
  fetchAllProductsCount,
  fetchAllUsersCount,
  fetchMonthRevenue,
  fetchYearRevenue,
  fetchYearSoldProducts,
} from "@/lib/actions/dashboard";
import { PiSneakerLight } from "react-icons/pi";
import OverViewContainer from "../dashobard/OverViewContainer";

export default async function DashboardPage() {
  const totalRevenue = await fetchYearRevenue();
  const usersCount = await fetchAllUsersCount();
  const productsCount = await fetchAllProductsCount();
  const soldYearProducts = await fetchYearSoldProducts();
  const year = new Date().getFullYear();
  return (
    <>
      <div className=" flex-col flex">
        <div className="flex-1 space-y-4 md:p-8 md:pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Revenue
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${totalRevenue}</div>
                    <p className="text-xs  mt-1 text-[var(--dark-500)]">
                      this year {year}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Users</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{usersCount}</div>
                    <p className="text-xs  mt-1 text-[var(--dark-500)]">
                      all time
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Sold Products
                    </CardTitle>
                    <PiSneakerLight size={18} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{soldYearProducts}</div>
                    <p className="text-xs  mt-1 text-[var(--dark-500)]">
                      this year {year}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Available Products
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{productsCount}</div>
                    <p className="text-xs  mt-1 text-[var(--dark-500)]">
                      all time
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-0 md:gap-4 md:grid-cols-2 lg:grid-cols-7">
                <OverViewContainer />
                <Card className="col-span-3 mt-4 md:mt-0">
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                  </CardHeader>
                  <CardContent className="mt-3">
                    <RecentSales />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

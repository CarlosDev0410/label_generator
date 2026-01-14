import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogisticLabelGenerator } from "@/components/LogisticLabelGenerator";
import { SalesLabelGenerator } from "@/components/SalesLabelGenerator";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 md:py-10">
        <Tabs defaultValue="logistic" className="space-y-6">
          <div className="flex items-center justify-center w-full">
            <TabsList className="grid w-full max-w-[400px] grid-cols-2">
              <TabsTrigger value="logistic">Logística</TabsTrigger>
              <TabsTrigger value="sales">Vendas</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="logistic" className="mt-0 border-none outline-none">
            <LogisticLabelGenerator />
          </TabsContent>

          <TabsContent value="sales" className="mt-0 border-none outline-none">
            <SalesLabelGenerator />
          </TabsContent>
        </Tabs>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
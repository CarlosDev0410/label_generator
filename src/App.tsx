import { SalesLabelGenerator } from "@/components/SalesLabelGenerator";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header / Logo Section */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent tracking-tight">
              Gerador de etiquetas
            </h1>
          </div>
          <div className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full border">
            v2.0
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6 md:py-10">
        <SalesLabelGenerator />
      </main>
      
      <Toaster />
    </div>
  );
}

export default App;
import { useState, useEffect } from "react";
import { SalesLabelGenerator } from "@/components/SalesLabelGenerator";
import { Login } from "@/components/Login";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { LogOut, Loader2 } from "lucide-react";
import { ApiService } from "@/services/api.service";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        await ApiService.validateToken();
        setIsAuthenticated(true);
      } catch (err) {
        localStorage.removeItem('auth_token');
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Login onLogin={() => setIsAuthenticated(true)} />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header / Logo Section */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 transition-all">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent tracking-tight">
              Gerador de etiquetas
            </h1>
            <div className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20 ml-2">
              PRO
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full border">
              v2.0
            </div>
            <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { ApiService } from "@/services/api.service";
import { motion } from "framer-motion";

interface LoginProps {
    onLogin: (token: string) => void;
}

export function Login({ onLogin }: LoginProps) {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await ApiService.login(password);
            localStorage.setItem('auth_token', response.token);
            onLogin(response.token);
        } catch (err: any) {
            setError(err.message || "Erro ao fazer login. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="border-primary/20 bg-card/50 backdrop-blur-xl shadow-2xl">
                    <CardHeader className="space-y-1 text-center">
                        <div className="mx-auto bg-primary/10 p-3 rounded-2xl w-fit mb-4">
                            <Lock className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle className="text-2xl font-bold tracking-tight">Acesso Restrito</CardTitle>
                        <CardDescription>
                            Digite a senha mestra para acessar o gerador de etiquetas
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Senha</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={`pr-10 h-11 ${error ? "border-destructive ring-destructive/20" : ""}`}
                                        autoFocus
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {error && (
                                    <motion.p 
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="text-xs font-medium text-destructive mt-1"
                                    >
                                        {error}
                                    </motion.p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button 
                                type="submit" 
                                className="w-full h-11 font-semibold text-base transition-all active:scale-95" 
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Verificando...
                                    </>
                                ) : (
                                    "Entrar no Sistema"
                                )}
                            </Button>
                            <p className="text-center text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                                Identidade Visual v2.0 • Premium Access
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </motion.div>
        </div>
    );
}

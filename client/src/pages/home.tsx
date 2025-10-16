import { Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-primary rounded-lg">
              <Activity className="h-12 w-12 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-semibold text-foreground">Telemetry App</h1>
          </div>
          
          <p className="text-lg text-muted-foreground text-center max-w-2xl">
            A professional monitoring and analytics platform ready for your custom implementation
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-8">
            <Card data-testid="card-feature-1">
              <CardHeader className="gap-1 space-y-0 pb-2">
                <CardTitle className="text-xl">Ready to Build</CardTitle>
                <CardDescription>Clean project structure</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Fullstack JavaScript setup with Express backend and React frontend, ready for your features.
                </p>
              </CardContent>
            </Card>

            <Card data-testid="card-feature-2">
              <CardHeader className="gap-1 space-y-0 pb-2">
                <CardTitle className="text-xl">Modern Stack</CardTitle>
                <CardDescription>Best-in-class tools</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  TypeScript, React Query, Tailwind CSS, and shadcn/ui components for rapid development.
                </p>
              </CardContent>
            </Card>

            <Card data-testid="card-feature-3">
              <CardHeader className="gap-1 space-y-0 pb-2">
                <CardTitle className="text-xl">Production Ready</CardTitle>
                <CardDescription>Scalable foundation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Dark mode support, responsive design, and professional UI components out of the box.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

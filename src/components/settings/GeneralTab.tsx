import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Info, Wrench } from "lucide-react";

export default function GeneralTab({ darkMode, onDarkModeChange, onAutoFixRun, autoFixLogs }: any) {
  return (
    <div className="space-y-6">
      {/* Auto-Fix */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Wrench className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Auto-Fix App</CardTitle>
              <CardDescription>Fix UI/UX issues</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={onAutoFixRun} className="w-full flex items-center gap-2">
            <Wrench className="h-4 w-4" /> Run Auto-Fix
          </Button>
          
          {autoFixLogs.length > 0 && (
            <div className="p-3 bg-muted rounded-xl text-xs font-mono text-muted-foreground max-h-40 overflow-y-auto space-y-1">
              {autoFixLogs.map((log: string, idx: number) => (
                <div key={idx}>{`> ${log}`}</div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              {darkMode ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
            </div>
            <div>
              <CardTitle className="text-lg">Appearance</CardTitle>
              <CardDescription>Customize the look and feel</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
            <div className="space-y-1">
              <Label htmlFor="dark-mode" className="text-sm font-medium">
                Dark Mode
              </Label>
              <p className="text-xs text-muted-foreground max-w-sm">
                Switch between light and dark themes for better visibility in different lighting conditions
              </p>
            </div>
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={onDarkModeChange}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

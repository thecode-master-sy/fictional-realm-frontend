"use client";
import { toast } from "sonner";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const showErrorToast = ({
  errorMessage,
  errorDetail,
}: {
  errorMessage?: string;
  errorDetail?: string;
}) => {
  toast.custom((id) => (
    <div
      className="flex w-full items-center gap-3 bg-card z-1000 rounded-lg border border-red-500/50  px-4 py-2 shadow-lg"
      role="alert"
    >
      {/* Icon */}
      <AlertTriangle className="h-5 w-5  shrink-0 text-red-500" />

      {/* Text Content */}
      <div className="text-sm space-y-1">
        {errorMessage && <h3 className="font-semibold">{errorMessage}</h3>}
        {errorDetail && (
          <div className="text-muted-foreground">{errorDetail}</div>
        )}
      </div>

      {/* Close Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => toast.dismiss(id)}
        className="shrink-0 rounded-md p-1"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>
    </div>
  ));
};

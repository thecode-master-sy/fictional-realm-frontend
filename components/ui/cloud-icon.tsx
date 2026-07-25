import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

// Lock down src, alt, width, and height while keeping standard Next.js Image props available
export interface CloudIconProps extends Omit<
  ImageProps,
  "src" | "alt" | "width" | "height"
> {
  className?: string;
}

export function CloudIcon({ className, ...props }: CloudIconProps) {
  return (
    <Image
      src="/cloud-icon.svg"
      alt="Logo"
      width={100}
      height={100}
      className={cn("w-12.5 h-12.5", className)}
      {...props}
    />
  );
}

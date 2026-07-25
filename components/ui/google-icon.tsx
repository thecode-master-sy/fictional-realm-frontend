import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

// Lock down src, alt, width, and height while keeping standard Next.js Image props available
export interface GoogleIconProps extends Omit<
  ImageProps,
  "src" | "alt" | "width" | "height"
> {
  className?: string;
}

export function GoogleIcon({ className, ...props }: GoogleIconProps) {
  return (
    <Image
      src="/google-icon.svg"
      alt="Logo"
      width={100}
      height={100}
      className={cn("w-[24px] h-[24px]", className)}
      {...props}
    />
  );
}

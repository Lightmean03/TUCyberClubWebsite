import { cn } from "@/lib/utils";
import * as React from "react";

const HeroWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className="relative pt-16 flex content-center items-center justify-center min-h-[75vh]"
    {...props}
  />
));
HeroWrapper.displayName = "HeroWrapper";

const HeroContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }) => (
  <div className="container relative mx-auto">
    <div className="items-center flex flex-wrap">
      <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
        <div className="pr-12 pb-24">{props.children}</div>
      </div>
    </div>
  </div>
));
HeroContent.displayName = "HeroContent";

const HeroTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }) => (
  <h1 className={cn("text-white font-semibold text-5xl", className)}>
    {props.children}
  </h1>
));
HeroTitle.displayName = "HeroTitle";

const HeroDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }) => (
  <p className={cn("mt-4 text-lg text-gray-300", className)} {...props} />
));
HeroDescription.displayName = "HeroDescription";

const HeroMediaBackdrop = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn(
      `absolute top-0 left-0 w-full h-full overflow-hidden`,
      className
    )}
    ref={ref}
    {...props}
  >
    {props.children}
  </div>
));
HeroMediaBackdrop.displayName = "HeroMediaBackdrop";

export {
  HeroWrapper,
  HeroTitle,
  HeroContent,
  HeroDescription,
  HeroMediaBackdrop,
};

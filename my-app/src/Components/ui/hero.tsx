import { cn } from "../../lib/utils";
import * as React from "react";

const HeroWrapper = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      className="relative font-sans pt-16 flex content-center items-center justify-center min-h-[75vh]"
      {...props}
      ref={ref}
    />
  )
);
HeroWrapper.displayName = "HeroWrapper";

const HeroContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div className="container relative mx-auto font-sans" ref={ref}>
      <div className="items-center flex flex-wrap">
        <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
          <div className="pr-12 pb-24 text-black">{props.children}</div>
        </div>
      </div>
    </div>
  )
);
HeroContent.displayName = "HeroContent";

const HeroTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <h1 className={cn("text-black font-semibold text-5xl font-sans", className)} {...props} ref={ref}>
      {props.children}
    </h1>
  )
);
HeroTitle.displayName = "HeroTitle";

const HeroDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <p
      className={cn("mt-4 text-lg text-gray-300 font-sans", className)}
      {...props}
      ref={ref}
    />
  )
);
HeroDescription.displayName = "HeroDescription";

const HeroMediaBackdrop = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      className={cn(`absolute top-0 left-0 w-full h-full overflow-hidden font-sans`, className)}
      ref={ref}
      {...props}
    >
      {props.children}
    </div>
  )
);
HeroMediaBackdrop.displayName = "HeroMediaBackdrop";


export {
  HeroWrapper,
  HeroTitle,
  HeroContent,
  HeroDescription,
  HeroMediaBackdrop,
};

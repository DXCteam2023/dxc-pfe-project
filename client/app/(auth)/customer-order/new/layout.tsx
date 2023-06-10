"use client";

import { Fragment, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type StepType = {
  id: number;
  title: string;
  path: string;
};

const STEPS: StepType[] = [
  { id: 1, title: "Create Order", path: "create-order" },
  { id: 2, title: "Select Product", path: "select-product" },
  { id: 3, title: "Configure Product", path: "configure-product" },
  { id: 4, title: "Review Order", path: "review-order" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const route = useRouter();
  const pathname = usePathname();

  const [currentStep, setCurrentStep] = useState(1);

  const handleStepOnClick = (step: StepType) => {
    route.push("/customer-order/new/" + step.path);
  };

  useEffect(() => {
    const target = pathname?.split("/")?.slice(-1)?.[0];
    const stepFound = STEPS.find((step) => step.path === target);
    if (stepFound) {
      setCurrentStep(stepFound.id);
    }
  }, [pathname]);

  return (
    <div className="new-customer-order">
      <h1 className="p-4">New Product Order</h1>
      <div className="flex justify-center gap-4 font-extrabold p-4 border-b-2 border-t-2 border-gray-500">
        {STEPS.map((step, index) => (
          <Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <span
                onClick={() => handleStepOnClick(step)}
                className={`flex items-center justify-center cursor-pointer border-2 ${
                  currentStep === step.id ? "border-[#39175f]" : ""
                } ${
                  currentStep !== step.id ? "text-gray-500" : ""
                } w-8 h-8 rounded-full bg-opacity-75 bg-[#c19de8]`}
              >
                {step.id}
              </span>
              <h4
                onClick={() => handleStepOnClick(step)}
                className={`cursor-pointer ${
                  currentStep !== step.id ? "text-gray-500" : ""
                }`}
              >
                {step.title}
              </h4>
            </div>
            {index !== STEPS.length - 1 && (
              <hr
                className={`border-2 ${
                  index + 1 < currentStep
                    ? "border-[#5f249f]"
                    : "border-gray-500"
                } w-16 mt-4`}
              />
            )}
          </Fragment>
        ))}
      </div>

      <div className="flex">{children}</div>
    </div>
  );
}

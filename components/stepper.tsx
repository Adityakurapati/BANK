import { CheckCircle } from "lucide-react"

interface StepperProps {
  steps: string[]
  currentStep: number
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex items-center w-full">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center w-full">
          <div className="relative flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                index + 1 < currentStep
                  ? "bg-primary border-primary text-primary-foreground"
                  : index + 1 === currentStep
                    ? "border-primary text-primary"
                    : "border-muted-foreground text-muted-foreground"
              }`}
            >
              {index + 1 < currentStep ? <CheckCircle className="w-5 h-5" /> : <span>{index + 1}</span>}
            </div>
            <span
              className={`absolute top-10 text-xs whitespace-nowrap ${
                index + 1 === currentStep ? "font-medium text-primary" : "text-muted-foreground"
              }`}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-1 h-0.5 ${index + 1 < currentStep ? "bg-primary" : "bg-muted"}`}></div>
          )}
        </div>
      ))}
    </div>
  )
}


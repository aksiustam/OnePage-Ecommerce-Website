"use client";
import { Step, Stepper } from "react-form-stepper";
const StepperComp = (props) => {
  const { steps } = props;
  return (
    <Stepper activeStep={steps}>
      <Step label="Bilgiler" />
      <Step label="Ödeme" />
    </Stepper>
  );
};

export default StepperComp;

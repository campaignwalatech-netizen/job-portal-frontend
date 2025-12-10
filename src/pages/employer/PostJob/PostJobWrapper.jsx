import React, { useState } from "react";
import Step1JobDetails from "./Step1JobDetails";
import Step2BasicDetails from "./Step2BasicDetails";
import Step3InterviewDetails from "./Step3InterviewDetails";
import Step4Preview from "./Step4Preview";
import Step5SelectPlan from "./Step5SelectPlan";
import ProgressBar from "./progressbar";

import "./post-job.css";

export default function PostJobWrapper() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    step1: {},
    step2: {},
    step3: {},
  });
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1JobDetails
            setStep={setStep}
            step1Data={formData.step1}
            setStep1Data={(d) => setFormData({ ...formData, step1: d })}
          />
        );

      case 2:
        return (
          <Step2BasicDetails
            setStep={setStep}
            step2Data={formData.step2}
            setStep2Data={(d) => setFormData({ ...formData, step2: d })}
          />
        );

      case 3:
        return (
          <Step3InterviewDetails
            setStep={setStep}
            step3Data={formData.step3}
            setStep3Data={(d) => setFormData({ ...formData, step3: d })}
          />
        );

      case 4:
        return (
          <Step4Preview
            setStep={setStep}
            step1Data={formData.step1}
            step2Data={formData.step2}
            step3Data={formData.step3}
          />
        );

      case 5:
        return <Step5SelectPlan setStep={setStep} formData={formData} />;

      default:
        return null;
    }
  };

  return (
    <div className="postjob-page">
      <ProgressBar step={step} setStep={setStep} />
      {renderStep()}
    </div>
  );
}

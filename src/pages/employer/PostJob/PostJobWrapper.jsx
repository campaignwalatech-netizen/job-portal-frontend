import React, { useState } from "react";
import Step1JobDetails from "./Step1JobDetails";
import Step2BasicDetails from "./Step2BasicDetails";
import Step3InterviewDetails from "./Step3InterviewDetails";
import Step4Preview from "./Step4Preview";
import Step5SelectPlan from "./Step5SelectPlan";
import "./post-job.css";

const initialData = {
  companyName: "",
  jobTitle: "",
  jobDescription: "",
  jobType: "",
  location: "",
  minSalary: "",
  maxSalary: "",
  minEducation: "",
  languages: [],
  minExp: "",
  maxExp: "",
  gender: "Any",
  skills: [],
  minAge: "",
  maxAge: "",
  detailedDescription: "",
  walkIn: false,
  contactPerson: "",
  phone: "",
  email: "",
  candidateVisibility: "all",
  whatsappAlerts: false,
  selectedPlan: "Free",
};

export default function PostJobWrapper() {
  const [form, setForm] = useState(initialData);
  const [step, setStep] = useState(1);

  const update = (patch) => setForm((prev) => ({ ...prev, ...patch }));
  const next = () => setStep((s) => Math.min(5, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));
  const goTo = (n) => setStep(Math.min(5, Math.max(1, n)));

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1JobDetails form={form} update={update} next={next} />;
      case 2:
        return (
          <Step2BasicDetails form={form} update={update} next={next} back={back} />
        );
      case 3:
        return (
          <Step3InterviewDetails form={form} update={update} next={next} back={back} />
        );
      case 4:
        return <Step4Preview form={form} next={next} back={back} />;
      case 5:
        return <Step5SelectPlan form={form} update={update} back={back} />;
      default:
        return null;
    }
  };

  return (
    <div className="postjob-root">
      {/* PROGRESS */}
      <div className="pj-progress pj-card" aria-hidden>
        <div className={`pj-step ${step === 1 ? "active" : step > 1 ? "completed" : "inactive"}`} onClick={() => goTo(1)}>
          <div className="circle">1</div>
          <div className="label">Job Details</div>
        </div>

        <div className={`pj-step ${step === 2 ? "active" : step > 2 ? "completed" : step < 2 ? "inactive" : ""}`} onClick={() => goTo(2)}>
          <div className="circle">2</div>
          <div className="label">Basic Details</div>
        </div>

        <div className={`pj-step ${step === 3 ? "active" : step > 3 ? "completed" : step < 3 ? "inactive" : ""}`} onClick={() => goTo(3)}>
          <div className="circle">3</div>
          <div className="label">Interview Details</div>
        </div>

        <div className={`pj-step ${step === 4 ? "active" : step > 4 ? "completed" : step < 4 ? "inactive" : ""}`} onClick={() => goTo(4)}>
          <div className="circle">4</div>
          <div className="label">Preview</div>
        </div>

        <div className={`pj-step ${step === 5 ? "active" : step < 5 ? "inactive" : "completed"}`} onClick={() => goTo(5)}>
          <div className="circle">5</div>
          <div className="label">Select Plan</div>
        </div>

        {/* background line */}
        <div className="pj-progress-line" />
      </div>

      {/* STEP CONTENT */}
      <div className="pj-card">{renderStep()}</div>
    </div>
  );
}

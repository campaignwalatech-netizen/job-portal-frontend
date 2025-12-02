import React from "react";

export default function ProgressBar({ step, setStep }) {
  const steps = [
    { num: 1, label: "Job Details" },
    { num: 2, label: "Basic Details" },
    { num: 3, label: "Interview Details" },
    { num: 4, label: "Preview" },
    { num: 5, label: "Select Plan" },
  ];

  return (
    <>
      <style>{`
  .jc-wrapper {
    background: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 10px;
    padding: 20px 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin-bottom: 32px;
  }

  /* ONLY BETWEEN STEPS — LIKE JOBCHAAHIYE */
  .jc-line {
    position: absolute;
    top: 35px;   /* PERFECT ALIGNMENT */
    height: 2px;
    background: #dcdcdc;
    z-index: 1;

    /* Critical Part: Start AT step 1 circle, end BEFORE step 5 circle */
    left: calc( (100% / 5) / 2 + 24px );
    right: calc( (100% / 5) / 2 + 24px );
  }

  .jc-step {
    flex: 1;
    text-align: center;
    z-index: 2;
    cursor: pointer;
  }

  .jc-circle {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid #dcdcdc;
    background: #f3f4f6;
    color: #6b7280;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    transition: 0.2s ease;
  }

  .jc-label {
    font-size: 13px;
    color: #6b7280;
    margin-top: 6px;
  }

  .jc-step.active .jc-circle,
  .jc-step.completed .jc-circle {
    background: #0b63f8;
    border-color: #0b63f8;
    color: white;
  }

  .jc-step.active .jc-label,
  .jc-step.completed .jc-label {
    color: #0b63f8;
    font-weight: 600;
  }

`}</style>


      <div className="jc-wrapper">
        <div className="jc-line"></div>

        {steps.map((s) => {
          const isActive = step === s.num;
          const isCompleted = step > s.num;

          return (
            <div
              key={s.num}
              className={`jc-step ${isActive ? "active" : ""} ${
                isCompleted ? "completed" : ""
              }`}
              onClick={() => setStep(s.num)}
            >
              <div className="jc-circle">{s.num}</div>
              <div className="jc-label">{s.label}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

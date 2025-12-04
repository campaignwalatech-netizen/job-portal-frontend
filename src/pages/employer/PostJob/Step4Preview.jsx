import React from "react";

export default function Step4Preview({ setStep, step1Data, step2Data, step3Data }) {
  const formatSalary = () => {
    const { salaryType, minSalary, maxSalary, minIncentive, maxIncentive } = step1Data;

    if (salaryType === "fixed")
      return `₹${minSalary} – ₹${maxSalary} (Monthly)`;

    if (salaryType === "incentive")
      return `Incentive: ₹${minIncentive} – ₹${maxIncentive}`;

    if (salaryType === "both")
      return `Fixed: ₹${minSalary} – ₹${maxSalary}, Incentive: ₹${minIncentive} – ₹${maxIncentive}`;

    return "-";
  };

  const renderWorkLocation = () => {
    if (step1Data.workLocation === "wfh") return "Work From Home";
    if (step1Data.workLocation === "wfo") return "On-site";
    if (step1Data.workLocation === "field") return "Field Work";
    return "-";
  };

  const renderAddress = () => {
    if (step1Data.workLocation === "wfh") {
      return step1Data.wfhCity || "-";
    }
    if (step1Data.workLocation === "wfo") {
      return `${step1Data.wfoAddress}, ${step1Data.wfoCity}, ${step1Data.wfoPincode}`;
    }
    if (step1Data.workLocation === "field") {
      return `${step1Data.fieldAddress}, ${step1Data.fieldCity}, ${step1Data.fieldPincode}`;
    }
    return "-";
  };

  const renderPerks = () => {
    const { selectedPerks, otherPerksList } = step1Data;
    const list = [...(selectedPerks || []), ...(otherPerksList || [])];
    if (list.length === 0) return "-";
    return list;
  };

  const formatDate = (d) => {
    if (!d) return "";
    const dt = new Date(d);
    return dt.toISOString().split("T")[0];
  };

  const formatTime = (t) => {
    if (!t) return "";
    const [h, m] = t.split(":");
    let HH = Number(h);
    const ampm = HH >= 12 ? "PM" : "AM";
    HH = HH % 12 || 12;
    return `${HH}:${m} ${ampm}`;
  };

  const renderInterviewSummary = () => {
    if (!step3Data.walkinEnabled) return "Walk-in not enabled";
    return `${formatDate(step3Data.startDate)} (${formatTime(step3Data.startTime)}) 
      to ${formatDate(step3Data.endDate)} (${formatTime(step3Data.endTime)})`;
  };

  const renderInterviewAddress = () => {
    if (!step3Data.walkinEnabled) return "-";
    if (step3Data.addressMode === "current") return "Using Recruiter’s Current Location";
    return `${step3Data.address}, ${step3Data.city}, ${step3Data.pincode}`;
  };

  return (
    <>
      <style>{`
        .preview-card {
          background:#fff;
          border-radius:12px;
          border:1px solid #E5E7EB;
          padding:24px;
          margin-bottom:32px;
          font-family:Inter;
        }

        .preview-title {
          font-family:Poppins;
          font-size:20px;
          font-weight:700;
          margin-bottom:18px;
        }

        .preview-grid {
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:16px 32px;
          margin-top:12px;
        }

        .preview-label {
          font-size:14px;
          font-weight:600;
          color:#475569;
        }

        .preview-value {
          font-size:14px;
          color:#1e293b;
          margin-top:2px;
          line-height:1.5;
        }

        .chip {
          display:inline-block;
          background:#e8f0fe;
          color:#0b63f8;
          padding:5px 10px;
          border-radius:16px;
          font-size:13px;
          margin-right:6px;
          margin-bottom:6px;
          border:1px solid #c7d7fe;
        }

        .edit-btn {
          background:#fff;
          border:1px solid #d1d5db;
          padding:6px 14px;
          border-radius:8px;
          font-size:13px;
          cursor:pointer;
          float:right;
        }

        @media(max-width:900px){
          .preview-grid{
            grid-template-columns:1fr;
          }
        }
      `}</style>

      {/* ---------------------- JOB DETAILS ---------------------- */}
      <div className="preview-card">
        <button className="edit-btn" onClick={() => setStep(1)}>Edit</button>
        <h3 className="preview-title">Job Details Summary</h3>

        <div className="preview-grid">
          <div>
            <div className="preview-label">Hiring Company</div>
            <div className="preview-value">{step1Data.companyName}</div>
          </div>

          <div>
            <div className="preview-label">Job Title</div>
            <div className="preview-value">{step1Data.jobTitle}</div>
          </div>

          <div>
            <div className="preview-label">Job Role</div>
            <div className="preview-value">{step1Data.roleDesc}</div>
          </div>

          <div>
            <div className="preview-label">Job Type</div>
            <div className="preview-value">{step1Data.jobType}</div>
          </div>

          <div>
            <div className="preview-label">Work Location</div>
            <div className="preview-value">{renderWorkLocation()}</div>
          </div>

          <div>
            <div className="preview-label">Address</div>
            <div className="preview-value">{renderAddress()}</div>
          </div>

          <div>
            <div className="preview-label">Salary</div>
            <div className="preview-value">{formatSalary()}</div>
          </div>

          <div>
            <div className="preview-label">Joining Fee</div>
            <div className="preview-value">
              {step1Data.joiningFee === "yes"
                ? `Yes (₹${step1Data.joiningAmount})`
                : "No"}
            </div>
          </div>

          <div style={{ gridColumn: "1 / 3" }}>
            <div className="preview-label">Perks</div>
            <div className="preview-value">
              {renderPerks().map((p, i) => (
                <span key={i} className="chip">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------- BASIC DETAILS ---------------------- */}
      <div className="preview-card">
        <button className="edit-btn" onClick={() => setStep(2)}>Edit</button>
        <h3 className="preview-title">Basic Details Summary</h3>

        <div className="preview-grid">
          <div>
            <div className="preview-label">Minimum Education</div>
            <div className="preview-value">{step2Data.education?.join(", ")}</div>
          </div>

          <div>
            <div className="preview-label">Languages</div>
            <div className="preview-value">{step2Data.languages?.join(", ")}</div>
          </div>

          <div>
            <div className="preview-label">Experience</div>
            <div className="preview-value">
              {step2Data.expMin} - {step2Data.expMax} Years
            </div>
          </div>

          <div>
            <div className="preview-label">Gender</div>
            <div className="preview-value">{step2Data.gender}</div>
          </div>

          <div>
            <div className="preview-label">Age</div>
            <div className="preview-value">
              {step2Data.ageMin || "-"} - {step2Data.ageMax || "-"}
            </div>
          </div>

          <div style={{ gridColumn: "1 / 3" }}>
            <div className="preview-label">Skills</div>
            <div className="preview-value">
              {(step2Data.skills || []).map((s, i) => (
                <span className="chip" key={i}>{s}</span>
              ))}
            </div>
          </div>

          <div style={{ gridColumn: "1 / 3" }}>
            <div className="preview-label">Job Description</div>
            <div
              className="preview-value"
              dangerouslySetInnerHTML={{ __html: step2Data.description }}
            />
          </div>
        </div>
      </div>

      {/* ---------------------- INTERVIEW DETAILS ---------------------- */}
      <div className="preview-card">
        <button className="edit-btn" onClick={() => setStep(3)}>Edit</button>
        <h3 className="preview-title">Interview Details Summary</h3>

        <div className="preview-grid">
          <div>
            <div className="preview-label">Interview Type</div>
            <div className="preview-value">
              {step3Data.walkinEnabled ? "Walk-in" : "No Walk-in"}
            </div>
          </div>

          <div>
            <div className="preview-label">Interview Address</div>
            <div className="preview-value">{renderInterviewAddress()}</div>
          </div>

          <div>
            <div className="preview-label">Date & Time</div>
            <div className="preview-value">{renderInterviewSummary()}</div>
          </div>

          <div>
            <div className="preview-label">Instructions</div>
            <div className="preview-value">
              {step3Data.instructions || "-"}
            </div>
          </div>

          <div>
            <div className="preview-label">Contact Preference</div>
            <div className="preview-value">
              {step3Data.commPref === "self"
                ? "To Myself"
                : step3Data.commPref === "other"
                ? `To Other Recruiter (${step3Data.recruiterName})`
                : "Recruiter Will Contact Candidates"}
            </div>
          </div>

          <div>
            <div className="preview-label">Leads Access</div>
            <div className="preview-value">{step3Data.contactAccess}</div>
          </div>

          <div>
            <div className="preview-label">WhatsApp Alerts</div>
            <div className="preview-value">
              {step3Data.whatsappAlerts ? "Enabled" : "Disabled"}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------- FOOTER ---------------------- */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button className="btn-secondary" onClick={() => setStep(3)}>Previous</button>
        <button className="btn-primary" onClick={() => setStep(5)}>
          Post Job & Select Plan
        </button>
      </div>
    </>
  );
}

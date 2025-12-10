import React, { useState } from "react";
import ToggleSwitch from "../../../components/ToggleSwitch";


export default function Step1JobDetails({ setStep,step1Data, setStep1Data }) {

  const [companyName, setCompanyName] = useState("");
const [jobTitle, setJobTitle] = useState("");
const [roleDesc, setRoleDesc] = useState("");
const [otherPerks, setOtherPerks] = useState("");


  const [jobType, setJobType] = useState("");

  const [workLocation, setWorkLocation] = useState("");

  const [wfhCity, setWfhCity] = useState("");

  const [wfoAddress, setWfoAddress] = useState("");
  const [wfoCity, setWfoCity] = useState("");
  const [wfoPincode, setWfoPincode] = useState("");

  const [fieldAddress, setFieldAddress] = useState("");
  const [fieldCity, setFieldCity] = useState("");
  const [fieldPincode, setFieldPincode] = useState("");

  const [salaryType, setSalaryType] = useState("");

  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [minIncentive, setMinIncentive] = useState("");
  const [maxIncentive, setMaxIncentive] = useState("");

  const presetPerks = [
    "Laptop",
    "Flexible Working Hours",
    "Weekly Payout",
    "Overtime Pay",
    "Joining Bonus",
    "PF",
    "Travel Allowance",
    "Petrol Allowance",
    "ESI (ESIC)",
    "Food/Meals",
    "Accommodation",
    "One-way Cab",
    "Health Insurance",
    "Other Perks",
  ];
  const [selectedPerks, setSelectedPerks] = useState([]);

  const [joiningFee, setJoiningFee] = useState("");
  const [joiningAmount, setJoiningAmount] = useState("");
  const [joiningComment, setJoiningComment] = useState("");


  const [errors, setErrors] = useState({});
  React.useEffect(() => {
  if (!step1Data) return;

  setCompanyName(step1Data.companyName || "");
  setJobTitle(step1Data.jobTitle || "");
  setRoleDesc(step1Data.roleDesc || "");
  setOtherPerks(step1Data.otherPerks || "");

  setJobType(step1Data.jobType || "");
  setWorkLocation(step1Data.workLocation || "");

  setWfhCity(step1Data.wfhCity || "");
  setWfoAddress(step1Data.wfoAddress || "");
  setWfoCity(step1Data.wfoCity || "");
  setWfoPincode(step1Data.wfoPincode || "");

  setFieldAddress(step1Data.fieldAddress || "");
  setFieldCity(step1Data.fieldCity || "");
  setFieldPincode(step1Data.fieldPincode || "");

  setSalaryType(step1Data.salaryType || "");
  setMinSalary(step1Data.minSalary || "");
  setMaxSalary(step1Data.maxSalary || "");
  setMinIncentive(step1Data.minIncentive || "");
  setMaxIncentive(step1Data.maxIncentive || "");

  setSelectedPerks(step1Data.selectedPerks || []);
  if (step1Data.selectedPerks?.includes("Other Perks")) {
  setOtherPerks(step1Data.otherPerks || "");
}

  setJoiningFee(step1Data.joiningFee || "");
  setJoiningAmount(step1Data.joiningAmount || "");
}, []);



const togglePerk = (perk) => {
  if (perk === "Other Perks") {
    if (selectedPerks.includes(perk)) {
      setSelectedPerks(selectedPerks.filter((p) => p !== perk));
      setOtherPerks(""); 
    } else {
      setSelectedPerks([...selectedPerks, perk]);
    }
    return;
  }

  if (selectedPerks.includes(perk)) {
    setSelectedPerks(selectedPerks.filter((p) => p !== perk));
  } else {
    setSelectedPerks([...selectedPerks, perk]);
  }
};

  const validateFields = () => {
    const newErrors = {};

    if (!companyName) newErrors.companyName = true;
    if (!jobTitle) newErrors.jobTitle = true;
    if (!roleDesc) newErrors.roleDesc = true;
    if (!jobType) newErrors.jobType = true;
    if (!workLocation) newErrors.workLocation = true;
    if (workLocation === "wfh" && !wfhCity) newErrors.wfhCity = true;
    if (workLocation === "wfo") {
      if (!wfoAddress) newErrors.wfoAddress = true;
      if (!wfoCity) newErrors.wfoCity = true;
      if (!wfoPincode) newErrors.wfoPincode = true;
    }

    if (workLocation === "field") {
      if (!fieldAddress) newErrors.fieldAddress = true;
      if (!fieldCity) newErrors.fieldCity = true;
      if (!fieldPincode) newErrors.fieldPincode = true;
    }
    if (!salaryType) newErrors.salaryType = true;

    if (salaryType === "fixed") {
      if (!minSalary) newErrors.minSalary = true;
      if (!maxSalary) newErrors.maxSalary = true;
    }

    if (salaryType === "incentive") {
      if (!minIncentive) newErrors.minIncentive = true;
      if (!maxIncentive) newErrors.maxIncentive = true;
    }

    if (salaryType === "both") {
      if (!minSalary) newErrors.minSalary = true;
      if (!maxSalary) newErrors.maxSalary = true;
      if (!minIncentive) newErrors.minIncentive = true;
      if (!maxIncentive) newErrors.maxIncentive = true;
    }

    if (minSalary && Number(minSalary) < 5000) newErrors.minSalary = true;

    if (maxSalary && minSalary && Number(maxSalary) < Number(minSalary))
      newErrors.maxSalary = true;

    if (
      minIncentive &&
      maxIncentive &&
      Number(maxIncentive) < Number(minIncentive)
    )
      newErrors.maxIncentive = true;

if (joiningFee === "yes") {
  if (!joiningAmount) newErrors.joiningAmount = true;
  if (!joiningComment) newErrors.joiningComment = true;
}


    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    const ok = validateFields();
    if (!ok) return alert("Fill all mandatory fields");
    const finalOtherPerksArray =
  otherPerks
    ?.split(",")
    .map((p) => p.trim())
    .filter((p) => p.length > 0) || [];

setStep1Data({
  companyName,
  jobTitle,
  roleDesc,
  otherPerks,
  jobType,
  workLocation,
  wfhCity,
  wfoAddress,
  wfoCity,
  wfoPincode,
  fieldAddress,
  fieldCity,
  fieldPincode,
  salaryType,
  minSalary,
  maxSalary,
  minIncentive,
  maxIncentive,
  selectedPerks,
  joiningFee,
  joiningAmount,
  joiningComment,
  otherPerksList: finalOtherPerksArray,

});



    setStep(2);
  };

  return (
    <>
      {/* ---------------------------------------------------------------------
          INLINE CSS — THEME A (RESPONSIVE + ERROR STYLING)
      ---------------------------------------------------------------------- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');

        .step-card {
          background:#fff;
          padding:30px;
          border-radius:12px;
          border:1px solid #E5E7EB;
          margin-top:24px;
          font-family:Inter;
        }

        .step-title { font-family:Poppins; font-size:22px; font-weight:700; }
        .step-subtitle { color:#6b7280; font-size:14px; margin-bottom:24px; }

        .section { margin-bottom:32px; }
        .section-title { font-family:Poppins; font-size:18px; font-weight:600; margin-bottom:14px; }

        .field { display:flex; flex-direction:column; margin-bottom:18px; }

        .field label {
          font-size:14px;
          font-weight:600;
          margin-bottom:6px;
        }

        .error-label { color:#dc2626 !important; }

        .error-input {
          border:2px solid #dc2626 !important;
        }

        .field input,
        .field select {
          padding:12px 14px;
          border-radius:10px;
          border:1px solid #D1D5DB;
          font-size:14px;
          background:#fff;
          font-family:Inter;
        }

        .radio-row { 
          display:flex; 
          gap:28px; 
          flex-wrap:wrap;
        }

        .chips { display:flex; flex-wrap:wrap; gap:12px; }
        
        .chip {
          padding:8px 14px;
          background:#F1F5F9;
          border-radius:20px;
          font-size:14px;
          border:1px solid #E2E8F0;
          cursor:pointer;
          display:flex;
          align-items:center;
          gap:4px;
        }
        .chip.selected {
          background:#0b63f8;
          border-color:#0b63f8;
          color:white;
        }


        .grid {
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:20px;
        }

        .preview-box {
          background:#f8fafc;
          padding:12px;
          border-radius:10px;
          border:1px solid #e2e8f0;
          margin-top:10px;
          font-size:14px;
          color:#334155;
        }

        .footer-actions { 
          display:flex; 
          justify-content:flex-end; 
          gap:14px; 
          margin-top:24px;
        }

        .btn-secondary {
          padding:10px 16px;
          background:#fff;
          border-radius:10px;
          border:1px solid #D1D5DB;
        }
        .btn-primary {
          padding:10px 16px;
          background:#0b63f8;
          color:white;
          border-radius:10px;
          border:none;
        }

        @media (max-width: 900px) {
          .step-card { padding:20px; }
          .grid { grid-template-columns:1fr; gap:16px; }

          .radio-row { 
            flex-direction:column; 
            align-items:flex-start; 
            gap:14px;
          }

          .chips { gap:10px; }
          .chip { padding:6px 12px; font-size:13px; }

          .footer-actions { 
            flex-direction:column; 
            gap:12px; 
          }
          .btn-primary, .btn-secondary { width:100%; text-align:center; }
        }
          .error-text {
  color: #dc2626;
  font-size: 12px;
  margin-top: 4px;
  font-weight: 500;
}

      `}</style>

      {/* ---------------------------------------------------------------------
          MAIN CARD UI + LOGIC
      ---------------------------------------------------------------------- */}
      <div className="step-card">
        <h2 className="step-title">Job Details</h2>
        <p className="step-subtitle">
          Provide the essential information about the job.
        </p>

        {/* ---------------------------------------------------
            COMPANY & ROLE
        ---------------------------------------------------- */}
        <div className="section">
          <h3 className="section-title">Company & Role</h3>

          <div className="field">
            <label className={errors.companyName ? "error-label" : ""}>
              Hiring Company Name *
            </label>
            <input
              className={errors.companyName ? "error-input" : ""}
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
                setErrors((p) => ({ ...p, companyName: false }));
              }}
              placeholder="e.g., Acme Corp"
            />
          </div>

          <div className="field">
            <label className={errors.jobTitle ? "error-label" : ""}>
              Job Title / Designation *
            </label>
            <input
              className={errors.jobTitle ? "error-input" : ""}
              value={jobTitle}
              onChange={(e) => {
                setJobTitle(e.target.value);
                setErrors((p) => ({ ...p, jobTitle: false }));
              }}
              placeholder="e.g., Software Engineer"
            />
          </div>

          <div className="field">
            <label className={errors.roleDesc ? "error-label" : ""}>
              Specific Job Role Description (max 100 chars) *
            </label>
            <input
              className={errors.roleDesc ? "error-input" : ""}
              value={roleDesc}
              maxLength={100}
              onChange={(e) => {
                setRoleDesc(e.target.value);
                setErrors((p) => ({ ...p, roleDesc: false }));
              }}
              placeholder="Short job summary"
            />
            <small>{roleDesc.length}/100</small>
          </div>
        </div>

        {/* ---------------------------------------------------
            JOB TYPE
        ---------------------------------------------------- */}
        <div className="section">
          <h3 className={`section-title ${errors.jobType ? "error-label" : ""}`}>
  Job Type *
</h3>


          <div className={`radio-row ${errors.jobType ? "error-label" : ""}`}>
            <label>
              <input
                type="radio"
                name="jobType"
                onChange={() => {
                  setJobType("fulltime");
                  setErrors((p) => ({ ...p, jobType: false }));
                }}
              />
              Fulltime
            </label>

            <label>
              <input
                type="radio"
                name="jobType"
                onChange={() => {
                  setJobType("parttime");
                  setErrors((p) => ({ ...p, jobType: false }));
                }}
              />
              Part-time
            </label>

            <label>
              <input
                type="radio"
                name="jobType"
                onChange={() => {
                  setJobType("both");
                  setErrors((p) => ({ ...p, jobType: false }));
                }}
              />
              Both
            </label>
          </div>
        </div>

        {/* ---------------------------------------------------
            WORK LOCATION
        ---------------------------------------------------- */}
        <div className="section">
          <h3 className={`section-title ${errors.workLocation ? "error-label" : ""}`}>
  Work Location *
</h3>


          <div className={`radio-row ${errors.workLocation ? "error-label" : ""}`}>
            <label>
              <input
                type="radio"
                name="wl"
                onChange={() => {
                  setWorkLocation("wfh");
                  setErrors((p) => ({ ...p, workLocation: false }));
                }}
              />
              Work From Home
            </label>

            <label>
              <input
                type="radio"
                name="wl"
                onChange={() => {
                  setWorkLocation("wfo");
                  setErrors((p) => ({ ...p, workLocation: false }));
                }}
              />
              Work From Office
            </label>

            <label>
              <input
                type="radio"
                name="wl"
                onChange={() => {
                  setWorkLocation("field");
                  setErrors((p) => ({ ...p, workLocation: false }));
                }}
              />
              Field Work
            </label>
          </div>

          {workLocation === "wfh" && (
            <div className="field">
              <label className={errors.wfhCity ? "error-label" : ""}>Region/City *</label>
              <select
                className={errors.wfhCity ? "error-input" : ""}
                value={wfhCity}
                onChange={(e) => {
                  setWfhCity(e.target.value);
                  setErrors((p) => ({ ...p, wfhCity: false }));
                }}
              >
                <option value="">Select Region/City</option>
                <option>All India</option>
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Bangalore</option>
              </select>
            </div>
          )}

          {workLocation === "wfo" && (
            <>
              <div className="field">
                <label className={errors.wfoAddress ? "error-label" : ""}>
                  Address Line *
                </label>
                <input
                  className={errors.wfoAddress ? "error-input" : ""}
                  value={wfoAddress}
                  onChange={(e) => {
                    setWfoAddress(e.target.value);
                    setErrors((p) => ({ ...p, wfoAddress: false }));
                  }}
                />
              </div>

              <div className="field">
                <label className={errors.wfoCity ? "error-label" : ""}>City *</label>
                <input
                  className={errors.wfoCity ? "error-input" : ""}
                  value={wfoCity}
                  onChange={(e) => {
                    setWfoCity(e.target.value);
                    setErrors((p) => ({ ...p, wfoCity: false }));
                  }}
                />
              </div>

              <div className="field">
                <label className={errors.wfoPincode ? "error-label" : ""}>Pincode *</label>
                <input
                  className={errors.wfoPincode ? "error-input" : ""}
                  value={wfoPincode}
                  onChange={(e) => {
                    setWfoPincode(e.target.value);
                    setErrors((p) => ({ ...p, wfoPincode: false }));
                  }}
                />
              </div>
            </>
          )}

          {workLocation === "field" && (
            <>
              <div className="field">
                <label className={errors.fieldAddress ? "error-label" : ""}>Address Line *</label>
                <input
                  className={errors.fieldAddress ? "error-input" : ""}
                  value={fieldAddress}
                  onChange={(e) => {
                    setFieldAddress(e.target.value);
                    setErrors((p) => ({ ...p, fieldAddress: false }));
                  }}
                />
              </div>

              <div className="field">
                <label className={errors.fieldCity ? "error-label" : ""}>City *</label>
                <input
                  className={errors.fieldCity ? "error-input" : ""}
                  value={fieldCity}
                  onChange={(e) => {
                    setFieldCity(e.target.value);
                    setErrors((p) => ({ ...p, fieldCity: false }));
                  }}
                />
              </div>

              <div className="field">
                <label className={errors.fieldPincode ? "error-label" : ""}>Pincode *</label>
                <input
                  className={errors.fieldPincode ? "error-input" : ""}
                  value={fieldPincode}
                  onChange={(e) => {
                    setFieldPincode(e.target.value);
                    setErrors((p) => ({ ...p, fieldPincode: false }));
                  }}
                />
              </div>
            </>
          )}
        </div>

        {/* ---------------------------------------------------
            SALARY DETAILS
        ---------------------------------------------------- */}
        <div className="section">
          <h3 className={`section-title ${errors.salaryType ? "error-label" : ""}`}>
  Salary Details *
</h3>


          <div className={`radio-row ${errors.salaryType ? "error-label" : ""}`}>
            <label>
              <input
                type="radio"
                name="salary"
                onChange={() => {
                  setSalaryType("fixed");
                  setErrors((p) => ({ ...p, salaryType: false }));
                }}
              />
              Fixed Salary
            </label>

            <label>
              <input
                type="radio"
                name="salary"
                onChange={() => {
                  setSalaryType("incentive");
                  setErrors((p) => ({ ...p, salaryType: false }));
                }}
              />
              Incentive
            </label>

            <label>
              <input
                type="radio"
                name="salary"
                onChange={() => {
                  setSalaryType("both");
                  setErrors((p) => ({ ...p, salaryType: false }));
                }}
              />
              Fixed + Incentive
            </label>
          </div>

          {/* ------------------------------ FIXED ------------------------------ */}
          {salaryType === "fixed" && (
            <>
              <div className="grid">
                <div className="field">
                  <label className={errors.minSalary ? "error-label" : ""}>
                    Min Monthly Salary *
                  </label>
                  <input
                    type="number"
                    className={errors.minSalary ? "error-input" : ""}
                    value={minSalary}
                    onChange={(e) => {
                      const v = e.target.value;
                      setMinSalary(v);
                      setErrors((p) => ({ ...p, minSalary: false }));

                      if (v && Number(v) < 5000) {
  setErrors((p) => ({ ...p, minSalary: true }));
} else {
  setErrors((p) => ({ ...p, minSalary: false }));
}


                      if (maxSalary && v && Number(maxSalary) < Number(v)) {
                        setErrors((p) => ({ ...p, maxSalary: true }));
                      } else {
                        setErrors((p) => ({ ...p, maxSalary: false }));
                      }
                    }}
                  />
                </div>
                {minSalary && Number(minSalary) < 5000 && (
  <div className="error-text">Min salary should be greater than 5000</div>
)}


                <div className="field">
                  <label className={errors.maxSalary ? "error-label" : ""}>
                    Max Monthly Salary *
                  </label>
                  <input
                    type="number"
                    className={errors.maxSalary ? "error-input" : ""}
                    value={maxSalary}
                    onChange={(e) => {
                      const v = e.target.value;
                      setMaxSalary(v);
                      setErrors((p) => ({ ...p, maxSalary: false }));

                      if (minSalary && v && Number(v) < Number(minSalary)) {
                        setErrors((p) => ({ ...p, maxSalary: true }));
                      }
                    }}
                  />
                </div>
              </div>

              {minSalary && maxSalary && (
                <div className="preview-box">
                  Salary Range: ₹{minSalary} – ₹{maxSalary}
                </div>
              )}
            </>
          )}

          {/* ------------------------------ INCENTIVE ------------------------------ */}
          {salaryType === "incentive" && (
            <>
              <div className="grid">
                <div className="field">
                  <label className={errors.minIncentive ? "error-label" : ""}>
                    Min Incentive *
                  </label>
                  <input
                    type="number"
                    className={errors.minIncentive ? "error-input" : ""}
                    value={minIncentive}
                    onChange={(e) => {
                      const v = e.target.value;
                      setMinIncentive(v);
                      setErrors((p) => ({ ...p, minIncentive: false }));

                      if (maxIncentive && v && Number(maxIncentive) < Number(v)) {
                        setErrors((p) => ({ ...p, maxIncentive: true }));
                      }
                    }}
                  />
                </div>

                <div className="field">
                  <label className={errors.maxIncentive ? "error-label" : ""}>
                    Max Incentive *
                  </label>
                  <input
                    type="number"
                    className={errors.maxIncentive ? "error-input" : ""}
                    value={maxIncentive}
                    onChange={(e) => {
                      const v = e.target.value;
                      setMaxIncentive(v);
                      setErrors((p) => ({ ...p, maxIncentive: false }));

                      if (minIncentive && v && Number(v) < Number(minIncentive)) {
                        setErrors((p) => ({ ...p, maxIncentive: true }));
                      }
                    }}
                  />
                </div>
              </div>

              {minIncentive && maxIncentive && (
                <div className="preview-box">
                  Incentive Range: ₹{minIncentive} – ₹{maxIncentive}
                </div>
              )}
            </>
          )}

          {/* ------------------------------ BOTH ------------------------------ */}
          {salaryType === "both" && (
            <>
              <div className="grid">
                <div className="field">
                  <label className={errors.minSalary ? "error-label" : ""}>Min Monthly Salary *</label>
                  <input
                    type="number"
                    className={errors.minSalary ? "error-input" : ""}
                    value={minSalary}
                    onChange={(e) => {
                      const v = e.target.value;
                      setMinSalary(v);
                      setErrors((p) => ({ ...p, minSalary: false }));

                      if (v && Number(v) < 5000) {
  setErrors((p) => ({ ...p, minSalary: true }));
} else {
  setErrors((p) => ({ ...p, minSalary: false }));
}


                      if (maxSalary && v && Number(maxSalary) < Number(v)) {
                        setErrors((p) => ({ ...p, maxSalary: true }));
                      } else {
                        setErrors((p) => ({ ...p, maxSalary: false }));
                      }
                    }}
                  />
                </div>
                {minSalary && Number(minSalary) < 5000 && (
  <div className="error-text">Min salary should be greater than 5000</div>
)}


                <div className="field">
                  <label className={errors.maxSalary ? "error-label" : ""}>Max Monthly Salary *</label>
                  <input
                    type="number"
                    className={errors.maxSalary ? "error-input" : ""}
                    value={maxSalary}
                    onChange={(e) => {
                      const v = e.target.value;
                      setMaxSalary(v);
                      setErrors((p) => ({ ...p, maxSalary: false }));

                      if (minSalary && v && Number(v) < Number(minSalary)) {
                        setErrors((p) => ({ ...p, maxSalary: true }));
                      }
                    }}
                  />
                </div>

                <div className="field">
                  <label className={errors.minIncentive ? "error-label" : ""}>Min Incentive *</label>
                  <input
                    type="number"
                    className={errors.minIncentive ? "error-input" : ""}
                    value={minIncentive}
                    onChange={(e) => {
                      const v = e.target.value;
                      setMinIncentive(v);
                      setErrors((p) => ({ ...p, minIncentive: false }));

                      if (maxIncentive && v && Number(maxIncentive) < Number(v)) {
                        setErrors((p) => ({ ...p, maxIncentive: true }));
                      }
                    }}
                  />
                </div>

                <div className="field">
                  <label className={errors.maxIncentive ? "error-label" : ""}>Max Incentive *</label>
                  <input
                    type="number"
                    className={errors.maxIncentive ? "error-input" : ""}
                    value={maxIncentive}
                    onChange={(e) => {
                      const v = e.target.value;
                      setMaxIncentive(v);
                      setErrors((p) => ({ ...p, maxIncentive: false }));

                      if (minIncentive && v && Number(v) < Number(minIncentive)) {
                        setErrors((p) => ({ ...p, maxIncentive: true }));
                      }
                    }}
                  />
                </div>
              </div>

              {minSalary && maxSalary && minIncentive && maxIncentive && (
                <div className="preview-box">
                  Salary Range: ₹{minSalary} – ₹{maxSalary}<br />
                  Incentive Range: ₹{minIncentive} – ₹{maxIncentive}<br />
                  Total: ₹
                  {Number(minSalary) + Number(minIncentive)} – ₹
                  {Number(maxSalary) + Number(maxIncentive)}
                </div>
              )}
            </>
          )}
        </div>

        {/* ---------------------------------------------------
            ADDITIONAL PERKS
        ---------------------------------------------------- */}
        <div className="section">
          <h3 className="section-title">Additional Options</h3>
          <p style={{fontSize:"14px", marginBottom:"12px", color:"#475569"}}>
            Additional Perks (e.g., Health Insurance, PF)
          </p>

          <div className="chips">
            {presetPerks.map((perk) => (
              <span
                key={perk}
                className={`chip ${selectedPerks.includes(perk) ? "selected" : ""}`}
                onClick={() => togglePerk(perk)}
              >
                {selectedPerks.includes(perk) ? "✕" : "+"} {perk}
              </span>
            ))}
          </div>
          <div className="field" style={{ marginTop: "12px" }}>
            <label>Other Perks (optional, comma separated)</label>
            <input
            type="text"
            placeholder="e.g., Free snacks, Gym access"
            value={otherPerks}
            onChange={(e) => setOtherPerks(e.target.value)}
            />
          </div>
        </div>

        {/* ---------------------------------------------------
            JOINING FEE / DEPOSIT
        ---------------------------------------------------- */}
        <div className="section">
          <h3 className="section-title">
            Is there any joining fee or deposit required from the candidate? *
          </h3>

          <div style={{ marginTop: 8 }}>
  <ToggleSwitch
    value={joiningFee === "yes"}
    onChange={(v) => {
  setJoiningFee(v ? "yes" : "no");
  if (!v) {
    setJoiningAmount("");
    setJoiningComment("");
    setErrors((p) => ({
      ...p,
      joiningAmount: false,
      joiningComment: false
    }));
  }
}}

  />
</div>


          {joiningFee === "yes" && (
            <>
            <div className="field">
              <label className={errors.joiningAmount ? "error-label" : ""}>
                Enter Amount *
              </label>
              <input
                type="number"
                className={errors.joiningAmount ? "error-input" : ""}
                placeholder="e.g., 2000"
                value={joiningAmount}
                onChange={(e) => {
                  setJoiningAmount(e.target.value);
                  setErrors((p) => ({ ...p, joiningAmount: false }));
                }}
              />
            </div>
            <div className="field">
      <label className={errors.joiningComment ? "error-label" : ""}>
        Why is this fee taken? *
      </label>
      <input
        type="text"
        className={errors.joiningComment ? "error-input" : ""}
        placeholder="e.g., Security deposit, verification fee"
        value={joiningComment}
        onChange={(e) => {
          setJoiningComment(e.target.value);
          setErrors((p) => ({ ...p, joiningComment: false }));
        }}
      />
    </div>
  </>
            
          )}
        </div>

        {/* ---------------------------------------------------
            FOOTER BUTTONS
        ---------------------------------------------------- */}
        <div className="footer-actions">
          <button className="btn-secondary">Cancel</button>
          <button className="btn-primary" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}

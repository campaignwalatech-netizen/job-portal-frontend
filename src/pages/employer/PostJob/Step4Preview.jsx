import React from "react";
import {useEffect}  from "react";

export default function Step4Preview({ step1Data = {}, step2Data = {}, step3Data = {}, setStep }) {
    useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const fmtNumberWithCommas = (val) => {
    if (val === null || val === undefined || val === "") return "";
    const str = String(val);
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const fmtSalaryRange = (min, max, unitLabel = "Annual CTC") => {
    if (min == null && max == null) return "";
    if (min != null && max != null) {
      return `₹${fmtNumberWithCommas(min)} – ₹${fmtNumberWithCommas(max)} (${unitLabel})`;
    }
    const single = min != null ? min : max;
    return `₹${fmtNumberWithCommas(single)} (${unitLabel})`;
  };

  const safeJoin = (arr) => {
    if (!arr) return "";
    if (Array.isArray(arr)) return arr.filter(Boolean).join(", ");
    return String(arr);
  };
  const formatDateTime = (raw) => {
    if (!raw) return "";
    const tryDate = (input) => {
      if (!input) return null;
      if (input instanceof Date && !isNaN(input)) return input;
      if (typeof input === "object" && input.date) {
        const t = input.time || "00:00";
        const iso = `${input.date}T${t}`;
        const d = new Date(iso);
        return isNaN(d) ? null : d;
      }
      // if string
      const d = new Date(input);
      return isNaN(d) ? null : d;
    };

    const d = tryDate(raw);
    if (!d) {
      // fallback to raw string
      return String(raw);
    }

    const YYYY = d.getFullYear();
    const MM = String(d.getMonth() + 1).padStart(2, "0");
    const DD = String(d.getDate()).padStart(2, "0");

    let hh = d.getHours();
    const min = String(d.getMinutes()).padStart(2, "0");
    const ampm = hh >= 12 ? "PM" : "AM";
    if (hh === 0) hh = 12;
    else if (hh > 12) hh = hh - 12;
    const hhs = String(hh).padStart(2, "0");

    return `${YYYY}-${MM}-${DD} (${hhs}:${min} ${ampm})`;
  };

  const formatDateRange = (startRaw, endRaw) => {
    if (!startRaw && !endRaw) return "";
    const s = formatDateTime(startRaw) || "";
    const e = formatDateTime(endRaw) || "";
    if (s && e) return `${s} to ${e}`;
    return s || e;
  };

  // ------------------------------------------------------------
  // Data extraction (defensive - don't assume shape)
  // ------------------------------------------------------------
  // Step-1
  const companyName = step1Data.companyName || "";
  const jobTitle = step1Data.jobTitle || "";
  const roleDesc = step1Data.roleDesc || "";
  const jobType = (() => {
    // step1Data.jobType might be "fulltime" / "parttime" / "both"
    const jt = (step1Data.jobType || "").toString().toLowerCase();
    if (jt === "fulltime") return "Full-time";
    if (jt === "parttime") return "Part-time";
    if (jt === "both") return "Full-time / Part-time";
    return step1Data.jobType || "";
  })();
  const workLocation = (() => {
    const wl = (step1Data.workLocation || "").toString().toLowerCase();
    if (wl === "wfh") return "Work from Home";
    if (wl === "wfo") return "Work from Office";
    if (wl === "field") return "Field";
    return step1Data.workLocation || "";
  })();
  const addressToShow = (() => {
    // Show address if provided and not WFH; or if specific address field exists
    if (step1Data.address) return step1Data.address;
    if (workLocation === "Work from Office" || workLocation === "Field") {
      return `${step1Data.city || ""} ${step1Data.state || ""}`.trim();
    }
    return "";
  })();
  const salaryFormatted = (() => {
    // Try common shapes: step1Data.salaryMin & salaryMax OR salaryRange string
    if (step1Data.salaryMin != null || step1Data.salaryMax != null) {
      return fmtSalaryRange(step1Data.salaryMin, step1Data.salaryMax, step1Data.salaryUnit || "Annual CTC");
    }
    if (step1Data.salary) {
      // if it's like { min, max } or a string
      const s = step1Data.salary;
      if (typeof s === "object" && (s.min != null || s.max != null)) {
        return fmtSalaryRange(s.min, s.max, s.unit || "Annual CTC");
      }
      return String(s);
    }
    return "";
  })();
  const perks = Array.isArray(step1Data.perks) ? step1Data.perks : (step1Data.perks ? [step1Data.perks] : []);
  const joiningFee = step1Data.joiningFee === true || (String(step1Data.joiningFee || "").toLowerCase() === "yes");
  const joiningFeeAmount = step1Data.joiningFeeAmount || "";

  // Step-2
  const minEducation = safeJoin(step2Data.minimumEducation);
  const languagesKnown = safeJoin(step2Data.languagesKnown);
  const experience = (() => {
    if (step2Data.expMin != null || step2Data.expMax != null) {
      const a = step2Data.expMin != null ? step2Data.expMin : "";
      const b = step2Data.expMax != null ? step2Data.expMax : "";
      if (a !== "" && b !== "") return `${a} – ${b} Years`;
      if (a !== "") return `${a} Years`;
      return `${b} Years`;
    }
    if (step2Data.experience) return String(step2Data.experience);
    return "";
  })();
  const genderPreference = step2Data.genderPreference || "";
  const ageRange = (() => {
    if (step2Data.ageMin != null || step2Data.ageMax != null) {
      const a = step2Data.ageMin != null ? step2Data.ageMin : "";
      const b = step2Data.ageMax != null ? step2Data.ageMax : "";
      if (a !== "" && b !== "") return `${a} – ${b} Years`;
      if (a !== "") return `${a}+ Years`;
      return `${b} Years`;
    }
    return step2Data.ageRange || "";
  })();
  const skills = Array.isArray(step2Data.skills) ? step2Data.skills : (step2Data.skills ? [step2Data.skills] : []);
  const jobDescription = step2Data.jobDescription || "";

  // Step-3
  const interviewType = (step3Data.interviewType || "").toString().toLowerCase(); // "walk-in" or "none"
  const isWalkIn = interviewType === "walk-in" || interviewType === "walkin" || interviewType === "walk in";
  // interview address
  const interviewAddress = step3Data.interviewAddress || step3Data.address || "";
  // date/time fields - prefer interviewStart/interviewEnd, else startDate/startTime & endDate/endTime
  const interviewStart = step3Data.interviewStart || (step3Data.startDate ? { date: step3Data.startDate, time: step3Data.startTime } : null);
  const interviewEnd = step3Data.interviewEnd || (step3Data.endDate ? { date: step3Data.endDate, time: step3Data.endTime } : null);
  const interviewRange = formatDateRange(interviewStart, interviewEnd);
  const instructions = step3Data.instructions || "";
  const leadAccess = step3Data.contactAccess || step3Data.leadAccess || "";
  const whatsappAlerts = step3Data.whatsappAlerts === true || (String(step3Data.whatsappAlerts || "").toLowerCase() === "yes");
  const candidateContactPermission = (step3Data.contactPermission || "").toString().toLowerCase(); // 'self' | 'other' | 'no'
  const recruiter = step3Data.recruiter || {}; // { name, phone, email }

  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
  return (
    <div className="step-card-wrap">
      <style>{`
        /* --- INLINE STYLES COPIED FROM STEP-1 (exact spacing, typography, radio/chip styling, responsive breakpoints) --- */

        .step-card-wrap {
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          color: #111827;
          padding: 18px;
          box-sizing: border-box;
          max-width: 980px;
          margin: 0 auto;
        }

        .step-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .step-title {
          font-size: 20px;
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        .cards {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .card {
          background: #ffffff;
          border: 1px solid #e6e9ee;
          border-radius: 8px;
          padding: 18px;
          box-shadow: 0 1px 2px rgba(16,24,40,0.02);
        }

        .card-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .card-title {
          font-size: 16px;
          font-weight: 600;
        }

        .edit-btn {
          background: transparent;
          border: 1px solid #d1d5db;
          color: #111827;
          padding: 8px 10px;
          border-radius: 6px;
          font-size: 13px;
          cursor: pointer;
        }

        .row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 10px 0;
          border-top: 1px dashed #f1f5f9;
        }

        .row:first-of-type {
          border-top: none;
        }

        .row-key {
          width: 40%;
          font-size: 13px;
          color: #374151;
          padding-right: 12px;
          box-sizing: border-box;
        }

        .row-value {
          width: 60%;
          font-size: 14px;
          color: #111827;
        }

        /* Chips */
        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .chip {
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid #e5e7eb;
          font-size: 13px;
          background: #fbfbfd;
        }

        /* Buttons footer */
        .footer {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-top: 18px;
        }

        .btn-secondary {
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          background: #fff;
          cursor: pointer;
          font-weight: 600;
        }

        .btn-primary {
          padding: 10px 14px;
          border-radius: 8px;
          border: none;
          background: #0b63ff;
          color: #fff;
          cursor: pointer;
          font-weight: 600;
        }

        /* Typography & responsive adjustments */
        .muted {
          color: #6b7280;
        }

        @media (max-width: 720px) {
          .row {
            flex-direction: column;
            align-items: flex-start;
          }
          .row-key, .row-value {
            width: 100%;
          }
          .step-card-wrap {
            padding: 14px;
          }
        }

        /* radio and chip styling preserved even if not used */
        .radio {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 8px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          cursor: pointer;
        }

        .error {
          color: #ef4444;
          font-size: 13px;
          margin-top: 6px;
        }
      `}</style>

      <div className="step-header">
        <div>
          <div className="step-title">Step 4 — Preview Job Post</div>
          <div className="muted" style={{ fontSize: 13 }}>Review the details below. Edit any section if you need to change it.</div>
        </div>
        <div style={{ fontSize: 13, color: "#6b7280" }}>Step 4 of 5</div>
      </div>

      <div className="cards">
        {/* CARD 1 — Job Details Summary */}
        <div className="card" aria-label="Job Details Summary">
          <div className="card-title-row">
            <div className="card-title">Job Details Summary</div>
            <button className="edit-btn" onClick={() => setStep(1)}>Edit</button>
          </div>

          <div className="row">
            <div className="row-key">Hiring Company</div>
            <div className="row-value">{companyName || <span className="muted">—</span>}</div>
          </div>

          <div className="row">
            <div className="row-key">Job Title</div>
            <div className="row-value">{jobTitle || <span className="muted">—</span>}</div>
          </div>

          <div className="row">
            <div className="row-key">Job Role</div>
            <div className="row-value">{roleDesc || <span className="muted">—</span>}</div>
          </div>

          <div className="row">
            <div className="row-key">Job Type</div>
            <div className="row-value">{jobType || <span className="muted">—</span>}</div>
          </div>

          <div className="row">
            <div className="row-key">Work Location</div>
            <div className="row-value">{workLocation || <span className="muted">—</span>}</div>
          </div>

          <div className="row">
            <div className="row-key">Address</div>
            <div className="row-value">{addressToShow || <span className="muted">Not provided</span>}</div>
          </div>

          <div className="row">
            <div className="row-key">Salary</div>
            <div className="row-value">{salaryFormatted || <span className="muted">—</span>}</div>
          </div>

          <div className="row">
            <div className="row-key">Perks</div>
            <div className="row-value">
              {perks && perks.length > 0 ? (
                <div className="chips">
                  {perks.map((p, i) => (
                    <div className="chip" key={`perk-${i}`}>{p}</div>
                  ))}
                </div>
              ) : <span className="muted">No perks listed</span>}
            </div>
          </div>

          <div className="row">
            <div className="row-key">Joining Fee</div>
            <div className="row-value">
              {joiningFee ? (
                <div>
                  <div>Yes</div>
                  {joiningFeeAmount ? <div className="muted" style={{ marginTop: 6 }}>Amount: {joiningFeeAmount}</div> : null}
                </div>
              ) : <div>No</div>}
            </div>
          </div>
        </div>

        {/* CARD 2 — Basic Details Summary */}
        <div className="card" aria-label="Basic Details Summary">
          <div className="card-title-row">
            <div className="card-title">Basic Details Summary</div>
            <button className="edit-btn" onClick={() => setStep(2)}>Edit</button>
          </div>

          <div className="row">
            <div className="row-key">Minimum Education</div>
            <div className="row-value">{minEducation || <span className="muted">Any</span>}</div>
          </div>

          <div className="row">
            <div className="row-key">Languages Known</div>
            <div className="row-value">{languagesKnown || <span className="muted">Not specified</span>}</div>
          </div>

          <div className="row">
            <div className="row-key">Experience</div>
            <div className="row-value">{experience || <span className="muted">Fresher / Not specified</span>}</div>
          </div>

          <div className="row">
            <div className="row-key">Gender Preference</div>
            <div className="row-value">{genderPreference || <span className="muted">No preference</span>}</div>
          </div>

          <div className="row">
            <div className="row-key">Age Range</div>
            <div className="row-value">{ageRange || <span className="muted">Not specified</span>}</div>
          </div>

          <div className="row">
            <div className="row-key">Skills</div>
            <div className="row-value">
              {skills && skills.length > 0 ? (
                <div className="chips">
                  {skills.map((s, i) => <div className="chip" key={`skill-${i}`}>{s}</div>)}
                </div>
              ) : <span className="muted">No skills listed</span>}
            </div>
          </div>

          <div className="row">
            <div className="row-key">Job Description</div>
            <div className="row-value">{jobDescription ? <div style={{ whiteSpace: "pre-wrap" }}>{jobDescription}</div> : <span className="muted">—</span>}</div>
          </div>
        </div>

        {/* CARD 3 — Interview Details Summary */}
        <div className="card" aria-label="Interview Details Summary">
          <div className="card-title-row">
            <div className="card-title">Interview Details Summary</div>
            <button className="edit-btn" onClick={() => setStep(3)}>Edit</button>
          </div>

          <div className="row">
            <div className="row-key">Interview Type</div>
            <div className="row-value">{isWalkIn ? "Walk-in" : (interviewType ? interviewType : "None")}</div>
          </div>

          {isWalkIn ? (
            <>
              <div className="row">
                <div className="row-key">Address</div>
                <div className="row-value">{interviewAddress || <span className="muted">Not provided</span>}</div>
              </div>

              <div className="row">
                <div className="row-key">Date & Time</div>
                <div className="row-value">{interviewRange || <span className="muted">Not specified</span>}</div>
              </div>
            </>
          ) : null}

          <div className="row">
            <div className="row-key">Instructions</div>
            <div className="row-value">{instructions ? <div style={{ whiteSpace: "pre-wrap" }}>{instructions}</div> : <span className="muted">—</span>}</div>
          </div>

          <div className="row">
            <div className="row-key">Lead Access</div>
            <div className="row-value">{leadAccess || <span className="muted">—</span>}</div>
          </div>

          <div className="row">
            <div className="row-key">WhatsApp Alerts</div>
            <div className="row-value">{whatsappAlerts ? "Yes" : "No"}</div>
          </div>

          <div className="row">
            <div className="row-key">Candidate Contact Permission</div>
            <div className="row-value">
              {candidateContactPermission === "self" && <div>Allow candidates to call / WhatsApp</div>}
              {candidateContactPermission === "other" && (
                <div>
                  <div>Recruiter: {recruiter.name || <span className="muted">—</span>}</div>
                  <div className="muted" style={{ marginTop: 6 }}>Phone: {recruiter.phone || <span className="muted">—</span>}</div>
                  <div className="muted" style={{ marginTop: 4 }}>Email: {recruiter.email || <span className="muted">—</span>}</div>
                </div>
              )}
              {candidateContactPermission === "no" && <div>I will contact candidates myself</div>}
              {!["self", "other", "no"].includes(candidateContactPermission) && <div className="muted">Not specified</div>}
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <button className="btn-secondary" onClick={() => setStep(3)}>Previous</button>
        <div style={{ marginLeft: "auto" }}>
          <button className="btn-primary" onClick={() => setStep(5)}>Post Job &amp; Select Plan</button>
        </div>
      </div>
    </div>
  );
}

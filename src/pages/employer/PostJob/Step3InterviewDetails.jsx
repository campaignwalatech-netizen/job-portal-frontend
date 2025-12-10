import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import ToggleSwitch from "../../../components/ToggleSwitch";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Step3InterviewDetails({ step3Data, setStep3Data, setStep }) {
  const [walkinEnabled, setWalkinEnabled] = useState(false);
  const [addressMode, setAddressMode] = useState("manual");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [instructions, setInstructions] = useState("");

  const [commPref, setCommPref] = useState("self"); 
  const [recruiterName, setRecruiterName] = useState("");
  const [recruiterPhone, setRecruiterPhone] = useState("");
  const [recruiterEmail, setRecruiterEmail] = useState("");

  const [contactAccess, setContactAccess] = useState("all"); 
  const [whatsappAlerts, setWhatsappAlerts] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!step3Data) return;

    setWalkinEnabled(step3Data.walkinEnabled || false);
    setAddressMode(step3Data.addressMode || "manual");
    setStartDate(step3Data.startDate ? new Date(step3Data.startDate) : null);
    setEndDate(step3Data.endDate ? new Date(step3Data.endDate) : null);
    setStartTime(step3Data.startTime || "");
    setEndTime(step3Data.endTime || "");

    setAddress(step3Data.address || "");
    setCity(step3Data.city || "");
    setPincode(step3Data.pincode || "");
    setInstructions(step3Data.instructions || "");

    setCommPref(step3Data.commPref || "self");
    setRecruiterName(step3Data.recruiterName || "");
    setRecruiterPhone(step3Data.recruiterPhone || "");
    setRecruiterEmail(step3Data.recruiterEmail || "");

    setContactAccess(step3Data.contactAccess || "all");
    setWhatsappAlerts(Boolean(step3Data.whatsappAlerts));
  }, []);

  const todayAtMidnight = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const to12Hour = (time24) => {
    if (!time24) return "";
    const [hh, mm] = time24.split(":");
    if (hh === undefined) return time24;
    let h = Number(hh);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${String(h).padStart(2, "0")}:${mm} ${ampm}`;
  };

  const formatDate = (d) => {
    if (!d) return "";
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const formatSummaryDateTime = (sDate, sTime, eDate, eTime) => {
    if (!sDate || !sTime || !eDate || !eTime) return "";
    return `${formatDate(sDate)} (${to12Hour(sTime)}) to ${formatDate(eDate)} (${to12Hour(eTime)})`;
  };
  const emailValid = (em) => {
    return /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(em);
  };

  const validateAndNext = () => {
    const e = {};

    if (walkinEnabled) {
      if (!startDate) e.startDate = true;
      if (!endDate) e.endDate = true;
      if (startDate && startDate < todayAtMidnight()) e.startDate = true;
      if (startDate && endDate && endDate < startDate) e.endDate = true;

      if (!startTime) e.startTime = true;
      if (!endTime) e.endTime = true;

      if (addressMode === "manual") {
        if (!address) e.address = true;
        if (!city) e.city = true;
        if (!pincode) e.pincode = true;
      }

      if (instructions && instructions.length > 500) e.instructions = true;
    }

    if (!commPref) e.commPref = true;
    if (commPref === "other") {
      if (!recruiterName) e.recruiterName = true;
      if (!recruiterPhone) e.recruiterPhone = true;
      if (!recruiterEmail) e.recruiterEmail = true;
      if (recruiterEmail && !emailValid(recruiterEmail)) e.recruiterEmail = true;
    }

    if (!contactAccess) e.contactAccess = true;

    setErrors(e);
    if (Object.keys(e).length > 0) return alert("Please fix the highlighted fields.");

    setStep3Data({
      walkinEnabled,
      addressMode,
      startDate: startDate ? startDate.toISOString() : null,
      endDate: endDate ? endDate.toISOString() : null,
      startTime,
      endTime,
      address,
      city,
      pincode,
      instructions,

      commPref,
      recruiterName,
      recruiterPhone,
      recruiterEmail,

      contactAccess,
      whatsappAlerts,
    });

    setStep(4);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');

        .step-card { background:#fff; padding:30px; border-radius:12px; border:1px solid #E5E7EB; margin-top:24px; font-family:Inter; }

        .step-title { font-family:Poppins; font-size:22px; font-weight:700; }
        .step-subtitle { color:#6b7280; font-size:14px; margin-bottom:24px; }

        .section { margin-bottom:32px; }
        .section-title { font-family:Poppins; font-size:18px; font-weight:600; margin-bottom:14px; }

        .field { display:flex; flex-direction:column; margin-bottom:18px; }
        .field label { font-size:14px; font-weight:600; margin-bottom:6px; }
        .error-label { color:#dc2626 !important; }

        .error-input { border:2px solid #dc2626 !important; }

        .field input, .field select, .field textarea { padding:12px 14px; border-radius:10px; border:1px solid #D1D5DB; font-size:14px; background:#fff; font-family:Inter; }

        .radio-row { display:flex; gap:28px; flex-wrap:wrap; }

        .chips { display:flex; flex-wrap:wrap; gap:12px; }
        .chip { padding:8px 14px; background:#F1F5F9; border-radius:20px; font-size:14px; border:1px solid #E2E8F0; cursor:pointer; display:flex; align-items:center; gap:4px; }
        .chip.selected { background:#0b63f8; border-color:#0b63f8; color:white; }

        .grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }

        .preview-box { background:#f8fafc; padding:12px; border-radius:10px; border:1px solid #e2e8f0; margin-top:10px; font-size:14px; color:#334155; }

        .footer-actions { display:flex; justify-content:space-between; gap:14px; margin-top:24px; }

        .btn-secondary { padding:10px 16px; background:#fff; border-radius:10px; border:1px solid #D1D5DB; }
        .btn-primary { padding:10px 16px; background:#0b63f8; color:white; border-radius:10px; border:none; }

        .error-text { color:#dc2626; font-size:12px; margin-top:4px; font-weight:500; }

        .right-toggle { margin-left:auto; }

        /* Full-width tabs for address mode */
        .address-tabs {
          display:flex;
          gap:0;
          margin:20px 0 20px 0;
          border-radius:10px;
          overflow:hidden;
          border:1px solid #D1D5DB;
        }
        .address-tab {
          flex:1;
          padding:10px 12px;
          text-align:center;
          cursor:pointer;
          font-weight:600;
          font-family:Inter;
          color:#475569;
          background:white;
          border-right:1px solid #D1D5DB;
          user-select:none;
        }
        .address-tab:last-child { border-right: none; }
        .address-tab.active {
          background:#0b63f8;
          color:white;
          border-color:#0b63f8;
        }
        /* No hover effects (per request) */

        @media (max-width:900px) {
          .step-card { padding:20px; }
          .grid { grid-template-columns:1fr; gap:16px; }
          .radio-row { flex-direction:column; align-items:flex-start; gap:14px; }
          .footer-actions { flex-direction:column; gap:12px; }
          .btn-primary, .btn-secondary { width:100%; }
        }
      `}</style>

      <div className="step-card">
        <h2 className="step-title">Step 3 — Interview & Contact</h2>
        <p className="step-subtitle">Configure how candidates can visit and contact you.</p>

        {/* -------------------------- CARD 1 -------------------------- */}
        <div className="section">
          <h3 className="section-title">Walk-in Interview Details</h3>
          <p className="step-subtitle">Specify details if you offer walk-in interviews for candidates.</p>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#475569", fontSize: 14 }}>Enable Walk-in Interview</div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>Allow candidates to directly visit for interviews.</div>
            </div>
            <div className="right-toggle">
              <ToggleSwitch value={walkinEnabled} onChange={(v) => { setWalkinEnabled(v); setErrors((p) => ({ ...p, startDate: false, endDate: false })); }} />
            </div>
          </div>

          {walkinEnabled && (
            <>
              {/* Address Mode Tabs */}
              <div className="address-tabs" role="tablist" aria-label="Address mode tabs">
                <div
                  role="tab"
                  aria-selected={addressMode === "manual"}
                  className={`address-tab ${addressMode === "manual" ? "active" : ""}`}
                  onClick={() => setAddressMode("manual")}
                >
                  Enter Address Manually
                </div>

                <div
                  role="tab"
                  aria-selected={addressMode === "current"}
                  className={`address-tab ${addressMode === "current" ? "active" : ""}`}
                  onClick={() => setAddressMode("current")}
                >
                  Use Current Location
                </div>
              </div>

              <div className="grid" style={{ marginTop: 0 }}>
                <div className="field">
                  <label className={errors.startDate ? "error-label" : ""}>Start Date *</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(d) => { setStartDate(d); setErrors((p) => ({ ...p, startDate: false })); }}
                    minDate={todayAtMidnight()}
                    placeholderText="Select start date"
                    dateFormat="yyyy-MM-dd"
                  />
                  {errors.startDate && <div className="error-text">Start date is required and cannot be in the past.</div>}
                </div>

                <div className="field">
                  <label className={errors.endDate ? "error-label" : ""}>End Date *</label>
                  <DatePicker
                    selected={endDate}
                    onChange={(d) => { setEndDate(d); setErrors((p) => ({ ...p, endDate: false })); }}
                    minDate={startDate || todayAtMidnight()}
                    placeholderText="Select end date"
                    dateFormat="yyyy-MM-dd"
                  />
                  {errors.endDate && <div className="error-text">End date is required and cannot be before start date.</div>}
                </div>
              </div>

              <div className="grid" style={{ marginTop: 16 }}>
                <div className="field">
                  <label className={errors.startTime ? "error-label" : ""}>Start Time *</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => { setStartTime(e.target.value); setErrors((p) => ({ ...p, startTime: false })); }}
                  />
                  {errors.startTime && <div className="error-text">Start time required.</div>}
                </div>

                <div className="field">
                  <label className={errors.endTime ? "error-label" : ""}>End Time *</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => { setEndTime(e.target.value); setErrors((p) => ({ ...p, endTime: false })); }}
                  />
                  {errors.endTime && <div className="error-text">End time required.</div>}
                </div>
              </div>

              {/* Manual Address Mode */}
              {addressMode === "manual" && (
                <>
                  <div className="field" style={{ marginTop: 12 }}>
                    <label className={errors.address ? "error-label" : ""}>Address Line *</label>
                    <input
                      className={errors.address ? "error-input" : ""}
                      value={address}
                      onChange={(e) => { setAddress(e.target.value); setErrors((p) => ({ ...p, address: false })); }}
                    />
                  </div>

                  <div className="grid">
                    <div className="field">
                      <label className={errors.city ? "error-label" : ""}>City *</label>
                      <input
                        className={errors.city ? "error-input" : ""}
                        value={city}
                        onChange={(e) => { setCity(e.target.value); setErrors((p) => ({ ...p, city: false })); }}
                      />
                    </div>

                    <div className="field">
                      <label className={errors.pincode ? "error-label" : ""}>Pincode *</label>
                      <input
                        className={errors.pincode ? "error-input" : ""}
                        value={pincode}
                        onChange={(e) => { setPincode(e.target.value); setErrors((p) => ({ ...p, pincode: false })); }}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Current Location Mode: Dummy Map */}
              {addressMode === "current" && (
                <div style={{ marginTop: 12 }}>
                  <div
                    style={{
                      height: 200,
                      borderRadius: 10,
                      background: "#e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#475569",
                      fontWeight: 700,
                      border: "1px solid #D1D5DB",
                    }}
                  >
                    📍 Dummy Map Preview (Static) — current location will be captured here
                  </div>
                </div>
              )}

              <div className="field" style={{ marginTop: 12 }}>
                <label className={errors.instructions ? "error-label" : ""}>Instructions for Candidate (max 500 chars)</label>
                <textarea
                  rows={4}
                  maxLength={500}
                  className={errors.instructions ? "error-input" : ""}
                  value={instructions}
                  onChange={(e) => { setInstructions(e.target.value); setErrors((p) => ({ ...p, instructions: false })); }}
                />
                <small>{instructions.length}/500</small>
                {errors.instructions && <div className="error-text">Instructions must be at most 500 characters.</div>}

                {/* Summary preview */}
                {startDate && endDate && startTime && endTime && (
                  <div className="preview-box">{formatSummaryDateTime(startDate, startTime, endDate, endTime)}</div>
                )}
              </div>
            </>
          )}
        </div>

        {/* -------------------------- CARD 2 -------------------------- */}
        <div className="section">
          <h3 className="section-title">Communication Preferences</h3>
          <p className="step-subtitle">Do you want candidates to contact you via Call / Whatsapp after they apply?</p>

          <div className={`radio-row ${errors.commPref ? "error-label" : ""}`}>
            <label>
              <input
                type="radio"
                name="comm"
                checked={commPref === "self"}
                onChange={() => { setCommPref("self"); setErrors((p) => ({ ...p, commPref: false })); }}
              />
              Yes, to myself
            </label>

            <label>
              <input
                type="radio"
                name="comm"
                checked={commPref === "other"}
                onChange={() => { setCommPref("other"); setErrors((p) => ({ ...p, commPref: false })); }}
              />
              Yes, to other recruiter
            </label>

            <label>
              <input
                type="radio"
                name="comm"
                checked={commPref === "no"}
                onChange={() => { setCommPref("no"); setErrors((p) => ({ ...p, commPref: false })); }}
              />
              No, I will contact candidates first
            </label>
          </div>

          {commPref === "other" && (
            <>
              <div className="field" style={{ marginTop: 12 }}>
                <label className={errors.recruiterName ? "error-label" : ""}>Recruiter Name *</label>
                <input
                  className={errors.recruiterName ? "error-input" : ""}
                  value={recruiterName}
                  onChange={(e) => { setRecruiterName(e.target.value); setErrors((p) => ({ ...p, recruiterName: false })); }}
                />
              </div>

              <div className="grid">
                <div className="field">
                  <label className={errors.recruiterPhone ? "error-label" : ""}>Phone Number *</label>
                  <input
                    className={errors.recruiterPhone ? "error-input" : ""}
                    value={recruiterPhone}
                    onChange={(e) => { setRecruiterPhone(e.target.value); setErrors((p) => ({ ...p, recruiterPhone: false })); }}
                  />
                </div>

                <div className="field">
                  <label className={errors.recruiterEmail ? "error-label" : ""}>Email Address *</label>
                  <input
                    className={errors.recruiterEmail ? "error-input" : ""}
                    value={recruiterEmail}
                    onChange={(e) => { setRecruiterEmail(e.target.value); setErrors((p) => ({ ...p, recruiterEmail: false })); }}
                  />
                </div>
              </div>
            </>
          )}

        </div>

        {/* -------------------------- CARD 3 -------------------------- */}
        <div className="section">
          <h3 className="section-title">Candidate Contact & WhatsApp Alerts</h3>
          <p className="step-subtitle">Choose how candidates can access your contact information.</p>

          <div className={`radio-row ${errors.contactAccess ? "error-label" : ""}`}>
            <label>
              <input
                type="radio"
                name="contactAccess"
                checked={contactAccess === "all"}
                onChange={() => { setContactAccess("all"); setErrors((p) => ({ ...p, contactAccess: false })); }}
              />
              All candidates
            </label>

            <label>
              <input
                type="radio"
                name="contactAccess"
                checked={contactAccess === "matched"}
                onChange={() => { setContactAccess("matched"); setErrors((p) => ({ ...p, contactAccess: false })); }}
              />
              Only matched candidates (~30% of all candidates)
            </label>

            <label>
              <input
                type="radio"
                name="contactAccess"
                checked={contactAccess === "none"}
                onChange={() => { setContactAccess("none"); setErrors((p) => ({ ...p, contactAccess: false })); }}
              />
              None can contact me
            </label>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
            <div style={{ color: "#475569" }}>Do you want WhatsApp alerts from Naukri Chaahiye? <FaWhatsapp color="#25D366" size={18} /></div>
            <ToggleSwitch value={whatsappAlerts} onChange={(v) => setWhatsappAlerts(v)} />
          </div>

        </div>

        {/* -------------------------- CARD 4 -------------------------- */}
        <div className="section">
          <h3 className="section-title">Lead Access Information</h3>
          <p className="step-subtitle">Understand how candidate leads are managed and accessed based on your plan.</p>

          <div style={{ color: "#475569", lineHeight: 1.6 }}>
            As part of your current plan, you have access to a pool of qualified candidates who match your job requirements. These leads can be unlocked for direct contact using your available database credits. Ensure your plan is active to maximize your reach and connect with suitable talent effectively. You can review your credit balance in the "Credits & Usage" section.
          </div>
        </div>

        <div className="footer-actions">
          <button className="btn-secondary" onClick={() => setStep(2)}>Previous</button>
          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn-secondary" onClick={() => {
              setStep3Data({
                walkinEnabled,
                addressMode,
                startDate: startDate ? startDate.toISOString() : null,
                endDate: endDate ? endDate.toISOString() : null,
                startTime,
                endTime,
                address,
                city,
                pincode,
                instructions,

                commPref,
                recruiterName,
                recruiterPhone,
                recruiterEmail,

                contactAccess,
                whatsappAlerts,
              });
              alert('Saved');
            }}>Save</button>

            <button className="btn-primary" onClick={validateAndNext}>Next</button>
          </div>
        </div>
      </div>
    </>
  );
}

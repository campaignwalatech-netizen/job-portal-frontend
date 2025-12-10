import React, { useState, useRef, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import RichTextEditor from "../../../components/RichTextEditor";

export default function Step2BasicDetails({ step2Data, setStep2Data, setStep }) {
  const [education, setEducation] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [expMin, setExpMin] = useState("");
  const [expMax, setExpMax] = useState("");

  const [gender, setGender] = useState("any");
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [ageMinInput, setAgeMinInput] = useState("");
  const [ageMaxInput, setAgeMaxInput] = useState("");

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const skillRef = useRef();

  const [otherLangInput, setOtherLangInput] = useState("");

  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState({});

  const EDUCATION_OPTIONS = [
    "Anyone can apply",
    "10th pass",
    "12th pass",
    "Graduation",
    "Post Graduation",
    "UG Diploma",
    "PG diploma",
  ];

  const LANGUAGES_LIST = [
    "Hindi", "English", "Bengali", "Telugu", "Marathi", "Tamil", "Urdu",
    "Gujarati", "Kannada", "Malayalam", "Odia", "Punjabi", "Assamese",
    "Maithili", "Nepali", "Sindhi", "Konkani", "Kashmiri", "Sanskrit",
    "Arabic", "French", "German", "Spanish", "Chinese", "Japanese",
    "Russian", "Portuguese",
  ];

  const YEARS_OPTIONS = [...Array(11).keys()].map(String).concat([">10"]);
  const AGE_NUM = Array.from({ length: 23 }, (_, i) => 18 + i); 
  const AGE_OPTIONS = [...AGE_NUM.map(String), ">40"];

  useEffect(() => {
    if (!step2Data) return;

    setEducation(step2Data.education || []);
    setLanguages(step2Data.languages || []);
    setExpMin(step2Data.expMin || "");
    setExpMax(step2Data.expMax || "");

    setGender(step2Data.gender || "any");
    setAgeMin(step2Data.ageMin || "");
    setAgeMax(step2Data.ageMax || "");
    setAgeMinInput(step2Data.ageMinInput ?? (step2Data.ageMin || ""));
    setAgeMaxInput(step2Data.ageMaxInput ?? (step2Data.ageMax || ""));

    setSkills(step2Data.skills || []);
    setDescription(step2Data.description || "");

    setOtherLangInput(step2Data.otherLangInput || "");
  }, []);
  const toggleEducation = (item) => {
    let selected = [...education];
    const add = (val) => { if (!selected.includes(val)) selected.push(val); };
    const remove = (val) => { selected = selected.filter((x) => x !== val); };

    const hierarchy = ["10th pass", "12th pass", "Graduation", "Post Graduation"];

    if (!selected.includes(item)) {
      if (item === "Graduation") { add("10th pass"); add("12th pass"); }
      if (item === "Post Graduation") { add("10th pass"); add("12th pass"); add("Graduation"); }
      if (item === "PG diploma") { add("10th pass"); add("12th pass"); add("Graduation"); }
      if (item === "UG Diploma") { add("10th pass"); add("12th pass"); }
      add(item);
    } else {
      remove(item);
      const index = hierarchy.indexOf(item);
      if (index !== -1) {
        for (let i = index + 1; i < hierarchy.length; i++) remove(hierarchy[i]);
      }
    }

    setEducation([...selected]);
    setErrors((p) => ({ ...p, education: false }));
  };
  const toggleLanguage = (lang) => {
    if (languages.includes(lang)) {
      setLanguages(languages.filter((l) => l !== lang));
    } else {
      setLanguages([...languages, lang]);
    }
    setErrors((p) => ({ ...p, languages: false }));
  };

  const handleOtherLangEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const v = otherLangInput.trim();
      if (!v) return;
      if (!languages.includes(v)) setLanguages([...languages, v]);
      setOtherLangInput("");
    }
  };

  const addSkill = () => {
    const v = skillInput.trim();
    if (!v) return;
    if (skills.includes(v)) { setSkillInput(""); return; }
    setSkills([...skills, v]);
    setSkillInput("");
  };

  const removeSkill = (val) => {
    setSkills(skills.filter((s) => s !== val));
    skillRef.current?.focus();
  };

  const handleSkillKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); addSkill();
    } else if (e.key === "Backspace" && skillInput === "") {
      setSkills(skills.slice(0, -1));
    }
  };

  const computeAgeMax = () => {
    if (!ageMin) return [...AGE_NUM.map(String), ">40"];
    if (ageMin === ">40") return [">40"];
    const minVal = Number(ageMin);
    if (isNaN(minVal)) return [...AGE_NUM.map(String), ">40"];
    return [...AGE_NUM.filter((x) => x >= minVal).map(String), ">40"];
  };

  const computeExpMax = () => {
    if (!expMin) return YEARS_OPTIONS;
    if (expMin === ">10") return [">10"];
    const min = Number(expMin);
    if (isNaN(min)) return YEARS_OPTIONS;
    return YEARS_OPTIONS.filter((x) => {
      if (x === ">10") return true;
      return Number(x) >= min;
    });
  };

  const plainTextFromHtml = (html) => {
    if (!html) return "";
    const withoutTags = html.replace(/<[^>]*>/g, "");
    return withoutTags.replace(/&nbsp;|&#160;/g, " ").trim();
  };
  const validateAndNext = () => {
    const e = {};

    if (education.length === 0) e.education = true;
    if (languages.length === 0) e.languages = true;
    if (!expMin || !expMax) e.experience = true;

    if (expMin === ">10" && expMax !== ">10") e.experience = true;
    if (expMin !== ">10" && expMax !== ">10" && Number(expMin) > Number(expMax)) e.experience = true;

    const plain = plainTextFromHtml(description);
    if (plain.length < 20 || plain.length > 5000) e.description = true;

    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setStep2Data({
      education,
      languages,
      expMin,
      expMax,
      gender,
      ageMin,
      ageMax,
      ageMinInput,
      ageMaxInput,
      skills,
      description,
      otherLangInput,
    });

    setStep(3);
  };
  const filterAgeOptions = (options, input) => {
    const inputStr = (input ?? "").toString().trim();
    if (!inputStr) return options;
    if (inputStr === ">40" || (!isNaN(Number(inputStr)) && Number(inputStr) > 40)) return [">40"];
    return options.filter((o) => String(o).startsWith(inputStr));
  };

  const handleAgeMinKeyDown = (event) => {
    if (event.key !== "Enter") return;
    const matches = filterAgeOptions(AGE_OPTIONS, ageMinInput);
    if (matches.length === 0) return;
    event.preventDefault();
    const pick = matches[0];
    if (!isNaN(Number(pick)) && Number(pick) < 18) return;
    setAgeMin(String(pick));
    setAgeMinInput(String(pick));
    setAgeMax("");
  };

  const handleAgeMaxKeyDown = (event) => {
    if (event.key !== "Enter") return;
    const matches = filterAgeOptions(computeAgeMax(), ageMaxInput);
    if (matches.length === 0) return;
    event.preventDefault();
    const pick = matches[0];
    if (!isNaN(Number(pick)) && Number(pick) < 18) return;
    setAgeMax(String(pick));
    setAgeMaxInput(String(pick));
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

        .field input, .field select, .field textarea {
          padding:12px 14px;
          border-radius:10px;
          border:1px solid #D1D5DB;
          font-size:14px;
          background:#fff;
          font-family:Inter;
        }

        .radio-row { display:flex; gap:28px; flex-wrap:wrap; }

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
        .chip.selected { background:#0b63f8; border-color:#0b63f8; color:white; }

        .toggle-row { display:flex; gap:14px; }

        .grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }

        .preview-box {
          background:#f8fafc;
          padding:12px;
          border-radius:10px;
          border:1px solid #e2e8f0;
          margin-top:10px;
          font-size:14px;
          color:#334155;
        }

        .footer-actions { display:flex; justify-content:space-between; gap:14px; margin-top:24px; }

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

        .error-text { color:#dc2626; font-size:12px; margin-top:4px; font-weight:500; }

        /* MUI Autocomplete tweaks to match Step-1 input (Option A exact match) */
        .mui-autocomplete-root .MuiOutlinedInput-root {
          border-radius: 10px;
          padding: 0;
          background: #fff;
        }
        .mui-autocomplete-input {
          padding: 12px 14px !important;
          font-size: 14px;
          font-family: Inter;
        }

        @media (max-width:900px) {
          .step-card { padding:20px; }
          .grid { grid-template-columns:1fr; gap:16px; }
          .radio-row { flex-direction:column; align-items:flex-start; gap:14px; }
          .footer-actions { flex-direction:column; gap:12px; }
          .btn-primary, .btn-secondary { width:100%; }
        }
      `}</style>

      <div className="step-card">
        <h2 className="step-title">Candidate Requirements</h2>
        <p className="step-subtitle">Set the essential criteria for your ideal candidates.</p>

        {/* -------------------------- CARD 1 -------------------------- */}
        <div className="section">
          <h3 className="section-title">Minimum Candidate Requirements</h3>
          <p className="step-subtitle" style={{ marginTop: "-6px", marginBottom: "18px" }}>
            Set the essential criteria for your ideal candidates.
          </p>

          {/* Education */}
          <div className="field">
            <label className={errors.education ? "error-label" : ""}>Minimum Education *</label>

            <div className="chips">
              {EDUCATION_OPTIONS.map((e) => (
                <span
                  key={e}
                  className={`chip ${education.includes(e) ? "selected" : ""}`}
                  onClick={() => toggleEducation(e)}
                >
                  {education.includes(e) ? "✕" : "+"} {e}
                </span>
              ))}
            </div>

            {errors.education && (
              <div className="error-text">Select at least one education level.</div>
            )}
          </div>

          {/* Languages */}
          <div className="field">
            <label className={errors.languages ? "error-label" : ""}>Languages Known *</label>

            <div className="chips">
              {LANGUAGES_LIST.map((lang) => (
                <span
                  key={lang}
                  className={`chip ${languages.includes(lang) ? "selected" : ""}`}
                  onClick={() => toggleLanguage(lang)}
                >
                  {languages.includes(lang) ? "✕" : "+"} {lang}
                </span>
              ))}
            </div>

            {/* Other language input - always visible */}
            <input
              placeholder="Other language (optional). Type & press Enter"
              style={{ marginTop: "12px" }}
              value={otherLangInput}
              onChange={(e) => setOtherLangInput(e.target.value)}
              onKeyDown={handleOtherLangEnter}
            />

            {/* Selected languages shown as chips */}
            <div className="chips" style={{ marginTop: "10px" }}>
              {languages.map((lang) => (
                <span
                  key={lang}
                  className="chip selected"
                  onClick={() => setLanguages(languages.filter((l) => l !== lang))}
                >
                  ✕ {lang}
                </span>
              ))}
            </div>

            {errors.languages && (
              <div className="error-text">Select at least one language.</div>
            )}
          </div>

          {/* Experience */}
          <div className="grid">
            <div className="field">
              <label className={errors.experience ? "error-label" : ""}>Minimum Experience *</label>
              <select
                className={errors.experience ? "error-input" : ""}
                value={expMin}
                onChange={(e) => {
                  const v = e.target.value;
                  setExpMin(v);
                  setErrors((p) => ({ ...p, experience: false }));
                  if (v === ">10") setExpMax(">10");
                  else if (expMax === ">10") setExpMax("");
                }}
              >
                <option value="">Select</option>
                {YEARS_OPTIONS.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label className={errors.experience ? "error-label" : ""}>Maximum Experience *</label>
              <select
                className={errors.experience ? "error-input" : ""}
                value={expMax}
                onChange={(e) => {
                  setExpMax(e.target.value);
                  setErrors((p) => ({ ...p, experience: false }));
                }}
              >
                <option value="">Select</option>
                {computeExpMax().map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </div>
          </div>

          {expMin === "0" && expMax === "0" && (
            <span
              style={{
                display: "inline-block",
                background: "#e8f0fe",
                color: "#0b63f8",
                border: "1px solid #c7d7fe",
                padding: "6px 12px",
                borderRadius: "16px",
                fontSize: "13px",
                marginTop: "8px",
                fontWeight: 600
              }}
            >
              Fresher
            </span>
          )}

          {expMin === ">10" && expMax === ">10" && (
            <span
              style={{
                display: "inline-block",
                background: "#fef3c7",
                color: "#b45309",
                border: "1px solid #fde68a",
                padding: "6px 12px",
                borderRadius: "16px",
                fontSize: "13px",
                marginTop: "8px",
                fontWeight: 600
              }}
            >
              Over 10 Years Experience Required
            </span>
          )}

          {errors.experience && (
            <div className="error-text">Enter valid experience range.</div>
          )}
        </div>

        {/* -------------------------- CARD 2 -------------------------- */}
        <div className="section">
          <h3 className="section-title">Optional Candidate Filters</h3>
          <p className="step-subtitle" style={{ marginTop: "-6px", marginBottom: "18px" }}>
            Further refine your candidate search with additional preferences.
          </p>

          {/* Gender */}
          <div className="field">
            <label>Gender</label>
            <div className="radio-row">
              <label>
                <input type="radio" name="gender" checked={gender === "male"} onChange={() => setGender("male")} /> Male
              </label>
              <label>
                <input type="radio" name="gender" checked={gender === "female"} onChange={() => setGender("female")} /> Female
              </label>
              <label>
                <input type="radio" name="gender" checked={gender === "any"} onChange={() => setGender("any")} /> Any
              </label>
            </div>
          </div>

          {/* Age (single Autocomplete fields with typing + dropdown + Enter) */}
          <div className="grid">
            {/* Min Age */}
            <div className="field">
              <label>Min Age</label>

              <Autocomplete
                className="mui-autocomplete-root"
                options={AGE_OPTIONS}
                freeSolo
                value={ageMin === "" ? null : ageMin}
                inputValue={ageMinInput}
                onInputChange={(e, newInput, reason) => {
                  if (reason === "clear") {
                    setAgeMin("");
                    setAgeMinInput("");
                    setAgeMax("");
                    return;
                  }
                  setAgeMinInput(newInput ?? "");
                }}
                onChange={(e, newVal) => {
                  if (newVal === null) {
                    setAgeMin("");
                    setAgeMinInput("");
                    setAgeMax("");
                    return;
                  }
                  const pick = String(newVal);
                  if (!isNaN(Number(pick)) && Number(pick) < 18) return;
                  setAgeMin(pick);
                  setAgeMinInput(pick);
                  setAgeMax("");
                }}
                openOnFocus
                clearOnBlur={false}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Type or select age"
                    InputProps={{
                      ...params.InputProps,
                      className: "mui-autocomplete-input",
                      onKeyDown: handleAgeMinKeyDown,
                    }}
                    variant="outlined"
                  />
                )}
                getOptionLabel={(opt) => String(opt)}
                filterOptions={(options, state) => filterAgeOptions(options, state.inputValue)}
              />
            </div>

            {/* Max Age */}
            <div className="field">
              <label>Max Age</label>

              <Autocomplete
                className="mui-autocomplete-root"
                options={computeAgeMax()}
                freeSolo
                value={ageMax === "" ? null : ageMax}
                inputValue={ageMaxInput}
                onInputChange={(e, newInput, reason) => {
                  if (reason === "clear") {
                    setAgeMax("");
                    setAgeMaxInput("");
                    return;
                  }
                  setAgeMaxInput(newInput ?? "");
                }}
                onChange={(e, newVal) => {
                  if (newVal === null) {
                    setAgeMax("");
                    setAgeMaxInput("");
                    return;
                  }
                  const pick = String(newVal);
                  if (!isNaN(Number(pick)) && Number(pick) < 18) return;
                  setAgeMax(pick);
                  setAgeMaxInput(pick);
                }}
                openOnFocus
                clearOnBlur={false}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Type or select age"
                    InputProps={{
                      ...params.InputProps,
                      className: "mui-autocomplete-input",
                      onKeyDown: handleAgeMaxKeyDown,
                    }}
                    variant="outlined"
                  />
                )}
                getOptionLabel={(opt) => String(opt)}
                filterOptions={(options, state) => filterAgeOptions(options, state.inputValue)}
              />
            </div>
          </div>

          {/* Skills */}
          <div className="field">
            <label>Skills</label>
            <input
              ref={skillRef}
              placeholder="Type a skill and press Enter"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKey}
            />
            <div className="chips" style={{ marginTop: "10px" }}>
              {skills.map((s) => (
                <span key={s} className="chip selected" onClick={() => removeSkill(s)}>✕ {s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* -------------------------- CARD 3 -------------------------- */}
        <div className="section">
          <h3 className="section-title">Detailed Job Description</h3>
          <p className="step-subtitle" style={{ marginTop: "-6px", marginBottom: "18px" }}>
            Provide a comprehensive description of the role and responsibilities.
          </p>

          <div className="field">
            <label className={errors.description ? "error-label" : ""}>
              Description (20–5000 chars) *
            </label>

            <RichTextEditor
              value={description}
              onChange={(val) => {
                setDescription(val);
                setErrors((p) => ({ ...p, description: false }));
              }}
            />

            {errors.description && (
              <div className="error-text">Description must be between 20 and 5000 characters.</div>
            )}
          </div>
        </div>

        {/* -------------------------- FOOTER -------------------------- */}
        <div className="footer-actions">
          <button className="btn-secondary" onClick={() => setStep(1)}>Previous</button>
          <button className="btn-primary" onClick={validateAndNext}>Next</button>
        </div>
      </div>
    </>
  );
}

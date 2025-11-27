import React from "react";

export default function Step2BasicDetails({ form, update, next, back }) {
  return (
    <div>
      <h2>Basic Details</h2>

      <div className="section-title">Minimum Candidate Requirements</div>

      <div className="field-row">
        <div className="field">
          <label>Minimum Education</label>
          <select
            value={form.minEducation}
            onChange={(e) => update({ minEducation: e.target.value })}
          >
            <option value="">Select Qualification</option>
            <option>Bachelor's</option>
            <option>Master's</option>
            <option>Diploma</option>
          </select>
        </div>

        <div className="field">
          <label>Languages</label>
          <input
            value={form.languages.join(", ")}
            onChange={(e) =>
              update({ languages: e.target.value.split(",").map((x) => x.trim()) })
            }
            placeholder="English, Hindi"
          />
        </div>

        <div className="field">
          <label>Years of Experience</label>
          <div className="field-row">
            <input
              value={form.minExp}
              onChange={(e) => update({ minExp: e.target.value })}
              placeholder="Min Exp"
            />
            <input
              value={form.maxExp}
              onChange={(e) => update({ maxExp: e.target.value })}
              placeholder="Max Exp"
            />
          </div>
        </div>
      </div>

      <div className="section-title">Optional Candidate Filters</div>

      <div className="field-row">
        <div className="field">
          <label>Gender</label>
          <select
            value={form.gender}
            onChange={(e) => update({ gender: e.target.value })}
          >
            <option>Male</option>
            <option>Female</option>
            <option>Any</option>
          </select>
        </div>

        <div className="field">
          <label>Age</label>
          <div className="field-row">
            <input
              value={form.minAge}
              onChange={(e) => update({ minAge: e.target.value })}
              placeholder="Min Age"
            />
            <input
              value={form.maxAge}
              onChange={(e) => update({ maxAge: e.target.value })}
              placeholder="Max Age"
            />
          </div>
        </div>
      </div>

      <div className="field">
        <label>Skills</label>
        <input
          value={form.skills.join(", ")}
          onChange={(e) =>
            update({ skills: e.target.value.split(",").map((x) => x.trim()) })
          }
          placeholder="React, Node, SQL"
        />
      </div>

      <div className="field">
        <label>Detailed Job Description</label>
        <textarea
          value={form.detailedDescription}
          onChange={(e) => update({ detailedDescription: e.target.value })}
          placeholder="Describe the job responsibilities..."
        />
      </div>

      <div className="footer-btns">
        <button onClick={back}>Previous</button>
        <button onClick={next} className="btn-primary">Next</button>
      </div>
    </div>
  );
}

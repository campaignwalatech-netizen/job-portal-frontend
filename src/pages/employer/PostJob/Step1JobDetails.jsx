import React from "react";

export default function Step1JobDetails({ form, update, next }) {
  return (
    <>
      {/* PAGE TITLE */}
      <h1 className="pj-page-title">Post a New Job</h1>
      <p className="pj-page-desc">Fill in the details for your new job opening.</p>

      {/* JOB DETAILS CARD */}
      <div className="pj-card">

        <h2 className="pj-section-title">Job Details</h2>
        <p className="pj-section-subtitle">
          Provide the essential information about the job opening.
        </p>

        {/* Company & Role */}
        <div className="pj-subsection-title">Company & Role</div>

        <div className="pj-grid">
          <div className="pj-field col-12">
            <label>Hiring Company Name</label>
            <input
              className="pj-input"
              value={form.companyName}
              onChange={(e) => update({ companyName: e.target.value })}
              placeholder="e.g., Acme Corp"
            />
          </div>

          <div className="pj-field col-12">
            <label>Job Title/Designation</label>
            <input
              className="pj-input"
              value={form.jobTitle}
              onChange={(e) => update({ jobTitle: e.target.value })}
              placeholder="e.g., Software Engineer"
            />
          </div>

          <div className="pj-field col-12">
            <label>Specific Job Role Description</label>
            <input
              className="pj-input"
              value={form.jobDescription}
              onChange={(e) => update({ jobDescription: e.target.value })}
              placeholder="e.g., Develop and maintain web applications"
            />
          </div>
        </div>

        {/* Job Type */}
        <div className="pj-subsection-title">Job Type</div>

        <div className="pj-radio-row">
          <label className="pj-radio">
            <input
              type="radio"
              checked={form.jobType === "Fulltime"}
              onChange={() => update({ jobType: "Fulltime" })}
            />
            Full-time
          </label>

          <label className="pj-radio">
            <input
              type="radio"
              checked={form.jobType === "Parttime"}
              onChange={() => update({ jobType: "Parttime" })}
            />
            Part-time
          </label>

          <label className="pj-radio">
            <input
              type="radio"
              checked={form.jobType === "Both"}
              onChange={() => update({ jobType: "Both" })}
            />
            Both
          </label>
        </div>

        {/* Work Location */}
        <div className="pj-subsection-title">Work Location</div>

        <div className="pj-radio-row">
          <label className="pj-radio">
            <input
              type="radio"
              checked={form.locationType === "WFH"}
              onChange={() => update({ locationType: "WFH" })}
            />
            Work From Home
          </label>

          <label className="pj-radio">
            <input
              type="radio"
              checked={form.locationType === "Office"}
              onChange={() => update({ locationType: "Office" })}
            />
            Work From Office
          </label>

          <label className="pj-radio">
            <input
              type="radio"
              checked={form.locationType === "Field"}
              onChange={() => update({ locationType: "Field" })}
            />
            Field Work
          </label>
        </div>

        <div className="pj-grid">
          <div className="pj-field col-6">
            <label>Select Region/City</label>
            <select
              className="pj-select"
              value={form.location}
              onChange={(e) => update({ location: e.target.value })}
            >
              <option value="">Select Region/City</option>
              <option>Mumbai</option>
              <option>Bangalore</option>
              <option>Hyderabad</option>
            </select>
          </div>
        </div>

        {/* Salary Details */}
        <div className="pj-subsection-title">Salary Details</div>

        <div className="pj-radio-row">
          <label className="pj-radio">
            <input type="radio" name="s" />
            Fixed Salary
          </label>
          <label className="pj-radio">
            <input type="radio" name="s" />
            Incentive
          </label>
          <label className="pj-radio">
            <input type="radio" name="s" />
            Fixed + Incentive
          </label>
        </div>

        <div className="pj-grid">
          <div className="pj-field col-3">
            <label>Min Salary (INR)</label>
            <input
              className="pj-input"
              value={form.minSalary}
              onChange={(e) => update({ minSalary: e.target.value })}
              placeholder="e.g., 20000"
            />
          </div>

          <div className="pj-field col-3">
            <label>Max Salary (INR)</label>
            <input
              className="pj-input"
              value={form.maxSalary}
              onChange={(e) => update({ maxSalary: e.target.value })}
              placeholder="e.g., 40000"
            />
          </div>
        </div>

        {/* Additional Options */}
        <div className="pj-subsection-title">Additional Options</div>

        <label className="pj-switch-row">
          <span>Additional Perks (e.g., Health Insurance, PF)</span>
          <input type="checkbox" />
        </label>

        <div className="pj-chips">
          <span className="pj-chip">Laptop</span>
          <span className="pj-chip">Flexible Working Hours</span>
          <span className="pj-chip">Weekly Payout</span>
          <span className="pj-chip">Overtime Pay</span>
          <span className="pj-chip">Joining Bonus</span>
        </div>

        <div className="pj-footer">
          <button className="btn-ghost">Cancel</button>
          <button className="btn-primary" onClick={next}>Next</button>
        </div>

      </div>
    </>
  );
}

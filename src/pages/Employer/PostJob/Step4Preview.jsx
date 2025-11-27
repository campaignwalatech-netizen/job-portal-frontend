import React from "react";

export default function Step4Preview({ form, back, next }) {
  return (
    <div>
      <h2>Preview Job Post</h2>

      <div className="preview-box">
        <h3>Job Details Summary</h3>
        <p><strong>Company:</strong> {form.companyName}</p>
        <p><strong>Title:</strong> {form.jobTitle}</p>
        <p><strong>Location:</strong> {form.location}</p>
        <p><strong>Salary:</strong> {form.minSalary} - {form.maxSalary}</p>
      </div>

      <div className="preview-box">
        <h3>Basic Details Summary</h3>
        <p><strong>Min Education:</strong> {form.minEducation}</p>
        <p><strong>Languages:</strong> {form.languages.join(", ")}</p>
        <p><strong>Skills:</strong> {form.skills.join(", ")}</p>
      </div>

      <div className="preview-box">
        <h3>Interview Summary</h3>
        <p><strong>Walk-In:</strong> {form.walkIn ? "Yes" : "No"}</p>
        <p><strong>Recruiter:</strong> {form.contactPerson}</p>
        <p><strong>Phone:</strong> {form.phone}</p>
      </div>

      <div className="footer-btns">
        <button onClick={back}>Previous</button>
        <button onClick={next} className="btn-primary">Next</button>
      </div>
    </div>
  );
}

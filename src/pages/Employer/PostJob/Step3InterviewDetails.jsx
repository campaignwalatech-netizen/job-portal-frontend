import React from "react";

export default function Step3InterviewDetails({ form, update, next, back }) {
  return (
    <div>
      <h2>Interview Details</h2>

      <div className="field">
        <label>
          <input
            type="checkbox"
            checked={form.walkIn}
            onChange={(e) => update({ walkIn: e.target.checked })}
          />{" "}
          Enable Walk-in Interview
        </label>
      </div>

      <div className="field">
        <label>Recruiter Name</label>
        <input
          value={form.contactPerson}
          onChange={(e) => update({ contactPerson: e.target.value })}
          placeholder="Your name"
        />
      </div>

      <div className="field">
        <label>Phone Number</label>
        <input
          value={form.phone}
          onChange={(e) => update({ phone: e.target.value })}
          placeholder="+91 98765 43210"
        />
      </div>

      <div className="field">
        <label>Email</label>
        <input
          value={form.email}
          onChange={(e) => update({ email: e.target.value })}
          placeholder="name@mail.com"
        />
      </div>

      <div className="section-title">Candidate Contact & WhatsApp Alerts</div>

      <div className="field">
        <label>Who can contact you?</label>
        <select
          value={form.candidateVisibility}
          onChange={(e) => update({ candidateVisibility: e.target.value })}
        >
          <option value="all">All Candidates</option>
          <option value="matched">Only Matched Candidates</option>
        </select>
      </div>

      <div className="field">
        <label>
          <input
            type="checkbox"
            checked={form.whatsappAlerts}
            onChange={(e) => update({ whatsappAlerts: e.target.checked })}
          />{" "}
          WhatsApp Alerts
        </label>
      </div>

      <div className="footer-btns">
        <button onClick={back}>Previous</button>
        <button onClick={next} className="btn-primary">Next</button>
      </div>
    </div>
  );
}

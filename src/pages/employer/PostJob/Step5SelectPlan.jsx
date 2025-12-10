import React, { useEffect, useState } from "react";

export default function Step5SelectPlan({ setStep, formData }) {
  const plans = [
    {
      id: "free",
      name: "Free Posting",
      price: 0,
      subtitle: "Get started with free job posts!",
      features: ["3 Job Posts", "7-Day Validity", "Basic Candidate Search"],
    },
    {
      id: "basic",
      name: "Basic Plan",
      price: 999,
      subtitle: "Ideal for small businesses.",
      features: ["10 Job Posts", "30-Day Validity", "Advanced Candidate Search", "Email Support"],
    },
    {
      id: "standard",
      name: "Standard Plan",
      price: 2499,
      subtitle: "Popular choice for growing companies.",
      features: ["25 Job Posts", "60-Day Validity", "Premium Candidate Search", "Phone Support", "Employer Branding"],
    },
    {
      id: "premium",
      name: "Premium Plan",
      price: 4999,
      subtitle: "For high-volume hiring needs.",
      features: [
        "50 Job Posts",
        "90-Day Validity",
        "AI-Powered Matching",
        "Dedicated Account Manager",
        "Priority Support",
      ],
    },
  ];

  const [selectedPlan, setSelectedPlan] = useState("free");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const current = plans.find((p) => p.id === selectedPlan);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');

        .page-title {
          font-family:Poppins;
          font-size:24px;
          font-weight:700;
          margin-top:20px;
          margin-bottom:20px;
        }

        .plan-grid {
          display:grid;
          grid-template-columns: repeat(4, 1fr);
          gap:20px;
          margin-bottom:32px;
        }

        .plan-card {
          background:#fff;
          border:1px solid #E5E7EB;
          padding:24px;
          border-radius:12px;
          font-family:Inter;
          display:flex;
          flex-direction:column;
          justify-content:space-between;
        }

        .plan-name {
          font-size:18px;
          font-family:Poppins;
          font-weight:600;
          margin-bottom:6px;
        }

        .plan-price {
          font-size:20px;
          font-weight:700;
          color:#0b63f8;
          margin-bottom:6px;
        }

        .plan-subtitle {
          font-size:14px;
          color:#475569;
          margin-bottom:14px;
        }

        .feature-list {
          margin-bottom:20px;
        }

        .feature-item {
          font-size:14px;
          color:#1e293b;
          margin-bottom:8px;
          display:flex;
          align-items:center;
          gap:6px;
        }

        .preview-card {
          background:#fff;
          border-radius:12px;
          border:1px solid #E5E7EB;
          padding:24px;
          margin-bottom:32px;
          font-family:Inter;
        }

        .summary-row {
          display:flex;
          justify-content:space-between;
          margin-bottom:8px;
          font-size:14px;
        }

        .summary-label {
          font-weight:600;
          color:#475569;
        }

        .summary-value {
          font-weight:600;
          color:#1e293b;
        }

        .btn-primary {
          padding:12px 16px;
          background:#0b63f8;
          color:white;
          border:none;
          border-radius:10px;
          width:100%;
          font-size:15px;
        }
        .btn-secondary {
          padding:10px 16px;
          background:#fff;
          border:1px solid #D1D5DB;
          border-radius:10px;
          width:100%;
        }

        @media (max-width:900px){
          .plan-grid {
            grid-template-columns:1fr;
          }
        }
      `}</style>

      {/* ----------------------------------------- */}
      {/* PAGE TITLE */}
      {/* ----------------------------------------- */}
      <h2 className="page-title">Finalize Your Job Post</h2>

      {/* ----------------------------------------- */}
      {/* CHOOSE PLAN */}
      {/* ----------------------------------------- */}
      <h3 className="section-title" style={{ fontFamily: "Poppins", marginBottom: 16 }}>
        Choose Your Job Posting Plan
      </h3>

      <div className="plan-grid">
        {plans.map((p) => (
          <div key={p.id} className="plan-card">
            <div>
              <div className="plan-name">{p.name}</div>
              <div className="plan-price">
                {p.price === 0 ? "Free" : `₹${p.price}`}
              </div>
              <div className="plan-subtitle">{p.subtitle}</div>

              <div className="feature-list">
                {p.features.map((f, i) => (
                  <div key={i} className="feature-item">✔ {f}</div>
                ))}
              </div>
            </div>

            {selectedPlan === p.id ? (
              <button className="btn-primary">Selected</button>
            ) : (
              <button className="btn-secondary" onClick={() => setSelectedPlan(p.id)}>
                Select Plan
              </button>
            )}
          </div>
        ))}
      </div>

      {/* ----------------------------------------- */}
      {/* ORDER SUMMARY */}
      {/* ----------------------------------------- */}
      <h3 className="section-title" style={{ fontFamily: "Poppins", marginBottom: 16 }}>
        Order Summary
      </h3>

      <div className="preview-card">
        <div className="summary-row">
          <span className="summary-label">Selected Plan:</span>
          <span className="summary-value">{current.name}</span>
        </div>

        <div className="summary-row">
          <span className="summary-label">Total Amount:</span>
          <span className="summary-value">
            {current.price === 0 ? "Free" : `₹${current.price}`}
          </span>
        </div>

        <button
          className="btn-primary"
          style={{ marginTop: 14 }}
          onClick={() => {
            if (current.price === 0) {
              alert("Job Posted Successfully (Free Plan)");
            } else {
              alert("Redirect to Payment Gateway");
            }
          }}
        >
          {current.price === 0
            ? "Post Job for Free"
            : `Pay ₹${current.price} & Post Job`}
        </button>
      </div>

      {/* BACK BUTTON */}
      <button
        className="btn-secondary"
        style={{ width: "auto", marginBottom: 40 }}
        onClick={() => setStep(4)}
      >
        Previous
      </button>
    </>
  );
}

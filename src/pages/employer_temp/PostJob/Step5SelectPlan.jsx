import React from "react";

export default function Step5SelectPlan({ form, update, back }) {
  const plans = [
    { name: "Free", price: "Free", posts: 3 },
    { name: "Basic", price: "₹999", posts: 10 },
    { name: "Standard", price: "₹2499", posts: 25 },
    { name: "Premium", price: "₹4999", posts: 50 },
  ];

  return (
    <div>
      <h2>Select Plan</h2>

      <div className="plans-grid">
        {plans.map((p) => (
          <div
            key={p.name}
            className="plan-box"
            style={{
              border:
                form.selectedPlan === p.name ? "2px solid #0B63F8" : "1px solid #ddd",
            }}
            onClick={() => update({ selectedPlan: p.name })}
          >
            <h3>{p.name}</h3>
            <p>{p.price}</p>
            <p>{p.posts} Job Posts</p>
          </div>
        ))}
      </div>

      <div className="footer-btns">
        <button onClick={back}>Previous</button>
        <button className="btn-primary">Post Job</button>
      </div>
    </div>
  );
}

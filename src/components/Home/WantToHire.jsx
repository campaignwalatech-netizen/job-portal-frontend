export default function WantToHire() {
  return (
    <>
      <style>{`
        .hire-wrapper {
          padding: 80px 0;
          display: flex;
          justify-content: center;
        }

        .hire-box {
          width: 999px;
          height: 500px;
          background: #D2E5FF;
          border-radius: 24px;
          display: flex;
          overflow: hidden;
        }

        .hire-left img {
          width: 495px;
          height: 500px;
          object-fit: cover;
          display: block;
        }

        .hire-right {
          width: 100%;
          min-width: auto;
          height: 100%;
          padding-left: 40px;
          padding-right: 96px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .hire-title {
          font-family: 'Poppins', sans-serif;
          font-size: 36px;
          font-weight: 700;
          color: #1967d2;
          margin-bottom: 20px;
        }

        .hire-desc {
          font-family: 'Poppins', sans-serif;
          max-width: 420px; 
          font-size: 20px;
          color: #21286A;
          line-height: 1.6;
          margin-bottom: 30px;
          max-width: 430px;
        }

        .hire-btn {
          background: #1967d2;
          color: #fff;
          border: none;
          font-size: 18px;
          font-family: 'Poppins', sans-serif;
          padding: 16px 40px;
          border-radius: 12px;
          cursor: pointer;
        }

        .hire-btn:hover {
          background: #1559b8;
        }

.hire-wrapper {
  padding: 80px 0;
  display: flex;
  justify-content: center;
}

.hire-box {
  width: 999px;
  height: 500px;
  background: #D2E5FF;
  border-radius: 24px;
  display: flex;
  overflow: hidden;
}

/* ----------------- MOBILE FIX ------------------ */
@media (max-width: 768px) {

  .hire-wrapper {
    padding: 20px 12px; /* space around */
  }

  .hire-box {
    width: 100%;
    max-width: 540px; /* same premium box look */
    height: auto;
    border-radius: 20px;
    flex-direction: column;
    margin: 0 auto; /* center on mobile */
    overflow: hidden;
  }

  .hire-left img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  .hire-right {
    padding: 24px; /* better spacing */
    padding-top: 32px;
    padding-bottom: 40px;
  }

  .hire-title {
    font-size: 28px;
  }

  .hire-desc {
    font-size: 16px;
    max-width: 100%;
  }

  .hire-btn {
    margin-top: 12px;
    padding: 14px 30px;
    font-size: 16px;
    margin-bottom: 20px;
  }
}


      `}</style>

      <div className="hire-wrapper">
        <div className="hire-box">

          <div className="hire-left">
            <img
              src="https://www.jobchaahiye.com/images/cta/bg-cta.png"
              alt="Hire"
            />
          </div>

          <div className="hire-right">
            <h2 className="hire-title">Want To Hire</h2>

            <p className="hire-desc">
              Advertise your jobs to millions of monthly users and search
              15.8 million CVs in our database.
            </p>

<button className="hire-btn" onClick={() => (window.location.href = "/employer", "_blank")}>
  Post a Job
</button>


          </div>

        </div>
      </div>
    </>
  );
}

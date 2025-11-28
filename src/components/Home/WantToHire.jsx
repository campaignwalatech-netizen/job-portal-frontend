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
          width: 500px;
          min-width: 330px;
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

            <button className="hire-btn">Post a Job</button>
          </div>

        </div>
      </div>
    </>
  );
}

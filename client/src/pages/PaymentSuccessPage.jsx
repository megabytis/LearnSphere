import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconWrapper}>
          <CheckCircle size={64} color="var(--success)" />
        </div>
        <h1 style={styles.title}>Payment Successful!</h1>
        <p style={styles.description}>
          Thank you for your purchase! You are now enrolled in the course. Start
          learning right away!
        </p>
        <Link to="/my-courses" className="btn btn-primary" style={styles.btn}>
          Go to My Courses <ArrowRight size={20} />
        </Link>
        <p style={styles.note}>
          A confirmation email has been sent to your registered email address.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "calc(100vh - 72px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    background:
      "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)",
  },
  card: {
    backgroundColor: "var(--bg-card)",
    padding: "4rem",
    borderRadius: "var(--radius-lg)",
    boxShadow: "var(--shadow-lg)",
    textAlign: "center",
    maxWidth: "500px",
    width: "100%",
  },
  iconWrapper: {
    marginBottom: "1.5rem",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "800",
    color: "var(--text-main)",
    marginBottom: "1rem",
  },
  description: {
    fontSize: "1rem",
    color: "var(--text-muted)",
    lineHeight: 1.6,
    marginBottom: "2rem",
  },
  btn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "1rem 2rem",
    fontSize: "1rem",
  },
  note: {
    fontSize: "0.85rem",
    color: "var(--text-light)",
    marginTop: "2rem",
  },
};

export default PaymentSuccessPage;

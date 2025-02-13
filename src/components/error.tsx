import React from "react";

interface ErrorProps {
  code: number;
  message: string;
}

const Error: React.FC<ErrorProps> = ({ code, message }) => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
    title: {
      fontSize: "5rem",
      color: "#589FA3",
      fontWeight: "bold",
    },
    message: {
      fontSize: "2rem",
      marginBottom: "1rem",
      color: "black",
      fontWeight: "bold",
    },
  };

  return (
    <div className="bg-trip-navy" style={styles.container}>
      <div style={styles.title}>{code}</div>
      <div style={styles.message}>{message}</div>
    </div>
  );
};

export default Error;

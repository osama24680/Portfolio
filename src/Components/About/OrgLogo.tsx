import { useState } from "react";

// Logos live in public/logos/ — until a file exists, the fallback emoji shows.
export const logos = {
  aast: "aast.png",
  rally: "rally.png",
  plan: "plan.png",
  imperious: "Imperial.jpeg",
  instant: "Instant.jpeg",
  depi: "DEPI.jpeg",
  route: "Route.jpeg",
  ccna: "CCNA.jpeg",
  acpc: "acpc.jpeg",
  ieee: "ieee.jpeg",
  ieeeAlex: "alex.jpeg",
  upwork: "upwork.jpeg",
};

export type LogoKey = keyof typeof logos;

interface IProps {
  logo?: LogoKey;
  fallback: string;
  className?: string;
}

const OrgLogo = ({ logo, fallback, className = "" }: IProps) => {
  const [failed, setFailed] = useState(false);

  if (!logo || failed) {
    return <span className={className}>{fallback}</span>;
  }

  return (
    <img
      className={`${className} org_logo`}
      src={`/logos/${logos[logo]}`}
      alt={`${logo} logo`}
      onError={() => setFailed(true)}
    />
  );
};

export default OrgLogo;

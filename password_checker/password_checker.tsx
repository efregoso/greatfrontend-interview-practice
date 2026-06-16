/*
 * Password Checker component
 * Start time:: 3:05 PM
 * End time: 3:30 PM
 * 
 * Build a password strength indicator in React.
 * - Text input for the user to type a password
 * - Display a strength level: "Weak", "Fair", "Strong", "Very Strong"
 * - Strength is based on:
 *   - Length ≥ 8 characters
 *   - Contains a number
 *   - Contains a special character (!@#$%^&*)
 *   - Contains uppercase and lowercase letters
 *   - Visual indicator that changes appearance based on strength
 */

import "./styles.css";
import { useState, useEffect, useMemo } from "react";

export enum StrengthLevel {
  UNDEFINED,
  WEAK,
  FAIR,
  STRONG,
  VERY_STRONG,
}

const STRENGTH_STRING_DICT = {
  [StrengthLevel.UNDEFINED]: "undefined",
  [StrengthLevel.WEAK]: "weak",
  [StrengthLevel.FAIR]: "fair",
  [StrengthLevel.STRONG]: "strong",
  [StrengthLevel.VERY_STRONG]: "very strong",
};

export default function PasswordStrengthIndicator() {
  const [password, setPassword] = useState<string>("");

  const passwordCriteriaMet = useMemo(() => {
    let numOfCriteriaMet = 0;
    if (password.length >= 8) numOfCriteriaMet++;
    // Looked up: standard Regex for these 3 patterns
    if (/\d/.test(password)) numOfCriteriaMet++;
    if (/[!@#$%^&*]/.test(password)) numOfCriteriaMet++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) numOfCriteriaMet++;
    return numOfCriteriaMet;
  }, [password]);

  const strengthLevelNum: StrengthLevel = useMemo(() => {
    switch (passwordCriteriaMet) {
      case 1:
        return StrengthLevel.WEAK;
      case 2:
        return StrengthLevel.FAIR;
      case 3:
        return StrengthLevel.STRONG;
      case 4:
        return StrengthLevel.VERY_STRONG;
      default:
        return StrengthLevel.UNDEFINED;
    }
  }, [password]);

  // There are input validators in Angular, and I would check for some in React.

  return (
    <div className="App">
      <label htmlFor="password">Password: </label>
      <input
        name="password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <br />
      <span>Strength level: {STRENGTH_STRING_DICT[strengthLevelNum]}</span>
    </div>
  );
}

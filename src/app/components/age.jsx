"use client";

import { useEffect, useState } from "react";

function calculateAge(birthDate) {
  const birth = new Date(birthDate);
  const now = new Date();

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

export default function Age({ birth }) {
  const [age, setAge] = useState(() => calculateAge(birth));

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(calculateAge(birth));
    }, 1000); // soat kabi ishlaydi

    return () => clearInterval(interval);
  }, [birth]);

  return (
    <span>
      {age.years > 0
        ? `Yoshi: ${age.years} yoshda`
        : `Yoshi: ${age.months} oy ${age.days} kunlik`}
    </span>
  );
}

"use client";

import { useEffect, useState } from "react";

const CurrentDate = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDate(
      new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
      }),
    );
  }, []);

  return <>{date}</>;
};

export default CurrentDate;

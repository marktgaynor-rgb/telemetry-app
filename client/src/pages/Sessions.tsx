import { useEffect, useState } from "react";

type Session = { id: string; source: string; track: string; laps: number };

export default function Sessions() {
  const [rows, setRows] = useState<Session[]>([]);
  useEffect(() => {
    fetch("/api/sessions").then(r => r.json()).then(setRows);
  }, []);
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Sessions</h2>
      <ul className="mt-3 list-disc pl-6">
        {rows.map(s => (
          <li key={s.id}>
            {s.source} — {s.track} — {s.laps} laps
          </li>
        ))}
      </ul>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import TeammateCard from "../../components/TeammateCard/TeammateCard";
import "./TeamPage.css";
import { type Designer } from "../../data/designers";
import { API_BASE_URL } from "@/config";

const TeamPage = () => {
  const [team, setTeam] = useState<Designer[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/designers`)
      .then(res => res.json())
      .then(setTeam)
      .catch(() => setTeam([]));
  }, []);

  const data = team;

  return (
  <div className="team-bg">
    <main className="team-main">
      {/* Page Header */}
      <header className="gallery-header">
        <h2>Our Team</h2>
        <div className="divider"></div>
        <p>
          Our talented designers bring creativity, skill, and a personal touch to every appointment. From timeless classics to bold new trends, they're here to make your nail dreams a reality—all in a welcoming, relaxing environment.
        </p>
      </header>

      <section className="team-grid">
        {data.map((designer) => (
          <TeammateCard
            key={designer.id}
            name={designer.name}
            title={designer.title}
            avatar={designer.avatar}
            bio={designer.bio}
          />
        ))}
      </section>
    </main>
  </div>
  );
};

export default TeamPage;

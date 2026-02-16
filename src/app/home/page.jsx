"use client";

import { useEffect, useState } from "react";
import HeartLogo from "../components/logo";
import Clock from "../components/clock";
import Age from "../components/age";

export default function HomeIn() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // 🔥 ECG grafik + server ulanish
  useEffect(() => {
    const API = "https://m-heart.onrender.com/data"; // 🔥 URL ni o'zgartir

    const canvas = document.getElementById("ecgChart");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let data = [];
    let last = 0;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();

      data.forEach((v, i) => {
        ctx.lineTo(i * 6, canvas.height - v / 10);
      });

      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    async function getData() {
      try {
        const res = await fetch(API);
        const json = await res.json();

        // 🔥 smoothing
        const smooth = (json.value + last) / 2;
        last = smooth;

        data.push(smooth);
        if (data.length > 100) data.shift();

        draw();

        // ❤️ BPM chiqarish
        const el = document.querySelector(".home-heart-score");
        if (el) {
          el.innerText = "Yurak urish soni: " + json.bpm;
        }

      } catch (e) {
        console.log("Fetch error:", e);
      }
    }

    const interval = setInterval(getData, 100);

    return () => clearInterval(interval);
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="home">
        <p className="support">(Sinov rejimida)</p>

        <div className="header">
          <HeartLogo />
          <h1 className="home-header-title">
            Heart sensor
          </h1>
        </div>

        <div className="home-box">

          <div className="home-chart-box">
            <Clock />

            {/* 🔥 Grafik */}
            <canvas id="ecgChart" width="600" height="200"></canvas>
          </div>

          <div className="home-user-info">
            <h1 className="home-user-info-text">Foydalanuvchi malumotlari</h1>

            <p className="user-info-texts">Familiyasi: {user.surname}</p>
            <p className="user-info-texts">Ismi: {user.name}</p>
            <p className="user-info-texts">Otasining ismi: {user?.father}</p>
            <p className="user-info-texts">Tug'ulgan sanasi: {user?.birth}</p>
            <p className="user-info-texts">Passport/ID karta raqami: {user?.id}</p>

            <Age birth={user.birth}/>

            <p className="home-user-info-text">Sensor malumotlari</p>

            {/* ❤️ BPM */}
            <p className="home-heart-score">Yurak urish soni:</p>

            <p className="home-user-info-text">Holatlar:</p>

            <p className="home-p">Juda past(bradikardiya) 50dan past</p>
            <p className="home-p">Normal (past) 50-59 oralig'ida</p>
            <p className="home-p">Yaxshi (ideal holat) 60-90 oralig'ida</p>
            <p className="home-p">Normal (yuqori)(stress yoki harakat) 91-100 oralig'ida</p>
            <p className="home-p">Yomon (taxikardiya boshlanishi) 101-120 oralig'ida</p>
            <p className="home-p">Jiddiy (xavfli xolat shifokor qabuliga borish kerak) 120 dan yuqori</p>

            <p className="home-suppot-text">
              Holatlar tinch yotgan odamda o'lchangan natijalarga qarab belgilanadi 
              tashxislar taxminiy ishonch hosil qillish uchun shifokor qabuliga borish tavsiya etiladi
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

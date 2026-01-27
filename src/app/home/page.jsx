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

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container">
        <div className="home">
            <p className="support">(Sinov rejimida)</p>
            <div className="header">
                <HeartLogo/>
                <h1 className="home-header-title">
                     Heart sensor 
                </h1>
            </div>
            <div className="home-box">
                <div className="home-chart-box">

                    <Clock/>
                </div>
                <div className="home-user-info">
                    <h1 className="home-user-info-text">Foydalanuvchi malumotlari</h1>
                    <p className="user-info-texts">Familiyasi: {user.surname}</p>
                    <p className="user-info-texts">Ismi: {user.name}</p>
                    <p className="user-info-texts">Otasining ismi: {user?.father}</p>
                    <p className="user-info-texts">Tug'ulgan sanasi: {user?.birth}</p>
                    <p className="user-info-texts">Passport/ID karta raqami: {user?.id}</p>
                    <Age birth={user.birth}/>
                    <p className="home-user-info-text">Sensor malumotlari   </p>
                    <p className="home-heart-score">Yurak urish soni:</p>
                    <p className="home-user-info-text">Holatlar:</p>
                    <p>Juda past(bradikardiya)  50dan past</p>
                    <p>Normal (past) 50-59 oralig'ida</p>
                    <p>Yaxshi (ideal holat) 60-90 oralig'ida</p>
                    <p>Normal (yuqori)(stress yoki harakat) 91-100 oralig'ida</p>
                    <p>Yomon (taxikardiya boshlanishi) 101-120 oralig'ida</p>
                    <p>Jiddiy (xavfli xolat shifokor qabuliga borish kerak) 120 dan yuqori</p>
                    <p className="home-suppot-text">Holatlar tinch yotgan odamda o'lchangan natijalarga qarab belgilanadi tashxislar taxminiy ishonch hosil qillish uchun shifokor qabuliga bosrish tavsiya etiladi</p>

                </div>
            </div>
        </div>
    </div>
  );
}

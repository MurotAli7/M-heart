"use client";

import HeartLogo from "./logo";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();

  function isValidBirthDate(dateStr) {
    const birth = new Date(dateStr);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age >= 0 && age <= 120;
  }

  function isValidID(id) {
    const regex = /^[A-Z]{2}\d{7}$/;
    return regex.test(id);
  }

  function handleLogin(e) {
    e.preventDefault();
    const form = e.target;

    // 1️⃣ Bo‘sh maydonlar
    if (
      !form.surname.value ||
      !form.name.value ||
      !form.father.value ||
      !form.id.value ||
      !form.birth.value
    ) {
      alert("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    // 2️⃣ ID karta tekshiruvi
    if (!isValidID(form.id.value)) {
      alert("ID karta formati xato. Masalan: AD-1234567");
      return;
    }

    // 3️⃣ Tug‘ilgan sana tekshiruvi
    if (!isValidBirthDate(form.birth.value)) {
      alert("Tug‘ilgan sana noto‘g‘ri!");
      return;
    }

    const userData = {
      surname: form.surname.value,
      name: form.name.value,
      father: form.father.value,
      birth: form.birth.value,
      id: form.id.value,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    router.push("/home");
  }

  return (
    <form className="container" onSubmit={handleLogin}>
      <div className="login">
        <div className="login-logo">
          <HeartLogo />
          <h1 className="login-title">
            Yurak signallarini o‘lchashdan avval ma’lumotlaringizni kiriting
          </h1>
        </div>

        <div className="login-inp-box">
          <input
            className="login-inps"
            name="surname"
            placeholder="Familiya"
            required
          />
          <input
            className="login-inps"
            name="name"
            placeholder="Ism"
            required
          />
          <input
            className="login-inps"
            name="father"
            placeholder="Otasining ismi"
            required
          />
        </div>

        <input
          className="login-id-num-inp"
          name="id"
          placeholder="AD1234567"
          required
          pattern="[A-Z]{2}-[0-9]{7}"
          title="ID karta formati: AD-1234567"
        />

        <input
          className="login-inp-date"
          type="date"
          name="birth"
          required
          max={new Date().toISOString().split("T")[0]}
        />

        <button className="login-submit" type="submit">
          BOSHLASH
        </button>
      </div>
    </form>
  );
}

export default Login;

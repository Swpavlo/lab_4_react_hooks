import { useState, useEffect } from "react";
import "./App.css";

function Header({ theme, toggleTheme }) {
  return (
    <header className={`header ${theme}`}>
      <h1>Мій профіль</h1>
      <button onClick={toggleTheme} className="theme-btn">
        {theme === "dark" ? "☀️ Світла тема" : "🌙 Темна тема"}
      </button>
    </header>
  );
}

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setReviews([
        { id: 1, name: "Іван Петренко", text: "Відмінний спеціаліст, рекомендую!" },
        { id: 2, name: "Олена Коваль", text: "Дуже відповідальний та пунктуальний." },
        { id: 3, name: "Михайло Бондар", text: "Чудова робота, все виконано вчасно." },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <section className="reviews">
      <h2>Відгуки роботодавців</h2>
      {loading ? (
        <p>Завантаження відгуків...</p>
      ) : (
        reviews.map((r) => (
          <div key={r.id} className="review-card">
            <strong>{r.name}</strong>
            <p>{r.text}</p>
          </div>
        ))
      )}
    </section>
  );
}

function ContactForm({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2>Зворотній зв'язок</h2>
        {sent ? (
          <p className="success-msg">✅ Повідомлення надіслано!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Ваше ім'я" value={form.name} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Ваш Email" value={form.email} onChange={handleChange} required />
            <input name="phone" type="tel" placeholder="Номер телефону" value={form.phone} onChange={handleChange} />
            <textarea name="message" placeholder="Ваше повідомлення" rows="4" value={form.message} onChange={handleChange} />
            <button type="submit" className="submit-btn">Відправити</button>
          </form>
        )}
      </div>
    </div>
  );
}

function Footer({ onContactClick }) {
  return (
    <footer className="footer">
      <p>© 2026 Лабораторна робота</p>
      <button onClick={onContactClick} className="contact-btn">Зв'язатись зі мною</button>
    </footer>
  );
}

export default function App() {
  const [theme, setTheme] = useState("light");
  const [showContact, setShowContact] = useState(false);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <div className={`app ${theme}`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Reviews />
      </main>
      {showContact && <ContactForm onClose={() => setShowContact(false)} />}
      <Footer onContactClick={() => setShowContact(true)} />
    </div>
  );
}
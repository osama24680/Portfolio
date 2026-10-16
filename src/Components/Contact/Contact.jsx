import { useRef, useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { BsWhatsapp, BsLinkedin } from "react-icons/bs";
import { FiArrowUpRight, FiSend } from "react-icons/fi";
import { trackSpotlight } from "../../utils/spotlight";
import "./Contact.css";

const OWNER_EMAIL = "osamamegahed2468@gmail.com";

// Web3Forms delivers form posts to the inbox tied to this access key.
// The key is public by design (it only allows sending *to* you), so it can live in the client.
// Get one at https://web3forms.com — until it's set, the form falls back to the visitor's mail app.
const WEB3FORMS_KEY = "01091d09-dcdb-4a06-87a1-4a5a1c6dfc8a";
const FORM_ENDPOINT = "https://api.web3forms.com/submit";

// opens the visitor's email app with their message already filled in
const openMailDraft = ({ name, email, message }) => {
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  window.location.href = `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;
};

const channels = [
  {
    Icon: MdOutlineEmail,
    label: "Email",
    value: "osamamegahed2468@gmail.com",
    href: "mailto:osamamegahed2468@gmail.com",
    color: "#4db5ff",
  },
  {
    Icon: BsWhatsapp,
    label: "WhatsApp",
    value: "+20 155 559 5187",
    href: "https://wa.me/201555595187",
    color: "#25D366",
  },
  {
    Icon: BsLinkedin,
    label: "LinkedIn",
    value: "in/osama-megahed",
    href: "https://www.linkedin.com/in/osama-megahed-887b76201/",
    color: "#0A66C2",
  },
];

export default function Contact() {
  const form = useRef();
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form.current));

    // bots fill the hidden honeypot field; pretend it worked and drop it
    if (data._honey) {
      setStatus("sent");
      return;
    }

    if (!WEB3FORMS_KEY) {
      openMailDraft(data);
      setStatus("drafted");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New portfolio message from ${data.name}`,
          from_name: "Osama Megahed · Portfolio",
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message);
      }
      setStatus("sent");
      form.current.reset();
    } catch (err) {
      setErrorMessage(err.message || "");
      setStatus("error");
    }
  };

  return (
    <section id="contact">
      <h2>Contact Me</h2>
      <h5 className="text_light">Let's build something meaningful together</h5>

      <div className="container contact_container">
        <div className="contact_side">
          <div className="lux_card contact_intro" onMouseMove={trackSpotlight}>
            <div className="profile_status">
              <span className="pulse_dot" />
              Open to work
            </div>
            <h3>Have a project or a role in mind?</h3>
            <p>
              I'm open to Front-End roles, freelance projects, and startup
              collaborations. I usually reply within a day.
            </p>
          </div>

          {channels.map(({ Icon, label, value, href, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="lux_card lux_lift contact_channel"
              style={{ "--brand": color }}
              onMouseMove={trackSpotlight}
            >
              <span className="contact_channel_icon">
                <Icon />
              </span>
              <div>
                <h4>{label}</h4>
                <small>{value}</small>
              </div>
              <FiArrowUpRight className="contact_channel_arrow" />
            </a>
          ))}
        </div>

        <form ref={form} onSubmit={sendEmail} className="lux_card contact_form" onMouseMove={trackSpotlight}>
          <div className="form_row">
            <label>
              <span>Name</span>
              <input type="text" name="name" placeholder="Your full name" required />
            </label>
            <label>
              <span>Email</span>
              <input type="email" name="email" placeholder="you@example.com" required />
            </label>
          </div>
          {/* honeypot — hidden from people, catches spam bots */}
          <input type="text" name="_honey" className="form_honey" tabIndex={-1} autoComplete="off" />

          <label>
            <span>Message</span>
            <textarea name="message" rows="7" placeholder="Tell me about your project..." required />
          </label>

          <button type="submit" className="contact_submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send Message"} <FiSend />
          </button>

          {status === "sent" && (
            <p className="form_status success">Thanks! Your message was sent — I'll get back to you soon.</p>
          )}
          {status === "drafted" && (
            <p className="form_status success">
              Your email app should open with the message ready — just hit send. Nothing opened? Email me at{" "}
              <a href={`mailto:${OWNER_EMAIL}`}>{OWNER_EMAIL}</a>.
            </p>
          )}
          {status === "error" && (
            <p className="form_status error">
              {errorMessage || "Something went wrong."} You can also email me directly at{" "}
              <a href="mailto:osamamegahed2468@gmail.com">osamamegahed2468@gmail.com</a>.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

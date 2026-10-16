import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";
import { trackSpotlight } from "../../utils/spotlight";
import "./Testimonial.css";

const UPWORK_PROFILE = "https://www.upwork.com/freelancers/~01cce0d0675a271639";

const review = {
  name: "Yasmine Mokhtar",
  source: "Client on Upwork",
  project: "Language-learning website",
  quote:
    "Choosing Osama was a very good choice. I hired him for my language-learning website and he accomplished it very well. I could not be more thrilled with this decision — he is skilled, focused, fast, and a hard worker. I recommend anyone hire him.",
};

export default function Testimonial() {
  return (
    <section id="testimonial">
      <h2>Testimonial</h2>
      <h5 className="text_light">What clients say</h5>

      <div className="container">
        <figure className="lux_card lux_gold testimonial_card" onMouseMove={trackSpotlight}>
          <FaQuoteLeft className="testimonial_mark" />

          <div className="testimonial_stars" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar key={i} />
            ))}
          </div>

          <blockquote>{review.quote}</blockquote>

          <figcaption>
            <span className="testimonial_avatar">
              {review.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </span>
            <div>
              <h4>{review.name}</h4>
              <small>
                {review.source} · {review.project}
              </small>
            </div>
            <a
              href={UPWORK_PROFILE}
              target="_blank"
              rel="noreferrer"
              className="testimonial_source"
            >
              <SiUpwork /> View on Upwork
            </a>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

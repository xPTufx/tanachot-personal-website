import { Link } from "react-router-dom";
import { nb } from "../data/site";
import { usePageMeta } from "../hooks/usePageMeta";

export function Works() {
  usePageMeta("My Works | Tanachot Jekchatree", "/works");

  return (
    <section className="coming-soon">
      <p className="coming-label">{nb("My Works")}</p>
      <h1 className="coming-title">To Be Continue</h1>
      <p className="coming-sub">Projects are on the way. Check back soon.</p>
      <Link to="/" className="coming-btn">
        {nb("Back to Home")}
      </Link>
    </section>
  );
}

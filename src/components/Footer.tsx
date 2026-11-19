import { contacts, nb } from "../data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner shell">
        <p className="copyright">
          &copy; {year} {nb("Tanachot Jekchatree. All rights reserved.")}
        </p>
        <div className="footer-contacts">
          {contacts.map((contact) => {
            const icons =
              contact.iconLight && contact.iconDark ? (
                <>
                  <img className="footer-icon icon-light" src={contact.iconLight} alt="" />
                  <img className="footer-icon icon-dark" src={contact.iconDark} alt="" />
                </>
              ) : (
                <img className="footer-icon" src={contact.iconImg} alt="" />
              );

            // web links open in a new tab; mailto links open the email app instead
            const isWebLink = contact.url.startsWith("http");

            return (
              <a
                key={contact.name}
                className="footer-link"
                href={contact.url}
                target={isWebLink ? "_blank" : undefined}
                rel={isWebLink ? "noopener noreferrer" : undefined}
                title={contact.name}
                aria-label={contact.name}
              >
                {icons}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

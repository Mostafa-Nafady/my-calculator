import Image from "next/image";
import Link from "next/link";

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Tours", href: "#features" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

const features = [
  {
    title: "Guided Tours",
    description:
      "Explore the world's most stunning peaks with our experienced local guides who know every trail, viewpoint, and hidden gem.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Alpine Adventures",
    description:
      "Push your limits with thrilling alpine expeditions — from glacier crossings to summit climbs designed for every skill level.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M8 3l4 8 5-5 5 15H2L8 3z" />
      </svg>
    ),
  },
  {
    title: "Scenic Trails",
    description:
      "Wander through breathtaking landscapes on carefully curated scenic trails that showcase nature's most magnificent vistas.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  Components                                                                 */
/* -------------------------------------------------------------------------- */

function Navbar() {
  return (
    <header
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        height: "var(--header-height)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <nav
        className="container"
        aria-label="Main navigation"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="#home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "1.5rem",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.02em",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: "28px", height: "28px", color: "var(--color-gold-400)" }}
            aria-hidden="true"
          >
            <path d="M8 3l4 8 5-5 5 15H2L8 3z" />
          </svg>
          Mountain Travel
        </Link>

        {/* Desktop nav links */}
        <ul
          style={{
            display: "none",
            alignItems: "center",
            gap: "2.5rem",
          }}
          className="nav-links"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  transition: "color var(--transition-fast)",
                }}
                className="nav-link"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "600px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background image */}
      <Image
        src="/assets/generated/home-hero.jpg"
        alt="Snow-capped mountain range at sunset with warm orange and pink sky"
        fill
        priority
        sizes="100vw"
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      {/* Dark gradient overlay for text contrast */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(11,31,58,0.55) 0%, rgba(11,31,58,0.35) 40%, rgba(11,31,58,0.75) 100%)",
          zIndex: 1,
        }}
      />

      {/* Hero content */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          color: "#fff",
        }}
      >
        <p
          style={{
            display: "inline-block",
            fontSize: "0.85rem",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--color-gold-300)",
            marginBottom: "1.25rem",
          }}
        >
          Adventure Awaits
        </p>

        <h1
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: "1.5rem",
            textShadow: "0 2px 30px rgba(0,0,0,0.3)",
          }}
        >
          Explore the Great Outdoors
        </h1>

        <p
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
            maxWidth: "640px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.92)",
            textShadow: "0 1px 12px rgba(0,0,0,0.25)",
          }}
        >
          Discover breathtaking mountain adventures with expert guides, scenic
          trails, and unforgettable alpine experiences. Your journey to the
          peaks starts here.
        </p>

        <Link
          href="#features"
          className="hero-cta"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "1rem 2.5rem",
            fontSize: "1.05rem",
            fontWeight: 700,
            color: "#fff",
            background:
              "linear-gradient(135deg, var(--color-orange-500), var(--color-pink-500))",
            borderRadius: "var(--radius-full)",
            boxShadow: "0 8px 30px rgba(232,119,46,0.4)",
            transition: "transform var(--transition-fast), box-shadow var(--transition-fast)",
          }}
        >
          Start Your Journey
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: "20px", height: "20px" }}
            aria-hidden="true"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          color: "rgba(255,255,255,0.7)",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: "32px", height: "32px" }}
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section
      id="features"
      className="section"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="container">
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p
            style={{
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-orange-500)",
              marginBottom: "0.75rem",
            }}
          >
            What We Offer
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "var(--color-blue-900)",
              marginBottom: "1rem",
            }}
          >
            Unforgettable Mountain Experiences
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              maxWidth: "560px",
              margin: "0 auto",
              color: "var(--color-text-muted)",
            }}
          >
            From guided summit climbs to leisurely scenic walks, we have the
            perfect adventure for every explorer.
          </p>
        </div>

        {/* Feature cards */}
        <div
          className="features-grid"
          style={{
            display: "grid",
            gap: "2rem",
            gridTemplateColumns: "1fr",
          }}
        >
          {features.map((feature) => (
            <article
              key={feature.title}
              className="feature-card"
              style={{
                background: "var(--color-surface)",
                borderRadius: "var(--radius-lg)",
                padding: "2.5rem",
                boxShadow: "var(--shadow-sm)",
                border: "1px solid var(--color-border)",
                transition:
                  "transform var(--transition-base), box-shadow var(--transition-base)",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "64px",
                  height: "64px",
                  borderRadius: "var(--radius-md)",
                  background:
                    "linear-gradient(135deg, var(--color-blue-700), var(--color-blue-900))",
                  color: "var(--color-gold-400)",
                  marginBottom: "1.5rem",
                }}
              >
                <div style={{ width: "32px", height: "32px" }}>
                  {feature.icon}
                </div>
              </div>

              <h3
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "var(--color-blue-900)",
                  marginBottom: "0.75rem",
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  color: "var(--color-text-muted)",
                }}
              >
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      id="contact"
      style={{
        background: "var(--color-blue-900)",
        color: "rgba(255,255,255,0.8)",
        paddingBlock: "3rem",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
          }}
        >
          {/* Footer logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "1.25rem",
              fontWeight: 800,
              color: "#fff",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: "24px", height: "24px", color: "var(--color-gold-400)" }}
              aria-hidden="true"
            >
              <path d="M8 3l4 8 5-5 5 15H2L8 3z" />
            </svg>
            Mountain Travel
          </div>

          {/* Footer nav */}
          <nav aria-label="Footer navigation">
            <ul
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1.5rem",
              }}
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: "0.9rem",
                      transition: "color var(--transition-fast)",
                    }}
                    className="footer-link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div
          style={{
            marginTop: "2rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            fontSize: "0.85rem",
            color: "rgba(255,255,255,0.6)",
            textAlign: "center",
          }}
        >
          <p>
            &copy; {new Date().getFullYear()} Mountain Travel. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function HomePage() {
  return (
    <>
      <a href="#home" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </>
  );
}


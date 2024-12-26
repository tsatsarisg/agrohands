import { Link, useRouteLoaderData } from "react-router";
import farmLandscape from "../../assets/images/dashboard.webp";
import classes from "./Dashboard.module.css";

const Dashboard = () => {
  const token = useRouteLoaderData("root"); // Fetch token from route loader

  return (
    <div className={classes.homePage}>
      <section className={classes.hero}>
        <img
          src={farmLandscape}
          alt="Farm landscape"
          className={classes.heroImage}
        />
        <div className={classes.heroContent}>
          <h1 className={classes.title}>Welcome to AgroHands</h1>
          <p className={classes.subtitle}>
            Connecting farmers with skilled workers to ensure a thriving harvest
            season.
          </p>
          {!token && (
            <Link to="/signup" className={classes.ctaButton}>
              Get Started
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className={classes.features}>
        <h2 className={classes.sectionTitle}>Why Choose AgroHands?</h2>
        <div className={classes.featureGrid}>
          <div className={classes.featureCard}>
            <h3>Find Skilled Workers</h3>
            <p>
              Browse a wide range of skilled professionals for every farming
              need.
            </p>
          </div>
          <div className={classes.featureCard}>
            <h3>Post Jobs Easily</h3>
            <p>
              Streamline your hiring process with our simple job posting system.
            </p>
          </div>
          <div className={classes.featureCard}>
            <h3>Grow Together</h3>
            <p>
              Build long-term relationships with trusted workers and employers.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={classes.callToAction}>
        <h2>Ready to make your harvest seamless?</h2>
        <div className={classes.callToActionButtons}>
          <Link to="/jobs" className={classes.secondaryCtaButton}>
            Explore Jobs
          </Link>
          <Link to="/workers" className={classes.secondaryCtaButton}>
            Find Workers
          </Link>
        </div>
      </section>
    </div>
  );
};

export { Dashboard };

<script lang="ts">
  import cta from "$lib/assets/cta.png";
  import menu from "$lib/assets/icons/menu.svg";
  import logo from "$lib/assets/logo.png";

  import facebook from "$lib/assets/icons/facebook.svg";
  import instagram from "$lib/assets/icons/instagram.svg";
  import linkedin from "$lib/assets/icons/linkedin.svg";
  import twitter from "$lib/assets/icons/twitter.svg";

  let hiddenMenu: HTMLDivElement | null = null;

  function toggleHiddenMenu() {
    hiddenMenu!.style.display =
      hiddenMenu!.style.display === "flex" ? "none" : "flex";
  }
</script>

<header>
  <img src={logo} alt="Logo" />
  <div class="pc">
    <nav>
      <a href="/dashboard">Dashboard</a>
      <a href="/services">Services</a>
      <a href="/dashboard/bootcamp">Bootcamp</a>
      <a href="/clients">Our Clients</a>
      <a href="/careers">Careers</a>
      <a href="/about">About Us</a>
    </nav>
    <button on:click={null}>Get in Touch</button>
  </div>
  <div class="mobile">
    <button class="menu" on:click={toggleHiddenMenu}>
      <img src={menu} alt="Menu" />
    </button>
    <div class="hidden-menu" bind:this={hiddenMenu}>
      <nav>
        <a href="/services">Services</a>
        <a href="/dashboard/bootcamp">Bootcamp</a>
        <a href="/clients">Our Clients</a>
        <a href="/careers">Careers</a>
        <a href="/about">About Us</a>
      </nav>
      <button on:click={null}>Get in Touch</button>
    </div>
  </div>
</header>

<main class="content">
  <slot />
</main>

<footer>
  <div class="call-to-action">
    <div>
      <h2>Want to accelerate software development at your company?</h2>
      <p>Let's see how we can help you.</p>
      <button>Get in Touch</button>
    </div>
    <img src={cta} alt="Call to Action" />
  </div>
  <div class="footer">
    <div class="footer-links">
      <div class="footer-links__left">
        <h2>Discover One Twenty Seven</h2>
        <a href="/services">Services</a>
        <a href="/dashboard/bootcamp">Bootcamp</a>
        <a href="/clients">Our Clients</a>
        <a href="/careers">Careers</a>
        <a href="/about">About Us</a>
      </div>
      <div class="footer-links__right">
        <h2>Resources</h2>
        <a href="/blog">Blog</a>
        <a href="/contact">Contact Us</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
      </div>
      <div class="footer-info">
        <p>© 2023 One Twenty Seven. All rights reserved.</p>
        <p>
          One Twenty Seven is a registered trademark of One Twenty Seven, Inc.
        </p>
      </div>
    </div>
  </div>
  <div class="contact">
    <div>
      <h2>Get in Touch</h2>
      <span>
        <button>Contact Us</button>
        <button>Schedule a Call →</button>
      </span>
      <p>✉️ <a href="mailto:onetwentyseven@127.ph">onetwentyseven@127.ph</a></p>
    </div>
    <div>
      <h2>Get insights from us</h2>
      <form method="POST">
        <input name="email" type="email" placeholder="Email" />
        <button type="submit">Subscribe</button>
      </form>
    </div>
    <div>
      <h2>Follow us</h2>
      <span class="social-links">
        <a href="https://www.facebook.com/">
          <img src={facebook} alt="Facebook" />
        </a>
        <a href="https://www.twitter.com/">
          <img src={twitter} alt="Twitter" />
        </a>
        <a href="https://www.instagram.com/">
          <img src={instagram} alt="Instagram" />
        </a>
        <a href="https://www.linkedin.com/">
          <img src={linkedin} alt="LinkedIn" />
        </a>
      </span>
    </div>
  </div>
</footer>

<style>
  /* Header */
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 80px;
  }

  header img {
    height: 40px;
  }

  header div {
    display: flex;
    align-items: center;
  }

  header nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  header nav a {
    margin-right: 20px;
    color: var(--primary-color);
  }

  header nav a:hover {
    text-decoration: underline;
  }

  header .mobile {
    display: none;
  }

  header .mobile .menu {
    border: none;
    background-color: transparent;
  }

  header .mobile .hidden-menu {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    background-color: var(--white);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }

  header .mobile .hidden-menu nav {
    display: flex;
    flex-direction: column;
  }

  header .mobile .hidden-menu nav a {
    margin-bottom: 10px;
  }

  header .mobile .hidden-menu button {
    margin: 0;
  }

  @media screen and (max-width: 750px) {
    header .pc {
      display: none;
    }

    header .mobile {
      display: block;
    }
  }

  /* Footer */
  footer {
    display: grid;
    grid-template-areas:
      "cta cta"
      "links contact";
  }

  footer .call-to-action {
    grid-area: cta;
    position: relative;
    overflow: visible;
    display: flex;
    justify-content: space-between;
    padding: 40px 5rem;
    background-color: var(--black);
    color: var(--white);
  }

  footer .call-to-action div {
    width: 50%;
  }

  footer .call-to-action h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  footer .call-to-action p {
    font-size: 1.5rem;
    font-weight: 400;
    margin-bottom: 2rem;
  }

  footer .call-to-action button {
    font-size: 1.5rem;
    font-weight: 700;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
  }

  footer .call-to-action img {
    width: 50%;
    max-width: 550px;
    right: 5%;
    bottom: 20%;
    position: absolute;
  }

  footer .footer {
    width: 100%;
    padding: 5rem;
  }

  footer .footer-links {
    display: grid;
    grid-template-areas:
      "left right"
      "info info";
  }

  footer .footer-links__left {
    grid-area: left;
    display: flex;
    flex-direction: column;
  }

  footer .footer-links__left a {
    margin-bottom: 10px;
  }

  footer .footer-links__right {
    grid-area: right;
    display: flex;
    flex-direction: column;
  }

  footer .footer-links__right a {
    margin-bottom: 10px;
  }

  footer .footer-info {
    grid-area: info;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
  }

  footer .contact {
    grid-area: contact;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    padding: 5rem;
    background-color: var(--white);
    color: var(--black);
  }

  footer .contact div {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  footer .contact form {
    display: flex;
    gap: 20px;
  }

  footer .contact form input {
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid var(--black);
  }

  footer .contact .social-links {
    display: flex;
    gap: 20px;
  }

  footer .contact .social-links a {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  footer .contact .social-links a img {
    fill: var(--primary-color);
  }

  @media screen and (max-width: 850px) {
    footer .call-to-action {
      flex-direction: column;
      padding: 2rem;
    }

    footer .call-to-action div {
      width: 100%;
    }

    footer .call-to-action h2 {
      font-size: 1.5rem;
    }

    footer .call-to-action p {
      font-size: 1rem;
    }

    footer .call-to-action button {
      font-size: 1rem;
    }

    footer .call-to-action img {
      display: none;
    }
  }
</style>

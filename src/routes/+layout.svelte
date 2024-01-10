<script>
  import "../app.css";
</script>

<slot />

<style>
  @import url("https://fonts.googleapis.com/css2?family=Encode+Sans+Condensed&family=Jost:wght@700&display=swap");

  :global(:root) {
    --primary-color: #7f4801;
    --secondary-color: #ffdc7f;
    --black: #202020;
    --white: #f0f0f0;
    --font-family-headings: "Jost", sans-serif;
    --font-family: "Encode Sans Condensed", sans-serif;
    --font-size: 16px;
  }

  :global(*) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :global(body) {
    font-family: var(--font-family);
    font-size: var(--font-size);
  }

  :global(a) {
    text-decoration: none;
    color: var(--tertiary-color);
  }

  :global(a:link) {
    text-decoration: none;
  }
  :global(a:visited) {
    text-decoration: none;
  }
  :global(a:hover) {
    text-decoration: none;
  }
  :global(a:active) {
    text-decoration: none;
  }

  :global(button) {
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    background-color: var(--secondary-color);
    color: var(--primary-color);
  }

  :global(button:hover) {
    background-color: var(--primary-color);
    color: var(--white);
  }

  :global(button:active) {
    background-color: var(--primary-color);
    color: var(--white);
  }

  :global(button:focus) {
    outline: none;
  }

  :global(img) {
    max-width: 100%;
  }

  :global(h1),
  :global(h2),
  :global(h3),
  :global(h4),
  :global(h5),
  :global(h6) {
    font-family: var(--font-family-headings);
  }

  :global(.material-symbols-outlined) {
    color: var(--primary-color);
    font-family: "Material Symbols Outlined";
    font-size: 18px; /* Adjust the font size as needed */
    font-variation-settings:
      "FILL" 0,
      "wght" 400,
      "GRAD" 0,
      "opsz" 24;
  }
</style>

# Cybersecurity Portfolio

A professional, terminal-inspired portfolio website designed to showcase cybersecurity skills, technical knowledge, and professional experience.

## Features

* **Terminal-Inspired Design:** An aesthetic inspired by command-line interfaces, featuring modern typography, emerald green accents, and a custom dark mode layout.
* **Multi-page Architecture:** Cleanly organized sections including:
  * `~/about`: Professional background, certifications, and technical stack.
  * `~/projects`: Overview of practical work and technical deployments.
  * `~/tuto`: Comprehensive, step-by-step technical guides for security tools and infrastructure hardening.
  * `~/blog`: Articles covering threat intelligence, cryptography, and infosec news.
  * `~/contact`: Professional communication channels.
* **Fully Responsive:** Mobile-friendly layout built with Tailwind CSS.
* **Static Site:** Fast and secure, requiring no complex backend infrastructure to host.

## Tech Stack

* HTML5
* Tailwind CSS (via CDN)
* Font Awesome (Icons)

## Setup and Usage

To view the portfolio locally, simply clone the repository and open `index.html` in any modern web browser:

```bash
git clone https://github.com/Mike00001/portfolio.git
cd portfolio
```

Alternatively, you can serve the files using a local Python HTTP server for a better development experience:

```bash
python3 -m http.server 8000
```

Then, navigate to `http://localhost:8000` in your web browser.
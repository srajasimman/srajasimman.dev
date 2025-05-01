# Rajasimman S - Professional Portfolio

This is a professional portfolio website built using HTML, CSS, and vanilla JavaScript. The website showcases my skills, experience, and projects as a Lead SRE and DevOps Architect.

## Features

- Responsive design that works on all device sizes
- Dark/light mode toggle with saved preference
- Dynamic content loading from resume.json
- Interactive UI elements with smooth animations
- Contact form for potential employers or clients
- Mobile-friendly navigation
- Fast loading and optimized performance

## Technologies Used

- HTML5
- CSS3 (with Flexbox and CSS Grid)
- Vanilla JavaScript (ES6+)
- Font Awesome for icons
- Google Fonts for typography
- GitHub Pages for hosting

## Setup and Deployment

### Local Development

1. Clone the repository:
   ```
   git clone https://github.com/srajasimman/srajasimman.github.io.git
   cd srajasimman.github.io
   ```

2. Open the project in your code editor.

3. For local testing, you can use any local server. For example, with Python:
   ```
   # Python 3
   python -m http.server 8000
   ```

4. Visit `http://localhost:8000` in your browser.

### GitHub Pages Deployment

1. Create a GitHub repository named `srajasimman.github.io` (replace "srajasimman" with your GitHub username).

2. Push your code to the repository:
   ```
   git add .
   git commit -m "Initial portfolio website"
   git branch -M main
   git remote add origin https://github.com/srajasimman/srajasimman.github.io.git
   git push -u origin main
   ```

3. Go to your repository settings on GitHub:
   - Navigate to "Settings" > "Pages"
   - Under "Source", select "main" branch
   - Click "Save"

4. Your website will be published at `https://srajasimman.github.io` (replace "srajasimman" with your GitHub srajasimman).

5. It may take a few minutes for your site to be published. You'll see a green success message when it's ready.

## Customization

### Editing Your Information

1. Personal information is stored in two main files:
   - `resume.json`: Contains your professional experience, projects, and skills.
   - `about-me.md`: Contains your personal summary and philosophy (currently used for reference).

2. Update these files with your own information to personalize the website.

3. Website content will automatically update based on these files.

### Changing Colors and Styling

1. The main styling variables are defined at the top of `css/styles.css`:
   ```css
   :root {
       --primary-color: #2563eb;
       --primary-dark: #1d4ed8;
       /* more variables... */
   }
   ```

2. Modify these variables to change the color scheme of the website.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Font Awesome for the icons
- Google Fonts for the typography
- GitHub Pages for free hosting

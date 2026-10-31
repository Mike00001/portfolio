document.addEventListener("DOMContentLoaded", () => {
    const pathParts = window.location.pathname.split('/');
    const isFr = pathParts.includes('fr');
    const basePath = isFr ? '../' : '';

    const fallbackTemplates = {
        'nav-placeholder': `<nav class="sticky top-0 z-50 w-full bg-[#0d0d0d]/85 backdrop-blur-md border-b border-[#262626] transition-all duration-300">
    <div class="max-w-4xl mx-auto w-full px-6 py-4 flex justify-between items-center text-sm font-medium tracking-tight gap-4">
        <a href="index.html" id="nav-logo" class="flex items-center gap-2.5 hover:opacity-85 transition text-white font-semibold text-[15px]">
            <div class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span class="font-mono text-[14px] font-bold text-white tracking-tight">~/portfolio</span>
        </a>
        <div class="flex items-center gap-5 text-[13px]" id="nav-links">
            <a href="about.html" id="nav-about" class="text-neutral-400 hover:text-white transition-colors">About</a>
            <a href="projects.html" id="nav-projects" class="text-neutral-400 hover:text-white transition-colors">Projects</a>
            <a href="contact.html" id="nav-contact" class="bg-white text-[#0d0d0d] hover:bg-neutral-200 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors">Contact</a>
            <span class="text-[#333333]">|</span>
            <a href="#" id="lang-toggle" class="text-neutral-400 hover:text-white transition-colors font-mono text-[11px] font-semibold border border-[#333333] rounded px-1.5 py-0.5 bg-[#1a1a1a] hover:bg-[#262626] uppercase">FR</a>
        </div>
    </div>
</nav>`,
        'footer-placeholder': `<footer class="mt-auto py-10 border-t border-[#262626] bg-[#0d0d0d] text-[13px] text-neutral-400 font-sans w-full px-6">
    <div class="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <span>&copy; 2026 Mickaël Van Craenenbroeck</span>
    </div>
</footer>`
    };

    // Asynchronously loads dynamic component HTML into given placeholders, with local file:// fallback
    const loadComponent = async (id, file) => {
        const placeholder = document.getElementById(id);
        if (!placeholder) return;

        try {
            const response = await fetch(file);
            if (response.ok) {
                const html = await response.text();
                placeholder.outerHTML = html;
                return;
            }
        } catch (error) {
            // Fallback for file:// protocol
        }
        if (fallbackTemplates[id]) {
            placeholder.outerHTML = fallbackTemplates[id];
        }
    };

    // Load navigation and footer components in parallel
    Promise.all([
        loadComponent('nav-placeholder', basePath + 'components/nav.html'),
        loadComponent('footer-placeholder', basePath + 'components/footer.html')
    ]).then(() => {
        // Call logic after DOM receives the new generic components
        highlightNav();
    });

    // Determines active navigation link based on current path and handles localization
    function highlightNav() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('#nav-links a');
        
        // Handle translations dynamically if in /fr/ directory
        if (isFr) {
            const navAbout = document.getElementById('nav-about');
            if (navAbout) navAbout.textContent = "À propos";
            
            const navProjects = document.getElementById('nav-projects');
            if (navProjects) navProjects.textContent = "Projets";
            
            // Footer translations
            const footerStatus = document.getElementById('footer-status');
            if (footerStatus) footerStatus.textContent = "Système En Ligne & Sécurisé";
            
            const footerRole = document.getElementById('footer-role');
            if (footerRole) footerRole.textContent = "Analyste Sécurité";

            // Language switch links back to English page
            const langToggle = document.getElementById('lang-toggle');
            if (langToggle) {
                langToggle.textContent = "EN";
                langToggle.setAttribute('href', `../${currentPath}`);
            }
        } else {
            // Language switch links to French page
            const langToggle = document.getElementById('lang-toggle');
            if (langToggle) {
                langToggle.textContent = "FR";
                langToggle.setAttribute('href', `fr/${currentPath}`);
            }
        }

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            let isActive = false;

            // Direct route match
            if (currentPath === href) {
                isActive = true;
            } 
            // Sub-route match
            else if (currentPath !== 'index.html' && currentPath !== '') {
                const mainResource = href.split('.')[0]; 
                if (currentPath.startsWith(mainResource) && mainResource !== 'index') {
                    isActive = true;
                }
                // Highlight Projects for any individual project page
                const projectPages = ['sentinel.html', 'marauder.html', 'vova.html', 'scanner.html', 'hids.html', 'trek.html', 'template-project.html'];
                if (mainResource === 'projects' && projectPages.includes(currentPath)) {
                    isActive = true;
                }
            }

            // Apply Active Minimalist Styling
            if (isActive) {
                // Ignore the button-styled contact link
                if (!link.classList.contains('bg-white')) {
                    link.classList.remove('text-neutral-400', 'hover:text-white');
                    link.classList.add('text-white', 'font-semibold');
                }
            }
        });
    }
});

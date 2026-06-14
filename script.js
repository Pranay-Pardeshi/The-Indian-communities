/**
 * Phase 2 Logic: Dynamic Data Injection
 */
const timelineData = [
    {
        id: "checkpoint-1",
        title: "The Indigenous Era",
        desc: "Ancient roots in the coastal regions, establishing a legacy of salt-making, agriculture, and fishing along the Arabian Sea."
    },
    {
        id: "checkpoint-2",
        title: "The Chirner Andolan",
        desc: "Participation in the 1930 anti-colonial Forest Satyagraha, marking a significant contribution to India's independence movement."
    },
    {
        id: "checkpoint-3",
        title: "The Urbanization Shift",
        desc: "Adapting to the rapid late 20th-century transition and urbanization of Mumbai and Navi Mumbai while striving to retain cultural identity."
    },
    {
        id: "checkpoint-4",
        title: "The Modern Reality",
        desc: "Current initiatives focused on cultural preservation, documenting oral histories, and keeping the Agri Masala and traditional festivals alive."
    }
];

document.addEventListener("DOMContentLoaded", () => {
    // 1. Inject timeline data (Phase 2)
    timelineData.forEach(item => {
        const container = document.getElementById(item.id);
        if (container) {
            const titleEl = container.querySelector('.checkpoint-title');
            const descEl = container.querySelector('.checkpoint-desc');
            
            if (titleEl) titleEl.textContent = item.title;
            if (descEl) descEl.textContent = item.desc;
        }
    });
    console.log("Virasat Archive Phase 2 initialized: Timeline data injected successfully.");

    // 2. Wikipedia API Integration Pipeline (Phase 3)
    fetch('https://en.wikipedia.org/api/rest_v1/page/summary/Agri_(caste)')
        .then(response => response.json())
        .then(data => {
            const leadText = document.querySelector('.lead-text');
            if (leadText && data.extract) {
                // Clear existing text and append API text
                leadText.innerHTML = `${data.extract} <br><br><small>Source: <a href="https://en.wikipedia.org/wiki/Agri_(caste)" target="_blank" style="color: var(--color-saffron); text-decoration: none;">Wikipedia Contributors</a></small>`;
            }
        })
        .catch(err => console.error("Failed to fetch Wikipedia data:", err));

    // 3. Exit-Intent Detection Engine (Phase 3)
    const exitModal = document.getElementById('exit-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const form = document.getElementById('contribution-form');
    const successMsg = document.getElementById('form-success-msg');
    
    // Accessibility focus trap variables
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    let firstFocusableElement;
    let lastFocusableElement;

    function openModal() {
        exitModal.style.display = 'flex';
        exitModal.setAttribute('aria-hidden', 'false');
        
        // Setup focus trap
        const focusableContent = exitModal.querySelectorAll(focusableElements);
        if (focusableContent.length > 0) {
            firstFocusableElement = focusableContent[0];
            lastFocusableElement = focusableContent[focusableContent.length - 1];
            firstFocusableElement.focus();
        }
    }

    function closeModal() {
        exitModal.style.display = 'none';
        exitModal.setAttribute('aria-hidden', 'true');
    }

    document.addEventListener("mouseleave", (e) => {
        if (e.clientY < 0) {
            if (!sessionStorage.getItem('hasSeenExitModal')) {
                openModal();
                sessionStorage.setItem('hasSeenExitModal', 'true');
            }
        }
    });

    closeModalBtn.addEventListener('click', closeModal);

    // Trap Focus inside modal
    document.addEventListener('keydown', function(e) {
        if (exitModal.style.display !== 'none') {
            let isTabPressed = e.key === 'Tab' || e.keyCode === 9;
            
            if (e.key === 'Escape') {
                closeModal();
            }

            if (!isTabPressed) {
                return;
            }

            if (e.shiftKey) { // if shift key pressed for shift + tab combination
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus(); // add focus for the last focusable element
                    e.preventDefault();
                }
            } else { // if tab key is pressed
                if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
                    firstFocusableElement.focus(); // add focus for the first focusable element
                    e.preventDefault();
                }
            }
        }
    });

    // 4. Local Database Caching Engine (Phase 3)
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('contributor-name').value;
        const legend = document.getElementById('community-info').value;
        const story = document.getElementById('deep-story').value;

        const newContribution = {
            id: Date.now(),
            name,
            legend,
            story,
            date: new Date().toISOString()
        };

        // Cache to LocalStorage
        const existingContributions = JSON.parse(localStorage.getItem('userContributions')) || [];
        existingContributions.push(newContribution);
        localStorage.setItem('userContributions', JSON.stringify(existingContributions));

        // Show Success and Auto-close
        form.querySelectorAll('.form-group, .submit-btn').forEach(el => el.style.display = 'none');
        successMsg.style.display = 'block';

        setTimeout(() => {
            closeModal();
            // Reset form for future sessions if needed
            form.reset();
            form.querySelectorAll('.form-group, .submit-btn').forEach(el => el.style.display = 'block');
            successMsg.style.display = 'none';
        }, 2000);
    });

    // 5. The Tab Switching Engine (Phase 4)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Hide all panels
            tabPanels.forEach(p => p.classList.remove('active-panel'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            // Show target panel
            const targetId = btn.getAttribute('data-target');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active-panel');
            }
        });
    });

    // 6. Cinematic Intersection Observer (Phase 4)
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    observer.unobserve(entry.target); // Play once
                }
            });
        };

        const scrollObserver = new IntersectionObserver(revealCallback, observerOptions);
        
        const scrollElements = document.querySelectorAll('.scroll-reveal');
        scrollElements.forEach(el => scrollObserver.observe(el));
    } else {
        // Fallback for unsupported browsers
        const scrollElements = document.querySelectorAll('.scroll-reveal');
        scrollElements.forEach(el => el.classList.add('reveal-visible'));
    }

    console.log("Virasat Archive Phase 4 initialized: Tab architecture and Intersection Observers online.");
});

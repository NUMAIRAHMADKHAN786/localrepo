// Roadmap Planner Application - Fixed Version
class RoadmapPlanner {
    constructor() {
        this.currentMonth = 1;
        this.progress = {
            months: {},
            overall: 0
        };
        
        // Initialize progress data structure
        this.initializeProgress();
        
        // Initialize immediately if DOM is ready, otherwise wait
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            // Small delay to ensure all elements are ready
            setTimeout(() => this.init(), 50);
        }
    }

    init() {
        console.log('🎯 Initializing Roadmap Planner...');
        
        try {
            // Initialize UI first
            this.initializeUI();
            
            // Bind events
            this.bindEvents();
            
            // Start animations
            this.startAnimations();
            
            console.log('✅ Roadmap Planner initialized successfully!');
            console.log('💡 Keyboard shortcuts: T (theme), 1-6 (months), D (demo)');
        } catch (error) {
            console.error('❌ Error initializing Roadmap Planner:', error);
        }
    }

    initializeProgress() {
        // Initialize progress for each month
        for (let i = 1; i <= 6; i++) {
            this.progress.months[i] = {
                completed: 0,
                total: i === 1 ? 7 : 6, // Month 1 has 7 days, others have 6 success criteria
                percentage: 0
            };
        }
    }

    initializeUI() {
        // Set initial theme
        const savedTheme = this.getPreferredTheme();
        document.body.setAttribute('data-theme', savedTheme);
        console.log(`🎨 Initial theme set to: ${savedTheme}`);

        // Create success criteria for months 2-6
        this.createAllSuccessCriteria();

        // Update all progress displays
        this.updateAllProgress();

        // Ensure Month 1 is active
        this.showMonth(1);
    }

    createAllSuccessCriteria() {
        const monthsData = {
            2: {
                title: "MERN Stack Development",
                criteria: [
                    "Master React hooks and component patterns",
                    "Build RESTful APIs with Express.js", 
                    "Integrate MongoDB with Mongoose ODM",
                    "Implement JWT-based authentication",
                    "Deploy full-stack application to production",
                    "Demonstrate testing and quality assurance practices"
                ]
            },
            3: {
                title: "TypeScript & Next.js Mastery",
                criteria: [
                    "Master TypeScript type system and advanced features",
                    "Build production-ready Next.js applications",
                    "Implement server-side rendering and static generation", 
                    "Create type-safe full-stack applications",
                    "Deploy scalable Next.js applications to production",
                    "Demonstrate advanced JavaScript/TypeScript proficiency"
                ]
            },
            4: {
                title: "System Design & CSS Frameworks",
                criteria: [
                    "Master system design principles and patterns",
                    "Design scalable, high-availability systems",
                    "Implement advanced CSS frameworks and methodologies",
                    "Build production-ready full-stack application", 
                    "Demonstrate system architecture and design skills",
                    "Create comprehensive documentation and testing"
                ]
            },
            5: {
                title: "DevOps & AI-Powered Development",
                criteria: [
                    "Master Docker containerization and orchestration",
                    "Implement complete CI/CD pipelines",
                    "Deploy applications to Kubernetes clusters",
                    "Integrate AI tools into development workflow",
                    "Create infrastructure as code templates", 
                    "Establish monitoring and security automation"
                ]
            },
            6: {
                title: "DSA Mastery & Interview Preparation",
                criteria: [
                    "Master fundamental data structures and algorithms",
                    "Solve 200+ coding problems across all difficulty levels",
                    "Pass technical and behavioral interview simulations",
                    "Create professional portfolio with 4 major projects",
                    "Build professional network and industry connections",
                    "Demonstrate job-readiness through comprehensive assessment"
                ]
            }
        };

        // Create success criteria for each month
        for (let monthId = 2; monthId <= 6; monthId++) {
            const monthDetail = document.getElementById(`month-${monthId}`);
            const comingSoon = monthDetail ? monthDetail.querySelector('.coming-soon') : null;
            
            if (monthDetail && comingSoon && monthsData[monthId]) {
                const successSection = document.createElement('div');
                successSection.className = 'success-criteria';
                successSection.innerHTML = `
                    <h3 class="section-title">Success Criteria</h3>
                    <div class="criteria-grid">
                        ${monthsData[monthId].criteria.map((criterion, index) => `
                            <div class="criterion-item" data-month="${monthId}" data-criterion="${index}">
                                <div class="criterion-checkbox">
                                    <input type="checkbox" id="month-${monthId}-criterion-${index}" class="criterion-input">
                                    <label for="month-${monthId}-criterion-${index}" class="criterion-checkbox-label">
                                        <div class="criterion-checkbox-custom"></div>
                                    </label>
                                </div>
                                <div class="criterion-content">
                                    <div class="criterion-icon">🎯</div>
                                    <span>${criterion}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
                
                monthDetail.replaceChild(successSection, comingSoon);
                console.log(`✅ Created success criteria for Month ${monthId}`);
            }
        }
    }

    bindEvents() {
        // Theme toggle with better error handling
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            // Remove any existing listeners
            themeToggle.onclick = null;
            
            // Add new listener
            themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleTheme();
            });
            console.log('✅ Theme toggle bound');
        } else {
            console.error('❌ Theme toggle button not found');
        }

        // Month navigation
        const monthNavItems = document.querySelectorAll('.month-nav-item');
        console.log(`Found ${monthNavItems.length} month navigation items`);
        
        monthNavItems.forEach((item, index) => {
            const monthId = parseInt(item.dataset.month) || (index + 1);
            
            // Remove existing listeners
            item.onclick = null;
            
            // Add new listener
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`🖱️ Clicked month ${monthId}`);
                this.switchMonth(monthId);
            });
        });

        // Day checkboxes for Month 1
        const dayInputs = document.querySelectorAll('.day-input');
        dayInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                this.handleDayCompletion(e.target);
            });
        });

        // Success criteria checkboxes for months 2-6
        this.bindCriteriaCheckboxes();

        console.log('✅ All events bound successfully');
    }

    bindCriteriaCheckboxes() {
        const criterionInputs = document.querySelectorAll('.criterion-input');
        criterionInputs.forEach(input => {
            const monthId = parseInt(input.id.split('-')[1]);
            input.addEventListener('change', (e) => {
                this.handleCriterionCompletion(e.target, monthId);
            });
        });
    }

    getPreferredTheme() {
        const saved = localStorage.getItem('roadmap-theme');
        if (saved) return saved;
        
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return systemPrefersDark ? 'dark' : 'light';
    }

    toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        console.log(`🎨 Switching theme from ${currentTheme} to ${newTheme}`);
        
        // Save preference
        localStorage.setItem('roadmap-theme', newTheme);
        
        // Apply transition
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        document.body.setAttribute('data-theme', newTheme);
        
        // Animate theme toggle button
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.style.transform = 'scale(0.8) rotate(180deg)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1) rotate(0deg)';
            }, 200);
        }
        
        // Remove transition after animation
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
        
        console.log(`✅ Theme switched to ${newTheme}`);
    }

    showMonth(monthId) {
        // Hide all months
        for (let i = 1; i <= 6; i++) {
            const monthDetail = document.getElementById(`month-${i}`);
            if (monthDetail) {
                monthDetail.classList.remove('active');
                monthDetail.style.display = 'none';
            }
        }
        
        // Show target month
        const targetMonth = document.getElementById(`month-${monthId}`);
        if (targetMonth) {
            targetMonth.style.display = 'block';
            targetMonth.classList.add('active');
        }
        
        // Update navigation
        document.querySelectorAll('.month-nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const targetNavItem = document.querySelector(`.month-nav-item[data-month="${monthId}"]`);
        if (targetNavItem) {
            targetNavItem.classList.add('active');
        }
    }

    switchMonth(monthId) {
        if (monthId === this.currentMonth) {
            console.log(`Already on month ${monthId}`);
            return;
        }

        console.log(`📍 Switching from Month ${this.currentMonth} to Month ${monthId}`);

        const currentMonthDetail = document.getElementById(`month-${this.currentMonth}`);
        const newMonthDetail = document.getElementById(`month-${monthId}`);

        if (!currentMonthDetail || !newMonthDetail) {
            console.error(`❌ Month elements not found: current=${!!currentMonthDetail}, new=${!!newMonthDetail}`);
            return;
        }

        // Animate transition
        currentMonthDetail.style.opacity = '0';
        currentMonthDetail.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            // Hide current and show new
            this.showMonth(monthId);
            
            // Animate new month in
            newMonthDetail.style.opacity = '0';
            newMonthDetail.style.transform = 'translateX(20px)';
            
            requestAnimationFrame(() => {
                newMonthDetail.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                newMonthDetail.style.opacity = '1';
                newMonthDetail.style.transform = 'translateX(0)';
                
                setTimeout(() => {
                    newMonthDetail.style.transition = '';
                }, 400);
            });
        }, 200);

        // Add ripple effect
        const targetNavItem = document.querySelector(`.month-nav-item[data-month="${monthId}"]`);
        if (targetNavItem) {
            this.addRippleEffect(targetNavItem);
        }

        this.currentMonth = monthId;
        console.log(`✅ Successfully switched to Month ${monthId}`);
    }

    handleDayCompletion(input) {
        const dayCard = input.closest('.day-card');
        const dayId = parseInt(dayCard.dataset.day);
        
        if (input.checked) {
            dayCard.classList.add('completed');
            this.progress.months[1].completed++;
            this.triggerCelebration();
            
            dayCard.style.transform = 'scale(1.02)';
            setTimeout(() => {
                dayCard.style.transform = '';
            }, 200);
        } else {
            dayCard.classList.remove('completed');
            this.progress.months[1].completed = Math.max(0, this.progress.months[1].completed - 1);
        }

        this.updateProgress(1);
        this.updateWeekProgress();
        this.updateOverallProgress();
        
        console.log(`✅ Day ${dayId} ${input.checked ? 'completed' : 'unchecked'} - Progress: ${this.progress.months[1].completed}/${this.progress.months[1].total}`);
    }

    handleCriterionCompletion(input, monthId) {
        const criterionItem = input.closest('.criterion-item');
        
        if (input.checked) {
            criterionItem.classList.add('completed');
            this.progress.months[monthId].completed++;
            this.triggerCelebration();
            
            criterionItem.style.transform = 'scale(1.02)';
            setTimeout(() => {
                criterionItem.style.transform = '';
            }, 200);
        } else {
            criterionItem.classList.remove('completed');
            this.progress.months[monthId].completed = Math.max(0, this.progress.months[monthId].completed - 1);
        }

        this.updateProgress(monthId);
        this.updateOverallProgress();
        
        console.log(`✅ Month ${monthId} criterion ${input.checked ? 'completed' : 'unchecked'} - Progress: ${this.progress.months[monthId].completed}/${this.progress.months[monthId].total}`);
    }

    updateProgress(monthId) {
        const monthData = this.progress.months[monthId];
        monthData.percentage = monthData.total > 0 ? (monthData.completed / monthData.total) * 100 : 0;

        // Update month progress ring
        const navItem = document.querySelector(`.month-nav-item[data-month="${monthId}"]`);
        if (navItem) {
            const progressRing = navItem.querySelector('.month-ring-progress');
            if (progressRing) {
                const circumference = 100.53;
                const offset = circumference - (monthData.percentage / 100) * circumference;
                progressRing.style.strokeDashoffset = offset;
                progressRing.style.transition = 'stroke-dashoffset 0.5s ease';
            }
        }

        console.log(`📊 Month ${monthId} progress: ${Math.round(monthData.percentage)}%`);
    }

    updateWeekProgress() {
        const weekProgressBar = document.querySelector('.progress-bar-fill');
        const progressText = document.querySelector('.week-progress-bar .progress-text');
        
        if (weekProgressBar && progressText) {
            const completed = this.progress.months[1].completed;
            const total = this.progress.months[1].total;
            const percentage = total > 0 ? (completed / total) * 100 : 0;
            
            weekProgressBar.style.width = `${percentage}%`;
            progressText.textContent = `${completed}/${total} days`;
        }
    }

    updateOverallProgress() {
        let totalCompleted = 0;
        let totalTasks = 0;

        Object.values(this.progress.months).forEach(month => {
            totalCompleted += month.completed;
            totalTasks += month.total;
        });

        this.progress.overall = totalTasks > 0 ? (totalCompleted / totalTasks) * 100 : 0;

        // Update overall progress ring with animation
        const progressRing = document.querySelector('.progress-ring-progress');
        const progressPercentage = document.getElementById('overallProgress');
        
        if (progressRing && progressPercentage) {
            const circumference = 326.73;
            const offset = circumference - (this.progress.overall / 100) * circumference;
            
            progressRing.style.transition = 'stroke-dashoffset 0.8s ease';
            progressRing.style.strokeDashoffset = offset;
            progressPercentage.textContent = `${Math.round(this.progress.overall)}%`;
        }
        
        console.log(`📊 Overall progress updated: ${Math.round(this.progress.overall)}% (${totalCompleted}/${totalTasks})`);
    }

    updateAllProgress() {
        for (let i = 1; i <= 6; i++) {
            this.updateProgress(i);
        }
        this.updateWeekProgress();
        this.updateOverallProgress();
    }

    triggerCelebration() {
        const celebration = document.getElementById('celebration');
        if (!celebration) return;
        
        celebration.innerHTML = '';
        
        const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
        const confettiCount = 25;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (Math.random() * 1 + 2) + 's';
            
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            }
            
            celebration.appendChild(confetti);
        }
        
        setTimeout(() => {
            celebration.innerHTML = '';
        }, 3000);
    }

    addRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: 50%;
            top: 50%;
            width: 20px;
            height: 20px;
            margin: -10px 0 0 -10px;
            pointer-events: none;
            z-index: 1;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 600);
    }

    startAnimations() {
        // Add loading animation
        setTimeout(() => this.addLoadingAnimation(), 100);
        
        // Add subtle animations
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.style.animation = 'breathe 4s ease-in-out infinite';
        }
    }

    addLoadingAnimation() {
        const animatedElements = document.querySelectorAll('.day-card, .criterion-item');
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 30);
        });
    }

    // Utility methods
    simulateProgress() {
        const currentMonthElement = document.getElementById(`month-${this.currentMonth}`);
        if (!currentMonthElement) return;
        
        const uncheckedInputs = currentMonthElement.querySelectorAll('input[type="checkbox"]:not(:checked)');
        
        if (uncheckedInputs.length > 0) {
            const randomInput = uncheckedInputs[Math.floor(Math.random() * uncheckedInputs.length)];
            randomInput.checked = true;
            randomInput.dispatchEvent(new Event('change'));
            console.log('🎲 Simulated progress for current month');
        } else {
            console.log('🎯 All tasks completed in current month!');
        }
    }

    getProgressSummary() {
        return {
            overall: this.progress.overall,
            months: this.progress.months,
            currentMonth: this.currentMonth
        };
    }
}

// Enhanced CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes breathe {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes checkmark {
        0% { transform: scale(0) rotate(45deg); }
        50% { transform: scale(1.2) rotate(45deg); }
        100% { transform: scale(1) rotate(0deg); }
    }
    
    .criterion-checkbox {
        position: relative;
        flex-shrink: 0;
        margin-right: 12px;
    }
    
    .criterion-input {
        opacity: 0;
        position: absolute;
        width: 20px;
        height: 20px;
        cursor: pointer;
        z-index: 2;
    }
    
    .criterion-checkbox-custom {
        width: 20px;
        height: 20px;
        border: 2px solid var(--color-border);
        border-radius: 4px;
        background: var(--color-surface);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }
    
    .criterion-input:checked + .criterion-checkbox-label .criterion-checkbox-custom {
        background: var(--color-success);
        border-color: var(--color-success);
        transform: scale(1.1);
    }
    
    .criterion-input:checked + .criterion-checkbox-label .criterion-checkbox-custom::after {
        content: '✓';
        color: white;
        font-weight: bold;
        font-size: 12px;
        animation: checkmark 0.3s ease-in-out;
    }
    
    .criterion-content {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        flex: 1;
    }
    
    .criterion-item.completed {
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(52, 211, 153, 0.05));
        border-color: var(--color-success);
    }
    
    .month-detail {
        display: none;
    }
    
    .month-detail.active {
        display: block;
    }
`;
document.head.appendChild(style);

// Global initialization and event handlers
let app;

const initializeApp = () => {
    try {
        app = new RoadmapPlanner();
        window.roadmapApp = app;
        
        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (!app) return;
            
            if (e.key.toLowerCase() === 't' && !e.target.matches('input, textarea')) {
                e.preventDefault();
                app.toggleTheme();
            }
            
            if (e.key >= '1' && e.key <= '6' && !e.target.matches('input, textarea')) {
                e.preventDefault();
                app.switchMonth(parseInt(e.key));
            }
            
            if (e.key.toLowerCase() === 'd' && !e.target.matches('input, textarea')) {
                e.preventDefault();
                app.simulateProgress();
            }
        });
        
    } catch (error) {
        console.error('❌ Failed to initialize app:', error);
    }
};

// Initialize when ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Performance monitoring
window.addEventListener('load', () => {
    if ('performance' in window) {
        const loadTime = performance.now();
        console.log(`🚀 App loaded in ${Math.round(loadTime)}ms`);
    }
});
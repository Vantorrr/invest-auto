// Debug: Script loaded
console.log('🚀 SCRIPT LOADED! Version 6 - КРАСИВЫЙ ТЕКСТ СТРАТЕГИИ!');
console.log('🕐 Time:', new Date().toLocaleString());

// Modal functionality
function openModal() {
    document.getElementById('modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.body.style.overflow = 'auto';
    // Close any open selects
    closeAllSelects();
}

// Custom Select functionality
function toggleSelect(selectName) {
    const trigger = document.querySelector(`#${selectName}-options`).previousElementSibling;
    const options = document.getElementById(`${selectName}-options`);
    
    // Close other selects
    closeAllSelects(selectName);
    
    // Toggle current select
    trigger.classList.toggle('active');
    options.classList.toggle('active');
}

function selectOption(selectName, value, text) {
    console.log(`🚀 selectOption called with:`, { selectName, value, text });
    
    const hiddenInput = document.getElementById(selectName);
    console.log(`🔍 Found hidden input:`, hiddenInput);
    
    const trigger = document.querySelector(`#${selectName}-options`).previousElementSibling;
    const selectText = trigger.querySelector('.select-text');
    const options = document.getElementById(`${selectName}-options`);
    
    // Debug: Log selection
    console.log(`🎯 Selected ${selectName}:`, { value, text });
    
    // Update hidden input value
    hiddenInput.value = value;
    console.log(`🔥 AFTER SETTING - ${selectName} input value:`, hiddenInput.value);
    console.log(`🔥 AFTER SETTING - ${selectName} input name:`, hiddenInput.name);
    
    // Debug: Confirm value was set
    console.log(`✅ ${selectName} input value:`, hiddenInput.value);
    
    // Update displayed text
    selectText.textContent = text;
    selectText.classList.remove('placeholder');
    
    // Force form to recognize the change
    hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
    
    // Update selected option styling
    const allOptions = options.querySelectorAll('.option');
    allOptions.forEach(opt => opt.classList.remove('selected'));
    
    const selectedOption = [...allOptions].find(opt => opt.textContent.trim() === text);
    if (selectedOption) {
        selectedOption.classList.add('selected');
    }
    
    // Close select
    trigger.classList.remove('active');
    options.classList.remove('active');
}

function closeAllSelects(except = null) {
    const allTriggers = document.querySelectorAll('.select-trigger');
    const allOptions = document.querySelectorAll('.select-options');
    
    allTriggers.forEach((trigger, index) => {
        const options = allOptions[index];
        if (options && options.id !== `${except}-options`) {
            trigger.classList.remove('active');
            options.classList.remove('active');
        }
    });
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        closeModal();
    }
    
    // Close selects when clicking outside
    if (!event.target.closest('.custom-select')) {
        closeAllSelects();
    }
}

// FAQ functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});


// Form submission
function submitForm(event) {
    event.preventDefault();
    
    console.log('🚀 submitForm called with event.target:', event.target);
    
    // MANUALLY GET VALUES to bypass FormData issue
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const investment = document.getElementById('investment').value;
    const strategyValue = document.getElementById('strategy').value;
    
    // Convert strategy value to readable text
    const strategyMap = {
        'rent': 'Аренда ТС',
        'buyout': 'Выкуп ТС',
        'both': 'Рассмотрю обе'
    };
    const strategy = strategyMap[strategyValue] || 'Не указана';
    
    console.log('🔧 MANUAL VALUE COLLECTION:');
    console.log(`  name: "${name}"`);
    console.log(`  phone: "${phone}"`);
    console.log(`  investment: "${investment}"`);
    console.log(`  strategyValue: "${strategyValue}"`);
    console.log(`  strategy (text): "${strategy}"`);
    
    // Create data object manually
    const data = {
        name: name,
        phone: phone,
        investment: investment,
        strategy: strategy
    };
    
    console.log('📊 Manual data object:', data);
    
    // Also try FormData for comparison
    const formData = new FormData(event.target);
    console.log('📦 FormData created:', formData);
    
    // Log all FormData entries
    console.log('📋 FormData entries:');
    for (let [key, value] of formData.entries()) {
        console.log(`  ${key}: "${value}" (length: ${value.length})`);
    }
    
    const formDataObj = Object.fromEntries(formData);
    console.log('📊 FormData object:', formDataObj);
    
    // Check all inputs in the form
    console.log('🔍 ALL FORM INPUTS:');
    const allInputs = event.target.querySelectorAll('input, select, textarea');
    allInputs.forEach(input => {
        console.log(`  ${input.name || input.id}: "${input.value}" (type: ${input.type})`);
    });
    
    // Use manual data (which should have strategy)
    console.log('✅ Using MANUAL data for Telegram');
    
    // Close modal and show success animation
    closeModal();
    showSuccessAnimation();
    
    // Send to Telegram with manual data
    sendToTelegram(data);
}

function showSuccessAnimation() {
    const successDiv = document.getElementById('successAnimation');
    successDiv.style.display = 'flex';
    
    // Play GTA sound effect (if available)
    playGTASound();
    
    // Hide after 8 seconds (longer to enjoy the epic animation)
    setTimeout(() => {
        successDiv.style.display = 'none';
    }, 8000);
}

// GTA Success Sound
function playGTASound() {
    try {
        // Create audio context for GTA-style success sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create oscillator for success beep
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // GTA-style success sound pattern
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
        
        console.log('🎵 GTA Success sound played!');
    } catch (error) {
        console.log('🎵 GTA Sound not available');
    }
}

// Telegram integration
function sendToTelegram(data) {
    const botToken = '7966772119:AAH7Xoo1Vd8HcsI7_8itPavwYA2bBpZubt4';
    const chatId = '-1002542142410';
    
    // Debug: Show what data we're working with
    console.log('📱 Sending to Telegram:', data);
    
    const message = `
🎯 Новая заявка на инвестиции!

👤 Имя: ${data.name || 'Не указано'}
📞 Телефон: ${data.phone || 'Не указан'}
💰 Сумма инвестиций: ${data.investment || 'Не указана'}
📊 Стратегия: ${data.strategy || 'Не указана'}

🕐 Время: ${new Date().toLocaleString('ru-RU')}
    `;
    
    // Debug: Show final message
    console.log('📨 Message to send:', message);
    
    // Send to Telegram
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML'
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('✅ Заявка отправлена в Telegram:', data);
        if (data.ok) {
            console.log('🎯 Сообщение успешно доставлено!');
        } else {
            console.error('❌ Telegram API Error:', data);
        }
    })
    .catch(error => {
        console.error('❌ Ошибка отправки в Telegram:', error);
    });
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.advantage-item, .step-item, .case-card, .faq-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const numericTarget = parseInt(target);
        
        if (!isNaN(numericTarget)) {
            let current = 0;
            const increment = numericTarget / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericTarget) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + (target.includes('%') ? '%' : '');
                }
            }, 20);
        }
    });
}

// Trigger counter animation when statistics section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.statistics');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Form validation
function validateForm() {
    console.log('🔍 validateForm called!');
    
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const strategy = document.getElementById('strategy').value.trim();
    
    console.log('📋 Validation values:', { name, phone, strategy });
    console.log('📊 Strategy value details:', { 
        value: strategy, 
        length: strategy.length, 
        isEmpty: strategy === '',
        isFalsy: !strategy 
    });
    
    if (!name) {
        console.log('❌ Name validation failed');
        alert('Пожалуйста, введите ваше имя');
        return false;
    }
    
    if (!phone) {
        console.log('❌ Phone validation failed');
        alert('Пожалуйста, введите номер телефона');
        return false;
    }
    
    // Basic phone validation
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,}$/;
    if (!phoneRegex.test(phone)) {
        console.log('❌ Phone format validation failed');
        alert('Пожалуйста, введите корректный номер телефона');
        return false;
    }
    
    // Strategy validation
    if (!strategy || strategy === '') {
        console.log('❌ Strategy validation failed - no strategy selected');
        alert('Пожалуйста, выберите предпочитаемую стратегию');
        return false;
    }
    
    console.log('✅ ALL validation passed! Strategy:', strategy);
    return true;
}

// Enhanced form submission with validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('investorForm');
    if (form) {
        console.log('🎯 Form found, adding event listener');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('🛑 Form submission intercepted!');
            
            console.log('🔍 Before validation - checking strategy input...');
            const strategyInput = document.getElementById('strategy');
            console.log('📊 Strategy input element:', strategyInput);
            console.log('📊 Strategy current value:', strategyInput ? strategyInput.value : 'not found');
            
            if (validateForm()) {
                console.log('✅ Validation passed, calling submitForm');
                submitForm(e);
            } else {
                console.log('❌ Validation failed, form not submitted');
            }
        });
    } else {
        console.log('❌ Form NOT found!');
    }
});

// Add loading state to buttons
function setButtonLoading(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.style.opacity = '0.7';
        button.textContent = 'Отправка...';
    } else {
        button.disabled = false;
        button.style.opacity = '1';
        button.textContent = 'Отправить заявку';
    }
}

// Phone input formatting
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value.length <= 11) {
                    if (value.startsWith('8')) {
                        value = '7' + value.slice(1);
                    }
                    if (value.startsWith('7')) {
                        value = '+7 (' + value.slice(1, 4) + ') ' + value.slice(4, 7) + '-' + value.slice(7, 9) + '-' + value.slice(9, 11);
                    }
                }
            }
            
            e.target.value = value;
        });
        
        phoneInput.addEventListener('keydown', function(e) {
            // Allow backspace, delete, tab, escape, enter
            if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
                // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                (e.keyCode === 65 && e.ctrlKey === true) ||
                (e.keyCode === 67 && e.ctrlKey === true) ||
                (e.keyCode === 86 && e.ctrlKey === true) ||
                (e.keyCode === 88 && e.ctrlKey === true)) {
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
    }
});

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.case-card, .strategy-card, .advantage-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add click tracking for analytics (you can integrate with Google Analytics, etc.)
function trackEvent(category, action, label) {
    // Example for Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Track button clicks
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.cta-btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            trackEvent('User Engagement', 'Button Click', buttonText);
        });
    });
});

// Cookie consent (basic implementation)
function showCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
        // You can add a cookie consent banner here
        // For now, we'll just set it as accepted
        localStorage.setItem('cookieConsent', 'accepted');
    }
}

// Premium Preloader management
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Start progress animation
        animateProgress();
        
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.classList.add('loaded');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 1500);
        }, 3500); // Show preloader for 3.5 seconds minimum
    }
}

// Animate progress bar and percentage
function animateProgress() {
    const progressFill = document.querySelector('.progress-fill');
    const progressPercentage = document.querySelector('.progress-percentage');
    
    if (!progressFill || !progressPercentage) return;
    
    let progress = 0;
    const duration = 3000; // 3 seconds
    const interval = 50; // Update every 50ms
    const increment = 100 / (duration / interval);
    
    const timer = setInterval(() => {
        progress += increment;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(timer);
        }
        
        progressFill.style.width = progress + '%';
        progressPercentage.textContent = Math.floor(progress) + '%';
    }, interval);
}

// Enhanced success animation
function showSuccessAnimation() {
    const successDiv = document.getElementById('successAnimation');
    successDiv.style.display = 'flex';
    
    // Add golden rain effect
    createGoldenRain();
    
    // Play success sound (if available)
    playSuccessSound();
    
    // Hide after 5 seconds
    setTimeout(() => {
        successDiv.style.display = 'none';
    }, 5000);
}

// Create golden rain effect
function createGoldenRain() {
    const rainContainer = document.createElement('div');
    rainContainer.style.position = 'fixed';
    rainContainer.style.top = '0';
    rainContainer.style.left = '0';
    rainContainer.style.width = '100%';
    rainContainer.style.height = '100%';
    rainContainer.style.pointerEvents = 'none';
    rainContainer.style.zIndex = '10000';
    
    for (let i = 0; i < 50; i++) {
        const coin = document.createElement('div');
        coin.textContent = ['💰', '💵', '💎', '🏆', '⭐'][Math.floor(Math.random() * 5)];
        coin.style.position = 'absolute';
        coin.style.left = Math.random() * 100 + '%';
        coin.style.fontSize = Math.random() * 20 + 20 + 'px';
        coin.style.animationDuration = Math.random() * 3 + 2 + 's';
        coin.style.animationName = 'goldFall';
        coin.style.opacity = Math.random() * 0.8 + 0.2;
        
        rainContainer.appendChild(coin);
        
        setTimeout(() => {
            if (coin.parentNode) {
                coin.parentNode.removeChild(coin);
            }
        }, 5000);
    }
    
    document.body.appendChild(rainContainer);
    
    setTimeout(() => {
        if (rainContainer.parentNode) {
            rainContainer.parentNode.removeChild(rainContainer);
        }
    }, 5500);
}

// Play success sound (you can add actual sound files)
function playSuccessSound() {
    try {
        // You can add actual audio files here
        // const audio = new Audio('success-sound.mp3');
        // audio.play();
        console.log('🎵 Success sound played!');
    } catch (error) {
        console.log('Audio not available');
    }
}

// Enhanced particles effect
function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'floating-particles';
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '1';
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'var(--primary-gold)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `particleFloat ${Math.random() * 10 + 5}s linear infinite`;
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        
        particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(particlesContainer);
}

// Add premium startup sound effect
function playStartupSound() {
    try {
        // Create a simple beep sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
        
        console.log('🔊 Premium startup sound played!');
    } catch (error) {
        console.log('Audio not available');
    }
}

// Add typing effect to preloader text
function addTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;
    
    const originalText = 'Загружаем эксклюзивные возможности';
    typingText.textContent = '';
    
    let i = 0;
    const typeSpeed = 100;
    
    function typeWriter() {
        if (i < originalText.length) {
            typingText.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, typeSpeed);
        } else {
            // Hide cursor after typing is complete
            setTimeout(() => {
                typingText.style.setProperty('--cursor-display', 'none');
                typingText.classList.add('typing-complete');
            }, 1000);
        }
    }
    
    setTimeout(typeWriter, 500); // Start typing after 0.5s
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    showCookieConsent();
    createFloatingParticles();
    addTypingEffect();
    
    // Play startup sound after a short delay
    setTimeout(playStartupSound, 1000);
    
    // Add any other initialization code here
    console.log('🌟 Premium website initialized successfully!');
});

// Hide preloader when window loads
window.addEventListener('load', function() {
    hidePreloader();
});

// Steps Chain Animation
function initStepsChainAnimation() {
    const stepItems = document.querySelectorAll('.step-chain-item');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const stepsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const stepItem = entry.target;
                const stepNumber = stepItem.getAttribute('data-step');
                
                // Add entrance animation
                setTimeout(() => {
                    stepItem.style.opacity = '1';
                    stepItem.style.transform = 'translateY(0)';
                    
                    // Animate circle
                    const circle = stepItem.querySelector('.step-circle');
                    if (circle) {
                        circle.style.transform = 'scale(1)';
                        circle.style.animation = `stepFloat 4s ease-in-out infinite ${stepNumber * 0.2}s`;
                    }
                    
                    // Animate text box
                    const textBox = stepItem.querySelector('.step-text');
                    if (textBox) {
                        textBox.style.transform = 'translateY(0)';
                        textBox.style.opacity = '1';
                    }
                    
                    // Animate connector
                    const connector = stepItem.querySelector('.step-connector');
                    if (connector) {
                        setTimeout(() => {
                            connector.style.opacity = '0.7';
                            connector.style.transform = 'scaleX(1)';
                        }, 300);
                    }
                }, stepNumber * 150);
            }
        });
    }, observerOptions);
    
    // Set initial states and observe
    stepItems.forEach((item) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        
        const circle = item.querySelector('.step-circle');
        if (circle) {
            circle.style.transform = 'scale(0.8)';
        }
        
        const textBox = item.querySelector('.step-text');
        if (textBox) {
            textBox.style.transform = 'translateY(20px)';
            textBox.style.opacity = '0';
        }
        
        const connector = item.querySelector('.step-connector');
        if (connector) {
            connector.style.opacity = '0';
            connector.style.transform = 'scaleX(0)';
        }
        
        stepsObserver.observe(item);
    });
}

// Initialize steps chain animation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initStepsChainAnimation();
    initActiveMenuHighlight();
});

// Active Menu Highlight
function initActiveMenuHighlight() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call
}

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 
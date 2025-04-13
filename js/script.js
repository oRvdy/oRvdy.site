document.addEventListener('DOMContentLoaded', function() {
    const welcomeScreen = document.querySelector('.welcome-screen');
    const body = document.querySelector('body');
    
    setTimeout(function() {
        welcomeScreen.classList.add('welcome-hidden');
        body.classList.remove('blurred');
        body.classList.add('unblurred');
        
        const backgroundMusic = document.getElementById('background-music');
        backgroundMusic.play().catch(error => {
            console.warn('Autoplay foi bloqueado pelo navegador:', error);
            document.addEventListener('click', function playOnClick() {
                backgroundMusic.play();
                document.removeEventListener('click', playOnClick);
            }, { once: true });
        });
    }, 5000);
    
    setupSnowflakes();
    
    const aboutMeText = "Prompt engineer specializing in programming. I turn ideas into functional solutions effortlessly.";
    const aboutMeElement = document.querySelector('.about-me p');
    aboutMeElement.textContent = '';
    
    let charIndex = 0;
    
    function typeText() {
        if (charIndex < aboutMeText.length) {
            aboutMeElement.textContent += aboutMeText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 50); // Velocidade da digitação (ms)
        } else {
            aboutMeElement.classList.add('typing-done');
            
            setTimeout(function() {
                aboutMeElement.classList.remove('typing-done');
                aboutMeElement.classList.add('typing-complete');
            }, 2000);
        }
    }
    
    setTimeout(typeText, 5500);
    
    const card = document.querySelector('.card');
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        card.style.transform = 'translateY(-5px)';
        setTimeout(() => {
            card.style.transform = 'translateY(0)';
        }, 300);
    });
});

function setupSnowflakes() {
    const snowflakes = document.querySelectorAll('.snowflake');
    
    snowflakes.forEach(snowflake => {
        const startPositionX = Math.random() * 100;
        snowflake.style.left = startPositionX + '%';
        
        const size = (Math.random() * 1) + 0.5;
        snowflake.style.fontSize = size + 'em';
        
        const animationDuration = (Math.random() * 8) + 8;
        snowflake.style.animationDuration = animationDuration + 's';
        
        const animationDelay = Math.random() * 5;
        snowflake.style.animationDelay = animationDelay + 's';
    });
}

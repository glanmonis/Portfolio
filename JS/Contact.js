// ============================================
// CONTACT FORM HANDLER
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.send-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const formStatus = document.getElementById('formStatus');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim() || 'Not provided',
            message: document.getElementById('message').value.trim()
        };
        
        // Validate email
        if (!isValidEmail(formData.email)) {
            showStatus('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        btnText.textContent = 'Sending...';
        
        try {
            // Choose one of the methods below:
            // Method 1: EmailJS (Recommended - Free tier available)
            await sendWithEmailJS(formData);
            
            // Method 2: Formspree (Alternative)
            // await sendWithFormspree(formData);
            
            // Method 3: Web3Forms (Alternative)
            // await sendWithWeb3Forms(formData);
            
        } catch (error) {
            console.error('Error:', error);
            showStatus('Oops! Something went wrong. Please try again or email me directly.', 'error');
            submitBtn.classList.remove('loading', 'success');
            submitBtn.classList.add('error');
            btnText.textContent = 'Try Again';
            
            setTimeout(() => {
                submitBtn.classList.remove('error');
                submitBtn.disabled = false;
                btnText.textContent = 'Contact Us';
            }, 3000);
        }
    });
    
    // ============================================
    // METHOD 1: EmailJS (Recommended)
    // ============================================
    // Setup: https://www.emailjs.com/
    // 1. Create free account
    // 2. Add email service (Gmail, etc.)
    // 3. Create email template
    // 4. Get Service ID, Template ID, and Public Key
    
    async function sendWithEmailJS(data) {
        // Add EmailJS SDK to your HTML:
        // <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
        
        // Initialize EmailJS (add this in your HTML or here)
        emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your public key
        
        const templateParams = {
            from_name: data.name,
            from_email: data.email,
            phone: data.phone,
            message: data.message,
            to_email: "glanpritheshmonis@gmail.com"
        };
        
        const response = await emailjs.send(
            'YOUR_SERVICE_ID',    // Replace with your service ID
            'YOUR_TEMPLATE_ID',   // Replace with your template ID
            templateParams
        );
        
        if (response.status === 200) {
            handleSuccess();
        } else {
            throw new Error('Failed to send');
        }
    }
    
    // ============================================
    // METHOD 2: Formspree (Alternative)
    // ============================================
    // Setup: https://formspree.io/
    // 1. Create free account
    // 2. Create new form
    // 3. Get your form endpoint
    
    async function sendWithFormspree(data) {
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            handleSuccess();
        } else {
            throw new Error('Failed to send');
        }
    }
    
    // ============================================
    // METHOD 3: Web3Forms (Alternative)
    // ============================================
    // Setup: https://web3forms.com/
    // 1. Get free access key
    // 2. Add to form
    
    async function sendWithWeb3Forms(data) {
        const formData = new FormData();
        formData.append('access_key', 'YOUR_ACCESS_KEY'); // Replace with your key
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        formData.append('message', data.message);
        formData.append('subject', 'New Contact Form Submission');
        
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            handleSuccess();
        } else {
            throw new Error('Failed to send');
        }
    }
    
    // ============================================
    // Helper Functions
    // ============================================
    
    function handleSuccess() {
        // Show success state
        submitBtn.classList.remove('loading');
        submitBtn.classList.add('success');
        btnText.textContent = 'Message Sent!';
        
        showStatus('Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');
        
        // Reset form
        form.reset();
        
        // Reset button after 5 seconds
        setTimeout(() => {
            submitBtn.classList.remove('success');
            submitBtn.disabled = false;
            btnText.textContent = 'Contact Us';
        }, 5000);
    }
    
    function showStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = `form-status show ${type}`;
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            formStatus.classList.remove('show');
        }, 10000);
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});

// ============================================
// SIMPLE FALLBACK METHOD (No external service)
// ============================================
// This opens the user's email client with pre-filled data
// Uncomment to use this as a fallback

/*
function sendViaEmailClient(data) {
    const subject = encodeURIComponent(`Contact from ${data.name}`);
    const body = encodeURIComponent(
        `Name: ${data.name}\n` +
        `Email: ${data.email}\n` +
        `Phone: ${data.phone}\n\n` +
        `Message:\n${data.message}`
    );
    
    window.location.href = `mailto:glanpritheshmonis@gmail.com?subject=${subject}&body=${body}`;
    
    handleSuccess();
}
*/
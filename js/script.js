document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const closeMenu = document.getElementById('close-menu');
    const mainNav = document.getElementById('main-nav');
    const body = document.body;
    const navLinks = mainNav.querySelectorAll('a'); 

    function toggleSidebar() {
        mainNav.classList.toggle('active'); 
        body.classList.toggle('sidebar-open'); 

        const isActive = mainNav.classList.contains('active');
        hamburgerMenu.setAttribute('aria-expanded', isActive);
    }

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', toggleSidebar);
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', toggleSidebar); 
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            
            if (mainNav.classList.contains('active')) {
                toggleSidebar();
            }
        });
    });

    document.addEventListener('click', (event) => {
        
        if (mainNav.classList.contains('active') &&
            !mainNav.contains(event.target) &&
            !hamburgerMenu.contains(event.target)) {
            toggleSidebar();
        }
    });

     
     let previousScrollY = 0;
     const sidebarOpenObserver = new MutationObserver((mutations) => {
         mutations.forEach((mutation) => {
             if (mutation.attributeName === 'class') {
                 const targetElement = mutation.target;
                 if (targetElement.classList.contains('sidebar-open')) {
                     
                     previousScrollY = window.scrollY;
                     body.style.position = 'fixed';
                     body.style.top = `-${previousScrollY}px`;
                     body.style.width = '100%'; 
                 } else {
                     
                     body.style.position = '';
                     body.style.top = '';
                     body.style.width = '';
                     window.scrollTo(0, previousScrollY);
                 }
             }
         });
     });

     sidebarOpenObserver.observe(body, { attributes: true });
     

const $contactForm = $('#contactForm');
const $nama = $('#nama');
const $email = $('#email');
const $telepon = $('#telepon');
const $pesan = $('#pesan');
const $formStatus = $('#form-status'); 
function showError($field, $errorContainer, message) {
    $errorContainer.text(message).show(); 
    $field.addClass('input-error');      
}


function clearError($field, $errorContainer) {
    $errorContainer.text('').hide();    
    $field.removeClass('input-error'); 
}


function validateForm() {
    let isValid = true; 
    
    const namaVal = $nama.val().trim();
    const $namaError = $('#nama-error');
    clearError($nama, $namaError); 
    if (namaVal === '') {
        showError($nama, $namaError, 'Nama Lengkap wajib diisi.');
        isValid = false; 
    }

  
    const emailVal = $email.val().trim();
    const $emailError = $('#email-error');
    clearError($email, $emailError);
    if (emailVal === '') {
        showError($email, $emailError, 'Email wajib diisi.');
        isValid = false;
    } else if (emailVal.indexOf('@') === -1 || emailVal.indexOf('.') === -1) {
        
        showError($email, $emailError, 'Format email tidak valid.');
        isValid = false;
    }

    
    const teleponVal = $telepon.val().trim();
    const $teleponError = $('#telepon-error');
    const phoneOnlyDigitsRegex = /^\+?\d+$/; 
    clearError($telepon, $teleponError);
    if (teleponVal === '') {
        showError($telepon, $teleponError, 'Nomor Handphone wajib diisi.');
        isValid = false;
    } else if (!phoneOnlyDigitsRegex.test(teleponVal)) {
        
        showError($telepon, $teleponError, 'Nomor Handphone harus berupa angka.');
        isValid = false;
    }

   
    const pesanVal = $pesan.val().trim();
    const $pesanError = $('#pesan-error');
    clearError($pesan, $pesanError);
    if (pesanVal === '') {
        showError($pesan, $pesanError, 'Pesan wajib diisi.');
        isValid = false;
    }

    return isValid; 
}


$contactForm.on('submit', function(event) {
    
    event.preventDefault();

    $formStatus.text('').removeClass('success error').hide();

    
    if (validateForm()) {
        
        $formStatus.text('Mengirim data...').addClass('success').show();
        console.log('Form valid, data siap dikirim (gantilah dengan AJAX):');
        console.log({
            nama: $nama.val().trim(),
            email: $email.val().trim(),
            telepon: $telepon.val().trim(),
            pesan: $pesan.val().trim()
        });

        
        setTimeout(() => {
             $formStatus.text('Pesan Anda telah terkirim!').addClass('success').show();
             $contactForm[0].reset(); 
             $('.input-error').removeClass('input-error');
             $('.error-message').text('').hide();
        }, 1500);

    } else {
        
        $formStatus.text('Terdapat kesalahan pada isian formulir. Mohon periksa kembali.').addClass('error').show();
        console.log('Form validation failed.');
        
    }
});


$contactForm.find('input, textarea').on('input', function() {
    const $field = $(this);
    
    if ($field.hasClass('input-error')) {
        clearError($field, $field.siblings('.error-message'));
    }
    
    if ($formStatus.is(':visible')) {
         $formStatus.text('').removeClass('success error').hide();
    }
});


}); 


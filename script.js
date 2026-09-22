// ==========================================================================
// DESAINARA INTERACTIVE SCRIPTS
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. HEADER SCROLL EFFECT
  const header = document.getElementById('header');
  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. MOBILE DRAWER NAVIGATION
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  const openDrawer = () => {
    mobileDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    menuToggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    menuToggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (menuToggleBtn) menuToggleBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 3. SHOWCASE CAROUSEL
  const carouselTrack = document.getElementById('carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot-btn');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const slideTitle = document.getElementById('slide-title');
  const slideSubtitle = document.getElementById('slide-subtitle');

  let currentSlide = 2; // Default active matching Figma slide 3: "Konten Aesthetic & Klasik"
  let slideInterval = null;
  const slideCount = slides.length;

  const updateSlide = (index) => {
    if (index < 0) index = slideCount - 1;
    if (index >= slideCount) index = 0;
    currentSlide = index;

    // Slide track horizontally
    if (carouselTrack) {
      carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    // Update active class on slides
    slides.forEach((slide, idx) => {
      if (idx === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Update dots
    dots.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Update info overlay card text with subtle fade animation
    const activeSlideElem = slides[currentSlide];
    if (activeSlideElem && slideTitle && slideSubtitle) {
      slideTitle.style.opacity = '0';
      slideSubtitle.style.opacity = '0';
      setTimeout(() => {
        slideTitle.textContent = activeSlideElem.getAttribute('data-title') || 'Desain Kreatif';
        slideSubtitle.textContent = activeSlideElem.getAttribute('data-time') || 'Selesai dalam 2 hari kerja';
        slideTitle.style.opacity = '1';
        slideSubtitle.style.opacity = '1';
      }, 150);
    }
  };

  // Initialize position
  updateSlide(currentSlide);

  const nextSlide = () => {
    updateSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    updateSlide(currentSlide - 1);
  };

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      updateSlide(idx);
      resetAutoplay();
    });
  });

  // Autoplay functionality
  const startAutoplay = () => {
    slideInterval = setInterval(nextSlide, 4500);
  };

  const resetAutoplay = () => {
    if (slideInterval) clearInterval(slideInterval);
    startAutoplay();
  };

  startAutoplay();

  // Pause on hover
  const carouselContainer = document.getElementById('hero-carousel');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
      if (slideInterval) clearInterval(slideInterval);
    });
    carouselContainer.addEventListener('mouseleave', () => {
      resetAutoplay();
    });
  }

  // 4. TOUCH / SWIPE SUPPORT FOR CAROUSEL
  let touchStartX = 0;
  let touchEndX = 0;

  if (carouselContainer) {
    carouselContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  const handleSwipe = () => {
    const swipeThreshold = 40;
    if (touchEndX < touchStartX - swipeThreshold) {
      nextSlide();
      resetAutoplay();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      prevSlide();
      resetAutoplay();
    }
  };

  // 5. SMOOTH SCROLL FOR ANCHOR LINKS
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = 64;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 6. SERVICE PACKAGE MODAL
  const servicesPackageData = {
    poster: {
      title: "Poster / Flyer Digital",
      subtitle: "Pilihan 2 paket desain poster / flyer digital sesuai kebutuhan event, promosi, dan publikasi kamu.",
      packages: [
        {
          tier: "Signature",
          tierLabel: "Favorite🔥",
          badgeClass: "badge-signature",
          name: "Poster Kreatif",
          price: "Rp 20.000",
          image: "assets/desain poster.png",
          desc: "Ilustrasi dan layer detail agar cerita event/informasi tersampaikan utuh dalam satu visual",
          featured: true
        },
        {
          tier: "Populer",
          tierLabel: "Populer ★",
          badgeClass: "badge-populer",
          name: "Poster Iklan/Promosi",
          price: "Rp 20.000",
          image: "assets/mini ads poster.png",
          desc: "Produk tampil mewah, elemen minimalis, cocok untuk feed, story, atau mini ads.",
          featured: false
        },
      ]
    },
    idcard: {
      title: "Id Card & Lanyard",
      subtitle: "Pilihan 3 paket ID card dan lanyard custom untuk instansi, kepanitiaan, dan acara kamu.",
      packages: [
        {
          tier: "Signature",
          tierLabel: "Signature 🔥",
          badgeClass: "badge-signature",
          name: "Lanyard & ID card Desain",
          price: "Rp 20.000",
          image: "assets/paket id card & lanyard.png",
          desc: "Paket lengkap lanyard + ID card custom",
          featured: true
        },
        {
          tier: "Best",
          tierLabel: "Populer ★",
          badgeClass: "badge-populer",
          name: "Lanyard Desain",
          price: "Rp 10.000",
          image: "assets/only lanyard.png",
          desc: "Desain lanyard saja, konsultasi tema bebas",
          featured: false
        },
        {
          tier: "Starter",
          tierLabel: "Starter ⚡",
          badgeClass: "badge-starter",
          name: "ID card Desain",
          price: "Rp 10.000",
          image: "assets/only id card.png",
          desc: "Desain Id card saja, konsultasi tema bebas",
          featured: false
        }
      ]
    },
    logo: {
      title: "Desain Logo Brand",
      subtitle: "Pilihan 3 paket desain identitas visual logo untuk memperkuat branding bisnis kamu.",
      packages: [
        {
          tier: "Signature",
          tierLabel: "Signature 🔥",
          badgeClass: "badge-signature",
          name: "Signature Logo",
          price: "Rp 20.000",
          image: "assets/logo desain 3.png",
          desc: "Ilustrasi mascot detail, gaya karakter dan identitas brand premium",
          featured: true
        },
        {
          tier: "Populer",
          tierLabel: "Populer ★",
          badgeClass: "badge-populer",
          name: "Classic Logo",
          price: "Rp 10.000",
          image: "assets/logo desain 2.png",
          desc: "Badge & label elegan, cocok untuk brand kuliner atau usaha bisnis lainnya",
          featured: false
        },
        {
          tier: "Starter",
          tierLabel: "Starter ⚡",
          badgeClass: "badge-starter",
          name: "Minimalist Logo",
          price: "Rp 8.000",
          image: "assets/logo desain 1.png",
          desc: "Label minimalis yang cocok untuk usaha baru dan harganya yang terjangkau",
          featured: false
        }
      ]
    },
    konten: {
      title: "Konten Aesthetic",
      subtitle: "Pilihan 2 paket visual aesthetic untuk personal branding dan konten sosial media kamu.",
      packages: [
        {
          tier: "Signature",
          tierLabel: "Signature 🔥",
          badgeClass: "badge-signature",
          name: "Melodi Visual",
          price: "Rp 25.000",
          image: "assets/konten aesthetic 1.png",
          desc: "Visual konten aesthetic premium yang tren, siap publikasi",
          featured: true
        },
        {
          tier: "Populer",
          tierLabel: "Populer ★",
          badgeClass: "badge-populer",
          name: "Journey Desaign",
          price: "Rp 30.000",
          image: "assets/konten aesthetic 2.png",
          desc: "Konten journey seperti muncak, travelling, dan explore jadi lebih aesthetic",
          featured: false
        }
      ]
    }
  };

  const modalOverlay = document.getElementById('package-modal-overlay');
  const modalTitle = document.getElementById('modal-service-title');
  const modalDesc = document.getElementById('modal-service-desc');
  const modalPackageList = document.getElementById('modal-package-list');
  const modalCloseBtn = document.getElementById('package-modal-close');
  const modalSecondaryCloseBtn = document.getElementById('btn-modal-action-close');
  const viewPackageBtns = document.querySelectorAll('.btn-view-packages');

  const openPackageModal = (serviceKey) => {
    const service = servicesPackageData[serviceKey];
    if (!service || !modalOverlay || !modalPackageList) return;

    if (modalTitle) modalTitle.textContent = service.title;
    if (modalDesc) modalDesc.textContent = service.subtitle;

    // Render 3 mini cards
    modalPackageList.innerHTML = `
      <div class="package-grid">
        ${service.packages.map(pkg => {
      const waUrl = `https://wa.me/6285276652808?text=${encodeURIComponent(`Halo Desainara, saya ingin order ${service.title} - ${pkg.name} (${pkg.price})`)}`;
      return `
            <div class="package-mini-card ${pkg.featured ? 'featured' : ''}">
              <div class="package-mini-img-wrap">
                <img src="${pkg.image}" alt="${pkg.name} - ${service.title}" class="package-mini-img" loading="lazy">
                <span class="tier-badge ${pkg.badgeClass}">${pkg.tierLabel}</span>
              </div>
              <div class="package-mini-content">
                <h4 class="package-mini-name">${pkg.name}</h4>
                <p class="package-mini-desc">${pkg.desc}</p>
                <div class="package-mini-footer">
                  <span class="package-mini-price">${pkg.price}</span>
                  <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-package-order">
                    <img src="assets/icon-wa.svg" alt="" width="14" height="14" class="btn-icon-svg">
                    <span>Pilih Paket</span>
                  </a>
                </div>
              </div>
            </div>
          `;
    }).join('')}
      </div>
    `;

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closePackageModal = () => {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Attach button triggers
  viewPackageBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceKey = btn.getAttribute('data-service');
      if (serviceKey) openPackageModal(serviceKey);
    });
  });

  // Close handlers
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closePackageModal);
  if (modalSecondaryCloseBtn) modalSecondaryCloseBtn.addEventListener('click', closePackageModal);

  // Click outside modal container to close
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closePackageModal();
      }
    });
  }

  // Escape key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closePackageModal();
    }
  });
});

function updateJamOperasional() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const day = now.getDay(); // 0=Minggu, 1=Senin, ..., 6=Sabtu
  const currentMinutes = hour * 60 + minute;

  let isOpen = false;

  if (day >= 1 && day <= 5) {
    // Senin - Jumat: 08.00 - 21.00
    isOpen = currentMinutes >= (8 * 60) && currentMinutes < (21 * 60);
  } else if (day === 6) {
    // Sabtu: 09.00 - 18.00
    isOpen = currentMinutes >= (9 * 60) && currentMinutes < (18 * 60);
  } else {
    // Minggu: libur (ubah kalau ternyata buka)
    isOpen = false;
  }

  const dot = document.getElementById('statusDot');
  const text = document.getElementById('statusText');

  if (isOpen) {
    dot.classList.remove('offline');
    text.classList.remove('offline-text');
    text.textContent = 'Sedang aktif';
  } else {
    dot.classList.add('offline');
    text.classList.add('offline-text');
    text.textContent = 'Sedang tidak aktif';
  }
}

updateJamOperasional();
setInterval(updateJamOperasional, 60000); // cek ulang tiap 1 menit
/**
 * EMBER & ORIGIN Specialty Coffee Roastery
 * Interactive UI Engine: Navigation, Brewing Selector, Flavor Discovery, Wholesale Form, Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS Animation Library if available
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });
  }

  // Header scroll state and glass effect
  const navbar = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function handleScroll() {
    const scrollY = window.scrollY;
    
    // Header background change
    if (scrollY > 60) {
      navbar.classList.add('header-scrolled');
      navbar.classList.remove('header-transparent', 'py-3');
      navbar.classList.add('py-2');
    } else {
      navbar.classList.remove('header-scrolled', 'py-2');
      navbar.classList.add('header-transparent', 'py-3');
    }

    // Scroll spy for active navigation item
    let currentSectionId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 160;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    // Default to first section (hero) if near top
    if (!currentSectionId && scrollY < 300) {
      currentSectionId = 'hero';
    }

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    mobileLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // Mobile menu interactions
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      handleScroll();
      mobileMenu.classList.remove('translate-x-full');
      mobileMenu.classList.add('translate-x-0');
      document.body.style.overflow = 'hidden';
      mobileMenuToggle.setAttribute('aria-expanded', 'true');
    });
  }

  function closeMobileMenu() {
    if (mobileMenu) {
      mobileMenu.classList.add('translate-x-full');
      mobileMenu.classList.remove('translate-x-0');
      document.body.style.overflow = '';
      if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Brewing Methods Interactive Experience Data & Switcher
  const brewingMethods = {
    'pourover': {
      title: 'V60 Pour-Over Craft',
      subtitle: 'Clarity, delicate acidity, and articulate florality',
      ratio: '1:16 (15g coffee : 240g water)',
      grind: 'Medium-Fine (Sea Salt consistency)',
      temp: '93°C / 200°F (30s off boil)',
      time: '3:00 - 3:30 mins',
      tip: 'Perform a 45-second bloom with 45g of water. Swirl gently once to saturate all grounds evenly before executing steady concentric center pours.',
      notes: 'Reveals nuanced jasmine, bergamot, and sweet citrus notes in light roast single origins.',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop'
    },
    'frenchpress': {
      title: 'Immersion French Press',
      subtitle: 'Velvety body, deep cocoa sweetness, and textured finish',
      ratio: '1:14 (30g coffee : 420g water)',
      grind: 'Coarse (Kosher Salt consistency)',
      temp: '95°C / 203°F',
      time: '4:00 - 5:00 mins',
      tip: 'At 4 minutes, break the crust with a spoon and scoop off the top foam for an exceptionally clean cup with zero bitter sediment.',
      notes: 'Maximizes natural coffee oils and body. Perfect for our Sunrise Blend and chocolatey origins.',
      image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1200&auto=format&fit=crop'
    },
    'espresso': {
      title: 'Precision Espresso Extraction',
      subtitle: 'Concentrated syrupy crema, explosive aromatic depth',
      ratio: '1:2 (18.5g dry dose : 37g liquid out)',
      grind: 'Extra Fine (Micro-calibrated powder)',
      temp: '93.5°C / 200.3°F @ 9 Bars',
      time: '26 - 30 seconds',
      tip: 'Distribute grounds evenly using a WDT tool to eliminate micro-channeling. Tamp completely level with 25-30 lbs of uniform pressure.',
      notes: 'Produces a dense golden hazelnut crema with dark stone-fruit notes and rich melted baker’s chocolate.',
      image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=1200&auto=format&fit=crop'
    },
    'aeropress': {
      title: 'AeroPress Pressure Infusion',
      subtitle: 'Punchy vibrancy, round sweetness, and versatile clarity',
      ratio: '1:13 (16g coffee : 210g water)',
      grind: 'Medium-Fine',
      temp: '88°C / 190°F',
      time: '2:15 mins (Inverted method)',
      tip: 'Brew inverted. Stir vigorously for 10 seconds right after water contact, cap with rinsed paper filter, flip smoothly at 1:45, and press gently for 30s.',
      notes: 'Extremely forgiving, highlighting bright tropical fruit notes without over-extracting dry bitterness.',
      image: 'https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?q=80&w=1200&auto=format&fit=crop'
    }
  };

  const brewButtons = document.querySelectorAll('.brew-method-btn');
  const brewImage = document.getElementById('brew-image');
  const brewTitle = document.getElementById('brew-title');
  const brewSubtitle = document.getElementById('brew-subtitle');
  const brewRatio = document.getElementById('brew-ratio');
  const brewGrind = document.getElementById('brew-grind');
  const brewTemp = document.getElementById('brew-temp');
  const brewTime = document.getElementById('brew-time');
  const brewTip = document.getElementById('brew-tip');
  const brewNotes = document.getElementById('brew-notes');

  brewButtons.forEach(button => {
    button.addEventListener('click', () => {
      const methodKey = button.getAttribute('data-method');
      const data = brewingMethods[methodKey];
      if (!data) return;

      // Update button visual states
      brewButtons.forEach(btn => {
        btn.classList.remove('bg-espresso', 'text-cream', 'shadow-md', 'border-caramel');
        btn.classList.add('bg-white', 'text-espresso', 'border-stone-200');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('bg-espresso', 'text-cream', 'shadow-md');
      button.classList.remove('bg-white', 'text-espresso', 'border-stone-200');
      button.setAttribute('aria-selected', 'true');

      // Animate content change
      const targetCard = document.getElementById('brew-display-card');
      if (targetCard) {
        targetCard.style.opacity = '0.4';
        targetCard.style.transform = 'translateY(6px)';
        setTimeout(() => {
          if (brewTitle) brewTitle.textContent = data.title;
          if (brewSubtitle) brewSubtitle.textContent = data.subtitle;
          if (brewRatio) brewRatio.textContent = data.ratio;
          if (brewGrind) brewGrind.textContent = data.grind;
          if (brewTemp) brewTemp.textContent = data.temp;
          if (brewTime) brewTime.textContent = data.time;
          if (brewTip) brewTip.textContent = data.tip;
          if (brewNotes) brewNotes.textContent = data.notes;
          if (brewImage) brewImage.src = data.image;

          targetCard.style.opacity = '1';
          targetCard.style.transform = 'translateY(0)';
        }, 180);
      }
    });
  });

  // Coffee Tasting Notes and Flavor Discovery Interactive Selector
  const flavorFamilies = {
    'chocolate-nuts': {
      title: 'Chocolate & Roasted Nuts',
      subtitle: 'Comforting, rich, foundational sweetness',
      description: 'Foundational tones of high-elevation South and Central American coffees. Characterized by bittersweet cacao nibs, toasted hazelnut, praline, and warm roasted almond.',
      pairing: 'Signature Sunrise Blend & Colombian Nariño Estates',
      roastRecommendation: 'Medium to Medium-Dark Roasts',
      dominantNotes: ['Dark Cocoa', 'Toasted Hazelnut', 'Warm Praline', 'Malted Grain'],
      color: '#59382A'
    },
    'citrus-fruit': {
      title: 'Citrus, Stone Fruit & Berry',
      subtitle: 'Lively malic acidity and sun-ripened fruit vibrancy',
      description: 'Bright and articulate, derived from slow ripening at 1,900m+ altitudes. Crisp green apple, Bergamot orange, sun-dried strawberry, and succulent black cherry notes.',
      pairing: 'Ethiopia Yirgacheffe Washed & Kenyan Kirinyaga',
      roastRecommendation: 'Light to Light-Medium Roasts',
      dominantNotes: ['Bergamot Citrus', 'Ripe Raspberry', 'Meyer Lemon', 'Sweet Apricot'],
      color: '#C58A52'
    },
    'floral-tea': {
      title: 'Floral, Jasmine & Botanical',
      subtitle: 'Delicate aromatics, honeyed sweetness, and ethereal finish',
      description: 'The highest expression of heirloom Arabica cultivars. Offers perfume-like aromatics of star jasmine, honeysuckle, Earl Grey tea, and elderflower with silken body.',
      pairing: 'Ethiopia Guji Heirloom & Panama Geisha Reserves',
      roastRecommendation: 'Ultra-Light Roast Profiles',
      dominantNotes: ['Star Jasmine', 'White Tea', 'Honeysuckle', 'Bergamot Bloom'],
      color: '#89947A'
    },
    'caramel-sweetness': {
      title: 'Caramel, Toffee & Honey',
      subtitle: 'Viscous mouthfeel with deep caramelized panela sugars',
      description: 'Result of Maillard reaction mastery during precision roasting. Delivers velvety notes of golden honeycomb, dark brown muscovado, salted dulce de leche, and butterscotch.',
      pairing: 'Guatemala Antigua & Midnight Espresso',
      roastRecommendation: 'Medium Roast',
      dominantNotes: ['Salted Caramel', 'Panela Toffee', 'Wildflower Honey', 'Maple Glaze'],
      color: '#D49B55'
    }
  };

  const flavorButtons = document.querySelectorAll('.flavor-family-btn');
  const flavorTitle = document.getElementById('flavor-title');
  const flavorSubtitle = document.getElementById('flavor-subtitle');
  const flavorDesc = document.getElementById('flavor-description');
  const flavorPairing = document.getElementById('flavor-pairing');
  const flavorRoast = document.getElementById('flavor-roast');
  const flavorNotesContainer = document.getElementById('flavor-tags-container');

  flavorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const familyKey = btn.getAttribute('data-family');
      const data = flavorFamilies[familyKey];
      if (!data) return;

      flavorButtons.forEach(b => {
        b.classList.remove('ring-2', 'ring-amber-500', 'bg-cream/15', 'shadow-md');
        b.classList.add('bg-cream/5');
      });
      btn.classList.add('ring-2', 'ring-amber-500', 'bg-cream/15', 'shadow-md');
      btn.classList.remove('bg-cream/5');

      const card = document.getElementById('flavor-detail-card');
      if (card) {
        card.style.opacity = '0.3';
        setTimeout(() => {
          if (flavorTitle) flavorTitle.textContent = data.title;
          if (flavorSubtitle) flavorSubtitle.textContent = data.subtitle;
          if (flavorDesc) flavorDesc.textContent = data.description;
          if (flavorPairing) flavorPairing.textContent = data.pairing;
          if (flavorRoast) flavorRoast.textContent = data.roastRecommendation;

          if (flavorNotesContainer) {
            flavorNotesContainer.innerHTML = '';
            data.dominantNotes.forEach(note => {
              const span = document.createElement('span');
              span.className = 'px-3 py-1.5 rounded-full text-xs font-medium tracking-wide bg-cream/15 text-cream border border-cream/20 shadow-sm';
              span.textContent = note;
              flavorNotesContainer.appendChild(span);
            });
          }
          card.style.opacity = '1';
        }, 150);
      }
    });
  });

  // Wholesale Enquiry Form Validation and Demo Handling
  const wholesaleForm = document.getElementById('wholesale-form');
  const wholesaleSuccess = document.getElementById('wholesale-success');
  const wholesaleSubmitBtn = document.getElementById('wholesale-submit-btn');

  if (wholesaleForm) {
    wholesaleForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const fields = [
        { id: 'full-name', errorId: 'full-name-error' },
        { id: 'business-name', errorId: 'business-name-error' },
        { id: 'business-email', errorId: 'business-email-error', isEmail: true },
        { id: 'business-type', errorId: 'business-type-error' },
        { id: 'monthly-volume', errorId: 'monthly-volume-error' }
      ];

      fields.forEach(field => {
        const input = document.getElementById(field.id);
        const error = document.getElementById(field.errorId);
        if (!input) return;

        let errorMsg = '';
        if (!input.value.trim()) {
          errorMsg = 'This field is required.';
          isValid = false;
        } else if (field.isEmail) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(input.value.trim())) {
            errorMsg = 'Please enter a valid email address.';
            isValid = false;
          }
        }

        if (error) {
          if (errorMsg) {
            error.textContent = errorMsg;
            error.classList.remove('hidden');
            input.classList.add('border-red-500');
          } else {
            error.textContent = '';
            error.classList.add('hidden');
            input.classList.remove('border-red-500');
          }
        }
      });

      if (!isValid) return;

      // Simulate sending enquiry (Front-end demo)
      if (wholesaleSubmitBtn) {
        wholesaleSubmitBtn.disabled = true;
        wholesaleSubmitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-espresso inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          Processing Wholesale Partner Application...
        `;
      }

      setTimeout(() => {
        wholesaleForm.classList.add('hidden');
        if (wholesaleSuccess) {
          wholesaleSuccess.classList.remove('hidden');
          wholesaleSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 900);
    });
  }

  // Newsletter Form Handler
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterSuccess = document.getElementById('newsletter-success');
  const newsletterError = document.getElementById('newsletter-error');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      const val = emailInput ? emailInput.value.trim() : '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!val || !emailRegex.test(val)) {
        if (newsletterError) {
          newsletterError.textContent = 'Please provide a valid email address.';
          newsletterError.classList.remove('hidden');
        }
        return;
      }

      if (newsletterError) newsletterError.classList.add('hidden');
      if (emailInput) emailInput.disabled = true;

      const submitBtn = newsletterForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      setTimeout(() => {
        newsletterForm.classList.add('hidden');
        if (newsletterSuccess) {
          newsletterSuccess.classList.remove('hidden');
        }
      }, 500);
    });
  }

  // Coffee Bag Modal Preview / Roast Discovery Details
  const roastButtons = document.querySelectorAll('.discover-roast-btn');
  const roastModal = document.getElementById('roast-modal');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalTagline = document.getElementById('modal-tagline');
  const modalDesc = document.getElementById('modal-desc');
  const modalNotes = document.getElementById('modal-notes');
  const modalOrigin = document.getElementById('modal-origin');
  const modalProcess = document.getElementById('modal-process');
  const modalElevation = document.getElementById('modal-elevation');
  const modalImage = document.getElementById('modal-image');

  const roastDetails = {
    'sunrise': {
      title: 'Sunrise Signature Blend',
      tagline: 'Smooth, balanced, and chocolate-forward morning ritual',
      desc: 'Crafted specifically to anchor your morning ritual with harmony and depth. A balanced blend of washed Colombian beans from Huila and natural Brazilian Cerrado lots, producing exceptional milk synergy and an irresistible dark honey finish.',
      notes: 'Milk Chocolate, Candied Walnut, Red Apple & Honeycomb',
      origin: 'Huila, Colombia & Minas Gerais, Brazil',
      process: 'Washed & Sun-Dried Natural',
      elevation: '1,350 - 1,850 MASL',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000&auto=format&fit=crop'
    },
    'highland': {
      title: 'Highland Single Origin',
      tagline: 'Bright, fruity, and delicately floral heirloom lot',
      desc: 'Sourced from independent smallholders across the misty valleys of Yirgacheffe. High elevation and indigenous heirloom Arabica varieties deliver a tea-like body and an unforgettable bouquet of star jasmine with lemon blossom.',
      notes: 'Meyer Lemon, Jasmine Blossom, White Peach & Earl Grey',
      origin: 'Yirgacheffe, Gedeo Zone, Ethiopia',
      process: 'Wet Washed on Raised African Beds',
      elevation: '1,950 - 2,200 MASL',
      image: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?q=80&w=1000&auto=format&fit=crop'
    },
    'midnight': {
      title: 'Midnight Dark Roast Espresso',
      tagline: 'Rich, bold, smoky cocoa, and viscous syrupy crema',
      desc: 'Our roastmaster’s homage to traditional Southern European espresso culture with modern specialty quality. Developed past the second crack without scorching, unlocking unctuous dark chocolate, black cherry, and roasted cedar tones.',
      notes: 'Bittersweet Cocoa, Dark Molasses, Black Cherry & Cedar',
      origin: 'Antigua Valley, Guatemala & Sidama, Ethiopia',
      process: 'Pulped Natural & Washed',
      elevation: '1,500 - 1,800 MASL',
      image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?q=80&w=1000&auto=format&fit=crop'
    }
  };

  roastButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const roastKey = btn.getAttribute('data-roast');
      const data = roastDetails[roastKey];
      if (!data || !roastModal) return;

      if (modalTitle) modalTitle.textContent = data.title;
      if (modalTagline) modalTagline.textContent = data.tagline;
      if (modalDesc) modalDesc.textContent = data.desc;
      if (modalNotes) modalNotes.textContent = data.notes;
      if (modalOrigin) modalOrigin.textContent = data.origin;
      if (modalProcess) modalProcess.textContent = data.process;
      if (modalElevation) modalElevation.textContent = data.elevation;
      if (modalImage) modalImage.src = data.image;

      roastModal.classList.remove('hidden');
      roastModal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeRoastModal() {
    if (roastModal) {
      roastModal.classList.add('hidden');
      roastModal.classList.remove('flex');
      document.body.style.overflow = '';
    }
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeRoastModal);
  }

  if (roastModal) {
    roastModal.addEventListener('click', (e) => {
      if (e.target === roastModal) closeRoastModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeRoastModal();
      closeMobileMenu();
    }
  });
});

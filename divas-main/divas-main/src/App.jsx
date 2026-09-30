import { useRef, useState, useEffect } from 'react'
import { Search, User, ShoppingCart, ChevronLeft, ChevronRight, Play, Zap, UserCheck, Heart, Flame, CheckCircle, Star, Headphones, Gem, Sun, Moon, X, ShoppingBag, Camera, Menu } from 'lucide-react'
import divaImg from './assets/images/hero/diva.webp'
import surgeonsListImg from './assets/images/books/finalbookcover1.webp'
import blackBookImg from './assets/images/books/black-book-edition.webp'
import recoveryGuidePlaceholder from './assets/images/books/recovery-guide-placeholder.svg'
import woodTherapyImg from './assets/images/therapies/wood-therapy.webp'
import vacuumTherapyImg from './assets/images/therapies/vacuum-therapy.webp'
import lymphaticDrainageImg from './assets/images/therapies/lymphatic-drainage.webp'
import consultationCardImg from './assets/images/booking/card.webp'
import lymphDrainageFormImg from './assets/images/lympdrinage.webp'
import selfieImg from './assets/images/booking/selfie_booknow.webp'
import bookNowImg from './assets/images/booking/booknow.webp'
import bookCareSessionImg from './assets/images/booking/bookcaresession.webp'
import img1 from './assets/images/showcase/s1.webp'
import img2 from './assets/images/showcase/s2.webp'
import img3 from './assets/images/showcase/s3.webp'
import DOMPurify from 'dompurify'
import { buyNow, addToShopifyCart, fetchShopifyProducts, goToCheckout, VARIANT_IDS } from './shopify'
import './App.css'

function useScrollReveal(options = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
          observer.unobserve(el)
        }
      },
      { threshold: options.threshold || 0.15, rootMargin: options.rootMargin || '0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

function RevealSection({ children, className = '', direction = 'up', delay = 0, ...props }) {
  const ref = useScrollReveal()
  const dirClass = `scroll-reveal scroll-reveal--${direction}`
  return (
    <div ref={ref} className={`${dirClass} ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined} {...props}>
      {children}
    </div>
  )
}

function ShopifyDescription({ html, fallback, className }) {
  if (html) {
    return <div className={className} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
  }
  return fallback ? <p className={className}>{fallback}</p> : null
}

const reviews = [
  {
    id: 1,
    name: 'Tia Carter',
    time: '3 months ago',
    avatar: 'T',
    color: '#1565c0',
    text: "I had the pleasure of having Lateria care for me after my surgery, and I couldn't have asked for a better caregiver. She was incredibly kind, compassionate, patient, and attentive to all of my needs.",
  },
  {
    id: 2,
    name: 'Dior Chanel',
    time: '3 months ago',
    avatar: 'D',
    color: '#e91e63',
    text: 'She the best hands down. I could recommend her any day. I love her she care about you more than the money. Once again I appreciate her services',
  },
  {
    id: 3,
    name: 'Shantrice H',
    time: '5 months ago',
    avatar: 'S',
    color: '#5c6bc0',
    text: 'I would definitely recommend 1000/10. Lateria is heaven sent. I got in contact with her last minute she was able to still accommodate me and was very professional.',
  },
  {
    id: 4,
    name: 'Nichole',
    time: 'last year',
    avatar: null,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    color: '#fff',
    text: 'Very personable & well versed in cosmetic surgery. Lateria made me feel comfortable throughout the whole process of my BBL. Best massage I ever had.',
  },
]

const SHOPIFY_LOGIN_URL = 'https://shopify.com/authentication/58836910250/login?_y=56f12aa0-bdf0-4db6-a323-c24e5bbf6c2d&analytics_trace_id=2cd32454-2b7d-40eb-89de-fe90ba5dcfd7&client_id=8b2746f0-a5c8-4a6a-a8cc-c0058d42416a&locale=en-US&redirect_uri=%2Fauthentication%2F58836910250%2Foauth%2Fauthorize%3F_cs%3D3s.AMP_PH09___JWIfiUaUTQGjrkkm3OToPQ%26_y%3D56f12aa0-bdf0-4db6-a323-c24e5bbf6c2d%26analytics_trace_id%3D2cd32454-2b7d-40eb-89de-fe90ba5dcfd7%26buyer_flags%3DeyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaXZhcy1jYXJlLWxsYy5teXNob3BpZnkuY29tIiwiZmxhZ3MiOltdLCJleHAiOjE3OTEzMDYwNDYsIm5iZiI6MTc5MDcwMTI0Nn0.IJJiYRrazUo4WJlGK88H_pcXxfI_5RlmyrDMs7BrGEU%26client_id%3D8b2746f0-a5c8-4a6a-a8cc-c0058d42416a%26locale%3Den-US%26nonce%3D2592d0c4-89a8-4f60-8a04-44222c8a7f22%26redirect_uri%3Dhttps%253A%252F%252Fshopify.com%252F58836910250%252Faccount%252Fcallback%26region_country%3DUS%26response_type%3Dcode%26scope%3Dopenid%2Bemail%2Bcustomer-account-api%253Afull%26state%3DhWNHOlXZJ8ZxM8iHUsF8bTEn&region_country=US'

function Header({ activePage, onNavigate, theme, onToggleTheme, cartCount, cartBumped, onCartClick }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navigateToTop = (page) => {
    onNavigate(page)
    setMenuOpen(false)
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
  }

  const toggleMenu = () => setMenuOpen((open) => !open)

  return (
    <>
      <header className='site-header'>
        <div className='logo'>THE DIVAS CARE LLC.</div>
        <nav className='main-nav'>
          <button
            className={activePage === 'home' ? 'active' : ''}
            onClick={() => navigateToTop('home')}
          >
            HOME
          </button>
          <button
            className={activePage === 'book' ? 'active' : ''}
            onClick={() => navigateToTop('book')}
          >
            BOOK ME
          </button>
        </nav>
        <div className='header-icons'>
          <a
            className='account-link'
            href={SHOPIFY_LOGIN_URL}
            aria-label='Account'
            target='_blank'
            rel='noopener noreferrer'
          >
            <User size={20} />
          </a>
          <button
            id='header-cart-btn'
            className={`cart-btn ${cartBumped ? 'cart-bump' : ''}`}
            aria-label='Cart'
            onClick={onCartClick}
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className='cart-badge'>{cartCount}</span>}
          </button>
          <button
            className='theme-toggle'
            aria-label='Toggle theme'
            onClick={onToggleTheme}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className='menu-toggle'
            aria-label='Open menu'
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      {menuOpen && (
        <div className='mobile-menu'>
          <nav className='mobile-nav'>
            <button
              className={activePage === 'home' ? 'active' : ''}
              onClick={() => navigateToTop('home')}
            >
              HOME
            </button>
            <button
              className={activePage === 'book' ? 'active' : ''}
              onClick={() => navigateToTop('book')}
            >
              BOOK ME
            </button>
          </nav>
        </div>
      )}
    </>
  )
}

function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <article className="review-card">
      <div className="review-header">
        {review.image ? (
          <div
            className="avatar"
            style={{ backgroundImage: `url(${review.image})`, backgroundSize: 'cover' }}
          />
        ) : (
          <div className="avatar" style={{ background: review.color }}>
            {review.avatar}
          </div>
        )}
        <div className="review-meta">
          <h3>{review.name}</h3>
          <p>{review.time}</p>
        </div>
        <img
          className="google-icon"
          src="https://www.google.com/favicon.ico"
          alt="Google"
        />
      </div>
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
        ))}
        <span className="verified"><CheckCircle size={14} /></span>
      </div>
      <p className={`review-text ${expanded ? 'expanded' : ''}`}>{review.text}</p>
      <button className="show-more" onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Show less' : 'Show more'}
      </button>
    </article>
  )
}

function ReviewsSection() {
  const trackRef = useRef(null)
  const scrollAmount = 320

  // Duplicate reviews for infinite scrolling
  const infiniteReviews = [...reviews, ...reviews, ...reviews]

  const scroll = (direction) => {
    if (trackRef.current) {
      const currentScroll = trackRef.current.scrollLeft
      const maxScroll = trackRef.current.scrollWidth - trackRef.current.clientWidth
      const cardWidth = 300 // card width + gap

      if (direction === 1 && currentScroll >= maxScroll - cardWidth) {
        // If at the end, smoothly scroll back to start
        trackRef.current.scrollTo({ left: 0, behavior: 'smooth' })
      } else if (direction === -1 && currentScroll <= cardWidth) {
        // If at the start, smoothly scroll to end
        trackRef.current.scrollTo({ left: maxScroll, behavior: 'smooth' })
      } else {
        trackRef.current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' })
      }
    }
  }

  return (
    <section className="reviews-section">
      <h2 className="reviews-title">What Our Clients Say</h2>
      <button
        className="carousel-arrow left"
        aria-label="Previous review"
        onClick={() => scroll(-1)}
      >
        <ChevronLeft size={28} />
      </button>
      <div className="reviews-track" ref={trackRef}>
        {infiniteReviews.map((review, index) => (
          <ReviewCard key={`${review.id}-${index}`} review={review} />
        ))}
      </div>
      <button
        className="carousel-arrow right"
        aria-label="Next review"
        onClick={() => scroll(1)}
      >
        <ChevronRight size={28} />
      </button>
    </section>
  )
}

function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="video-section">
      <div className="video-container">
        {isPlaying ? (
          <iframe
            className="youtube-video"
            src="https://www.youtube-nocookie.com/embed/_GKRkLASmBg?start=2&rel=0&autoplay=1"
            title="The Divas Care recovery video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button className="video-thumbnail" onClick={() => setIsPlaying(true)} aria-label="Play The Divas Care video">
            <span className="video-thumbnail-title">Start your journey</span>
            <span className="video-thumbnail-play"><Play size={32} fill="currentColor" /></span>
            <span className="video-thumbnail-cta">Watch Video</span>
          </button>
        )}
      </div>
    </section>
  )
}

const fallbackProducts = [
  {
    id: 1,
    heading: 'Ready to Choose the Right Surgeon with Confidence?',
    intro: "Don't leave your body in the hands of just anyone.",
    description:
      'Get the Ultimate Surgeons List 2026 and unlock direct access to the world\'s top cosmetic surgeons - trusted by influencers, celebrities, and real women just like you.',
    features: [
      { icon: <Zap size={16} />, text: 'Instant Download' },
      { icon: <UserCheck size={16} />, text: 'Verified Surgeon Contacts' },
      { icon: <Heart size={16} />, text: "Curated by a Post-Op Expert Who's Been There" },
    ],
    closing: 'This is your glow-up guide.',
    cta: 'Grab your copy today and take the first step toward the transformation you deserve.',
    price: '$19.99',
    shopifyVariantId: VARIANT_IDS['surgeons-list'],
    image: surgeonsListImg,
    imageAlt: 'The Ultimate Surgeons List 2026 book cover',
  },
  {
    id: 2,
    heading: 'Black Book Edition With The #1 Surgeon In The World',
    intro: 'Your body deserves the best hands in business.',
    description:
      'Get the Black Book Edition and unlock direct access to the world\'s #1 cosmetic surgeons - trusted by influencers, celebrities, and real women just like you.',
    features: [
      { icon: <Zap size={16} />, text: 'Instant Download' },
      { icon: <UserCheck size={16} />, text: 'Verified Surgeon Contacts' },
      { icon: <Heart size={16} />, text: "Curated by a Post-Op Expert Who's Been There" },
    ],
    closing: 'This is your glow-up guide.',
    cta: 'Get your copy of the Black Book Edition and make the transformation you deserve.',
    price: '$26.99',
    originalPrice: '$199.99',
    shopifyVariantId: VARIANT_IDS['black-book'],
    image: blackBookImg,
    imageAlt: 'Black Book Edition 2026 book cover',
  },
  {
    id: 3,
    heading: 'The Divas Care Post-Op Recovery Guide',
    intro: 'Knowledge, preparation, and confident recovery—all in one digital guide.',
    description:
      'A practical post-op resource covering BBL and Lipo 360, tummy tuck and breast care, drain and wound care, massage and compression, and daily recovery support.',
    features: [
      { icon: <Zap size={16} />, text: 'Instant Digital Download' },
      { icon: <CheckCircle size={16} />, text: '6-Page Recovery Guide' },
      { icon: <Heart size={16} />, text: 'Clear Post-Op Education' },
    ],
    closing: 'Prepare with knowledge. Recover with confidence.',
    cta: 'Add this essential digital guide to your recovery toolkit today.',
    price: '$9.99',
    image: recoveryGuidePlaceholder,
    imageAlt: 'Placeholder cover for The Divas Care Post-Op Recovery Guide',
    detailBullets: [
      'BBL and Lipo 360 recovery guidance',
      'Tummy tuck and breast-care information',
      'Drain colors, wound care, and warning signs',
      'Massage, compression, food, and daily recovery support',
    ],
    trust: 'Designed as an educational companion to your surgeon’s personalized post-op instructions.',
    format: 'PDF digital ebook',
    delivery: 'Digital delivery after purchase',
    bonus: 'Six focused recovery-reference pages',
  },
]

function BooksSection({ products, onSelectProduct }) {
  if (!products.length) return null
  return (
    <section id='books-section' className='books-section'>
      <h2 className='books-section-heading'>Our Books &amp; Guides</h2>
      <div className='books-grid'>
        {products.map((product) => (
          <article key={product.id} className='book-card' onClick={() => onSelectProduct(product)}>
            <div className='book-card-image'>
              <img src={product.image} alt={product.imageAlt} />
              {product.soldOut && <span className='book-card-sold-out'>SOLD OUT</span>}
            </div>
            <div className='book-card-body'>
              <h3 className='book-card-title'>{product.heading}</h3>
              <span className='book-card-price'>{product.price}</span>
              <button className='book-card-btn'>SEE NOW</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ProductDetailPage({ product, onBack, onSelectProduct, onSelectShop, addToCart, products, shopItems }) {
  const [showSuccess, setShowSuccess] = useState(false)
  const [buyLoading, setBuyLoading] = useState(false)
  const [cartLoading, setCartLoading] = useState(false)
  const bookImageRef = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [product])

  const handleBuy = async () => {
    if (!product.shopifyVariantId) return
    setBuyLoading(true)
    try {
      await buyNow(product.shopifyVariantId)
    } catch (err) {
      console.error('Shopify checkout error:', err)
      setBuyLoading(false)
    }
  }

  const flyToCart = (src) => {
    const start = bookImageRef.current?.getBoundingClientRect()
    const endEl = document.getElementById('header-cart-btn')
    if (!start || !endEl) return
    const end = endEl.getBoundingClientRect()
    const flyer = document.createElement('img')
    flyer.src = src
    flyer.alt = ''
    flyer.style.position = 'fixed'
    flyer.style.left = `${start.left}px`
    flyer.style.top = `${start.top}px`
    flyer.style.width = `${start.width}px`
    flyer.style.height = `${start.height}px`
    flyer.style.objectFit = 'contain'
    flyer.style.borderRadius = '8px'
    flyer.style.zIndex = '9999'
    flyer.style.pointerEvents = 'none'
    document.body.appendChild(flyer)
    const dx = end.left + end.width / 2 - start.left - start.width / 2
    const dy = end.top + end.height / 2 - start.top - start.height / 2
    const anim = flyer.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.2)`, opacity: 0.3 }
    ], { duration: 700, easing: 'ease-in-out' })
    anim.onfinish = () => flyer.remove()
  }

  const handleAddToCart = async () => {
    if (!product.shopifyVariantId) return
    setCartLoading(true)
    try {
      await addToShopifyCart(product.shopifyVariantId)
      addToCart({ ...product, id: product.id, name: product.heading, price: product.price, image: product.image })
      flyToCart(product.image)
    } catch (err) {
      console.error('Shopify add to cart error:', err)
    } finally {
      setCartLoading(false)
    }
  }

  const relatedBook = products.find((p) => p.id !== product.id)
  const relatedProducts = shopItems.slice(0, 3)

  return (
    <main className='book-detail-page'>
      <button className='book-back-btn' onClick={onBack}>Back</button>
      <section className='book-hero split'>
        <div className='book-hero-image'>
          <img src={product.image} alt={product.imageAlt} ref={bookImageRef} />
        </div>
        <div className='book-hero-content'>
          <h1>{product.heading}</h1>
          <div className='book-price-row'>
            <span className='book-sale-price'>{product.price} USD</span>
            {product.originalPrice && <span className='book-original-price'>{product.originalPrice} USD</span>}
            {product.originalPrice && <span className='book-sale-badge'>Sale</span>}
          </div>
          <p className='book-payment-note'>Pay over time for orders over $35.00 with Shop Pay</p>
          {product.soldOut && <p className='sold-out-badge'>SOLD OUT</p>}
          <div className='book-hero-actions'>
            <button className='book-add-cart' onClick={handleAddToCart} disabled={cartLoading || !product.shopifyVariantId}><ShoppingCart size={18} /><span>{cartLoading ? 'ADDING...' : 'ADD TO CART'}</span></button>
            {!product.soldOut && (
              <button className='book-buy-now' onClick={handleBuy} disabled={buyLoading || !product.shopifyVariantId}><ShoppingBag size={18} /><span>{buyLoading ? 'REDIRECTING...' : 'BUY NOW'}</span></button>
            )}
          </div>
          <p className='book-more-options'>More payment options</p>
          <ShopifyDescription html={product.descriptionHtml} fallback={product.description} className='shopify-description' />

        </div>
      </section>
      <section className='book-you-may-like'>
        <h2>You May Also Like</h2>
        <div className='book-related-grid'>
          {relatedBook && (
            <article className='book-related-card' onClick={() => onSelectProduct(relatedBook)}>
              <img src={relatedBook.image} alt={relatedBook.imageAlt} />
              <h3>{relatedBook.heading}</h3>
              <p>{relatedBook.price}</p>
            </article>
          )}
          {relatedProducts.map((item) => (
            <article key={item.id} className='book-related-card' onClick={() => onSelectShop(item)}>
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.price}</p>
            </article>
          ))}
        </div>
      </section>
      {showSuccess && <ProductSuccessModal onClose={() => setShowSuccess(false)} />}
    </main>
  )
}

function ShopDetailPage({ item, onBack, onSelectShop, onSelectBook, addToCart, products, shopItems }) {
  const [showSuccess, setShowSuccess] = useState(false)
  const [buyLoading, setBuyLoading] = useState(false)
  const [cartLoading, setCartLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const imageRef = useRef(null)
  const pageRef = useRef(null)

  useEffect(() => {
    pageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [item])

  const allImages = item.images || [item.image]
  const mainImage = allImages[selectedImage]

  const handleBuy = async () => {
    if (!item.shopifyVariantId) return
    setBuyLoading(true)
    try {
      await buyNow(item.shopifyVariantId)
    } catch (err) {
      console.error('Shopify checkout error:', err)
      setBuyLoading(false)
    }
  }

  const flyToCart = () => {
    const start = imageRef.current?.getBoundingClientRect()
    const endEl = document.getElementById('header-cart-btn')
    if (!start || !endEl) return
    const end = endEl.getBoundingClientRect()
    const flyer = document.createElement('img')
    flyer.src = item.image
    flyer.alt = ''
    flyer.style.position = 'fixed'
    flyer.style.left = `${start.left}px`
    flyer.style.top = `${start.top}px`
    flyer.style.width = `${start.width}px`
    flyer.style.height = `${start.height}px`
    flyer.style.objectFit = 'contain'
    flyer.style.borderRadius = '8px'
    flyer.style.zIndex = '9999'
    flyer.style.pointerEvents = 'none'
    document.body.appendChild(flyer)
    const dx = end.left + end.width / 2 - start.left - start.width / 2
    const dy = end.top + end.height / 2 - start.top - start.height / 2
    const anim = flyer.animate(
      [
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) scale(0.2)`, opacity: 0.3 },
      ],
      { duration: 700, easing: 'ease-in-out' }
    )
    anim.onfinish = () => flyer.remove()
  }

  const handleAddToCart = async () => {
    if (!item.shopifyVariantId) return
    setCartLoading(true)
    try {
      await addToShopifyCart(item.shopifyVariantId)
      addToCart({ ...item, id: item.id, name: item.name, price: item.price, image: item.image })
      flyToCart()
    } catch (err) {
      console.error('Shopify add to cart error:', err)
    } finally {
      setCartLoading(false)
    }
  }

  const relatedShop = shopItems.filter((i) => i.id !== item.id).slice(0, 3)
  const relatedBook = products[0]

  return (
    <main className='shop-detail-page' ref={pageRef}>
      <button className='book-back-btn' onClick={onBack}>
        Back
      </button>
      <section className='book-hero split'>
        <div className='book-hero-image'>
          <div className='shop-main-image' ref={imageRef}>
            <img src={mainImage} alt={item.name} />
          </div>
          {allImages.length > 1 && (
            <div className='shop-thumbs'>
              {allImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt=''
                  className={`shop-thumb ${selectedImage === idx ? 'active' : ''}`}
                  onClick={() => setSelectedImage(idx)}
                />
              ))}
            </div>
          )}
        </div>
        <div className='book-hero-content'>
          <h1>{item.name}</h1>
          <div className='book-price-row'>
            <span className='book-sale-price'>{item.price} USD</span>
            {item.originalPrice && <span className='book-original-price'>{item.originalPrice} USD</span>}
            {item.originalPrice && <span className='book-sale-badge'>Sale</span>}
          </div>
          <p className='book-payment-note'>{item.paymentNote || `Pay in 2 interest-free installments of $${Math.ceil(parseFloat((item.price || '').replace(/[^0-9.]/g, '') || 0) / 2)}.00 with Shop Pay`}</p>
          {item.soldOut && <p className='sold-out-badge'>SOLD OUT</p>}
          <div className='book-hero-actions'>
            <button className='book-add-cart' onClick={handleAddToCart} disabled={cartLoading || !item.shopifyVariantId}>
              <ShoppingCart size={18} />
              <span>{cartLoading ? 'ADDING...' : 'ADD TO CART'}</span>
            </button>
            {!item.soldOut && (
              <button className='book-buy-now' onClick={handleBuy} disabled={buyLoading || !item.shopifyVariantId}>
                <ShoppingBag size={18} />
                <span>{buyLoading ? 'REDIRECTING...' : 'BUY NOW'}</span>
              </button>
            )}
          </div>
          <p className='book-more-options'>More payment options</p>
          <ShopifyDescription html={item.descriptionHtml} fallback={item.description} className='shopify-description' />
        </div>
      </section>
      <section className='book-you-may-like'>
        <h2>You May Also Like</h2>
        <div className='book-related-grid'>
          {relatedBook && (
            <article className='book-related-card' onClick={() => { onBack(); onSelectBook(relatedBook) }}>
              <img src={relatedBook.image} alt={relatedBook.imageAlt} />
              <h3>{relatedBook.heading}</h3>
              <p>{relatedBook.price}</p>
            </article>
          )}
          {relatedShop.map((i) => (
            <article key={i.id} className='book-related-card' onClick={() => onSelectShop(i)}>
              <img src={i.image} alt={i.name} />
              <h3>{i.name}</h3>
              <p>{i.price}</p>
            </article>
          ))}
        </div>
      </section>
      {showSuccess && <ProductSuccessModal onClose={() => setShowSuccess(false)} />}
    </main>
  )
}

function FormsSection() {
  return (
    <section className="forms-section">
      <div className="forms-header">
        <p className="forms-label">Required Before Your Session</p>
        <h2 className="forms-heading">Complete Your Forms</h2>
        <p className="forms-subtext">Please fill out both forms prior to your appointment to ensure a smooth experience.</p>
      </div>
      <div className="forms-grid">
        <article className="form-card">
          <div className="form-card-image-wrap">
            <img src={divaImg} alt="The Divas Care LLC" className="form-card-image" />
          </div>
          <div className="form-card-body">
            <h3 className="form-card-title">General Waiver</h3>
            <p className="form-card-copy">Liability waiver covering your post-op care session. Required for all clients.</p>
            <a
              className="form-card-btn"
              href="https://cdn.shopify.com/s/files/1/0588/3691/0250/files/Copy_of_thedivascarellcgeneralliabilitywaiver_2.pdf?v=1709086956"
              target="_blank"
              rel="noopener noreferrer"
            >
              View &amp; Sign Waiver
            </a>
          </div>
        </article>
        <article className="form-card">
          <div className="form-card-image-wrap">
            <img src={lymphDrainageFormImg} alt="Lymphatic drainage massage appointments available" className="form-card-image form-card-image-contain" />
          </div>
          <div className="form-card-body">
            <h3 className="form-card-title">Lymphatic Intake Form</h3>
            <p className="form-card-copy">Share your health and surgery details so our care team can prepare a safer, more personalized session.</p>
            <a className="form-card-btn" href="?intake=1" target="_blank" rel="noopener noreferrer">Start Intake Form</a>
          </div>
        </article>
      </div>
    </section>
  )
}

const bookingData = [
  {
    category: 'Select Appointment',
    items: [
      {
        id: 'last-minute',
        name: 'Last Minute Booking',
        duration: '1 hour',
        price: '$100.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Last+Minute',
        description:
          'If you require an appointment slot less than 72 hours from now, you are seeking a high demand, last-minute reservation. To proceed with booking a same-day or near-term slot (services $100-$300), you must first pay the mandatory Last Minute Booking fee.',
      },
    ],
  },
  {
    category: '1B. Post Op Care',
    items: [
      {
        id: 'post-op-24h',
        name: 'Post Op Care 24 Hours',
        duration: '24 hours',
        price: '$1,449.35',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=24+Hour+Care',
        sub: 'Hours can be broken up',
        shift: 'Day 1 (5 hour shift)',
        bullets: [
          'Private care 1 on 1',
          'Vitals',
          'Laundry services',
          'Cooking (food must be provided by client)',
          'Pick up after Surgery',
          'Medication pick up',
        ],
      },
      {
        id: 'post-op-6d',
        name: '6 Day Post Op Care (19 Hrs)',
        duration: '19 hours',
        price: '$1,275.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=6+Day+Care',
        shift: 'Day 1 (5,4,3,3,2 hours shift)',
        bullets: [
          'Private care 1 on 1',
          'Faja assistance',
          'Assistance with showering',
          'Vitals',
          'Laundry services',
          'Cooking (food must be provided by client)',
          'Pick up after Surgery Center',
          'Medication pick up',
        ],
      },
      {
        id: 'post-op-5d',
        name: '5 Day Post Op Care (16 Hrs)',
        duration: '16 hours',
        price: '$1,175.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=5+Day+Care',
        shift: 'Day 5 (5,4,3,3,2 hours shift)',
        bullets: [
          'Private care 1 on 1',
          'Faja assistance',
          'Assistance with showering',
          'Vitals',
          'Laundry services',
          'Cooking (food must be provided by client)',
          'Pick up after Surgery Center',
          'Medication pick up',
        ],
      },
      {
        id: 'post-op-4d',
        name: '4 Day Post Op Care (14 Hrs)',
        duration: '14 hours',
        price: '$975.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=4+Day+Care',
        shift: 'Day 4 (5,4,3,3 hour shifts)',
        bullets: [
          'Private care 1 on 1',
          'Faja assistance',
          'Assistance with showering',
          'Vitals',
          'Laundry services',
          'Cooking (food must be provided by client)',
          'Pick up after Surgery Center',
          'Medication pick up',
        ],
      },
      {
        id: 'post-op-3d',
        name: '3 Day Post Op Care (12 Hrs)',
        duration: '12 hours',
        price: '$775.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=3+Day+Care',
        shift: 'Day 3 (5,4,3 hour shift)',
        bullets: [
          'Private care 1 on 1',
          'Faja assistance',
          'Assistance with showering',
          'Vitals',
          'Laundry services',
          'Cooking (food must be provided by client)',
          'Pick up after Surgery Center',
          'Medication pick up',
        ],
      },
      {
        id: 'post-op-2d',
        name: '2 Day Post Op Care (9 Hrs)',
        duration: '9 hours',
        price: '$575.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=2+Day+Care',
        shift: 'Day 2 (5,4 hour shift)',
        bullets: [
          'Private care 1 on 1',
          'Faja assistance',
          'Assistance with showering',
          'Vitals',
          'Laundry services',
          'Cooking (food must be provided by client)',
          'Pick up after 5x',
          'Medication pick up',
          'Post op appt',
        ],
      },
      {
        id: 'post-op-8h',
        name: 'Post Op Care (8 Hrs)',
        duration: '8 hours',
        price: '$550.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=8+Hour+Care',
        shift: 'Day 1 (8 hour shift)',
        bullets: [
          'Private care 1 on 1',
          'Faja assistance',
          'Assistance with showering',
          'Vitals',
          'Laundry services',
          'Cooking (food must be provided by client)',
          'Pick up after Surgery Center',
        ],
      },
      {
        id: 'post-op-6h',
        name: 'Post Op Care (6 Hrs)',
        duration: '6 hours',
        price: '$425.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=6+Hour+Care',
        shift: 'Day 1 (6 hour shift)',
        bullets: [
          'Private care 1 on 1',
          'Faja assistance',
          'Assistance with showering',
          'Vitals',
          'Laundry services',
          'Cooking (food must be provided by client)',
          'Pick up after Surgery Center',
        ],
      },
      {
        id: 'post-op-5h',
        name: 'Post Op Care (5 Hrs)',
        duration: '5 hours',
        price: '$375.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=5+Hour+Care',
        shift: 'Day 1 (5 hour shift)',
        bullets: [
          'Private care 1 on 1',
          'Vitals',
          'Laundry services',
          'Cooking (food must be provided by client)',
          'Pick up after Surgery Center',
          'Medication pick up',
        ],
      },
      {
        id: 'post-op-4h',
        name: 'Post Op Care (4 Hrs)',
        duration: '4 hours',
        price: '$350.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=4+Hour+Care',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES. Assist with bathroom. Assist with feeding. Monitor vitals. Monitor urine output. Assist with showing basic hygiene (recovery assistant management).',
      },
      {
        id: 'post-op-3h',
        name: 'Post Op Care (3 Hrs)',
        duration: '3 hours',
        price: '$275.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=3+Hour+Care',
        shift: 'Day 1 (3 hour shift)',
        bullets: [
          'Private care 1 on 1',
          'Vitals',
          'Laundry services',
          'Cooking (food must be provided by client)',
          'Pick up after Surgery Center',
          'Medication pick up',
        ],
      },
    ],
  },
  {
    category: 'Groceries',
    items: [
      {
        id: 'grocery-shopping',
        name: 'Grocery Shopping',
        duration: '45 minutes',
        price: '$62.99',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Grocery',
      },
    ],
  },
  {
    category: 'Faja',
    items: [
      {
        id: 'faja-shower',
        name: 'Faja Assistance & Post-Surgery Shower (40 Minutes)',
        duration: '40 minutes',
        price: '$125.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Faja+Shower',
        description:
          'Designed to help you feel refreshed and supported during your recovery. Our trained specialists will carefully assist you with removing and reapplying your faja (compression garment), ensuring proper fit and comfort to promote optimal healing.',
      },
    ],
  },
  {
    category: '2. Lymphatic Drainage Massage',
    items: [
      {
        id: 'lymphatic-2-sessions',
        name: 'Lymphatic Drainage 2 Sessions (Traveling fee included ($45))',
        duration: '45 minutes',
        price: '$230.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Lymphatic+2',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES.',
      },
      {
        id: 'lymphatic-12',
        name: 'Lymphatic Drainage 12/ $1140 plus travel fee $45',
        duration: '45 minutes',
        price: '$1,226.99',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Lymphatic+12',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES.',
      },
      {
        id: 'lymphatic-10',
        name: 'Lymphatic Drainage 10/ $950 plus travel fee $45',
        duration: '45 minutes',
        price: '$1,030.99',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Lymphatic+10',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES.',
      },
      {
        id: 'lymphatic-8',
        name: 'Lymphatic Drainage 8/ $760 plus travel fee $45',
        duration: '45 minutes',
        price: '$833.99',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Lymphatic+8',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES.',
      },
      {
        id: 'lymphatic-6',
        name: 'Lymphatic Drainage 6/ $570 plus travel fee $45',
        duration: '45 minutes',
        price: '$626.99',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Lymphatic+6',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES.',
      },
      {
        id: 'lymphatic-4',
        name: 'Lymphatic Drainage 4/$380 plus travel fee $45',
        duration: '45 minutes',
        price: '$415.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Lymphatic+4',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES.',
      },
      {
        id: 'lymphatic-3-sessions',
        name: 'Lymphatic Drainage 3 Sessions',
        duration: '45 minutes',
        price: '$320.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Lymphatic+3',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES.',
      },
      {
        id: 'lymphatic-massage-local',
        name: 'Lymphatic Massage (One Session) local',
        duration: '45 minutes',
        price: '$105.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Lymphatic+Local',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES.',
      },
      {
        id: 'lymphatic-massage-out',
        name: 'Lymphatic Massage (One Session) Out of Area',
        duration: '45 minutes',
        price: '$120.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Lymphatic+Out',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES.',
      },
      {
        id: 'lymphatic-arms-10',
        name: 'Lymphatic Massage Drainage Arms (10 Sessions)',
        duration: '30 minutes',
        price: '$724.99',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Arms+10',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES.',
      },
      {
        id: 'lymphatic-arms-5',
        name: 'Lymphatic Massage Drainage Arms (5 Sessions)',
        duration: '30 minutes',
        price: '$466.99',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Arms+5',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES.',
      },
      {
        id: 'lymphatic-arms-3',
        name: 'Lymphatic Massage Drainage Arms (3 Sessions)',
        duration: '30 minutes',
        price: '$275.99',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Arms+3',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES.',
      },
      {
        id: 'lymphatic-arms-1',
        name: 'Lymphatic Massage Drainage Arms (1 Session)',
        duration: '30 minutes',
        price: '$78.99',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Arms+1',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES.',
      },
      {
        id: 'lymphatic-legs-10',
        name: 'Lymphatic Massage Drainage Legs (10 Sessions)',
        duration: '30 minutes',
        price: '$724.99',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Legs+10',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES.',
      },
      {
        id: 'lymphatic-legs-5',
        name: 'Lymphatic Massage Drainage Legs (5 Sessions)',
        duration: '30 minutes',
        price: '$414.99',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Legs+5',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES.',
      },
      {
        id: 'lymphatic-legs-3',
        name: 'Lymphatic Massage Drainage Legs (3 Session)',
        duration: '30 minutes',
        price: '$284.99',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Legs+3',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES.',
      },
      {
        id: 'lymphatic-legs-1',
        name: 'Lymphatic Massage Drainage Legs (1 Session)',
        duration: '30 minutes',
        price: '$89.99',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Legs+1',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES.',
      },
    ],
  },
  {
    category: '3. Body Sculpting',
    items: [
      {
        id: 'body-sculpt-1',
        name: '1 Session Body Sculpting Travel Included (Bring hydration & Waist Trainer)',
        duration: '50 minutes',
        price: '$150.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Body+Sculpt+1',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES.',
      },
      {
        id: 'body-sculpt-5',
        name: '5 Sessions Body Sculpting Travel Included (Bring hydration & Waist Trainer)',
        duration: '1 hour 30 minutes',
        price: '$615.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Body+Sculpt+5',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES. All massages must be used within 60 days of booking!',
      },
      {
        id: 'body-sculpt-10',
        name: '10 Sessions Body Sculpting (Bring Hydration & Waist Trainer)',
        duration: '1 hour 30 minutes',
        price: '$1,139.99',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Body+Sculpt+10',
        description:
          'We bring all equipment to you. Contouring prices minimum of 10 sessions. Cavitation, Wood Therapy, Radio Frequency, Cupping, Massages. Travel fee included.',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES. All massages must be used within 60 days of booking!',
      },
      {
        id: 'red-light',
        name: 'Red Light Therapy',
        duration: '45 minutes',
        price: '$155.99',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Red+Light',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES.',
      },
      {
        id: 'radio-frequency',
        name: 'Radio Frequency (Per session)',
        duration: '45 minutes',
        price: '$103.99',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Radio+Freq',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES.',
      },
      {
        id: 'skin-camouflage',
        name: 'Skin Camouflaged (1 Area) 3 Sessions',
        duration: '45 minutes',
        price: '$498.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Skin+Camo',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES.',
      },
      {
        id: 'skin-tightening',
        name: 'Skin Tightening 8 Sessions',
        duration: '45 minutes',
        price: '$766.99',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Skin+Tighten',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES.',
      },
      {
        id: 'face-cavitation',
        name: 'Face Cavitation (Chin and Jar line)',
        duration: '30 minutes',
        price: '$68.99',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Face+Cav',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES.',
      },
    ],
  },
  {
    category: 'Consultations',
    items: [
      {
        id: 'surgery-consultation',
        name: 'Surgery Consultations',
        duration: '30 minutes',
        price: '$30.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Surgery+Consult',
        bullets: [
          '1 on 1 Surgical questions',
          'Vitamins to take prior to having Surgery',
          'Discuss items needed for procedure',
          'DR recommendations',
        ],
      },
    ],
  },
  {
    category: 'Drainage',
    items: [
      {
        id: 'stitch-removal',
        name: 'Stitch Removal',
        duration: '45 minutes',
        price: '$75.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Stitch+Removal',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES.',
      },
      {
        id: 'seroma-drainage',
        name: 'Seroma Drainage',
        duration: '45 minutes',
        price: '$100.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Seroma',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES.',
      },
      {
        id: 'drains-removal',
        name: 'Drains Removal',
        duration: '40 minutes',
        price: '$100.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Drains',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES.',
      },
    ],
  },
  {
    category: 'Faja',
    items: [
      {
        id: 'faja-shopping',
        name: 'Faja Shopping',
        duration: '45 minutes',
        price: '$50.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Faja+Shopping',
      },
      {
        id: 'faja-assistance-15',
        name: 'Faja Assistance',
        duration: '15 minutes',
        price: '$5.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Faja+Assist',
      },
    ],
  },
  {
    category: 'Massage',
    items: [
      {
        id: 'chin-lymphatic-1',
        name: 'Massage (Chin Lymphatic Massage)',
        duration: '30 minutes',
        price: '$65.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Chin+Massage',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES. All massages must be used within 60 days of booking!',
      },
      {
        id: 'chin-lymphatic-5',
        name: '5 X Massage (Chin Lymphatic Massage)',
        duration: '30 minutes',
        price: '$260.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Chin+Massage+5',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES. All massages must be used within 60 days of booking!',
      },
    ],
  },
  {
    category: 'Special Services',
    items: [
      {
        id: 'fibrosis-treatment',
        name: 'Fibrosis Treatment (Per Session)',
        duration: '45 minutes',
        price: '$170.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Fibrosis',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES.',
      },
      {
        id: 'vip-additional',
        name: 'VIP (Additional Charge)',
        duration: '45 minutes',
        price: '$100.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=VIP',
      },
      {
        id: 'special-consultation',
        name: 'Consultation',
        duration: '30 minutes',
        price: '$29.99',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Consultation',
        description: 'Consultation client will be issued a list of post op needs.',
      },
    ],
  },
  {
    category: 'Transportation',
    items: [
      {
        id: 'transport-local',
        name: 'FROM SURGERY (LOCAL AREA) medications pick up and drop off!',
        duration: '45 minutes',
        price: '$200.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Transport+Local',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES. All massages must be used within 60 days of booking.',
      },
      {
        id: 'transport-out',
        name: 'FROM SURGERY (Out Of AREA) medication pick up and drop off!',
        duration: '45 minutes',
        price: '$250.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Transport+Out',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES. All massages must be used within 60 days of booking.',
      },
      {
        id: 'transport-followup',
        name: 'To & from follow up appointment transportation',
        duration: '45 minutes',
        price: '$150.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Transport+Follow',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES. All massages must be used within 60 days of booking.',
      },
    ],
  },
  {
    category: 'Wood Therapy',
    items: [
      {
        id: 'wood-therapy-1',
        name: 'Wood Therapy (1 Session)',
        duration: '45 minutes',
        price: '$125.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Wood+1',
        sub: '10 sessions',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES. All massages must be used within 60 days of booking.',
      },
      {
        id: 'wood-therapy-10',
        name: 'Wood Therapy',
        duration: '45 minutes',
        price: '$630.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Wood+10',
        sub: '10 sessions',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES. All massages must be used within 60 days of booking.',
      },
      {
        id: 'wood-cavitation',
        name: '(1 Session) Cavitation Wood Therapy Cupping',
        duration: '45 minutes',
        price: '$150.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Cavitation',
        bullets: ['WE BRING EQUIPMENT TO YOU!', 'WOOD THERAPY', 'RADIO FREQUENCY', 'CUPPING', 'MASSAGES'],
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES. All massages must be used within 60 days of booking.',
      },
    ],
  },
  {
    category: 'Wrap',
    items: [
      {
        id: 'slimming-wrap',
        name: 'Slimming Body Wrap (Per Session)',
        duration: '45 minutes',
        price: '$100.00',
        image: 'https://placehold.co/400x280/2a1540/d8a7e8?text=Body+Wrap',
        note: 'PLEASE NOTE: IF YOU CANCEL YOUR APPOINTMENT THERE IS A MANDATORY $25 FEE AND MUST BE PAID FOR ANY FUTURE SERVICES.',
      },
    ],
  },
]

const therapies = [
  {
    id: 1,
    title: 'Wood Therapy',
    image: woodTherapyImg,
    text: 'Wood therapy is a vigorous massage technique that utilizes wooden, handheld tools, such as rolling pins and vacuum-suction cups. Madera is Spanish for wood. Practitioners of this technique claim that it can reduce or eliminate cellulite. Other purported claims include: increasing lymphatic circulation.',
  },
  {
    id: 2,
    title: 'Vacuum Therapy',
    image: vacuumTherapyImg,
    text: 'Vacuum therapy is a noninvasive massaging technique that helps to lift your skin via a mechanical device equipped with suction cups. While it originally entered the market during the 1970s as a way to help treat burn scars, this treatment has evolved into a nonsurgical butt lift method.',
  },
  {
    id: 3,
    title: 'Lymphatic Drainage',
    image: lymphaticDrainageImg,
    text: 'Manual lymphatic drainage is a type of massage based on the hypothesis that it will encourage the natural drainage of the lymph, which carries waste products away from the tissues back toward the heart.',
  },
]

const showcaseSlides = [
  {
    id: 1,
    image: img1,
    title: 'Wood Therapy Results',
    subtitle: 'Sculpt, contour, and reduce cellulite naturally.',
  },
  {
    id: 2,
    image: img2,
    title: 'Post-Op Recovery',
    subtitle: 'Heal confidently with expert hands-on care.',
  },
  {
    id: 3,
    image: img3,
    title: 'Lymphatic Drainage',
    subtitle: 'Reduce swelling, boost circulation, feel amazing.',
  },
]

function ResultsShowcase() {
  const [activeIdx, setActiveIdx] = useState(0)
  const activeSlide = showcaseSlides[activeIdx]

  const previousSlide = () => {
    setActiveIdx((current) => (current - 1 + showcaseSlides.length) % showcaseSlides.length)
  }

  const nextSlide = () => {
    setActiveIdx((current) => (current + 1) % showcaseSlides.length)
  }

  return (
    <section className="results-showcase">
      <div className="showcase-header">
        <p className="showcase-label">Real Transformations</p>
        <h2 className="showcase-heading">Great Results Without Any Runaround</h2>
      </div>
      <div className="showcase-carousel">
        <button className="showcase-arrow showcase-arrow-left" onClick={previousSlide} aria-label="Previous transformation">
          <ChevronLeft size={30} />
        </button>
        <div className="showcase-viewport">
          <img key={activeSlide.id} src={activeSlide.image} alt={activeSlide.title} className="showcase-slide-img" />
          <div className="showcase-overlay">
            <h3 className="showcase-slide-title">{activeSlide.title}</h3>
            <p className="showcase-slide-sub">{activeSlide.subtitle}</p>
            <div className="showcase-dots">
              {showcaseSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  className={`showcase-dot ${index === activeIdx ? 'active' : ''}`}
                  onClick={() => setActiveIdx(index)}
                  aria-label={`View transformation ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        <button className="showcase-arrow showcase-arrow-right" onClick={nextSlide} aria-label="Next transformation">
          <ChevronRight size={30} />
        </button>
      </div>
    </section>
  )
}

const fallbackShopItems = [
  {
    id: 1,
    name: 'The Divas Care BBL Gummy',
    price: '$39.99',
    shopifyVariantId: VARIANT_IDS['bbl-gummy'],
    image: '/images/products/item5.webp',
    images: [
      '/images/products/item5.webp',
      '/images/products/bbl-gummy-front.webp',
      '/images/products/bbl-gummy-bottles.webp',
      '/images/products/bbl-gummy-facts.webp',
      '/images/products/bbl-gummy-back.webp',
    ],
    description:
      "Have you ever wish you had a bigger butt? Then Divas Care LLC vitamins is for you and can help you achieve your goals. our gummies work by increasing your metabolism, stimulating estrogen and targeting muscle tissue growth. When those muscle tissues are targeted, the product responds by increasing the size of muscle cells, thus enlarging your buttocks.",
  },
  {
    id: 2,
    name: 'Back Compression Board',
    price: '$49.99',
    originalPrice: '$89.99',
    shopifyVariantId: VARIANT_IDS['back-compression'],
    image: '/images/products/item1.webp',
    soldOut: true,
    intro: 'Sculpt & Support with Confidence — Back Compression Board By The Divas Care',
    description:
      'Achieve smoother, more contoured results after your surgery with our premium Back Compression Board. Expertly designed for post-op recovery, this board provides targeted support to your back, ensuring even compression, reduced swelling, and improved skin retraction.',
    features: [
      'Ergonomic Butterfly Shape — Covers the full back area comfortably without digging into the skin.',
      'High-Quality Foam Core — Firm yet flexible, providing optimal compression without compromising comfort.',
      'Contours to Your Body — Fits seamlessly under fajas and shapewear for all-day wear.',
      'Reduces Fluid Retention & Lumps — Aids in proper lymphatic drainage and helps avoid fibrosis.',
      'Durable, Lightweight & Washable — Easy to clean and designed for long-term use.',
    ],
    closing:
      'Perfect for post-op care following liposuction, BBL, or other body sculpting procedures. The Divas Care Back Compression Board helps you heal faster and look your best sooner.',
  },
  {
    id: 3,
    name: 'Chin Liposuction Foam 3pk',
    price: '$29.99',
    shopifyVariantId: VARIANT_IDS['chin-foam-3pk'],
    image: '/images/products/item2.webp',
    paymentNote: 'Pay over time for orders over $35.00 with Shop Pay',
    intro: 'The Divas Care Chin Liposuction Foam Pads — Post-Surgery Compression Support (3-Pack)',
    description:
      'Recover in comfort and style with The Divas Care Chin Liposuction Foam Pads — expertly designed to provide gentle, uniform compression after chin or neck liposuction procedures. These premium-quality foam pads help reduce swelling, support lymphatic drainage, and prevent fluid retention, ensuring optimal healing and enhanced results.',
    features: [
      'Medical-Grade Foam — Soft, flexible, and non-irritating for delicate facial skin.',
      'Targeted Compression — Perfectly sized to contour under the chin and jawline for consistent pressure and smoother results.',
      'Improves Healing — Reduces bruising, swelling, and discomfort while aiding in shaping and contouring.',
      'Compatible with Chin Straps — Slim profile fits comfortably under most post-surgical compression garments.',
      'Hygienic 3-Pack — Easy to rotate and keep clean during your recovery journey.',
    ],
    details: [
      { label: 'Dimensions', value: 'Approx. 1" x 3" x 0.5" each' },
      { label: 'Material', value: 'Latex-free polyurethane foam' },
      { label: 'Color', value: 'White with purple branding' },
    ],
    idealFor: [
      'Chin liposuction',
      'Neck contouring procedures',
      'Kybella treatments',
      'Facial cosmetic surgery recovery',
    ],
    closing:
      'Take control of your recovery and enhance your results with The Divas Care Chin Liposuction Foam Pads — where comfort meets confidence.',
  },
  {
    id: 4,
    name: 'Liposuction Foam',
    price: '$30.99',
    originalPrice: '$49.99',
    shopifyVariantId: VARIANT_IDS['lipo-foam'],
    image: '/images/products/item6.webp',
    paymentNote: 'Pay over time for orders over $35.00 with Shop Pay',
    intro: 'Post-Surgery Lipo Foam Sheets – Maximum Compression & Comfort',
    description:
      'Achieve smoother, more even results during your post-operative recovery with our premium Lipo Foam Sheets by The Divas Care. Designed to provide consistent, gentle compression, these medical-grade foam pads are ideal for use after liposuction, BBL, tummy tucks, and other body contouring procedures.',
    features: [
      'Even Compression — Helps reduce fluid retention, swelling, and skin irregularities.',
      'Ultra Soft & Breathable — Made from medical-grade foam for comfort and skin safety.',
      'Slim & Discreet — Easily fits under compression garments and fajas without adding bulk.',
      'Support Healing — Promotes better skin retraction and minimizes scarring.',
      'Pack of 3 Sheets — Durable and reusable throughout your recovery journey.',
    ],
    details: [
      { label: 'Dimensions', value: 'Approximately 8" x 11" each sheet' },
      { label: 'Material', value: 'Latex-free, medical-grade foam' },
      { label: 'Ideal For', value: 'Post-lipo, BBL, tummy tuck, or other body sculpting recovery' },
      { label: 'Care Instructions', value: 'Spot clean and air dry. Do not machine wash or tumble dry.' },
    ],
    closing:
      'Trust The Divas Care to keep your curves smooth and your recovery seamless. Add to cart today and support your healing with confidence!',
  },
  {
    id: 5,
    name: 'Front Compression Board',
    price: '$49.99',
    originalPrice: '$59.99',
    shopifyVariantId: VARIANT_IDS['front-compression'],
    image: '/images/products/item3.webp',
    intro: 'The Divas Care Front Compression Board – Sculpt, Support, Recover',
    description:
      "Experience superior support and enhanced post-surgical recovery with The Divas Care Front Compression Board. Designed to be worn under your faja or shapewear, this abdominal board provides gentle yet firm compression to flatten and shape the midsection while preventing skin folds and fluid retention after liposuction, tummy tuck, or postpartum recovery.",
    features: [
      'Contoured Comfort — Ergonomically curved to fit your torso for optimal comfort and discreet wear under clothing.',
      'Post-Surgery Essential — Helps evenly distribute compression, reduce swelling, and promote skin retraction for faster healing.',
      'Soft but Supportive — Made with durable foam and breathable fabric that won\'t irritate your skin.',
      'Prevents Creasing — Protects your skin from faja marks, creasing, or bunching.',
      'Invisible Underwear Fit — Sleek design ensures invisibility under clothing so you can wear it confidently all day.',
    ],
    closing:
      "Whether you're on a surgical journey or looking for added compression during waist training, The Divas Care Front Compression Board is your go-to companion for a smooth, sculpted silhouette.",
  },
  {
    id: 6,
    name: 'Chin Strap Compression',
    price: '$49.99',
    originalPrice: '$75.00',
    shopifyVariantId: VARIANT_IDS['chin-strap'],
    image: '/images/products/item4.webp',
    intro: "Sculpt & Support Chin Strap Compression – Post-Surgery & Daily Use | The Divas Care™",
    description:
      "Redefine your jawline and boost recovery with The Divas Care™ Chin Strap Compression Garment — expertly designed to support your face and neck with firm, comfortable compression. Whether you're recovering from cosmetic procedures like liposuction or BBL, or simply sculpting your profile, this high-quality strap offers the perfect fit.",
    features: [
      'Targeted Compression — Contours and fits the jawline, cheeks, and chin to reduce swelling and aid healing.',
      'Post-Surgical Support — Ideal for recovery after facial surgery, liposuction, or double chin reduction.',
      'Breathable & Lightweight — Made from soft, stretchy, and breathable material to ensure all-day comfort.',
      'Adjustable Fit — Secure design wraps snugly around the head and under the chin without slipping or irritation.',
      'Discreet Wear — Sleek and seamless under clothes or scarves — wear it day or night.',
    ],
    whyLove: [
      'Speeds up healing and improves surgical outcomes.',
      'Helps shape a slimmer, firmer facial profile.',
      'Reduces discomfort, swelling, and bruising.',
      'Trusted by beauty professionals and cosmetic clinics.',
    ],
    closing:
      "Whether you're post-op or perfecting your everyday routine, this compression strap is your secret to a more defined, confident you.",
  },
  {
    id: 7,
    name: 'Post-Op Pillow',
    price: '$54.99',
    image: 'https://placehold.co/480x480/2a1540/d8a7e8?text=Post-Op%0APillow',
    description: 'Ergonomic support pillow designed for comfortable resting after body procedures.',
  },
  {
    id: 8,
    name: 'Detox Tea Bundle',
    price: '$27.99',
    image: 'https://placehold.co/480x480/2a1540/d8a7e8?text=Detox%0ATea',
    description: 'Organic herbal tea blend to support detoxification and reduce post-surgical bloating.',
  },
  {
    id: 9,
    name: 'Silicone Scar Sheets',
    price: '$39.99',
    image: 'https://placehold.co/480x480/2a1540/d8a7e8?text=Scar%0ASheets',
    description: 'Medical-grade silicone sheets that flatten and fade scars with consistent wear.',
  },
  {
    id: 10,
    name: 'Recovery Robe',
    price: '$64.99',
    image: 'https://placehold.co/480x480/2a1540/d8a7e8?text=Recovery%0ARobe',
    description: 'Luxuriously soft, front-open robe for easy dressing during your healing period.',
  },
]

const productImageStorageKey = 'divas-product-image-overrides'
const bookProductIds = new Set(['7873778090154', '8116239433898', '8116714897578'])
const serviceTitlePattern = /session|lymphatic draining|body sculpting/i

const numericShopifyId = (id) => String(id || '').split('/').pop()
const productPrice = (product) => `$${Number(product.variants?.[0]?.price?.amount ?? product.variants?.[0]?.price ?? 0).toFixed(2)}`

function storedProductImages() {
  try {
    return JSON.parse(localStorage.getItem(productImageStorageKey) || '{}')
  } catch {
    return {}
  }
}

function buildCatalog(shopifyProducts, imageOverrides) {
  const bookFallbacks = new Map([
    ['8116239433898', fallbackProducts[0]],
    ['8116714897578', fallbackProducts[1]],
  ])
  const shopFallbacks = new Map([
    ['7489735524522', fallbackShopItems[0]],
    ['8169059811498', fallbackShopItems[1]],
    ['8169058762922', fallbackShopItems[2]],
    ['8169021604010', fallbackShopItems[3]],
    ['8169020162218', fallbackShopItems[4]],
    ['8168318435498', fallbackShopItems[5]],
  ])
  const books = []
  const shop = []

  shopifyProducts.forEach((product) => {
    const productId = numericShopifyId(product.id)
    if (serviceTitlePattern.test(product.title)) return
    const variant = product.variants?.[0]
    if (!variant) return
    const customImage = imageOverrides[productId]
    const shopifyImages = product.images?.map((image) => image.src).filter(Boolean) || []
    const isBook = bookProductIds.has(productId) || product.productType?.toLowerCase() === 'book'

    if (isBook) {
      const fallback = bookFallbacks.get(productId)
      books.push({
        ...(fallback || {}),
        id: productId,
        shopifyProductId: productId,
        heading: product.title,
        descriptionHtml: product.descriptionHtml || '',
        description: product.description || '',
        price: productPrice(product),
        shopifyVariantId: variant.id,
        image: customImage || fallback?.image || shopifyImages[0] || recoveryGuidePlaceholder,
        imageAlt: `${product.title} cover`,
        soldOut: !variant.available,
      })
      return
    }

    const fallback = shopFallbacks.get(productId)
    shop.push({
      ...(fallback || {}),
      id: productId,
      shopifyProductId: productId,
      name: product.title,
      price: productPrice(product),
      shopifyVariantId: variant.id,
      image: customImage || fallback?.image || shopifyImages[0] || 'https://placehold.co/480x480/2a1540/d8a7e8?text=Product',
      images: customImage ? [customImage, ...shopifyImages] : (fallback?.images || shopifyImages),
      descriptionHtml: product.descriptionHtml || '',
      description: product.description || '',
      soldOut: !variant.available,
    })
  })

  return { books, shop }
}

function useStoreCatalog() {
  const [shopifyProducts, setShopifyProducts] = useState([])
  const [imageOverrides, setImageOverrides] = useState(storedProductImages)
  const [catalogLoading, setCatalogLoading] = useState(true)
  const [catalogError, setCatalogError] = useState('')

  useEffect(() => {
    fetchShopifyProducts()
      .then(setShopifyProducts)
      .catch(() => setCatalogError('Unable to load Shopify products.'))
      .finally(() => setCatalogLoading(false))
  }, [])

  useEffect(() => {
    const refreshImages = () => setImageOverrides(storedProductImages())
    window.addEventListener('product-images-updated', refreshImages)
    return () => window.removeEventListener('product-images-updated', refreshImages)
  }, [])

  const saveImageOverride = (productId, image) => {
    const next = { ...imageOverrides, [productId]: image }
    localStorage.setItem(productImageStorageKey, JSON.stringify(next))
    setImageOverrides(next)
    window.dispatchEvent(new CustomEvent('product-images-updated'))
  }

  const removeImageOverride = (productId) => {
    const next = { ...imageOverrides }
    delete next[productId]
    localStorage.setItem(productImageStorageKey, JSON.stringify(next))
    setImageOverrides(next)
    window.dispatchEvent(new CustomEvent('product-images-updated'))
  }

  const catalog = shopifyProducts.length > 0
    ? buildCatalog(shopifyProducts, imageOverrides)
    : { books: fallbackProducts, shop: fallbackShopItems.filter((item) => item.shopifyVariantId) }
  return { ...catalog, imageOverrides, saveImageOverride, removeImageOverride, catalogLoading, catalogError }
}

function ProductSuccessModal({ onClose }) {
  return createPortal(
    <div className='modal-backdrop' onClick={onClose}>
      <div className='product-success-modal' onClick={(e) => e.stopPropagation()}>
        <button className='modal-close' onClick={onClose} aria-label='Close'>
          <X size={24} />
        </button>
        <div className='product-success-icon'>
          <CheckCircle size={56} color='#4ade80' />
        </div>
        <h2>Purchase Successful!</h2>
        <button className='product-success-btn' onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  )
}

function PurchaseConfirmModal({ item, onConfirm, onCancel }) {
  if (!item) return null
  const displayName = item.name || item.heading || 'this item'
  return createPortal(
    <div className='modal-backdrop' onClick={onCancel}>
      <div className='purchase-confirm-modal' onClick={(e) => e.stopPropagation()}>
        <h2>Confirm Purchase</h2>
        <p className='purchase-confirm-item'>{displayName}</p>
        <p className='purchase-confirm-price'>{item.price}</p>
        <p className='purchase-confirm-question'>Are you sure you want to buy this?</p>
        <div className='purchase-confirm-actions'>
          <button className='purchase-confirm-btn cancel' onClick={onCancel}>Cancel</button>
          <button className='purchase-confirm-btn confirm' onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>,
    document.body
  )
}

function ProductModal({ item, onClose, addToCart }) {
  const [buyLoading, setBuyLoading] = useState(false)
  const [cartLoading, setCartLoading] = useState(false)
  const modalImageRef = useRef(null)

  if (!item) return null

  const handleBuyNow = async () => {
    if (!item.shopifyVariantId) return
    setBuyLoading(true)
    try {
      await buyNow(item.shopifyVariantId)
    } catch (err) {
      console.error('Shopify checkout error:', err)
      setBuyLoading(false)
    }
  }

  const handleAddToCart = async () => {
    if (!item.shopifyVariantId) return
    setCartLoading(true)
    try {
      await addToShopifyCart(item.shopifyVariantId)
      addToCart(item)
      const start = modalImageRef.current?.getBoundingClientRect()
      const endEl = document.getElementById('header-cart-btn')
      if (!start || !endEl) { setCartLoading(false); return }
      const end = endEl.getBoundingClientRect()
      const flyer = document.createElement('img')
      flyer.src = item.image
      flyer.alt = ''
      flyer.style.position = 'fixed'
      flyer.style.left = `${start.left}px`
      flyer.style.top = `${start.top}px`
      flyer.style.width = `${start.width}px`
      flyer.style.height = `${start.height}px`
      flyer.style.objectFit = 'contain'
      flyer.style.borderRadius = '8px'
      flyer.style.zIndex = '9999'
      flyer.style.pointerEvents = 'none'
      document.body.appendChild(flyer)
      const dx = end.left + end.width / 2 - start.left - start.width / 2
      const dy = end.top + end.height / 2 - start.top - start.height / 2
      const anim = flyer.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) scale(0.2)`, opacity: 0.3 }
      ], { duration: 700, easing: 'ease-in-out' })
      anim.onfinish = () => flyer.remove()
    } catch (err) {
      console.error('Shopify add to cart error:', err)
    } finally {
      setCartLoading(false)
    }
  }

  return createPortal(
    <div className='modal-backdrop' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <button className='modal-close' onClick={onClose} aria-label='Close'>
          <X size={24} />
        </button>
        <div className='modal-image'>
          <img src={item.image} alt={item.name} ref={modalImageRef} />
        </div>
        <div className='modal-details'>
          <h2 className='modal-name'>{item.name}</h2>
          <p className='modal-price'>{item.price}</p>
          {item.descriptionHtml ? (
            <ShopifyDescription html={item.descriptionHtml} className='modal-description shopify-description' />
          ) : (
            <p className='modal-description'>{item.description}</p>
          )}
          <div className='modal-actions'>
            <button className='modal-buy-btn' onClick={handleBuyNow} disabled={buyLoading || !item.shopifyVariantId}>
              <ShoppingBag size={18} />
              <span>{buyLoading ? 'Redirecting...' : 'Buy Now'}</span>
            </button>
            <button className='modal-cart-btn' onClick={handleAddToCart} disabled={cartLoading || !item.shopifyVariantId}>
              <ShoppingCart size={18} />
              <span>{cartLoading ? 'Adding...' : 'Add to Cart'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

function ProductsSection({ onSelectShop, shopItems }) {
  const [page, setPage] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const perPage = isMobile ? 1 : 3
  const totalPages = Math.ceil(shopItems.length / perPage)

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages - 1))
  }, [totalPages])

  const prev = () => setPage((p) => (p - 1 + totalPages) % totalPages)
  const next = () => setPage((p) => (p + 1) % totalPages)

  const visible = shopItems.slice(page * perPage, page * perPage + perPage)

  return (
    <section id='products-section' className="products-section">
      <h2 className="section-heading">OUR PRODUCTS</h2>
      <div className="shop-grid-wrap">
        <button className="shop-arrow" onClick={prev} aria-label="Previous">
          <ChevronLeft size={24} />
        </button>
        <div className="shop-grid" key={page}>
          {visible.map((item) => (
            <article
              key={item.id}
              className="shop-card"
              onClick={() => onSelectShop(item)}
            >
              <div className="shop-card-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="shop-card-info">
                <h3 className="shop-card-name">{item.name}</h3>
                <p className="shop-card-price">{item.price}</p>
              </div>
            </article>
          ))}
        </div>
        <button className="shop-arrow" onClick={next} aria-label="Next">
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="shop-dots">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`shop-dot ${i === page ? 'active' : ''}`}
            onClick={() => setPage(i)}
            aria-label={`Page ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

function BookingPromoSection({ onNavigate }) {
  const openBookMe = () => {
    onNavigate('book')
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
  }

  return (
    <section className="booking-promo-section">
      <div className="booking-promo-header">
        <p>Choose Your Next Step</p>
        <h2>Ready When You Are</h2>
      </div>
      <div className="booking-promo-grid">
        <article className="booking-promo-card">
          <div className="booking-promo-placeholder booking-promo-primary">
            <img src={bookNowImg} alt="Book today with The Divas Care" />
          </div>
          <div className="booking-promo-content">
            <p className="booking-promo-label">Reserve Online</p>
            <h3>Schedule Your Appointment</h3>
            <p>View available appointments and reserve your preferred service through our secure booking site.</p>
            <a
              className="booking-promo-btn"
              href="https://the-divas-care-llc.square.site/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Click Here to Book
            </a>
          </div>
        </article>
        <article className="booking-promo-card reverse">
          <div className="booking-promo-placeholder booking-promo-care">
            <img src={bookCareSessionImg} alt="Book a post-op care session with The Divas Care" />
          </div>
          <div className="booking-promo-content">
            <p className="booking-promo-label">Personalized Support</p>
            <h3>Need a Care Session?</h3>
            <p>Explore our recovery services, consultation details, pricing, and care-session options.</p>
            <button className="booking-promo-btn" onClick={openBookMe}>Book Your Care Session</button>
          </div>
        </article>
      </div>
    </section>
  )
}

function SelfieConfirmModal({ file, preview, onUpload, onCancel }) {
  return createPortal(
    <div className='modal-backdrop' onClick={onCancel}>
      <div className='selfie-confirm-modal' onClick={(e) => e.stopPropagation()}>
        <h2>Confirm Upload</h2>
        <p className='selfie-confirm-file'>{file.name}</p>
        <img src={preview} alt='Selected selfie preview' className='selfie-confirm-img' />
        <div className='selfie-confirm-actions'>
          <button className='selfie-confirm-btn upload' onClick={onUpload}>Upload</button>
          <button className='selfie-confirm-btn cancel' onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>,
    document.body
  )
}

function SelfiePanel() {
  const fileInputRef = useRef(null)
  const [uploadStatus, setUploadStatus] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [pendingFile, setPendingFile] = useState(null)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setUploadStatus({ type: 'error', message: 'Please select an image file.' })
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }
    const preview = URL.createObjectURL(file)
    setPendingFile({ file, preview })
    setUploadStatus(null)
  }

  const handleCancel = () => {
    if (pendingFile) URL.revokeObjectURL(pendingFile.preview)
    setPendingFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleUpload = () => {
    if (!pendingFile) return
    const { file } = pendingFile

    const reader = new FileReader()
    reader.onload = (ev) => {
      const img = new Image()
      img.onload = () => {
        const max = 900
        let w = img.width
        let h = img.height
        if (w > max || h > max) {
          if (w > h) {
            h = Math.round(h * max / w)
            w = max
          } else {
            w = Math.round(w * max / h)
            h = max
          }
        }
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, w, h)
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85)

        const submission = {
          id: Date.now(),
          image: dataUrl,
          submittedAt: new Date().toISOString(),
        }
        const previous = JSON.parse(localStorage.getItem(selfieStorageKey) || '[]')
        localStorage.setItem(selfieStorageKey, JSON.stringify([submission, ...previous]))
        window.dispatchEvent(new CustomEvent('selfie-updated'))
        URL.revokeObjectURL(pendingFile.preview)
        setPendingFile(null)
        setShowSuccess(true)
        if (fileInputRef.current) fileInputRef.current.value = ''
      }
      img.src = ev.target.result
    }
    reader.onerror = () => setUploadStatus({ type: 'error', message: 'Failed to read file.' })
    reader.readAsDataURL(file)
  }

  const handleCloseSuccess = () => {
    setShowSuccess(false)
  }

  return (
    <section className='selfie-panel'>
      <div className='selfie-panel-inner'>
        <div className='selfie-image-side'>
          <img src={selfieImg} alt='Send us your selfies' className='selfie-image' />
        </div>
        <div className='selfie-text-side'>
          <p className='selfie-label'>Share Your Glow-Up</p>
          <h2 className='selfie-heading'>Send Us Your Bomb Selfies</h2>
          <p className='selfie-copy'>
            Let other Divas see your before and after pictures of care. Show off your transformation and
            inspire others on their recovery journey.
          </p>
          <p className='selfie-copy'>
            We love celebrating your results! Tag us or upload directly and get featured on our page.
          </p>
          <ul className='selfie-services'>
            <li>Wood Therapy</li>
            <li>Lymphatic Massage</li>
            <li>Post-Op Care</li>
            <li>Skin Tightening</li>
            <li>Ultrasound Cavitation</li>
            <li>And So Much More</li>
          </ul>
          <p className='selfie-tagline'>Self Care Looks Good On You</p>
          <div className='selfie-actions'>
            <a
              className='selfie-ig-link'
              href='https://www.instagram.com/thedivascare/'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Visit our Instagram'
            >
              <svg className='selfie-ig-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><rect x='2' y='2' width='20' height='20' rx='5' ry='5'/><path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'/><line x1='17.5' y1='6.5' x2='17.51' y2='6.5'/></svg>
            </a>
            <div className='selfie-actions-btns'>
              <button className='selfie-btn upload' onClick={handleUploadClick}>
                <Camera size={18} />
                <span>Upload Your Selfie</span>
              </button>
              <input
                type='file'
                accept='image/*'
                capture='user'
                ref={fileInputRef}
                onChange={handleFileChange}
                className='selfie-upload-input'
              />
              <a
                className='selfie-btn book'
                href='https://book.squareup.com/appointments/e8mdy5m27be1ya/location/L8GMK8BF2YTGR/services'
                target='_blank'
                rel='noopener noreferrer'
              >
                <span>Book Now</span>
              </a>
            </div>
            {uploadStatus && (
              <p className={`selfie-upload-status ${uploadStatus.type}`}>{uploadStatus.message}</p>
            )}
          </div>
        </div>
      </div>
      {pendingFile && (
        <SelfieConfirmModal
          file={pendingFile.file}
          preview={pendingFile.preview}
          onUpload={handleUpload}
          onCancel={handleCancel}
        />
      )}
      {showSuccess && <SelfieSuccessModal onClose={handleCloseSuccess} />}
    </section>
  )
}

function SelfieSuccessModal({ onClose }) {
  return createPortal(
    <div className='modal-backdrop' onClick={onClose}>
      <div className='selfie-success-modal' onClick={(e) => e.stopPropagation()}>
        <button className='modal-close' onClick={onClose} aria-label='Close'>
          <X size={24} />
        </button>
        <div className='selfie-success-icon'>
          <CheckCircle size={56} color='#4ade80' />
        </div>
        <h2>Selfie Submitted!</h2>
        <button className='selfie-success-btn' onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  )
}

function BookingCardsSection({ onBook }) {
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')

  const displayData = bookingData
    .filter((g) => g.category !== 'Select Appointment')
    .reduce((acc, group) => {
      const existing = acc.find((g) => g.category === group.category)
      if (existing) {
        existing.items = [...existing.items, ...group.items]
      } else {
        acc.push({ ...group, items: [...group.items] })
      }
      return acc
    }, [])

  const categories = ['All', ...displayData.map((g) => g.category)]

  const filtered = displayData
    .filter((group) => filterCategory === 'All' || group.category === filterCategory)
    .map((group) => ({
      ...group,
      items: group.items.filter((svc) =>
        svc.name.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <section className="booking-section" id="booking-services">
      <div className="booking-header">
        <p className="booking-label">Our Services</p>
        <h2 className="booking-heading">Book a Session</h2>
        <p className="booking-sub">Select a service below to schedule your appointment.</p>
      </div>
      <div className="booking-filter-bar">
        <input
          type="text"
          className="booking-search"
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="booking-filter-select">
          <label htmlFor="booking-category" className="booking-filter-label">Filter by</label>
          <select
            id="booking-category"
            className="booking-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
      {filtered.map((group) => (
        <div key={group.category} className="booking-category" id={`booking-category-${group.category.replace(/\W+/g, '-').toLowerCase()}`}>
          <h2 className="booking-category-title">{group.category}</h2>
          <div className="booking-grid">
            {group.items.map((svc) => (
              <article key={svc.id} className="booking-svc-card">
                <div className="booking-svc-img">
                  <img
                    src={`/images/services/${svc.id}.webp`}
                    alt={svc.name}
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x280/2a1540/d8a7e8?text=Image' }}
                  />
                </div>
                <div className="booking-svc-body">
                  <h3 className="booking-svc-name">{svc.name}</h3>
                  {svc.sub && <p className="booking-svc-sub">{svc.sub}</p>}
                  <div className="booking-svc-meta">
                    <span className="booking-svc-duration">{svc.duration}</span>
                    <span className="booking-svc-price">{svc.price}</span>
                  </div>
                  {svc.shift && <p className="booking-svc-shift">{svc.shift}</p>}
                  {svc.note && <p className="booking-svc-note">{svc.note}</p>}
                  {svc.description && <p className="booking-svc-desc">{svc.description}</p>}
                  {svc.bullets && (
                    <ul className="booking-svc-bullets">
                      {svc.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                  <button className="booking-svc-btn" onClick={() => onBook(svc)}>Book</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
      {filtered.length === 0 && (
        <div className="booking-empty">Nothing found.</div>
      )}
    </section>
  )
}

function ServicesSection() {
  return (
    <section className="services-section">
      <div className="services-grid">
        {therapies.map((therapy) => (
          <article key={therapy.id} className="service-card">
            <div className="service-image">
              <img src={therapy.image} alt={therapy.title} />
            </div>
            <h3>{therapy.title}</h3>
            <p>{therapy.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function BookingModal({ service, onClose, onConfirm }) {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const minDate = new Date().toISOString().split('T')[0]

  const handleConfirm = () => {
    if (!date || !time) return
    onConfirm(date, time)
  }

  return createPortal(
    <div className='modal-backdrop' onClick={onClose}>
      <div className='booking-modal' onClick={(e) => e.stopPropagation()}>
        <button className='modal-close' onClick={onClose} aria-label='Close'>
          <X size={24} />
        </button>
        <h2>Book Appointment</h2>
        <p className='booking-modal-service'>{service.name}</p>
        <p className='booking-modal-meta'>{service.duration} · {service.price}</p>
        <label className='booking-modal-label'>Date</label>
        <input
          type='date'
          className='booking-modal-input'
          value={date}
          min={minDate}
          onChange={(e) => setDate(e.target.value)}
        />
        <label className='booking-modal-label'>Time</label>
        <select
          className='booking-modal-input'
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          <option value=''>Select a time</option>
          {['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'].map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <div className='booking-modal-actions'>
          <button className='booking-modal-cancel' onClick={onClose}>Cancel</button>
          <button className='booking-modal-confirm' onClick={handleConfirm} disabled={!date || !time}>Confirm</button>
        </div>
      </div>
    </div>,
    document.body
  )
}

function BookingSuccessModal({ service, date, time, onClose }) {
  return createPortal(
    <div className='modal-backdrop' onClick={onClose}>
      <div className='product-success-modal' onClick={(e) => e.stopPropagation()}>
        <button className='modal-close' onClick={onClose} aria-label='Close'>
          <X size={24} />
        </button>
        <div className='product-success-icon'>
          <CheckCircle size={56} color='#4ade80' />
        </div>
        <h2>Booking Requested!</h2>
        <p className='booking-success-service'>{service.name}</p>
        <p className='booking-success-time'>{date} at {time}</p>
        <button className='product-success-btn' onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  )
}

const intakeStorageKey = 'divas-lymphatic-intake-submissions'
const selfieStorageKey = 'divas-selfie-submissions'
const purchaseStorageKey = 'divas-purchases'
const bookingStorageKey = 'divas-bookings'

const intakeInitialValues = {
  fullName: '',
  dateOfBirth: '',
  phone: '',
  email: '',
  address: '',
  emergencyContact: '',
  emergencyPhone: '',
  primaryProvider: '',
  providerPhone: '',
  serviceGoal: '',
  reasonForVisit: '',
  swellingDetails: '',
  painLevel: '',
  areasToAvoid: '',
  screening: {},
  medicalDetails: '',
  medications: '',
  allergies: '',
  hemoglobin: '',
  procedureDetails: '',
  surgeonDetails: '',
  complications: '',
  signature: '',
  consent: false,
}

const medicalScreeningQuestions = [
  'Blood clot, DVT, pulmonary embolism, or clotting disorder',
  'Heart failure, heart disease, or unexplained shortness of breath',
  'Kidney disease, kidney failure, or dialysis',
  'Stroke / TIA, vascular disease, or uncontrolled blood pressure',
  'Fever, cellulitis, current infection, or taking antibiotics',
  'Cancer, current cancer treatment, or radiation therapy',
  'Lymph node removal / damage, lymphedema, or lipedema',
  'Diabetes, neuropathy, or reduced skin sensation',
  'Anemia, low hemoglobin, bleeding disorder, or easy bruising',
  'Open wounds, rash, skin infection, or delayed healing',
  'Pregnant / possibly pregnant, or recently gave birth',
  'Liver disease, ascites, or prescribed fluid restriction',
  'Implants, injected fillers / biopolymers, or prior removal',
  'Other ongoing medical condition or recent hospitalization',
]

async function downloadIntakePdf(submission) {
  const { jsPDF } = await import('jspdf')
  const pdf = new jsPDF()
  const margin = 18
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  let y = 22

  const addLine = (label, value) => {
    const content = `${label}: ${value || 'N/A'}`
    const lines = pdf.splitTextToSize(content, pageWidth - margin * 2)
    if (y + lines.length * 6 > pageHeight - 18) {
      pdf.addPage()
      y = 22
    }
    pdf.text(lines, margin, y)
    y += lines.length * 6 + 3
  }

  pdf.setFillColor(20, 9, 31)
  pdf.rect(0, 0, pageWidth, 34, 'F')
  pdf.setTextColor(216, 167, 232)
  pdf.setFontSize(18)
  pdf.text('THE DIVAS CARE', margin, 15)
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(12)
  pdf.text('Lymphatic Drainage Client Intake & Consent', margin, 25)
  pdf.setTextColor(35, 21, 47)
  pdf.setFontSize(10)
  y = 46

  addLine('Submission ID', submission.id)
  addLine('Submitted', new Date(submission.submittedAt).toLocaleString())
  addLine('Full name', submission.fullName)
  addLine('Date of birth', submission.dateOfBirth)
  addLine('Phone', submission.phone)
  addLine('Email', submission.email)
  addLine('Address', submission.address)
  addLine('Emergency contact', submission.emergencyContact)
  addLine('Emergency contact phone', submission.emergencyPhone)
  addLine('Primary healthcare provider', submission.primaryProvider)
  addLine('Provider phone', submission.providerPhone)
  addLine('Service goal', submission.serviceGoal)
  addLine('Reason for visit', submission.reasonForVisit)
  addLine('Swelling details', submission.swellingDetails)
  addLine('Pain level (0-10)', submission.painLevel)
  addLine('Areas to avoid', submission.areasToAvoid)
  medicalScreeningQuestions.forEach((question) => addLine(question, submission.screening?.[question]))
  addLine('Medical history details', submission.medicalDetails)
  addLine('Medications / supplements', submission.medications)
  addLine('Allergies / reactions', submission.allergies)
  addLine('Latest hemoglobin result', submission.hemoglobin)
  addLine('Procedure details', submission.procedureDetails)
  addLine('Surgeon / clinic details', submission.surgeonDetails)
  addLine('Drains, incisions, fluid collections, or complications', submission.complications)
  addLine('Consent provided', submission.consent ? 'Yes' : 'No')
  addLine('Client signature', submission.signature)

  pdf.save(`divas-intake-${submission.fullName.trim().replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.pdf`)
}

function IntakeFormModal({ onClose, standalone = false }) {
  const formRef = useRef(null)
  const [step, setStep] = useState(1)
  const [values, setValues] = useState(intakeInitialValues)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (standalone) return undefined
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [standalone])

  const update = (event) => {
    const { name, value, type, checked } = event.target
    setValues((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  const updateScreening = (question, value) => {
    setValues((current) => ({
      ...current,
      screening: { ...current.screening, [question]: value },
    }))
  }

  const nextStep = () => {
    if (!formRef.current?.reportValidity()) return
    setStep((current) => current + 1)
  }

  const submit = async (event) => {
    event.preventDefault()
    const submission = {
      ...values,
      id: `INT-${Date.now()}`,
      submittedAt: new Date().toISOString(),
    }
    const previous = JSON.parse(localStorage.getItem(intakeStorageKey) || '[]')
    localStorage.setItem(intakeStorageKey, JSON.stringify([submission, ...previous]))
    window.dispatchEvent(new CustomEvent('intake-updated'))
    await downloadIntakePdf(submission)
    setSubmitted(true)
  }

  const content = (
    <div className={`intake-backdrop ${standalone ? 'intake-standalone' : ''}`} onClick={standalone ? undefined : onClose}>
      <div className="intake-modal" onClick={(event) => event.stopPropagation()}>
        {!standalone && <button className="intake-close" onClick={onClose} aria-label="Close intake form"><X size={22} /></button>}
        {submitted ? (
          <div className="intake-success">
            <CheckCircle size={54} />
            <h2>Form submitted</h2>
            <p>Your completed form was downloaded and saved for the temporary admin view.</p>
            <button className="intake-primary-btn" onClick={() => standalone ? window.close() : onClose()}>Done</button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={submit}>
            <div className="intake-modal-header">
              <p>The Divas Care</p>
              <h2>Lymphatic Drainage</h2>
              <span>Client Intake &amp; Consent</span>
            </div>
            <div className="intake-progress">
              {[1, 2, 3].map((number) => <span key={number} className={number <= step ? 'active' : ''}>{number}</span>)}
            </div>

            {step === 1 && (
              <div className="intake-step">
                <h3>Client details &amp; reason for visit</h3>
                <p className="intake-step-instruction">Complete before your first visit. Answer every medical-history item, write N/A where needed, and tell your practitioner about any health changes before every session.</p>
                <div className="intake-fields two-columns">
                  <label>Full name<input name="fullName" value={values.fullName} onChange={update} required /></label>
                  <label>Date of birth<input type="date" name="dateOfBirth" value={values.dateOfBirth} onChange={update} required /></label>
                  <label>Phone<input type="tel" name="phone" value={values.phone} onChange={update} required /></label>
                  <label>Email<input type="email" name="email" value={values.email} onChange={update} required /></label>
                  <label className="full-field">Address<input name="address" value={values.address} onChange={update} /></label>
                  <label>Emergency contact / relationship<input name="emergencyContact" value={values.emergencyContact} onChange={update} /></label>
                  <label>Emergency contact phone<input type="tel" name="emergencyPhone" value={values.emergencyPhone} onChange={update} /></label>
                  <label>Primary healthcare provider<input name="primaryProvider" value={values.primaryProvider} onChange={update} /></label>
                  <label>Provider phone<input type="tel" name="providerPhone" value={values.providerPhone} onChange={update} /></label>
                  <label className="full-field">Service goal<select name="serviceGoal" value={values.serviceGoal} onChange={update} required><option value="">Select one</option><option>Post-operative care</option><option>Diagnosed lymphedema</option><option>Other / wellness</option></select></label>
                  <label className="full-field">Reason for visit<textarea name="reasonForVisit" value={values.reasonForVisit} onChange={update} required /></label>
                  <label>When did swelling start?<textarea name="swellingDetails" value={values.swellingDetails} onChange={update} /></label>
                  <label>Pain level (0-10)<input type="number" min="0" max="10" name="painLevel" value={values.painLevel} onChange={update} /></label>
                  <label className="full-field">Areas to avoid or special instructions<textarea name="areasToAvoid" value={values.areasToAvoid} onChange={update} /></label>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="intake-step">
                <h3>Medical history &amp; safety screening</h3>
                <p className="intake-step-instruction">Answer every medical-history item. Select Unsure when you do not know, and explain every Yes or Unsure response below.</p>
                <div className="screening-table">
                  {medicalScreeningQuestions.map((question) => (
                    <fieldset key={question}>
                      <legend>{question}</legend>
                      <div className="screening-options">
                        {['Yes', 'No', 'Unsure'].map((answer) => (
                          <label key={answer}>
                            <input
                              type="radio"
                              name={`screening-${medicalScreeningQuestions.indexOf(question)}`}
                              value={answer}
                              checked={values.screening[question] === answer}
                              onChange={() => updateScreening(question, answer)}
                              required
                            />
                            {answer}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  ))}
                </div>
                <div className="intake-fields">
                  <label>Explain all Yes / Unsure answers (condition, dates, treatment, and provider)<textarea name="medicalDetails" value={values.medicalDetails} onChange={update} required /></label>
                  <div className="intake-fields two-columns">
                    <label>Medications / supplements, including blood thinners<textarea name="medications" value={values.medications} onChange={update} /></label>
                    <label>Allergies / reactions, including latex, adhesives, oils, and medicines<textarea name="allergies" value={values.allergies} onChange={update} /></label>
                  </div>
                  <label>Latest hemoglobin result, units, and test date (if known)<input name="hemoglobin" value={values.hemoglobin} onChange={update} /></label>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="intake-step">
                <h3>Surgery details, consent &amp; review</h3>
                <div className="intake-fields">
                  <label>Procedure(s), body areas, and surgery date(s)<textarea name="procedureDetails" value={values.procedureDetails} onChange={update} required /></label>
                  <label>Surgeon name, clinic, phone, restrictions, and clearance status<textarea name="surgeonDetails" value={values.surgeonDetails} onChange={update} /></label>
                  <label>Drains, open incisions, fluid collections, complications, or prior massage reactions<textarea name="complications" value={values.complications} onChange={update} /></label>
                  <div className="intake-safety-copy">
                    <strong>Safety Check Before Service</strong>
                    <p>Do not start massage with suspected blood clots, fever, active infection, or new unexplained swelling. New one-sided limb pain, warmth, redness, or swelling needs urgent medical evaluation.</p>
                    <p>Call 911 for chest pain, sudden shortness of breath, fainting, or stroke symptoms. Report increasing redness, wound drainage, or worsening post-op pain to your surgical team promptly.</p>
                  </div>
                  <div className="intake-consent-copy">
                    <strong>Informed Consent</strong>
                    <p>I understand this service uses gentle manual techniques and may help manage swelling; results vary. I may ask questions, decline any area, or stop the session at any time. I confirm my answers are accurate and voluntarily consent to receive care.</p>
                  </div>
                  <label className="intake-check"><input type="checkbox" name="consent" checked={values.consent} onChange={update} required /> I have read and agree to the informed consent.</label>
                  <label>Client / authorized representative signature<input name="signature" value={values.signature} onChange={update} placeholder="Type your full legal name" required /></label>
                </div>
              </div>
            )}

            <div className="intake-navigation">
              {step > 1 && <button type="button" className="intake-secondary-btn" onClick={() => setStep((current) => current - 1)}>Back</button>}
              {step < 3 ? (
                <button type="button" className="intake-primary-btn" onClick={nextStep}>Continue</button>
              ) : (
                <button type="submit" className="intake-primary-btn">Submit &amp; Download PDF</button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  )

  return standalone ? content : createPortal(content, document.body)
}

function optimizeProductImage(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please select an image file.'))
      return
    }
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Unable to read this image.'))
    reader.onload = () => {
      const image = new Image()
      image.onerror = () => reject(new Error('Unable to process this image.'))
      image.onload = () => {
        const scale = Math.min(1, 1200 / Math.max(image.width, image.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(image.width * scale)
        canvas.height = Math.round(image.height * scale)
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/webp', 0.82))
      }
      image.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}

function AdminPage({ products, shopItems, imageOverrides, saveImageOverride, removeImageOverride, catalogLoading, catalogError }) {
  const [submissions, setSubmissions] = useState(() => JSON.parse(localStorage.getItem(intakeStorageKey) || '[]'))
  const [selfies, setSelfies] = useState(() => JSON.parse(localStorage.getItem(selfieStorageKey) || '[]'))
  const [purchases, setPurchases] = useState(() => JSON.parse(localStorage.getItem(purchaseStorageKey) || '[]'))
  const [bookings, setBookings] = useState(() => JSON.parse(localStorage.getItem(bookingStorageKey) || '[]'))
  const [selected, setSelected] = useState(null)
  const [activeTab, setActiveTab] = useState('intake')
  const [productUploadStatus, setProductUploadStatus] = useState({})

  const uploadProductImage = async (productId, file) => {
    if (!file) return
    setProductUploadStatus((current) => ({ ...current, [productId]: 'Processing image...' }))
    try {
      const image = await optimizeProductImage(file)
      saveImageOverride(productId, image)
      setProductUploadStatus((current) => ({ ...current, [productId]: 'Custom image saved in this browser.' }))
    } catch (error) {
      setProductUploadStatus((current) => ({ ...current, [productId]: error.message }))
    }
  }

  const removeSubmission = (id) => {
    if (!window.confirm('Remove this submission from this browser?')) return
    const next = submissions.filter((submission) => submission.id !== id)
    localStorage.setItem(intakeStorageKey, JSON.stringify(next))
    setSubmissions(next)
    if (selected?.id === id) setSelected(null)
  }

  const removeSelfie = (id) => {
    if (!window.confirm('Remove this selfie from this browser?')) return
    const next = selfies.filter((selfie) => selfie.id !== id)
    localStorage.setItem(selfieStorageKey, JSON.stringify(next))
    setSelfies(next)
  }

  const removePurchase = (id) => {
    if (!window.confirm('Remove this purchase from this browser?')) return
    const next = purchases.filter((purchase) => purchase.id !== id)
    localStorage.setItem(purchaseStorageKey, JSON.stringify(next))
    setPurchases(next)
  }

  const removeBooking = (id) => {
    if (!window.confirm('Remove this booking from this browser?')) return
    const next = bookings.filter((booking) => booking.id !== id)
    localStorage.setItem(bookingStorageKey, JSON.stringify(next))
    setBookings(next)
  }

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === selfieStorageKey) setSelfies(JSON.parse(e.newValue || '[]'))
      if (e.key === intakeStorageKey) setSubmissions(JSON.parse(e.newValue || '[]'))
      if (e.key === purchaseStorageKey) setPurchases(JSON.parse(e.newValue || '[]'))
      if (e.key === bookingStorageKey) setBookings(JSON.parse(e.newValue || '[]'))
    }
    const handleSelfieUpdate = () => setSelfies(JSON.parse(localStorage.getItem(selfieStorageKey) || '[]'))
    const handleIntakeUpdate = () => setSubmissions(JSON.parse(localStorage.getItem(intakeStorageKey) || '[]'))
    const handlePurchaseUpdate = () => setPurchases(JSON.parse(localStorage.getItem(purchaseStorageKey) || '[]'))
    const handleBookingUpdate = () => setBookings(JSON.parse(localStorage.getItem(bookingStorageKey) || '[]'))

    window.addEventListener('storage', handleStorage)
    window.addEventListener('selfie-updated', handleSelfieUpdate)
    window.addEventListener('intake-updated', handleIntakeUpdate)
    window.addEventListener('purchase-updated', handlePurchaseUpdate)
    window.addEventListener('booking-updated', handleBookingUpdate)

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('selfie-updated', handleSelfieUpdate)
      window.removeEventListener('intake-updated', handleIntakeUpdate)
      window.removeEventListener('purchase-updated', handlePurchaseUpdate)
      window.removeEventListener('booking-updated', handleBookingUpdate)
    }
  }, [])

  return (
    <main className='admin-page'>
      <div className='admin-header'>
        <div><p>Temporary local dashboard</p><h1>Admin Dashboard</h1></div>
        <a href='/'>Return to website</a>
      </div>
      <div className='admin-notice'>Submissions are stored only in this browser. This temporary view is not suitable for production health data.</div>
      <div className='admin-tabs'>
        <button className={activeTab === 'intake' ? 'active' : ''} onClick={() => setActiveTab('intake')}>Intake Submissions ({submissions.length})</button>
        <button className={activeTab === 'selfies' ? 'active' : ''} onClick={() => setActiveTab('selfies')}>Selfie Submissions ({selfies.length})</button>
        <button className={activeTab === 'purchases' ? 'active' : ''} onClick={() => setActiveTab('purchases')}>Purchases ({purchases.length})</button>
        <button className={activeTab === 'bookings' ? 'active' : ''} onClick={() => setActiveTab('bookings')}>Bookings ({bookings.length})</button>
        <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>Product Images ({products.length + shopItems.length})</button>
      </div>
      {activeTab === 'intake' ? (
        submissions.length === 0 ? (
          <div className='admin-empty'><h2>No submissions yet</h2><p>Completed intake forms will appear here.</p></div>
        ) : (
          <div className='admin-layout'>
            <div className='admin-list'>
              {submissions.map((submission) => (
                <button key={submission.id} className={`admin-list-item ${selected?.id === submission.id ? 'active' : ''}`} onClick={() => setSelected(submission)}>
                  <strong>{submission.fullName}</strong>
                  <span>{submission.email}</span>
                  <small>{new Date(submission.submittedAt).toLocaleString()}</small>
                </button>
              ))}
            </div>
            <div className='admin-detail'>
              {selected ? (
                <>
                  <div className='admin-detail-actions'><button onClick={() => downloadIntakePdf(selected)}>Download PDF</button><button className='danger' onClick={() => removeSubmission(selected.id)}>Remove</button></div>
                  <h2>{selected.fullName}</h2>
                  {Object.entries(selected).filter(([key]) => !['id', 'submittedAt'].includes(key)).map(([key, value]) => (
                    <div className='admin-answer' key={key}>
                      <span>{key.replace(/([A-Z])/g, ' $1')}</span>
                      <p>{typeof value === 'boolean' ? (value ? 'Yes' : 'No') : typeof value === 'object' ? Object.entries(value).map(([question, answer]) => `${question}: ${answer}`).join(' ') : value || 'N/A'}</p>
                    </div>
                  ))}
                </>
              ) : <p>Select a submission to view its answers.</p>}
            </div>
          </div>
        )
      ) : activeTab === 'selfies' ? (
        <div className='admin-selfie-section'>
          {selfies.length === 0 ? (
            <div className='admin-empty'><h2>No selfies yet</h2><p>Uploaded selfies will appear here.</p></div>
          ) : (
            <div className='admin-selfie-grid'>
              {selfies.map((selfie) => (
                <div key={selfie.id} className='admin-selfie-card'>
                  <img src={selfie.image} alt={`Selfie ${selfie.id}`} className='admin-selfie-img' />
                  <div className='admin-selfie-meta'>
                    <span>{new Date(selfie.submittedAt).toLocaleString()}</span>
                    <button className='danger' onClick={() => removeSelfie(selfie.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : activeTab === 'purchases' ? (
        <div className='admin-purchase-section'>
          {purchases.length === 0 ? (
            <div className='admin-empty'><h2>No purchases yet</h2><p>Product purchases will appear here.</p></div>
          ) : (
            <div className='admin-purchase-grid'>
              {purchases.map((purchase) => (
                <div key={purchase.id} className='admin-purchase-card'>
                  <img src={purchase.image} alt={purchase.name} className='admin-purchase-img' />
                  <div className='admin-purchase-meta'>
                    <strong>{purchase.name}</strong>
                    <span>{purchase.price}</span>
                    <small>{new Date(purchase.purchasedAt).toLocaleString()}</small>
                    <button className='danger' onClick={() => removePurchase(purchase.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : activeTab === 'bookings' ? (
        <div className='admin-booking-section'>
          {bookings.length === 0 ? (
            <div className='admin-empty'><h2>No bookings yet</h2><p>Booked appointments will appear here.</p></div>
          ) : (
            <div className='admin-booking-grid'>
              {bookings.map((booking) => (
                <div key={booking.id} className='admin-booking-card'>
                  <div className='admin-booking-meta'>
                    <strong>{booking.service?.name}</strong>
                    <span>{booking.service?.price} · {booking.service?.duration}</span>
                    <span>Date: {booking.date} @ {booking.time}</span>
                    <small>{new Date(booking.bookedAt).toLocaleString()}</small>
                    <button className='danger' onClick={() => removeBooking(booking.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className='admin-product-section'>
          <div className='admin-product-intro'>
            <h2>Storefront Product Images</h2>
            <p>Titles, descriptions, prices, availability, and checkout come from Shopify. Image changes made here are stored only in this browser for testing.</p>
          </div>
          {catalogLoading ? (
            <div className='admin-empty'><h2>Loading Shopify products...</h2></div>
          ) : catalogError ? (
            <div className='admin-empty'><h2>{catalogError}</h2></div>
          ) : (
            <div className='admin-product-grid'>
              {[...products, ...shopItems].map((product) => {
                const productId = product.shopifyProductId
                const name = product.heading || product.name
                return (
                  <article className='admin-product-card' key={productId}>
                    <img src={product.image} alt={name} />
                    <div className='admin-product-card-body'>
                      <span className='admin-product-type'>{product.heading ? 'Book' : 'Product'}</span>
                      <h3>{name}</h3>
                      <p>{product.price}</p>
                      <label className='admin-product-upload'>
                        <span>{imageOverrides[productId] ? 'Change custom image' : 'Upload custom image'}</span>
                        <input type='file' accept='image/*' onChange={(event) => uploadProductImage(productId, event.target.files?.[0])} />
                      </label>
                      {imageOverrides[productId] && <button className='admin-product-reset' onClick={() => removeImageOverride(productId)}>Use original image</button>}
                      {productUploadStatus[productId] && <small>{productUploadStatus[productId]}</small>}
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      )}
    </main>
  )
}

function ImageMarquee() {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  return (
    <section className="image-marquee">
      <div className="marquee-track">
        {[...items, ...items].map((item, index) => (
          <div key={index} className="marquee-item">
            <a
              href="https://www.instagram.com/thedivascare/"
              target="_blank"
              rel="noopener noreferrer"
              className="marquee-link"
            >
              <img
                src={`/images/slider/${item}.webp`}
                alt={`Slide ${item}`}
                className="marquee-image"
                loading="lazy"
                width={300}
                height={400}
              />
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <h2 className="footer-heading">ALL SALES FINAL!</h2>
        <p className="footer-subheading">VISIT US ON INSTAGRAM</p>
      </div>
      <div className="footer-main">
        <div className="footer-column">
          <h3>Newsletter</h3>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email address" aria-label="Email address" />
            <button type="submit">SUBSCRIBE</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <select className="currency-select" aria-label="Currency">
          <option>Philippines (PHP)</option>
          <option>United States (USD)</option>
        </select>
        <div className="payment-icons">
          <img src="https://cdn.jsdelivr.net/gh/activemerchant/payment_icons@master/app/assets/images/payment_icons/american_express.svg" alt="AMEX" height="28" />
          <img src="https://cdn.jsdelivr.net/gh/activemerchant/payment_icons@master/app/assets/images/payment_icons/apple_pay.svg" alt="Apple Pay" height="28" />
          <img src="https://cdn.jsdelivr.net/gh/activemerchant/payment_icons@master/app/assets/images/payment_icons/discover.svg" alt="Discover" height="28" />
          <img src="https://cdn.jsdelivr.net/gh/activemerchant/payment_icons@master/app/assets/images/payment_icons/google_pay.svg" alt="Google Pay" height="28" />
          <img src="https://cdn.jsdelivr.net/gh/activemerchant/payment_icons@master/app/assets/images/payment_icons/master.svg" alt="Mastercard" height="28" />
          <img src="https://cdn.jsdelivr.net/gh/activemerchant/payment_icons@master/app/assets/images/payment_icons/shopify_pay.svg" alt="Shop Pay" height="28" />
          <img src="https://cdn.jsdelivr.net/gh/activemerchant/payment_icons@master/app/assets/images/payment_icons/visa.svg" alt="Visa" height="28" />
        </div>
        <p className="copyright">(c) 2026, The Divas Care LLC. Powered by Shopify</p>
      </div>
    </footer>
  )
}

function BookMePage() {
  const [selectedService, setSelectedService] = useState(null)
  const [booking, setBooking] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleConfirm = (date, time) => {
    const service = selectedService
    const record = {
      id: Date.now(),
      service,
      date,
      time,
      bookedAt: new Date().toISOString(),
    }
    const previous = JSON.parse(localStorage.getItem(bookingStorageKey) || '[]')
    localStorage.setItem(bookingStorageKey, JSON.stringify([record, ...previous]))
    window.dispatchEvent(new CustomEvent('booking-updated'))
    setSelectedService(null)
    setBooking(record)
    setShowSuccess(true)
  }

  return (
    <div className="book-me-page page-enter">
      <div className="book-me-header">
        <h1>The Divas Care LLC.</h1>
      </div>

      <section className="book-me-notice">
        <h2>ATTENTION ALL CLIENTS!</h2>
        <p>
          After booking your service, <strong>PLEASE TEXT</strong> us at:
        </p>
        <p className="phone-number">(786) 728-1641</p>

        <h3>I WILL NEED THE FOLLOWING INFORMATION:</h3>
        <ul>
          <li>- Location Address</li>
          <li>- Date & Time</li>
          <li>- Any Special Requests</li>
        </ul>

        <h3>- PLEASE NOTE:</h3>
        <ul>
          <li>- Prices are subject to change based on location.</li>
          <li>- NO REFUNDS! ALL SALES ARE FINAL!</li>
        </ul>

        <p>- LIST OF NEEDS/ITEMS will be given after booking.</p>

        <h3>- THANK YOU IN ADVANCE FOR YOUR COOPERATION!</h3>
        <p>We appreciate your trust and look forward to serving you!</p>

        <hr />

        <p>
          <strong>Need help?</strong> Feel free to reach out! We're here to make your experience amazing!
        </p>
      </section>

      <section className="consultation-card-section">
        <img src={consultationCardImg} alt="15-Minute Consultation $30" />
      </section>

      <section className="consultation-details">
        <p className="lead">
          Elevate Your Recovery Experience with a Diva\'s Care Consultation! <Headphones size={18} className="inline-icon" />
        </p>
        <p>
          Are you planning your cosmetic surgery journey and want to make sure your recovery is
          flawless? Or maybe you're already post-op and just need some expert guidance on how to heal
          like a diva. Either way, The Diva\'s Care has you covered!
        </p>
        <p>We're excited to announce our 15-Minute Consultation for just $30!</p>

        <h3><Gem size={18} className="inline-icon" /> Here's Why You Should Book Your Consultation:</h3>
        <ol>
          <li>
            <strong>Expert Advice:</strong> Get personalized guidance from a certified post-op care specialist.
          </li>
          <li>
            <strong>Plan Your Recovery:</strong> We'll help you understand the essential supplies, techniques, and strategies for a smooth healing process.
          </li>
          <li>
            <strong>Credit Towards Services:</strong> Your $30 consultation fee goes directly toward any post-op care service you book with us!
          </li>
        </ol>

        <h2 className="select-appointment-title">Select Appointment</h2>
      </section>

      <BookingCardsSection onBook={setSelectedService} />

      {selectedService && (
        <BookingModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onConfirm={handleConfirm}
        />
      )}

      {showSuccess && booking && (
        <BookingSuccessModal
          service={booking.service}
          date={booking.date}
          time={booking.time}
          onClose={() => { setShowSuccess(false); setBooking(null) }}
        />
      )}
    </div>
  )
}

function LandingPage({ onEnter }) {
  return (
    <main className="landing-page">
      <div className="landing-image" style={{ backgroundImage: `url(${divaImg})` }} />
      <div className="landing-shade" />
      <div className="landing-content">
        <p className="landing-kicker">Post-op care, elevated</p>
        <h1>Recovery, reimagined.</h1>
        <p className="landing-copy">
          Thoughtful support for every chapter of your transformation.
        </p>
        <button className="landing-enter" onClick={onEnter}>
          Join the Experience
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="landing-footer">
        <span>Mobile service across South Florida</span>
        <span className="landing-footer-center">Private care. Powerful recovery.</span>
        <span>Est. 2020</span>
      </div>
    </main>
  )
}

function CartPage({ cart, removeFromCart, onNavigate }) {
  const [bulkLoading, setBulkLoading] = useState(false)
  const [selectedIds, setSelectedIds] = useState(new Set())

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === cart.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(cart.map((item) => item.cartId)))
    }
  }

  const handleCheckoutSelected = async () => {
    const items = cart.filter((item) => selectedIds.has(item.cartId) && item.shopifyVariantId)
    if (items.length === 0) return
    setBulkLoading(true)
    try {
      if (items.length === 1) {
        await buyNow(items[0].shopifyVariantId)
      } else {
        const lineItems = items.map((item) => ({ variantId: item.shopifyVariantId, quantity: 1 }))
        await goToCheckout(lineItems)
      }
    } catch (err) {
      console.error('Shopify checkout error:', err)
      setBulkLoading(false)
    }
  }

  return (
    <main className='cart-page'>
      <div className='cart-header'>
        <h1>Your Cart</h1>
        <button className='cart-continue-btn' onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' }), 100) }}>Continue Shopping</button>
      </div>
      {cart.length === 0 ? (
        <div className='cart-empty'>
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <>
          <div className='cart-select-all'>
            <label className='cart-checkbox-label'>
              <input type='checkbox' checked={selectedIds.size === cart.length} onChange={toggleSelectAll} />
              <span>{selectedIds.size === cart.length ? 'Deselect All' : 'Select All'}</span>
            </label>
          </div>
          <div className='cart-list'>
            {cart.map((item) => (
              <div key={item.cartId} className={`cart-item ${selectedIds.has(item.cartId) ? 'selected' : ''}`}>
                <label className='cart-checkbox-label'>
                  <input type='checkbox' checked={selectedIds.has(item.cartId)} onChange={() => toggleSelect(item.cartId)} />
                </label>
                <img src={item.image} alt={item.name} className='cart-item-img' />
                <div className='cart-item-details'>
                  <h3>{item.name}</h3>
                  <p>{item.price}</p>
                </div>
                <div className='cart-item-actions'>
                  <button className='cart-remove-btn' onClick={() => removeFromCart(item.cartId)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className='cart-checkout-row'>
            <button className='cart-checkout-btn' onClick={handleCheckoutSelected} disabled={bulkLoading || selectedIds.size === 0}>
              {bulkLoading ? 'Redirecting to Checkout...' : `Checkout Selected (${selectedIds.size})`}
            </button>
          </div>
        </>
      )}
    </main>
  )
}

function App() {
  const searchParams = new URLSearchParams(window.location.search)
  const isAdmin = searchParams.has('admin') || window.location.hash === '#admin' || window.location.pathname.toLowerCase().includes('/admin')
  const isIntake = searchParams.get('intake') === '1'
  const [page, setPage] = useState('landing')
  const [theme, setTheme] = useState('dark')
  const [cart, setCart] = useState([])
  const [cartBumped, setCartBumped] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedShop, setSelectedShop] = useState(null)
  const catalog = useStoreCatalog()
  const products = catalog.books
  const shopItems = catalog.shop
  const cartCount = cart.length

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  const selectProduct = (p) => { setSelectedProduct(p); setSelectedShop(null) }
  const selectShop = (s) => { setSelectedShop(s); setSelectedProduct(null) }
  const navigate = (p) => { setSelectedProduct(null); setSelectedShop(null); setPage(p) }

  const addToCart = (item) => {
    setCart((prev) => [...prev, { ...item, cartId: Date.now() }])
    setCartBumped(true)
    setTimeout(() => setCartBumped(false), 300)
  }

  const removeFromCart = (cartId) => {
    setCart((prev) => prev.filter((i) => i.cartId !== cartId))
  }

  if (isAdmin) {
    return <AdminPage products={products} shopItems={shopItems} imageOverrides={catalog.imageOverrides} saveImageOverride={catalog.saveImageOverride} removeImageOverride={catalog.removeImageOverride} catalogLoading={catalog.catalogLoading} catalogError={catalog.catalogError} />
  }

  if (isIntake) {
    return <IntakeFormModal standalone />
  }

  if (page === 'landing') {
    return <LandingPage onEnter={() => setPage('home')} />
  }

  return (
    <>
      <Header
        activePage={page}
        onNavigate={navigate}
        theme={theme}
        onToggleTheme={toggleTheme}
        cartCount={cartCount}
        cartBumped={cartBumped}
        onCartClick={() => navigate('cart')}
      />
      {page === 'cart' ? (
        <CartPage cart={cart} removeFromCart={removeFromCart} onNavigate={navigate} />
      ) : selectedProduct ? (
        <ProductDetailPage
          product={selectedProduct}
          onBack={() => {
            setSelectedProduct(null)
            setTimeout(() => {
              const el = document.getElementById('books-section')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }, 0)
          }}
          onSelectProduct={selectProduct}
          onSelectShop={selectShop}
          addToCart={addToCart}
          products={products}
          shopItems={shopItems}
        />
      ) : selectedShop ? (
        <ShopDetailPage
          item={selectedShop}
          onBack={() => {
            setSelectedShop(null)
            setTimeout(() => {
              const el = document.getElementById('products-section')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }, 0)
          }}
          onSelectShop={selectShop}
          onSelectBook={selectProduct}
          addToCart={addToCart}
          products={products}
          shopItems={shopItems}
        />
      ) : page === 'home' ? (
        <main className='main-page'>
          <RevealSection direction='up'>
            <section className='welcome-strip'>
              <div>
                <p className='welcome-label'>What is Divas Care?</p>
                <p className='welcome-mark'>Care that moves with you.</p>
              </div>
              <p className='welcome-copy'>
                We bring calm, confidence, and expert post-op support to the moments that matter most.
                Your transformation deserves to feel just as good as it looks.
              </p>
            </section>
          </RevealSection>
          <RevealSection direction='up'>
            <VideoSection />
          </RevealSection>
          <RevealSection direction='up'>
            <BooksSection products={products} onSelectProduct={selectProduct} />
          </RevealSection>
          <RevealSection direction='left'>
            <FormsSection />
          </RevealSection>
          <RevealSection direction='up'>
            <ResultsShowcase />
          </RevealSection>
          <RevealSection direction='right'>
            <ProductsSection onSelectShop={selectShop} shopItems={shopItems} />
          </RevealSection>
          <RevealSection direction='up'>
            <BookingPromoSection onNavigate={navigate} />
          </RevealSection>
          <RevealSection direction='left'>
            <SelfiePanel />
          </RevealSection>
          <RevealSection direction='up'>
            <ServicesSection />
          </RevealSection>
          <RevealSection direction='up'>
            <ReviewsSection />
          </RevealSection>
          <RevealSection direction='up'>
            <ImageMarquee />
          </RevealSection>
        </main>
      ) : (
        <BookMePage />
      )}
      <Footer />
    </>
  )
}

export default App

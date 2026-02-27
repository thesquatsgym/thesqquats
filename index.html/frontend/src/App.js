import { useState, useEffect, useRef } from "react";
import "@/App.css";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import axios from "axios";
import { 
  Dumbbell, 
  Heart, 
  Zap, 
  Users, 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  ChevronRight,
  Menu,
  X,
  Check,
  Award,
  Target,
  TrendingUp,
  Camera,
  Building2,
  Sparkles,
  MessageCircle,
  Send,
  Mail,
  User,
  Facebook,
  Instagram,
  Calendar
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { Toaster, toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Transformation images from user
const TRANSFORMATION_IMAGES = [
  "https://customer-assets.emergentagent.com/job_dark-fit-hub/artifacts/jkd0u6ye_WhatsApp%20Image%202026-02-23%20at%2016.09.27%20%281%29.jpeg",
  "https://customer-assets.emergentagent.com/job_dark-fit-hub/artifacts/8g783oyd_WhatsApp%20Image%202026-02-23%20at%2016.09.28.jpeg",
  "https://customer-assets.emergentagent.com/job_dark-fit-hub/artifacts/8c3zzkoe_WhatsApp%20Image%202026-02-23%20at%2016.09.29%20%281%29.jpeg",
  "https://customer-assets.emergentagent.com/job_dark-fit-hub/artifacts/rxt641z5_WhatsApp%20Image%202026-02-23%20at%2016.09.29.jpeg",
  "https://customer-assets.emergentagent.com/job_dark-fit-hub/artifacts/m6ild7b4_WhatsApp%20Image%202026-02-23%20at%2016.15.59.jpeg"
];

// Social Media Links
const SOCIAL_LINKS = {
  facebookGym: "https://www.facebook.com/share/18GnpH2xSh/",
  facebookSR: "https://www.facebook.com/share/16w7UZeFNz/",
  instagramGym: "https://www.instagram.com/the_sqquats_gym?igsh=MXJ4d3Rqa3M3Ymk3cw==",
  instagramFitnessLessons: "https://www.instagram.com/fitness_lessons_sr?igsh=MXA1Njd0aG0xNnp1ZA==",
  instagramSR: "https://www.instagram.com/rawat_s84?igsh=OG9hcTN1YXNlbzhu"
};

// WhatsApp Number
const WHATSAPP_NUMBER = "918755811984";
const WHATSAPP_MESSAGE = "Hi! I'm interested in joining The Sqquats Gym. Can you provide more information?";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// WhatsApp Floating Button
const WhatsAppButton = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  
  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      data-testid="whatsapp-button"
    >
      <MessageCircle className="w-7 h-7 text-white fill-white" />
      <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#D4AF37] rounded-full flex items-center justify-center text-[10px] text-black font-bold">1</span>
    </motion.a>
  );
};

// Navbar Component
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#pricing", label: "Pricing" },
    { href: "#team", label: "Team" },
    { href: "#transformations", label: "Results" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`} data-testid="navbar">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-3" data-testid="logo">
            <div className="w-10 h-10 bg-[#D4AF37] flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight">
              THE SQQUATS
            </span>
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link" data-testid={`nav-${link.label.toLowerCase()}`}>
                {link.label}
              </a>
            ))}
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-6 py-2.5 text-sm"
              data-testid="nav-cta"
            >
              Join Now
            </a>
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(true)}
            data-testid="mobile-menu-toggle"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-testid="mobile-menu"
          >
            <button 
              className="absolute top-6 right-6 text-white"
              onClick={() => setMobileMenuOpen(false)}
              data-testid="mobile-menu-close"
            >
              <X className="w-8 h-8" />
            </button>
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-8 py-3 mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Join Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Hero Section
const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="hero-section" data-testid="hero-section">
      <motion.div className="hero-bg" style={{ y }}>
        <img 
          src="https://images.pexels.com/photos/9669473/pexels-photo-9669473.jpeg" 
          alt="Gym Background"
        />
        <div className="hero-gradient" />
      </motion.div>

      {/* Punching bag behind logo */}
      <div 
        className="absolute inset-0 z-[4] flex items-center justify-center pointer-events-none"
        style={{
          backgroundImage: `url(https://images.pexels.com/photos/9945037/pexels-photo-9945037.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)`,
          backgroundSize: '700px',
          backgroundPosition: 'center right 15%',
          backgroundRepeat: 'no-repeat',
          opacity: 0.35,
          filter: 'brightness(0.9) contrast(1.2)'
        }}
      />

      {/* Logo watermark behind text */}
      <div 
        className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none"
        style={{
          backgroundImage: `url(https://customer-assets.emergentagent.com/job_dark-fit-hub/artifacts/hslp4y4p_e02cd165-0414-4cdf-ae78-bfeca0f92d1b.jpg)`,
          backgroundSize: '720px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.18,
          filter: 'brightness(0.8)'
        }}
      />

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32"
        style={{ opacity }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl"
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="font-mono text-[#D4AF37] text-sm tracking-widest">
              EST. 2020 • HALDWANI
            </span>
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className="font-heading text-5xl sm:text-6xl lg:text-8xl font-black leading-none mb-6"
          >
            HALDWANI'S
            <br />
            <span className="gradient-text">STANDARD</span>
            <br />
            OF STRENGTH
          </motion.h1>

          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-[#A1A1AA] max-w-xl mb-10"
          >
            Transform your body, transform your life. Join 10,000+ members 
            who chose excellence at The Sqquats Gym.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
            <a 
              href="#contact" 
              className="btn-primary px-8 py-4 text-lg flex items-center gap-2"
              data-testid="hero-cta-primary"
            >
              Start Your Journey
              <ChevronRight className="w-5 h-5" />
            </a>
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary px-8 py-4 text-lg flex items-center gap-2"
              data-testid="hero-cta-secondary"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
};

// Stats Section
const StatsSection = () => {
  const stats = [
    { value: "4.9", suffix: "/5", label: "Google Rating" },
    { value: "70", suffix: "%", label: "Retention Rate" },
    { value: "10K", suffix: "+", label: "Trained Clients" },
    { value: "22", suffix: "+", label: "Years Experience" }
  ];

  return (
    <section className="py-16 bg-[#0A0A0A] border-y border-white/10" data-testid="stats-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {stats.map((stat, idx) => (
            <motion.div key={idx} variants={fadeInUp} className="stat-item" data-testid={`stat-${idx}`}>
              <div className="stat-number">
                {stat.value}<span className="text-white/50">{stat.suffix}</span>
              </div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  const services = [
    {
      icon: Dumbbell,
      title: "Strength Training",
      description: "Free weights, machine-based training, progressive overload programs for all levels.",
      image: "https://customer-assets.emergentagent.com/job_dark-fit-hub/artifacts/05tdgpjg_WhatsApp%20Image%202026-02-24%20at%2013.26.51.jpeg",
      features: ["Dumbbells & Barbells", "Hammer Machines", "Beginner to Advanced"]
    },
    {
      icon: Heart,
      title: "Cardio Zone",
      description: "Premium cardio equipment for fat loss, endurance, and heart health development.",
      image: "https://customer-assets.emergentagent.com/job_dark-fit-hub/artifacts/4fe3q629_tredmill.png",
      imagePosition: "center 20%",
      features: ["Treadmills", "Air Bikes", "Cross Trainers"]
    },
    {
      icon: Zap,
      title: "CrossFit",
      description: "High-intensity functional workouts combining strength and cardio for peak performance.",
      image: "https://customer-assets.emergentagent.com/job_dark-fit-hub/artifacts/ulbvrhdv_27af1adc-11f3-471f-a7b5-28a6ad555919.png",
      imagePosition: "center 30%",
      features: ["HIIT Training", "Functional Fitness", "Athletic Performance"]
    },
    {
      icon: Users,
      title: "Personal Training",
      description: "One-on-one coaching with diet plans, form correction, and progress tracking.",
      image: "https://customer-assets.emergentagent.com/job_dark-fit-hub/artifacts/8ax4ff4d_45fb7427-e2a2-47ea-aa2c-a65e23848911.jpg",
      imagePosition: "center 20%",
      features: ["Silver & Gold Plans", "Diet Charts", "Weekly Progress"]
    }
  ];

  return (
    <section id="services" className="py-24 md:py-32" data-testid="services-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="font-mono text-[#D4AF37] text-sm tracking-widest">WHAT WE OFFER</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black mt-4">
            OUR SERVICES
          </h2>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {services.map((service, idx) => (
            <motion.div 
              key={idx} 
              variants={fadeInUp} 
              className="service-card"
              data-testid={`service-card-${idx}`}
            >
              <div className="service-card-image">
                <img 
                  src={service.image} 
                  alt={service.title}
                  style={{ objectPosition: service.imagePosition || 'center' }}
                />
              </div>
              <div className="service-card-content">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#D4AF37]/20 flex items-center justify-center">
                    <service.icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold">{service.title}</h3>
                </div>
                <p className="text-[#A1A1AA] mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, fIdx) => (
                    <span 
                      key={fIdx}
                      className="facility-badge"
                    >
                      <Check className="w-3 h-3" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Pricing Section
const PricingSection = () => {
  const [activeBranch, setActiveBranch] = useState("branch1");

  const branch1Plans = [
    { duration: "1 Month", price: "1,200", discount: null },
    { duration: "2 Months", price: "2,000", discount: "20%" },
    { duration: "3 Months", price: "2,700", discount: "25%", featured: true },
    { duration: "4 Months", price: "3,300", discount: "30%" },
    { duration: "5 Months", price: "4,000", discount: "35%" },
    { duration: "6 Months", price: "4,400", discount: "40%" },
    { duration: "Yearly", price: "8,000", discount: "45%" }
  ];

  const branch2Plans = [
    { duration: "1 Month", price: "1,100", discount: null },
    { duration: "2 Months", price: "1,800", discount: "20%" },
    { duration: "3 Months", price: "2,500", discount: "25%", featured: true },
    { duration: "4 Months", price: "3,100", discount: "30%" },
    { duration: "5 Months", price: "3,600", discount: "35%" },
    { duration: "6 Months", price: "4,000", discount: "40%" },
    { duration: "Yearly", price: "7,200", discount: "45%" }
  ];

  // Branch 1 Special Offers
  const branch1SpecialOffers = [
    {
      title: "Couples Offer",
      icon: Heart,
      plans: [
        { duration: "2 Months", price: "3,400", discount: "30%" },
        { duration: "3 Months", price: "4,400", discount: "40%" },
        { duration: "6 Months", price: "7,200", discount: "50%" }
      ]
    },
    {
      title: "Group Offer (3+)",
      icon: Users,
      plans: [
        { duration: "2 Months", price: "1,800/person", discount: "35%" },
        { duration: "3 Months", price: "2,200/person", discount: "40%" }
      ]
    },
    {
      title: "Senior Citizens",
      icon: Award,
      plans: [
        { duration: "Monthly", price: "500", discount: "Special Rate" }
      ]
    }
  ];

  // Branch 2 Special Offers
  const branch2SpecialOffers = [
    {
      title: "Couples Offer",
      icon: Heart,
      plans: [
        { duration: "2 Months", price: "3,100", discount: "30%" },
        { duration: "3 Months", price: "4,300", discount: "35%" },
        { duration: "6 Months", price: "5,200", discount: "40%" }
      ]
    },
    {
      title: "Group Offer (3+)",
      icon: Users,
      plans: [
        { duration: "2 Months", price: "1,600/person", discount: "30%" },
        { duration: "3 Months", price: "2,000/person", discount: "40%" }
      ]
    },
    {
      title: "Senior Citizens",
      icon: Award,
      plans: [
        { duration: "Monthly", price: "500", discount: "Special Rate" }
      ]
    }
  ];

  const specialOffers = activeBranch === "branch1" ? branch1SpecialOffers : branch2SpecialOffers;

  const personalTraining = [
    {
      name: "Silver",
      price: "5,000",
      features: [
        "Diet Chart",
        "In-gym workout guidance",
        "Proper form training",
        "Trainer support"
      ]
    },
    {
      name: "Gold",
      price: "10,000",
      features: [
        "Everything in Silver",
        "Custom workout schedule",
        "Weekly photo comparison",
        "Video progress tracking",
        "Body measurements",
        "Nutrition guidance"
      ],
      featured: true
    }
  ];

  const PlanCard = ({ plan }) => (
    <div className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-heading text-xl font-bold">{plan.duration}</h4>
          {plan.discount && (
            <span className="font-mono text-[#D4AF37] text-sm">{plan.discount} OFF</span>
          )}
        </div>
      </div>
      <div className="pricing-price">
        <span className="text-lg">Rs.</span> {plan.price}
      </div>
    </div>
  );

  return (
    <section id="pricing" className="py-24 md:py-32 bg-[#0A0A0A]" data-testid="pricing-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="font-mono text-[#D4AF37] text-sm tracking-widest">MEMBERSHIP PLANS</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black mt-4">
            CHOOSE YOUR PLAN
          </h2>
        </motion.div>

        <Tabs defaultValue="branch1" className="w-full" data-testid="pricing-tabs" onValueChange={(value) => setActiveBranch(value)}>
          <TabsList className="bg-transparent border-0 gap-4 mb-12">
            <TabsTrigger 
              value="branch1" 
              className="branch-tab data-[state=active]:active"
              data-testid="branch1-tab"
            >
              <Building2 className="w-4 h-4 mr-2" />
              Branch 1 - Lal Danth Road
            </TabsTrigger>
            <TabsTrigger 
              value="branch2" 
              className="branch-tab data-[state=active]:active"
              data-testid="branch2-tab"
            >
              <Building2 className="w-4 h-4 mr-2" />
              Branch 2 - Gas Godown Road
            </TabsTrigger>
          </TabsList>

          <TabsContent value="branch1">
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {branch1Plans.map((plan, idx) => (
                <motion.div key={idx} variants={fadeInUp} data-testid={`branch1-plan-${idx}`}>
                  <PlanCard plan={plan} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="branch2">
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {branch2Plans.map((plan, idx) => (
                <motion.div key={idx} variants={fadeInUp} data-testid={`branch2-plan-${idx}`}>
                  <PlanCard plan={plan} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Special Offers */}
        <motion.div 
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h3 className="font-heading text-3xl font-bold mb-8">
            SPECIAL OFFERS 
            <span className="text-[#D4AF37] ml-2 text-xl">
              ({activeBranch === "branch1" ? "Branch 1" : "Branch 2"})
            </span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {specialOffers.map((offer, idx) => (
              <div key={idx} className="pricing-card" data-testid={`special-offer-${idx}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#D4AF37]/20 flex items-center justify-center">
                    <offer.icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <h4 className="font-heading text-xl font-bold">{offer.title}</h4>
                </div>
                <div className="space-y-4">
                  {offer.plans.map((plan, pIdx) => (
                    <div key={pIdx} className="flex justify-between items-center border-b border-white/10 pb-3">
                      <div>
                        <span className="text-white/70">{plan.duration}</span>
                        {plan.discount && (
                          <span className="ml-2 text-[#D4AF37] text-sm">({plan.discount})</span>
                        )}
                      </div>
                      <span className="font-heading text-xl font-bold">Rs. {plan.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Personal Training */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h3 className="font-heading text-3xl font-bold mb-8">PERSONAL TRAINING</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {personalTraining.map((plan, idx) => (
              <div 
                key={idx} 
                className={`pricing-card ${plan.featured ? 'featured' : ''}`}
                data-testid={`pt-plan-${idx}`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-6 h-6 text-[#D4AF37]" />
                  <h4 className="font-heading text-2xl font-bold">{plan.name}</h4>
                </div>
                <div className="pricing-price mb-6">
                  Rs. {plan.price}<span>/month</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-[#A1A1AA]">
                      <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi! I'm interested in ${plan.name} Personal Training plan.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full py-3 mt-8 text-center block"
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Additional Services */}
        <motion.div
          className="mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h3 className="font-heading text-3xl font-bold mb-8">ADDITIONAL SERVICES</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Diet/Nutrition Chart */}
            <div className="pricing-card" data-testid="diet-chart-service">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#D4AF37]/20 flex items-center justify-center rounded">
                  <Target className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="font-heading text-2xl font-bold">Diet / Nutrition Chart</h4>
                  <span className="text-[#D4AF37] font-mono text-sm">Quantified & Personalized</span>
                </div>
              </div>
              <p className="text-[#A1A1AA] mb-6">
                Get a customized, quantified diet chart based on your body type, goals, and lifestyle. 
                Includes calorie calculations, macro breakdown, and meal timings.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-[#A1A1AA]">
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                  Personalized calorie intake
                </li>
                <li className="flex items-center gap-2 text-[#A1A1AA]">
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                  Protein, carbs & fat breakdown
                </li>
                <li className="flex items-center gap-2 text-[#A1A1AA]">
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                  Indian food options included
                </li>
              </ul>
              <div className="flex items-center justify-between">
                <div className="pricing-price text-3xl">
                  Rs. 200
                </div>
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I want to get a Diet/Nutrition Chart.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-6 py-3"
                >
                  Get Now
                </a>
              </div>
            </div>

            {/* Workout Schedule */}
            <div className="pricing-card" data-testid="workout-schedule-service">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#D4AF37]/20 flex items-center justify-center rounded">
                  <Dumbbell className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="font-heading text-2xl font-bold">Workout Schedule</h4>
                  <span className="text-[#D4AF37] font-mono text-sm">Structured & Goal-Oriented</span>
                </div>
              </div>
              <p className="text-[#A1A1AA] mb-6">
                Get a professionally designed workout schedule tailored to your fitness goals - 
                whether it's muscle building, fat loss, or strength training.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-[#A1A1AA]">
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                  Weekly workout plan
                </li>
                <li className="flex items-center gap-2 text-[#A1A1AA]">
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                  Exercise with sets & reps
                </li>
                <li className="flex items-center gap-2 text-[#A1A1AA]">
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                  Progressive overload guidance
                </li>
              </ul>
              <div className="flex items-center justify-between">
                <div className="pricing-price text-3xl">
                  Rs. 200
                </div>
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I want to get a Workout Schedule.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-6 py-3"
                >
                  Get Now
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Team Section
const TeamSection = () => {
  const team = [
    {
      name: "Mentor SR",
      role: "Founder & Head Coach",
      experience: "22+ Years Experience",
      certifications: "Engineer • Personal Trainer • Nutritionist • INFS Certified",
      image: "https://customer-assets.emergentagent.com/job_dark-fit-hub/artifacts/f6di58us_WhatsApp%20Image%202026-02-24%20at%2012.44.09%20%282%29.jpeg"
    },
    {
      name: "Chetan Sanwal",
      role: "Admin HOD",
      experience: "Operations & Management",
      certifications: "Gym Administration Expert",
      image: "https://customer-assets.emergentagent.com/job_dark-fit-hub/artifacts/zp3om8bd_WhatsApp%20Image%202026-02-24%20at%2012.44.10.jpeg"
    },
    {
      name: "Pankaj Vishvakarma",
      role: "Senior Trainer",
      experience: "Strength & Conditioning",
      certifications: "Certified Fitness Trainer",
      image: "https://customer-assets.emergentagent.com/job_dark-fit-hub/artifacts/i0p11rdx_WhatsApp%20Image%202026-02-24%20at%2012.44.09.jpeg"
    },
    {
      name: "Gaurav Bargali",
      role: "Trainer",
      experience: "Fitness & Nutrition",
      certifications: "Certified Personal Trainer",
      image: "https://customer-assets.emergentagent.com/job_dark-fit-hub/artifacts/rcafwxug_WhatsApp%20Image%202026-02-24%20at%2012.44.09%20%281%29.jpeg"
    }
  ];

  return (
    <section id="team" className="py-24 md:py-32" data-testid="team-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="font-mono text-[#D4AF37] text-sm tracking-widest">THE EXPERTS</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black mt-4">
            MEET OUR TEAM
          </h2>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {team.map((member, idx) => (
            <motion.div 
              key={idx} 
              variants={fadeInUp} 
              className="team-card"
              data-testid={`team-card-${idx}`}
            >
              <div className="team-card-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="team-card-overlay">
                <h3 className="font-heading text-2xl font-bold">{member.name}</h3>
                <p className="text-[#D4AF37] font-medium mt-1">{member.role}</p>
                <p className="text-[#A1A1AA] text-sm mt-2">{member.experience}</p>
                <p className="text-[#52525B] text-xs mt-1">{member.certifications}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Transformations Section
const TransformationsSection = () => {
  return (
    <section id="transformations" className="py-24 md:py-32 bg-[#0A0A0A]" data-testid="transformations-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div>
            <span className="font-mono text-[#D4AF37] text-sm tracking-widest">SUCCESS STORIES</span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black mt-4">
              REAL RESULTS
            </h2>
            <p className="text-[#A1A1AA] mt-4 max-w-xl">
              Our members' transformations speak louder than words. Join thousands who've 
              already transformed their lives at The Sqquats Gym.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[#D4AF37]">
            <Camera className="w-5 h-5" />
            <span className="font-mono text-sm">Before & After</span>
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {TRANSFORMATION_IMAGES.map((img, idx) => (
            <motion.div 
              key={idx} 
              variants={fadeInUp} 
              className="transform-card"
              data-testid={`transform-card-${idx}`}
            >
              <img src={img} alt={`Transformation ${idx + 1}`} />
              <div className="transform-overlay">
                <div className="absolute bottom-4 left-4">
                  <TrendingUp className="w-6 h-6 text-[#D4AF37]" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Events Section
const EventsSection = () => {
  const events = [
    {
      title: "Cricket Matches",
      description: "Quarterly cricket tournaments bringing our gym family together",
      image: "https://customer-assets.emergentagent.com/job_dark-fit-hub/artifacts/z4i4bsm6_a851321c-599c-4477-94e0-7c99c4d0945b.jpg"
    },
    {
      title: "Weightlifting Competitions",
      description: "Test your strength in our in-house powerlifting events",
      image: "https://customer-assets.emergentagent.com/job_dark-fit-hub/artifacts/l84ju9fb_8a5d62b1-2040-443a-b4d3-c961f730a3de.jpg"
    },
    {
      title: "Motorcycle Rides",
      description: "Adventure rides exploring the beautiful Uttarakhand terrain",
      image: "https://customer-assets.emergentagent.com/job_dark-fit-hub/artifacts/nsmm6e0d_32627137-ee58-47ca-832a-08fa1526ea71.jpg"
    },
    {
      title: "Birthday Celebrations",
      description: "We celebrate our members with special gifts & recognition",
      image: "https://customer-assets.emergentagent.com/job_dark-fit-hub/artifacts/ot28hcid_ad39010f-5fa8-4740-a022-20a8755c235d.jpg"
    },
    {
      title: "Social Gatherings",
      description: "Building bonds beyond the gym with community meetups",
      image: "https://customer-assets.emergentagent.com/job_dark-fit-hub/artifacts/kohtfmnn_bcd35f51-89cb-49f2-bf71-ae81fad5daf4.jpg"
    },
    {
      title: "Football Matches",
      description: "Team sports bringing the gym family together on the field",
      image: "https://customer-assets.emergentagent.com/job_dark-fit-hub/artifacts/lgyy62o4_4ccc3d4d-7895-4a2f-bc9a-6017623bb4f7.jpg"
    }
  ];

  return (
    <section id="events" className="py-24 md:py-32" data-testid="events-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="font-mono text-[#D4AF37] text-sm tracking-widest">COMMUNITY EVENTS</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black mt-4">
            MORE THAN A GYM
          </h2>
          <p className="text-[#A1A1AA] mt-4 max-w-2xl">
            At The Sqquats, we're not just about lifting weights — we're a family. 
            From sports tournaments to adventure rides, we build bonds that last a lifetime.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {events.map((event, idx) => (
            <motion.div 
              key={idx} 
              variants={fadeInUp} 
              className={`relative overflow-hidden rounded group ${idx === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              data-testid={`event-card-${idx}`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-heading text-2xl font-bold text-white mb-2">{event.title}</h3>
                <p className="text-white/70 text-sm">{event.description}</p>
              </div>
              <div className="absolute top-4 right-4 w-10 h-10 bg-[#D4AF37] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Calendar className="w-5 h-5 text-black" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Event badges */}
        <motion.div 
          className="mt-12 flex flex-wrap justify-center gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="facility-badge">
            <Users className="w-4 h-4" />
            Cricket/Football Matches
          </div>
          <div className="facility-badge">
            <Dumbbell className="w-4 h-4" />
            Weightlifting Competitions
          </div>
          <div className="facility-badge">
            <Zap className="w-4 h-4" />
            Motorcycle Rides
          </div>
          <div className="facility-badge">
            <Award className="w-4 h-4" />
            Birthday Celebrations
          </div>
          <div className="facility-badge">
            <Heart className="w-4 h-4" />
            Social Gatherings
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const facilities = [
    "2-Floor Premium Gym",
    "Best View of Haldwani",
    "Sufficient Parking",
    "CCTV Monitoring",
    "Hammer Machines",
    "Premium Cardio Equipment",
    "Stretching Area",
    "Quarterly Competitions"
  ];

  return (
    <section className="py-24 md:py-32" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.span variants={fadeInUp} className="font-mono text-[#D4AF37] text-sm tracking-widest">
              ABOUT THE SQQUATS
            </motion.span>
            <motion.h2 variants={fadeInUp} className="font-heading text-4xl md:text-5xl font-black mt-4 mb-6">
              HALDWANI'S MOST<br />TRUSTED GYM
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[#A1A1AA] text-lg mb-8">
              Established in 2020, The Sqquats Gym has become Haldwani's premier fitness destination 
              with the highest Google rating of 4.9/5. Our second branch opened in 2024 to serve 
              more fitness enthusiasts.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4 mb-8">
              {facilities.map((facility, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[#A1A1AA]">
                  <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <span className="text-sm">{facility}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <div className="facility-badge">
                <Star className="w-4 h-4" />
                Top Rated in Haldwani
              </div>
              <div className="facility-badge">
                <Target className="w-4 h-4" />
                70% Retention Rate
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square bg-[#0A0A0A] border border-[#D4AF37]/30 overflow-hidden">
              <img 
                src="https://customer-assets.emergentagent.com/job_dark-fit-hub/artifacts/je9c1vvm_0d42ee1f-4462-4841-8594-07062d3fac5e.jpg" 
                alt="The Sqquats Gym - Cardio Zone"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#D4AF37] p-6">
              <div className="font-heading text-4xl font-black text-black">2020</div>
              <div className="font-mono text-sm text-black/80">EST.</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Contact Form Component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    interest: "General Inquiry"
  });
  const [loading, setLoading] = useState(false);

  const interests = [
    "General Inquiry",
    "Monthly Membership",
    "Personal Training - Silver",
    "Personal Training - Gold",
    "Couples Offer",
    "Group Offer",
    "Senior Citizen Plan"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/contact`, formData);
      toast.success("Thank you! We'll contact you soon.", {
        description: "Your inquiry has been submitted successfully."
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        interest: "General Inquiry"
      });
    } catch (error) {
      toast.error("Failed to submit", {
        description: "Please try again or contact us via WhatsApp."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="contact-card space-y-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      data-testid="contact-form"
    >
      <div className="flex items-center gap-3 mb-6">
        <Send className="w-6 h-6 text-[#D4AF37]" />
        <h3 className="font-heading text-2xl font-bold">Send Us a Message</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-[#A1A1AA] mb-2">Your Name *</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#52525B]" />
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-[#121212] border border-white/10 rounded px-4 py-3 pl-11 text-white placeholder-[#52525B] focus:border-[#D4AF37] focus:outline-none transition-colors"
              placeholder="John Doe"
              data-testid="contact-name"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-[#A1A1AA] mb-2">Email Address *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#52525B]" />
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-[#121212] border border-white/10 rounded px-4 py-3 pl-11 text-white placeholder-[#52525B] focus:border-[#D4AF37] focus:outline-none transition-colors"
              placeholder="john@example.com"
              data-testid="contact-email"
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-[#A1A1AA] mb-2">Phone Number *</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#52525B]" />
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full bg-[#121212] border border-white/10 rounded px-4 py-3 pl-11 text-white placeholder-[#52525B] focus:border-[#D4AF37] focus:outline-none transition-colors"
              placeholder="9876543210"
              data-testid="contact-phone"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-[#A1A1AA] mb-2">I'm Interested In</label>
          <select
            value={formData.interest}
            onChange={(e) => setFormData({...formData, interest: e.target.value})}
            className="w-full bg-[#121212] border border-white/10 rounded px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none transition-colors"
            data-testid="contact-interest"
          >
            {interests.map((interest) => (
              <option key={interest} value={interest}>{interest}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm text-[#A1A1AA] mb-2">Your Message *</label>
        <textarea
          required
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          rows={4}
          className="w-full bg-[#121212] border border-white/10 rounded px-4 py-3 text-white placeholder-[#52525B] focus:border-[#D4AF37] focus:outline-none transition-colors resize-none"
          placeholder="Tell us about your fitness goals..."
          data-testid="contact-message"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full py-4 flex items-center justify-center gap-2 disabled:opacity-50"
        data-testid="contact-submit"
      >
        {loading ? (
          <>Sending...</>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </button>
    </motion.form>
  );
};

// Contact Section with Maps
const ContactSection = () => {
  const branches = [
    {
      name: "Branch 1",
      address: "100 A, Lal Danth Road, Haldwani 263139",
      established: "Est. 2020",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3484.7!2d79.51!3d29.22!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sLal%20Danth%20Road%2C%20Haldwani!5e0!3m2!1sen!2sin!4v1234567890"
    },
    {
      name: "Branch 2",
      address: "'S' Bend, Gas Godown Road, Charial, Haldwani 263139",
      established: "Est. 2024",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3484.7!2d79.52!3d29.21!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sGas%20Godown%20Road%2C%20Charial%2C%20Haldwani!5e0!3m2!1sen!2sin!4v1234567891"
    }
  ];

  const contacts = [
    { name: "SR", phone: "8755811984" },
    { name: "Chetan", phone: "8126056658" },
    { name: "Pankaj", phone: "9119722909" }
  ];

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#0A0A0A]" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="font-mono text-[#D4AF37] text-sm tracking-widest">GET IN TOUCH</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black mt-4">
            VISIT US TODAY
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <ContactForm />

          {/* Branch Info & Maps */}
          <div className="space-y-6">
            {branches.map((branch, idx) => (
              <motion.div 
                key={idx}
                className="contact-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                data-testid={`branch-card-${idx}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-[#D4AF37]" />
                  <div>
                    <h3 className="font-heading text-xl font-bold">{branch.name}</h3>
                    <span className="font-mono text-xs text-[#D4AF37]">{branch.established}</span>
                  </div>
                </div>
                <p className="text-[#A1A1AA] mb-4">{branch.address}</p>
                
                {/* Google Map */}
                <div className="w-full h-48 bg-[#121212] rounded overflow-hidden" data-testid={`map-${idx}`}>
                  <iframe
                    src={`https://www.google.com/maps?q=${encodeURIComponent(branch.address)}&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${branch.name} Map`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {contacts.map((contact, idx) => (
            <motion.a 
              key={idx}
              href={`tel:${contact.phone}`}
              className="contact-card flex items-center gap-4 hover:border-[#D4AF37] transition-colors"
              variants={fadeInUp}
              data-testid={`contact-card-${idx}`}
            >
              <div className="w-12 h-12 bg-[#D4AF37]/20 flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <p className="font-heading text-lg font-bold">{contact.name}</p>
                <p className="text-[#A1A1AA]">{contact.phone}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Operating Hours */}
        <motion.div 
          className="contact-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-heading text-2xl font-bold">Operating Hours</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-[#A1A1AA] mb-1">Morning</p>
              <p className="font-heading text-xl font-bold">5:00 AM - 10:00 AM</p>
            </div>
            <div>
              <p className="text-[#A1A1AA] mb-1">Evening</p>
              <p className="font-heading text-xl font-bold">4:00 PM - 10:00 PM</p>
            </div>
            <div>
              <p className="text-[#A1A1AA] mb-1">Weekly Off</p>
              <p className="font-heading text-xl font-bold text-[#D4AF37]">Sunday</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer with Social Links
const Footer = () => {
  return (
    <footer className="footer" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#D4AF37] flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <span className="font-heading text-xl font-bold tracking-tight">
                THE SQQUATS
              </span>
            </div>
            <p className="text-[#A1A1AA] mb-6">
              Haldwani's Standard of Strength. Transform your body, transform your life.
            </p>
            {/* Social Links */}
            <div className="flex gap-3" data-testid="social-links">
              <a 
                href={SOCIAL_LINKS.facebookGym}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] transition-colors"
                data-testid="social-facebook-gym"
                title="Facebook - The Sqquats Gyms"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href={SOCIAL_LINKS.instagramGym}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] hover:border-transparent transition-all"
                data-testid="social-instagram-gym"
                title="Instagram - The Sqquats Gym"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] transition-colors"
                data-testid="social-whatsapp"
                title="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-bold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#services" className="block text-[#A1A1AA] hover:text-[#D4AF37] transition-colors">Services</a>
              <a href="#pricing" className="block text-[#A1A1AA] hover:text-[#D4AF37] transition-colors">Pricing</a>
              <a href="#team" className="block text-[#A1A1AA] hover:text-[#D4AF37] transition-colors">Team</a>
              <a href="#transformations" className="block text-[#A1A1AA] hover:text-[#D4AF37] transition-colors">Results</a>
              <a href="#contact" className="block text-[#A1A1AA] hover:text-[#D4AF37] transition-colors">Contact</a>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-bold mb-4">Follow SR</h4>
            <div className="space-y-2">
              <a 
                href={SOCIAL_LINKS.facebookSR}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#A1A1AA] hover:text-[#1877F2] transition-colors"
              >
                <Facebook className="w-4 h-4" />
                Facebook
              </a>
              <a 
                href={SOCIAL_LINKS.instagramSR}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#A1A1AA] hover:text-[#E4405F] transition-colors"
              >
                <Instagram className="w-4 h-4" />
                @rawat_s84
              </a>
              <a 
                href={SOCIAL_LINKS.instagramFitnessLessons}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#A1A1AA] hover:text-[#E4405F] transition-colors"
              >
                <Instagram className="w-4 h-4" />
                @fitness_lessons_sr
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-bold mb-4">Contact Us</h4>
            <div className="space-y-2 text-[#A1A1AA]">
              <a href="tel:8755811984" className="block hover:text-[#D4AF37] transition-colors">SR: 8755811984</a>
              <a href="tel:8126056658" className="block hover:text-[#D4AF37] transition-colors">Chetan: 8126056658</a>
              <a href="tel:9119722909" className="block hover:text-[#D4AF37] transition-colors">Pankaj: 9119722909</a>
              <a href="mailto:thesquatsgym2020@gmail.com" className="block hover:text-[#D4AF37] transition-colors text-sm mt-4">
                thesquatsgym2020@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#52525B] text-sm">
            © {new Date().getFullYear()} The Sqquats Gym. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[#A1A1AA] text-sm">4.9/5 on Google Reviews</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App
function App() {
  return (
    <div className="App">
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#0A0A0A',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff'
          }
        }}
      />
      <div className="noise-overlay" />
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <PricingSection />
      <TeamSection />
      <TransformationsSection />
      <EventsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;

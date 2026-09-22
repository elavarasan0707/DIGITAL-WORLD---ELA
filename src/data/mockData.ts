import { ServiceItem, ProjectItem, BlogPost, TestimonialItem } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    icon: 'TrendingUp',
    shortDescription: 'Data-driven omni-channel campaigns engineered to dominate your market and maximize ROI.',
    fullDescription: 'Our end-to-end digital marketing ecosystem unites programmatic performance marketing, dynamic content engines, cross-platform media buys, and real-time conversion tracking. We turn ad spend into exponential enterprise revenue.',
    keyBenefits: ['Full-funnel attribution modelling', 'Multi-channel audience retargeting', 'Aggressive CAC reduction', 'Predictive budget optimization'],
    deliverables: ['Performance media strategy', 'Creative asset matrices', 'A/B testing sprint schedules', 'Executive analytics dashboard'],
    resultsTarget: 'Average 3.8x ROAS across first 90 days',
    technologies: ['Google Ads 360', 'Meta Business Suite', 'TikTok Ads Manager', 'Mixpanel', 'GA4']
  },
  {
    id: 'web-development',
    slug: 'web-development',
    title: 'Web Development',
    icon: 'Globe',
    shortDescription: 'Futuristic, ultra-fast web platforms with 3D interactions, Next-gen tech, and relentless conversion focus.',
    fullDescription: 'We build high-performance web applications, interactive 3D digital flagship experiences, and scalable enterprise portals designed to captivate visitors, load in milliseconds, and convert high-ticket leads effortlessly.',
    keyBenefits: ['Sub-second latency & 99.9% uptime', 'Custom 3D WebGL & interactive micro-journeys', 'Headless architecture & CMS control', 'Mobile-first responsive architecture'],
    deliverables: ['Custom bespoke frontend codebase', 'Scalable serverless cloud architecture', 'Automated CI/CD deployment pipelines', 'Technical SEO & schema markup'],
    resultsTarget: '<0.8s First Contentful Paint, 98+ Lighthouse scores',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Three.js / WebGL', 'Firebase / Cloud Run']
  },
  {
    id: 'social-media-marketing',
    slug: 'social-media-marketing',
    title: 'Social Media Marketing',
    icon: 'Share2',
    shortDescription: 'High-impact organic & viral storytelling that turns passive scrollers into passionate brand advocates.',
    fullDescription: 'From high-definition micro-video production to community orchestration, our social media machine establishes your brand as the undeniable authority in your niche across Instagram, LinkedIn, YouTube, and X.',
    keyBenefits: ['Viral-engineered short-form content', 'Executive personal branding', 'Community engagement & retention', 'Influencer co-creation campaigns'],
    deliverables: ['Monthly 30-day content calendars', 'High-res motion reels & carousels', 'Brand aesthetic guidebooks', 'Weekly sentiment & reach analytics'],
    resultsTarget: '300%+ average quarterly organic reach growth',
    technologies: ['Figma', 'Premiere Pro', 'After Effects', 'Notion', 'Metricool']
  },
  {
    id: 'meta-ads',
    slug: 'meta-ads',
    title: 'Meta Ads',
    icon: 'Target',
    shortDescription: 'High-converting Facebook & Instagram ad funnels powered by behavioral psychological triggers.',
    fullDescription: 'Stop burning cash on weak ad creatives. We design hyper-targeted Meta ad machines utilizing broad targeting algorithms, psychological direct-response frameworks, and aggressive creative testing cycles.',
    keyBenefits: ['CBO & Advantage+ algorithm mastery', 'High-velocity hook testing system', 'Dynamic product retargeting flows', 'Automated pixel & CAPI integration'],
    deliverables: ['Weekly new creative iterations', 'Custom landing page alignment', 'Full Conversions API tracking setup', 'Real-time ROAS Slack alerts'],
    resultsTarget: '40%+ reduction in Cost Per Qualified Lead',
    technologies: ['Meta Conversions API', 'Zapier', 'Looker Studio', 'Hyros', 'Stripe']
  },
  {
    id: 'seo',
    slug: 'seo',
    title: 'SEO (Search Engine Optimization)',
    icon: 'Search',
    shortDescription: 'Dominate organic search results, capture high-intent buyers, and build compounding traffic assets.',
    fullDescription: 'We deploy algorithmic SEO frameworks covering deep technical audits, programmatic page generation, semantic topic clustering, and authoritative digital PR to cement #1 rankings on competitive commercial search queries.',
    keyBenefits: ['Zero-risk white-hat link acquisition', 'Semantic AI-search optimization (SGE)', 'High commercial intent keyword capture', 'Core Web Vitals greenline engineering'],
    deliverables: ['Comprehensive 150-point technical audit', 'Strategic 6-month topical keyword map', 'High-authority backlink pipeline', 'Bi-weekly ranking telemetry reports'],
    resultsTarget: '150% - 400% organic traffic surge within 6 months',
    technologies: ['Ahrefs', 'SEMrush', 'Screaming Frog', 'Google Search Console', 'SurferSEO']
  },
  {
    id: 'branding-creative-design',
    slug: 'branding-creative-design',
    title: 'Branding & Creative Design',
    icon: 'Palette',
    shortDescription: 'Cinematic brand identities, bespoke logos, luxury design systems, and unforgettable visual presence.',
    fullDescription: 'In a noisy digital landscape, mediocrity is invisible. We sculpt distinctive visual identities, bespoke logo systems, 3D typography, and cohesive digital design guidelines that radiate global luxury and commanding authority.',
    keyBenefits: ['Distinctive market positioning', 'Comprehensive design system design', 'High-end aesthetic superiority', 'Cross-medium consistency'],
    deliverables: ['Vector master logo suites', 'Complete brand bible & token guidelines', 'Typography & chromatic palettes', 'Social & presentation master templates'],
    resultsTarget: 'Immediate perceived valuation elevation',
    technologies: ['Illustrator', 'Cinema 4D', 'Figma', 'Blender', 'Photoshop']
  },
  {
    id: 'ai-solutions',
    slug: 'ai-solutions',
    title: 'AI Solutions',
    icon: 'Cpu',
    shortDescription: 'Autonomous AI agents, customer service intelligences, predictive models, and workflow automation.',
    fullDescription: 'Equip your business with custom conversational agents, automated qualification engines, and predictive analytics that operate 24/7/365 without fatigue, reducing operational overhead while multiplying client conversions.',
    keyBenefits: ['24/7 instantaneous client qualification', 'Predictive churn and sales forecasting', 'Generative asset workflows', 'Custom LLM fine-tuning and retrieval (RAG)'],
    deliverables: ['Custom AI agent deployments', 'CRM bi-directional synchronizations', 'Prompt architecture & guardrails', 'Self-learning knowledge base setup'],
    resultsTarget: '70% reduction in lead response turnaround time',
    technologies: ['Gemini 2.5 Flash', 'OpenAI APIs', 'LangChain', 'Pinecone', 'Python/Node']
  },
  {
    id: 'whatsapp-automation',
    slug: 'whatsapp-automation',
    title: 'WhatsApp Automation',
    icon: 'MessageSquare',
    shortDescription: 'Automated WhatsApp CRM chatbots, appointment booking bots, and broadcast marketing pipelines.',
    fullDescription: 'WhatsApp boasts a 98% open rate. We build interactive conversational funnels directly on official WhatsApp Business APIs that handle inquiries, send instant catalogs, collect lead data, and book calendar slots automatically.',
    keyBenefits: ['Direct 98% open rates vs 18% email', 'Automated 1-click booking confirmation', 'Instant interactive catalog responses', 'Lead auto-tagging and CRM push'],
    deliverables: ['Official WhatsApp Cloud API verification', 'Custom interactive button menus', 'Webhook integrations to Google Sheets / CRM', 'Pre-approved HSM template setups'],
    resultsTarget: '85%+ prompt read rate and 4.2x faster response cycle',
    technologies: ['WhatsApp Business Platform', 'Twilio', 'Meta Graph API', 'Webhooks', 'Make']
  },
  {
    id: 'lead-generation',
    slug: 'lead-generation',
    title: 'Lead Generation',
    icon: 'Zap',
    shortDescription: 'Predictable, scalable pipelines of qualified, sales-ready appointments delivered straight to your calendar.',
    fullDescription: 'No more cold prospecting anxiety. We build automated B2B & B2C acquisition flywheels that combine laser-targeted outreach, magnetic lead magnets, high-converting VSL landing pages, and automated email/SMS nurtures.',
    keyBenefits: ['Guaranteed pipeline predictability', 'Exclusively qualified prospect filters', 'Automated no-show prevention sequences', 'Full pipeline conversion transparency'],
    deliverables: ['Custom high-converting funnel pages', 'Automated 7-step email & SMS follow-up', 'Custom CRM pipeline setup', 'Calendar booking link integration'],
    resultsTarget: 'Consistent 30-100+ qualified monthly booked calls',
    technologies: ['Apollo.io', 'Clay', 'Instantly', 'Calendly', 'HubSpot']
  },
  {
    id: 'business-growth-strategy',
    slug: 'business-growth-strategy',
    title: 'Business Growth Strategy',
    icon: 'Compass',
    shortDescription: 'Strategic roadmaps, unit economics optimization, pricing modeling, and market expansion tactics.',
    fullDescription: 'Scaling requires more than random marketing tactics. We partner with founders and executives to audit revenue leaks, redesign high-margin offers, optimize customer lifetime value (LTV), and establish an unshakeable digital moat.',
    keyBenefits: ['Clarity on highest-leverage growth levers', 'Offer restructuring for high-ticket sales', 'LTV to CAC ratio expansion', 'Scalable organizational frameworks'],
    deliverables: ['Comprehensive 12-month Growth Blueprint', 'Unit economics & margin models', 'Competitive moat landscape breakdown', 'Monthly executive advisory sessions'],
    resultsTarget: '2x to 5x top-line growth roadmap alignment',
    technologies: ['Notion', 'Tableau', 'Miro', 'Financial Models', 'Mixpanel']
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'apex-global-tech',
    name: 'Apex Global Fintech Ecosystem',
    category: 'Websites',
    client: 'Apex Global Capital',
    description: 'Ultra-fast Next-gen fintech portal featuring 3D interactive portfolio simulations, live crypto-fiat bridges, and bank-grade security.',
    results: '+340% User onboarding velocity, $18M processed in launch quarter',
    technologies: ['React 19', 'Three.js', 'Tailwind CSS', 'WebSockets', 'Cloud Run'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    statNumber: '+340%',
    statLabel: 'Onboarding Speed'
  },
  {
    id: 'solaris-electric',
    name: 'Solaris Autonomous EV Campaign',
    category: 'Marketing',
    client: 'Solaris Mobility',
    description: 'High-impact omni-channel global launch generating viral momentum across Meta, YouTube, and digital outdoor displays.',
    results: '24,000+ Pre-orders registered in 14 days with 4.6x Meta ROAS',
    technologies: ['Meta Ads', 'YouTube 4K', 'CAPI Tracking', 'High-velocity Funnels'],
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    statNumber: '24,000+',
    statLabel: 'Direct Pre-Orders'
  },
  {
    id: 'lumina-luxury',
    name: 'Lumina Haute Joaillerie Identity',
    category: 'Branding',
    client: 'Lumina Luxury Paris',
    description: 'Bespoke high-luxury visual identity system, 3D holographic packaging assets, and flagship boutique digital interaction.',
    results: 'Featured in Vogue Business, 185% increase in average ticket price',
    technologies: ['3D Cinema 4D', 'Vector Design System', 'Gold Leaf Finishes', 'WebGL Showroom'],
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    statNumber: '185%',
    statLabel: 'Average Ticket Surge'
  },
  {
    id: 'omni-bot-ai',
    name: 'OmniCore Autonomous Sales Engine',
    category: 'AI',
    client: 'Omni Logistics Cloud',
    description: 'Enterprise AI conversational intelligence handling 15,000 monthly multi-lingual customer inquiries with automated contract quoting.',
    results: '92% Automated resolution rate, 0-second first response time',
    technologies: ['Gemini 2.5 Flash', 'Vector DB', 'Voice Synthesis', 'Salesforce API'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    statNumber: '92%',
    statLabel: 'Auto-Resolution Rate'
  },
  {
    id: 'flow-connect-wa',
    name: 'PulseCare WhatsApp Medical Flow',
    category: 'Automation',
    client: 'PulseCare Health Clinics',
    description: 'Instant patient booking, diagnostic report delivery, and doctor consultation reminders via official WhatsApp Business API.',
    results: 'Zero missed appointments, 68% patient preference over phone calls',
    technologies: ['WhatsApp Cloud API', 'Twilio Webhooks', 'Node.js', 'HIPAA Secure DB'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
    featured: false,
    statNumber: '0%',
    statLabel: 'Appointment No-Shows'
  },
  {
    id: 'nexus-real-estate',
    name: 'Nexus Skylines High-Yield Realty',
    category: 'Websites',
    client: 'Nexus Realty Group',
    description: 'Ultra-luxury architectural property showcase with virtual 360 penthouse tours, interactive floorplans, and WhatsApp VIP agent links.',
    results: '$42M in luxury apartment sales closed within first 60 days',
    technologies: ['React 19', 'Three.js VR', 'Tailwind', 'WhatsApp VIP Integration'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    featured: false,
    statNumber: '$42M',
    statLabel: 'Gross Sales Velocity'
  }
];

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: 'future-of-ai-marketing-2026',
    title: 'The 2026 AI Playbook: How Autonomous Agents Are Replacing Traditional Funnels',
    slug: 'future-of-ai-marketing-2026',
    excerpt: 'Traditional static funnels are leaking high-ticket leads. Discover how real-time autonomous generative AI agents personalize buying journeys on the fly.',
    content: `The modern buyer does not want to fill out a 15-field form and wait 48 hours for a sales representative to send a generic calendar link. 

In 2026, leading global enterprises are transitioning from passive web pages to **active conversational environments**. By integrating autonomous AI agents directly into the web interface and WhatsApp pipelines, brands can qualify buyer budgets, assess project scope, and provide customized pricing estimates in under 15 seconds.

### Key Shifts Defining 2026:
1. **Zero-Latency Lead Qualification:** Real-time semantic understanding of user intent.
2. **Omnichannel Unified Memory:** Conversations begun on the website seamlessly continue on WhatsApp without repeating questions.
3. **Dynamic Value Demonstrations:** Interactive calculators and tailored case studies generated instantaneously.

At ELA Digital World, we engineer custom AI command centers that transform inbound web visitors into committed clients with uncompromising precision.`,
    category: 'AI',
    author: 'ELA Digital Innovation Lab',
    date: 'March 18, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    tags: ['AI Agents', 'Automation', 'Conversion Rates', 'Tech Trends']
  },
  {
    id: 'mastering-meta-ads-algorithms',
    title: 'Meta Ads in 2026: Cracking Broad Targeting & High-Velocity Creative Frameworks',
    slug: 'mastering-meta-ads-algorithms',
    excerpt: 'Audience hacking is dead. Creative is now the targeting. Learn how top agencies generate 4x+ ROAS using psychographic hook testing.',
    content: `The era of granular micro-targeting on Meta has given way to powerful algorithmic machine learning models like Advantage+ and broad demographic matching.

The algorithm can find your ideal customer faster than any human media buyer—**if and only if** your creative speaks directly to their deep neurological pain points.

### The 4-Pillar Creative Testing Framework:
* **The 3-Second Visual Interrupt:** Breaking thumb scroll momentum with high-contrast motion.
* **The Explicit Pain Hypothesis:** Naming the prospect's exact daily frustration.
* **The Mechanism of Action:** Showing why your solution works fundamentally differently.
* **Frictionless WhatsApp Call-To-Action:** Bypassing complex checkout friction for direct high-intent dialogue.`,
    category: 'Digital Marketing',
    author: 'Performance Strategy Lead',
    date: 'March 14, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    tags: ['Meta Ads', 'Paid Media', 'ROAS Optimization', 'Creative Strategy']
  },
  {
    id: 'whatsapp-automation-growth-guide',
    title: 'Why WhatsApp Automation Is the Highest-ROI Channel for Modern Businesses',
    slug: 'whatsapp-automation-growth-guide',
    excerpt: 'With 98% open rates and instant two-way engagement, WhatsApp Business API is outperforming email marketing by over 400%.',
    content: `Email inboxes are flooded with spam, leading to dropping open rates across every industry. Meanwhile, WhatsApp remains the most personal, high-trust communication channel in the world.

By deploying automated WhatsApp workflows, businesses achieve:
- **Immediate Booking Confirmations:** Zero drop-off between inquiry and appointment.
- **Dynamic Product Catalogs:** Visual brochures served right inside the chat.
- **Direct Human Escalation:** Smooth handoff from AI qualification to live consultants.

Explore how ELA Digital World integrates the official WhatsApp API (+91 86676 18925) to unlock automated revenue cycles for your brand.`,
    category: 'WhatsApp Automation',
    author: 'Automation Systems Team',
    date: 'March 10, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
    tags: ['WhatsApp Marketing', 'Lead Gen', 'Customer Experience']
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 't-1',
    clientName: 'Rajesh Subramanian',
    company: 'Veloce Global Logistics',
    role: 'Chief Operating Officer',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    rating: 5,
    testimonial: 'ELA Digital World revolutionized our brand completely. Their team engineered our new high-speed digital platform and automated WhatsApp booking pipelines. Within 60 days, our inbound enterprise inquiries increased by 280%. True digital craftsmanship!',
    isDemo: true
  },
  {
    id: 't-2',
    clientName: 'Priya Sundaram',
    company: 'Aura Lifestyle & Jewels',
    role: 'Founder & Managing Director',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    rating: 5,
    testimonial: 'The level of futuristic design and technical execution ELA Digital World brings is unmatched. Their Meta ads strategy and brand revamp took our quarterly revenue from 12 Lakhs to over 48 Lakhs. The 24/7 WhatsApp consultation connection makes client onboarding effortless.',
    isDemo: true
  },
  {
    id: 't-3',
    clientName: 'Vikramaditya Rao',
    company: 'Zenith Real Estate Ventures',
    role: 'Head of Growth & Investments',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    rating: 5,
    testimonial: 'Working with ELA Digital World feels like stepping 5 years into the future. Their 3D interactive web portal and automated lead qualification bots screened over 1,200 luxury property buyers without our sales team breaking a sweat. Outstanding ROI.',
    isDemo: true
  }
];

export const BLOG_DATA = BLOG_POSTS_DATA;

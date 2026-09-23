/* ===================================================================
   OPEN TRAININGS : content store
   All copy lives here so pages can render it dynamically (roster
   lists, filters, skeleton -> content swaps) instead of being baked
   into static markup everywhere.
   =================================================================== */

window.OT_DATA = {

  heroSlides: [
    {
      eyebrow: "Open Trainings",
      title: "Trainers, Labs and Vouchers, In One Place",
      sub: "We supply expert corporate trainers, hands-on lab environments and official certification exam vouchers, so a programme ends in real practice and a recognised credential, not just a slide deck.",
      statLine: "1,140+ trainer-led cohorts delivered across 14 countries since 2022",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
    },
    {
      eyebrow: "Practice, Not Just Theory",
      title: "Hands-On Labs Bundled With Every Technical Track",
      sub: "Cloud sandboxes, a cybersecurity range and data pipelines your team can break safely, spun up for the cohort and reset after every session.",
      statLine: "4 lab environments, ready in minutes, isolated from production",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80"
    },
    {
      eyebrow: "Trainers Who Still Do The Work",
      title: "Facilitators With Years In The Field They Teach",
      sub: "Every trainer we place has hands-on practice in the subject first, and a delivery track record second. We check both before the first cohort.",
      statLine: "3-plus years of industry experience required of every trainer we place",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80"
    },
    {
      eyebrow: "Certification, Sorted",
      title: "Official Exam Vouchers, Procured For You",
      sub: "One purchase order, vouchers across AWS, Microsoft, Cisco, CompTIA, PMI and more, so your L&D team isn't opening six vendor accounts to get a team certified.",
      statLine: "11+ certification vouchers available across 6 vendors",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80"
    }
  ],

  accreditation: [
    "AWS TRAINING PARTNER", "MICROSOFT LEARNING PARTNER", "CISCO LEARNING NETWORK PARTNER",
    "COMPTIA AUTHORISED PARTNER", "PMI AUTHORISED TRAINING PARTNER", "GOOGLE CLOUD PARTNER NETWORK"
  ],

  featureGrid: [
    { title: "Trainers vetted before they're placed", desc: "Every facilitator has three-plus years working in the field they teach, checked before the first session, not after a complaint." },
    { title: "A working lab with every technical track", desc: "Cloud, security and data programmes ship with a live sandbox environment your team can break safely and reset." },
    { title: "Vouchers procured, not resold", desc: "Certification exam vouchers are bought directly through vendor and authorised-partner channels at corporate volume." },
    { title: "One desk for trainers, labs and vouchers", desc: "A single regional contact coordinates all three services, so booking a cohort and its exam vouchers is one conversation." },
    { title: "Recorded session access", desc: "Live online cohorts are recorded and shared with enrolled learners for a full quarter." },
    { title: "Ninety-day support window", desc: "Learners can bring follow-up questions back to their trainer for three months after the last session." },
    { title: "Train-the-trainer handover", desc: "Certify a client's own staff to run future cohorts, with a shadow-teach cycle built in." },
    { title: "Three regional delivery hubs", desc: "Noida, Dubai and Nairobi, with travel-based delivery extending well beyond." },
    { title: "Scheduling around your calendar", desc: "Private in-house cohorts, lab access windows and voucher batches are all timed to your shift patterns and deadlines." }
  ],

  labs: [
    {
      title: "Cloud Sandbox Labs",
      desc: "Pre-built AWS, Azure and Google Cloud environments for hands-on practice, reset after every session so nobody worries about a stray bill.",
      bestFor: "Best for cloud fundamentals & SRE tracks",
      icon: "globe"
    },
    {
      title: "Cybersecurity Range",
      desc: "An isolated network range for attack-and-defend exercises, fully separated from any client's production systems.",
      bestFor: "Best for security & compliance tracks",
      icon: "badge"
    },
    {
      title: "Data Engineering Sandbox",
      desc: "A working pipeline and warehouse environment for practicing real data-engineering exercises, not a static spreadsheet exercise.",
      bestFor: "Best for data & analytics tracks",
      icon: "screen"
    },
    {
      title: "Network & Systems Lab",
      desc: "Virtualised routers, switches and servers for CCNA-style and systems-administration practice without touching real infrastructure.",
      bestFor: "Best for network & infrastructure tracks",
      icon: "building"
    }
  ],

  trainingInfraOptions: [
    {
      name: "Client-Site Room, Arranged by Us",
      bestFor: "Organisations training on their own premises",
      format: "We fit out an existing room (seating, projector/screen, whiteboards, Wi-Fi) and coordinate meals and any trainer travel needed to get there",
      commitment: "Booked per session, walkthrough done 48 hours before day one"
    },
    {
      name: "Our Regional Training Room",
      bestFor: "Teams without a suitable space of their own",
      format: "A ready classroom at our Noida hub, seated and AV-checked, with lab network access and a workspace desk if the trainer needs to stay on afterward",
      commitment: "Included in the programme price for in-person cohorts booked there"
    },
    {
      name: "Off-Site Venue (Hotel or Conference Space)",
      bestFor: "Larger cohorts, multi-day residentials, or out-of-town attendees",
      format: "We source and fit out an external venue and coordinate the full loop around it: AV rental, seating, catering, and travel and stay for trainers or attendees flying in",
      commitment: "Quoted per engagement once headcount and dates are confirmed"
    }
  ],

  labEngagement: [
    {
      name: "Bundled With a Training Programme",
      bestFor: "Any cohort in a technical track (cloud, security, data, networking)",
      format: "Lab access opens the morning of day one and stays live through the programme",
      commitment: "Included in the programme price, no separate booking"
    },
    {
      name: "Standalone Practice Access",
      bestFor: "Teams that already trained elsewhere and just need practice time",
      format: "Self-paced access to a sandbox environment for a fixed window",
      commitment: "Booked per seat, per environment, typically 2-4 week windows"
    },
    {
      name: "Dedicated Cohort Environment",
      bestFor: "Private in-house programmes needing client-specific data or systems",
      format: "A ring-fenced environment configured to the client's own tooling",
      commitment: "Set up per engagement, timeline agreed at the diagnostic call"
    }
  ],

  vouchers: [
    { vendor: "AWS", exam: "AWS Certified Cloud Practitioner", code: "CLF-C02", level: "Foundational", format: "Online proctored or test centre", validity: "Voucher valid 12 months from issue" },
    { vendor: "AWS", exam: "AWS Certified Solutions Architect – Associate", code: "SAA-C03", level: "Associate", format: "Online proctored or test centre", validity: "Voucher valid 12 months from issue" },
    { vendor: "Microsoft", exam: "Microsoft Certified: Azure Fundamentals", code: "AZ-900", level: "Foundational", format: "Online proctored or test centre", validity: "Voucher valid 6 months from issue" },
    { vendor: "Microsoft", exam: "Microsoft Certified: Azure Administrator Associate", code: "AZ-104", level: "Associate", format: "Online proctored or test centre", validity: "Voucher valid 6 months from issue" },
    { vendor: "Google Cloud", exam: "Associate Cloud Engineer", code: "ACE", level: "Associate", format: "Online proctored or test centre", validity: "Voucher valid 12 months from issue" },
    { vendor: "Cisco", exam: "Cisco Certified Network Associate", code: "CCNA 200-301", level: "Associate", format: "Test centre (Pearson VUE)", validity: "Voucher valid 12 months from issue" },
    { vendor: "CompTIA", exam: "CompTIA Security+", code: "SY0-701", level: "Foundational", format: "Test centre or online proctored", validity: "Voucher valid 12 months from issue" },
    { vendor: "CompTIA", exam: "CompTIA Network+", code: "N10-009", level: "Foundational", format: "Test centre or online proctored", validity: "Voucher valid 12 months from issue" },
    { vendor: "PMI", exam: "Project Management Professional", code: "PMP", level: "Professional", format: "Test centre or online proctored", validity: "Voucher valid 12 months from issue" },
    { vendor: "PMI", exam: "Certified Associate in Project Management", code: "CAPM", level: "Foundational", format: "Test centre or online proctored", validity: "Voucher valid 12 months from issue" },
    { vendor: "Axelos", exam: "ITIL 4 Foundation", code: "ITIL4F", level: "Foundational", format: "Online proctored or test centre", validity: "Voucher valid 12 months from issue" }
  ],

  voucherFaqs: [
    {
      q: "How does voucher redemption actually work?",
      a: [
        "We issue a voucher code directly from the vendor or their authorised reseller once payment clears. The learner books their own exam slot with that code, at a test centre or online-proctored, on their own schedule."
      ]
    },
    {
      q: "What happens if a voucher expires unused?",
      a: [
        "Vendor expiry terms apply, typically 6 to 12 months depending on the certification body. We flag unused vouchers to the sponsoring L&D contact a month before expiry so they aren't wasted."
      ]
    },
    {
      q: "Can vouchers be bought without booking a training programme?",
      a: [
        "Yes. Vouchers are sold standalone for teams that only need the exam covered, though most clients pair them with a training programme or a lab session first."
      ]
    },
    {
      q: "Do you offer refunds on unused vouchers?",
      a: [
        "Refund terms follow the issuing vendor's own policy, which we pass through unchanged. Most certification bodies do not refund an issued voucher, only exchange or extend it in limited circumstances. Full detail is in our Terms of Service."
      ]
    }
  ],

  testimonials: [
    {
      quote: "The trainer they placed had actually run the systems we use, not just taught about them. That's rarer than it should be.",
      role: "Head of L&D",
      sector: "Regional Banking Group",
      initials: "HL"
    },
    {
      quote: "Vouchers for four different vendors landed through one order instead of four separate accounts. That alone was worth the contract.",
      role: "Compliance Programme Owner",
      sector: "Public-Sector Utility",
      initials: "CP"
    },
    {
      quote: "Our engineers practiced in the lab environment before touching anything real. Nobody broke production during the rollout.",
      role: "VP Engineering",
      sector: "Logistics Technology Team",
      initials: "VE"
    },
    {
      quote: "Three regions, one standard of trainer, the same lab setup everywhere. That consistency is harder to buy than it sounds.",
      role: "Regional HR Director",
      sector: "Retail Operations Group",
      initials: "RH"
    }
  ],

  stats: [
    { num: "1,140+", label: "Cohorts delivered since 2022" },
    { num: "38,600+", label: "Learners trained to completion" },
    { num: "14", label: "Countries with active delivery" },
    { num: "2,400+", label: "Certification vouchers procured for client teams" }
  ],

  sectors: [
    "Banking & Financial Services", "Logistics & Distribution", "Manufacturing",
    "Public Sector", "Retail", "Energy & Utilities", "Telecom", "Healthcare Administration",
    "Insurance", "Hospitality Operations"
  ],

  services: [
    {
      title: "Trainer Sourcing & Vetting",
      summary: "We source facilitators with three-plus years of hands-on experience in the subject they'll teach, and match them to a client's brief before quoting a delivery date.",
      meta: ["Vetted facilitators", "Skills-matched", "2-3 week sourcing"]
    },
    {
      title: "Programme Scheduling & Delivery",
      summary: "Instructor-led cohorts run in person at a client site, at one of our regional training rooms, or live over video, scheduled around shift patterns and operational calendars.",
      meta: ["Instructor-led", "In-person or live remote", "Scheduled cohorts"]
    },
    {
      title: "Lab Environment Provisioning",
      summary: "Cloud sandboxes, a cybersecurity range, data pipelines and virtualised networking labs are provisioned per cohort and torn down after, isolated from any client's production systems.",
      meta: ["Cloud & security labs", "Provisioned per cohort", "Reset after use"]
    },
    {
      title: "Certification Voucher Procurement",
      summary: "Exam vouchers across AWS, Microsoft, Google Cloud, Cisco, CompTIA and PMI are bought directly through vendor and authorised-reseller channels and issued to your team.",
      meta: ["Direct vendor sourcing", "Single purchase order", "Multi-vendor coverage"]
    },
    {
      title: "Train-the-Trainer & Capability Transfer",
      summary: "We certify a client's own senior staff to deliver the second and third cohorts themselves, with facilitation guides and a shadow-teach cycle before handover.",
      meta: ["Internal capacity", "Facilitator certification", "Shadow-teach model"]
    },
    {
      title: "Learning Operations Consulting",
      summary: "For L&D teams building out a training function, we advise on LMS selection, annual training calendars, vendor coordination and budget planning, without pushing our own delivery as the answer.",
      meta: ["LMS rollout", "Annual planning", "Vendor coordination"]
    }
  ],

  engagementModels: [
    {
      name: "Open Enrollment Cohort",
      bestFor: "Individual employees or small teams joining a scheduled public cohort",
      format: "In-person or live online, mixed-organisation classroom",
      commitment: "Per-seat registration, fixed calendar published on the Training page"
    },
    {
      name: "Private In-House Programme",
      bestFor: "A single organisation training an intact team or department together",
      format: "Delivered on-site or over video, content adapted to internal case studies and systems",
      commitment: "Minimum group size of 10, calendar set jointly with the client"
    },
    {
      name: "Ongoing Learning Partnership",
      bestFor: "L&D teams running a recurring annual training programme across sites",
      format: "Dedicated programme lead, quarterly planning cycle, mix of formats across the year",
      commitment: "Retainer with seat-block pricing, reviewed each quarter"
    }
  ],

  tracks: ["Cloud & Infrastructure", "Data & Analytics", "Leadership & People", "Compliance & Risk", "Software Delivery", "Customer Operations"],

  programs: [
    {
      id: "cloud-fundamentals",
      title: "Cloud Infrastructure Fundamentals",
      track: "Cloud & Infrastructure",
      level: "Foundation",
      format: "Cohort · In-person or live online",
      duration: "4 days · 28 contact hours",
      cohort: "13 Oct 2026",
      summary: "Provisioning, networking basics and cost management across the major cloud platforms, for staff moving from on-premise systems into a cloud-first environment.",
      modules: [
        "Compute, storage and networking primitives across providers",
        "Identity, access control and shared-responsibility security",
        "Cost visibility, tagging discipline and budget alerts",
        "Lab: standing up a three-tier application environment"
      ]
    },
    {
      id: "sre-incident",
      title: "Site Reliability & Incident Response",
      track: "Cloud & Infrastructure",
      level: "Practitioner",
      format: "Cohort · In-person",
      duration: "3 days · 21 contact hours",
      cohort: "27 Oct 2026",
      summary: "Building on-call discipline, incident command roles and postmortem practice for teams that already run production systems but lack a formal response process.",
      modules: [
        "Defining severity levels and escalation paths",
        "Incident command: roles during a live outage",
        "Writing a blameless postmortem that produces action items",
        "Tabletop simulation of a multi-service outage"
      ]
    },
    {
      id: "applied-analytics",
      title: "Applied Data Analytics for Operations Teams",
      track: "Data & Analytics",
      level: "Foundation",
      format: "Cohort · Live online",
      duration: "5 days · 30 contact hours",
      cohort: "3 Nov 2026",
      summary: "Spreadsheet-literate operations staff learn to build clean reporting models, spot data quality issues early and present findings to non-technical stakeholders.",
      modules: [
        "Structuring raw exports into a usable model",
        "Common data quality failures and how to catch them",
        "Building a weekly operations dashboard",
        "Presenting a data-backed recommendation to leadership"
      ]
    },
    {
      id: "ml-analysts",
      title: "Machine Learning for Business Analysts",
      track: "Data & Analytics",
      level: "Practitioner",
      format: "Cohort · In-person or live online",
      duration: "6 days · 36 contact hours",
      cohort: "17 Nov 2026",
      summary: "A practical, non-PhD path into applied machine learning for analysts who need to brief technical teams and evaluate vendor claims, not build models from scratch.",
      modules: [
        "What a model can and cannot reasonably promise",
        "Reading an evaluation report without a statistics background",
        "Working through a live prediction problem with a data scientist",
        "A vocabulary and question set for vendor evaluations"
      ]
    },
    {
      id: "frontline-leadership",
      title: "Frontline Leadership: First 90 Days",
      track: "Leadership & People",
      level: "Foundation",
      format: "Cohort · In-person",
      duration: "3 days · 18 contact hours",
      cohort: "6 Oct 2026",
      summary: "For staff newly promoted into a first people-management role, covering the handover from peer to manager, structured one-to-ones, and early performance conversations.",
      modules: [
        "Moving from peer to manager without losing the team",
        "Running a one-to-one that isn't just a status update",
        "Giving corrective feedback in the first month",
        "Role play: a difficult early conversation"
      ]
    },
    {
      id: "managing-change",
      title: "Managing Through Change",
      track: "Leadership & People",
      level: "Practitioner",
      format: "Cohort · In-person or live online",
      duration: "2 days · 12 contact hours",
      cohort: "10 Nov 2026",
      summary: "Mid-level managers leading teams through a system migration, restructuring or process overhaul, focused on communication cadence and managing resistance.",
      modules: [
        "Reading resistance signals before they become attrition",
        "A communication cadence for a 90-day change window",
        "Supporting a team member who is struggling with the change",
        "Building a change-readiness brief for your own team"
      ]
    },
    {
      id: "infosec-compliance",
      title: "Information Security & Data Handling Compliance",
      track: "Compliance & Risk",
      level: "Foundation",
      format: "Cohort · Live online",
      duration: "1 day · 6 contact hours",
      cohort: "1 Oct 2026",
      summary: "A mandatory-training-grade session on data classification, safe handling of customer records and incident reporting, built to satisfy annual compliance refresh requirements.",
      modules: [
        "Data classification levels and what they mean in practice",
        "Safe handling and storage of customer records",
        "Recognising and reporting a suspected data incident",
        "Assessment and completion certificate"
      ]
    },
    {
      id: "aml-refresher",
      title: "Anti-Bribery & Anti-Money-Laundering Refresher",
      track: "Compliance & Risk",
      level: "Foundation",
      format: "Cohort · Live online",
      duration: "1 day · 5 contact hours",
      cohort: "15 Oct 2026",
      summary: "An annual refresher for regulated-sector staff covering red flags, reporting obligations and recent regulatory updates relevant to their region.",
      modules: [
        "Red flags in transactions and third-party relationships",
        "Reporting obligations and internal escalation routes",
        "Regional regulatory updates since the last refresh",
        "Assessment and completion certificate"
      ]
    },
    {
      id: "agile-delivery",
      title: "Agile Delivery for Cross-Functional Teams",
      track: "Software Delivery",
      level: "Practitioner",
      format: "Cohort · In-person",
      duration: "3 days · 18 contact hours",
      cohort: "20 Oct 2026",
      summary: "For teams that have adopted agile ceremonies without the underlying practice, focused on backlog discipline, estimation and working across product, design and engineering.",
      modules: [
        "Writing a backlog item that survives contact with engineering",
        "Estimation without false precision",
        "Running a retrospective that changes something",
        "Simulation: a full sprint cycle in one afternoon"
      ]
    },
    {
      id: "api-design",
      title: "API Design & Integration Practices",
      track: "Software Delivery",
      level: "Advanced",
      format: "Cohort · In-person or live online",
      duration: "4 days · 24 contact hours",
      cohort: "24 Nov 2026",
      summary: "For engineers designing APIs that other teams and external partners will depend on for years, covering versioning, backwards compatibility and documentation discipline.",
      modules: [
        "Designing for a consumer you haven't met yet",
        "Versioning strategies and deprecation timelines",
        "Error handling and contract testing",
        "Lab: reviewing and revising a real internal API"
      ]
    },
    {
      id: "contact-centre-craft",
      title: "Contact Centre Craft: Voice & Chat Standards",
      track: "Customer Operations",
      level: "Foundation",
      format: "Cohort · In-person",
      duration: "3 days · 18 contact hours",
      cohort: "8 Oct 2026",
      summary: "Baseline standards for new advisors across voice and chat channels, covering tone, de-escalation and the handoffs between self-service and a live agent.",
      modules: [
        "Tone and pacing across voice and written chat",
        "De-escalating a frustrated customer without a script",
        "Handoffs between self-service, chat and voice",
        "Graded call and chat simulations"
      ]
    },
    {
      id: "escalation-handling",
      title: "Escalation Handling for Senior Advisors",
      track: "Customer Operations",
      level: "Practitioner",
      format: "Cohort · Live online",
      duration: "2 days · 12 contact hours",
      cohort: "12 Nov 2026",
      summary: "For advisors who now handle escalated and repeat-contact cases, focused on root-cause questioning, cross-team coordination and closing a case in a way that prevents a repeat contact.",
      modules: [
        "Root-cause questioning beyond the surface complaint",
        "Coordinating a resolution across two or more internal teams",
        "Closing an escalation so it doesn't come back next month",
        "Case review clinic using anonymised real tickets"
      ]
    }
  ],

  caseStudies: [
    {
      client: "Regional Retail Bank",
      sector: "Banking & Financial Services",
      size: "340 branch and contact-centre staff",
      challenge: "A new digital onboarding process was live, but branch staff were falling back on the old paper workflow under pressure, and first-line managers had no structured way to coach the new behaviour.",
      approach: [
        "Placed trainers for Frontline Leadership and a customised digital-onboarding module across four regional cohorts",
        "Built a manager coaching checklist tied to real onboarding metrics",
        "Delivered a train-the-trainer track so regional leads could run future refreshers"
      ],
      results: [
        { num: "91%", label: "Digital onboarding adoption at 60 days, up from 54%" },
        { num: "22%", label: "Reduction in onboarding-related complaint tickets" },
        { num: "4", label: "Regions now running self-led refresher cohorts" }
      ],
      timeline: "14 weeks, Jan – Apr 2026"
    },
    {
      client: "National Logistics Operator",
      sector: "Logistics & Distribution",
      size: "60 infrastructure and platform engineers",
      challenge: "Route-planning systems had grown into a patchwork of services with no shared incident process, and outages during peak season were being handled ad hoc by whoever was online.",
      approach: [
        "Placed a trainer for Site Reliability & Incident Response across three engineering pods, using a dedicated lab environment mirroring the client's own stack",
        "Co-designed an on-call rotation and severity matrix with the client's platform lead",
        "Ran a live tabletop simulation during a scheduled low-traffic window"
      ],
      results: [
        { num: "-41%", label: "Mean time to resolution on peak-season incidents" },
        { num: "3", label: "Engineering pods now running weekly postmortems" },
        { num: "0", label: "Missed severity-1 escalations in the following quarter" }
      ],
      timeline: "8 weeks, Aug – Oct 2025"
    },
    {
      client: "Public-Sector Utility",
      sector: "Energy & Utilities",
      size: "900 staff across billing, field service and call centre",
      challenge: "A new data protection regulation required documented annual training for all staff handling customer records, with reporting back to the compliance office within a fixed audit window.",
      approach: [
        "Rolled out Information Security & Data Handling Compliance as a live-online programme across 30 cohorts",
        "Built a cohort-level reporting dashboard tied to the client's audit calendar",
        "Delivered a shortened refresher track for staff who join mid-year"
      ],
      results: [
        { num: "97%", label: "Completion rate ahead of the regulatory deadline" },
        { num: "30", label: "Cohorts delivered across a 10-week window" },
        { num: "1", label: "Consolidated compliance report generated for the audit" }
      ],
      timeline: "10 weeks, Feb – Apr 2026"
    },
    {
      client: "Direct-to-Consumer Retail Chain",
      sector: "Retail",
      size: "210 contact-centre advisors across two sites",
      challenge: "Customer satisfaction scores had slipped after a rapid hiring push, and new advisors were reaching full productivity noticeably slower than the team's historical average.",
      approach: [
        "Delivered Contact Centre Craft as the standard onboarding programme for new hires",
        "Introduced graded call and chat simulations as part of ramp-up sign-off",
        "Trained six senior advisors as internal coaches for ongoing mentoring"
      ],
      results: [
        { num: "+13pt", label: "CSAT recovery within two quarters" },
        { num: "-19%", label: "Time to full productivity for new advisors" },
        { num: "6", label: "Internal coaches now supporting new-hire ramp-up" }
      ],
      timeline: "16 weeks, Mar – Jun 2026"
    },
    {
      client: "Manufacturing Group",
      sector: "Manufacturing",
      size: "85 mid-level plant managers across five facilities",
      challenge: "An ERP migration was scheduled across all five plants within one year, and prior migrations at the group had been slowed by manager-level resistance and unclear communication down to shift teams.",
      approach: [
        "Delivered Managing Through Change ahead of each plant's migration window",
        "Built a plant-specific communication cadence tied to the migration calendar",
        "Ran a post-migration check-in cohort three months after each go-live"
      ],
      results: [
        { num: "5/5", label: "Plants completed migration within the scheduled window" },
        { num: "-27%", label: "Reduction in migration-related grievance filings" },
        { num: "85", label: "Managers certified on the change-communication framework" }
      ],
      timeline: "Ongoing, phased across 2025 – 2026"
    }
  ],

  insights: [
    {
      title: "Why most compliance training fails the week after the certificate is issued",
      category: "Compliance & Risk",
      date: "2 Sep 2026",
      readTime: "6 min",
      excerpt: "A completion certificate measures attendance, not retention. We look at what changes when compliance programmes are redesigned around spaced follow-up rather than a single annual session."
    },
    {
      title: "The gap between 'agile-certified' and 'agile in practice'",
      category: "Software Delivery",
      date: "21 Aug 2026",
      readTime: "8 min",
      excerpt: "Certification pass rates and delivery outcomes are not the same metric. Notes from redesigning an agile programme around a team's actual backlog instead of a generic case study."
    },
    {
      title: "What we ask before placing a trainer for a leadership programme",
      category: "Leadership & People",
      date: "9 Aug 2026",
      readTime: "5 min",
      excerpt: "Most requests for a leadership programme are really a request to fix a specific manager problem. The diagnostic questions we run before matching a trainer."
    },
    {
      title: "Training a distributed contact centre without losing consistency",
      category: "Customer Operations",
      date: "27 Jul 2026",
      readTime: "7 min",
      excerpt: "Running the same standard across three time zones and two languages is a scheduling problem before it is a content problem. How we structure cohorts across sites."
    },
    {
      title: "Reading a vendor's machine learning pitch without a data science degree",
      category: "Data & Analytics",
      date: "14 Jul 2026",
      readTime: "6 min",
      excerpt: "A short field guide to the questions worth asking a vendor before signing, built from the same material we use in the Machine Learning for Business Analysts programme."
    },
    {
      title: "Why we bought the lab environment instead of renting one per cohort",
      category: "Cloud & Infrastructure",
      date: "30 Jun 2026",
      readTime: "5 min",
      excerpt: "Spinning up a fresh sandbox for every cohort used to take a day of setup. Here's what changed once lab provisioning became its own internal service instead of an afterthought."
    }
  ],

  faqs: [
    {
      q: "How is a trainer matched to our team, rather than just assigned?",
      a: [
        "Every engagement starts with a short diagnostic call and, for programmes over 20 seats, a review of real workflows, tickets or case material from the client.",
        "We then match a trainer whose own field experience fits that material, and content, examples and lab exercises are built or adapted around it before the first cohort runs."
      ]
    },
    {
      q: "What's the minimum group size for a private in-house programme?",
      a: [
        "Ten learners per cohort. Below that, open enrollment cohorts or a blended private session paired with a public cohort usually works out better on cost."
      ]
    },
    {
      q: "How long is a completion certificate valid for?",
      a: [
        "Technical and delivery programmes carry no expiry. Compliance and regulatory refreshers are dated and typically need renewal on a 12-month cycle, matching most regulatory requirements."
      ]
    },
    {
      q: "Can our own senior staff be trained to deliver future cohorts?",
      a: [
        "Yes, through the train-the-trainer track. It includes a facilitation guide, an assessment bank and a shadow-teach cycle where a client trainer co-delivers before running a cohort solo."
      ]
    },
    {
      q: "What happens to cohort assessment data?",
      a: [
        "Individual results go to the learner and, for employer-sponsored seats, to the sponsoring manager or L&D contact. Aggregated cohort-level reporting goes to whoever commissioned the programme. Full detail is in our Privacy Policy."
      ]
    },
    {
      q: "Do you deliver outside the regions listed on the Contact page?",
      a: [
        "Regularly. The regional desks are where delivery teams are based, not a hard boundary. Live online delivery and travel-based in-person delivery both extend beyond those regions on request."
      ]
    }
  ],

  offices: [
    { city: "Noida", role: "Headquarters & trainer network desk", address: "D-block, Sector 16B, Noida 201301, India", phone: "+91 8679450045" }
  ],

  openRoles: [
    { title: "Trainer Network Lead, Data & Analytics", location: "Noida", type: "Full-time" },
    { title: "Regional Delivery Trainer", location: "Dubai", type: "Full-time" },
    { title: "Regional Delivery Trainer", location: "Nairobi", type: "Full-time" },
    { title: "Learning Data Analyst", location: "Noida", type: "Full-time" },
    { title: "Client Partnerships Associate", location: "Remote, EMEA time zones", type: "Full-time" }
  ]

};

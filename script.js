const STORAGE_KEY = "billalOnePagePortfolioV1";
document.documentElement.classList.add("js");
const ADMIN_EMAIL = "billaljaved7@gmail.com";
// Static demo only. Do not use client-side passwords in production; use Firebase/Auth0/Supabase or server-side authentication.
const ADMIN_PASSWORD = "hello@7890";
const ADMIN_PASSWORD_KEY = "billalPortfolioAdminPassword";
const OLD_ADMIN_PASSWORDS = ["Hello@7890"];
const DEFAULT_FONT_STACK = "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif";
const EDITABLE_TEXT_TARGETS = ["homeTitle", "homeIntro", "aboutText"];
const ADMIN_PREVIEW_MODE = new URLSearchParams(window.location.search).has("adminPreview");
const DEFAULT_PROFILE_IMAGE = "assets/profile-billal.jpeg";
const DEFAULT_RESUME_FILE = "assets/Billal_Javed_Finance_Analyst_Resume.pdf";
const DEFAULT_GITHUB_URL = "https://github.com/billal7890";
const OLD_GITHUB_URL = "https://github.com/yourusername";
const OLD_HOME_TITLE = "I turn business questions into clear analytical work.";
const OLD_HOME_INTRO = "I am Billal Javed, an M.S. Business Analytics and Information Management student at the University of Delaware. I work across analytics, finance, operations, simulation, data visualization, and AI-supported decision-making to make uncertainty easier to act on.";
const OLD_ABOUT_TEXT = "I come from an accounting and finance background, and I am building that foundation into business analytics, operations, data visualization, simulation, and AI-supported decision-making. At the University of Delaware, I am learning how to turn complex business questions into structured analysis and useful decisions.";
const PREVIOUS_ABOUT_TEXT = "My background started in accounting and finance, and I am now building that foundation into business analytics, information management, operations analysis, simulation, and data visualization. At the University of Delaware, I focus on turning complex business problems into structured analysis, clear communication, and practical recommendations.";
const GOOGLE_SHEETS_WEBHOOK_URL = ""; // Static demo placeholder: add a Google Apps Script/Firebase/Supabase endpoint here for real Google Sheets storage.
let cropImage = null;
let croppedProfileData = "";
let activePreviewElement = null;

const defaultProjects = [
  {
    id: "billal-portfolio-website",
    title: "Business Analytics Portfolio Website",
    category: "Web Development / Personal Branding",
    date: "Summer 2026",
    tech: "HTML, CSS, JavaScript, localStorage, FormSubmit, Git, GitHub Pages, Codex",
    summary: "Designed and developed a responsive portfolio that presents my analytics projects, academic journey, leadership experience, writing, and professional profile in one consistent digital experience.",
    reason: "I wanted more than a resume attachment. My goal was to create an accessible professional platform where visitors can understand how I approach business problems, explore the evidence behind my projects, and see how my analytical and communication skills connect.",
    process: "I began by defining the audience, content structure, visual direction, and core visitor journeys. I planned separate pages for Home, About, Portfolio, Blog, Contact, and detailed project reports. Working iteratively with OpenAI Codex, I translated my requirements into HTML, CSS, and JavaScript, reviewed each version, provided detailed design and content feedback, and refined the site feature by feature. I supplied my resume, transcripts, project materials, profile image, and professional context; Codex helped implement, debug, organize, and test the code while I directed the goals, priorities, wording, and final decisions.",
    details: "The project was motivated by a practical career question: how can I communicate a multidisciplinary background in accounting, finance, business analytics, simulation, visualization, operations, and student leadership without overwhelming the viewer? I planned the site around progressive detail: concise summaries first, followed by complete reports when a visitor chooses See More. The build includes responsive navigation, reusable project and blog data, detailed report pages, project likes, interaction tracking, downloadable resume management, a contact workflow, and a locally managed Admin dashboard. A major challenge was preserving a consistent futuristic business-analytics theme while keeping the content readable, professional, and easy to update. The result is a working portfolio that demonstrates both my completed work and my ability to plan, evaluate, and improve a digital product through iterative collaboration.",
    findings: "The development process showed that a strong portfolio is an information-design problem as much as a coding project. Clear hierarchy, consistent spacing, concise summaries, and deeper optional reports make a large amount of experience easier to navigate. Iterative prompting worked best when I treated Codex as a development collaborator: I defined the business purpose, reviewed the output critically, supplied corrections and source material, and tested whether each change supported the visitor experience.",
    recommendations: "The next phase is to publish the site through GitHub Pages, connect the contact and analytics features to production-ready backend services, replace localStorage authentication with secure server-side authentication, add final project artifacts and screenshots, and continue measuring which content visitors engage with most. Future releases can also include an accessible content-management backend, automated deployment, and richer embedded analytics dashboards.",
    link: "https://github.com/billal7890",
    visible: true,
    likes: 0,
    image: "assets/project-portfolio-analytics.svg",
    dashboard: false,
    files: [
      {
        name: "Interactive Portfolio Analytics Dashboard",
        type: "text/html",
        data: "portfolio-dashboard.html",
        note: "A live, interactive dashboard summarizing portfolio projects, technologies, categories, timeline, and recorded website engagement."
      }
    ]
  },
  {
    id: "airport-security-simulation",
    title: "Airport Security & Passenger Flow Optimization",
    category: "Simulation / Operations Analytics",
    date: "Spring 2026",
    tech: "Monte Carlo simulation, agent-based modeling, discrete-event simulation, Python, scenario analysis",
    summary: "Modeled airport checkpoint operations to evaluate passenger flow, risk behavior, scanner capacity, and bottlenecks during peak periods.",
    reason: "To show how simulation can support operational decisions when demand, passenger behavior, and service capacity are uncertain.",
    process: "Built Monte Carlo, agent-based, and discrete-event simulation logic, analyzed 10,000 peak-period scenarios, and compared capacity decisions across screening lane configurations.",
    details: "Problem solved: airport security operations must balance service speed, risk control, passenger experience, and resource limits. My role was to model checkpoint flow, test operating scenarios, and translate simulation results into staffing and capacity implications. The analysis identified scanner capacity as the key bottleneck and showed that adding a Regular lane reduced shortfall probability from 43.4% to 7.3%.",
    findings: "Scanner capacity was the dominant operational constraint. The project showed that small capacity changes can materially reduce shortfall risk when passenger arrivals and service times are uncertain.",
    recommendations: "Use simulation as a recurring planning tool for peak travel periods, compare lane-allocation strategies before implementation, and validate the model with updated airport throughput data.",
    link: "",
    visible: true,
    likes: 0,
    image: "assets/project-airport-security.svg",
    dashboard: true,
    files: [
      {
        name: "Airport Security Final Project Package",
        type: "application/zip",
        data: "assets/Airport_Security_Final_Project (1).zip",
        note: "Project archive with the airport security simulation materials and supporting analysis."
      }
    ]
  },
  {
    id: "student-habits-performance-powerbi",
    title: "Student Habits vs. Academic Performance",
    category: "Power BI / Education Analytics",
    date: "Spring 2026",
    tech: "Power BI, Power Query, DAX, data cleaning, interactive reporting",
    summary: "Built an interactive Power BI report analyzing how study time, attendance, screen time, wellness, and background factors relate to exam performance.",
    reason: "To explore how behavioral and demographic data can help explain academic performance patterns without reducing students to a single metric.",
    process: "Cleaned and analyzed 1,000 student records across 16 behavioral, demographic, and academic variables using Power Query and Power BI. Built DAX measures and interactive visuals to compare performance drivers.",
    details: "Problem solved: education data can become difficult to interpret when academic, behavioral, and wellness variables are analyzed separately. My role was to prepare the dataset, model relationships, design measures, and create visuals that help users explore patterns in student performance. The dashboard connects habits and outcomes in a way that supports evidence-based discussion.",
    findings: "Study time, attendance, wellness indicators, and screen-time patterns provide more useful insight when viewed together instead of as isolated variables.",
    recommendations: "Expand the dashboard with cohort filters, intervention tracking, and predictive modeling to help educators identify support opportunities earlier.",
    link: "",
    visible: true,
    likes: 0,
    image: "assets/project-student-habits.svg",
    dashboard: false,
    files: [
      {
        name: "Student Habits Performance Power BI File",
        type: "application/octet-stream",
        data: "assets/BILLAL JAVED student_habits_performance.pbix",
        note: "Power BI project file containing the student habits and academic performance dashboard."
      }
    ]
  },
  {
    id: "corporate-uncertainty-index",
    title: "Corporate Uncertainty Index from Earnings Calls",
    category: "Text Analytics / Finance",
    date: "Spring 2026",
    tech: "Python, Polars, pandas, regular expressions, Loughran-McDonald dictionary, matplotlib, regression analysis",
    summary: "Created a company-level uncertainty index from earnings call transcripts for Apple, Nvidia, and Visa, then compared uncertainty patterns over time.",
    reason: "To test how executive language in earnings calls can become a measurable signal for business uncertainty and market interpretation.",
    process: "Cleaned transcript sentences, corrected ticker labels, counted Loughran-McDonald uncertainty words, normalized counts per 1,000 transcript words, aggregated call-level and yearly indexes, and visualized differences across companies.",
    details: "Problem solved: earnings calls contain qualitative language that can be difficult to compare across companies and years. My role was to turn unstructured text into a structured uncertainty index. I analyzed 172 earnings calls, created company-date observations, plotted uncertainty movement over time, and added a bonus regression using next-trading-day stock returns to connect language signals with market reaction.",
    findings: "The uncertainty indices were not the same across companies. Apple had the lowest average uncertainty index at about 7.92 uncertainty words per 1,000 transcript words, while Nvidia and Visa were higher at about 8.75 and 8.56. Visa showed a clear jump around 2020, which aligns with COVID-related pressure on payment volume and cross-border transactions.",
    recommendations: "Use text-derived uncertainty as a supporting risk signal rather than a standalone investment decision. A stronger next version would add more companies, industry controls, event labels, and sentiment categories beyond uncertainty.",
    link: "",
    visible: true,
    likes: 0,
    image: "assets/project-uncertainty-index.svg",
    files: []
  },
  {
    id: "airline-review-sentiment-topic-analysis",
    title: "Airline Review Sentiment and Topic Analysis",
    category: "NLP / Customer Analytics",
    date: "Spring 2026",
    tech: "Python, pandas, VADER sentiment, LDA topic modeling, scikit-learn, seaborn, word clouds",
    summary: "Analyzed 23,171 airline reviews using sentiment scoring and topic modeling to identify complaint themes, service strengths, and airline-level variation.",
    reason: "To understand how customer language connects with ratings, recommendation behavior, and specific service issues in airline reviews.",
    process: "Cleaned review text, calculated VADER sentiment scores, tuned LDA topic models, labeled topics, compared sentiment with ratings, identified common complaints, and visualized topic sentiment by airline.",
    details: "Problem solved: airline reviews contain thousands of unstructured customer experiences that need to be grouped into actionable themes. My role was to convert review text into sentiment scores, topics, complaint patterns, and airline comparisons. The analysis used 23,171 reviews and created interpretable topics such as airport handling, low-cost travel friction, onboard service, premium cabin experience, positive general experience, and delays/refunds/customer service complaints.",
    findings: "Sentiment aligned meaningfully with ratings, with Pearson correlation around 0.546 and Spearman correlation around 0.450. The most negative topic was delays, cancellations, refunds, and customer service complaints, with average sentiment around -0.472 and average rating around 1.67. The most positive topic centered on friendly service, comfort, value, and cleanliness.",
    recommendations: "For airline managers, reliability and service recovery are the biggest downside risks, while friendliness, comfort, clean cabins, and fair value are the strongest upside themes. Future work could connect review topics to route, cabin class, and operational delay data.",
    link: "",
    visible: true,
    likes: 0,
    image: "assets/project-airline-nlp.svg",
    files: []
  },
  {
    id: "restaurant-recommendation-system",
    title: "Hybrid Restaurant Recommendation System",
    category: "Recommendation Systems",
    date: "Spring 2026",
    tech: "Python, pandas, scikit-learn, cosine similarity, one-hot encoding, MinMaxScaler, social graph analysis",
    summary: "Built a hybrid recommender that combines restaurant attributes, user similarity, restaurant similarity, interactions, and social graph signals.",
    reason: "To create local restaurant recommendations that account for user preferences, social influence, prior interactions, and city relevance.",
    process: "Prepared five datasets, engineered restaurant and user feature matrices, calculated cosine similarity, tested direct friend and friend-of-friend similarity, weighted interactions, and generated ranked city-filtered recommendations.",
    details: "Problem solved: recommendation systems need to provide relevant suggestions even when users have sparse interaction history. My role was to combine content-based, collaborative, interaction, and social signals into a practical scoring formula. The model used restaurant cuisine, rating, price range, city, user demographics, preferred cuisine, click/like/visit weights, and social graph relationships.",
    findings: "The final recommendation strength used 40% content match, 25% similar-user interest, 20% similar-restaurant interest, and 15% social interest. Recommendations were filtered to the user's inferred city, excluded restaurants already seen, and passed validation checks for ranking order and city consistency.",
    recommendations: "Use the recommender as a decision-support prototype for localized food discovery. A future version could add live feedback, model evaluation metrics, cold-start tests, and a front-end interface for exploring recommendations by user profile.",
    link: "",
    visible: true,
    likes: 0,
    image: "assets/project-restaurant-recommender.svg",
    files: []
  },
  {
    id: "arcgis-groundwater-web-map",
    title: "ArcGIS Online Groundwater Monitoring Web Map",
    category: "GIS / Spatial Analytics",
    date: "Spring 2026",
    tech: "ArcGIS Online, hosted feature layers, symbology, labels, pop-ups, Instant Apps, Delaware FirstMap services",
    summary: "Created an ArcGIS Online map and Instant App for Delaware groundwater monitoring wells with styled layers, labels, pop-ups, and watershed context.",
    reason: "To practice turning spatial data into an interactive web map that communicates location, attributes, and environmental context clearly.",
    process: "Uploaded a wells CSV to ArcGIS Online, configured latitude and longitude fields, styled well locations, renamed layers, created labels, edited field display names, configured pop-ups, added a Delaware watershed feature service, and built an Instant App viewer.",
    details: "Problem solved: raw location tables are hard to interpret without a spatial interface. My role was to turn well data into a readable web map by configuring map layers, symbols, labels, and pop-up information. I also added external watershed context through Delaware FirstMap and customized an Instant App for desktop, phone, and tablet viewing.",
    findings: "The exercise showed how GIS decisions such as symbol shape, layer naming, label fields, pop-up order, and shared feature services affect how quickly a viewer can understand a spatial dataset.",
    recommendations: "Future improvements could add analysis layers, filtering by aquifer or county, public sharing settings, web analytics, and a short portfolio screenshot once the final app link is ready.",
    link: "",
    visible: true,
    likes: 0,
    image: "assets/project-arcgis-groundwater.svg",
    files: []
  },
  {
    id: "sas-covid-analysis",
    title: "COVID-19 Economic Impact Analysis",
    category: "SAS Analytics",
    date: "Fall 2025",
    tech: "SAS, PROC SQL, DATA steps, macros, PROC SGPLOT",
    summary: "Built an end-to-end SAS analysis evaluating GDP and HDI based case, death, and mortality metrics.",
    reason: "To understand whether economic development alone explains pandemic preparedness.",
    process: "Cleaned and grouped country-level data, built weighted case/death metrics, compared infrastructure indicators, and summarized results through SAS visuals.",
    details: "Problem solved: development metrics can hide public-health weaknesses. My role included analysis, interpretation, and communicating the business/public-policy meaning of the results. Tools used included SAS, PROC SQL, DATA steps, macros, and visual procedures. Challenge: separating reporting strength from actual preparedness. Result: the project showed that hospital capacity and hygiene access mattered alongside GDP and HDI.",
    link: "",
    visible: true,
    likes: 0,
    image: "assets/project-sas-covid.svg",
    files: []
  },
  {
    id: "netflix-dashboard",
    title: "Netflix Content Analytics Dashboard",
    category: "Data Visualization",
    date: "Fall 2025",
    tech: "Tableau, calculated fields, filters, KPI design",
    summary: "Created a dashboard exploring Netflix content trends by genre, release year, country, and ratings.",
    reason: "To practice turning entertainment data into business-friendly content strategy insights.",
    process: "Built calculated fields, dynamic filters, KPI views, and story-based visuals for trend exploration.",
    details: "Problem solved: large content datasets are difficult to interpret without focused visual structure. My role was to design the dashboard logic and communicate patterns clearly. Tools used included Tableau, calculated fields, parameters, and filters. Result: a clean analytical view of content distribution and strategy signals.",
    link: "",
    visible: true,
    likes: 0,
    image: "assets/project-netflix-dashboard.svg",
    files: []
  },
  {
    id: "arthaven-database",
    title: "ArtHaven Gallery Database Design",
    category: "Database Systems",
    date: "Fall 2025",
    tech: "Relational design, ER modeling, normalization, business rules",
    summary: "Designed a normalized relational database for ArtHaven, a multi-gallery art exhibition business supporting artists, exhibitions, customers, employees, sales, and location-based reporting.",
    reason: "To help ArtHaven preserve operational data, maintain data integrity across galleries, and support reporting for exhibitions, artist management, customer engagement, sales, employee commissions, and branch-level decision-making.",
    process: "Translated the business overview into entities, attributes, primary keys, foreign keys, cardinalities, and business policies. Modeled galleries, exhibitions, exhibition_artwork, artworks, artists, local and international artist extensions, sales, customers, employees, employee contacts, and ZIP code normalization.",
    details: "Problem solved: ArtHaven needed a structured database concept for physical gallery operations where exhibitions can contain many artworks, artworks can appear in many exhibitions through pricing records, artists can be local or international, employees are assigned to galleries, and sales must connect customers, employees, artworks, and exhibitions. My role was to interpret the business requirements, define the core data entities, document relationships and cardinalities, and align the logical model with operating policies such as verified artists, scheduled exhibitions, customer referral tracking, employee contact maintenance, and 5% sales commission eligibility.",
    findings: "The stronger logical model is the version that includes ZIP code normalization, employee contact details, local and international artist specialization, and the central sales relationships. Those elements match the business document more closely than the simpler LDM because they support location reporting, artist payment differences, employee contact history, and complete sale accountability.",
    recommendations: "A next step would be to implement this model in SQL, add constraints for required customer, employee, exhibition, and artwork relationships, create commission reporting queries, and build dashboard views for exhibition sales, artist performance, customer referrals, and branch-level activity.",
    link: "",
    visible: true,
    likes: 0,
    image: "assets/project-arthaven-database.svg",
    files: [
      {
        name: "ArtHaven Business Overview",
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        data: "assets/ArtHaven_Business_Overview.docx",
        note: "Business overview, mission, data storage purpose, table relationships, cardinalities, and business policies used to design the database."
      },
      {
        name: "ArtHaven Logical Data Model",
        type: "image/jpeg",
        data: "assets/arthaven-logical-data-model.jpg",
        note: "Selected LDM because it best matches the Word document: Zipcode, Employee_contact, Local_artist, International_artist, Sales, Customers, Gallery, Exhibition, Exhibition_artwork, Artwork, and Artist."
      }
    ]
  },
  {
    id: "fintech-mapping",
    title: "AI-Powered Data Mapping for Fintech Integrations",
    category: "Fintech",
    date: "Fall 2025",
    tech: "Data quality checks, FDX APIs, Fiserv DNA, compliance mapping",
    summary: "Hackathon project focused on compliant data mapping between fintech systems.",
    reason: "To explore how financial data can move between systems without losing accuracy or trust.",
    process: "Supported data quality checks, business case development, and cross-functional solution planning.",
    details: "Problem solved: fintech integrations require accurate mapping across different data standards. My role centered on data quality and business framing. Tools and concepts included FDX APIs, Fiserv DNA, compliance mapping, and product integration logic. Result: a practical solution concept with a clear business and compliance angle.",
    link: "",
    visible: true,
    likes: 0,
    image: "assets/project-fintech-mapping.svg",
    files: []
  },
  {
    id: "nvidia-pestle",
    title: "Nvidia PESTLE Analysis",
    category: "Strategy",
    date: "Spring 2025",
    tech: "Market research, PESTLE, AI market trends, strategic analysis",
    summary: "Analyzed Nvidia through political, economic, social, technological, legal, and environmental forces.",
    reason: "To evaluate business risk and opportunity around AI growth, trade restrictions, and antitrust pressure.",
    process: "Researched external forces and summarized strategic implications in a visual infographic.",
    details: "Problem solved: high-growth technology companies face risks beyond product performance. My role involved research, strategic framing, and visual communication. Challenge: making complex policy and market issues concise. Result: a competition-ready strategic analysis artifact.",
    link: "",
    visible: true,
    likes: 0,
    image: "assets/project-nvidia-strategy.svg",
    files: []
  },
  {
    id: "risk-perception-brand-equity",
    title: "Risk Perception and Brand Equity Research",
    category: "Research / Marketing Analytics",
    date: "Spring 2024",
    tech: "SMARTPLS, SPSS, survey analysis, brand equity research, statistical interpretation",
    summary: "Analyzed how risk perception relates to brand equity and customer trust using quantitative research tools.",
    reason: "To understand how perceived risk shapes customer loyalty, trust, and competitive brand positioning.",
    process: "Used SMARTPLS and SPSS to analyze research data, interpret relationships, and connect statistical findings to practical brand strategy.",
    details: "Problem solved: organizations need to understand how customer risk perception affects brand value and loyalty. My role involved statistical analysis, interpretation, and recommendation development. The project connected academic research methods with business-facing brand strategy recommendations.",
    findings: "Risk perception can influence how customers evaluate trust, loyalty, and brand strength, especially when uncertainty affects purchase confidence.",
    recommendations: "Strengthen transparent communication, trust-building signals, and customer education to reduce perceived risk and improve brand equity.",
    link: "",
    visible: true,
    likes: 0,
    image: "assets/project-brand-equity-v2.svg",
    files: []
  }
];

const defaultCertifications = [
  {
    id: "financial-accounting-fundamentals",
    title: "Financial Accounting Fundamentals",
    issuer: "University of Virginia / Coursera",
    date: "Dec 2021",
    summary: "Completed a University of Virginia course through Coursera covering core financial statement knowledge, accounting logic, and business reporting foundations.",
    skills: "Financial Accounting, Financial Statements, Business Reporting, Accounting Fundamentals",
    file: "assets/financial accounting fundamentals certificate.pdf"
  },
  {
    id: "human-resource-management",
    title: "Human Resources Analytics",
    issuer: "University of California, Irvine / Coursera",
    date: "Dec 2021",
    summary: "Completed a University of California, Irvine course through Coursera focused on HR analytics, people data, and evidence-based workforce decisions.",
    skills: "Human Resources Analytics, People Data, Workforce Decisions, Organizational Analysis",
    file: "assets/hrm certificate.pdf"
  }
];

const defaultBlogs = [
  {
    id: "analytics-purpose",
    title: "Analytics Should Make the Next Decision Clearer",
    date: "2026",
    tags: "portfolio, data analysis, career growth, technology, professional growth",
    preview: "A dashboard is only useful when it helps someone understand the next decision.",
    body: "A dashboard is not valuable because it looks technical. It is valuable when it helps someone understand the situation faster and choose the next action with more confidence. That is the standard I try to bring into data analysis, project management, and business analytics work.",
    article: {
      abstract: "Business analytics creates value when it reduces uncertainty around a real decision. This article examines why dashboards should begin with a decision, how evidence becomes actionable, and where analysts must remain careful about quality, timing, and interpretation.",
      readingTime: "7 minute read",
      sections: [
        {
          heading: "The decision comes before the dashboard",
          paragraphs: [
            "A technically impressive dashboard can still fail if the viewer does not know what action it supports. The first analytical task is therefore not selecting a chart. It is defining the decision, the stakeholder, the time horizon, and the consequence of being wrong.",
            "IBM describes data-driven decision-making as a process that connects objectives, prepared data, analysis, conclusions, implementation, and evaluation. That sequence matters because visual output is only one stage in a larger management process."
          ]
        },
        {
          heading: "From descriptive metrics to decision support",
          paragraphs: [
            "Descriptive analytics explains what happened. Diagnostic analysis asks why. Predictive analysis estimates what may happen next, while prescriptive analysis evaluates possible actions. A strong business dashboard makes these levels visible without pretending that every correlation is a recommendation.",
            "For an operations problem, a useful view might connect demand, capacity, wait time, and service targets. For finance, it may connect performance, risk, assumptions, and variance. The design should reflect the logic of the business problem."
          ]
        },
        {
          heading: "Trust depends on quality and timing",
          paragraphs: [
            "Analytics loses value when the data is incomplete, late, poorly defined, or disconnected from business context. NIST's work on decision science emphasizes measurement, standards, data analytics, and trustworthy comparison as foundations for informed decisions in complex systems.",
            "The analyst's responsibility includes documenting definitions, checking data quality, making assumptions visible, and distinguishing evidence from interpretation. Clear communication is not decoration; it is part of analytical validity."
          ]
        },
        {
          heading: "How I apply this principle",
          paragraphs: [
            "In my projects, I try to begin with a question that a manager, analyst, or stakeholder could realistically ask. I then organize the data, select measures that match the question, build a visual hierarchy, and explain what the result does and does not support.",
            "My goal is not to remove judgment from decisions. It is to give judgment a stronger evidence base, a clearer view of tradeoffs, and a more disciplined way to learn from outcomes."
          ]
        }
      ],
      references: [
        { label: "IBM: What is data-driven decision-making?", url: "https://www.ibm.com/think/topics/data-driven-decision-making" },
        { label: "NIST: System and Decision Science", url: "https://www.nist.gov/circular-economy/research-areas/system-and-decision-science" },
        { label: "NIST: Data Analytics for Smart Manufacturing Systems", url: "https://www.nist.gov/programs-projects/data-analytics-smart-manufacturing-systems" }
      ]
    },
    visible: true,
    views: 0
  },
  {
    id: "student-developer-growth",
    title: "Building as a Student Developer",
    date: "2026",
    tags: "student developer, web development, software engineering, leadership, project management",
    preview: "Portfolio work is where learning becomes visible, testable, and easier to explain.",
    body: "As a student developer and analytics learner, I see projects as proof of thinking. A good project shows the question, the process, the tradeoffs, and the result. It also shows whether I can communicate value clearly to another person.",
    article: {
      abstract: "A graduate portfolio is more than a gallery of finished files. It is a record of how a student frames problems, applies tools, responds to limitations, and communicates professional value.",
      readingTime: "6 minute read",
      sections: [
        {
          heading: "Projects make learning observable",
          paragraphs: [
            "Coursework develops concepts, but projects reveal whether those concepts can be organized into a complete piece of work. A portfolio allows another person to inspect the question, method, assumptions, output, and reflection rather than relying only on a list of skills.",
            "That distinction is especially important in analytics, where technical execution and business interpretation must work together. A model or dashboard becomes more credible when its purpose and limitations are explained."
          ]
        },
        {
          heading: "A portfolio should show a process",
          paragraphs: [
            "The strongest project descriptions explain why the work was undertaken, how the data was prepared, which choices shaped the analysis, what challenges appeared, and what changed after evaluation. This turns a project from a screenshot into evidence of structured thinking.",
            "ACM curriculum guidance has long emphasized significant project experience as a way to strengthen problem-solving and connect academic work with professional practice."
          ]
        },
        {
          heading: "Public work creates a feedback loop",
          paragraphs: [
            "Publishing work creates opportunities for feedback, revision, collaboration, and clearer communication. GitHub's 2025 Octoverse reported record development activity and substantial growth in Jupyter Notebook use, illustrating how code, analysis, and documentation increasingly coexist in public technical workflows.",
            "Activity alone does not prove learning, but maintaining understandable work encourages habits that matter professionally: version awareness, documentation, iteration, and accountability."
          ]
        },
        {
          heading: "My graduate-student approach",
          paragraphs: [
            "I use this portfolio to connect my accounting and finance background with graduate work in business analytics and information management. Each project helps me practice a different part of the analytical process, from database design and visualization to simulation and strategic interpretation.",
            "The portfolio will continue to change as my judgment improves. That is part of its purpose: it should show not only what I have completed, but how my way of thinking is becoming more precise."
          ]
        }
      ],
      references: [
        { label: "ACM/IEEE-CS: Computing Curricula 2020", url: "https://www.acm.org/binaries/content/assets/education/curricula-recommendations/cc2020.pdf" },
        { label: "GitHub Octoverse 2025", url: "https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/" }
      ]
    },
    visible: true,
    views: 0
  }
];

const defaultState = {
  homeTitle: "I translate business uncertainty into analytical decisions.",
  homeIntro: "I am Billal Javed, an M.S. Business Analytics and Information Management graduate student at the University of Delaware. My work connects finance, operations, simulation, data systems, dashboards, and AI-supported analysis to help decision-makers understand what is happening and what to do next.",
  aboutText: "I bring together an accounting and finance foundation with graduate training in business analytics and information management at the University of Delaware. My work spans data analysis, visualization, simulation, operations, and decision-focused communication.",
  content: {
    aboutHeading: "Business analytics, finance, and leadership in practice.",
    portfolioHeading: "Projects, analytical work, and leadership in practice.",
    liveSnapshotHeading: "A simple view of how visitors interact with this portfolio.",
    liveSnapshotIntro: "This section reads local website activity and turns it into a small analytics snapshot: visits, clicks, portfolio interest, project likes, blog views, contact submissions, and resume downloads. It is a demo of how raw interaction data can become a readable business signal.",
    profileStatus: "Expected graduation: December 2026 · Let's discuss how analytics can support your next decision.",
    aboutKicker: "A business foundation strengthened by analytical thinking.",
    aboutSecondary: "I approach analytics as a business discipline, not simply a technical exercise. My accounting and finance background helps me understand performance, risk, and commercial context, while graduate work in data systems, visualization, simulation, and AI-supported analysis helps me test ideas and communicate evidence clearly. Experience in housing operations, food service, student leadership, and event coordination has also strengthened the practical side of my work: listening carefully, organizing priorities, collaborating across teams, and following through under pressure.",
    skillsHeading: "A practical toolkit for analysis, communication, and execution.",
    skillsIntro: "My skill set combines analytical technology with business understanding, research discipline, and the interpersonal skills required to move work forward.",
    experienceHeading: "Experience that connects analysis, operations, service, and leadership.",
    experienceIntro: "Each role has developed a different part of how I work: analytical judgment, operational discipline, customer awareness, collaboration, and ownership.",
    housingDescription: "Coordinate front-desk and housing operations, respond to resident needs, support room and maintenance logistics, maintain records, and use Excel and Google Workspace for tracking, audits, inventory, and performance reporting.",
    aramarkDescription: "Work in a fast-paced service environment where accuracy, food-safety awareness, teamwork, time management, and clear customer communication directly affect daily performance and the customer experience.",
    gsaDescription: "Coordinate with students, faculty, the BAIM community, and University departments to plan programs that strengthen student engagement and professional development.",
    internshipDescription: "Performed fundamental and technical analysis across stocks, commodities, and currencies, collaborated with business development, marketing, and finance teams, and helped communicate investment opportunities to prospective investors.",
    academicHeading: "Education shaping my analytical perspective.",
    mastersDegree: "M.S. Business Analytics and Information Management",
    mastersSchool: "University of Delaware · Expected December 2026",
    mastersDescription: "Graduate coursework connects data architecture, programming, visual analytics, cybersecurity, simulation, and unstructured data analysis with practical business decision-making. The program has strengthened how I move from raw information to structured models, visual evidence, and management-focused recommendations.",
    mastersCompletedCourses: "Database Design & Implementation, Cybersecurity Management, Fundamentals of Business Analytics, Visual Analytics, Business Programming, Applied Database Management, Big Data Technologies, Simulation with AI for Business, Unstructured Data Analytics",
    mastersPlannedCourses: "ERP Systems",
    bachelorsDegree: "B.S. Accounting and Finance",
    bachelorsSchool: "Riphah International University · Completed July 2024",
    bachelorsDescription: "The degree established a broad foundation in accounting, finance, economics, management, research, and business regulation. It developed my ability to interpret financial information, evaluate risk and investment questions, understand organizational decisions, and communicate analysis within a business context.",
    bachelorsFinanceCourses: "Financial Econometrics, Equity Assets Valuation, Investment Analysis & Portfolio Management, Corporate Finance, Financial Management, Money and Capital Markets, Business Statistics, Research Methods",
    bachelorsBusinessCourses: "Financial Accounting & Reporting, Cost Accounting, Management Accounting, Audit and Assurance, Business Taxation, Corporate Governance, Business Policy and Strategy, Entrepreneurship",
    workshopHeading: "From Data to Decision: Analytics & Storytelling Workshop",
    workshopIntro: "A four-hour professional development workshop organized through the BAIM Graduate Student Association in collaboration with the University of Delaware Library's Research Data & Design Commons.",
    workshopRole: "I developed the workshop concept and learning objectives, coordinated with the department and library team, secured the Data Analysis & Visualization Lab, managed registration and communications, selected hands-on datasets, supported event logistics, and facilitated the student experience.",
    workshopOutcome: "The workshop guided participants through data ethics, storytelling with data, data management, and practical analysis. Students applied the workflow to real-world datasets, shared their findings, and gained an opportunity to earn a LinkedIn-shareable badge recognizing their participation and professional development."
  },
  skillGroups: [
    { title: "Analytics & Programming", description: "Building, cleaning, testing, and interpreting analytical work.", skills: "Python, SQL, R Studio, SAS, SPSS, SMARTPLS, Google Colab, Statistical Analysis" },
    { title: "Business Intelligence & Visualization", description: "Turning complex information into clear visual decision support.", skills: "Power BI, Tableau, DAX, Excel, ArcGIS, Geospatial Visualization, Dashboard Design, Data Storytelling" },
    { title: "Modeling, Simulation & AI", description: "Exploring uncertainty, behavior, risk, and possible outcomes.", skills: "Quantitative Modeling, Monte Carlo, Agent-Based Modeling, Discrete-Event Simulation, Simulation with AI, Machine Learning Tools, Risk Analysis" },
    { title: "Finance, Strategy & Research", description: "Connecting analytical findings to commercial and organizational context.", skills: "Financial Modeling, Market Research, Business Strategy, Risk Management, Strategic Thinking, Sustainability Awareness, Business Development" },
    { title: "Leadership & Operations", description: "Coordinating people, priorities, service, and project delivery.", skills: "Project Management, Event Planning, Stakeholder Communication, Cross-Team Coordination, Customer Service, Facilitation, Time Management" },
    { title: "Professional Productivity", description: "Supporting clear documentation, presentation, and collaborative work.", skills: "Microsoft Word, PowerPoint, Google Workspace, Professional Writing, Presentation, Documentation, Teamwork" }
  ],
  textStyles: {
    globalText: { align: "left", fontSize: 16, fontFamily: DEFAULT_FONT_STACK, fontWeight: "400", fontStyle: "normal", textDecoration: "none", lineHeight: 1.6, color: "#edf6ff" },
    allHeadings: { align: "left", fontSize: 40, fontFamily: DEFAULT_FONT_STACK, fontWeight: "800", fontStyle: "normal", textDecoration: "none", lineHeight: 1.14, color: "#edf6ff" },
    navigationText: { align: "center", fontSize: 15, fontFamily: DEFAULT_FONT_STACK, fontWeight: "700", fontStyle: "normal", textDecoration: "none", lineHeight: 1.2, color: "#9fb2c8" },
    buttonText: { align: "center", fontSize: 15, fontFamily: DEFAULT_FONT_STACK, fontWeight: "800", fontStyle: "normal", textDecoration: "none", lineHeight: 1.2, color: "#edf6ff" },
    homeTitle: { align: "left", fontSize: 42, fontFamily: DEFAULT_FONT_STACK, fontWeight: "800", fontStyle: "normal", textDecoration: "none", lineHeight: 1.14, color: "#edf6ff" },
    homeIntro: { align: "left", fontSize: 16, fontFamily: DEFAULT_FONT_STACK, fontWeight: "400", fontStyle: "normal", textDecoration: "none", lineHeight: 1.6, color: "#9fb2c8" },
    aboutText: { align: "left", fontSize: 16, fontFamily: DEFAULT_FONT_STACK, fontWeight: "400", fontStyle: "normal", textDecoration: "none", lineHeight: 1.6, color: "#9fb2c8" }
  },
  profileImage: DEFAULT_PROFILE_IMAGE,
  resume: null,
  resumeUpdatedAt: "",
  pageEdits: {},
  projects: defaultProjects,
  certifications: defaultCertifications,
  customSections: [],
  blogs: defaultBlogs,
  messages: [],
  tracking: {
    sectionVisits: {},
    projectLikes: 0,
    contactSubmissions: 0,
    blogViews: 0,
    portfolioViews: 0,
    resumeDownloads: 0,
    clicks: 0,
    pageViews: 0
  },
  socialLinks: {
    github: DEFAULT_GITHUB_URL,
    linkedin: "https://www.linkedin.com/in/billaljaved",
    handshake: "https://udel.joinhandshake.com/profiles/billaljaved"
  },
  layout: {
    density: "comfortable",
    cardRadius: 8,
    animations: true
  }
};

const state = loadState();
let adminUnlocked = false;

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(defaultState);
  let parsed;
  try {
    parsed = JSON.parse(saved);
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
    return structuredClone(defaultState);
  }
  const merged = {
    ...structuredClone(defaultState),
    ...parsed,
    tracking: { ...defaultState.tracking, ...(parsed.tracking || {}) },
    projects: mergeById(Array.isArray(parsed.projects) ? parsed.projects : [], defaultProjects),
    certifications: mergeCertifications(Array.isArray(parsed.certifications) ? parsed.certifications : []),
    customSections: Array.isArray(parsed.customSections) ? parsed.customSections : [],
    blogs: mergeBlogs(Array.isArray(parsed.blogs) ? parsed.blogs : []),
    messages: Array.isArray(parsed.messages) ? parsed.messages : [],
    pageEdits: parsed.pageEdits || {},
    content: { ...defaultState.content, ...(parsed.content || {}) },
    skillGroups: Array.isArray(parsed.skillGroups) ? parsed.skillGroups : defaultState.skillGroups,
    socialLinks: { ...defaultState.socialLinks, ...(parsed.socialLinks || {}) },
    textStyles: mergeTextStyles(parsed.textStyles),
    layout: { ...defaultState.layout, ...(parsed.layout || {}) }
  };
  if (parsed.homeTitle === OLD_HOME_TITLE) merged.homeTitle = defaultState.homeTitle;
  if (parsed.homeIntro === OLD_HOME_INTRO) merged.homeIntro = defaultState.homeIntro;
  if ([OLD_ABOUT_TEXT, PREVIOUS_ABOUT_TEXT].includes(parsed.aboutText)) merged.aboutText = defaultState.aboutText;
  if (merged.socialLinks.github === OLD_GITHUB_URL) merged.socialLinks.github = DEFAULT_GITHUB_URL;
  ensurePortfolioDashboardFile(merged.projects);
  return merged;
}

function ensurePortfolioDashboardFile(projects) {
  const project = projects.find((item) => item.id === "billal-portfolio-website");
  if (!project) return;
  if (!Array.isArray(project.files)) project.files = [];
  if (!project.files.some((file) => file.data === "portfolio-dashboard.html")) {
    project.files.push({
      name: "Interactive Portfolio Analytics Dashboard",
      type: "text/html",
      data: "portfolio-dashboard.html",
      note: "A live, interactive dashboard summarizing portfolio projects, technologies, categories, timeline, and recorded website engagement."
    });
  }
}

function mergeById(savedItems, defaults) {
  const mergedDefaults = defaults.map((item) => {
    const saved = savedItems.find((savedItem) => savedItem.id === item.id);
    if (!saved) return structuredClone(item);
    return {
      ...item,
      likes: saved.likes ?? item.likes,
      visible: saved.visible ?? item.visible,
      image: shouldUseDefaultProjectImage(saved.image) ? item.image : (saved.image || item.image),
      dashboard: saved.dashboard ?? item.dashboard,
      files: mergeFiles(saved.files, item.files)
    };
  });
  const custom = savedItems.filter((saved) => !defaults.some((item) => item.id === saved.id));
  return [...mergedDefaults, ...custom].sort((a, b) => compareProjectDates(a.date, b.date));
}

function mergeFiles(savedFiles = [], defaultFiles = []) {
  const files = Array.isArray(defaultFiles) ? structuredClone(defaultFiles) : [];
  (Array.isArray(savedFiles) ? savedFiles : []).forEach((file) => {
    if (!files.some((item) => item.data === file.data || item.name === file.name)) files.push(file);
  });
  return files;
}

function shouldUseDefaultProjectImage(imagePath = "") {
  return [
    "assets/arthaven-card.jfif",
    "assets/project-brand-equity.svg"
  ].includes(imagePath);
}

function mergeCertifications(savedCertifications) {
  const defaults = defaultCertifications.map((certification) => {
    const saved = savedCertifications.find((item) => item.id === certification.id);
    return saved ? { ...certification, ...saved, file: certification.file } : structuredClone(certification);
  });
  const custom = savedCertifications.filter((certification) => !defaultCertifications.some((item) => item.id === certification.id));
  return [...defaults, ...custom];
}

function compareProjectDates(a, b) {
  return termDateRank(b) - termDateRank(a);
}

function termDateRank(value = "") {
  const text = String(value);
  const yearMatch = text.match(/20\d{2}/);
  const year = yearMatch ? Number(yearMatch[0]) : 0;
  const lower = text.toLowerCase();
  const season =
    lower.includes("fall") ? 4 :
    lower.includes("summer") ? 3 :
    lower.includes("spring") ? 2 :
    lower.includes("winter") ? 1 : 0;
  return year * 10 + season;
}

function mergeBlogs(savedBlogs) {
  const defaults = defaultBlogs.map((blog) => {
    const saved = savedBlogs.find((item) => item.id === blog.id);
    return saved ? { ...blog, ...saved, article: saved.article || blog.article } : structuredClone(blog);
  });
  const custom = savedBlogs.filter((blog) => !defaultBlogs.some((item) => item.id === blog.id));
  return [...defaults, ...custom];
}

function mergeTextStyles(savedStyles = {}) {
  const merged = Object.fromEntries(Object.entries(defaultState.textStyles).map(([key, defaultStyle]) => [
    key,
    { ...defaultStyle, ...(savedStyles?.[key] || {}) }
  ]));
  if ([32, 48].includes(merged.allHeadings.fontSize)) merged.allHeadings.fontSize = 40;
  if ([44, 48].includes(merged.homeTitle.fontSize)) merged.homeTitle.fontSize = 42;
  return merged;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getAdminPassword() {
  const storedPassword = localStorage.getItem(ADMIN_PASSWORD_KEY);
  if (!storedPassword || OLD_ADMIN_PASSWORDS.includes(storedPassword)) {
    localStorage.setItem(ADMIN_PASSWORD_KEY, ADMIN_PASSWORD);
    return ADMIN_PASSWORD;
  }
  return storedPassword;
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function fileToData(file) {
  return new Promise((resolve) => {
    if (!file || !file.name) return resolve(null);
    const reader = new FileReader();
    reader.onload = () => resolve({
      name: file.name,
      type: file.type,
      data: reader.result,
      updatedAt: new Date().toLocaleString()
    });
    reader.readAsDataURL(file);
  });
}

function placeholderImage(title) {
  const encoded = encodeURIComponent(title);
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 540'%3E%3Crect width='900' height='540' fill='%23eef3f8'/%3E%3Cpath d='M90 390 C220 240 330 340 470 190 S690 150 810 90' fill='none' stroke='%232357c6' stroke-width='12' opacity='.7'/%3E%3Ccircle cx='210' cy='330' r='82' fill='%23dbe7ff'/%3E%3Ctext x='56' y='274' font-family='Arial' font-size='44' font-weight='700' fill='%23172033'%3E${encoded}%3C/text%3E%3C/svg%3E`;
}

function renderContent() {
  applyLayoutSettings();
  setText("homeTitle", state.homeTitle);
  setText("homeIntro", state.homeIntro);
  setText("aboutText", state.aboutText);
  Object.entries(state.content).forEach(([id, value]) => setText(id, value));
  renderAcademicCoursework();
  applyTextStyles();
  renderProfileImage();
  renderSkills();
  renderSkillGroups();
  renderResumeLinks();
  renderSocialLinks();
  renderFeaturedProjects();
  renderCertifications();
  renderCustomSections();
  renderPortfolio();
  renderHomeDashboardPreview();
  renderPortfolioDashboard();
  renderProjectReport();
  renderBlogs();
  renderBlogArticle();
  renderAdmin();
  renderFooterLegal();
  renderPublicAnalytics();
  setupHeroAnalytics();
  applyPageEdits();
  setupAdminPreviewEditing();
  setupContactRedirect();
}

function setupContactRedirect() {
  const redirect = document.getElementById("contactRedirect");
  if (redirect) {
    const returnUrl = new URL(window.location.href);
    returnUrl.search = "?sent=1";
    returnUrl.hash = "";
    redirect.value = returnUrl.href;
  }
  if (new URLSearchParams(window.location.search).get("sent") === "1") {
    const note = document.getElementById("contactNote");
    if (note) {
      note.textContent = "Thank you. Your message was submitted successfully.";
      note.hidden = false;
    }
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

function applyLayoutSettings() {
  document.documentElement.style.setProperty("--radius", `${state.layout.cardRadius || 8}px`);
  document.body.classList.toggle("density-compact", state.layout.density === "compact");
  document.body.classList.toggle("density-spacious", state.layout.density === "spacious");
  document.body.classList.toggle("animations-off", state.layout.animations === false);
}

function renderSocialLinks() {
  document.querySelectorAll('[data-social="github"]').forEach((link) => link.href = state.socialLinks.github);
  document.querySelectorAll('[data-social="linkedin"]').forEach((link) => link.href = state.socialLinks.linkedin);
  document.querySelectorAll('[data-social="handshake"]').forEach((link) => link.href = state.socialLinks.handshake);
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function applyTextStyles() {
  applyStyleToElements(document.body ? [document.body] : [], state.textStyles.globalText);
  applyStyleToElements(document.querySelectorAll("h1"), state.textStyles.allHeadings);
  applyStyleToElements(document.querySelectorAll(".top-nav a, .brand, .footer-links a"), state.textStyles.navigationText);
  applyStyleToElements(document.querySelectorAll(".button, button"), { ...state.textStyles.buttonText, color: "" });
  ["homeTitle", "homeIntro", "aboutText"].forEach((id) => {
    const element = document.getElementById(id);
    if (element) applyStyleToElements([element], state.textStyles[id]);
  });
}

function applyStyleToElements(elements, style = {}) {
  elements.forEach((element) => {
    element.style.textAlign = style.align || "";
    element.style.fontSize = style.fontSize ? `${style.fontSize}px` : "";
    element.style.fontFamily = style.fontFamily || "";
    element.style.fontWeight = style.fontWeight || "";
    element.style.fontStyle = style.fontStyle || "";
    element.style.textDecoration = style.textDecoration || "";
    element.style.lineHeight = style.lineHeight || "";
    element.style.color = style.color || "";
  });
}

function getEditableElements() {
  return Array.from(document.querySelectorAll(`
    .brand,
    .top-nav a,
    .social-actions a,
    .eyebrow,
    h1,
    h2,
    h3,
    p,
    .button,
    .small-button,
    .panel-heading span,
    .panel-heading a,
    .footer-links a
  `)).filter((element) => {
    if (element.closest(".admin, dialog, .admin-preview-control")) return false;
    if (!element.textContent.trim() && !element.getAttribute("aria-label")) return false;
    return true;
  });
}

function getPageEditKey(element, index) {
  const page = document.body.dataset.page || "page";
  const label = element.id || element.dataset.pageLink || element.dataset.social || element.className || element.tagName.toLowerCase();
  return `${page}:${index}:${String(label).replace(/\s+/g, "-").slice(0, 28)}`;
}

function applyPageEdits() {
  const edits = state.pageEdits || {};
  getEditableElements().forEach((element, index) => {
    const edit = edits[getPageEditKey(element, index)];
    if (!edit) return;
    if (edit.text) setElementEditableText(element, edit.text);
    applyStyleToElements([element], edit.style || {});
  });
}

function setElementEditableText(element, text) {
  const control = element.querySelector(":scope > .admin-preview-control");
  Array.from(element.childNodes).forEach((node) => {
    if (node !== control) node.remove();
  });
  element.insertBefore(document.createTextNode(text), control || null);
}

function getElementEditableText(element) {
  const clone = element.cloneNode(true);
  clone.querySelectorAll(".admin-preview-control").forEach((control) => control.remove());
  return clone.textContent.trim();
}

function setupAdminPreviewEditing() {
  if (!ADMIN_PREVIEW_MODE || document.body.dataset.previewReady === "true") return;
  document.body.dataset.previewReady = "true";
  document.body.classList.add("admin-preview-mode");
  createPreviewToolbar();
  getEditableElements().forEach((element, index) => {
    const key = getPageEditKey(element, index);
    element.classList.add("admin-edit-box");
    element.dataset.editKey = key;
    element.contentEditable = "true";
    element.spellcheck = true;
    const control = document.createElement("button");
    control.className = "admin-preview-control";
    control.type = "button";
    control.title = "Save this text";
    control.setAttribute("aria-label", "Save this text");
    control.textContent = "Edit";
    control.contentEditable = "false";
    control.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      savePreviewTextEdit(element, key);
      control.textContent = "Saved";
      window.setTimeout(() => {
        control.textContent = "Edit";
      }, 900);
    });
    element.appendChild(control);
    element.addEventListener("blur", () => savePreviewTextEdit(element, key));
    element.addEventListener("click", (event) => {
      if (event.target.closest(".admin-preview-control")) return;
      event.preventDefault();
      event.stopPropagation();
      selectPreviewElement(element);
    }, true);
    element.addEventListener("focus", () => selectPreviewElement(element));
  });
  document.addEventListener("click", (event) => {
    if (event.target.closest(".admin-preview-control, .admin-edit-box")) return;
    if (event.target.closest("a, button")) event.preventDefault();
  }, true);
}

function savePreviewTextEdit(element, key) {
  const text = getElementEditableText(element);
  state.pageEdits[key] = {
    ...(state.pageEdits[key] || {}),
    text,
    style: getInlineTextStyle(element)
  };
  saveState();
}

function createPreviewToolbar() {
  if (document.getElementById("previewTextToolbar")) return;
  const toolbar = document.createElement("div");
  toolbar.className = "preview-text-toolbar";
  toolbar.id = "previewTextToolbar";
  toolbar.innerHTML = `
    <button type="button" data-preview-tool="decrease">A-</button>
    <button type="button" data-preview-tool="increase">A+</button>
    <button type="button" data-preview-tool="bold">B</button>
    <button type="button" data-preview-tool="italic">I</button>
    <button type="button" data-preview-tool="left">Left</button>
    <button type="button" data-preview-tool="center">Center</button>
    <button type="button" data-preview-tool="right">Right</button>
    <input type="color" data-preview-tool="color" value="#edf6ff" aria-label="Text color" />
    <button type="button" data-preview-tool="save">Save</button>
  `;
  toolbar.addEventListener("click", handlePreviewToolbarClick);
  toolbar.addEventListener("input", handlePreviewToolbarInput);
  document.body.appendChild(toolbar);
}

function selectPreviewElement(element) {
  activePreviewElement = element;
  document.querySelectorAll(".admin-edit-box.active").forEach((item) => item.classList.remove("active"));
  element.classList.add("active");
  const toolbar = document.getElementById("previewTextToolbar");
  if (toolbar) {
    toolbar.classList.add("visible");
    const color = toolbar.querySelector('[data-preview-tool="color"]');
    if (color) color.value = rgbToHex(getComputedStyle(element).color);
  }
}

function handlePreviewToolbarClick(event) {
  const tool = event.target.dataset.previewTool;
  if (!tool || tool === "color") return;
  event.preventDefault();
  if (!activePreviewElement) return;
  const currentSize = parseFloat(getComputedStyle(activePreviewElement).fontSize) || 16;
  if (tool === "increase") activePreviewElement.style.fontSize = `${Math.min(currentSize + 2, 64)}px`;
  if (tool === "decrease") activePreviewElement.style.fontSize = `${Math.max(currentSize - 2, 10)}px`;
  if (tool === "bold") activePreviewElement.style.fontWeight = getComputedStyle(activePreviewElement).fontWeight >= 700 ? "400" : "800";
  if (tool === "italic") activePreviewElement.style.fontStyle = getComputedStyle(activePreviewElement).fontStyle === "italic" ? "normal" : "italic";
  if (["left", "center", "right"].includes(tool)) activePreviewElement.style.textAlign = tool;
  if (tool === "save") savePreviewTextEdit(activePreviewElement, activePreviewElement.dataset.editKey);
}

function handlePreviewToolbarInput(event) {
  if (event.target.dataset.previewTool !== "color" || !activePreviewElement) return;
  activePreviewElement.style.color = event.target.value;
  savePreviewTextEdit(activePreviewElement, activePreviewElement.dataset.editKey);
}

function getInlineTextStyle(element) {
  const computed = getComputedStyle(element);
  return {
    align: element.style.textAlign || computed.textAlign,
    fontSize: parseFloat(element.style.fontSize || computed.fontSize),
    fontFamily: element.style.fontFamily || computed.fontFamily,
    fontWeight: element.style.fontWeight || computed.fontWeight,
    fontStyle: element.style.fontStyle || computed.fontStyle,
    textDecoration: element.style.textDecoration || computed.textDecorationLine,
    lineHeight: parseFloat(element.style.lineHeight || computed.lineHeight) || "",
    color: rgbToHex(element.style.color || computed.color)
  };
}

function rgbToHex(value) {
  if (!value) return "#edf6ff";
  if (value.startsWith("#")) return value;
  const match = value.match(/\d+/g);
  if (!match || match.length < 3) return "#edf6ff";
  return `#${match.slice(0, 3).map((part) => Number(part).toString(16).padStart(2, "0")).join("")}`;
}

function renderProfileImage() {
  const image = document.getElementById("profileImage");
  if (!image) return;
  image.src = state.profileImage || DEFAULT_PROFILE_IMAGE;
}

function renderSkills() {
  const container = document.getElementById("skillsList");
  if (!container) return;
  const skills = [
    "Python",
    "SQL",
    "SAS",
    "Simulation",
    "Monte Carlo",
    "Agent-Based Modeling",
    "Discrete-Event Simulation",
    "Tableau",
    "Power BI",
    "Excel",
    "DAX",
    "R Studio",
    "ArcGIS",
    "Financial Modeling",
    "Market Research",
    "Business Strategy"
    ,"Machine Learning / AI Tools"
  ];
  container.innerHTML = skills.map((skill) => `<span>${skill}</span>`).join("");
}

function renderSkillGroups() {
  const container = document.getElementById("skillGroups");
  if (!container) return;
  container.innerHTML = state.skillGroups.map((group, index) => `
    <article>
      <span class="skill-group-number">${String(index + 1).padStart(2, "0")}</span>
      <h3>${escapeHtml(group.title)}</h3>
      <p>${escapeHtml(group.description)}</p>
      <div class="skill-cloud">${String(group.skills).split(",").map((skill) => `<span>${escapeHtml(skill.trim())}</span>`).join("")}</div>
    </article>
  `).join("");
}

function renderAcademicCoursework() {
  [
    "mastersCompletedCourses",
    "mastersPlannedCourses",
    "bachelorsFinanceCourses",
    "bachelorsBusinessCourses"
  ].forEach((id) => {
    const container = document.getElementById(id);
    if (!container) return;
    container.innerHTML = String(state.content[id] || "")
      .split(",")
      .map((course) => course.trim())
      .filter(Boolean)
      .map((course) => `<span>${escapeHtml(course)}</span>`)
      .join("");
  });
}

function renderResumeLinks() {
  document.querySelectorAll(".resume-download").forEach((link) => {
    if (state.resume?.data) {
      link.href = state.resume.data;
      link.download = state.resume.name || "Billal-Javed-Resume.pdf";
      link.classList.remove("disabled");
    } else {
      link.href = DEFAULT_RESUME_FILE;
      link.download = "Billal_Javed_Finance_Analyst_Resume.pdf";
      link.classList.remove("disabled");
    }
  });
}

function visibleProjects() {
  return state.projects.filter((project) => project.visible !== false).sort((a, b) => compareProjectDates(a.date, b.date));
}

function renderFeaturedProjects() {
  const container = document.getElementById("featuredProjects");
  if (!container) return;
  container.innerHTML = visibleProjects().slice(0, 4).map((project) => `
    <article class="featured-card">
      <h3>${escapeHtml(project.title)}</h3>
      <p>${escapeHtml(project.summary)}</p>
      <a class="small-button" href="project.html?id=${encodeURIComponent(project.id)}">See More</a>
    </article>
  `).join("");
}

function renderPortfolio() {
  const container = document.getElementById("portfolioGrid");
  if (!container) return;
  container.innerHTML = visibleProjects().map((project) => `
    <article class="project-card reveal">
      <img src="${project.image || placeholderImage(project.title)}" alt="${escapeHtml(project.title)}">
      <div class="card-body">
        <div class="card-meta">
          <span class="tag">${escapeHtml(project.category)}</span>
          <span class="tag">${escapeHtml(project.date)}</span>
        </div>
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.summary)}</p>
        <p><strong>Tech:</strong> ${escapeHtml(project.tech)}</p>
        ${project.files?.length ? `<p><strong>Files:</strong> ${project.files.length} attached</p>` : ""}
        <div class="card-actions">
          <button class="small-button like-button" data-like-project="${project.id}" type="button">♥ ${project.likes || 0}</button>
          <a class="small-button" href="project.html?id=${encodeURIComponent(project.id)}">See More</a>
        </div>
      </div>
    </article>
  `).join("");
}

function renderCertifications() {
  const container = document.getElementById("certificationGrid");
  if (!container) return;
  const certifications = (Array.isArray(state.certifications) ? state.certifications : defaultCertifications).filter((certification) => certification.visible !== false);
  container.innerHTML = certifications.map((certification) => `
    <article class="certification-card reveal">
      <div>
        <div class="card-meta">
          <span class="tag">${escapeHtml(certification.issuer || "Certification")}</span>
          <span class="tag">${escapeHtml(certification.date || "")}</span>
        </div>
        <h3>${escapeHtml(certification.title)}</h3>
        <p>${escapeHtml(certification.summary)}</p>
      </div>
      <div>
        <p><strong>Focus:</strong> ${escapeHtml(certification.skills || "")}</p>
        ${certification.file ? `<a class="small-button" href="${escapeHtml(certification.file)}" target="_blank" rel="noreferrer">View Certificate</a>` : ""}
      </div>
    </article>
  `).join("");
}

function renderCustomSections() {
  const wrapper = document.getElementById("customPortfolioSections");
  const container = document.getElementById("customSectionGrid");
  if (!wrapper || !container) return;
  const visibleSections = (state.customSections || []).filter((section) => section.visible !== false);
  wrapper.hidden = visibleSections.length === 0;
  container.innerHTML = visibleSections.map((section) => `
    <article class="custom-section-card reveal">
      <div>
        <p class="eyebrow">${escapeHtml(section.eyebrow || "Portfolio Note")}</p>
        <h3>${escapeHtml(section.title)}</h3>
        <p>${escapeHtml(section.body)}</p>
        ${section.tags ? `<div class="skills-list">${String(section.tags).split(",").map((tag) => `<span>${escapeHtml(tag.trim())}</span>`).join("")}</div>` : ""}
      </div>
      ${section.file?.data ? `
        <div class="custom-section-file">
          ${section.file.type?.startsWith("image/") ? `<img src="${section.file.data}" alt="${escapeHtml(section.file.name)}">` : ""}
          <p>${escapeHtml(section.file.note || section.file.name)}</p>
          <a class="small-button" href="${section.file.data}" target="_blank" rel="noreferrer" download="${escapeHtml(section.file.name)}">View / Download</a>
        </div>
      ` : ""}
    </article>
  `).join("");
}

function renderFooterLegal() {
  document.querySelectorAll(".site-footer").forEach((footer) => {
    if (footer.dataset.enhanced === "true") return;
    footer.dataset.enhanced = "true";
    const legal = document.createElement("div");
    legal.className = "footer-legal";
    legal.innerHTML = `
      <p><strong>Copyright © 2026 Billal Javed. All rights reserved.</strong></p>
      <p>All portfolio text, project summaries, dashboards, visuals, research descriptions, code concepts, images, and downloadable materials are presented for professional review and educational demonstration. Do not copy, redistribute, sell, or reuse this content without written permission.</p>
      <p>This website is a personal portfolio for business analytics, data visualization, simulation, finance, GIS, database design, and professional growth. Third-party names, tools, platforms, and course materials remain the property of their respective owners.</p>
    `;
    footer.appendChild(legal);
  });
}

function renderHomeDashboardPreview() {
  const container = document.getElementById("homeDashboardPreview");
  if (!container) return;
  const projects = visibleProjects();
  const technologies = new Set();
  projects.forEach((project) => {
    String(project.tech).split(",").map((item) => item.trim()).filter(Boolean).forEach((technology) => technologies.add(technology));
  });
  const engagement = projects.reduce((sum, project) => sum + (project.likes || 0), 0)
    + Number(state.tracking.portfolioViews || 0)
    + Number(state.tracking.blogViews || 0)
    + Number(state.tracking.resumeDownloads || 0);
  container.innerHTML = `
    <span><strong>${projects.length}</strong><small>Projects</small></span>
    <span><strong>${technologies.size}</strong><small>Tools &amp; methods</small></span>
    <span><strong>${engagement}</strong><small>Recorded interactions</small></span>
  `;
}

function renderPortfolioDashboard() {
  const root = document.getElementById("portfolioDashboard");
  if (!root) return;

  const categoryControl = document.getElementById("dashboardCategory");
  const yearControl = document.getElementById("dashboardYear");
  const sortControl = document.getElementById("dashboardSort");
  const visible = visibleProjects();
  const categories = [...new Set(visible.map((project) => project.category))].sort();
  const years = [...new Set(visible.map((project) => project.date).filter(Boolean))].sort().reverse();

  if (categoryControl && !categoryControl.dataset.ready) {
    categoryControl.innerHTML = `<option value="all">All categories</option>${categories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join("")}`;
    categoryControl.dataset.ready = "true";
  }
  if (yearControl && !yearControl.dataset.ready) {
    yearControl.innerHTML = `<option value="all">All years</option>${years.map((year) => `<option value="${escapeHtml(year)}">${escapeHtml(year)}</option>`).join("")}`;
    yearControl.dataset.ready = "true";
  }

  const selectedCategory = categoryControl?.value || "all";
  const selectedYear = yearControl?.value || "all";
  const selectedSort = sortControl?.value || "date";
  let filtered = visible.filter((project) =>
    (selectedCategory === "all" || project.category === selectedCategory) &&
    (selectedYear === "all" || project.date === selectedYear)
  );
  filtered = [...filtered].sort((a, b) => {
    if (selectedSort === "likes") return (b.likes || 0) - (a.likes || 0);
    if (selectedSort === "title") return a.title.localeCompare(b.title);
    return String(b.date).localeCompare(String(a.date));
  });

  const technologyCounts = new Map();
  filtered.forEach((project) => {
    String(project.tech).split(",").map((item) => item.trim()).filter(Boolean).forEach((technology) => {
      technologyCounts.set(technology, (technologyCounts.get(technology) || 0) + 1);
    });
  });
  const technologies = [...technologyCounts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const categoryCounts = categories.map((category) => ({
    category,
    count: filtered.filter((project) => project.category === category).length
  })).filter((item) => item.count);
  const maxCategory = Math.max(1, ...categoryCounts.map((item) => item.count));
  const maxTechnology = Math.max(1, ...technologies.map((item) => item[1]));
  const totalLikes = filtered.reduce((sum, project) => sum + (project.likes || 0), 0);
  const projectViews = Number(state.tracking.portfolioViews || 0);
  const engagementTotal = totalLikes + Number(state.tracking.blogViews || 0) + Number(state.tracking.resumeDownloads || 0) + Number(state.tracking.contactForms || 0);
  const likeShare = engagementTotal ? Math.round((totalLikes / engagementTotal) * 100) : 0;
  const blogShare = engagementTotal ? Math.round((Number(state.tracking.blogViews || 0) / engagementTotal) * 100) : 0;

  root.innerHTML = `
    <section class="dashboard-kpi-grid">
      <article><span>Projects shown</span><strong>${filtered.length}</strong><small>of ${visible.length} visible projects</small></article>
      <article><span>Technology references</span><strong>${technologies.length}</strong><small>unique tools and methods</small></article>
      <article><span>Project likes</span><strong>${totalLikes}</strong><small>for the current selection</small></article>
      <article><span>Portfolio views</span><strong>${projectViews}</strong><small>recorded in this browser</small></article>
    </section>
    <section class="portfolio-dashboard-grid">
      <article class="dashboard-panel dashboard-span-2">
        <div class="dashboard-panel-head"><div><p class="eyebrow">Project Mix</p><h2>Projects by category</h2></div><span>${filtered.length} selected</span></div>
        <div class="dashboard-horizontal-bars">
          ${categoryCounts.length ? categoryCounts.map((item) => `
            <button type="button" data-dashboard-category="${escapeHtml(item.category)}" aria-label="Filter to ${escapeHtml(item.category)}">
              <span>${escapeHtml(item.category)}</span>
              <i><b style="width:${(item.count / maxCategory) * 100}%"></b></i>
              <strong>${item.count}</strong>
            </button>
          `).join("") : `<p class="dashboard-empty">No projects match the selected filters.</p>`}
        </div>
      </article>
      <article class="dashboard-panel">
        <div class="dashboard-panel-head"><div><p class="eyebrow">Engagement</p><h2>Interaction mix</h2></div></div>
        <div class="engagement-donut" style="--likes:${likeShare * 3.6}deg;--blogs:${(likeShare + blogShare) * 3.6}deg">
          <div><strong>${engagementTotal}</strong><span>recorded actions</span></div>
        </div>
        <div class="dashboard-legend">
          <span><i class="legend-likes"></i>Likes ${totalLikes}</span>
          <span><i class="legend-blogs"></i>Blog views ${state.tracking.blogViews || 0}</span>
          <span><i class="legend-other"></i>Other ${Math.max(0, engagementTotal - totalLikes - (state.tracking.blogViews || 0))}</span>
        </div>
      </article>
      <article class="dashboard-panel">
        <div class="dashboard-panel-head"><div><p class="eyebrow">Capabilities</p><h2>Most-used tools</h2></div></div>
        <div class="technology-rank">
          ${technologies.slice(0, 8).map(([technology, count], index) => `
            <div><em>${String(index + 1).padStart(2, "0")}</em><span>${escapeHtml(technology)}</span><i><b style="width:${(count / maxTechnology) * 100}%"></b></i><strong>${count}</strong></div>
          `).join("") || `<p class="dashboard-empty">No technologies available.</p>`}
        </div>
      </article>
      <article class="dashboard-panel dashboard-span-2">
        <div class="dashboard-panel-head"><div><p class="eyebrow">Project Timeline</p><h2>Work across time</h2></div></div>
        <div class="dashboard-timeline">
          ${filtered.map((project) => `<a href="project.html?id=${encodeURIComponent(project.id)}"><span>${escapeHtml(project.date)}</span><strong>${escapeHtml(project.title)}</strong><small>${escapeHtml(project.category)}</small></a>`).join("") || `<p class="dashboard-empty">No projects match the selected filters.</p>`}
        </div>
      </article>
    </section>
    <section class="dashboard-project-table">
      <div class="dashboard-panel-head"><div><p class="eyebrow">Detailed View</p><h2>Project evidence table</h2></div><span>${filtered.length} records</span></div>
      <div class="dashboard-table-scroll">
        <table>
          <thead><tr><th>Project</th><th>Category</th><th>Year</th><th>Tools</th><th>Likes</th><th>Report</th></tr></thead>
          <tbody>${filtered.map((project) => `<tr><td><strong>${escapeHtml(project.title)}</strong><small>${escapeHtml(project.summary)}</small></td><td>${escapeHtml(project.category)}</td><td>${escapeHtml(project.date)}</td><td>${escapeHtml(project.tech)}</td><td>${project.likes || 0}</td><td><a href="project.html?id=${encodeURIComponent(project.id)}">View</a></td></tr>`).join("")}</tbody>
        </table>
      </div>
    </section>
  `;

  if (!root.dataset.eventsReady) {
    [categoryControl, yearControl, sortControl].filter(Boolean).forEach((control) => control.addEventListener("change", renderPortfolioDashboard));
    root.addEventListener("click", (event) => {
      const categoryButton = event.target.closest("[data-dashboard-category]");
      if (!categoryButton || !categoryControl) return;
      categoryControl.value = categoryButton.dataset.dashboardCategory;
      renderPortfolioDashboard();
    });
    root.dataset.eventsReady = "true";
  }
}

function renderBlogs() {
  const container = document.getElementById("blogGrid");
  if (!container) return;
  container.innerHTML = state.blogs.filter((blog) => blog.visible !== false).map((blog) => `
    <article class="blog-card reveal">
      <span class="tag">${escapeHtml(blog.date)}</span>
      <h3>${escapeHtml(blog.title)}</h3>
      <p>${escapeHtml(blog.preview)}</p>
      <p><strong>Tags:</strong> ${escapeHtml(blog.tags)}</p>
      <a class="small-button" href="article.html?id=${encodeURIComponent(blog.id)}">Read Full Article</a>
    </article>
  `).join("");
}

function renderBlogArticle() {
  const container = document.getElementById("articleContent");
  if (!container) return;
  const id = new URLSearchParams(window.location.search).get("id");
  const blog = state.blogs.find((item) => item.id === id && item.visible !== false);
  if (!blog) {
    container.innerHTML = `
      <div class="article-hero">
        <p class="eyebrow">Article unavailable</p>
        <h1>This article could not be found.</h1>
        <a class="button secondary" href="blog.html">Return to Blog</a>
      </div>
    `;
    return;
  }
  blog.views = (blog.views || 0) + 1;
  state.tracking.blogViews += 1;
  saveState();
  const article = blog.article || {
    abstract: blog.preview,
    readingTime: "4 minute read",
    sections: [{ heading: "Article", paragraphs: [blog.body] }],
    references: []
  };
  document.title = `${blog.title} | Billal Javed`;
  container.innerHTML = `
    <header class="article-hero reveal">
      <a class="article-back" href="blog.html">Back to Blog</a>
      <div class="card-meta"><span class="tag">${escapeHtml(blog.date)}</span><span class="tag">${escapeHtml(article.readingTime || "Article")}</span></div>
      <h1>${escapeHtml(blog.title)}</h1>
      <p class="article-abstract">${escapeHtml(article.abstract || blog.preview)}</p>
      <p class="article-byline">By Billal Javed · M.S. Business Analytics and Information Management</p>
    </header>
    <div class="article-layout">
      <aside class="article-outline">
        <strong>In this article</strong>
        ${article.sections.map((section, index) => `<a href="#article-section-${index + 1}">${escapeHtml(section.heading)}</a>`).join("")}
        ${article.references?.length ? `<a href="#article-references">References</a>` : ""}
      </aside>
      <div class="article-body">
        ${article.sections.map((section, index) => `
          <section id="article-section-${index + 1}">
            <span class="article-number">${String(index + 1).padStart(2, "0")}</span>
            <h2>${escapeHtml(section.heading)}</h2>
            ${(section.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
          </section>
        `).join("")}
        ${article.references?.length ? `
          <section id="article-references" class="article-references">
            <span class="article-number">R</span>
            <h2>Research and references</h2>
            <p>These sources informed the context and claims discussed in this article.</p>
            ${article.references.map((reference) => `<a href="${escapeHtml(reference.url)}" target="_blank" rel="noreferrer">${escapeHtml(reference.label)}</a>`).join("")}
          </section>
        ` : ""}
      </div>
    </div>
  `;
}

function openProjectModal(id) {
  const project = state.projects.find((item) => item.id === id);
  if (!project) return;
  if (document.body.dataset.projectViewed !== project.id) {
    document.body.dataset.projectViewed = project.id;
    state.tracking.portfolioViews += 1;
    saveState();
  }
  openModal(`
    <div class="modal-inner">
      <img src="${project.image || placeholderImage(project.title)}" alt="${escapeHtml(project.title)}">
      <span class="tag">${escapeHtml(project.category)}</span>
      <h2>${escapeHtml(project.title)}</h2>
      <p><strong>Full description:</strong> ${escapeHtml(project.summary)}</p>
      <p><strong>Problem solved:</strong> ${escapeHtml(project.reason)}</p>
      <p><strong>My role and process:</strong> ${escapeHtml(project.process)}</p>
      <p><strong>Tools used:</strong> ${escapeHtml(project.tech)}</p>
      <p><strong>Challenges and results:</strong> ${escapeHtml(project.details)}</p>
      ${project.dashboard ? renderDashboardPreview() : ""}
      ${renderProjectFiles(project)}
      ${project.link ? `<a class="button secondary" href="${escapeHtml(project.link)}" target="_blank" rel="noreferrer">Open Link</a>` : ""}
    </div>
  `);
}

function renderProjectReport() {
  const container = document.getElementById("projectReport");
  if (!container) return;
  const id = new URLSearchParams(window.location.search).get("id");
  const project = state.projects.find((item) => item.id === id && item.visible !== false);
  if (!project) {
    container.innerHTML = `<section class="project-report-hero"><p class="eyebrow">Project unavailable</p><h1>This project could not be found.</h1><a class="button secondary" href="portfolio.html">Return to Portfolio</a></section>`;
    return;
  }
  if (document.body.dataset.projectViewed !== project.id) {
    document.body.dataset.projectViewed = project.id;
    state.tracking.portfolioViews += 1;
    saveState();
  }
  document.title = `${project.title} | Billal Javed`;
  container.innerHTML = `
    <section class="project-report-hero">
      <a class="article-back" href="portfolio.html">Back to Portfolio</a>
      <div class="card-meta"><span class="tag">${escapeHtml(project.category)}</span><span class="tag">${escapeHtml(project.date)}</span></div>
      <h1>${escapeHtml(project.title)}</h1>
      <p>${escapeHtml(project.summary)}</p>
      <div class="report-actions">
        <button class="button secondary like-button" data-like-project="${project.id}" type="button">♥ ${project.likes || 0}</button>
        ${project.link ? `<a class="button primary" href="${escapeHtml(project.link)}" target="_blank" rel="noreferrer">Open Project Link</a>` : ""}
      </div>
    </section>
    <section class="report-overview">
      <div class="report-image"><img src="${project.image || placeholderImage(project.title)}" alt="${escapeHtml(project.title)}"></div>
      <div class="report-facts">
        <article><span>Business question</span><p>${escapeHtml(project.reason)}</p></article>
        <article><span>Tools and methods</span><p>${escapeHtml(project.tech)}</p></article>
        <article><span>My approach</span><p>${escapeHtml(project.process)}</p></article>
      </div>
    </section>
    ${renderProjectVisualStory(project)}
    <section class="report-narrative">
      <article><span class="article-number">01</span><h2>Project context and scope</h2><p>${escapeHtml(project.details)}</p></article>
      <article><span class="article-number">02</span><h2>Key findings</h2><p>${escapeHtml(project.findings || buildProjectFindings(project))}</p></article>
      <article><span class="article-number">03</span><h2>Business implications and next steps</h2><p>${escapeHtml(project.recommendations || buildProjectRecommendations(project))}</p></article>
    </section>
    ${project.dashboard ? renderDashboardPreview() : ""}
    <section class="report-files">
      <div class="section-heading"><p class="eyebrow">Evidence &amp; Files</p><h2>Supporting material and project artifacts.</h2><p>Files, screenshots, dashboards, and source material are collected here so the analytical report remains readable without repeating its narrative.</p></div>
      ${renderProjectFiles(project) || `<div class="empty-report-state"><strong>No public files attached yet.</strong><p>The project explanation and visual report are available above. Supporting files can be added through Admin.</p></div>`}
    </section>
  `;
}

function renderProjectVisualStory(project) {
  const seed = project.title.split("").reduce((sum, letter) => sum + letter.charCodeAt(0), 0);
  const values = Array.from({ length: 7 }, (_, index) => 34 + ((seed * (index + 3)) % 58));
  const points = values.map((value, index) => `${index * 52 + 4},${100 - value}`).join(" ");
  return `
    <section class="report-visual-story">
      <div class="section-heading"><p class="eyebrow">Analytical View</p><h2>A visual reading of the project workflow.</h2><p>This visual summarizes relative analytical activity across the project stages. It is a portfolio visualization, while exact results and source files remain identified in the report.</p></div>
      <div class="report-kpis">
        <article><span>Scope</span><strong>${escapeHtml(project.category)}</strong></article>
        <article><span>Methods</span><strong>${escapeHtml(project.tech.split(",").slice(0, 2).join(" + "))}</strong></article>
        <article><span>Artifacts</span><strong>${project.files?.length || 0}</strong></article>
      </div>
      <div class="report-chart">
        <div class="report-bars">${values.map((value, index) => `<i style="--report-height:${value}%"><span>S${index + 1}</span></i>`).join("")}</div>
        <svg viewBox="0 0 320 110" preserveAspectRatio="none" aria-label="Project analysis trend"><polyline points="${points}"></polyline></svg>
      </div>
    </section>
  `;
}

function buildProjectFindings(project) {
  return `The work demonstrates how ${project.tech} can be organized around a defined business question. The strongest outcome is a clearer connection between the available evidence, the analytical method, and the decision the project is intended to support.`;
}

function buildProjectRecommendations(project) {
  return `A practical next step would be to validate the analysis with updated or expanded data, test the assumptions with stakeholders, and refine the output into a repeatable decision-support workflow.`;
}

function renderProjectFiles(project) {
  if (!project.files?.length) return "";
  return `
    <div class="file-preview-list">
      <h3>Project Files and Previews</h3>
      ${project.files.map((file) => `
        <article class="file-preview-card">
          <strong>${escapeHtml(file.name)}</strong>
          <p>${escapeHtml(file.note || "Project file attached by admin.")}</p>
          ${file.type?.startsWith("image/") ? `<img src="${file.data}" alt="${escapeHtml(file.name)}">` : ""}
          ${file.type === "application/pdf" ? `<iframe src="${file.data}" title="${escapeHtml(file.name)}"></iframe>` : ""}
          ${file.type === "text/html"
            ? `<a class="button primary" href="${file.data}" target="_blank" rel="noreferrer">Open Interactive Dashboard</a>`
            : `<a class="button secondary" href="${file.data}" download="${escapeHtml(file.name)}">Download / View File</a>`}
        </article>
      `).join("")}
    </div>
  `;
}

function renderDashboardPreview() {
  const rows = [
    { hour: "6 AM", passengers: 180, wait: 8 },
    { hour: "8 AM", passengers: 420, wait: 21 },
    { hour: "10 AM", passengers: 360, wait: 17 },
    { hour: "12 PM", passengers: 290, wait: 13 },
    { hour: "2 PM", passengers: 510, wait: 26 },
    { hour: "4 PM", passengers: 470, wait: 23 }
  ];
  const maxPassengers = Math.max(...rows.map((row) => row.passengers));
  const maxWait = Math.max(...rows.map((row) => row.wait));
  const avgWait = Math.round(rows.reduce((sum, row) => sum + row.wait, 0) / rows.length);
  const totalPassengers = rows.reduce((sum, row) => sum + row.passengers, 0);
  return `
    <div class="dashboard-preview">
      <h3>Airport Security Simulation Dashboard</h3>
      <div class="dashboard-kpis">
        <div><span>Passengers</span><strong>${totalPassengers.toLocaleString()}</strong></div>
        <div><span>Avg Wait</span><strong>${avgWait} min</strong></div>
        <div><span>Peak Lanes</span><strong>7</strong></div>
        <div><span>Risk Signal</span><strong>Moderate</strong></div>
      </div>
      <div class="dashboard-visuals">
        <div class="dashboard-bars">${rows.map((row) => `<span style="--bar:${(row.passengers / maxPassengers) * 100}%"><b>${row.hour}</b></span>`).join("")}</div>
        <div class="dashboard-line">${rows.map((row, index) => `<i style="--x:${index * 19}%;--y:${100 - (row.wait / maxWait) * 82}%"></i>`).join("")}</div>
        <div class="dashboard-donut"><span>Queue<br>Pressure</span></div>
      </div>
    </div>
  `;
}

function openBlogModal(id) {
  const blog = state.blogs.find((item) => item.id === id);
  if (!blog) return;
  blog.views = (blog.views || 0) + 1;
  state.tracking.blogViews += 1;
  saveState();
  openModal(`
    <div class="modal-inner">
      <span class="tag">${escapeHtml(blog.date)}</span>
      <h2>${escapeHtml(blog.title)}</h2>
      <p><strong>Keywords:</strong> ${escapeHtml(blog.tags)}</p>
      <p>${escapeHtml(blog.body)}</p>
    </div>
  `);
}

function openModal(html) {
  const content = document.getElementById("modalContent");
  const modal = document.getElementById("contentModal");
  if (!content || !modal) return;
  content.innerHTML = html;
  modal.showModal();
}

function renderAdmin() {
  if (!document.getElementById("adminStats")) return;
  renderAdminStats();
  renderAdminLists();
  renderTextEditor();
  const siteForm = document.getElementById("siteForm");
  if (siteForm) {
    siteForm.elements.homeTitle.value = state.homeTitle;
    siteForm.elements.homeIntro.value = state.homeIntro;
    siteForm.elements.aboutText.value = state.aboutText;
    siteForm.elements.github.value = state.socialLinks.github;
    siteForm.elements.linkedin.value = state.socialLinks.linkedin;
    siteForm.elements.handshake.value = state.socialLinks.handshake;
    siteForm.elements.layoutDensity.value = state.layout.density;
    siteForm.elements.cardRadius.value = state.layout.cardRadius;
    siteForm.elements.animations.checked = state.layout.animations !== false;
  }
  const sectionForm = document.getElementById("sectionContentForm");
  if (sectionForm) {
    Object.entries(state.content).forEach(([name, value]) => {
      if (sectionForm.elements[name]) sectionForm.elements[name].value = value;
    });
    state.skillGroups.forEach((group, index) => {
      if (sectionForm.elements[`skillTitle${index}`]) sectionForm.elements[`skillTitle${index}`].value = group.title;
      if (sectionForm.elements[`skillDescription${index}`]) sectionForm.elements[`skillDescription${index}`].value = group.description;
      if (sectionForm.elements[`skills${index}`]) sectionForm.elements[`skills${index}`].value = group.skills;
    });
  }
  setText("resumeTime", state.resumeUpdatedAt ? `Resume last updated: ${state.resumeUpdatedAt}` : "Default resume added June 7, 2026.");
}

function renderTextEditor() {
  const form = document.getElementById("textEditorForm");
  if (!form) return;
  const target = form.elements.target.value || "homeTitle";
  const style = { ...defaultState.textStyles[target], ...(state.textStyles?.[target] || {}) };
  const editable = EDITABLE_TEXT_TARGETS.includes(target);
  form.elements.content.value = editable ? state[target] || "" : "This selection updates style across the selected text group. Use the specific text sections below to change wording.";
  form.elements.content.disabled = !editable;
  form.elements.align.value = style.align;
  form.elements.fontFamily.value = style.fontFamily || defaultState.textStyles[target].fontFamily;
  form.elements.fontSize.value = style.fontSize;
  form.elements.fontWeight.value = style.fontWeight;
  form.elements.fontStyle.value = style.fontStyle;
  form.elements.textDecoration.value = style.textDecoration;
  form.elements.lineHeight.value = style.lineHeight;
  form.elements.color.value = style.color;
}

function renderAdminStats() {
  const totalLikes = state.projects.reduce((sum, project) => sum + (project.likes || 0), 0);
  const sectionVisits = Object.values(state.tracking.sectionVisits || {}).reduce((sum, count) => sum + count, 0);
  const stats = [
    ["Section visits", sectionVisits],
    ["Project likes", totalLikes],
    ["Contact forms", state.tracking.contactSubmissions],
    ["Blog views", state.tracking.blogViews],
    ["Portfolio views", state.tracking.portfolioViews],
    ["Resume downloads", state.tracking.resumeDownloads],
    ["Clicks", state.tracking.clicks],
    ["Page views", state.tracking.pageViews]
  ];
  const container = document.getElementById("adminStats");
  if (!container) return;
  const max = Math.max(...stats.map(([, value]) => value || 0), 1);
  container.innerHTML = stats.map(([label, value]) => `
    <div class="admin-card"><span>${label}</span><strong>${value || 0}</strong><b class="admin-stat-bar" style="--stat:${((value || 0) / max) * 100}%"></b></div>
  `).join("");
}

function renderPublicAnalytics() {
  const container = document.getElementById("publicAnalytics");
  if (!container) return;
  const totalLikes = state.projects.reduce((sum, project) => sum + (project.likes || 0), 0);
  const stats = [
    ["Page Views", state.tracking.pageViews || 0],
    ["Clicks", state.tracking.clicks || 0],
    ["Project Views", state.tracking.portfolioViews || 0],
    ["Likes", totalLikes || 0],
    ["Resume Downloads", state.tracking.resumeDownloads || 0],
    ["Contact Messages", state.tracking.contactSubmissions || 0]
  ];
  const max = Math.max(...stats.map(([, value]) => value), 1);
  container.innerHTML = `
    <div class="analytics-kpis">
      ${stats.slice(0, 4).map(([label, value]) => `<article><span>${label}</span><strong>${value}</strong></article>`).join("")}
    </div>
    <div class="analytics-bars">
      ${stats.map(([label, value]) => `
        <div>
          <span>${label}</span>
          <b style="--bar:${Math.max(6, (value / max) * 100)}%"></b>
          <strong>${value}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function setupHeroAnalytics() {
  const visual = document.querySelector(".hero-live-visual");
  if (!visual || visual.dataset.interactive === "true") return;
  visual.dataset.interactive = "true";
  const scenarios = {
    operations: {
      values: ["84%", "12K", "3.8x"],
      labels: ["Process stability", "Records analyzed", "Decision speed"],
      bars: [38, 62, 46, 78, 58, 86],
      points: "4,72 54,48 105,58 158,30 210,42 266,18 316,26",
      chartTitle: "Throughput and service signal",
      status: "Capacity improving",
      trendLabel: "Service performance",
      caption: "Operations view: monitoring throughput, process stability, and the speed of decision support.",
      title: "Operations performance scenario",
      description: "The bars represent activity across six operating periods, while the trend line tracks improving service performance. This view helps identify capacity pressure, process variation, and where operational attention may be needed.",
      decision: "Decision focus: staffing and process capacity"
    },
    finance: {
      values: ["11.6%", "$2.4M", "7.2%"],
      labels: ["Forecast variance", "Modeled value", "Risk exposure"],
      bars: [56, 44, 68, 52, 74, 63],
      points: "4,64 54,58 105,42 158,50 210,28 266,36 316,20",
      chartTitle: "Forecast and risk signal",
      status: "Variance controlled",
      trendLabel: "Planning confidence",
      caption: "Finance view: comparing forecast variance, modeled value, and changes in risk exposure.",
      title: "Financial planning scenario",
      description: "This scenario compares modeled value with forecast variance and risk exposure. The changing bars represent period-level performance, while the line highlights the direction of the financial signal used for planning and review.",
      decision: "Decision focus: forecast adjustment and risk control"
    },
    customer: {
      values: ["91%", "4.6K", "+18%"],
      labels: ["Retention signal", "Interactions", "Engagement lift"],
      bars: [42, 54, 66, 60, 79, 91],
      points: "4,78 54,68 105,62 158,48 210,40 266,24 316,14",
      chartTitle: "Engagement and retention signal",
      status: "Response strengthening",
      trendLabel: "Engagement momentum",
      caption: "Customer view: translating interaction patterns into retention and engagement signals.",
      title: "Customer behavior scenario",
      description: "The visual connects interaction volume, retention signals, and engagement lift. It demonstrates how behavioral data can help identify changes in customer response and guide more focused service or communication strategies.",
      decision: "Decision focus: retention and engagement strategy"
    }
  };
  visual.querySelectorAll("[data-analytics-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      const scenario = scenarios[button.dataset.analyticsMode];
      if (!scenario) return;
      visual.querySelectorAll("[data-analytics-mode]").forEach((item) => item.classList.toggle("active", item === button));
      ["liveKpiOne", "liveKpiTwo", "liveKpiThree"].forEach((id, index) => setText(id, scenario.values[index]));
      ["liveKpiOneLabel", "liveKpiTwoLabel", "liveKpiThreeLabel"].forEach((id, index) => setText(id, scenario.labels[index]));
      visual.querySelectorAll(".visual-chart i").forEach((bar, index) => bar.style.setProperty("--h", `${scenario.bars[index]}%`));
      const line = document.getElementById("liveTrendLine");
      if (line) line.setAttribute("points", scenario.points);
      setText("liveChartTitle", scenario.chartTitle);
      setText("liveChartStatus", scenario.status);
      setText("liveTrendLabel", scenario.trendLabel);
      setText("liveVisualCaption", scenario.caption);
      setText("liveVisualTitle", scenario.title);
      setText("liveVisualDescription", scenario.description);
      setText("liveVisualDecision", scenario.decision);
    });
  });
}

function renderAdminLists() {
  const projectList = document.getElementById("adminProjectList");
  const certificationList = document.getElementById("adminCertificationList");
  const customSectionList = document.getElementById("adminCustomSectionList");
  const blogList = document.getElementById("adminBlogList");
  const messages = document.getElementById("adminMessages");
  if (projectList) projectList.innerHTML = state.projects.map((project) => `
    <div class="message-card">
      <strong>${escapeHtml(project.title)}</strong>
      <p>${project.visible === false ? "Hidden" : "Visible"} / ${project.likes || 0} likes</p>
      <div class="card-actions">
        <button class="small-button" data-admin-edit-project="${project.id}" type="button">Edit</button>
        <button class="small-button" data-admin-toggle-project="${project.id}" type="button">${project.visible === false ? "Show" : "Hide"}</button>
        <button class="small-button" data-admin-delete-project="${project.id}" type="button">Delete</button>
      </div>
    </div>
  `).join("");

  if (certificationList) certificationList.innerHTML = state.certifications.map((certification) => `
    <div class="message-card">
      <strong>${escapeHtml(certification.title)}</strong>
      <p>${certification.visible === false ? "Hidden" : "Visible"} / ${escapeHtml(certification.issuer || "")} / ${escapeHtml(certification.date || "")}</p>
      <div class="card-actions">
        <button class="small-button" data-admin-edit-certification="${certification.id}" type="button">Edit</button>
        <button class="small-button" data-admin-toggle-certification="${certification.id}" type="button">${certification.visible === false ? "Show" : "Hide"}</button>
        <button class="small-button" data-admin-delete-certification="${certification.id}" type="button">Delete</button>
      </div>
    </div>
  `).join("");

  if (customSectionList) customSectionList.innerHTML = (state.customSections || []).map((section) => `
    <div class="message-card">
      <strong>${escapeHtml(section.title)}</strong>
      <p>${section.visible === false ? "Hidden" : "Visible"} / ${escapeHtml(section.eyebrow || "Custom section")}</p>
      <div class="card-actions">
        <button class="small-button" data-admin-edit-section="${section.id}" type="button">Edit</button>
        <button class="small-button" data-admin-toggle-section="${section.id}" type="button">${section.visible === false ? "Show" : "Hide"}</button>
        <button class="small-button" data-admin-delete-section="${section.id}" type="button">Delete</button>
      </div>
    </div>
  `).join("") || `<p>No custom sections yet. Use the plus-style form above to add one.</p>`;

  if (blogList) blogList.innerHTML = state.blogs.map((blog) => `
    <div class="message-card">
      <strong>${escapeHtml(blog.title)}</strong>
      <p>${blog.visible === false ? "Hidden" : "Visible"} / ${blog.views || 0} views</p>
      <div class="card-actions">
        <button class="small-button" data-admin-edit-blog="${blog.id}" type="button">Edit</button>
        <button class="small-button" data-admin-toggle-blog="${blog.id}" type="button">${blog.visible === false ? "Show" : "Hide"}</button>
        <button class="small-button" data-admin-delete-blog="${blog.id}" type="button">Delete</button>
      </div>
    </div>
  `).join("");

  if (messages) messages.innerHTML = state.messages.length
    ? state.messages.map((message) => `
      <div class="message-card">
        <strong>${escapeHtml(message.subject)}</strong>
        <p>${escapeHtml(message.name)} / ${escapeHtml(message.email)} / ${escapeHtml(message.reason)}</p>
        <p>${escapeHtml(message.message)}</p>
        ${message.occupation || message.company ? `<p>${escapeHtml(message.occupation || "")} ${message.company ? "/ " + escapeHtml(message.company) : ""}</p>` : ""}
        ${message.linkedin ? `<p><strong>Profile:</strong> ${escapeHtml(message.linkedin)}</p>` : ""}
        <small>${escapeHtml(message.time)}</small>
      </div>
    `).join("")
    : `<p>No contact messages yet.</p>`;
}

function attachEvents() {
  const menuToggle = document.getElementById("menuToggle");
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      document.getElementById("topNav").classList.toggle("open");
    });
  }

  const modalClose = document.getElementById("modalClose");
  if (modalClose) modalClose.addEventListener("click", () => document.getElementById("contentModal").close());

  document.addEventListener("click", (event) => {
    state.tracking.clicks += 1;
    saveState();
    renderPublicAnalytics();
    renderAdminStats();

    const projectMore = event.target.closest("[data-project-more]");
    if (projectMore) openProjectModal(projectMore.dataset.projectMore);

    const blogMore = event.target.closest("[data-blog-more]");
    if (blogMore) openBlogModal(blogMore.dataset.blogMore);

    const likeButton = event.target.closest("[data-like-project]");
    if (likeButton) likeProject(likeButton.dataset.likeProject);

    const resume = event.target.closest(".resume-download");
    if (resume) handleResumeDownload(event);

    handleAdminClick(event);
  });

  const contactForm = document.getElementById("contactForm");
  if (contactForm) contactForm.addEventListener("submit", handleContactSubmit);
  const adminLoginButton = document.getElementById("adminLoginButton");
  if (adminLoginButton) adminLoginButton.addEventListener("click", unlockAdmin);
  ["adminEmail", "adminPassword"].forEach((id) => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") unlockAdmin();
      });
    }
  });
  const forgotPasswordButton = document.getElementById("forgotPasswordButton");
  if (forgotPasswordButton) forgotPasswordButton.addEventListener("click", togglePasswordReset);
  const resetPasswordButton = document.getElementById("resetPasswordButton");
  if (resetPasswordButton) resetPasswordButton.addEventListener("click", resetAdminPassword);
  const siteForm = document.getElementById("siteForm");
  if (siteForm) siteForm.addEventListener("submit", handleSiteSubmit);
  const sectionContentForm = document.getElementById("sectionContentForm");
  if (sectionContentForm) sectionContentForm.addEventListener("submit", handleSectionContentSubmit);
  const textEditorForm = document.getElementById("textEditorForm");
  if (textEditorForm) {
    textEditorForm.addEventListener("submit", handleTextEditorSubmit);
    textEditorForm.elements.target.addEventListener("change", renderTextEditor);
  }
  const resetTextStyle = document.getElementById("resetTextStyle");
  if (resetTextStyle) resetTextStyle.addEventListener("click", resetSelectedTextStyle);
  const profileUpload = document.getElementById("profileUpload");
  if (profileUpload) profileUpload.addEventListener("change", handleProfileUpload);
  ["cropZoom", "cropX", "cropY"].forEach((id) => {
    const input = document.getElementById(id);
    if (input) input.addEventListener("input", drawCropCanvas);
  });
  const applyCrop = document.getElementById("applyProfileCrop");
  if (applyCrop) applyCrop.addEventListener("click", applyProfileCrop);
  const projectForm = document.getElementById("projectForm");
  if (projectForm) projectForm.addEventListener("submit", handleProjectSubmit);
  const certificationForm = document.getElementById("certificationForm");
  if (certificationForm) certificationForm.addEventListener("submit", handleCertificationSubmit);
  const customSectionForm = document.getElementById("customSectionForm");
  if (customSectionForm) customSectionForm.addEventListener("submit", handleCustomSectionSubmit);
  const blogForm = document.getElementById("blogForm");
  if (blogForm) blogForm.addEventListener("submit", handleBlogSubmit);
  const clearProject = document.getElementById("clearProjectForm");
  if (clearProject) clearProject.addEventListener("click", clearProjectForm);
  const clearCertification = document.getElementById("clearCertificationForm");
  if (clearCertification) clearCertification.addEventListener("click", clearCertificationForm);
  const clearCustomSection = document.getElementById("clearCustomSectionForm");
  if (clearCustomSection) clearCustomSection.addEventListener("click", clearCustomSectionForm);
  const clearBlog = document.getElementById("clearBlogForm");
  if (clearBlog) clearBlog.addEventListener("click", clearBlogForm);

  document.querySelectorAll("[data-admin-tab]").forEach((button) => {
    button.addEventListener("click", () => switchAdminTab(button.dataset.adminTab));
  });

  document.querySelectorAll("[data-track]").forEach((element) => {
    element.addEventListener("click", () => trackAction(element.dataset.track));
  });

  const page = document.body.dataset.page;
  document.querySelectorAll("[data-page-link]").forEach((link) => {
    link.classList.toggle("active", link.dataset.pageLink === page);
  });
}

function likeProject(id) {
  const project = state.projects.find((item) => item.id === id);
  if (!project) return;
  project.likes = (project.likes || 0) + 1;
  state.tracking.projectLikes += 1;
  saveState();
  renderPortfolio();
  renderFeaturedProjects();
  renderProjectReport();
  renderAdmin();
  attachRevealObserver();
}

function handleResumeDownload(event) {
  state.tracking.resumeDownloads += 1;
  saveState();
  renderAdminStats();
}

function handleContactSubmit(event) {
  const form = event.currentTarget;
  const data = new FormData(form);
  state.messages.unshift({
    name: data.get("name"),
    email: data.get("email"),
    occupation: data.get("occupation"),
    company: data.get("company"),
    linkedin: data.get("linkedin"),
    subject: data.get("subject"),
    reason: data.get("reason"),
    message: data.get("message"),
    time: new Date().toLocaleString()
  });
  state.tracking.contactSubmissions += 1;
  saveState();
  document.getElementById("contactNote").hidden = false;
  renderAdmin();
  sendContactToSheet(state.messages[0]);
}

async function sendContactToSheet(message) {
  if (!GOOGLE_SHEETS_WEBHOOK_URL) return;
  await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message)
  });
}

function unlockAdmin() {
  const email = document.getElementById("adminEmail").value.trim().toLowerCase();
  const password = document.getElementById("adminPassword").value;
  const allowed = email === ADMIN_EMAIL && password === getAdminPassword();
  document.getElementById("adminLoginError").hidden = allowed;
  if (!allowed) return;
  adminUnlocked = true;
  document.getElementById("adminLogin").hidden = true;
  document.getElementById("adminPanel").hidden = false;
  renderAdmin();
  switchAdminTab("preview");
}

function switchAdminTab(target = "preview") {
  document.querySelectorAll("[data-admin-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.adminTab === target);
  });
  document.querySelectorAll("[data-admin-page]").forEach((page) => {
    page.hidden = page.dataset.adminPage !== target;
    page.open = page.dataset.adminPage === target;
  });
}

function togglePasswordReset() {
  const panel = document.getElementById("passwordResetPanel");
  if (panel) panel.hidden = !panel.hidden;
}

function resetAdminPassword() {
  const email = document.getElementById("resetEmail").value.trim().toLowerCase();
  const password = document.getElementById("newAdminPassword").value;
  const error = document.getElementById("adminLoginError");
  if (email !== ADMIN_EMAIL || password.length < 8) {
    if (error) {
      error.textContent = "Use the admin email and a new password with at least 8 characters.";
      error.hidden = false;
    }
    return;
  }
  localStorage.setItem(ADMIN_PASSWORD_KEY, password);
  document.getElementById("passwordResetPanel").hidden = true;
  document.getElementById("passwordResetNote").hidden = false;
  if (error) error.hidden = true;
}

async function handleSiteSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const resume = await fileToData(data.get("resumeFile"));
  state.homeTitle = data.get("homeTitle") || state.homeTitle;
  state.homeIntro = data.get("homeIntro") || state.homeIntro;
  state.aboutText = data.get("aboutText") || state.aboutText;
  state.socialLinks.github = data.get("github") || state.socialLinks.github;
  state.socialLinks.linkedin = data.get("linkedin") || state.socialLinks.linkedin;
  state.socialLinks.handshake = data.get("handshake") || state.socialLinks.handshake;
  state.layout.density = data.get("layoutDensity") || state.layout.density;
  state.layout.cardRadius = Number(data.get("cardRadius")) || state.layout.cardRadius;
  state.layout.animations = data.get("animations") === "on";
  if (croppedProfileData) {
    state.profileImage = croppedProfileData;
    croppedProfileData = "";
  }
  if (resume) {
    state.resume = resume;
    state.resumeUpdatedAt = resume.updatedAt;
  }
  saveState();
  renderContent();
  refreshAdminPreview();
}

function handleSectionContentSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  Object.keys(defaultState.content).forEach((key) => {
    state.content[key] = data.get(key) || state.content[key];
  });
  state.skillGroups = state.skillGroups.map((group, index) => ({
    ...group,
    title: data.get(`skillTitle${index}`) || group.title,
    description: data.get(`skillDescription${index}`) || group.description,
    skills: data.get(`skills${index}`) || group.skills
  }));
  saveState();
  renderContent();
  refreshAdminPreview();
}

function handleTextEditorSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const target = data.get("target");
  if (!Object.prototype.hasOwnProperty.call(defaultState.textStyles, target)) return;
  if (EDITABLE_TEXT_TARGETS.includes(target)) state[target] = data.get("content") || state[target];
  state.textStyles[target] = {
    align: data.get("align") || "left",
    fontSize: Number(data.get("fontSize")) || defaultState.textStyles[target].fontSize,
    fontFamily: data.get("fontFamily") || "",
    fontWeight: data.get("fontWeight") || defaultState.textStyles[target].fontWeight,
    fontStyle: data.get("fontStyle") || "normal",
    textDecoration: data.get("textDecoration") || "none",
    lineHeight: Number(data.get("lineHeight")) || defaultState.textStyles[target].lineHeight,
    color: data.get("color") || defaultState.textStyles[target].color
  };
  saveState();
  renderContent();
  refreshAdminPreview();
}

function resetSelectedTextStyle() {
  const form = document.getElementById("textEditorForm");
  if (!form) return;
  const target = form.elements.target.value;
  if (!Object.prototype.hasOwnProperty.call(defaultState.textStyles, target)) return;
  state.textStyles[target] = { ...defaultState.textStyles[target] };
  saveState();
  renderContent();
  refreshAdminPreview();
}

function refreshAdminPreview() {
  const previewFrame = document.querySelector(".site-preview-frame");
  if (previewFrame) previewFrame.src = `index.html?adminPreview=1&updated=${Date.now()}`;
}

function handleProfileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => loadCropImage(reader.result);
  reader.readAsDataURL(file);
}

function loadCropImage(src) {
  if (!document.getElementById("profileCropCanvas")) return;
  cropImage = new Image();
  cropImage.onload = () => {
    document.getElementById("cropZoom").value = "1.35";
    document.getElementById("cropX").value = "0";
    document.getElementById("cropY").value = "-30";
    drawCropCanvas();
  };
  cropImage.src = src;
}

function drawCropCanvas() {
  const canvas = document.getElementById("profileCropCanvas");
  if (!canvas || !cropImage) return;

  const ctx = canvas.getContext("2d");
  const zoom = Number(document.getElementById("cropZoom").value);
  const offsetX = Number(document.getElementById("cropX").value);
  const offsetY = Number(document.getElementById("cropY").value);
  const size = canvas.width;
  const baseScale = Math.max(size / cropImage.width, size / cropImage.height);
  const scale = baseScale * zoom;
  const drawWidth = cropImage.width * scale;
  const drawHeight = cropImage.height * scale;
  const x = (size - drawWidth) / 2 + offsetX;
  const y = (size - drawHeight) / 2 + offsetY;

  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = "#eef3f8";
  ctx.fillRect(0, 0, size, size);
  ctx.drawImage(cropImage, x, y, drawWidth, drawHeight);
}

function applyProfileCrop() {
  const canvas = document.getElementById("profileCropCanvas");
  if (!canvas || !cropImage) {
    alert("Upload a picture before applying a crop.");
    return;
  }
  croppedProfileData = canvas.toDataURL("image/jpeg", 0.92);
  state.profileImage = croppedProfileData;
  saveState();
  renderProfileImage();
  document.getElementById("cropNote").textContent = "Crop applied. Click Save Page Text to keep it with other page updates.";
}

async function handleProjectSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const id = data.get("projectId") || crypto.randomUUID();
  const existing = state.projects.find((project) => project.id === id);
  const image = await fileToData(data.get("image"));
  const projectFile = await fileToData(data.get("projectFile"));
  const files = existing?.files ? [...existing.files] : [];
  if (projectFile) files.push({ ...projectFile, note: data.get("fileNote") });
  const next = {
    id,
    title: data.get("title"),
    category: data.get("category"),
    date: data.get("date"),
    tech: data.get("tech"),
    summary: data.get("summary"),
    reason: data.get("reason"),
    process: data.get("process"),
    details: data.get("details"),
    findings: data.get("findings"),
    recommendations: data.get("recommendations"),
    link: data.get("link"),
    visible: existing ? existing.visible : true,
    likes: existing ? existing.likes || 0 : 0,
    image: image ? image.data : existing?.image || "",
    dashboard: data.get("dashboard") === "on",
    files
  };
  if (existing) Object.assign(existing, next);
  else state.projects.unshift(next);
  saveState();
  clearProjectForm();
  renderContent();
  attachRevealObserver();
}

function handleBlogSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const id = data.get("blogId") || crypto.randomUUID();
  const existing = state.blogs.find((blog) => blog.id === id);
  const next = {
    id,
    title: data.get("title"),
    date: data.get("date"),
    tags: data.get("tags"),
    preview: data.get("preview"),
    body: data.get("body"),
    visible: existing ? existing.visible : true,
    views: existing ? existing.views || 0 : 0
  };
  if (existing) Object.assign(existing, next);
  else state.blogs.unshift(next);
  saveState();
  clearBlogForm();
  renderContent();
  attachRevealObserver();
}

async function handleCertificationSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const id = data.get("certificationId") || crypto.randomUUID();
  const existing = state.certifications.find((certification) => certification.id === id);
  const uploadedFile = await fileToData(data.get("certificateFile"));
  const next = {
    id,
    title: data.get("title"),
    issuer: data.get("issuer"),
    date: data.get("date"),
    summary: data.get("summary"),
    skills: data.get("skills"),
    file: uploadedFile ? uploadedFile.data : existing?.file || "",
    fileName: uploadedFile ? uploadedFile.name : existing?.fileName || "",
    visible: existing ? existing.visible !== false : true
  };
  if (existing) Object.assign(existing, next);
  else state.certifications.unshift(next);
  saveState();
  clearCertificationForm();
  renderContent();
  attachRevealObserver();
}

async function handleCustomSectionSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const id = data.get("sectionId") || crypto.randomUUID();
  const existing = (state.customSections || []).find((section) => section.id === id);
  const uploadedFile = await fileToData(data.get("sectionFile"));
  const next = {
    id,
    eyebrow: data.get("eyebrow"),
    title: data.get("title"),
    body: data.get("body"),
    tags: data.get("tags"),
    visible: data.get("visible") === "on",
    file: uploadedFile ? { ...uploadedFile, note: data.get("fileNote") } : existing?.file || null
  };
  state.customSections = state.customSections || [];
  if (existing) Object.assign(existing, next);
  else state.customSections.unshift(next);
  saveState();
  clearCustomSectionForm();
  renderContent();
  attachRevealObserver();
}

function handleAdminClick(event) {
  const projectEdit = event.target.closest("[data-admin-edit-project]");
  if (projectEdit) fillProjectForm(projectEdit.dataset.adminEditProject);

  const projectToggle = event.target.closest("[data-admin-toggle-project]");
  if (projectToggle) {
    const project = state.projects.find((item) => item.id === projectToggle.dataset.adminToggleProject);
    if (project) project.visible = project.visible === false;
    saveState();
    renderContent();
  }

  const projectDelete = event.target.closest("[data-admin-delete-project]");
  if (projectDelete) {
    state.projects = state.projects.filter((item) => item.id !== projectDelete.dataset.adminDeleteProject);
    saveState();
    renderContent();
  }

  const blogEdit = event.target.closest("[data-admin-edit-blog]");
  if (blogEdit) fillBlogForm(blogEdit.dataset.adminEditBlog);

  const blogToggle = event.target.closest("[data-admin-toggle-blog]");
  if (blogToggle) {
    const blog = state.blogs.find((item) => item.id === blogToggle.dataset.adminToggleBlog);
    if (blog) blog.visible = blog.visible === false;
    saveState();
    renderContent();
  }

  const blogDelete = event.target.closest("[data-admin-delete-blog]");
  if (blogDelete) {
    state.blogs = state.blogs.filter((item) => item.id !== blogDelete.dataset.adminDeleteBlog);
    saveState();
    renderContent();
  }

  const certificationEdit = event.target.closest("[data-admin-edit-certification]");
  if (certificationEdit) fillCertificationForm(certificationEdit.dataset.adminEditCertification);

  const certificationToggle = event.target.closest("[data-admin-toggle-certification]");
  if (certificationToggle) {
    const certification = state.certifications.find((item) => item.id === certificationToggle.dataset.adminToggleCertification);
    if (certification) certification.visible = certification.visible === false;
    saveState();
    renderContent();
  }

  const certificationDelete = event.target.closest("[data-admin-delete-certification]");
  if (certificationDelete) {
    state.certifications = state.certifications.filter((item) => item.id !== certificationDelete.dataset.adminDeleteCertification);
    saveState();
    renderContent();
  }

  const sectionEdit = event.target.closest("[data-admin-edit-section]");
  if (sectionEdit) fillCustomSectionForm(sectionEdit.dataset.adminEditSection);

  const sectionToggle = event.target.closest("[data-admin-toggle-section]");
  if (sectionToggle) {
    const section = (state.customSections || []).find((item) => item.id === sectionToggle.dataset.adminToggleSection);
    if (section) section.visible = section.visible === false;
    saveState();
    renderContent();
  }

  const sectionDelete = event.target.closest("[data-admin-delete-section]");
  if (sectionDelete) {
    state.customSections = (state.customSections || []).filter((item) => item.id !== sectionDelete.dataset.adminDeleteSection);
    saveState();
    renderContent();
  }
}

function fillProjectForm(id) {
  const project = state.projects.find((item) => item.id === id);
  const form = document.getElementById("projectForm");
  if (!project || !form) return;
  form.elements.projectId.value = project.id;
  form.elements.title.value = project.title;
  form.elements.category.value = project.category;
  form.elements.date.value = project.date;
  form.elements.tech.value = project.tech;
  form.elements.summary.value = project.summary;
  form.elements.reason.value = project.reason;
  form.elements.process.value = project.process;
  form.elements.details.value = project.details;
  form.elements.findings.value = project.findings || "";
  form.elements.recommendations.value = project.recommendations || "";
  form.elements.link.value = project.link || "";
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function clearProjectForm() {
  document.getElementById("projectForm").reset();
  document.getElementById("projectForm").elements.projectId.value = "";
}

function fillCertificationForm(id) {
  const certification = state.certifications.find((item) => item.id === id);
  const form = document.getElementById("certificationForm");
  if (!certification || !form) return;
  form.elements.certificationId.value = certification.id;
  form.elements.title.value = certification.title || "";
  form.elements.issuer.value = certification.issuer || "";
  form.elements.date.value = certification.date || "";
  form.elements.summary.value = certification.summary || "";
  form.elements.skills.value = certification.skills || "";
  switchAdminTab("certifications");
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function clearCertificationForm() {
  const form = document.getElementById("certificationForm");
  if (!form) return;
  form.reset();
  form.elements.certificationId.value = "";
}

function fillCustomSectionForm(id) {
  const section = (state.customSections || []).find((item) => item.id === id);
  const form = document.getElementById("customSectionForm");
  if (!section || !form) return;
  form.elements.sectionId.value = section.id;
  form.elements.eyebrow.value = section.eyebrow || "";
  form.elements.title.value = section.title || "";
  form.elements.body.value = section.body || "";
  form.elements.tags.value = section.tags || "";
  form.elements.fileNote.value = section.file?.note || "";
  form.elements.visible.checked = section.visible !== false;
  switchAdminTab("sections");
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function clearCustomSectionForm() {
  const form = document.getElementById("customSectionForm");
  if (!form) return;
  form.reset();
  form.elements.sectionId.value = "";
  form.elements.visible.checked = true;
}

function fillBlogForm(id) {
  const blog = state.blogs.find((item) => item.id === id);
  const form = document.getElementById("blogForm");
  if (!blog || !form) return;
  form.elements.blogId.value = blog.id;
  form.elements.title.value = blog.title;
  form.elements.date.value = blog.date;
  form.elements.tags.value = blog.tags;
  form.elements.preview.value = blog.preview;
  form.elements.body.value = blog.body;
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function clearBlogForm() {
  document.getElementById("blogForm").reset();
  document.getElementById("blogForm").elements.blogId.value = "";
}

function trackAction(name) {
  state.tracking.clicks += 1;
  state.tracking.sectionVisits[name] = (state.tracking.sectionVisits[name] || 0) + 1;
  saveState();
}

function attachSectionTracking() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      if (!id) return;
      state.tracking.sectionVisits[id] = (state.tracking.sectionVisits[id] || 0) + 1;
      saveState();
      document.querySelectorAll("[data-section-link]").forEach((link) => {
        link.classList.toggle("active", link.dataset.sectionLink === id);
      });
    });
  }, { threshold: 0.45 });

  document.querySelectorAll(".section-block[id]").forEach((section) => observer.observe(section));
}

function attachRevealObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

try {
  state.tracking.pageViews += 1;
  saveState();
  renderContent();
  attachEvents();
  attachSectionTracking();
  attachRevealObserver();
  loadCropImage(state.profileImage || DEFAULT_PROFILE_IMAGE);
} catch (error) {
  console.error("Portfolio failed to initialize:", error);
  localStorage.removeItem(STORAGE_KEY);
  const fallback = document.createElement("div");
  fallback.style.cssText = "max-width:720px;margin:40px auto;padding:20px;border:1px solid #55d6ff;border-radius:8px;font-family:Arial,sans-serif;color:#edf6ff;background:#0d1b2f";
  fallback.innerHTML = "<h1>Portfolio recovered</h1><p>The site reset saved demo data after a browser storage issue. Please refresh the page once.</p>";
  document.body.prepend(fallback);
}

const snippets = [];

const sensoryPlayDays = `""" (Authentication, Databases) I created a web app called Sensory Play Days on Ezer Farm, the website is EzerFarmTN.com. They host "Sensory Play Days" on the farm for homeschooling moms to nurture developmental growth for their children. It has a sign up form that loads the list of available play days from the MongoDB database and allows the user to select which play day to schedule for and input information about the kids in attendance such as the names of each child and their age. Once the user reserves their play day, they receive an email through nodemailer with that information and a link to manage their reservation. The customer management dashboard allows the user to view relevant details or cancel the reservation. If they cancel, they will again receive a confirmation email as well as the site admins. I created an admin dashboard that is password protected and allows the owner/admin to view the scheduled play days by day, the ability to cancel reservations and the ability to add new available days or delete others. The website is fluid and easy to use. I opted for vanilla Javascript because I didn't think the performance overhead of a client-side framework was necessary for this project. On the backend I used NodeJS with Express, dotenv, MongoDB and I opted for express-basic-auth for a lightweight authentication solution. The backend is split up into controllers/, utils/, models/, and routes/ directories and utilizes ES Modules and async/await syntax. I utilized CSS variables and consistent styling to make the UI feel seamless and user-friendly. The app is fully responsive and is optimized for mobile, tablet and desktop. The site is managed by PM2 and is currently hosted on a Digital Ocean Ubuntu droplet using NGINX. The droplet's IP is whitelisted for the MongoDB Atlas database. A live demo of this project is available at EzerFarmTN.com and you can access the demo admin dashboard at https://EzerFarmTN.com/sensory/admin with username: example-user password: example-password. You can view the GitHub code here- https://github.com/sebdoubleu/ezerfarmtn.com
(Tools & Technologies Used): Vanilla JavaScript, MongoDB, Node.js, NodeMailer, Express, Express Basic Auth, HTML, CSS """`;
snippets.push(sensoryPlayDays);

const newsScraper = `""" AI News Buddy - Advanced Single Page App (Backend, Full Stack, APIs, Algorithms, Databases, Server)- I created an AI News Scraper app that uses Cheerio in NodeJS to scrape the homepage of techcrunch.com every day and get a list of articles, titles, and their links. Because the application is making multiple parallel calls to the OpenAI API, I've implemented an exponential backoff algorithm to handle fault tolerance. This then gets sent from the controller to a utility function that summarizes the article text with GPT-3.5 and also gives a list of categories in a format that gets parsed and separated from the returned text. The document then gets uploaded to the MongoDB database that I've connected through MongoClient.connect() and saves the article title, AI summary, link and the related categories. The server can also be called through a Telegram bot that I created which returns a list of today's articles and their summaries. On the frontend, I built a React app with Vite. The application is split into multiple components and utilizes custom hooks and the React Context API. I used CSS variables for styling the app. The CSS includes animations and media queries for responsive design. I made the UI very modern in a dark mode style, using various shades of darker greys and light shadows to give it a feeling of depth. The user experience is quick and easy to use and allows the user to carry on a conversation thread with the AI News Bot that answers questions based on the news article. The app saves chat history and article favorites that the user can re-visit later and continue conversations. The scraper bot is scheduled multiple times a day to get the newest articles from techcrunch.com but does not process duplicates. The app also produces a "Daily TLDR" to give a short AI summary of the day's news. A live demo version of this project is available at https://WebXpert.io and the GitHub link is https://github.com/sebdoubleu/ai-news-scraper
(Tools & Technologies Used): React, MongoDB, Node.js, Express, Node Cron, React Markdown, GPT-4/GPT-3.5 Integration, Cheerio, JavaScript, HTML, CSS """`;
snippets.push(newsScraper);

const landingPages = `""" Landing pages (Frontend, Design, Simple) - During my time doing contract Web Development for The Relocation Professional, I built landing pages that capture lead information for moving companies and streamline their sales processes with CRM integrations. I coded them in JavaScript, HTML, CSS, and also setup the server-side. For example, I created a lead capture page for a company called Brothers Moving and Storage out of Texas. A demo version of the landing page can be viewed at https://sebthedeveloper.com/demos/brothers-moving-and-storage and the GitHub link is https://github.com/sebdoubleu/brothers-moving-and-storage-landing-page/. The customer requested a playful and easy to use quote request page with a bit of creativity. It is fully responsive and easy to use. On desktop, I was able to make good use of the available space to add a branded moving box image that moves around on the left half of the screen when the user moves the mouse to create a playful UI/UX. The form gets submitted to an API for a CRM software called Granot that then collects the lead data for the company and posts it to their live sales board. I did a very similar landing page for a company called Off Load Moving Co. out of Virginia. It is a very fast and easy to use landing page with a modern design and has a success page to let the user know their quote request was successful. A demo version of that landing page can be viewed at https://sebthedeveloper.com/demos/off-load-moving and the GitHub is https://github.com/sebdoubleu/off-load-moving-landing-page. There are more examples in the portfolio section of this website. Also, during my time working as Wordpress Developer for Dougherty Brothers Moving, I created a few landing pages as well.
(Tools & Technologies Used): JavaScript, HTML, CSS """`;
snippets.push(landingPages);

const palmBeachCustomGrillz = `""" E-Commerce Web App with React and TypeScript (Single-Page App, API integrations, Frontend, Backend, Full Stack) - 
Contracted to develop a custom coded E-Commerce Website for Palm Beach Custom Grillz LLC. Built with TypeScript, React, Vite, Bootstrap, Express, Node.js, CSS and includes a Stripe API integration for online payments. It uses React Router Dom for client side routing. It has a clean dark-themed user interface and an easy to understand user experience. The project utilizes the React Context API and local storage.
Here are some of the key features:
1. Browse available products and add items to cart.
2. Select add-ons for individual items and view pricing options.
3. Require acceptance of Terms and Conditions prior to checkout.
4. Integrate with Stripe API to accept payments and collect shipping information.
5. Utilize local storage to track selected items and persist cart state on reload and client-side navigation.
This project is live at https://palmbeachcustomgrillz.com and the GitHub link is https://github.com/sebdoubleu/ecommerce-grills-shop
(Tools & Technologies Used): TypeScript, React, Vite, Stripe Integration, Bootstrap, Express, Node.js, CSS """`;
snippets.push(palmBeachCustomGrillz);

const emailTemplateMailer = `""" HTML Email Template Mailer (Backend, CRM, Server, Tools) -
Internal custom HTML email tool that I created during my time at Dougherty Brothers Moving. The company was having issues with the sales emails being sent to customer's spam mail when sent through the Granot CRM email servers (which is the typical standard for the industry). I was tasked with creating this tool that would ensure email deliverability and in the process developed many custom HTML email templates that are fully responsive and work on all email clients including Outlook (tested with Email on Acid). The tool can also track email open rates with tracking pixels. You can view a project demo by using the demo account information username: example-user password: example-password at the demo URL https://GoodNoodle.xyz and the GitHub link is https://github.com/sebdoubleu/email-templating-demo
1. Choose from custom company-branded HTML email templates and dynamically insert customer info.
2. Preview generated emails before sending.
3. Send multiple emails in bulk with dynamic customer information.
4. Dynamically include sales representative's contact information in sent emails.
5. Generate formatted list of customer names and emails from Granot CRM's "Estimates in Process" page. This script is written and implemented specifically for that page.
6. Insert tracking pixel to know when an email is viewed (IP address may not be accurate if customer is using Gmail, as Gmail utilizes proxy servers to mask this information).
(Tools & Technologies Used): JavaScript, Node.js, Express, Handlebars, Passport, BCrypt, Express Session, Express Flash, Nodemailer, HTML, CSS """`;
snippets.push(emailTemplateMailer);

const portfolioWebsite = `""" The portfolio site that we are on right now (Complex, AI, Code Examples) -
This Full Stack Portfolio Website (SebTheDeveloper.com) is a complex web app that integrates many technologies to produce a highly reactive and interactive experience using JavaScript only - so no frontend framework preformance overhead. The main tools & technologies featured in this project are JavaScript, HTML and CSS with some Bootstrap for the frontend. The server-side is powered by Node.js, Express, and NodeMailer. It also has integrations for PostgreSQL (hosted on my server) and taps into OpenAI's gpt-4 and text-embedding-ada-002 API endpoints. This app features a fully responsive and dark-mode/light-mode friendly user interface that has a portfolio modal showcasing my projects (available by clicking the "Portfolio" button at the top of the page or the "View Project Details" button above this chatbot in the hero section). All of the projects have demo links and source code available. The frontend of this site uses intersection observers, event listeners and DOM manipulation to create a dynamic and interactive user experience. For instance, when you send a chat message, if the new message falls below the viewport, the screen automatically scrolls down to accommodate it. Also when the user submits the contact form in the footer of this page, the page will scroll to the top and use a typewriter text effect to greet them by name and thank them for reaching out. This Portfolio Assistant Chatbot remembers the last 5 chat messages (from both the user and the chatbot) which gets inserted into the prompt context (limited to last 5 messages to ensure a consistent average token length per prompt to gpt-4). The backend also uses the vector embedding model to run a semantic search against the Postgres database that I have setup for "cosine similarity" search with PG Vector. I have already pre-processed the related "snippets" of information and their embeddings in with the processNewData.js module in the controllers directory of this project. The search returns the 2 most semantically related snippets compared to the user's question and this gets appended as context for the chatbot. The code for this portfolio site can be found at https://github.com/sebdoubleu/sebthedeveloper.com """`;
snippets.push(portfolioWebsite);

const wordpress = `""" WordPress (Simple, Frontend, Design) -
I have worked with WordPress since 2020 and created multiple websites with Elementor and custom CSS/JS. An example of this is the Company Website I created for Allied Relocation Services which is live at https://alliedrelocationservice.com It features a UI created with Elementor, Wordpress, custom CSS, custom JavaScript and uses Contact Form 7 to capture customer quote request submissions. I have also worked for Dougherty Brothers Moving as a WordPress and Email Developer from March of 2020 to June of 2023. There, I created and managed the Company Website and related landing pages in WordPress, managed the company's social media accounts and developed internal tools such as an HTML Email Templating Tool and a Chrome Extension that automated part of the day-to-day sales workflow by automatically opening links for local gas prices, searching Google and Zillow to view the status of the move going into sales calls and opening up Google Maps with the correct query string to view the customer's long distance move route for the file. All of this happens automatically when a sales agent clicks on a job link on a specific page of the Granot CRM. I also have experience creating custom WordPress themes and plugins. During my time at Dougherty Brothers Moving LLC, I created custom email templates in our Granot software and also created a proprietary internal HTML Email Templating Tool with Node.js, Express, JavaScript, Handlebars, Passport, BCrypt, Express Session, Express Flash, NodeMailer, HTML, and CSS. A live demo of this project is available at https://GoodNoodle.xyz and the GitHub link is https://github.com/sebdoubleu/email-templating-demo but authentication is require so you can use the demo username "example-user" and the demo password "example-password" to login (without the quotation marks of course).
(Tools & Technologies Used): Wordpress, Elementor, JavaScript, Node.js, Express, Handlebars, Passport, BCrypt, Express Session, Express Flash, NodeMailer, HTML, CSS """`;
snippets.push(wordpress);

const fun = `""" Apocalypse Survival Simulator Store (Fun, Personal Project, Game, Frontend) -
A project I made for fun is an "Apocalypse Mega Mart" that is just a front end at the moment but I plan to build out more of this project in the future to track player analytics and continue the game past this initial store page. When I build out the backend for this I plan to use Golang which I have very minimal experience in but I enjoyed the little bit of time I did spend learning Go. This project is a single page application that has two tabs to choose from - the "Food" tab or the "Gear" tab. Each tab will display a list of available survival supplies that the user can purchase. The app starts with $2000 starting wallet balance which is tracked in local storage. The customer can only add items until they run out of money and must make decisions based on what they value most. Each item has a drop down of related survival stats, this is what I plan to use to track survival statistics in the future when I build out more of the app. This web app has a very clean UI and showcases my frontend skills and creativity. Currently this project is available for demo at https://sebthedeveloper.com/demos/apocalypse-mega-mart and the GitHub link is https://github.com/sebdoubleu/apocalypse-ecommerce
(Tools & Technologies User): JavaScript, WebPack, HTML, CSS """`;
snippets.push(fun);

const workHistory = `""" Work/Employment History (Past, Experience, Skills) -
Freelance Developer, SRW Ventures Fort Lauderdale
(SRW Ventures is my business LLC that I use for freelance/contract development work)
Apr 2022 — Present
• Delivered impactful web solutions for small businesses, including e-commerce 
applications and reservation management tools, thereby enhancing their 
online presence and customer engagement.
• Architected backend systems using Node.js and Nginx on DigitalOcean 
Servers, ensuring secure and scalable application deployments.
• Successfully showcased a diverse range of projects on SebTheDeveloper.com
Full Stack Developer, The Relocation Professional Boynton Beach
Oct 2022 — Mar 2023
• Improved the digital footprint of moving companies by designing interactive 
landing pages, resulting in increased lead generation.
• Automated quote requests integrated with CRM applications, optimizing lead 
management and boosting sales team ef'ciency.
• View an example at 
SebTheDeveloper.com/demos/brothers-moving-and-storage
Wordpress Web Developer, Dougherty Brothers 
Moving
Boynton Beach
Mar 2020 — Jun 2023
• Launched and accelerated the companyFs digital presence by developing and 
maintaining responsive websites and landing pages.
• Innovated a custom HTML email tool, enhancing user experience across all 
email clients, leading to improved customer engagement. View Demo at 
GoodNoodle.xyz
• Created a chrome extension to streamline a portion of the sales process, 
and spearheaded social media strategies, amplifying brand visibility and 
engagement
Here is a comprehensive overview of my skills:
Front-End Development: TypeScript / JavaScript, React, HTML, CSS, Responsive Design (Bootstrap, Flexbox, CSS Grid)
Back-End Development: Node.js, Express, Nginx
Databases: MongoDB, PostgreSQL
Authentication & Session Management: Passport.js, Express Basic Auth
User Interface / User Experience
Version Control: Git, GitHub
Adobe Creative Suite: Photoshop, Illustrator, Premiere Pro, After Effects """`;
snippets.push(workHistory);

const references = `""" References and Work Inquiries / Prospects (Testimonials, Referrals) - references are available on request. You can fill out a contact form below in the footer of this page (on my website) or send me an email at contact@sebthedeveloper.com. I have many happy clients that I have worked with and I provide high quality work. If you are an employer and would like to discuss a job that you or hiring for, or likewise if you are an employer and looking to offer contract web developement work, please contact me again by email or by the contact form in the footer of my website. I would love to follow up about specifics. """`;
snippets.push(references);

const otherLanguages = `""" Other Programming Languages or Frameworks - The main programming languages I know are JavaScript / TypeScript, HTML, and CSS. The main frameworks I use are React, Express and NextJS. I am also familiar with PHP and have used it to customize WordPress backends. When I took the Harvard CS50 Online Course I learned and coded a little bit of C and Python. In CS50 we did create small Flask and Django backends and wrote basic file manipulating scripts in Python. With C I learned about pointers, data structures and algorithms. I think learning these low-level concepts helped me to become a better programmer overall. My favorite CS50 projects were when we recovered deleted JPEG files from a wiped memory card using C and another where we manipulated images to create image filters also using C. I have dabbled in Go and PHP but I plan to study them more as I only have a rudimentary understanding. Languages that I do not have experience in include (but are not limited to): C#, C++, Java, Ruby, Rust, Swift and Kotlin. """`;
snippets.push(otherLanguages);

module.exports = snippets;

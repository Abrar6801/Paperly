export const templates = [
    {
        id: "blank",
        label: "Blank Document",
        imageUrl: "/blank-document.svg",
        initialContent: "",
    },
    {
        id: "software-proposal",
        label: "Software development proposal",
        imageUrl: "/software-proposal.svg",
        initialContent: `
<h1>Software Development Proposal</h1>
<p><strong>Project:</strong> [Project Name]</p>
<p><strong>Prepared by:</strong> [Your Name / Company]</p>
<p><strong>Date:</strong> [Date]</p>
<p><strong>Version:</strong> 1.0</p>

<h2>1. Executive Summary</h2>
<p>[Provide a concise overview of the project, the problem it solves, and the proposed solution. Keep this section brief and compelling.]</p>

<h2>2. Project Overview</h2>
<p>[Describe the background and context of the project, why it is needed, and the business goals it will address.]</p>

<h2>3. Objectives</h2>
<ul>
  <li>[Primary objective]</li>
  <li>[Secondary objective]</li>
  <li>[Additional objective]</li>
</ul>

<h2>4. Scope of Work</h2>
<h3>In Scope</h3>
<ul>
  <li>[Feature / deliverable 1]</li>
  <li>[Feature / deliverable 2]</li>
  <li>[Feature / deliverable 3]</li>
</ul>
<h3>Out of Scope</h3>
<ul>
  <li>[Excluded item 1]</li>
  <li>[Excluded item 2]</li>
</ul>

<h2>5. Technical Requirements</h2>
<ul>
  <li><strong>Platform:</strong> [Web / Mobile / Desktop]</li>
  <li><strong>Technology Stack:</strong> [e.g. React, Node.js, PostgreSQL]</li>
  <li><strong>Integrations:</strong> [Third-party APIs or systems]</li>
  <li><strong>Security:</strong> [Authentication, data encryption, compliance]</li>
  <li><strong>Performance:</strong> [Response time targets, concurrent users]</li>
  <li><strong>Scalability:</strong> [Expected growth and scaling strategy]</li>
</ul>

<h2>6. Architecture Overview</h2>
<p>[Describe the high-level system architecture. Cover the frontend, backend, database layer, and any third-party services or APIs that will be integrated.]</p>

<h2>7. Development Methodology</h2>
<p>[Describe the development approach — Agile, Scrum, Waterfall, etc. — including sprint length, review cycles, and stakeholder touchpoints.]</p>

<h2>8. Project Timeline</h2>
<ul>
  <li><strong>Phase 1 – Discovery &amp; Planning:</strong> [Duration] — Requirements gathering, architecture design</li>
  <li><strong>Phase 2 – UI/UX Design:</strong> [Duration] — Wireframes, prototypes, design approval</li>
  <li><strong>Phase 3 – Development:</strong> [Duration] — Core feature implementation</li>
  <li><strong>Phase 4 – Testing &amp; QA:</strong> [Duration] — Unit, integration, and UAT</li>
  <li><strong>Phase 5 – Deployment:</strong> [Duration] — Production release, documentation, handover</li>
</ul>

<h2>9. Budget Estimate</h2>
<ul>
  <li><strong>UI/UX Design:</strong> $[Amount]</li>
  <li><strong>Development:</strong> $[Amount]</li>
  <li><strong>Testing &amp; QA:</strong> $[Amount]</li>
  <li><strong>Deployment &amp; Infrastructure (Year 1):</strong> $[Amount]</li>
  <li><strong>Project Management:</strong> $[Amount]</li>
  <li><strong>Total Estimated Cost:</strong> $[Total]</li>
</ul>

<h2>10. Team</h2>
<ul>
  <li><strong>Project Manager:</strong> [Name]</li>
  <li><strong>Lead Developer:</strong> [Name]</li>
  <li><strong>UI/UX Designer:</strong> [Name]</li>
  <li><strong>Backend Engineer:</strong> [Name]</li>
  <li><strong>QA Engineer:</strong> [Name]</li>
</ul>

<h2>11. Assumptions &amp; Dependencies</h2>
<ul>
  <li>[Assumption 1 — e.g. client provides API credentials by Phase 1]</li>
  <li>[Dependency 1 — e.g. third-party service availability]</li>
</ul>

<h2>12. Terms &amp; Conditions</h2>
<p>[Include payment schedule, intellectual property rights, confidentiality clauses, change-request process, and warranty period.]</p>

<p><strong>Accepted by:</strong> _________________________ &nbsp; <strong>Date:</strong> _____________</p>
<p><strong>Prepared by:</strong> _________________________ &nbsp; <strong>Date:</strong> _____________</p>
`.trim(),
    },
    {
        id: "project-proposal",
        label: "Project proposal",
        imageUrl: "/project-proposal.svg",
        initialContent: `
<h1>Project Proposal</h1>
<p><strong>Project Title:</strong> [Project Name]</p>
<p><strong>Submitted by:</strong> [Your Name / Team / Organisation]</p>
<p><strong>Submitted to:</strong> [Recipient / Department]</p>
<p><strong>Date:</strong> [Date]</p>

<h2>1. Executive Summary</h2>
<p>[Summarise the project in 2–3 sentences. State the problem, the proposed solution, and the expected benefit. This is what decision-makers read first.]</p>

<h2>2. Problem Statement</h2>
<p>[Clearly define the problem or opportunity this project addresses. Use data or evidence where possible to justify the need.]</p>

<h2>3. Project Description</h2>
<p>[Describe what the project will deliver. Explain the approach, key activities, and any innovations or unique aspects of the work.]</p>

<h2>4. Goals &amp; Objectives</h2>
<ul>
  <li><strong>Goal 1:</strong> [Broad aim]</li>
  <li><strong>Goal 2:</strong> [Broad aim]</li>
</ul>
<p><strong>Specific Objectives:</strong></p>
<ul>
  <li>[Measurable objective 1]</li>
  <li>[Measurable objective 2]</li>
  <li>[Measurable objective 3]</li>
</ul>

<h2>5. Methodology / Approach</h2>
<p>[Explain how the project will be carried out. List the key steps, processes, or methods that will be used to achieve the objectives.]</p>
<ol>
  <li>[Step / Activity 1]</li>
  <li>[Step / Activity 2]</li>
  <li>[Step / Activity 3]</li>
  <li>[Step / Activity 4]</li>
</ol>

<h2>6. Expected Outcomes &amp; Benefits</h2>
<ul>
  <li>[Outcome 1 — quantifiable where possible]</li>
  <li>[Outcome 2]</li>
  <li>[Outcome 3]</li>
</ul>

<h2>7. Project Timeline</h2>
<ul>
  <li><strong>Start Date:</strong> [Date]</li>
  <li><strong>End Date:</strong> [Date]</li>
  <li><strong>Milestone 1:</strong> [Description] — [Date]</li>
  <li><strong>Milestone 2:</strong> [Description] — [Date]</li>
  <li><strong>Milestone 3:</strong> [Description] — [Date]</li>
  <li><strong>Final Delivery:</strong> [Date]</li>
</ul>

<h2>8. Budget</h2>
<ul>
  <li><strong>Personnel:</strong> $[Amount]</li>
  <li><strong>Materials &amp; Equipment:</strong> $[Amount]</li>
  <li><strong>Travel &amp; Logistics:</strong> $[Amount]</li>
  <li><strong>Overheads:</strong> $[Amount]</li>
  <li><strong>Contingency (10%):</strong> $[Amount]</li>
  <li><strong>Total Budget:</strong> $[Total]</li>
</ul>

<h2>9. Team &amp; Resources</h2>
<ul>
  <li><strong>Project Lead:</strong> [Name] — [Role description]</li>
  <li><strong>Team Member:</strong> [Name] — [Role description]</li>
  <li><strong>Advisor / Stakeholder:</strong> [Name] — [Role description]</li>
</ul>

<h2>10. Risk Assessment</h2>
<ul>
  <li><strong>Risk 1:</strong> [Description] — <em>Mitigation:</em> [Strategy]</li>
  <li><strong>Risk 2:</strong> [Description] — <em>Mitigation:</em> [Strategy]</li>
</ul>

<h2>11. Evaluation &amp; Reporting</h2>
<p>[Describe how success will be measured and how progress will be reported to stakeholders — e.g. monthly reports, KPI dashboards, final review meeting.]</p>

<h2>12. Conclusion</h2>
<p>[Restate the value of the project and make a clear call to action — e.g. requesting approval, funding, or support to proceed.]</p>
`.trim(),
    },
    {
        id: "business-letter",
        label: "Business letter",
        imageUrl: "/business-letter.svg",
        initialContent: `
<p>[Your Name]</p>
<p>[Your Title]</p>
<p>[Company Name]</p>
<p>[Street Address]</p>
<p>[City, State, ZIP Code]</p>
<p>[Email Address] | [Phone Number]</p>

<p>[Date]</p>

<p>[Recipient's Name]</p>
<p>[Recipient's Title]</p>
<p>[Company / Organisation Name]</p>
<p>[Street Address]</p>
<p>[City, State, ZIP Code]</p>

<p><strong>Re: [Subject of the Letter]</strong></p>

<p>Dear [Mr. / Ms. / Dr.] [Last Name],</p>

<p>I am writing on behalf of [Company Name] to [state the purpose of the letter — e.g. propose a partnership, follow up on a meeting, formally request information, etc.]. We believe this communication will be of mutual interest and value.</p>

<p>[Second paragraph: Provide the key details, context, or supporting information relevant to the purpose. Be specific, factual, and professional. If referencing a previous conversation or agreement, mention it here.]</p>

<p>[Third paragraph: Outline any requested action, next steps, or decisions that need to be made. Be clear about deadlines or expectations, and offer to provide additional information if needed.]</p>

<p>We appreciate your time and consideration. Please do not hesitate to contact me directly at [phone number] or [email address] should you have any questions or require further clarification. We look forward to your response.</p>

<p>Yours sincerely,</p>

<p><br></p>

<p><strong>[Your Full Name]</strong></p>
<p>[Your Title]</p>
<p>[Company Name]</p>
`.trim(),
    },
    {
        id: "resume",
        label: "Resume",
        imageUrl: "/resume.svg",
        initialContent: `
<h1>[Your Full Name]</h1>
<p>[City, State] | [Phone Number] | [Email Address] | <a href="https://linkedin.com/in/yourprofile">linkedin.com/in/yourprofile</a> | <a href="https://github.com/yourusername">github.com/yourusername</a></p>

<h2>Professional Summary</h2>
<p>[Write 2–3 sentences summarising your professional background, key skills, and career goal. Tailor this to the role you are applying for. Example: Results-driven software engineer with 5+ years of experience building scalable web applications. Passionate about clean code, developer experience, and delivering measurable business value.]</p>

<h2>Work Experience</h2>

<h3>[Job Title] — [Company Name], [City, State]</h3>
<p><em>[Month Year] – [Month Year / Present]</em></p>
<ul>
  <li>[Key achievement or responsibility — use action verbs and quantify where possible. Example: Reduced API response time by 40% by implementing Redis caching.]</li>
  <li>[Achievement 2]</li>
  <li>[Achievement 3]</li>
</ul>

<h3>[Job Title] — [Company Name], [City, State]</h3>
<p><em>[Month Year] – [Month Year]</em></p>
<ul>
  <li>[Achievement 1]</li>
  <li>[Achievement 2]</li>
  <li>[Achievement 3]</li>
</ul>

<h2>Education</h2>

<h3>[Degree] in [Field of Study] — [University Name], [City, State]</h3>
<p><em>Graduated [Month Year]</em></p>
<ul>
  <li>GPA: [X.X / 4.0] (include if strong)</li>
  <li>Relevant coursework: [Course 1], [Course 2], [Course 3]</li>
  <li>[Honour, award, or activity if relevant]</li>
</ul>

<h2>Skills</h2>
<ul>
  <li><strong>Languages:</strong> [e.g. JavaScript, TypeScript, Python, SQL]</li>
  <li><strong>Frameworks &amp; Libraries:</strong> [e.g. React, Next.js, Node.js, Express]</li>
  <li><strong>Databases:</strong> [e.g. PostgreSQL, MongoDB, Redis]</li>
  <li><strong>Tools &amp; Platforms:</strong> [e.g. Git, Docker, AWS, Vercel, Figma]</li>
  <li><strong>Soft Skills:</strong> [e.g. Team leadership, Agile, Technical writing]</li>
</ul>

<h2>Projects</h2>

<h3>[Project Name]</h3>
<p><em>[Tech Stack] | <a href="https://github.com/yourusername/project">[GitHub Link]</a> | <a href="https://yourproject.com">[Live Demo]</a></em></p>
<ul>
  <li>[What the project does and the problem it solves]</li>
  <li>[Your specific contribution and any measurable impact]</li>
</ul>

<h2>Certifications &amp; Awards</h2>
<ul>
  <li>[Certification Name] — [Issuing Organisation], [Year]</li>
  <li>[Award or recognition]</li>
</ul>
`.trim(),
    },
    {
        id: "cover-letter",
        label: "Cover letter",
        imageUrl: "/cover-letter.svg",
        initialContent: `
<p>[Your Name]</p>
<p>[City, State] | [Phone Number] | [Email Address]</p>

<p>[Date]</p>

<p>[Hiring Manager's Name]</p>
<p>[Their Title]</p>
<p>[Company Name]</p>
<p>[Company Address]</p>

<p>Dear [Mr. / Ms. / Dr.] [Last Name],</p>

<p>I am writing to express my enthusiasm for the <strong>[Job Title]</strong> position at <strong>[Company Name]</strong>, as advertised on [Job Board / Company Website]. With [X years] of experience in [your field] and a proven track record of [key relevant accomplishment], I am confident in my ability to make a meaningful contribution to your team.</p>

<p>In my most recent role at <strong>[Previous Company]</strong>, I [describe a specific achievement or responsibility most relevant to this role]. This experience taught me [key skill or insight], which I believe aligns closely with [Company Name]'s focus on [something specific about the company — e.g. innovative product development / customer-centric design]. I am particularly drawn to [Company Name] because [genuine reason — e.g. your mission, a product you admire, culture, recent news].</p>

<p>Beyond my technical skills in [key skill 1], [key skill 2], and [key skill 3], I bring [a soft skill — e.g. strong cross-functional collaboration, a methodical approach to problem-solving, or leadership in ambiguous environments]. I thrive in [type of environment — e.g. fast-paced startups / collaborative remote teams] and consistently [positive trait — e.g. deliver projects on time / lift the people around me].</p>

<p>I have attached my resume for your review and would welcome the opportunity to discuss how my background fits the needs of your team. I am available at your convenience and can be reached at [phone number] or [email address]. Thank you for your time and consideration — I look forward to the possibility of contributing to [Company Name].</p>

<p>Yours sincerely,</p>

<p><br></p>

<p><strong>[Your Full Name]</strong></p>
`.trim(),
    },
    {
        id: "letter",
        label: "Letter",
        imageUrl: "/letter.svg",
        initialContent: `
<p>[Your Name]</p>
<p>[Street Address]</p>
<p>[City, State, ZIP Code]</p>
<p>[Email Address]</p>
<p>[Phone Number]</p>

<p>[Date]</p>

<p>[Recipient's Name]</p>
<p>[Recipient's Address]</p>
<p>[City, State, ZIP Code]</p>

<p>Dear [Name],</p>

<p>[Opening paragraph: State the purpose of your letter clearly and warmly. Whether you are reconnecting, making a request, sharing news, or responding to something, let the reader know immediately why you are writing.]</p>

<p>[Body paragraph: Expand on the main point of your letter. Provide any necessary context, details, or supporting information. Keep your tone appropriate to the relationship — formal for professional contacts, warm and personal for friends or family.]</p>

<p>[Closing paragraph: Wrap up with any action you are requesting or next steps, or simply close warmly. Express appreciation for the reader's time if appropriate.]</p>

<p>Yours sincerely / With warm regards / Kind regards,</p>

<p><br></p>

<p><strong>[Your Full Name]</strong></p>
`.trim(),
    },
]

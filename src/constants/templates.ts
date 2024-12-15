export const TEMPLATES = [
  {
    id: "blank",
    label: "Blank",
    imageUrl: "",
    content: "<p>Start creating your document...</p>",
  },
  {
    id: "software",
    label: "Software-Development Proposal",
    imageUrl: "/documents/software-proposal.svg",
    content: `
      <h1>Software Development Proposal</h1>
      <h2>Introduction</h2>
      <p>Provide an overview of the project and objectives.</p>
      <h2>Scope of Work</h2>
      <p>Describe the tasks, deliverables, and timeline.</p>
      <h2>Budget</h2>
      <p>Include cost estimates for the project.</p>
    `,
  },
  {
    id: "project",
    label: "Project Proposal",
    imageUrl: "/documents/project-proposal.svg",
    content: `
      <h1>Project Proposal</h1>
      <h2>Overview</h2>
      <p>Provide a summary of the project goals and benefits.</p>
      <h2>Key Milestones</h2>
      <p>List major milestones and deadlines.</p>
      <h2>Conclusion</h2>
      <p>Summarize why this project should be approved.</p>
    `,
  },
  {
    id: "cover",
    label: "Cover Letter",
    imageUrl: "/documents/cover-letter.svg",
    content: `
      <p>Dear [Hiring Manager's Name],</p>
      <p>I am excited to apply for the [Position Title] at [Company Name].</p>
      <p>Briefly highlight your experience, skills, and enthusiasm for the role.</p>
      <p>Thank you for considering my application. I look forward to the opportunity to contribute to your team.</p>
      <p>Sincerely,<br>[Your Name]</p>
    `,
  },
  {
    id: "letter",
    label: "Letter",
    imageUrl: "/documents/letter.svg",
    content: `
      <p>[Your Address]</p>
      <p>[Date]</p>
      <p>[Recipient's Name]<br>[Recipient's Address]</p>
      <p>Dear [Recipient's Name],</p>
      <p>Write the body of your letter here.</p>
      <p>Sincerely,<br>[Your Name]</p>
    `,
  },
  {
    id: "business",
    label: "Business Letter",
    imageUrl: "/documents/business-letter.svg",
    content: `
      <p>[Company Name]</p>
      <p>[Date]</p>
      <p>[Recipient's Name]<br>[Recipient's Position]<br>[Recipient's Company]</p>
      <p>Dear [Recipient's Name],</p>
      <p>Provide the purpose of the letter, key points, and any actions needed.</p>
      <p>Sincerely,<br>[Your Name]</p>
    `,
  },
  {
    id: "resume",
    label: "Resume",
    imageUrl: "/documents/resume.svg",
    content: `
      <h1>[Your Name]</h1>
      <h2>Contact Information</h2>
      <p>[Phone Number] | [Email Address] | [LinkedIn Profile]</p>
      <h2>Professional Summary</h2>
      <p>Brief summary of your skills and experience.</p>
      <h2>Work Experience</h2>
      <p>List your recent positions with descriptions of your responsibilities and achievements.</p>
      <h2>Education</h2>
      <p>Include your degrees and relevant certifications.</p>
    `,
  },
];

export interface TeamMember {
    name: string;
    email?: string;
    registrationNo: string;
    phoneNo: string;
    section: string;
    year: number;
    img?: string;
  }
  
  export interface Hackathon {
    teamName: string;
    teamNo: string;
    problemStatement: string;
    participants: TeamMember[];
    gitHubLink: string;
    deploedLink: string;
    status: string;
    uiux: number;
    backend: number;
    frontend: number;
    deployed: number;
  }
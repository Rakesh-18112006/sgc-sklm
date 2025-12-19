import "./Members.css";
import competative from "../../assets/clubimgs/competative.webp";
import coding from "../../assets/clubimgs/coding.webp";
import dp from "../../assets/clubimgs//photography.webp";
import startup from "../../assets/clubimgs/startup.webp";
import robotics from "../../assets/clubimgs/robotics.webp";
import ls from "../../assets/clubimgs/ls.webp";
import internship from "../../assets/clubimgs/internship.webp";
import linquistic from "../../assets/clubimgs/linguistic.webp";
import Finance from "../../assets/clubimgs/finance.webp";
import sports from "../../assets/clubimgs/sports.webp";
import cc from "../../assets/clubimgs/cc.webp";
import arts from "../../assets/clubimgs/cc.webp";
import electronics from "../../assets/clubimgs/electronics.webp";
import eco from "../../assets/clubimgs/competative.webp";
import yoga from "../../assets/clubimgs/competative.webp";
import he from "../../assets/clubimgs/competative.webp";

// Import the JSON data
import clubMembersData from "../../assets/clubmembers.json";

interface Member {
  id: number;
  name: string;
  position: string;
  imageUrl: string;
  studentId: string;
  branch: string;
  email: string | null;
}

interface Club {
  id: number;
  name: string;
  logo: string;
  members: Member[];
}

// Club name mappings to match JSON data with our clubNames
const clubNameMappings: Record<string, string> = {
  "Competitive Club": "COMPETATIVE CLUB",
  "Coding Club": "CODING CLUB",
  "Studio Club": "DESIGNING CLUB",
  "Startup Club": "STARTUP CLUB",
  "Robotics Club": "ROBOTICS CLUB",
  "Lecture Series Club": "LECTURE SERIES CLUB",
  "Internship & Career Opportunities Club": "INTERNSHIP & CARRER OPPURTUNITIES",
  "Linguistic & Personality Development Club":
    "LINGUSTIC & PERSONAL DEVELOPMENT CLUB",
  "Finance Club": "FINANCE CLUB",
  "Sports and Games Club": "SPORTS & GAMES CLUB",
  "Cultural & Choreography Club": "CULTURAL & CHOREOGRAPHY CLUB",
  "Arts & Crafts Club": "ARTS & CRAFTS CLUB",
  "Electronics Club": "ELECTRONICS CLUB",
  "Eco Club": "ECO CLUB",
  "Yoga Club": "YOGA CLUB",
  "Higher Education Club": "HIGHER EDUCATION CLUB",
  "Research Club": "RESEARCH CLUB",
};

const clubNames = [
  { name: "ARTS & CRAFTS CLUB", logo: arts },
  { name: "CODING CLUB", logo: coding },
  { name: "COMPETATIVE CLUB", logo: competative },
  { name: "CULTURAL & CHOREOGRAPHY CLUB", logo: cc },
  { name: "DESIGNING CLUB", logo: dp },
  { name: "ECO CLUB", logo: eco },
  { name: "ELECTRONICS CLUB", logo: electronics },
  { name: "FINANCE CLUB", logo: Finance },
  { name: "HIGHER EDUCATION CLUB", logo: he },
  { name: "INTERNSHIP & CARRER OPPURTUNITIES", logo: internship },
  { name: "LECTURE SERIES CLUB", logo: ls },
  { name: "LINGUSTIC & PERSONAL DEVELOPMENT CLUB", logo: linquistic },
  { name: "ROBOTICS CLUB", logo: robotics },
  { name: "SPORTS & GAMES CLUB", logo: sports },
  { name: "STARTUP CLUB", logo: startup },
  { name: "YOGA CLUB", logo: yoga },
];

function Members() {
  // Process the JSON data to create clubs with members
  const clubs: Club[] = clubNames.map((club, clubIndex) => {
    // Find the reverse mapping for this club
    const reverseMappedName =
      Object.entries(clubNameMappings).find(
        ([_key, value]) => value === club.name
      )?.[0] || club.name;

    // Filter members for this club
    const clubMembers = clubMembersData
      .filter((member) => member["Select Club "] === reverseMappedName)
      .map((member, memberIndex) => ({
        id: memberIndex + 1,
        name: member["Student Name"],
        position: member.Position,
        imageUrl:
          member["Upload your image(Make sure image size is less than 1MB)"],
        studentId: member["Student ID Number"],
        branch: member.Branch,
        email: member["Student Email"],
      }));

    // Sort members by position (GS first, then JS, then Member, then Volunteer)
    const sortedMembers = clubMembers.sort((a, b) => {
      const positionOrder = ["General Secretary", "Joint Secratery", "Executive Member", "Volunteer"];
      return (
        positionOrder.indexOf(a.position) - positionOrder.indexOf(b.position)
      );
    });

    return {
      id: clubIndex + 1,
      name: club.name,
      logo: club.logo,
      members:
        sortedMembers.length > 0
          ? sortedMembers
          : // Fallback to mock data if no members found for the club
            Array.from({ length: 3 }, (_, memberIndex) => ({
              id: memberIndex + 1,
              name: `Member ${memberIndex + 1}`,
              position: "MEMBER",
              imageUrl: "",
              studentId: "",
              branch: "",
              email: null,
            })),
    };
  });

  // Function to convert Google Drive link to direct image URL
  const convertDriveLink = (url: string) => {
    if (!url)
      return "https://thumbs.dreamstime.com/b/person-line-icon-outline-vector-sign-linear-style-pictogram-isolated-white-user-account-member-symbol-logo-illustration-88294009.jpg";

    const match = url.match(/\/file\/d\/([^/]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?id=${match[1]}`;
    }
    return url;
  };

  return (
    <div className="members-page">
      <h1 className="page-title">CLUB MEMBERS</h1>
      <div className="clubs-container">
        {clubs.map((club) => (
          <div key={club.id} className="club-card">
            <div className="club-header">
              <img
                src={club.logo}
                alt={`${club.name} logo`}
                className="club-logo"
              />
              <h2 className="club-name">{club.name}</h2>
            </div>
            <div className="members-grid">
              {club.members.map((member) => (
                <div key={member.id} className="member-item">
                  <div className="member-content">
                    <img
                      src={convertDriveLink(member.imageUrl)}
                      alt={member.name}
                      className="member-image"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://thumbs.dreamstime.com/b/person-line-icon-outline-vector-sign-linear-style-pictogram-isolated-white-user-account-member-symbol-logo-illustration-88294009.jpg";
                      }}
                    />
                    <div className="member-info">
                      <span className="member-name">{member.name}</span>
                      <span className="member-position">{member.position}</span>
                      <span className="member-id">{member.studentId}</span>
                      <span className="member-branch">{member.branch}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Members;

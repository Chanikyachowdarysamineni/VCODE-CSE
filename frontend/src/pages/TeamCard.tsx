import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

interface Participant {
  name: string;
  registrationNo: string;
  year: number;
  section: string;
  img?: string;
}

interface Team {
  _id: string;
  teamNo: number;
  teamName: string;
  problemStatement: string;
  gitHubLink?: string;
  deploedLink?: string;
  status:string;
  participants: Participant[];
}

const problemStatements = [
  "Smart Digital Election & Feedback Platform for Campus Organizations",
  "Student coding Profile Tracker",
  "ClubHub",
  "Lost & Found Portal",
  "AgriCommerce",
  "Study Resource Hub",
  "Digital Complaint & Feedback Portal",
  "Vignan Mid Exam Evaluation",
  'CampusVoice',
  "Waste Management& Recycling Portal"
];

export default function TeamUpdatePage({ user }: { user: Team }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [teamData, setTeamData] = useState<Team>(user);
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false); // 🔄 loading state

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && images.length < 6) {
      const newFiles = Array.from(e.target.files).slice(0, 6 - images.length);
      setImages((prev) => [...prev, ...newFiles]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!teamData) return;

    if (images.length !== 6) {
      toast.error("Please upload exactly 6 participant images.");
      return;
    }

    const formData = new FormData();
    formData.append("teamName", teamData.teamName);
    formData.append("problemStatement", teamData.problemStatement);

    if (teamData.gitHubLink) formData.append("gitHubLink", teamData.gitHubLink);
    if (teamData.deploedLink) formData.append("deploedLink", teamData.deploedLink);

    images.forEach((img) => {
      formData.append("images", img);
    });

    setLoading(true); // 🚀 Start loader
    try {
      const response = await axios.put(
        `https://vcode-m6ni.onrender.com/api/hackathon//${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Team updated successfully!");
      console.log(response.data);
      navigate("/team");
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      const errorResponse = axios.isAxiosError(err) ? err.response?.data?.message : null;
      toast.error(errorResponse || errorMessage || "Error updating team details.");
    } finally {
      setLoading(false); // ✅ Stop loader
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto text-white">
      <Toaster />
      <h1 className="text-2xl font-bold mb-6">Update Team: {teamData.teamName}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Team Name *</label>
          <input
            type="text"
            value={teamData.teamName}
            onChange={(e) => setTeamData({ ...teamData, teamName: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>

       
        <div>
          <label>Problem Statement *</label>
          <select
            value={teamData.problemStatement}
            onChange={(e) =>
              setTeamData({ ...teamData, problemStatement: e.target.value })
            }
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          >
            <option value="">Select Problem Statement</option>
            {problemStatements.map((ps) => (
              <option key={ps} value={ps}>
                {ps}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>GitHub Link (optional)</label>
          <input
            type="url"
            value={teamData.gitHubLink || ""}
            onChange={(e) => setTeamData({ ...teamData, gitHubLink: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>

        <div>
          <label>Deployed Link (optional)</label>
          <input
            type="url"
            value={teamData.deploedLink || ""}
            onChange={(e) => setTeamData({ ...teamData, deploedLink: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>

        <div>
          <label>Upload Participant Images (6 required)</label>
          <div className="mb-2 text-sm text-gray-300">Uploaded: {images.length}/6</div>
          {images.length < 6 && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          )}
          <div className="flex flex-wrap gap-2 mt-2">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="w-16 h-16 rounded overflow-hidden border border-gray-600"
              >
                <img
                  src={URL.createObjectURL(img)}
                  alt={`preview-${idx}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 w-full py-2 rounded font-semibold flex justify-center items-center gap-2 disabled:opacity-60"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Updating...
            </>
          ) : (
            "Update Team"
          )}
        </button>
      </form>
    </div>
  );
}

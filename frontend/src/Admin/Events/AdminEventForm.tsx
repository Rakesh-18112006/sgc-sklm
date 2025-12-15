import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Upload,
  Calendar,
  Clock,
  Tag,
  Image as ImageIcon,
  Send,
  Building2,
  FileText,
  Users,
  Link as LinkIcon,
} from "lucide-react";

// Import club icons
import competative from "../../assets/clubimgs/competative.webp";
import coding from "../../assets/clubimgs/coding.webp";
import dp from "../../assets/clubimgs/photography.webp";
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

interface FormData {
  title: string;
  description: string;
  date: string;
  time: string;
  status: "upcoming";
  club: { name: string; icon: string };
  registrationLink: string;
}

const AdminEventForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    date: "",
    time: "",
    status: "upcoming",
    club: { name: "", icon: "" },
    registrationLink: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const clubs = [
    { name: "Competitive Club", icon: competative },
    { name: "Coding Club", icon: coding },
    { name: "Electronics Club", icon: electronics },
    { name: "Arts & Crafts Club", icon: arts },
    { name: "Cultural & Choreography Club", icon: cc },
    { name: "Studio Club", icon: dp },
    { name: "Internship & Career Opportunities Club", icon: internship },
    { name: "Startup Club", icon: startup },
    { name: "Higher Education Club", icon: he },
    { name: "Sports and Games Club", icon: sports },
    { name: "Eco Club", icon: eco },
    { name: "Lecture Series Club", icon: ls },
    { name: "Linguistic & Personality Development Club", icon: linquistic },
    { name: "Research Club", icon: startup },
    { name: "Finance Club", icon: Finance },
    { name: "Robotics Club", icon: robotics },
    { name: "Yoga Club", icon: yoga },
  ];

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.title.trim()) errors.title = "Event title is required";
    if (formData.title.length > 100)
      errors.title = "Title should not exceed 100 characters";
    if (!formData.description.trim())
      errors.description = "Event description is required";
    if (formData.description.length < 50)
      errors.description = "Description should be at least 50 characters";
    if (!formData.date) errors.date = "Event date is required";
    if (!formData.time) errors.time = "Event time is required";
    if (!formData.club.name) errors.club = "Please select a club";
    if (!image) errors.image = "Event image is required";
    
    // Registration link is now mandatory
    if (!formData.registrationLink.trim()) {
      errors.registrationLink = "Registration form link is required";
    } else if (!isValidUrl(formData.registrationLink)) {
      errors.registrationLink = "Please enter a valid URL (e.g., https://forms.google.com/...)";
    }

    if (formData.date) {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) errors.date = "Date cannot be in the past";
    }

    return errors;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "clubName") {
      const selectedClub = clubs.find((club) => club.name === value);
      if (selectedClub) {
        setFormData((prev) => ({
          ...prev,
          club: { name: selectedClub.name, icon: selectedClub.icon },
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file (PNG, JPG, JPEG)");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setImage(file);
      setFormErrors((prev) => ({ ...prev, image: "" }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      Object.values(errors).forEach((error) => toast.error(error));
      return;
    }

    if (!image) {
      toast.error("Please select an event image");
      return;
    }

    const payload = new FormData();
  payload.append("title", formData.title);
  payload.append("description", formData.description);
  payload.append("date", formData.date);
  payload.append("time", formData.time);
  payload.append("status", formData.status);
  payload.append("club", JSON.stringify(formData.club));
  payload.append("registrationLink", formData.registrationLink); // Already here
  payload.append("image", image);

    try {
      setSubmitting(true);

      await axios.post(`https://sgc-sklm-01.onrender.com/api/events`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Event created successfully!", {
        description: `${formData.title} has been published.`,
        duration: 4000,
      });

      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        status: "upcoming",
        club: { name: "", icon: "" },
        registrationLink: "",
      });
      setImage(null);
      setImagePreview(null);
      setFormErrors({});
    } catch (err: any) {
      console.error("Error posting event:", err);
      toast.error("Failed to create event", {
        description: err.response?.data?.message || "Please try again.",
        duration: 5000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Inline styles object with proper CSSProperties typing
  const styles = {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(to bottom, #f9fafb 0%, #f3f4f6 100%)",
      padding: "2rem 1rem",
    } as React.CSSProperties,
    container: {
      maxWidth: "56rem",
      margin: "0 auto",
    } as React.CSSProperties,
    headerCard: {
      background: "#ffffff",
      borderRadius: "1rem",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      border: "1px solid #e5e7eb",
      overflow: "hidden",
      marginBottom: "2rem",
    } as React.CSSProperties,
    headerGradient: {
      background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
      padding: "1.5rem 2rem",
    } as React.CSSProperties,
    headerContent: {
      padding: "1.5rem 2rem",
    } as React.CSSProperties,
    formCard: {
      background: "#ffffff",
      borderRadius: "1rem",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
      border: "1px solid #e5e7eb",
      padding: "1.5rem",
      marginBottom: "1.5rem",
    } as React.CSSProperties,
    input: {
      width: "100%",
      padding: "0.75rem 1rem",
      borderRadius: "0.5rem",
      border: "1px solid #d1d5db",
      fontSize: "0.875rem",
      outline: "none",
      transition: "all 0.2s",
    } as React.CSSProperties,
    inputError: {
      borderColor: "#ef4444",
      backgroundColor: "#fef2f2",
    } as React.CSSProperties,
    inputFocus: {
      borderColor: "#3b82f6",
      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
    } as React.CSSProperties,
    textarea: {
      width: "100%",
      padding: "0.75rem 1rem",
      borderRadius: "0.5rem",
      border: "1px solid #d1d5db",
      fontSize: "0.875rem",
      minHeight: "120px",
      resize: "vertical" as "vertical",
      outline: "none",
      transition: "all 0.2s",
    } as React.CSSProperties,
    select: {
      width: "100%",
      padding: "0.75rem 1rem",
      borderRadius: "0.5rem",
      border: "1px solid #d1d5db",
      fontSize: "0.875rem",
      backgroundColor: "#ffffff",
      outline: "none",
      transition: "all 0.2s",
    } as React.CSSProperties,
    button: {
      background: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
      color: "#ffffff",
      padding: "0.75rem 2rem",
      borderRadius: "0.5rem",
      border: "none",
      fontWeight: "600",
      fontSize: "0.875rem",
      cursor: "pointer",
      transition: "all 0.2s",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
    } as React.CSSProperties,
    buttonHover: {
      background: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)",
      boxShadow: "0 4px 12px rgba(30, 64, 175, 0.3)",
    } as React.CSSProperties,
    buttonDisabled: {
      opacity: "0.5",
      cursor: "not-allowed",
    } as React.CSSProperties,
    label: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontWeight: "600",
      fontSize: "0.875rem",
      color: "#374151",
      marginBottom: "0.5rem",
    } as React.CSSProperties,
    errorText: {
      color: "#ef4444",
      fontSize: "0.75rem",
      marginTop: "0.25rem",
    } as React.CSSProperties,
    gridContainer: {
      display: "grid",
      gap: "1rem",
    } as React.CSSProperties,
    fileUpload: {
      border: "2px dashed #d1d5db",
      borderRadius: "0.75rem",
      padding: "2rem",
      textAlign: "center" as "center",
      cursor: "pointer",
      transition: "all 0.2s",
    } as React.CSSProperties,
    fileUploadHover: {
      borderColor: "#3b82f6",
      backgroundColor: "#f0f9ff",
    } as React.CSSProperties,
    previewImage: {
      width: "100%",
      height: "16rem",
      objectFit: "cover" as "cover",
      borderRadius: "0.5rem",
    } as React.CSSProperties,
    spinner: {
      width: "1.25rem",
      height: "1.25rem",
      border: "2px solid rgba(255, 255, 255, 0.3)",
      borderTopColor: "#ffffff",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    } as React.CSSProperties,
  };

  return (
    <div style={styles.page}>
      <motion.div
        style={styles.container}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div style={styles.headerCard}>
          <div style={styles.headerGradient}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{
                background: "rgba(255, 255, 255, 0.1)",
                padding: "0.75rem",
                borderRadius: "0.75rem",
                backdropFilter: "blur(8px)",
              } as React.CSSProperties}>
                <Building2 style={{ width: "2rem", height: "2rem", color: "#ffffff" }} />
              </div>
              <div>
                <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#ffffff", margin: 0 }}>
                  SGC Event Management System
                </h1>
                <p style={{ color: "#bfdbfe", marginTop: "0.25rem", margin: 0 }}>
                  Create new official campus events
                </p>
              </div>
            </div>
          </div>

          <div style={styles.headerContent}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <div style={{ background: "#dbeafe", padding: "0.5rem", borderRadius: "0.5rem" }}>
                <Send style={{ width: "1.25rem", height: "1.25rem", color: "#1d4ed8" }} />
              </div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1f2937", margin: 0 }}>
                Create New Event
              </h2>
            </div>
            <p style={{ color: "#6b7280", margin: 0 }}>
              Fill in all required details to publish an official campus event
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" } as React.CSSProperties}>
          {/* Event Title & Club */}
          <div style={{ ...styles.gridContainer, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" } as React.CSSProperties}>
            <div style={styles.formCard}>
              <label style={styles.label}>
                <Tag style={{ width: "1rem", height: "1rem", color: "#2563eb" }} />
                <span>Event Title *</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter official event title"
                style={{
                  ...styles.input,
                  ...(formErrors.title && styles.inputError),
                }}
                maxLength={100}
              />
              {formErrors.title && (
                <p style={styles.errorText}>{formErrors.title}</p>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>Official event name</span>
                <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>{formData.title.length}/100</span>
              </div>
            </div>

            <div style={styles.formCard}>
              <label style={styles.label}>
                <Users style={{ width: "1rem", height: "1rem", color: "#2563eb" }} />
                <span>Organizing Club *</span>
              </label>
              <select
                name="clubName"
                value={formData.club.name}
                onChange={handleChange}
                style={{
                  ...styles.select,
                  ...(formErrors.club && styles.inputError),
                }}
              >
                <option value="">Select organizing club...</option>
                {clubs.map((club, index) => (
                  <option key={index} value={club.name}>
                    {club.name}
                  </option>
                ))}
              </select>
              {formErrors.club && (
                <p style={styles.errorText}>{formErrors.club}</p>
              )}
              {formData.club.icon && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "1rem", padding: "0.75rem", background: "#f9fafb", borderRadius: "0.5rem" }}>
                  <img
                    src={formData.club.icon}
                    alt="Club Icon"
                    style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.5rem", objectFit: "cover" as "cover", border: "1px solid #d1d5db" }}
                  />
                  <span style={{ fontSize: "0.875rem", fontWeight: "500", color: "#374151" }}>
                    {formData.club.name}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Event Description */}
          <div style={styles.formCard}>
            <label style={styles.label}>
              <FileText style={{ width: "1rem", height: "1rem", color: "#2563eb" }} />
              <span>Event Description *</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide detailed description about the event, objectives, and important information..."
              style={{
                ...styles.textarea,
                ...(formErrors.description && styles.inputError),
              }}
              rows={4}
              maxLength={500}
            />
            {formErrors.description && (
              <p style={styles.errorText}>{formErrors.description}</p>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" } as React.CSSProperties}>
              <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>Detailed official description</span>
              <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>{formData.description.length}/500</span>
            </div>
          </div>

          {/* Date, Time, and Registration Link */}
          <div style={{ ...styles.gridContainer, gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" } as React.CSSProperties}>
            <div style={styles.formCard}>
              <label style={styles.label}>
                <Calendar style={{ width: "1rem", height: "1rem", color: "#2563eb" }} />
                <span>Date *</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(formErrors.date && styles.inputError),
                }}
              />
              {formErrors.date && (
                <p style={styles.errorText}>{formErrors.date}</p>
              )}
            </div>

            <div style={styles.formCard}>
              <label style={styles.label}>
                <Clock style={{ width: "1rem", height: "1rem", color: "#2563eb" }} />
                <span>Time *</span>
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(formErrors.time && styles.inputError),
                }}
              />
              {formErrors.time && (
                <p style={styles.errorText}>{formErrors.time}</p>
              )}
            </div>

            <div style={styles.formCard}>
              <label style={styles.label}>
                <LinkIcon style={{ width: "1rem", height: "1rem", color: "#2563eb" }} />
                <span>Registration Form Link *</span>
              </label>
              <input
                type="url"
                name="registrationLink"
                value={formData.registrationLink}
                onChange={handleChange}
                placeholder="https://forms.google.com/..."
                style={{
                  ...styles.input,
                  ...(formErrors.registrationLink && styles.inputError),
                }}
              />
              {formErrors.registrationLink && (
                <p style={styles.errorText}>{formErrors.registrationLink}</p>
              )}
              <div style={{ marginTop: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                  Google Forms, Microsoft Forms, or custom registration page
                </span>
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div style={styles.formCard}>
            <label style={styles.label}>
              <ImageIcon style={{ width: "1rem", height: "1rem", color: "#2563eb" }} />
              <span>Event Image *</span>
              <span style={{ fontSize: "0.75rem", fontWeight: "normal", color: "#6b7280" } as React.CSSProperties}>
                (PNG, JPG up to 5MB)
              </span>
            </label>

            {imagePreview ? (
              <div style={{ position: "relative", borderRadius: "0.75rem", overflow: "hidden", border: "1px solid #d1d5db" } as React.CSSProperties}>
                <img
                  src={imagePreview}
                  alt="Event Preview"
                  style={styles.previewImage}
                />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setImagePreview(null);
                  }}
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    background: "#dc2626",
                    color: "#ffffff",
                    padding: "0.5rem",
                    borderRadius: "50%",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  } as React.CSSProperties}
                >
                  <Upload style={{ width: "1rem", height: "1rem" }} />
                </button>
              </div>
            ) : (
              <div
                style={{
                  ...styles.fileUpload,
                  ...(formErrors.image ? {
                    borderColor: "#ef4444",
                    backgroundColor: "#fef2f2",
                  } : {}),
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  id="event-image"
                />
                <label htmlFor="event-image" style={{ cursor: "pointer" } as React.CSSProperties}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" } as React.CSSProperties}>
                    <div style={{ background: "#dbeafe", padding: "1rem", borderRadius: "50%" }}>
                      <Upload style={{ width: "2rem", height: "2rem", color: "#2563eb" }} />
                    </div>
                    <div>
                      <p style={{ color: "#374151", fontWeight: "500", margin: 0 } as React.CSSProperties}>
                        Click to upload event image
                      </p>
                      <p style={{ fontSize: "0.875rem", color: "#6b7280", marginTop: "0.25rem", margin: 0 } as React.CSSProperties}>
                        Recommended: 1200x600 pixels
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            )}
            {formErrors.image && (
              <p style={styles.errorText}>{formErrors.image}</p>
            )}
          </div>

          {/* Submit Button */}
          <div style={styles.formCard}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "space-between",
            } as React.CSSProperties}>
              <div style={{ textAlign: "center" } as React.CSSProperties}>
                <p style={{ fontSize: "0.875rem", color: "#6b7280", margin: 0 } as React.CSSProperties}>
                  <span style={{ fontWeight: "600" }}>Note:</span> All events will be published as "Upcoming"
                </p>
                <p style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.25rem", margin: 0 } as React.CSSProperties}>
                  Status can be updated later through Edit Event section
                </p>
              </div>

              <motion.button
                type="submit"
                style={{
                  ...styles.button,
                  ...(submitting && styles.buttonDisabled),
                  minWidth: "200px",
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={submitting}
              >
                {submitting ? (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" } as React.CSSProperties}>
                    <div style={styles.spinner}></div>
                    <span>Publishing...</span>
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" } as React.CSSProperties}>
                    <Send style={{ width: "1.25rem", height: "1.25rem" }} />
                    <span>Publish Official Event</span>
                  </div>
                )}
              </motion.button>
            </div>
          </div>
        </form>

        {/* Footer Note */}
        <div style={{ marginTop: "2rem", textAlign: "center" } as React.CSSProperties}>
          <p style={{ fontSize: "0.875rem", color: "#6b7280", margin: 0 } as React.CSSProperties}>
            This is an official government portal. All events will be reviewed
            and published as per government guidelines.
          </p>
          <p style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.5rem", margin: 0 } as React.CSSProperties}>
            © {new Date().getFullYear()} Government Event Management System. All
            rights reserved.
          </p>
        </div>
      </motion.div>

      {/* Add CSS animation for spinner */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 640px) {
          .responsive-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminEventForm;
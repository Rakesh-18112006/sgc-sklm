import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  Calendar, 
  Clock, 
  Tag, 
  Image as ImageIcon,
  Send,
  CheckCircle,
  XCircle,
  Info,
  AlertCircle
} from "lucide-react";
import styles from "./AdminEventForm.module.css";

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
  status: "upcoming" | "completed";
  club: { name: string; icon: string };
}

const AdminEventForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    date: "",
    time: "",
    status: "upcoming",
    club: { name: "", icon: "" },
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const clubs = [
    { name: "Competitive Club", icon: competative, color: "#FF6B6B" },
    { name: "Coding Club", icon: coding, color: "#4ECDC4" },
    { name: "Electronics Club", icon: electronics, color: "#FFD166" },
    { name: "Arts & Crafts Club", icon: arts, color: "#EF476F" },
    { name: "Cultural & Choreography Club", icon: cc, color: "#06D6A0" },
    { name: "Studio Club", icon: dp, color: "#118AB2" },
    { name: "Internship & Career Opportunities Club", icon: internship, color: "#073B4C" },
    { name: "Startup Club", icon: startup, color: "#7209B7" },
    { name: "Higher Education Club", icon: he, color: "#F3722C" },
    { name: "Sports and Games Club", icon: sports, color: "#43AA8B" },
    { name: "Eco Club", icon: eco, color: "#90BE6D" },
    { name: "Lecture Series Club", icon: ls, color: "#F8961E" },
    { name: "Linguistic & Personality Development Club", icon: linquistic, color: "#577590" },
    { name: "Research Club", icon: startup, color: "#277DA1" },
    { name: "Finance Club", icon: Finance, color: "#4D908E" },
    { name: "Robotics Club", icon: robotics, color: "#F94144" },
    { name: "Yoga Club", icon: yoga, color: "#90BE6D" },
  ];

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.title.trim()) errors.title = "Title is required";
    if (formData.title.length > 100) errors.title = "Title is too long (max 100 chars)";
    if (!formData.description.trim()) errors.description = "Description is required";
    if (formData.description.length < 50) errors.description = "Description should be at least 50 characters";
    if (!formData.date) errors.date = "Date is required";
    if (!formData.time) errors.time = "Time is required";
    if (!formData.club.name) errors.club = "Please select a club";
    if (!image) errors.image = "Please select an event image";
    
    // Validate future date
    if (formData.date) {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) errors.date = "Date cannot be in the past";
    }

    return errors;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormErrors(prev => ({ ...prev, [name]: "" }));

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
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError("Please select an image file");
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }

      setImage(file);
      setError(null);
      setFormErrors(prev => ({ ...prev, image: "" }));
      
      // Create preview
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
      return;
    }

    if (!image) {
      setError("Please select an event image");
      return;
    }

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    payload.append("date", formData.date);
    payload.append("time", formData.time);
    payload.append("status", formData.status);
    payload.append("club", JSON.stringify(formData.club));
    payload.append("image", image);

    try {
      setSubmitting(true);
      setError(null);
      
      await axios.post(`http://localhost:5000/api/events`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          title: "",
          description: "",
          date: "",
          time: "",
          status: "upcoming",
          club: { name: "", icon: "" },
        });
        setImage(null);
        setImagePreview(null);
        setSuccess(false);
      }, 2000);

    } catch (err: any) {
      console.error("Error posting event:", err);
      setError(err.response?.data?.message || "Failed to post event. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      className={styles.formContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <Send size={24} />
        </div>
        <div>
          <h2 className={styles.heading}>Create New Event</h2>
          <p className={styles.subtitle}>Fill in the details to announce a new campus event</p>
        </div>
      </div>

      <AnimatePresence>
        {success && (
          <motion.div
            className={styles.successAlert}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <CheckCircle size={20} />
            <span>Event posted successfully!</span>
          </motion.div>
        )}

        {error && (
          <motion.div
            className={styles.errorAlert}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <AlertCircle size={20} />
            <span>{error}</span>
            <button onClick={() => setError(null)} className={styles.alertClose}>
              <XCircle size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Event Title */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <Tag size={18} />
            Event Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter event title..."
            className={`${styles.input} ${formErrors.title ? styles.inputError : ''}`}
            maxLength={100}
          />
          {formErrors.title && (
            <span className={styles.errorText}>{formErrors.title}</span>
          )}
          <div className={styles.charCount}>
            {formData.title.length}/100
          </div>
        </div>

        {/* Event Description */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <Info size={18} />
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the event in detail..."
            className={`${styles.textarea} ${formErrors.description ? styles.inputError : ''}`}
            rows={4}
            maxLength={500}
          />
          {formErrors.description && (
            <span className={styles.errorText}>{formErrors.description}</span>
          )}
          <div className={styles.charCount}>
            {formData.description.length}/500
          </div>
        </div>

        {/* Date & Time */}
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              <Calendar size={18} />
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`${styles.input} ${formErrors.date ? styles.inputError : ''}`}
            />
            {formErrors.date && (
              <span className={styles.errorText}>{formErrors.date}</span>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              <Clock size={18} />
              Time
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={`${styles.input} ${formErrors.time ? styles.inputError : ''}`}
            />
            {formErrors.time && (
              <span className={styles.errorText}>{formErrors.time}</span>
            )}
          </div>
        </div>

        {/* Club Selection */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <Tag size={18} />
            Club
          </label>
          <div className={styles.clubSelectorContainer}>
            <select
              name="clubName"
              value={formData.club.name}
              onChange={handleChange}
              className={`${styles.select} ${formErrors.club ? styles.inputError : ''}`}
            >
              <option value="">Select a club...</option>
              {clubs.map((club, index) => (
                <option key={index} value={club.name}>
                  {club.name}
                </option>
              ))}
            </select>
            
            {formData.club.icon && (
              <div className={styles.clubPreview}>
                <img
                  src={formData.club.icon}
                  alt="Club Icon"
                  className={styles.clubIcon}
                />
                <span className={styles.clubName}>{formData.club.name}</span>
              </div>
            )}
          </div>
          {formErrors.club && (
            <span className={styles.errorText}>{formErrors.club}</span>
          )}
        </div>

        {/* Status */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>Event Status</label>
          <div className={styles.statusToggle}>
            <button
              type="button"
              className={`${styles.statusButton} ${formData.status === 'upcoming' ? styles.statusActive : ''}`}
              onClick={() => setFormData(prev => ({ ...prev, status: 'upcoming' }))}
            >
              Upcoming
            </button>
            <button
              type="button"
              className={`${styles.statusButton} ${formData.status === 'completed' ? styles.statusActive : ''}`}
              onClick={() => setFormData(prev => ({ ...prev, status: 'completed' }))}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Image Upload */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <ImageIcon size={18} />
            Event Image
          </label>
          
          {imagePreview ? (
            <div className={styles.imagePreviewContainer}>
              <img
                src={imagePreview}
                alt="Preview"
                className={styles.imagePreview}
              />
              <button
                type="button"
                onClick={() => {
                  setImage(null);
                  setImagePreview(null);
                }}
                className={styles.removeImageBtn}
              >
                <XCircle size={20} />
              </button>
            </div>
          ) : (
            <div className={`${styles.fileUploadArea} ${formErrors.image ? styles.inputError : ''}`}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={styles.fileInput}
                id="event-image"
              />
              <label htmlFor="event-image" className={styles.fileUploadLabel}>
                <Upload size={24} />
                <span>Click to upload event image</span>
                <span className={styles.fileHint}>PNG, JPG up to 5MB</span>
              </label>
            </div>
          )}
          
          {formErrors.image && (
            <span className={styles.errorText}>{formErrors.image}</span>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className={styles.submitBtn}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={submitting}
        >
          {submitting ? (
            <>
              <div className={styles.spinner}></div>
              Publishing Event...
            </>
          ) : (
            <>
              <Send size={18} />
              Publish Event
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AdminEventForm;
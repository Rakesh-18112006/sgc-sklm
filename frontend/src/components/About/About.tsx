import React from 'react';
import './About.css';
import { motion } from 'framer-motion';
import chairman from "../../assets/advisoryBoardimgs/chairman.webp"
const About = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="hero-content"
        >
          <motion.div variants={fadeInUp}>
            <h1 className="hero-title">About Our <span>SGC</span></h1>
          </motion.div>
          <motion.div variants={fadeInUp}>
            {/* <h2 className="hero-subtitle">Students' Gymkhana Center</h2> */}
          </motion.div>
          <motion.div variants={fadeInUp}>
            <div className="hero-divider"></div>
          </motion.div>
          <motion.p variants={fadeInUp} className="hero-text">
            "The Vibrant Role of the Students' Gymkhana Centre (SGC), in the heart of our campus community..."
          </motion.p>
        </motion.div>
        
        {/* Animated Background Elements */}
        <div className="hero-circle-1"></div>
        <div className="hero-circle-2"></div>
      </section>

      {/* Director Section */}
      <section className="director-section">
        <div className="container reverse">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            viewport={{ once: true, margin: "-100px" }}
            className="director-image"
          >
            <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjDsx5yLHbg7quYPl9zu_OHZPIZG2fHS4k9wWsiDp1BsroJDKA3WH2UJr7R4g7M2YAC9eN78PNwn28bE8Eh_Xb3CSdBUmrT5ADa5pTWT_VzhtZ2Y36ER0hM8JN7IRRAKdYh9GrxP1hL8MVs_In3iP8-VyMUzfUngmK2EDiFyZKdWIsb_rwfO_i8DNIuszf3/s320/director.jpg" alt="Director" />
            <div className="image-overlay"></div>
            <div className="image-border"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            viewport={{ once: true, margin: "-100px" }}
            className="director-content"
          >
            <motion.h2 
              whileHover={{ color: 'var(--accent-color)' }}
              className="section-title"
            >
              Message from the Director
            </motion.h2>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="position-tag"
            >
              Director
            </motion.div>
            <motion.blockquote
              whileHover={{ borderLeftColor: 'var(--accent-color)' }}
            >
              I am delighted to share my thoughts on the pivotal
role of the Students' Gymkhana Center (SGC) in
fostering both curricular and extracurricular
activities. Our commitment to balancing academics
with a diverse array of activities is a cornerstone of
our educational philosophy, ensuring the “holistic
development of the students”.
The SGC stands as a testament to our dedication to
creating a comprehensive development platform.
Through the technical wing, cultural wing, and
sports wing, we provide numerous opportunities for
students to explore their interests, develop their
talents, and grow as individuals. These activities are integral to nurturing well-rounded individuals
who are prepared to face the challenges of the future.
Our aim is to cultivate essential skills among our students, such as leadership, communication,
negotiation, and other vital soft skills. These competencies are indispensable in today's dynamic
world, equipping our graduates with the tools they need to succeed in their personal and
professional endeavors.
As we embark on another academic year, I extend my heartfelt congratulations and best wishes to
the newly elected executive body of the SGC.
Together, let us create an enriching environment where every student can thrive and reach their
fullest potential.
            </motion.blockquote>
            <motion.p
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
            >
              The SGC stands as a testament to our dedication to creating a comprehensive development platform...
            </motion.p>
            <motion.div 
              className="signature"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="name">Prof. K. V. G. D. Balaji</p>
              <p className="position">Director</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Chairman Section */}
      <section className="chairman-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            viewport={{ once: true, margin: "-100px" }}
            className="chairman-image"
          >
            <img src={chairman} alt="Chairman" />
            <div className="image-overlay"></div>
            <div className="image-border"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            viewport={{ once: true, margin: "-100px" }}
            className="chairman-content"
          >
            <motion.h2 
              whileHover={{ color: 'var(--tertiary-color)' }}
              className="section-title"
            >
              From the Chairman's Desk
            </motion.h2>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="position-tag"
            >
              Chairman, SGC
            </motion.div>
            <motion.p
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
            >
              The Vibrant Role of the Students' Gymkhana Centre
(SGC), in the heart of our campus community lies a
hub of extra curricular and co - curricular activities.
The Students' Gymkhana Centre (SGC) stands as a
testament to the dedication and passion for nurturing
students' holistic development with a rich background
in student development. The Chairman brings wealth
of experience to the table, having co-founded the
Student Development Campus Activities Cell
(SDCAC) at RGUKT Nuzvid in 2013, earlier it was a
tiny platform for technical events and now evolved
into a huge castle for technical fests, later establishing
the Students' Gymkhana Centre (SGC) at RGUKT-
Srikakulam in 2022.
His vision is clear: To empower students across diverse interests, providing them with a platform
to explore, grow, and excel. At the heart of the SGC are 19 dynamic student clubs, ranging from
Arts & Crafts to Robotics, each offering a unique avenue for students to pursue their passions
and interests. Beyond mere extracurricular pursuits, the SGC fosters leadership development,
skill acquisition, and meaningful social interaction, ensuring that students thrive both inside and
outside the classroom. Central to the SGC's mandate is advocating for students' welfare and
representing their interests in extracurricular matters. By fostering collaboration with the
university administration, the SGC continually enhances the overall student experience,
enriching campus life for all.
Looking ahead, the SGC envisions a campus buzzing with activity – from tech fests to cultural
extravaganzas, workshops to conferences. Through their enthusiastic involvement, students
under the auspices of the SGC are poised to shape the academic and cultural landscape of
RGUKT - AP Srikakulam, leaving an indelible mark on the institution's ethos and legacy. In the
spirit of empowerment and enrichment, let us embrace the opportunities that the SGC offers,
forging lifelong connections and memories that will last a life time.
            </motion.p>
            <motion.p
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
            >
              My vision is clear: to empower students across diverse interests...
            </motion.p>
            <motion.div 
              className="signature"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="name">Dr.Ravi Gedela </p>
              <p>M.Sc , M.Tech (IIT G) (Ph.D IIT G)</p>
              <p className="position">Chairman, SGC</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="vision-section"
      >
        <div className="container">
          <motion.h2 
            className="section-title center"
            whileHover={{ scale: 1.05 }}
          >
            Our Vision
          </motion.h2>
          <motion.p 
            className="vision-text"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.1 }}
          >
            Beyond extracurricular pursuits, the SGC fosters leadership development...
          </motion.p>
          <motion.p 
            className="vision-text"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
          >
            Through enthusiastic involvement, students under SGC are shaping...
          </motion.p>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
import Appointment from "./Appointment";
import styles from "./styles/Contact.module.css";

function Contact() {
  return (
    <section className={styles.contact} id="contact">
      <div className={styles.container}>
        <h2 className={styles.title}>Book an Appointment</h2>
        <p className={styles.subtitle}>
          Fill in the form below and our team will confirm your appointment.
        </p>

        <Appointment />

        <div className={styles.info}>
          <div className={styles.card}>
            <h3>Free Consultation</h3>
            <p>Call us anytime for a free consultation</p>
            <a href="tel:+911800123456" className={styles.link}>
              1800-123-456 (Toll Free)
            </a>
          </div>

          <div className={styles.card}>
            <h3>Email Us</h3>
            <p>Have any doubts? Write to us</p>
            <a href="mailto:care@yourhospital.com" className={styles.link}>
              care@yourhospital.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
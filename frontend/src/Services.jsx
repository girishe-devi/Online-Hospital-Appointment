import style from './styles/Services.module.css'

export default function Services() {

    const services = [
        {
            icon: "📅",
            title: "Online Appointments",
            description: "Book a visit with your preferred doctor in a few clicks, anytime and from any device.",
        },
        {
            icon: "🚑",
            title: "24/7 Emergency Care",
            description: "Round-the-clock emergency and ambulance services with a fast-response medical team.",
        },
        {
            icon: "🧪",
            title: "Diagnostic & Lab Tests",
            description: "Accurate blood tests, imaging, and scans with quick digital reports.",
        },
        {
            icon: "💊",
            title: "Pharmacy",
            description: "An in-house pharmacy stocked with genuine medicines, open all day.",
        },
        {
            icon: "💻",
            title: "Online Consultation",
            description: "Talk to specialists through video or chat from the comfort of your home.",
        },
        {
            icon: "🏥",
            title: "Health Checkup Packages",
            description: "Complete preventive health packages for individuals, families, and seniors.",
        },
    ]

    const achievements = [
        {
            icon: "🏆",
            title: "Best Multi-Specialty Hospital",
            description: "Recognized for excellence in patient care and clinical outcomes.",
        },
        {
            icon: "⭐",
            title: "98% Patient Satisfaction",
            description: "Consistently rated highly by patients for treatment and hospitality.",
        },
        {
            icon: "🔬",
            title: "Advanced Medical Technology",
            description: "Equipped with modern diagnostic and surgical equipment.",
        },
        {
            icon: "✅",
            title: "Quality Accredited",
            description: "Certified for meeting national healthcare quality and safety standards.",
        },
    ]

    return <>
        <section className={style.services}>

            {/* Services */}
            <div className={style.header}>
                <h2>Our Services</h2>
                <p>
                    We offer a wide range of healthcare services designed to make
                    your treatment smooth, safe, and stress-free.
                </p>
            </div>

            <div className={style.serviceGrid}>
                {services.map((item, index) => (
                    <div className={style.serviceCard} key={index}>
                        <span className={style.icon}>{item.icon}</span>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>

            {/* Achievements */}
            <div className={style.achievementSection}>
                <h2>Our Achievements</h2>

                <div className={style.achievementGrid}>
                    {achievements.map((item, index) => (
                        <div className={style.achievementCard} key={index}>
                            <span className={style.achIcon}>{item.icon}</span>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    </>
}
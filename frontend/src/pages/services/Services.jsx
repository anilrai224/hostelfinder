import React from 'react';
import './Services.css'

const Services = () => {
  // Sample service data
  const serviceData = [
    {
      title: "Hostel Search",
      description: "Search and find hostels that match your preferences.",
      icon: "🏠"
    },
    {
      title: "Hostel Listing",
      description: "List your hostel on our platform and reach more students.",
      icon: "✍️"
    },
    {
      title: "Contact Hostel Owners",
      description: "Easily get in touch with hostel owners for inquiries.",
      icon: "📞"
    },
    {
      title: "User Accounts",
      description: "Create an account to save your favorite hostels and more.",
      icon: "👤"
    }
  ];

  return (
    <div className="services-container">
      <h1>Our Services</h1>
      <div className="service-list">
        {serviceData.map((service, index) => (
          <div key={index} className="service">
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;

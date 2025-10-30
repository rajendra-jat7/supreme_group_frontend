"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [animation, setAnimation] = useState("animate__bounceInUp");

  const inputBase =
    "text-white placeholder:text-white placeholder:text-opacity-90 placeholder:font-light font-normal md:font-semibold bg-transparent border-b-2 border-solid rounded-none py-2 pr-2 w-full text-base lg:text-xl border-white border-opacity-40 transition-all duration-200 tracking-wide ease-in-out focus-visible:outline-none focus-visible:border-white";

  const getInputClass = (field) =>
    `${inputBase} ${errors[field] ? "border-red-400" : ""}`;

  const informationArray = useMemo(
    () => [
      { label: "Address", value: "110, 16th Road Chembur, Mumbai - 400071" },
      { label: "Phone", value: "+91 22 25208822" },
      { label: "Email", value: "info@supremegroup.co.in" },
    ],
    []
  );

  const triggerToast = useCallback(() => {
    setShowModal(true);
    setAnimation("animate__bounceInUp");

    const dismissTimeout = setTimeout(() => {
      setAnimation("animate__bounceOutDown");
      setTimeout(() => setShowModal(false), 500);
    }, 2500);

    return () => clearTimeout(dismissTimeout);
  }, []);

  const validate = useCallback(() => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid Email Address";
    if (!formData.company.trim()) newErrors.company = "Company is required";
    return newErrors;
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      triggerToast();
      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
      });
    }
  };

  return (
    <section className="bg-[#0067B1] text-white px-[15%] py-[10%]">
      <div className="max-w-[1362px] grid lg:grid-cols-2 lg:gap-5 gap-10">
        {/* Contact Info */}
        <div className="order-2 lg:order-1">
          <h2 className="hidden lg:block text-2xl md:text-5xl font-semibold">
            Get in touch
          </h2>
          <hr className="hidden lg:block h-[2px] w-12 bg-white my-3 md:my-5" />
          <p className="text-base md:text-2xl font-normal mb-6">
            For general enquiries
          </p>

          {informationArray.map(({ label, value }) => (
            <div key={label} className="mb-6">
              <div className="text-lg md:text-xl font-medium">{label}:</div>
              <div className="text-sm md:text-xl text-white text-opacity-90">
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="order-1 lg:order-2 w-full grid gap-4 xl:gap-6 2xl:gap-8"
          noValidate
        >
          <h2 className="block lg:hidden text-2xl md:text-5xl font-semibold">
            Get in touch
          </h2>
          <hr className="lg:hidden block h-[2px] w-12 bg-white my-3 md:my-5" />

          {["name", "email", "company"].map((field) => (
            <div key={field}>
              <input
                id={field}
                name={field}
                type={field === "email" ? "email" : "text"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className={getInputClass(field)}
                value={formData[field]}
                onChange={handleChange}
                aria-invalid={!!errors[field]}
                aria-describedby={`${field}-error`}
              />
              {errors[field] && (
                <span
                  id={`${field}-error`}
                  className="text-red-500 text-sm mt-1 block"
                >
                  {errors[field]}
                </span>
              )}
            </div>
          ))}

          <div>
            <textarea
              id="message"
              name="message"
              rows="3"
              placeholder="Message"
              className={inputBase}
              value={formData.message}
              onChange={handleChange}
              aria-label="Your Message"
            ></textarea>
          </div>

          <div className="flex justify-center md:justify-start">
            <button
              type="submit"
              className="w-full lg:w-fit outline-none bg-transparent rounded-full transition-all duration-700 ease-in-out hover:text-black focus:text-black hover:bg-white focus:bg-white text-white font-semibold border border-white text-sm lg:text-base px-8 md:px-12 py-3"
            >
              Send
            </button>
          </div>
        </form>
      </div>

      {/* Toast Notification */}
      {showModal && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <div
            className={`animate__animated ${animation} relative bg-[#0067B1] border-2 border-white text-white px-6 pt-2 pb-4 rounded-lg w-80 max-w-[90%] text-center shadow-lg`}
          >
            <button
              onClick={() => {
                setAnimation("animate__bounceOutDown");
                setTimeout(() => setShowModal(false), 500);
              }}
              className="absolute top-2 right-2 text-white hover:text-black text-xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>
            <p className="mb-4 font-semibold text-lg">
              Form submitted successfully!
            </p>
            <div className="w-full bg-blue-900 rounded-full h-0.5 overflow-hidden">
              <div className="bg-white h-0.5 rounded-full animate-progress-bar" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactForm;

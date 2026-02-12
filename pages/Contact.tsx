import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  canSubmitForm,
  recordSubmission,
  getRemainingTime,
} from "../utils/rateLimit";
import {
  validateEmail,
  validateName,
  validateMessage,
} from "../utils/validation";
import { apiService } from "../services/api";

// WhatsApp Business Number
const WHATSAPP_BUSINESS_NUMBER = "+918886020800";

const Contact: React.FC = () => {
  const location = useLocation();
  const initialProduct = location.state?.productName || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: initialProduct ? `I am interested in the ${initialProduct}.` : "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error" | "rate-limited"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Rate limiting check
    if (!canSubmitForm()) {
      const remainingSeconds = getRemainingTime();
      setStatus("rate-limited");
      setErrorMessage(
        `Please wait ${remainingSeconds} seconds before submitting again.`,
      );
      return;
    }

    // Validation
    if (!validateName(formData.name)) {
      setErrorMessage("Please enter a valid name (2-100 characters)");
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    if (!validateMessage(formData.message)) {
      setErrorMessage("Message must be between 10 and 2000 characters");
      return;
    }

    setStatus("submitting");

    try {
      // Save enquiry to backend
      await apiService.submitEnquiry({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      // Record submission for rate limiting
      recordSubmission();

      // Create WhatsApp message
      const whatsappMessage =
        `*New Contact Form Submission*\n\n` +
        `*Name:* ${formData.name}\n` +
        `*Email:* ${formData.email}\n\n` +
        `*Message:*\n${formData.message}\n\n` +
        `_Sent via Amanat Silver Website_`;

      // Open WhatsApp with pre-filled message
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER.replace(/[^0-9]/g, "")}?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      setStatus("error");
      setErrorMessage("Failed to submit enquiry. Please try again.");
    }
  };

  return (
    <div
      className="bg-stone-50 pt-48 pb-32 min-h-screen relative z-10"
      data-scroll-section
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <div data-scroll data-scroll-speed="0.5">
            <h1 className="text-6xl font-light mb-12 serif tracking-tight gsap-fade-up">
              Initiate a Conversation
            </h1>
            <p className="text-stone-500 font-light leading-relaxed text-lg mb-12 gsap-fade-up">
              Our pieces are often bespoke or produced in limited editions.
              Please use the form to enquire about availability or private
              commissions.
            </p>

            <div className="space-y-12 gsap-fade-up">
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.4em] text-stone-400 mb-4">
                  Contact
                </h4>
                <p className="text-sm font-light leading-loose">
                  amanatyoursilveratelier@gmail.com
                  <br />
                  +91 8886020800
                </p>
              </div>
            </div>
          </div>

          <div
            className="bg-white p-12 shadow-sm"
            data-scroll
            data-scroll-speed="0.3"
          >
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-16 h-[1px] bg-stone-900 mb-8"></div>
                <h2 className="text-3xl serif italic mb-4">Message Prepared</h2>
                <p className="text-stone-400 font-light mb-2">
                  WhatsApp has been opened in a new tab.
                </p>
                <p className="text-stone-500 font-light text-sm mt-6">
                  Our concierge will respond within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-12 text-[10px] uppercase tracking-[0.3em] line-reveal"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder=" "
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border-b border-stone-200 py-4 outline-none focus:border-stone-900 transition-colors bg-transparent peer"
                  />
                  <label className="absolute left-0 top-4 text-[10px] uppercase tracking-[0.3em] text-stone-400 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[8px] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[8px]">
                    Full Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder=" "
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full border-b border-stone-200 py-4 outline-none focus:border-stone-900 transition-colors bg-transparent peer"
                  />
                  <label className="absolute left-0 top-4 text-[10px] uppercase tracking-[0.3em] text-stone-400 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[8px] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[8px]">
                    Email Address
                  </label>
                </div>

                <div className="relative">
                  <textarea
                    rows={4}
                    required
                    placeholder=" "
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full border-b border-stone-200 py-4 outline-none focus:border-stone-900 transition-colors bg-transparent peer resize-none"
                  ></textarea>
                  <label className="absolute left-0 top-4 text-[10px] uppercase tracking-[0.3em] text-stone-400 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[8px] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[8px]">
                    Enquiry Details
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={
                    status === "submitting" || status === "rate-limited"
                  }
                  className="w-full bg-stone-900 text-white py-6 text-[10px] uppercase tracking-[0.5em] hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "submitting"
                    ? "Processing..."
                    : status === "rate-limited"
                      ? "Please Wait..."
                      : "Submit Enquiry"}
                </button>
                {errorMessage && (
                  <p className="text-red-500 text-[10px] uppercase text-center">
                    {errorMessage}
                  </p>
                )}
                {status === "error" && !errorMessage && (
                  <p className="text-red-500 text-[10px] uppercase text-center">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

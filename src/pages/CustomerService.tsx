import React, { useState } from 'react';
import SubmissionForm from '../components/SubmissionForm'; // Double-check this import path matches your folder structure

export default function CustomerService() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔗 The functional Step 4 handler pipeline
  const handleFormSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    // Your exact Google Apps Script backend URL string
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz2WhjeDMngITMSSOVdY-0o5r-U7FcT4gCSHkfRTZOH6eQj4WcGMSOEG0KH_w7SFlz-/exec";

    try {
      // Map properties matching standard application/x-www-form-urlencoded
      const urlParams = new URLSearchParams();
      urlParams.append("fullName", data.full_name);
      urlParams.append("contactNumber", data.contact_number);
      urlParams.append("address", data.complete_address);
      urlParams.append("landmark", data.landmark);
      urlParams.append("accountNumber", data.account_number);
      urlParams.append("accountName", data.account_name);
      urlParams.append("emailAddress", data.email);
      urlParams.append("concerns", data.concerns);
      
      // If a base64 asset payload was processed by the nested attachment input elements
      if (data.fileContent) {
        urlParams.append("fileContent", data.fileContent);
        urlParams.append("filename", data.filename);
      }

      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body: urlParams,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      });

      const result = await response.json();
      
      if (result.status === "success") {
        alert("Success! Your service request entry has been emailed directly to Camarines Norte Water District customer support.");
      } else {
        alert("Server Processing Error: " + result.message);
      }
    } catch (error) {
      console.error("Transmission error:", error);
      alert("Submission failed. Please check your network connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-background p-4 md:p-6 flex flex-col items-center">
      <div className="w-full max-w-xl bg-card border border-border rounded-2xl shadow-xl p-6 mb-10">
        
        {/* Header Metadata block within the customer service dashboard screen wrapper */}
        <div className="mb-6 border-b border-border pb-4">
          <h2 class="text-xl font-extrabold tracking-tight text-foreground">Service Entry Form</h2>
          <p class="text-sm text-muted-foreground mt-0.5">Fill in your water utility account details below</p>
        </div>

        {/* Renders your submission layout view block component and feeds props back up */}
        <SubmissionForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />

      </div>
    </div>
  );
}

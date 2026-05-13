import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { base44 } from '@/api/base44Client';
import { useSubmissions } from '../context/SubmissionsContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, ShieldCheck, WifiOff } from 'lucide-react';
import { motion } from 'motion/react';

import SubmissionForm from '@/components/SubmissionForm';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import SubmissionSummary from '@/components/SubmissionSummary';

export default function CustomerService() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { addSubmission } = useSubmissions();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const generateRefNumber = () => {
    const date = new Date();
    const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    const random = Math.floor(1000 + Math.random() * 9000);
    return `CNWD-${dateStr}-${random}`;
  };

  const sendSMS = (phoneNumber: string, message: string) => {
    let number = phoneNumber.replace(/[\s\-()]/g, '');
    if (number.startsWith('0')) number = '63' + number.slice(1);
    if (number.startsWith('+')) number = number.slice(1);

    const body = new URLSearchParams();
    body.append('apikey', 'a026775f253eb0737342e27d012987e0');
    body.append('number', number);
    body.append('message', message);
    body.append('sendername', 'CNWD');

    fetch('https://api.semaphore.co/api/v4/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    }).catch(() => {});
  };

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    const refNumber = generateRefNumber();
    const fullData = { ...formData, reference_number: refNumber };

    try {
      await base44.entities.ServiceRequest.create(fullData);
      addSubmission(fullData);

      // EmailJS logic
      await emailjs.send(
        'service_zt99k86',
        'template_x5lbbse',
        {
          message: 'A new service request has been submitted. Please review the customer details below.',
          full_name: formData.full_name,
          contact_number: formData.contact_number,
          complete_address: formData.complete_address,
          landmark: formData.landmark,
          account_number: formData.account_number,
          account_name: formData.account_name, // Map requested
          email: formData.email,
          concerns: formData.concerns,
          attachment: formData.attachments ? formData.attachments.map((f: any) => f.name).join(', ') : 'None'
        },
        'eXHjtXKoc-BghRRzG'
      );

      alert('Your details are successfully submitted to customer service, for more information contact the customer service');

      setSubmittedData(fullData);
      setShowConfirmation(true);
      
      // Sending communications in "parallel" (non-blocking)
      sendSMS(
        formData.contact_number,
        `CNWD: Your request ${refNumber} has been recorded. We will review it shortly. Thank you.`
      );

    } catch (err) {
      console.error('Submission failed', err);
      alert('Failed to submit request. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewRequest = () => {
    setSubmittedData(null);
    setShowConfirmation(false);
  };

  return (
    <div className="flex flex-col h-full bg-muted/20">
      {!isOnline && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800 px-4 py-2 flex items-center gap-2 text-amber-700 dark:text-amber-400 text-sm">
          <WifiOff className="w-4 h-4 shrink-0" />
          Offline. Internet required for submissions.
        </div>
      )}
      
      {/* Header */}
      <div className="bg-[#00c203] shrink-0 sticky top-0 z-10 shadow-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl overflow-hidden shrink-0 bg-[#00a802]">
              <img
                src="https://media.base44.com/images/public/69fd3ef12d7f33f085978620/69976b757_Untitleddesign56.png"
                alt="CNWD Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight leading-tight text-white">
                Camarines Norte Water District
              </h1>
              <p className="text-xs mt-0.5 text-white/80">Customer Service</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <main className="w-full max-w-2xl mx-auto px-4 py-8 pb-24">
          {!submittedData ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-[#00c203]/10 text-[#00c203] font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-full mb-4 border border-[#00c203]/20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Secure Submission
                </div>
                <h2 className="font-extrabold text-3xl text-foreground tracking-tight">Need Assistance?</h2>
                <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto font-medium">
                  Submit your concerns or service requests and our team will get back to you promptly.
                </p>
              </div>

              <Card className="border-border shadow-xl rounded-3xl overflow-hidden">
                <CardHeader className="bg-muted/30 border-b border-border p-6 flex flex-row items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center shadow-sm">
                    <FileText className="w-5 h-5 text-[#00c203]" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-bold">Service Entry Form</CardTitle>
                    <CardDescription>Fill in your details below</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-6 sm:p-8 bg-card">
                  <SubmissionForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <SubmissionSummary data={submittedData} onNewRequest={handleNewRequest} />
          )}
        </main>
      </div>

      <ConfirmationDialog
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
      />
    </div>
  );
}

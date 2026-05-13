import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Upload, X, Loader2, Paperclip, ImageIcon, Mic, Video } from 'lucide-react';

interface SubmissionFormProps {
  onSubmit: (data: any) => Promise<void>;
  isSubmitting: boolean;
}

export default function SubmissionForm({ onSubmit, isSubmitting }: SubmissionFormProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    complete_address: '',
    contact_number: '',
    account_number: '',
    email: '',
    concerns: '',
  });

  const [attachments, setAttachments] = useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    const newAttachments = files.map(file => ({
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file), // Local URL for preview
    }));
    setAttachments([...attachments, ...newAttachments]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, attachments });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="full_name">Full Name</Label>
          <Input
            id="full_name"
            required
            value={formData.full_name}
            onChange={e => setFormData({ ...formData, full_name: e.target.value })}
            placeholder="Juan Dela Cruz"
            className="h-11"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact_number">Contact Number</Label>
          <Input
            id="contact_number"
            required
            value={formData.contact_number}
            onChange={e => setFormData({ ...formData, contact_number: e.target.value })}
            placeholder="0917 XXX XXXX"
            className="h-11"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="complete_address">Complete Address</Label>
        <Input
          id="complete_address"
          required
          value={formData.complete_address}
          onChange={e => setFormData({ ...formData, complete_address: e.target.value })}
          placeholder="St. Name, Brgy, Town"
          className="h-11"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="account_number">Account Number (Optional)</Label>
          <Input
            id="account_number"
            value={formData.account_number}
            onChange={e => setFormData({ ...formData, account_number: e.target.value })}
            placeholder="XXXX-XXXXX"
            className="h-11"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            placeholder="juan@example.com"
            className="h-11"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="concerns">Concerns / Complaints</Label>
        <Textarea
          id="concerns"
          required
          value={formData.concerns}
          onChange={e => setFormData({ ...formData, concerns: e.target.value })}
          placeholder="Describe your issue in detail..."
          className="min-h-[120px] resize-none"
        />
      </div>

      <div className="space-y-3">
        <Label>Attachments (Photos, Audio, or Video)</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {attachments.map((file, i) => (
            <div key={i} className="relative group border border-border rounded-xl p-2 bg-muted/20 flex flex-col items-center justify-center text-center overflow-hidden h-24">
              <div className="text-[#00c203]">
                {file.type.startsWith('image') ? <ImageIcon className="w-6 h-6" /> : 
                 file.type.startsWith('audio') ? <Mic className="w-6 h-6" /> : 
                 file.type.startsWith('video') ? <Video className="w-6 h-6" /> : 
                 <Paperclip className="w-6 h-6" />}
              </div>
              <p className="text-[10px] mt-1 line-clamp-1 px-1 font-medium text-muted-foreground w-full">{file.name}</p>
              <button
                type="button"
                onClick={() => removeAttachment(i)}
                className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          <label className="border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-[#00c203]/5 hover:border-[#00c203]/30 transition-all flex flex-col items-center justify-center text-center p-2 h-24 group">
            <Upload className="w-6 h-6 text-muted-foreground group-hover:text-[#00c203] transition-colors mb-1" />
            <span className="text-[10px] font-bold text-muted-foreground group-hover:text-[#00c203]">Add Files</span>
            <input type="file" multiple className="hidden" onChange={handleFileChange} accept="image/*,audio/*,video/*" />
          </label>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 bg-[#00c203] hover:bg-[#00a802] text-white font-bold text-lg shadow-lg shadow-[#00c203]/20"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Submitting...
          </>
        ) : (
          'Submit Request'
        )}
      </Button>
    </form>
  );
}

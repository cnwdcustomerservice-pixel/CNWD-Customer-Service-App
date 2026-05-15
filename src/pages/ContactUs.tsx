import React from 'react';
import { Phone, Facebook, PhoneCall, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CONTACT_ITEMS = [
  {
    icon: Phone,
    label: 'Mobile Numbers',
    value: '0950-900-4639 / 0992-595-1351',
    href: 'tel:+639509004639',
    color: 'text-green-600',
    bg: 'bg-green-50 dark:bg-green-900/10',
    border: 'border-green-100 dark:border-green-900/20',
  },
  {
    icon: PhoneCall,
    label: 'Telephone Number',
    value: '(054) 885-3488',
    href: 'tel:+63548853488',
    color: 'text-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-900/10',
    border: 'border-blue-100 dark:border-blue-900/20',
  },
  {
    icon: Mail,
    label: 'Email Address',
    value: 'cnwdcustomerservice@gmail.com',
    href: 'mailto:cnwdcustomerservice@gmail.com',
    color: 'text-red-500',
    bg: 'bg-red-50 dark:bg-red-900/10',
    border: 'border-red-100 dark:border-red-900/20',
  },
  {
    icon: Facebook,
    label: 'Facebook Page',
    value: 'Camarines Norte Water District',
    href: 'https://www.facebook.com/search/top?q=Camarines%20Norte%20Water%20District',
    color: 'text-[#1877F2]',
    bg: 'bg-indigo-50 dark:bg-indigo-900/10',
    border: 'border-indigo-100 dark:border-indigo-900/20',
  },
  {
    icon: MapPin,
    label: 'Office Address',
    value: 'Vinzons Avenue, Barangay Lag-on, Daet, Camarines Norte',
    href: 'https://maps.google.com/?q=Vinzons+Avenue+Barangay+Lag-on+Daet+Camarines+Norte',
    color: 'text-orange-500',
    bg: 'bg-orange-50 dark:bg-orange-900/10',
    border: 'border-orange-100 dark:border-orange-900/20',
  },
  {
    icon: Clock,
    label: 'Office Hours',
    value: 'Monday – Friday, 8:00 AM – 5:00 PM',
    href: null,
    color: 'text-purple-600',
    bg: 'bg-purple-50 dark:bg-purple-900/10',
    border: 'border-purple-100 dark:border-purple-900/20',
  },
];

export default function ContactUs() {
  return (
    <div className="flex flex-col h-full">

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-8 pb-24">
          <div className="text-center mb-10">
            <h2 className="font-bold text-2xl sm:text-3xl text-foreground tracking-tight mb-3">Get in Touch</h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed font-medium">
              We're here to help. Reach us through any of the following channels during office hours.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {CONTACT_ITEMS.map(({ icon: Icon, label, value, href, color, bg, border }) => (
              <div
                key={label}
                className={`flex items-center gap-4 p-5 rounded-3xl border ${border} ${bg} transition-all hover:shadow-lg active:scale-[0.98] cursor-pointer group`}
                onClick={() => href && window.open(href, href.startsWith('http') ? '_blank' : undefined)}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-background shadow-sm shrink-0 ring-1 ring-border/50 group-hover:ring-[#00c203]/50`}>
                  <Icon className={`w-7 h-7 ${color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em] mb-1">{label}</p>
                  <p className={`font-bold text-[13px] sm:text-[16px] text-foreground group-hover:${color} transition-colors break-all`}>
                    {value}
                  </p>
                </div>
                {href && <ExternalLink className={`w-4 h-4 text-muted-foreground/30 group-hover:${color} transition-colors shrink-0`} />}
              </div>
            ))}
          </div>

          {/* Map Embed */}
          <div className="mt-10 rounded-3xl overflow-hidden border border-border shadow-xl bg-card">
            <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
              <span className="font-bold text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#00c203]" />
                Main Office Location
              </span>
              <Button variant="link" className="h-8 text-[11px] text-[#00c203]" onClick={() => window.open('https://maps.google.com/?q=Vinzons+Avenue+Barangay+Lag-on+Daet+Camarines+Norte', '_blank')}>
                Open in Maps
              </Button>
            </div>
            <iframe
              title="CNWD Location"
              src="https://www.google.com/maps?q=Vinzons+Avenue+Barangay+Lag-on+Daet+Camarines+Norte&output=embed"
              width="100%"
              height="280"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Social Proof / Footer */}
          <div className="mt-12 text-center border-t border-border pt-8">
            <p className="text-xs text-muted-foreground/60 leading-relaxed font-medium">
              © {new Date().getFullYear()} Camarines Norte Water District<br />
              Vinzons Avenue, Barangay Lag-on, Daet, Camarines Norte, Philippines.<br />
              <span className="mt-2 block uppercase tracking-widest text-[9px] font-bold">Service Excellence since 1973</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

const domains = [
  { title: "Event Management", desc: "Organize, structure, and execute community drives, donation events, and student outreach programs with precision." },
  { title: "Public Speaking & Advocacy", desc: "Inspire audiences, lead school awareness sessions, and advocate for social causes with confidence and empathy." },
  { title: "Social Media & Growth", desc: "Craft compelling digital campaigns, engage youth online, and expand our club's footprint across social channels." },
  { title: "Mime & Street Play (Nukkad Natak)", desc: "Use creative, impactful theatrical performances to educate communities on social taboos and critical issues." },
  { title: "Public Relations & Outreach", desc: "Connect with schools, colleges, partner NGOs, and local authorities to build lasting community collaborations." },
  { title: "Graphic Design & Visual Arts", desc: "Design flyers, banners, social posts, and visual campaigns that capture hearts and encourage donations." },
  { title: "Photography & Videography", desc: "Document authentic ground-level moments of impact, volunteer smiles, and write the visual history of our NGO." },
  { title: "Content Writing & Storytelling", desc: "Pen powerful stories, press releases, project proposals, and newsletters that communicate our mission clearly." }
];

const Volunteer = () => {
  return (
    <div className="min-h-screen bg-[#f8f4ec] text-[#292929] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/8 text-xs font-semibold text-[#4a1c00] uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Volunteer With Us</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-[#1c1917] tracking-tight leading-[1.15]">
            Discover Your Domain & <br />
            <span className="italic font-normal">Shape Real Change.</span>
          </h1>

          <p className="text-[#666666] text-lg sm:text-xl font-light leading-relaxed max-w-3xl mx-auto">
            Whatever your skill set—whether you love speaking, organizing, designing, or hands-on fieldwork—there is an essential role for you at Ek-Prayass.
          </p>
        </div>

        {/* Domains Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {domains.map((domain, idx) => (
            <div
              key={idx}
              className="card-orenda p-8 flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <span className="w-8 h-8 rounded-full bg-[#f8f4ec] text-[#4a1c00] flex items-center justify-center font-serif font-bold text-xs">
                  0{idx + 1}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#1c1917] group-hover:text-[#4a1c00] transition-colors">
                  {domain.title}
                </h3>
                <p className="text-[#666666] text-sm font-light leading-relaxed">
                  {domain.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-black/5">
                <Link
                  to="/#form"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4a1c00] group-hover:translate-x-1 transition-transform"
                >
                  <span>Apply for this role</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Card */}
        <div className="bg-white border border-black/8 rounded-[2.5rem] p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#4a1c00]">Why Volunteer With Us</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1c1917] leading-tight">
              Build Leadership, Empathy, and Lifelong Connections.
            </h2>
            <p className="text-[#666666] text-base font-light leading-relaxed">
              Volunteering with Ek-Prayass is more than a line on your resume—it is a life-affirming experience where you witness the direct outcomes of your empathy.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Official Certificate of Social Service',
              'Hands-on Project Leadership Experience',
              'Active Networking with Student Changemakers',
              'Skill-building in Event & Media Management',
              'Direct Exposure to Grassroots Communities',
              'Letters of Recommendation for Dedicated Volunteers'
            ].map((perk, i) => (
              <div key={i} className="flex items-start gap-3 bg-[#f8f4ec] p-4 rounded-2xl">
                <CheckCircle2 className="w-5 h-5 text-[#4a1c00] flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-medium text-[#1c1917]">{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to Apply */}
        <div className="bg-[#4a1c00] text-white rounded-[2.5rem] p-10 sm:p-14 text-center space-y-4">
          <h3 className="font-serif text-3xl font-bold">Ready to Step Up?</h3>
          <p className="text-white/80 text-base font-light max-w-xl mx-auto">
            Fill out our brief volunteer form and our membership coordinator will reach out to welcome you to the Ek-Prayass family.
          </p>
          <div className="pt-2">
            <Link
              to="/#form"
              className="inline-flex items-center gap-2 bg-white text-[#4a1c00] font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-[#f8f4ec] transition-all"
            >
              <span>Submit Volunteer Application</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Volunteer;

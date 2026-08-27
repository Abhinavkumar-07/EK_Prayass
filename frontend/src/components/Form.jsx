import React,{useState} from 'react';

import emailjs from '@emailjs/browser';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';

const Form = () => {

      const [purpose, setPurpose] = useState("");
      const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        volunteerRole: '',
        message: ''
      });

  const isSelected = (value) => purpose === value;

  const handleInputChange = (e) =>{
    setFormData({
        ...formData, 
        [e.target.name]: e.target.value
    });
  };

  // Save to backend database
  const saveToBackend = async (data) => {
    try {
      await fetch(`${API_BASE}/volunteers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (err) {
      console.error('Backend save error:', err);
      // Don't block form submission if backend fails
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone || 'N/A',
      volunteerRole: formData.volunteerRole || 'N/A',
      message: formData.message,
      purpose: purpose
    };

   emailjs.send(
  "service_8rajhvu",
  "template_e58qn9i",
  templateParams,
  "g_KEysJ0UB13F3nUs"
)

    .then((response) => {
      alert("Thank you! Your message has been sent.");
      console.log('SUCCESS!', response.status, response.text);

      // Also save to backend database
      saveToBackend({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        purpose: purpose,
        volunteerRole: formData.volunteerRole,
        message: formData.message
      });

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        volunteerRole: '',
        message: ''
      });
      setPurpose('');
    }, (err) => {
      alert("Oops! Something went wrong. Try again.");
      console.error('FAILED...', err);
    });
  };

  
  
    return (
        <div id="form" className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-cyan-200/20 blur-[120px] rounded-full mix-blend-multiply pointer-events-none animate-float"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-200/20 blur-[120px] rounded-full mix-blend-multiply pointer-events-none animate-float" style={{ animationDelay: '2s' }}></div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-16 animate-fade-in-up">
                    <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight text-slate-800 mb-6 drop-shadow-sm">
                        Get Involved With <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500">
                             Ek-Prayas
                        </span>
                    </h1>
                    <p className="text-teal-600 text-lg md:text-xl font-medium italic mb-6 max-w-2xl mx-auto" >
                        "Your small effort can bring a big change."
                    </p>
                    <p className="text-base md:text-lg text-slate-600 leading-relaxed mx-auto max-w-2xl font-light">
                        Whether you want to volunteer, donate, or collaborate — we'd love to hear from you!
                    </p>
                </div>
            {/* Form Containter */}

            <div className="bg-white rounded-[2.5rem] rounded-tl-[1rem] rounded-br-[1rem] p-8 shadow-2xl md:p-12 border border-cyan-200">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6" >
                        <div className="space-y-2">
                            <label className="block text-gray-700 font-semibold text-lg">
                                Full Name <span className="text-red-500">*</span></label>

                            <input
                            type="text" 
                            name='fullName'
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder='Enter your full name'
                            required
                            className=" px-4 py-3 border-2 border-cyan-200 rounded-xl  w-full focus:outline-none  focus:border-teal-500 focus:ring-2 focus:ring-teal-200  transition-all duration-300 text-gray-700 placeholder-gray-400"
                            />
                        </div>


                        <div className="space-y-2">
                            <label className="block text-gray-700 font-semibold text-lg">
                                Email <span className="text-red-500">*</span></label>
                            <input
                            name='email'
                            type="email" 
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder='Enter your email'
                            required
                           className=" px-4 py-3 border-2 border-cyan-200 rounded-xl  w-full focus:outline-none  focus:border-teal-500 focus:ring-2 focus:ring-teal-200  transition-all duration-300 text-gray-700 placeholder-gray-400"
                            />
                        </div>
                        </div> 

                        <div className="space-y-2">
                            <label className="block text-gray-700 font-semibold text-lg">
                                Phone Number <span className="text-gray-400 text-sm">(Optional)</span>
                            </label>
                            <input
                                type='tel'
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder='Enter your phone number'
                                className="w-full px-4 py-3 border-2 border-cyan-200 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 text-gray-700 placeholder-gray-400"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">"How would you like to connect with us?"</h3>
                                <p className="text-gray-600 text-lg">Choose your preferred way to contribute</p>
                            </div>
                                <div className="flex flex-wrap justify-center gap-4">
                                    {["Volunteer","Donate","Collaborate"].map((option) => (
                                        <button
                                            key={option}
                                            type="button"
                                             className={`px-8 py-4 rounded-[1.5rem] rounded-tl-md rounded-br-md font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl ${
                                                isSelected(option)
                                                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white border-2 border-teal-500"
                                                    : "bg-white text-teal-600 border-2 border-teal-400 hover:bg-teal-50"
                                                }`}
                                            onClick={()=>setPurpose(option)}>
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                                           {purpose === "Volunteer" && (
                        <div className="space-y-3 bg-cyan-50/50 p-6 sm:p-8 rounded-2xl border border-cyan-100 animate-fade-in">
                            <label className="block text-slate-700 font-semibold text-sm uppercase tracking-wider ml-1">Choose Volunteer Role</label>
                            <div className="relative">
                                <select 
                                    name="volunteerRole"
                                    value={formData.volunteerRole}
                                    onChange={handleInputChange}
                                    className="w-full px-5 py-4 appearance-none bg-white border-2 border-cyan-100 rounded-2xl focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 transition-all duration-300 text-slate-700 font-medium cursor-pointer">
                                        <option value="">Select a role...</option>
                                    <option value="Event Management">Event Management</option>
                                    <option value="Public Relations">Public Relations</option>
                                    <option value="Content Writing">Content Writing</option>
                                    <option value="Public Speaking">Public Speaking</option>
                                    <option value="Social Media Management">Social Media Management</option>
                                    <option value="Graphic Design & Photography">Graphic Design & Photography</option>
                                    <option value="MIME & SKIT">MIME & SKIT</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-cyan-600">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div>  
                    )}

                    <div className="space-y-3">
                        <label className="block text-slate-700 font-semibold text-sm uppercase tracking-wider ml-1">Message</label>
                        <textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows="5"
                            className="w-full px-5 py-4 bg-white/50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-400/10 transition-all duration-300 text-slate-800 placeholder-slate-400 font-medium resize-none shadow-inner"
                            placeholder="Tell us more about how you'd like to get involved, your skills, experience, or any questions you have..."
                            required
                        />        
                    </div> 

                    <div className="text-center pt-8">
                        <button 
                            type="submit"
                            className="group px-12 py-5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold text-lg rounded-[2rem] rounded-tr-xl rounded-bl-xl shadow-xl hover:shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden w-full sm:w-auto">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Send Message
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </button>
                    </div>
                </form>
            </div>
               <div className="text-center mt-8">
                    <p className="text-gray-600 text-lg">
                        Thank you for your interest in making a difference! 🌟
                    </p>
                </div>
               </div>
            </div>
       
    )
}
export default Form;

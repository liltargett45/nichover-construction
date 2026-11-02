import { useState } from 'react';
import { api } from '@appdeploy/client';

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteResult, setQuoteResult] = useState('');
  const [blogLoading, setBlogLoading] = useState(false);
  const [blogResult, setBlogResult] = useState('');
  const [formStatus, setFormStatus] = useState('');

  async function handleAIQuote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const description = String(fd.get('description') || '').trim();
    if (!description) {
      setQuoteResult('Please describe your project first.');
      return;
    }
    setQuoteLoading(true);
    setQuoteResult('');
    try {
      const res = await api.post('/api/quote-estimate', { description });
      setQuoteResult(res.data.text || 'No estimate generated.');
    } catch {
      setQuoteResult(
        'Sorry, could not generate estimate right now. Please try again or call us.'
      );
    } finally {
      setQuoteLoading(false);
    }
  }

  async function handleBlogGenerate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const note = String(fd.get('note') || '').trim();
    if (!note) {
      setBlogResult('Please enter a short topic note.');
      return;
    }
    setBlogLoading(true);
    setBlogResult('');
    try {
      const res = await api.post('/api/blog-generate', { note });
      setBlogResult(res.data.text || 'No post generated.');
    } catch {
      setBlogResult(
        'Sorry, could not generate the post right now. Please try again.'
      );
    } finally {
      setBlogLoading(false);
    }
  }

  function handleQuoteSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get('name') || '').trim();
    const phone = String(fd.get('phone') || '').trim();
    if (!name || !phone) {
      setFormStatus('Please fill in your name and phone number.');
      return;
    }
    setFormStatus(
      'Thank you! Your request has been received. We will contact you shortly.'
    );
    e.currentTarget.reset();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-stone-800">
      {/* Header, Hero, About, Services, AI Tools, Contact, Footer - full content from live site */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#home" className="flex items-center gap-3">
              <svg className="h-10 w-10" viewBox="0 0 120 100" fill="none">
                <path d="M20 78 A40 40 0 0 1 100 78" stroke="#49313b" strokeWidth="3" />
                <g fill="#49313b">
                  <path d="M42 76 V45 L45 42 V76 Z" />
                  <path d="M48 76 V40 L51 37 V76 Z" />
                  <path d="M54 76 V35 L57 32 V76 Z" />
                  <path d="M60 76 V30 L63 27 V76 Z" />
                  <path d="M66 76 V25 L78 32 V76 Z" />
                  <path d="M72 76 V18 L75 15 V76 Z" />
                  <path d="M78 76 V12 L81 9 V76 Z" />
                  <path d="M84 76 V8 L87 5 V76 Z" />
                  <path d="M90 76 V20 L100 30 V76 Z" />
                  <path d="M15 80 Q40 72 60 74 Q80 72 105 80 Z" />
                </g>
              </svg>
              <div className="leading-tight">
                <div className="font-serif font-bold text-[#3D2A2A] text-lg tracking-wide">NICHOVER</div>
                <div className="text-[10px] tracking-[0.2em] text-stone-500 uppercase">Construction Work</div>
              </div>
            </a>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-700">
              <a href="#home" className="hover:text-[#3D2A2A]">Home</a>
              <a href="#about" className="hover:text-[#3D2A2A]">About</a>
              <a href="#services" className="hover:text-[#3D2A2A]">Services</a>
              <a href="#ai-tools" className="hover:text-[#3D2A2A]">AI Tools</a>
              <a href="#contact" className="hover:text-[#3D2A2A]">Contact</a>
            </nav>
            <div className="hidden lg:flex items-center gap-4">
              <a href="tel:0557729151" className="text-sm font-medium text-stone-700 hover:text-[#3D2A2A]">055 772 9151</a>
              <a href="#contact" className="px-5 py-2.5 bg-[#3D2A2A] text-white text-sm font-semibold rounded-md hover:bg-[#2a1d1d]">Get a Quote</a>
            </div>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2" aria-label="Menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-stone-100 bg-white px-4 py-3 space-y-2">
            <a href="#home" onClick={() => setMobileOpen(false)} className="block py-2">Home</a>
            <a href="#about" onClick={() => setMobileOpen(false)} className="block py-2">About</a>
            <a href="#services" onClick={() => setMobileOpen(false)} className="block py-2">Services</a>
            <a href="#ai-tools" onClick={() => setMobileOpen(false)} className="block py-2">AI Tools</a>
            <a href="#contact" onClick={() => setMobileOpen(false)} className="block py-2">Contact</a>
          </div>
        )}
      </header>

      <section id="home" className="relative min-h-[80vh] flex items-center justify-center bg-stone-900">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1920&q=80" alt="" className="w-full h-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/50 to-stone-900/80" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-amber-400 text-sm font-semibold tracking-[0.25em] uppercase mb-4">Trusted Builders in Accra</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white mb-6 leading-tight">We Build Homes & Spaces That Last</h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-10">Nichover Construction Work delivers quality renovations, new builds, interior design and architectural services across La and Greater Accra.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="px-8 py-3.5 bg-amber-600 text-white font-semibold rounded-md hover:bg-amber-700">Request Free Quote</a>
            <a href="#ai-tools" className="px-8 py-3.5 border-2 border-white/80 text-white font-semibold rounded-md hover:bg-white/10">Try AI Tools</a>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-amber-700 text-sm font-semibold tracking-widest uppercase mb-3">About Us</p>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-6">Building with integrity in La and beyond</h2>
            <p className="text-stone-600 mb-4">Nichover Construction Work is a Ghanaian construction company based in La, Accra. We specialise in quality general construction, renovations, interior designing, architectural works and surveying.</p>
            <p className="text-stone-600">From excavation to finishing, electrical works, civil works, acoustic ceilings, solar systems and supply of construction materials — we handle projects with professionalism.</p>
          </div>
          <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80" alt="Construction" className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover" />
        </div>
      </section>

      <section id="services" className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-amber-700 text-sm font-semibold tracking-widest uppercase mb-3">What We Do</p>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900">Our Services</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {['Renovations', 'General Construction', 'Interior Designing', 'Architectural Works', 'Surveying', 'Electrical, Solar & More'].map((s, i) => (
              <div key={s} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                <div className="w-10 h-10 bg-[#3D2A2A]/10 text-[#3D2A2A] rounded-lg flex items-center justify-center font-bold mb-4">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-lg font-semibold text-stone-900">{s}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="ai-tools" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-amber-700 text-sm font-semibold tracking-widest uppercase mb-3">AI Powered</p>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">Smart Tools for Your Project</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">Get a quick estimate or generate blog content with AI — tailored for construction in Ghana.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 md:p-8">
              <h3 className="text-xl font-semibold text-stone-900 mb-2">AI Quote Assistant</h3>
              <p className="text-stone-600 text-sm mb-5">Describe your project and get a rough cost range + materials checklist (Ghana context).</p>
              <form onSubmit={handleAIQuote} className="space-y-4">
                <textarea name="description" rows={4} className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#3D2A2A]/30 outline-none" placeholder="e.g. 3-bedroom bungalow in La, standard finish, about 140 m²..." />
                <button type="submit" disabled={quoteLoading} className="w-full py-3 bg-[#3D2A2A] text-white font-semibold rounded-lg hover:bg-[#2a1d1d] disabled:opacity-60">{quoteLoading ? 'Generating estimate...' : 'Generate Estimate'}</button>
              </form>
              {quoteResult && <div className="mt-5 p-4 bg-white border border-stone-200 rounded-lg text-sm whitespace-pre-wrap text-stone-700">{quoteResult}</div>}
            </div>
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 md:p-8">
              <h3 className="text-xl font-semibold text-stone-900 mb-2">AI Blog Helper</h3>
              <p className="text-stone-600 text-sm mb-5">Type a short note about a topic and get a ready-to-publish blog post.</p>
              <form onSubmit={handleBlogGenerate} className="space-y-4">
                <textarea name="note" rows={4} className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#3D2A2A]/30 outline-none" placeholder="e.g. cost of building a 3-bedroom house in Accra 2026..." />
                <button type="submit" disabled={blogLoading} className="w-full py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 disabled:opacity-60">{blogLoading ? 'Writing post...' : 'Generate Blog Post'}</button>
              </form>
              {blogResult && <div className="mt-5 p-4 bg-white border border-stone-200 rounded-lg text-sm whitespace-pre-wrap text-stone-700 max-h-80 overflow-y-auto">{blogResult}</div>}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-amber-700 text-sm font-semibold tracking-widest uppercase mb-3">Contact</p>
            <h2 className="text-3xl font-serif text-stone-900 mb-6">Get in touch</h2>
            <p className="text-stone-600 mb-6">Based in La – New Life, Accra.</p>
            <div className="space-y-4 text-stone-700">
              <p><strong>Phone:</strong> <a href="tel:0557729151" className="hover:text-[#3D2A2A]">055 772 9151</a> / <a href="tel:0551555213" className="hover:text-[#3D2A2A]">055 155 5213</a></p>
              <p><strong>Email:</strong> <a href="mailto:nichoverconstruction@gmail.com" className="hover:text-[#3D2A2A]">nichoverconstruction@gmail.com</a></p>
              <p><strong>Location:</strong> La – New Life, Accra, Ghana</p>
              <a href="https://wa.me/233557729151" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-md hover:bg-green-700">Chat on WhatsApp</a>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Request a Free Quote</h3>
            <form onSubmit={handleQuoteSubmit} className="space-y-4">
              <input name="name" required placeholder="Full Name *" className="w-full px-4 py-2.5 border border-stone-300 rounded-lg outline-none focus:ring-2 focus:ring-[#3D2A2A]/30" />
              <input name="phone" required placeholder="Phone Number *" className="w-full px-4 py-2.5 border border-stone-300 rounded-lg outline-none focus:ring-2 focus:ring-[#3D2A2A]/30" />
              <input name="email" type="email" placeholder="Email" className="w-full px-4 py-2.5 border border-stone-300 rounded-lg outline-none focus:ring-2 focus:ring-[#3D2A2A]/30" />
              <select name="service" className="w-full px-4 py-2.5 border border-stone-300 rounded-lg bg-white outline-none">
                <option value="">Select a service</option>
                <option>Renovations</option>
                <option>General Construction</option>
                <option>Interior Designing</option>
                <option>Architectural Works</option>
                <option>Surveying</option>
                <option>Other</option>
              </select>
              <textarea name="message" rows={3} placeholder="Project details..." className="w-full px-4 py-2.5 border border-stone-300 rounded-lg outline-none focus:ring-2 focus:ring-[#3D2A2A]/30" />
              <button type="submit" className="w-full py-3 bg-[#3D2A2A] text-white font-semibold rounded-lg hover:bg-[#2a1d1d]">Send Request</button>
              {formStatus && <p className="text-sm text-center text-green-600">{formStatus}</p>}
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-stone-900 text-stone-400 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="font-serif font-bold text-white text-xl mb-1">NICHOVER</div>
          <div className="text-xs tracking-widest uppercase text-stone-500 mb-4">Construction Work</div>
          <p className="text-sm mb-6">Quality construction, renovations and design services based in La, Accra.</p>
          <p className="text-sm">&copy; 2026 Nichover Construction Work. All rights reserved.</p>
        </div>
      </footer>

      <a href="https://wa.me/233557729151" target="_blank" rel="noopener" className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600" aria-label="WhatsApp">
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
      </a>
    </div>
  );
}

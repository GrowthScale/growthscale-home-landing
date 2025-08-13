import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">G</span>
              </div>
              <span className="text-3xl font-bold text-white">
                GrowthScale
              </span>
            </div>
            <p className="text-slate-300 max-w-xs leading-relaxed">
              A plataforma inteligente que transforma a gestão de escalas em vantagem competitiva para restaurantes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.928-.875-1.418-2.026-1.418-3.323s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Produto */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Produto</h4>
            <ul className="space-y-3">
              <li><button onClick={() => document.getElementById('recursos')?.scrollIntoView({ behavior: 'smooth' })} className="text-slate-300 hover:text-white transition-colors duration-300">Recursos</button></li>
              <li><button onClick={() => document.getElementById('precos')?.scrollIntoView({ behavior: 'smooth' })} className="text-slate-300 hover:text-white transition-colors duration-300">Preços</button></li>
              <li><Link to="/demo" className="text-slate-300 hover:text-white transition-colors duration-300">Demonstração</Link></li>
              <li><Link to="/api" className="text-slate-300 hover:text-white transition-colors duration-300">API</Link></li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Empresa</h4>
            <ul className="space-y-3">
              <li><Link to="/sobre" className="text-slate-300 hover:text-white transition-colors duration-300">Sobre Nós</Link></li>
              <li><Link to="/carreiras" className="text-slate-300 hover:text-white transition-colors duration-300">Carreiras</Link></li>
              <li><Link to="/blog" className="text-slate-300 hover:text-white transition-colors duration-300">Blog</Link></li>
              <li><Link to="/imprensa" className="text-slate-300 hover:text-white transition-colors duration-300">Imprensa</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-slate-300">
                <Mail className="w-5 h-5" />
                <a href="mailto:contato@growthscale.com" className="hover:text-white transition-colors duration-300">contato@growthscale.com</a>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Phone className="w-5 h-5" />
                <a href="tel:+5511999999999" className="hover:text-white transition-colors duration-300">(11) 99999-9999</a>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <MapPin className="w-5 h-5" />
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-12 bg-slate-700" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap gap-6 text-sm text-slate-400">
            <Link to="/politica-de-privacidade" className="hover:text-white transition-colors duration-300">Política de Privacidade</Link>
            <Link to="/termos-de-uso" className="hover:text-white transition-colors duration-300">Termos de Uso</Link>
            <Link to="/cookies" className="hover:text-white transition-colors duration-300">Cookies</Link>
            <Link to="/seguranca" className="hover:text-white transition-colors duration-300">Segurança</Link>
          </div>
          <p className="text-sm text-slate-400">
            © 2024 GrowthScale. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
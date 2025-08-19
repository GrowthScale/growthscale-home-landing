import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Linkedin,
  Twitter
} from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    produto: [
      { name: 'Funcionalidades', href: '/features' },
      { name: 'Preços', href: '/pricing' },
      { name: 'Demonstração', href: '/demo' },
      { name: 'API', href: '/api' }
    ],
    recursos: [
      { name: 'Central de Ajuda', href: '/help' },
      { name: 'Documentação', href: '/docs' },
      { name: 'Blog', href: '/blog' },
      { name: 'Webinars', href: '/webinars' }
    ],
    empresa: [
      { name: 'Sobre Nós', href: '/about' },
      { name: 'Carreiras', href: '/careers' },
      { name: 'Imprensa', href: '/press' },
      { name: 'Contato', href: '/contact' }
    ],
    legal: [
      { name: 'Termos de Uso', href: '/terms' },
      { name: 'Política de Privacidade', href: '/privacy' },
      { name: 'LGPD', href: '/lgpd' },
      { name: 'Cookies', href: '/cookies' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ];

  return (
    <footer id="contato" className="w-full bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo e descrição */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="text-xl font-bold text-white">GrowthScale</span>
            </div>
            <p className="text-slate-300 mb-6 max-w-md">
              Transformando a gestão de escalas com IA. Reduza custos, aumente produtividade 
              e garanta compliance CLT de forma simples e eficiente.
            </p>
            
            {/* Contato */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-slate-300">
                <Mail className="w-4 h-4" />
                <span className="text-sm">contato@growthscale.com</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+55 (11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">São Paulo, SP - Brasil</span>
              </div>
            </div>
          </div>

          {/* Links do produto */}
          <div>
            <h3 className="text-white font-semibold mb-4">Produto</h3>
                         <ul className="space-y-2">
               {footerLinks.produto.map((link) => (
                 <li key={link.name}>
                   <Link 
                     to={link.href}
                     className="text-slate-300 hover:text-white transition-colors duration-200 text-sm"
                   >
                     {link.name}
                   </Link>
                 </li>
               ))}
             </ul>
          </div>

          {/* Links de recursos */}
          <div>
            <h3 className="text-white font-semibold mb-4">Recursos</h3>
                         <ul className="space-y-2">
               {footerLinks.recursos.map((link) => (
                 <li key={link.name}>
                   <Link 
                     to={link.href}
                     className="text-slate-300 hover:text-white transition-colors duration-200 text-sm"
                   >
                     {link.name}
                   </Link>
                 </li>
               ))}
             </ul>
          </div>

          {/* Links da empresa */}
          <div>
            <h3 className="text-white font-semibold mb-4">Empresa</h3>
                         <ul className="space-y-2">
               {footerLinks.empresa.map((link) => (
                 <li key={link.name}>
                   <Link 
                     to={link.href}
                     className="text-slate-300 hover:text-white transition-colors duration-200 text-sm"
                   >
                     {link.name}
                   </Link>
                 </li>
               ))}
             </ul>
          </div>
        </div>

        {/* Separador */}
                 <div className="border-t border-slate-700 mt-12 pt-8">
                       <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
             {/* Copyright */}
             <div className="text-slate-400 text-sm">
               © {currentYear} GrowthScale. Todos os direitos reservados. Conforme LGPD.
             </div>

             {/* Links legais */}
             <div className="flex flex-wrap gap-6">
               {footerLinks.legal.map((link) => (
                 <Link 
                   key={link.name}
                   to={link.href}
                   className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                 >
                   {link.name}
                 </Link>
               ))}
             </div>

             {/* Redes sociais */}
             <div className="flex space-x-4">
               {socialLinks.map((social) => (
                 <a
                   key={social.label}
                   href={social.href}
                   className="text-slate-400 hover:text-white transition-colors duration-200"
                   aria-label={social.label}
                 >
                   <social.icon className="w-5 h-5" />
                 </a>
               ))}
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
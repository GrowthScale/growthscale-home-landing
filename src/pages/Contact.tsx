import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { LoadingSpinner } from '@/components/ui/loading';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Mail, 
  MessageSquare, 
  BookOpen, 
  PlayCircle, 
  Shield, 
  CheckCircle,
  ExternalLink,
  Linkedin,
  Twitter,
  Facebook
} from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Erro de validação",
        description: "Nome completo é obrigatório.",
        variant: "destructive",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Erro de validação",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.subject.trim()) {
      toast({
        title: "Erro de validação",
        description: "Assunto é obrigatório.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.message.trim()) {
      toast({
        title: "Erro de validação",
        description: "Mensagem é obrigatória.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      toast({
        title: "Mensagem enviada!",
        description: "Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar sua mensagem. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const supportResources = [
    {
      title: "Central de Ajuda",
      description: "Encontre respostas para as perguntas mais frequentes",
      icon: MessageSquare,
      href: "/central-de-ajuda",
      external: false
    },
    {
      title: "Documentação",
      description: "Acesse nossos manuais e guias completos",
      icon: BookOpen,
      href: "https://docs.growthscale.com",
      external: true
    },
    {
      title: "Tutoriais em Vídeo",
      description: "Assista a vídeos passo a passo para aprender a usar a plataforma",
      icon: PlayCircle,
      href: "https://youtube.com/growthscale",
      external: true
    },
    {
      title: "Status da Plataforma",
      description: "Verifique se há alguma interrupção ou manutenção programada",
      icon: Shield,
      href: "https://status.growthscale.com",
      external: true
    }
  ];

  const socialMedia = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/company/growthscale",
      color: "text-primary hover:text-primary-hover"
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com/growthscale",
      color: "text-primary hover:text-primary-hover"
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://facebook.com/growthscale",
      color: "text-primary hover:text-primary-hover"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-xl">
        {/* Header Section */}
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4 font-roboto text-balance">
            Contato e Suporte
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-roboto leading-relaxed">
            Estamos aqui para ajudar! Envie sua mensagem ou encontre respostas rápidas em nossos recursos.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Envie sua Mensagem
                </CardTitle>
                <CardDescription>
                  Preencha o formulário abaixo e entraremos em contato o mais breve possível.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Mensagem Enviada!
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsSubmitted(false)}
                    >
                      Enviar Nova Mensagem
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Seu nome completo"
                        required
                        aria-describedby="name-hint"
                      />
                      <div id="name-hint" className="sr-only">
                        Digite seu nome completo para que possamos entrar em contato
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="seu@email.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Assunto *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Qual o assunto da sua mensagem?"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Mensagem *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Descreva sua dúvida ou problema em detalhes..."
                        className="min-h-textarea-lg"
                        required
                      />
                    </div>

                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={isLoading}
                        aria-label={isLoading ? "Enviando mensagem, aguarde" : "Enviar mensagem de contato"}
                      >
                        {isLoading ? (
                          <>
                            <LoadingSpinner size="sm" />
                            Enviando...
                          </>
                        ) : (
                          'Enviar Mensagem'
                        )}
                      </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Support Resources */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Recursos de Suporte
            </h2>
            
            <div className="grid gap-4">
              {supportResources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <Card key={index} className="hover:shadow-card transition-smooth focus-within:ring-2 focus-within:ring-primary">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0" role="img" aria-label={`Ícone de ${resource.title}`}>
                          <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-2">
                            {resource.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            {resource.description}
                          </p>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              if (resource.external) {
                                window.open(resource.href, '_blank');
                              } else {
                                window.location.href = resource.href;
                              }
                            }}
                            aria-label={`Acessar ${resource.title}${resource.external ? ' (abre em nova aba)' : ''}`}
                          >
                            Acessar {resource.external && <ExternalLink className="h-3 w-3 ml-1" aria-hidden="true" />}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Siga-nos nas Redes Sociais
              </h3>
              <div className="flex gap-4">
                {socialMedia.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      size="icon"
                      onClick={() => window.open(social.href, '_blank')}
                      className="hover:bg-accent transition-smooth"
                      aria-label={`Seguir GrowthScale no ${social.name} (abre em nova aba)`}
                    >
                      <Icon className={`h-5 w-5 ${social.color}`} aria-hidden="true" />
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Outras Formas de Contato</CardTitle>
            <CardDescription>
              Você também pode entrar em contato conosco através destes canais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <Mail className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold text-foreground mb-1">Email</h4>
                <p className="text-sm text-muted-foreground">
                  contato@growthscale.com
                </p>
              </div>
              <div>
                <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold text-foreground mb-1">Chat Online</h4>
                <p className="text-sm text-muted-foreground">
                  Disponível 24/7 no painel
                </p>
              </div>
              <div>
                <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold text-foreground mb-1">Central de Ajuda</h4>
                <p className="text-sm text-muted-foreground">
                  Respostas instantâneas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
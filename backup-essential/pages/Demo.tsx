import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Demo = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEOHead 
        title="Demonstração - GrowthScale"
        description="Veja como o GrowthScale funciona na prática. Demonstração completa da plataforma de gestão de escalas."
      />
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <span className="text-xl font-bold text-primary">GrowthScale</span>
              </div>
              
              <Button onClick={() => navigate('/auth')}>
                Começar Grátis
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Veja o GrowthScale em Ação
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Descubra como nossa IA transforma a gestão de escalas em apenas 3 minutos
            </p>
          </div>

          {/* Demo Video */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-slate-900 rounded-2xl p-8 text-center">
              <div className="w-full h-96 bg-slate-800 rounded-xl flex items-center justify-center mb-6">
                <div className="text-center">
                  <Play className="h-16 w-16 text-white mx-auto mb-4" />
                  <p className="text-white text-lg">Demonstração Interativa</p>
                  <p className="text-slate-400 text-sm">3 minutos • Funcionalidades principais</p>
                </div>
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Play className="h-5 w-5 mr-2" />
                Assistir Demonstração
              </Button>
            </div>
          </div>

          {/* Features Demo */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-slate-200">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Criação de Escalas</h3>
              <p className="text-slate-600">Veja como criar escalas perfeitas em segundos com nossa IA</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-slate-200">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Compliance CLT</h3>
              <p className="text-slate-600">Descubra como ficar 100% em conformidade automaticamente</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-slate-200">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">WhatsApp Integrado</h3>
              <p className="text-slate-600">Veja como automatizar a comunicação com sua equipe</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Pronto para transformar sua gestão?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Comece gratuitamente e veja a diferença em 14 dias
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/auth')}>
                Começar Grátis
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/')}>
                Voltar ao Site
              </Button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Demo;

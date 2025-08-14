import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Code, Zap, Shield, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Api = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEOHead 
        title="API - GrowthScale"
        description="Documentação da API do GrowthScale. Integre nossa plataforma com seus sistemas existentes."
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
                <span className="text-xl font-bold text-primary">GrowthScale API</span>
              </div>
              
              <Button onClick={() => navigate('/login')}>
                Acessar API
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              API do GrowthScale
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Integre nossa plataforma com seus sistemas existentes e automatize sua gestão de escalas
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-slate-200">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">RESTful API</h3>
              <p className="text-slate-600">API REST completa com documentação detalhada</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-slate-200">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Webhooks</h3>
              <p className="text-slate-600">Receba notificações em tempo real</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-slate-200">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Segurança</h3>
              <p className="text-slate-600">Autenticação OAuth2 e rate limiting</p>
            </div>
          </div>

          {/* Code Example */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-slate-900 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Exemplo de Integração</h3>
                <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-slate-900">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Ver Documentação
                </Button>
              </div>
              <pre className="text-green-400 text-sm overflow-x-auto">
{`// Criar uma nova escala
POST /api/v1/schedules
Authorization: Bearer YOUR_API_KEY

{
  "name": "Escala Semanal",
  "start_date": "2024-12-20",
  "end_date": "2024-12-26",
  "employees": [
    {
      "id": "emp_123",
      "shifts": [
        {
          "date": "2024-12-20",
          "start_time": "08:00",
          "end_time": "16:00"
        }
      ]
    }
  ]
}`}
              </pre>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Pronto para integrar?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Acesse nossa documentação completa e comece a integrar hoje mesmo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/login')}>
                Acessar API
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

export default Api;

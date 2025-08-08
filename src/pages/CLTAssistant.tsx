import React from 'react';
import { CLTAssistant } from '@/components/CLTAssistant';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Lightbulb, 
  Shield, 
  BookOpen,
  MessageSquare,
  Clock,
  CheckCircle
} from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const CLTAssistantPage: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="Assistente de IA - CLT | GrowthScale"
        description="Tire suas dúvidas sobre legislação trabalhista brasileira com nosso assistente de IA especializado em food service."
      />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Bot className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Assistente de IA - CLT</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tire suas dúvidas sobre legislação trabalhista brasileira com foco em food service. 
            Nosso assistente de IA está aqui para ajudar você a entender a CLT de forma simples e objetiva.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Especializado em CLT</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Foco exclusivo em legislação trabalhista brasileira para o setor de food service
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Linguagem Simples</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Explicações claras e objetivas, sem jargões jurídicos complexos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Resposta Rápida</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Respostas instantâneas para suas dúvidas sobre legislação trabalhista
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Assistant */}
        <div className="mb-8">
          <CLTAssistant 
            title="Assistente ScaleAI - CLT"
            placeholder="Digite sua dúvida sobre legislação trabalhista, por exemplo: 'O que é intervalo interjornada?'"
          />
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Sobre o Assistente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                O ScaleAI é um assistente especializado em legislação trabalhista brasileira, 
                desenvolvido especificamente para o setor de food service.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Explicações claras e objetivas</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Foco em prevenção de problemas</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Linguagem acessível</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Atualizado com a legislação vigente</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Como Usar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">1</Badge>
                  <span className="text-sm">Digite sua dúvida na caixa de texto</span>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">2</Badge>
                  <span className="text-sm">Use as perguntas sugeridas como exemplo</span>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">3</Badge>
                  <span className="text-sm">Receba respostas instantâneas</span>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">4</Badge>
                  <span className="text-sm">Consulte o histórico da conversa</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Disclaimer */}
        <Card className="mt-8 border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Shield className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-medium text-yellow-800 mb-2">
                  Aviso Legal Importante
                </h3>
                <p className="text-sm text-yellow-700">
                  Este assistente fornece orientações informativas sobre a CLT e não substitui 
                  a consulta a um profissional de direito ou contabilidade. Para questões 
                  específicas ou conselhos jurídicos, sempre consulte um especialista qualificado.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CLTAssistantPage;

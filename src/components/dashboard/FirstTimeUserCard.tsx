import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FirstTimeUserCardProps {
  className?: string;
}

export function FirstTimeUserCard({ className }: FirstTimeUserCardProps) {
  const navigate = useNavigate();

  return (
    <Card className={`border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-green-600" />
            <CardTitle className="text-base text-green-700 dark:text-green-300">
              Sua primeira escala foi criada!
            </CardTitle>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
            Nova
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-300">
            <Calendar className="h-4 w-4" />
            <span>Primeira Escala Semanal</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-green-600" />
              <span>3 funcionários</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-green-600" />
              <span>5 dias</span>
            </div>
          </div>
          
          <p className="text-sm text-green-700 dark:text-green-300">
            Nossa IA analisou seus dados e criou uma escala otimizada para sua operação. 
            Ela está pronta para uso e garante compliance com a CLT.
          </p>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={() => navigate('/dashboard/schedules')} 
            size="sm" 
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Ver Escala
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
          
          <Button 
            onClick={() => navigate('/dashboard/employees')} 
            variant="outline" 
            size="sm"
            className="border-green-200 text-green-700 hover:bg-green-50"
          >
            Adicionar Funcionários
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

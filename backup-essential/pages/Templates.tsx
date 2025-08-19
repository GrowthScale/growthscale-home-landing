import React from 'react';
import { TemplateManager } from '@/components/features/TemplateManager';
import { ScheduleTemplate } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function Templates() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleTemplateSelect = (template: ScheduleTemplate) => {
    // Redirecionar para a página de escalas com o modelo selecionado
    navigate('/schedules', { 
      state: { 
        selectedTemplate: template,
        message: `Modelo "${template.name}" aplicado com sucesso!`
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <TemplateManager onTemplateSelect={handleTemplateSelect} />
      </div>
    </div>
  );
}

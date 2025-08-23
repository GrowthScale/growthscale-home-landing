import { useState, useCallback } from 'react';
import { useFeatureGating } from './useFeatureGating';

type UpgradeTrigger = 'employee_limit' | 'feature_limit' | 'usage_limit' | 'trial_expired';

interface UseUpgradeModalReturn {
  isModalOpen: boolean;
  modalTrigger: UpgradeTrigger | null;
  modalMessage: string;
  showUpgradeModal: (trigger: UpgradeTrigger, message?: string) => void;
  hideUpgradeModal: () => void;
  checkAndShowUpgrade: (action: 'add_employee' | 'add_branch' | 'create_schedule' | 'use_feature') => boolean;
}

export const useUpgradeModal = (): UseUpgradeModalReturn => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTrigger, setModalTrigger] = useState<UpgradeTrigger | null>(null);
  const [modalMessage, setModalMessage] = useState('');
  
  const { 
    currentPlan, 
    canAddEmployee, 
    canAddBranch, 
    canCreateSchedule, 
    hasFeature,
    getLimitInfo 
  } = useFeatureGating();

  const showUpgradeModal = useCallback((trigger: UpgradeTrigger, message?: string) => {
    setModalTrigger(trigger);
    setModalMessage(message || getDefaultMessage(trigger));
    setIsModalOpen(true);
  }, []);

  const hideUpgradeModal = useCallback(() => {
    setIsModalOpen(false);
    setModalTrigger(null);
    setModalMessage('');
  }, []);

  const getDefaultMessage = (trigger: UpgradeTrigger): string => {
    switch (trigger) {
      case 'employee_limit':
        return 'Parabéns, sua equipe está crescendo!';
      case 'feature_limit':
        return 'Funcionalidade premium disponível!';
      case 'usage_limit':
        return 'Você atingiu o limite do seu plano!';
      case 'trial_expired':
        return 'Seu período de teste de 14 dias expirou!';
      default:
        return 'Faça upgrade para acessar mais funcionalidades!';
    }
  };

  const checkAndShowUpgrade = useCallback((action: 'add_employee' | 'add_branch' | 'create_schedule' | 'use_feature'): boolean => {
    // Se não está no plano freemium, não precisa mostrar upgrade
    if (currentPlan !== 'freemium') {
      return false;
    }

    switch (action) {
      case 'add_employee':
        if (!canAddEmployee()) {
          const employeeInfo = getLimitInfo('employees');
          showUpgradeModal('employee_limit', 
            `Parabéns! Você tem ${employeeInfo.current} funcionários. Para adicionar o ${employeeInfo.limit + 1}º, faça upgrade!`
          );
          return true;
        }
        break;
        
      case 'add_branch':
        if (!canAddBranch()) {
          const branchInfo = getLimitInfo('branches');
          showUpgradeModal('usage_limit', 
            `Você atingiu o limite de ${branchInfo.limit} filiais. Faça upgrade para adicionar mais!`
          );
          return true;
        }
        break;
        
      case 'create_schedule':
        if (!canCreateSchedule()) {
          const scheduleInfo = getLimitInfo('schedules');
          showUpgradeModal('usage_limit', 
            `Você atingiu o limite de ${scheduleInfo.limit} escalas. Faça upgrade para criar mais!`
          );
          return true;
        }
        break;
        
      case 'use_feature':
        // Para funcionalidades premium específicas
        showUpgradeModal('feature_limit', 
          'Esta funcionalidade está disponível apenas nos planos superiores!'
        );
        return true;
    }

    return false;
  }, [currentPlan, canAddEmployee, canAddBranch, canCreateSchedule, getLimitInfo, showUpgradeModal]);

  return {
    isModalOpen,
    modalTrigger,
    modalMessage,
    showUpgradeModal,
    hideUpgradeModal,
    checkAndShowUpgrade,
  };
};

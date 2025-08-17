import { useState, useCallback, useMemo } from 'react';
import { ValidationRule } from '@/types/common';

interface UseFormOptions<T> {
  initialValues: T;
  validationRules?: Partial<Record<keyof T, ValidationRule[]>>;
  onSubmit?: (values: T) => void | Promise<void>;
}

interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
}

export function useForm<T extends Record<string, unknown>>({
  initialValues,
  validationRules = {},
  onSubmit
}: UseFormOptions<T>) {
  const [state, setState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: true
  });

  // Validar um campo específico
  const validateField = useCallback((name: keyof T, value: unknown): string => {
    const rules = validationRules[name];
    if (!rules) return '';

    for (const rule of rules) {
      switch (rule.type) {
        case 'required':
          if (!value || (typeof value === 'string' && value.trim() === '')) {
            return rule.message;
          }
          break;
        case 'min':
          if (typeof value === 'string' && value.length < (rule.value as number)) {
            return rule.message;
          }
          if (typeof value === 'number' && value < (rule.value as number)) {
            return rule.message;
          }
          break;
        case 'max':
          if (typeof value === 'string' && value.length > (rule.value as number)) {
            return rule.message;
          }
          if (typeof value === 'number' && value > (rule.value as number)) {
            return rule.message;
          }
          break;
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (typeof value === 'string' && !emailRegex.test(value)) {
            return rule.message;
          }
          break;
        case 'pattern':
          if (typeof value === 'string' && rule.value && !new RegExp(rule.value as string).test(value)) {
            return rule.message;
          }
          break;
      }
    }
    return '';
  }, [validationRules]);

  // Validar todos os campos
  const validateForm = useCallback((): Partial<Record<keyof T, string>> => {
    const errors: Partial<Record<keyof T, string>> = {};
    
    Object.keys(validationRules).forEach((key) => {
      const fieldKey = key as keyof T;
      const error = validateField(fieldKey, state.values[fieldKey]);
      if (error) {
        errors[fieldKey] = error;
      }
    });

    return errors;
  }, [state.values, validationRules, validateField]);

  // Atualizar valor de um campo
  const setFieldValue = useCallback((name: keyof T, value: unknown) => {
    setState(prev => {
      const newValues = { ...prev.values, [name]: value };
      const error = validateField(name, value);
      const newErrors = { ...prev.errors, [name]: error };
      
      return {
        ...prev,
        values: newValues,
        errors: newErrors,
        touched: { ...prev.touched, [name]: true },
        isValid: Object.keys(newErrors).every(key => !newErrors[key as keyof T])
      };
    });
  }, [validateField]);

  // Marcar campo como tocado
  const setFieldTouched = useCallback((name: keyof T, touched: boolean = true) => {
    setState(prev => ({
      ...prev,
      touched: { ...prev.touched, [name]: touched }
    }));
  }, []);

  // Resetar formulário
  const resetForm = useCallback(() => {
    setState({
      values: initialValues,
      errors: {},
      touched: {},
      isSubmitting: false,
      isValid: true
    });
  }, [initialValues]);

  // Submeter formulário
  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    const errors = validateForm();
    setState(prev => ({ ...prev, errors, isValid: Object.keys(errors).length === 0 }));

    if (Object.keys(errors).length === 0 && onSubmit) {
      setState(prev => ({ ...prev, isSubmitting: true }));
      try {
        await onSubmit(state.values);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setState(prev => ({ ...prev, isSubmitting: false }));
      }
    }
  }, [state.values, validateForm, onSubmit]);

  // Verificar se um campo tem erro
  const hasError = useCallback((name: keyof T): boolean => {
    return !!(state.errors[name] && state.touched[name]);
  }, [state.errors, state.touched]);

  // Obter erro de um campo
  const getFieldError = useCallback((name: keyof T): string => {
    return state.errors[name] || '';
  }, [state.errors]);

  // Verificar se formulário foi tocado
  const isFieldTouched = useCallback((name: keyof T): boolean => {
    return !!state.touched[name];
  }, [state.touched]);

  // Props para campos de input
  const getFieldProps = useCallback((name: keyof T) => ({
    value: state.values[name],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFieldValue(name, e.target.value);
    },
    onBlur: () => setFieldTouched(name),
    error: hasError(name) ? getFieldError(name) : undefined,
    'aria-invalid': hasError(name),
    'aria-describedby': hasError(name) ? `${name}-error` : undefined
  }), [state.values, setFieldValue, setFieldTouched, hasError, getFieldError]);

  // Memoizar valores computados
  const formState = useMemo(() => ({
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isSubmitting: state.isSubmitting,
    isValid: state.isValid,
    isDirty: JSON.stringify(state.values) !== JSON.stringify(initialValues)
  }), [state, initialValues]);

  return {
    // Estado
    ...formState,
    
    // Ações
    setFieldValue,
    setFieldTouched,
    resetForm,
    handleSubmit,
    
    // Utilitários
    hasError,
    getFieldError,
    isFieldTouched,
    getFieldProps,
    
    // Validação
    validateField,
    validateForm
  };
}

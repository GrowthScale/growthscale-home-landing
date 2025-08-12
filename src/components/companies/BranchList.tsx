import React, { useState } from 'react';
import { Plus, MapPin, Phone, Mail, Users, Clock, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { BranchForm } from './BranchForm';
import { toast } from '@/hooks/use-toast';

interface Branch {
  id: string;
  name: string;
  code: string;
  status: 'active' | 'inactive' | 'maintenance';
  address: {
    street: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contact: {
    phone?: string;
    email?: string;
  };
  manager?: {
    name: string;
    email: string;
  };
  employeeCount: number;
  workingHours: {
    open: string;
    close: string;
  };
  createdAt: string;
}

interface BranchListProps {
  companyId: string;
}

const mockBranches: Branch[] = [
  {
    id: '1',
    name: 'Filial Centro',
    code: 'F001',
    status: 'active',
    address: {
      street: 'Rua Augusta, 123',
      number: '123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01305-000'
    },
    contact: {
      phone: '(11) 3333-3333',
      email: 'centro@empresa.com.br'
    },
    manager: {
      name: 'João Silva',
      email: 'joao.silva@empresa.com.br'
    },
    employeeCount: 25,
    workingHours: {
      open: '08:00',
      close: '18:00'
    },
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Filial Shopping',
    code: 'F002',
    status: 'active',
    address: {
      street: 'Av. Paulista, 1000',
      number: '1000',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100'
    },
    contact: {
      phone: '(11) 4444-4444',
      email: 'shopping@empresa.com.br'
    },
    manager: {
      name: 'Maria Santos',
      email: 'maria.santos@empresa.com.br'
    },
    employeeCount: 18,
    workingHours: {
      open: '10:00',
      close: '22:00'
    },
    createdAt: '2024-02-01'
  }
];

export const BranchList: React.FC<BranchListProps> = ({ companyId }) => {
  const [branches, setBranches] = useState<Branch[]>(mockBranches);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState<Branch | null>(null);

  const getStatusColor = (status: Branch['status']) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'inactive':
        return 'bg-muted text-muted-foreground';
      case 'maintenance':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: Branch['status']) => {
    switch (status) {
      case 'active':
        return 'Ativa';
      case 'inactive':
        return 'Inativa';
      case 'maintenance':
        return 'Manutenção';
      default:
        return 'Desconhecido';
    }
  };

  const handleEditBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    setShowEditDialog(true);
  };

  const handleDeleteBranch = (branch: Branch) => {
    setBranchToDelete(branch);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (branchToDelete) {
      setBranches(branches.filter(b => b.id !== branchToDelete.id));
      toast({
        title: 'Filial removida',
        description: `A filial ${branchToDelete.name} foi removida com sucesso.`,
      });
      setBranchToDelete(null);
      setShowDeleteDialog(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Filiais da Empresa</h3>
          <p className="text-sm text-muted-foreground">
            {branches.length} {branches.length === 1 ? 'filial cadastrada' : 'filiais cadastradas'}
          </p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Filial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-modal-md">
            <DialogHeader>
              <DialogTitle>Cadastrar Nova Filial</DialogTitle>
            </DialogHeader>
            <BranchForm 
              companyId={companyId}
              onClose={() => setShowCreateDialog(false)} 
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Branches List */}
      <div className="space-y-4">
        {branches.map((branch) => (
          <Card key={branch.id} className="transition-all duration-200 hover:shadow-md">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{branch.name}</CardTitle>
                    <CardDescription>Código: {branch.code}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(branch.status)}>
                    {getStatusText(branch.status)}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditBranch(branch)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeleteBranch(branch)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remover
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Endereço:</span>
                  </div>
                  <p className="text-sm pl-6">
                    {branch.address.street}, {branch.address.number}
                    <br />
                    {branch.address.city}, {branch.address.state}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Funcionários:</span>
                  </div>
                  <p className="text-sm pl-6">{branch.employeeCount}</p>
                  
                  {branch.manager && (
                    <>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Gerente:</span>
                      </div>
                      <p className="text-sm pl-6">{branch.manager.name}</p>
                    </>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Horário:</span>
                  </div>
                  <p className="text-sm pl-6">
                    {branch.workingHours.open} às {branch.workingHours.close}
                  </p>

                  {branch.contact.phone && (
                    <>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Telefone:</span>
                      </div>
                      <p className="text-sm pl-6">{branch.contact.phone}</p>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {branches.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            Nenhuma filial cadastrada
          </h3>
          <p className="text-muted-foreground mb-4">
            Comece adicionando a primeira filial desta empresa.
          </p>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Primeira Filial
          </Button>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-modal-md">
          <DialogHeader>
            <DialogTitle>Editar Filial</DialogTitle>
          </DialogHeader>
          {selectedBranch && (
            <BranchForm 
              companyId={companyId}
              branch={selectedBranch}
              isEditing
              onClose={() => {
                setShowEditDialog(false);
                setSelectedBranch(null);
              }} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover Filial</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover a filial "{branchToDelete?.name}"? 
              Esta ação não pode ser desfeita e todos os dados relacionados 
              serão permanentemente removidos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
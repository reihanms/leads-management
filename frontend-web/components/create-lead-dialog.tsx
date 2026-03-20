"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLeadStore } from "@/lib/store";
import { useLeads } from "@/hooks/use-leads";
import { createLeadSchema, type CreateLeadFormSchema } from "@/lib/schemas";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CreateLeadDialog() {
  const { isCreateDialogOpen, closeCreateDialog } = useLeadStore();
  const { createLead, isCreating } = useLeads();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateLeadFormSchema>({
    resolver: zodResolver(createLeadSchema),
    defaultValues: { status: "New" },
  });

  const onSubmit = async (data: CreateLeadFormSchema) => {
    const { success } = await createLead(data);
    if (success) reset();
  };

  return (
    <Dialog
      open={isCreateDialogOpen}
      onOpenChange={(open) => !open && closeCreateDialog()}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Lead</DialogTitle>
          <DialogDescription>
            Add a new lead to your sales pipeline.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="lead-name">Name</Label>
            <Input
              id="lead-name"
              placeholder="John Doe"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lead-email">Email</Label>
            <Input
              id="lead-email"
              type="email"
              placeholder="john@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lead-status">Status</Label>
            <Select
              defaultValue="New"
              onValueChange={(value) =>
                setValue("status", value as CreateLeadFormSchema["status"])
              }
            >
              <SelectTrigger id="lead-status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Engaged">Engaged</SelectItem>
                <SelectItem value="ProposalSent">Proposal Sent</SelectItem>
                <SelectItem value="ClosedWon">Closed Won</SelectItem>
                <SelectItem value="ClosedLost">Closed Lost</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-sm text-destructive">
                {errors.status.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={closeCreateDialog}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? "Creating…" : "Create Lead"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}


"use client";

import { Optional } from "@prisma/client/runtime/library";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/primitives/dialog";
import { useState } from "react";

import DataTable from "@/components/ui/dataTable/dataTable";
import { companyColumns, companyHeaderFormItems } from "./tableInfo";
import TableRowEdit from "../tableRowEdit";
import { Criteria } from "../definition";
import {
  action_company_delete,
  action_company_update,
} from "@/app/actions/company";

export default function CompanyClientTable({
  company,
}: {
  company: Company[];
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    Optional<Company> | undefined
  >(undefined);

  const update = (changes: { [key: string]: Criteria }, companyId: number) => {
    setLoading(true);
    action_company_update({ changes, companyId })
      .then((res) => {
        setOpen(false);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteCompany = (id: number) => {
    setLoading(true);
    setDeleting(true);
    action_company_delete(id)
      .then((res) => {
        setOpen(false);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
        setDeleting(false);
      });
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(o) => {
          setOpen(false);
        }}
      >
        <DialogContent>
          <TableRowEdit
            columns={companyHeaderFormItems}
            onEdit={(changes) => {
              if (selectedItem?.id) update(changes, selectedItem.id);
            }}
            onDelete={() => {
              if (selectedItem) {
                deleteCompany(selectedItem.id as number);
              }
            }}
            row={selectedItem ?? {}}
            loading={loading}
            deleting={deleting}
          />
        </DialogContent>
      </Dialog>

      <DataTable
        tableClassName="p-2"
        stickyHeader
        items={company}
        handleMoveColumn={() => {}}
        handleMoveItem={() => {}}
        columns={companyColumns}
        extraRowClasses="cursor-pointer"
        onRowClick={(row) => {
          setSelectedItem(row);
          setOpen(true);
        }}
      />
    </>
  );
}

"use client";

import { SearchInput } from "@/src/components/form/search-input";
import PageHeader from "@/src/components/ui/PageHeader";
import { Pagination } from "@/src/components/ui/pagination";
import { useMemo, useState } from "react";
import { GlobalBranch } from "../types/global.type";
import BranchCard from "./BranchCard";

interface Props {
  initialData?: GlobalBranch[];
}

const PAGE_SIZE = 12;

export default function BranchList({ initialData = [] }: Props) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!query) return initialData;
    const q = query.toLowerCase();
    return initialData.filter(
      (b) =>
        b.branchName.toLowerCase().includes(q) ||
        b.address.toLowerCase().includes(q) ||
        (b.phone || "").toLowerCase().includes(q) ||
        (b.services || []).some((service) => service.toLowerCase().includes(q))
    );
  }, [initialData, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-4">
      <PageHeader
        title="GLOBAL BRANCHES"
        right={
          <SearchInput
            value={query}
            onChange={(v) => {
              setQuery(v);
              setPage(1);
            }}
            placeholder="Search branches..."
          />
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pageData.map((b) => (
          <BranchCard
            key={b.id}
            branchName={b.branchName}
            address={b.address}
            phone={b.phone}
            emailAddress={b.emailAddress}
            workingHours={b.workingHours}
            services={b.services}
          />
        ))}
      </div>

      <div className="pt-4">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          pageSize={PAGE_SIZE}
          totalResults={filtered.length}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </div>
  );
}

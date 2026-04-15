"use client";

import { SearchInput } from "@/src/components/form/search-input";
import PageHeader from "@/src/components/ui/PageHeader";
import { Pagination } from "@/src/components/ui/pagination";
import { useMemo, useState } from "react";

import TeamCard from "./TeamCard";
import { OurTeam } from "../types/ourTeam.type";


interface Props {
  initialData?: OurTeam[];
}

const PAGE_SIZE = 12;

export default function OurTeamList({ initialData = [] }: Props) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const visibleData = initialData.filter((team) => team.isVisible);
    if (!query) return visibleData;
    const q = query.toLowerCase();
    return visibleData.filter(
      (m) =>
        m.firstName.toLowerCase().includes(q) ||
        m.lastName.toLowerCase().includes(q) ||
        (m.position || "").toLowerCase().includes(q)
    );
  }, [initialData, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Our Team"
        subtitle="Meet our amazing team members"
        right={
          <SearchInput
            value={query}
            onChange={(v) => {
              setQuery(v);
              setPage(1);
            }}
            placeholder="Search team..."
          />
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pageData.map((team) => (
          <TeamCard key={team.id} {...team} />
        ))}
      </div>

      <div className="flex justify-end ">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
}

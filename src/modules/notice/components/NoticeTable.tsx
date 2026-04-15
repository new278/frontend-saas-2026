"use client";

import { SearchInput } from "@/src/components/form/search-input";
import Table from "@/src/components/table/Table";
import TableBody from "@/src/components/table/TableBody";
import TableColumn from "@/src/components/table/TableColumn";
import { TableHeading } from "@/src/components/table/TableHeading";
import TableRow from "@/src/components/table/TableRow";
import PageHeader from "@/src/components/ui/PageHeader";
import { Pagination } from "@/src/components/ui/pagination";
import FormatDate from "@/src/utils/FormatDate";
import { useMemo, useState } from "react";
import { Notice } from "../types/notice.type";
import NoticeViewer from "./NoticeViewer";

interface Props {
  initialData?: Notice[];
}

const PAGE_SIZE = 10;

export default function NoticeTable({ initialData = [] }: Props) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [viewer, setViewer] = useState<{ content: string; title: string } | null>(null);

  const filtered = useMemo(() => {
    if (!query) return initialData;
    const q = query.toLowerCase();
    return initialData.filter((n) => n.title.toLowerCase().includes(q));
  }, [initialData, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="container mx-auto px-4 md:px-6 space-y-5 ">

      <PageHeader
        title="Notice Board"
        subtitle="Latest notices and announcements"
        right={
          <SearchInput
            value={query}
            onChange={(v) => { setQuery(v); setPage(1); }}
            placeholder="Search notices..."
          />
        }
      />

      <Table className="w-full overflow-auto">
        <TableHeading>
          <TableColumn isHeader className="w-16 text-center">SL</TableColumn>
          <TableColumn isHeader>Title</TableColumn>
          <TableColumn isHeader className="text-left">Priority</TableColumn>
          <TableColumn isHeader className="text-left">Created At</TableColumn>
          <TableColumn isHeader className="text-left">Actions</TableColumn>
        </TableHeading>

        <TableBody isEmpty={pageData.length === 0} colSpan={5} emptyMessage={"No notices found"}>
          {pageData.map((notice, index) => (
            <TableRow key={notice.id}>
              <TableColumn className="text-center">{(page - 1) * PAGE_SIZE + index + 1}</TableColumn>
              <TableColumn>{notice.title}</TableColumn>
              <TableColumn>{notice.priority}</TableColumn>
              <TableColumn>{FormatDate(notice.createdAt)}</TableColumn>
              <TableColumn>
                <button
                  className="btn btn-outline"
                  onClick={() => setViewer({ content: notice.content, title: notice.title })}
                >
                  View
                </button>
              </TableColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4">
        <Pagination currentPage={page} totalPages={totalPages} pageSize={PAGE_SIZE} totalResults={filtered.length} onPageChange={(p) => setPage(p)} />
      </div>

      {viewer && (
        <NoticeViewer
          content={viewer.content}
          title={viewer.title}
          onClose={() => setViewer(null)}
        />
      )}
    </div>
  );
}

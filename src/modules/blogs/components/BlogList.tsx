"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import BlogCard from "./BlogCard";
import PageHeader from "@/src/components/ui/PageHeader";
import { SearchInput } from "@/src/components/form/search-input";
import { Pagination } from "@/src/components/ui/pagination";
import { BlogProps } from "../types/blog.type";
import { Button } from "@/src/components/ui/button";



interface Props {
  initialData?: BlogProps[];
}

const PAGE_SIZE = 12;

export default function BlogList({ initialData = [] }: Props) {
  const [query, setQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [page, setPage] = useState(1);


   const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const categoriesRef = useRef<HTMLDivElement | null>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

      const updateScrollState = useCallback(() => {
        const el = categoriesRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 0);
        // small epsilon to avoid rounding issues
        setCanScrollRight(el.scrollWidth > el.clientWidth + el.scrollLeft + 1);
      }, []);
    
      const onCategoriesScroll = useCallback(() => updateScrollState(), [updateScrollState]);
    
      useEffect(() => {
        updateScrollState();
        const el = categoriesRef.current;
        const handleResize = () => updateScrollState();
        window.addEventListener("resize", handleResize);
        if (el) el.addEventListener("scroll", onCategoriesScroll);
        return () => {
          window.removeEventListener("resize", handleResize);
          if (el) el.removeEventListener("scroll", onCategoriesScroll);
        };
      }, [initialData, onCategoriesScroll, updateScrollState]);
    
      const categories = useMemo(() => {
        const set = new Set(initialData.map((i) => i.category || "Uncategorized"));
        return ["All", ...Array.from(set)];
      }, [initialData]);
  

  const filtered = useMemo(() => {
    let data = initialData;

    // filter by query if provided
    if (query) {
      const q = query.toLowerCase();
      data = data.filter((b) => b.title.toLowerCase().includes(q));
    }

    // filter by selectedDate (YYYY-MM-DD) if provided
    if (selectedDate) {
      data = data.filter((b) => {
        try {
          const bd = new Date(b.createdAt);
          if (Number.isNaN(bd.getTime())) return false;
          const iso = bd.toISOString().slice(0, 10);
          return iso === selectedDate;
        } catch {
          return false;
        }
      });
    }

    return data;
  }, [initialData, query, selectedDate]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Latest News"
        right={
          <div className="flex items-center space-x-2">
            <SearchInput value={query} onChange={(v) => { setQuery(v); setPage(1); }} placeholder="Search blogs..." />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => { setSelectedDate(e.target.value); setPage(1); }}
              className="border rounded px-2 py-1 text-sm"
              aria-label="Filter by date"
            />
            {selectedDate && (
              <button type="button" onClick={() => { setSelectedDate(""); setPage(1); }} className="text-sm text-gray-500">Clear</button>
            )}
          </div>
        }
      />

         {/* Category chips / filters with left/right arrows */}
      <div className="relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
          <Button
            
            onClick={() => {
              const el = categoriesRef.current;
              if (!el) return;
              const amount = Math.round(el.clientWidth * 0.5) || 200;
              el.scrollBy({ left: -amount, behavior: "smooth" });
            }}
            aria-label="Scroll categories left"
            disabled={!canScrollLeft}
          >
            ‹
          </Button>
        </div>

        <div
          ref={categoriesRef}
          className="flex gap-2 overflow-x-auto py-2 scroll-smooth pl-10 pr-10"
          onScroll={onCategoriesScroll}
        >
          {categories.map((c) => {
            const active = c === selectedCategory;
            return (
              <Button
                variant={`${active ? "default" : "outline"}`}
                key={c}
                onClick={() => {
                  setSelectedCategory(c);
                  setPage(1);
                }}
              >
                {c}
              </Button>
            );
          })}
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <Button
          
            onClick={() => {
              const el = categoriesRef.current;
              if (!el) return;
              const amount = Math.round(el.clientWidth * 0.5) || 200;
              el.scrollBy({ left: amount, behavior: "smooth" });
            }}
            aria-label="Scroll categories right"
            disabled={!canScrollRight}
          >
            ›
          </Button>
        </div>
      </div>

    

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {pageData.map((b: BlogProps) => (
          <BlogCard key={b.id} blog={b} />
        ))}
      </div>

      <div className="pt-4">
        <Pagination currentPage={page} totalPages={totalPages} pageSize={PAGE_SIZE} totalResults={filtered.length} onPageChange={(p) => setPage(p)} />
      </div>
    </div>
  );
}

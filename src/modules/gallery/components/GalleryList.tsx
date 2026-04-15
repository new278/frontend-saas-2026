"use client";

import React, { useMemo, useState, useRef, useEffect, useCallback } from "react";
import PageHeader from "@/src/components/ui/PageHeader";
import { SearchInput } from "@/src/components/form/search-input";
import { Pagination } from "@/src/components/ui/pagination";
import GalleryCard from "./GalleryCard";
import GalleryViewer from "./GalleryViewer";
import { GalleryItem } from "../types/gallery.type";
import { Button } from "@/src/components/ui/button";


interface Props {
  initialData?: GalleryItem[];
}

const PAGE_SIZE = 12;

export default function GalleryList({ initialData = [] }: Props) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewer, setViewer] = useState<{ images: string[];  index: number;  categoryName?: string } | null>(null);
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
    const set = new Set(initialData.map((i) => i.categoryName || "Uncategorized"));
    return ["All", ...Array.from(set)];
  }, [initialData]);

  const filtered = useMemo(() => {
    const q = (query || "").toLowerCase();
    return initialData.filter((i) => {
      if (q && !(i.categoryName || "").toLowerCase().includes(q)) return false;
      if (selectedCategory && selectedCategory !== "All") {
        const cat = i.categoryName || "Uncategorized";
        if (cat !== selectedCategory) return false;
      }
      return true;
    });
  }, [initialData, query, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gallery"
        subtitle={undefined}
        right={<SearchInput value={query} onChange={(v) => { setQuery(v); setPage(1); }} placeholder="Search media..." />}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {pageData.map((it) => (
          <GalleryCard
            key={it.id}
            id={it.id}
            categoryName={it.categoryName}
            description={it.description}
            createdAt={it.createdAt}
            images={it.images}
           
          />
        ))}
      </div>

      <div className="pt-4">
        <Pagination currentPage={page} totalPages={totalPages} pageSize={PAGE_SIZE} totalResults={filtered.length} onPageChange={(p) => setPage(p)} />
      </div>

   

      {viewer && (
        <GalleryViewer
          images={viewer?.images}
          startIndex={viewer.index}
          title={viewer?.categoryName}
   
          // pass all images + allow navigation inside the viewer
          onClose={() => setViewer(null)}
        />
      )}
    </div>
  );
}

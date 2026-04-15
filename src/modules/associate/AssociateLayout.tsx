"use client"

import { SearchInput } from '@/src/components/form/search-input'
import { Button } from '@/src/components/ui/button'
import PageHeader from '@/src/components/ui/PageHeader'
import { Pagination } from '@/src/components/ui/pagination'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import AssociateCard from './components/AssociateCard'
import associatesDemo from './demoData'

const PAGE_SIZE = 6
const CATEGORIES = [
  'All',
  'Technical',
  'Construction',
  'Real Estate',
  'Import & Export',
  'Visa & Travel',
  'Courses',
  'Jobs',
  'Healthcare',
  'Shopping',
  'Donate',
]

const AssociateLayout: React.FC = () => {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const categoriesRef = useRef<HTMLDivElement | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = useCallback(() => {
    const el = categoriesRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollWidth > el.clientWidth + el.scrollLeft + 1)
  }, [])

  const onCategoriesScroll = useCallback(() => updateScrollState(), [updateScrollState])

  useEffect(() => {
    updateScrollState()
    const el = categoriesRef.current
    const handleResize = () => updateScrollState()
    window.addEventListener('resize', handleResize)
    if (el) el.addEventListener('scroll', onCategoriesScroll)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (el) el.removeEventListener('scroll', onCategoriesScroll)
    }
  }, [onCategoriesScroll, updateScrollState])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const selectedCategory = category.toLowerCase()

    let results = associatesDemo

    if (q) {
      results = results.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        (a.services || []).join(' ').toLowerCase().includes(q) ||
        (a.serviceArea || '').toLowerCase().includes(q)
      )
    }

    if (selectedCategory !== 'all') {
      results = results.filter(a => a.category.toLowerCase() === selectedCategory)
    }

    return results
  }, [query, category])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))

  const pageData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filtered.slice(start, start + PAGE_SIZE)
  }, [filtered, currentPage])

  return (
    <div className="space-y-4">
      <PageHeader
        title="Our Associates"
        right={<SearchInput value={query} onChange={(v) => { setQuery(v); setCurrentPage(1); }} placeholder="Search associates..." />}
      />

      <div className="relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
          <Button
            onClick={() => {
              const el = categoriesRef.current
              if (!el) return
              const amount = Math.round(el.clientWidth * 0.5) || 200
              el.scrollBy({ left: -amount, behavior: 'smooth' })
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
          {CATEGORIES.map((item) => {
            const isActive = category === item
            return (
              <Button
                variant={isActive ? 'default' : 'outline'}
                key={item}
                onClick={() => { setCategory(item); setCurrentPage(1); }}
              >
                {item}
              </Button>
            )
          })}
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <Button
            onClick={() => {
              const el = categoriesRef.current
              if (!el) return
              const amount = Math.round(el.clientWidth * 0.5) || 200
              el.scrollBy({ left: amount, behavior: 'smooth' })
            }}
            aria-label="Scroll categories right"
            disabled={!canScrollRight}
          >
            ›
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {pageData.map((item) => (
          <AssociateCard key={item.id} data={item} />
        ))}
      </div>

      <div className="pt-4">
        <Pagination currentPage={currentPage} totalPages={totalPages} pageSize={PAGE_SIZE} totalResults={filtered.length} onPageChange={(p) => setCurrentPage(p)} />
      </div>
    </div>
  )
}

export default AssociateLayout
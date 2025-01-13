import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  expanded?: boolean;
}

const SearchBar = ({ onSearch, expanded = false }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const clearSearch = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'search-animation relative',
        expanded ? 'search-bar-expanded' : 'search-bar-collapsed'
      )}
    >
      <div
        className={cn(
          'relative flex items-center rounded-xl bg-white/80 backdrop-blur-sm',
          'border border-gray-200 shadow-sm transition-all duration-300',
          isFocused && 'border-gray-400 shadow-md'
        )}
      >
        <Search
          className="absolute left-4 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search the web..."
          className="w-full rounded-xl bg-transparent py-3 pl-12 pr-12 text-base focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-4 rounded-full p-1 hover:bg-gray-100"
          >
            <X className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
import { motion } from 'framer-motion';

interface SearchResult {
  title: string;
  url: string;
  description: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  onVisitSite: (url: string) => void;
}

const SearchResults = ({ results, isLoading, onVisitSite }: SearchResultsProps) => {
  if (isLoading) {
    return (
      <div className="mt-8 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 w-3/4 rounded bg-gray-200" />
            <div className="mt-2 h-3 w-1/2 rounded bg-gray-200" />
            <div className="mt-2 h-3 w-full rounded bg-gray-200" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      {results.map((result, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="result-appear"
        >
          <button
            onClick={() => onVisitSite(result.url)}
            className="block w-full text-left rounded-lg p-4 transition-all hover:bg-gray-50"
          >
            <h3 className="text-lg font-medium text-primary">{result.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{result.url}</p>
            <p className="mt-2 text-sm text-gray-600">{result.description}</p>
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default SearchResults;